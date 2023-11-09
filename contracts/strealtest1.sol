// SPDX-License-Identifier: MIT

/*
 * @title DecentralizedStableCoin
 * @author James Luiz
 * Collateral: Exogenous
 * Minting (Stability Mechanism): Decentralized (Algorithmic)
 * Value (Relative Stability): Anchored (Pegged to USD)
 * Collateral Type: Crypto
 *
 * 
 */

 /*
 * @title StrealEngine
 * @author James Luiz
 * usdt testnet: 0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0
 * usdc testnet: 0xe9DcE89B076BA6107Bb64EF30678efec11939234
 * DAI testnet: 0xF14f9596430931E177469715c591513308244e8F

* streal address 0x23Ba406937C963781A64C42c3f75A36eE1462c86
 * Pricefeed address 
 * DAI: 0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046
 * USDC: 0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0
 * USDT: 0x92C09849638959196E976289418e5973CC96d645
 * The system is deisgned to be as minimal as possible, and have the tokens maintain a 1 token == $5 (usdc, usdt, dai, gold) peg at all times.
 * This is a stablecoin with the properties:
 * - Exegenously Collateralized
 * - Matic Pegged
 * - Algorithmically Stable
 *
 * It is similar to DAI if DAI had no governance, no fees, and was backed by only (usdc, usdt, dai, gold).
 * Our streal system is "overcollateralised", at no point should the value of all collateral <= the (usdc, usdt, dai, gold) backed value of Streal
 * @notice This contract is the core of the Decentralized Stablecoin system. It handles all the logic
 * for minting and redeeming Streal, as well as depositing and withdrawing collateral.
 * @notice This contract is based on the MakerDAO DSS system
 */




pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {OracleLib, AggregatorV3Interface} from "./libraries/OracleLib.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Streal2 is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, AccessControl, ReentrancyGuard {
    // state variables
    uint256 public constant Liquidation_bonus = 10; // This means you get assets at a 10% discount when liquidating
    address[] public _collateralTokens; 
    uint256 private constant Additional_Feed_Precision = 1e10;
    uint256 private constant Feed_Precision = 1e18;
    uint256 private constant Liquidation_threshold = 5;
    uint256 private constant Liquidation_Precision = 100;
    uint256 private constant MIN_HEALTH_FACTOR = 1e18;
    address[] public supportedTokens;
    address[] public priceFeedAddress;
    uint256 public airdrops = 100000000 * 1e18;
    uint256 public supply = 200000000 * 1e18;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");


    // mappings
    // user -> amount
    mapping (address => uint256) public mintedStreal;
    // user -> token -> amount
    mapping (address => mapping(address => uint256)) public _collateralDeposited;
    // token adress -> chainlink pricefeed address
    mapping (address => address) public priceFeed;
    

    // event
    event collateralDeposited(address indexed user, address indexed token, uint256 amount);

    // modifiers
    modifier allowedToken (address token) {
        require(priceFeed[token] != address(0), "invalid token");
        _;
    }

    modifier moreThanZero (uint256 amount) {
        require(amount > 0, "amount must be greater than zero");
        _;
    }




    constructor() ERC20("Streal", "Streal") {

         supportedTokens = [
            0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0,
            0xe9DcE89B076BA6107Bb64EF30678efec11939234,
            0xF14f9596430931E177469715c591513308244e8F
        ];

        priceFeedAddress = [
            0x92C09849638959196E976289418e5973CC96d645,
            0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0,
            0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046
        ];
        
        require(supportedTokens.length == priceFeedAddress.length, "adress must be same length"); 

        for (uint i = 0; i < supportedTokens.length; i++) {
            priceFeed [supportedTokens[i]] = priceFeedAddress[i];
            _collateralTokens.push(supportedTokens[i]);
        } 

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, supply);
        supply -= airdrops;

    }

    // functions
    function depositCollateralAndMintStreal(
    address tokenCollateralAddress,
    uint256 amountCollateral 
    ) internal  {
        depositCollateral(tokenCollateralAddress, amountCollateral);

        // Calculate the equivalent amount of Streal tokens to mint based on the collateral type
        uint256 equivalentAmountToMint = calculateEquivalentAmountToMint(tokenCollateralAddress, amountCollateral);
        uint256 amount = equivalentAmountToMint * 1e18;
        // Mint the calculated equivalent amount of Streal tokens
        mintStreal(amount);
    }

    function calculateEquivalentAmountToMint(address tokenCollateralAddress, uint256 amountCollateral) public view returns (uint256) {
        // Determine the decimal places based on the token type
        uint8 tokenDecimals = getDecimals(tokenCollateralAddress);
        uint256 amount = amountCollateral * (10**tokenDecimals);
        uint256 strealPrice = 5 * 1e18;
        // Calculate the equivalent amount of Streal tokens based on the collateral value
        uint256 equivalentAmountToMint = (amount * (10**(18 - tokenDecimals))) / (strealPrice);
        return equivalentAmountToMint;
    }

    function getDecimals(address tokenAddress) public view returns (uint8) {
        IERC20Metadata token = IERC20Metadata(tokenAddress);
        return token.decimals();

    }


   

    function approveAnddepositCollateral(address collateralAddress, uint256 AmountCollateral) public{
        depositCollateralAndMintStreal(collateralAddress, AmountCollateral);

    }  
    /// @notice Follows CEI
    /// @notice tokenCollateralAddress, address of token to deposit as collateral
    /// @notice amount of collteral to be deposited
    
    function depositCollateral (address tokenCollateralAddress, uint256 _amount) public moreThanZero(_amount) nonReentrant allowedToken(tokenCollateralAddress)
    {   uint8 decimals = getDecimals(tokenCollateralAddress);
        uint256 amount = _amount * (10**decimals);
        _collateralDeposited[msg.sender][tokenCollateralAddress] += amount;
        emit collateralDeposited(msg.sender, tokenCollateralAddress, amount );

        IERC20(tokenCollateralAddress).transferFrom(
            msg.sender, 
            address(this),
            amount
        );

    }

   

    function redeemCollateralForStreal(
        address tokenCollateralAddress,
        uint256 amountCollateral
    ) public {

        uint8 tokenDecimals = getDecimals(tokenCollateralAddress);
        uint256 amount = amountCollateral * (10**tokenDecimals);
        uint256 strealToBurn = calculateEquivalentAmountToMint(tokenCollateralAddress, amountCollateral);
        uint256 _amount = strealToBurn * 1e18; 
        // Calculate the fee
        uint256 fee = amount * 5 / 100;
        // Ensure that the user has enough collateral deposited
        require(_collateralDeposited[msg.sender][tokenCollateralAddress] >= amountCollateral, "Not enough collateral deposited");
        // Deduct the collateral from the user's deposited collateral
        _collateralDeposited[msg.sender][tokenCollateralAddress] -= amountCollateral;
        // Deduct the fee from the collateral
        uint256 balances =  amount -= fee;
        uint256 contractBalance = IERC20(tokenCollateralAddress).balanceOf(address(this));
        require(contractBalance >= balances, "Not enough tokens in contract");
        // Transfer the collateral to the user
        bool success = IERC20(tokenCollateralAddress).transfer(msg.sender, balances);
        require(success, "Transfer of collateral failed");
       
        // Burn the Streal tokens
        burnStreal(_amount);
        
    }


    /* 
    @notice amountToMint the amount of streal to mint
    @notice check if they have more collateral value than the minimum threshHold
    */
    

    function mintStreal(uint256 amountToMint) private moreThanZero(amountToMint){
       mintedStreal[msg.sender] += amountToMint;
       bool minted = mint(msg.sender, amountToMint);
        require(minted, "mint failed, check mintStreal function");
    }
    

    // don't call this function directly or you'll lose money
    function burnStreal(uint256 amountToBurn) private moreThanZero(amountToBurn) nonReentrant {
        _burnStreal(amountToBurn, msg.sender, msg.sender);

    }

    function _burnStreal(
        uint256 amountToBurn,
        address onBehalfOf,
        address strealFrom
    ) private {
        mintedStreal[onBehalfOf] -= amountToBurn;
        bool success = transferFrom(strealFrom, onBehalfOf, amountToBurn);
        require(success, "failed to burn");
        burn(amountToBurn); 
    }




      ////////////////////////////////////
     // internal and private Functions //
    ////////////////////////////////////
    function getAccountCollateralValueInUsd(address user) public view returns(uint256 totalCollateralValueInUsd) {
        // loop each collateral collateral token, get the amount deposited and map it to price to get the usd value
        for (uint256 i = 0; i < _collateralTokens.length; i++) {
            address token = _collateralTokens[i];
            uint256 amount = _collateralDeposited[user][token];
            totalCollateralValueInUsd += getUsdValue(token, amount);
        }
        return totalCollateralValueInUsd;
    }



    function _getAccountInfo(address user) private view returns(uint256 totalStrealMinted, uint256 collateralValueInUsd){
        totalStrealMinted = mintedStreal[user];
        collateralValueInUsd = getAccountCollateralValueInUsd(user);
    }

    //// @notice returns how close a user is to liquidation
    //// @notice if the user goes below ration, they'll be liquidated


    

    /////////////////////////////////////
    //public & external view Functions//
    ///////////////////////////////////

    

    function getUsdValue(address token, uint256 amount) public view returns(uint256){
        AggregatorV3Interface price_Feed = AggregatorV3Interface(priceFeed[token]);
        (, int256 price,,,) = price_Feed.latestRoundData();
        return ((uint256(price) * Additional_Feed_Precision) * amount) / Feed_Precision ;

    }

    function getTokenAmountFromMatic (address token, uint256 amountInWei) public view returns (uint256) {
        AggregatorV3Interface price_Feed = AggregatorV3Interface(priceFeed[token]);
        (, int256 price, , ,) = price_Feed.latestRoundData();
        return ((uint256(price) * Additional_Feed_Precision * Feed_Precision) ) / amountInWei;

    } 

    function withdraw() public onlyOwner {
        for (uint i=0; i<supportedTokens.length; i++) {
            IERC20 token = IERC20(supportedTokens[i]);
            uint256 balances = token.balanceOf(address(this));
            if (balances > 0) {
                token.transfer(msg.sender, balances);
            }
        }
    }

   function balance() public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](supportedTokens.length);
        
        for (uint i=0; i<supportedTokens.length; i++) {
            IERC20 token = IERC20(supportedTokens[i]);
            balances[i] = token.balanceOf(address(this));
        }

        return balances;
    }


    function grantAdminRole(address admin) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ADMIN_ROLE, admin);
    }



    function revokeAdminRole(address admin) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(ADMIN_ROLE, admin);
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }


    // 0x099fcF7Dd4819049bbAfF3C9dF3d490369513985

    function burn(uint256 _amount) public override{
        uint256 balances = balanceOf(msg.sender);
        
        require(_amount > 0, "amount must be more than zero");
        require (balances >= _amount, "burnable exceeds balance"); 
        super.burn(_amount * 1e18);
    }


    function burnForCommerce(uint256 _amount) public  onlyOwner nonReentrant {
        uint256 balances = balanceOf(msg.sender);
        
        require(_amount > 0, "amount must be more than zero");
        require (balances >= _amount, "burnable exceeds balance"); 
        super.burn(_amount * 1e18);
    }


    function mint(address to, uint256 amount) internal nonReentrant returns (bool) {

        require (to != address(0), "invalid address");
        require (amount >= 0, "amount must be more than zero");
       _mint(to, amount);
       return true;
    }


    function mintForCommerce(address to, uint256 amount) public nonReentrant onlyOwner returns (bool) {

        require (to != address(0), "invalid address");
        require (amount >= 0, "amount must be more than zero");
       _mint(to, amount);
       return true;
    }

    // this funcion allows new tokens to be minted into the adddresss of various users as redwards
    function mintReward(address[] memory recipients, uint256[] memory amounts) public onlyOwner nonReentrant returns (bool) {
        require(recipients.length == amounts.length, "recipients and amounts arrays must have the same length");

        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            uint256 amount = amounts[i];
            require(to != address(0), "invalid address");
            require(amount >= 0, "amount must be more than zero");

            _mint(to, amount * 1e18);
        }
        return true;
    }


    function isAdmin(address account) public view returns (bool) {
        return hasRole(ADMIN_ROLE, account);
    }


    // The following functions are overrides required by Solidity.
    
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);

    }



    function airdrop(address[] memory recipients, uint256[] memory values) public onlyOwner nonReentrant returns (bool success) {
        require(recipients.length == values.length, "Invalid input arrays");

        uint256 totalValue = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient address");
            totalValue += values[i];
        }

        require(totalValue <= airdrops, "Insufficient airdrop balance");
 
        for (uint256 i = 0; i < recipients.length; i++) {
            transfer(recipients[i], values[i] * (10 ** 18));
        }

        airdrops -= totalValue;

        return true;
    }

    
}