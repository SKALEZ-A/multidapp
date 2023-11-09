// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

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
import {Streal2} from "./streal_1.sol";
import {OracleLib, AggregatorV3Interface} from "./libraries/OracleLib.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract StrealEngine is ReentrancyGuard, Ownable {

    /////////////////////////
    // State variable     //
    ///////////////////////
    Streal2 public  immutable i_streal;
    uint256 public constant Liquidation_bonus = 10; // This means you get assets at a 10% discount when liquidating
    address[] public _collateralTokens; 
    uint256 private constant Additional_Feed_Precision = 1e10;
    uint256 private constant Feed_Precision = 1e18;
    uint256 private constant Liquidation_threshold = 5;
    uint256 private constant Liquidation_Precision = 100;
    uint256 private constant MIN_HEALTH_FACTOR = 1e18;
    address[] public supportedTokens;
    address[] public priceFeedAddress;
    address public strealAddress;
    // 0x23Ba406937C963781A64C42c3f75A36eE1462c86 streal
    // 0xa8069af6Dc9d71fE70DEb5a021F50c38Fc878e69 engine

      ////////////////////////
     // mappings           //
    ////////////////////////
    // user -> amount
    mapping (address => uint256) public mintedStreal;
    // user -> token -> amount
    mapping (address => mapping(address => uint256)) public _collateralDeposited;
    // token adress -> chainlink pricefeed address
    mapping (address => address) public priceFeed;
    

      /////////////////////////
     // events             ///
    /////////////////////////
    event collateralDeposited(address indexed user, address indexed token, uint256 amount);

      ////////////////////////
     // Modifiers          //
    ////////////////////////
    modifier allowedToken (address token) {
        require(priceFeed[token] != address(0), "invalid token");
        _;
    }

    modifier moreThanZero (uint256 amount) {
        require(amount > 0, "amount must be greater than zero");
        _;
    }


    constructor() {
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

        strealAddress = 0x62ce14c791315A3FA9722dB58B010e29cBB6dBf1;

        require(supportedTokens.length == priceFeedAddress.length, "adress must be same length"); 

        for (uint i = 0; i < supportedTokens.length; i++) {
            priceFeed [supportedTokens[i]] = priceFeedAddress[i];
            _collateralTokens.push(supportedTokens[i]);
        } 

        i_streal = Streal2(strealAddress);
    }

    // 0x39b165389b3a0A810843376867Cced4564fA9F69
    
      ////////////////////////
     // External Functions //
    ////////////////////////
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


   

    function approveAnddepositCollateral(address collateralAddress, uint256 AmountCollateral) public {
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
        uint256 amountCollateral,
        uint256 amountStrealToBurn
    )  external {
        burnStreal(amountStrealToBurn);
        redeemCollateral(tokenCollateralAddress, amountCollateral);
    }

    function redeemCollateral(address tokenCollateralAddress, uint256 amountCollateral) public moreThanZero(amountCollateral) nonReentrant {
        _redeemCollateral(tokenCollateralAddress, amountCollateral, msg.sender, msg.sender);
    }

    function _redeemCollateral(
        address tokenCollateralAddress,
        uint256 amountCollateral,
        address from,
        address to
    ) private {
        _collateralDeposited[from][tokenCollateralAddress] -= amountCollateral;
        bool success = IERC20(tokenCollateralAddress).transfer(to, amountCollateral);
        require(success, "redeem collateral failed");
    }

    /* 
    @notice amountToMint the amount of streal to mint
    @notice check if they have more collateral value than the minimum threshHold
    */
    

    function mintStreal(uint256 amountToMint) public moreThanZero(amountToMint){
       mintedStreal[msg.sender] += amountToMint;
       bool minted = i_streal.mint(msg.sender, amountToMint);
        require(minted, "mint failed, check mintStreal function");
    }

    // don't call this function directly or you'll lose money
    function burnStreal(uint256 amountToBurn) public moreThanZero(amountToBurn) nonReentrant {
        _burnStreal(amountToBurn, msg.sender, msg.sender);

    }

    function _burnStreal(
        uint256 amountToBurn,
        address onBehalfOf,
        address strealFrom
    ) private {
        mintedStreal[onBehalfOf] -= amountToBurn;
        bool success = i_streal.transferFrom(strealFrom, address(this), amountToBurn);
        require(success, "failed to burn");
        i_streal.burn(amountToBurn); 
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
}

   

