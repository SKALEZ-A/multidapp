// SPDX-License-Identifier: MIT
// hardhat local address 0x7b1111381c90b5Ff71C2859ef5dDC29EFFDDb85d
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

 supportedTokens = [
        0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0, // usdt,
        0xe9DcE89B076BA6107Bb64EF30678efec11939234, // usdc,
        0xF14f9596430931E177469715c591513308244e8F // DAI
    ];

    priceFeedAddress = [
        0x92C09849638959196E976289418e5973CC96d645 usdt,
        0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0 usdc,
        0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046 dai,
    ]

 * The system is deisgned to be as minimal as possible, and have the tokens maintain a 1 token == $5 (usdc, usdt, dai) peg at all times.
 * This is a stablecoin with the properties:
 * - Exegenously Collateralized
 * - USDC, DAI, USDT Pegged
 * - Algorithmically Stable
 *
 * It is similar to DAI if DAI had no governance, no fees, and was backed by only (usdc, usdt, dai, gold).
 * Our streal system is "overcollateralised", at no point should the value of all collateral <= the (usdc, usdt, dai, gold) backed value of Streal
 * @notice This contract is the core of the Decentralized Stablecoin system. It handles all the logic
 * for minting and redeeming Streal, as well as depositing and withdrawing collateral.
 * @notice This contract is based on the MakerDAO DSS system
 */




pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {OracleLib, AggregatorV3Interface} from "./libraries/OracleLib.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Vault} from "./Vault.sol";


contract Streal is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, ReentrancyGuard {
    // state variables
    address[] public _collateralTokens; 
    uint256 private constant Additional_Feed_Precision = 1e10;
    uint256 private constant Feed_Precision = 1e18;
    uint256 private Liquidation_threshold ;
    address[] public supportedTokens;
    address[] public priceFeedAddress;
    address[] public airdroppedAddresses;
    uint256 public airdrops = 40000000 * 1e18;
    uint256 public supply = 200000000 * 1e18;
    uint256 public airdropLockTime;
    uint256 public depositLocktime;
    uint256 public airdropLockTimeSet;
    address[] private Vaults;
    Vault private i_vault;
    
    

    // mappings
    // user -> amount
    mapping (address => uint256) public mintedStreal;
    // user -> token -> amount
    mapping (address => mapping(address => uint256)) public _collateralDeposited;
    // token adress -> chainlink pricefeed address
    mapping (address => address) public priceFeed;
    mapping(address => uint256) public votes;
    mapping(address => address) public hasVoted;
    mapping(address => uint256) public airdropTimes;
    mapping(address => bool) public airdroppedAddress; 
    

    // event
    event collateralDeposited(address indexed user, address indexed token, uint256 amount);
    event airdropped(address indexed user, uint256 amount);
    event redeemedCollateral(address indexed user, uint256 amount);
    event strealDeposited(address indexed user, uint256 amount);
    event withdrawal(address indexed user, uint256 amount);
    event voted(address indexed user);
    event mintRewards(address indexed recipients);


    // modifiers
    modifier allowedToken (address token) {
        require(priceFeed[token] != address(0));
        _;
    }

    modifier moreThanZero (uint256 amount) {
        require(amount > 0);
        _;
    }




    constructor() ERC20("Streal", "STR") {        
        _mint(msg.sender, supply);

    }

    // functions

    function setSupportedTokensAndFeed(address _supportedToken, address _PriceFeed) public onlyOwner {
        supportedTokens.push(_supportedToken);
        priceFeedAddress.push(_PriceFeed);
        require(supportedTokens.length == priceFeedAddress.length); 

        for (uint i = 0; i < supportedTokens.length; i++) {
            priceFeed [supportedTokens[i]] = priceFeedAddress[i];
            _collateralTokens.push(supportedTokens[i]);
        } 

        
    }

    function isAddressInArray(address targetAddress, address[] memory array) internal pure returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == targetAddress) {
                return true;
            }
        }
        return false;
    }


    // remove supported tokens and corresponding priceFeed
    function ModifyTokenAndFeed(uint tokenIndex) public onlyOwner {
        require(tokenIndex < supportedTokens.length);

        if (tokenIndex != supportedTokens.length - 1) {
            supportedTokens[tokenIndex] = supportedTokens[supportedTokens.length - 1];
            _collateralTokens[tokenIndex] = _collateralTokens[_collateralTokens.length - 1];
        }

        supportedTokens.pop();
        _collateralTokens.pop();

        if (tokenIndex != priceFeedAddress.length - 1) {
            priceFeedAddress[tokenIndex] = priceFeedAddress[priceFeedAddress.length - 1];
        }

        priceFeedAddress.pop();
    }


    function depositCollateralAndMintStreal(
    address tokenCollateralAddress,
    uint256 amountCollateral 
    ) public  {

        uint256 payment = depositCollateral(msg.sender, tokenCollateralAddress, amountCollateral);
        // Mint the calculated equivalent amount of Streal tokens
        mintStreal(msg.sender, payment);
        
    }

    function setStrealValue(uint256 _value) public onlyOwner {
        Liquidation_threshold = _value;
    }

    function calculateEquivalentAmountToMint(address tokenCollateralAddress, uint256 amountCollateral) public view returns (uint256) {
        // Determine the decimal places based on the token type
        uint8 tokenDecimals = getDecimals(tokenCollateralAddress);
        uint256 amount = amountCollateral * (10**tokenDecimals);
        

        uint256 strealPrice = Liquidation_threshold * 1e18;
        // Calculate the equivalent amount of Streal tokens based on the collateral value
        uint256 equivalentAmountToMint = (amount * (10**(18 - tokenDecimals))) / (strealPrice);
        return equivalentAmountToMint;
    }

    function getDecimals(address tokenAddress) public view returns (uint8) {
        IERC20Metadata token = IERC20Metadata(tokenAddress);
        return token.decimals();

    }

    
    function setContractAddress(address _contractAddress) public onlyOwner {
        Vaults.push(_contractAddress);
        i_vault = Vault(_contractAddress);

    }
    
    function depositCollateral (address user, address tokenCollateralAddress, uint256 _amount) public  moreThanZero(_amount) nonReentrant allowedToken(tokenCollateralAddress) returns (uint256 payment)
    {   
        require(isAddressInArray(tokenCollateralAddress, supportedTokens), "Address not found in supportedTokens");

        uint8 decimals = getDecimals(tokenCollateralAddress);
        uint256 amount = _amount * (10**decimals);
        _collateralDeposited[user][tokenCollateralAddress] += amount;
        emit collateralDeposited(user, tokenCollateralAddress, amount );

        IERC20(tokenCollateralAddress).transferFrom(
            user, 
            Vaults[0],
            amount
        );

        uint256 params = amount / 10**decimals;
        // Calculate the equivalent amount of Streal tokens to mint based on the collateral type
        uint256 equivalentAmountToMint = calculateEquivalentAmountToMint(tokenCollateralAddress, params);
        payment = equivalentAmountToMint * 1e18;
        return payment;  

    }

    function depositStrealAndGetToken(uint256 amountStreal, address tokenCollateralAddress) public {
        require(isAddressInArray(tokenCollateralAddress, supportedTokens), "Address not found in supportedTokens");
        require(block.timestamp >= getUserStartTime(msg.sender) + depositLocktime);
        require(!airdroppedAddress[msg.sender], "airdrop");
        
        // Determine the decimal places based on the token type
        uint8 tokenDecimals = getDecimals(tokenCollateralAddress);
        
        // Calculate the equivalent amount of collateral tokens based on the Streal value
        uint256 equivalentAmountToReceive = (amountStreal * Liquidation_threshold) * (10 ** tokenDecimals);
        
        uint256 calc = (equivalentAmountToReceive * 3) / 100;

        uint256 amountAfterFee = equivalentAmountToReceive - calc;
        uint256 leftOver = equivalentAmountToReceive - amountAfterFee;

        uint256 div = amountAfterFee / (10 ** tokenDecimals);
        
        // Deduct the Streal from the user's balance
        _burn(msg.sender, amountStreal * 1e18);
        _mint(owner(), amountStreal * 1e18);
        
        // Transfer the fee to the contract owner and the remaining amount to the user
        i_vault.transferToken(tokenCollateralAddress, owner(), leftOver); 
        i_vault.transferToken(tokenCollateralAddress, msg.sender, amountAfterFee);

        // Update the user's collateral balance (if required)
        if (_collateralDeposited[msg.sender][tokenCollateralAddress] >= (leftOver + amountAfterFee)) {
            _collateralDeposited[msg.sender][tokenCollateralAddress] -= (leftOver + amountAfterFee);
            mintedStreal[msg.sender] -= amountStreal * 1e18;
        }

        emit strealDeposited(msg.sender, div);
    }



    function redeemCollateralForStreal(
        address tokenCollateralAddress,
        uint256 amountCollateral
    ) public {

        require(isAddressInArray(tokenCollateralAddress, supportedTokens), "Address not found in supportedTokens");
        require(block.timestamp >= getUserStartTime(msg.sender) + airdropLockTime);
        require(!airdroppedAddress[msg.sender]);
        //  for (uint i = 0; i < supportedTokens.length; i++) {
        //     require(supportedTokens[i] == tokenCollateralAddress, "invalid token");
        // }
        uint8 tokenDecimals = getDecimals(tokenCollateralAddress);
        uint256 amount = amountCollateral * (10**tokenDecimals);
        uint256 strealToBurn = calculateEquivalentAmountToMint(tokenCollateralAddress, amountCollateral);
        uint256 _amount = strealToBurn * 1e18; 
        // Calculate the fee
        uint256 fee = amount * 5 / 100;

        // Ensure that the user has enough collateral deposited
        require(_collateralDeposited[msg.sender][tokenCollateralAddress] >= amount);
        // Deduct the collateral from the user's deposited collateral
        _collateralDeposited[msg.sender][tokenCollateralAddress] -= amount;
        // Deduct the fee from the collateral
        uint256 balances =  amount - fee; 
        uint256 leftOver = balances / 10**tokenDecimals;
        uint256 contractBalance = IERC20(tokenCollateralAddress).balanceOf(Vaults[0]);
        require(contractBalance >= balances);
        // Transfer the collateral to the user
        i_vault.transferToken(tokenCollateralAddress, msg.sender, balances);
        i_vault.transferToken(tokenCollateralAddress, owner(), fee);
         
        
       
        // Burn the Streal tokens
        burnStreal(_amount);
        emit redeemedCollateral(msg.sender, leftOver);
        
    }
    /* 
    @notice amountToMint the amount of streal to mint
    @notice check if they have more collateral value than the minimum threshHold
    */
    

    function mintStreal(address user, uint256 amountToMint) private moreThanZero(amountToMint){
       mintedStreal[user] += amountToMint;
       bool minted = mint(user, amountToMint);
        require(minted);
    }
    

    // don't call this function directly or you'll lose money
    function burnStreal(uint256 _amountToBurn) private moreThanZero(_amountToBurn) nonReentrant {
        uint256 amountToBurn = _amountToBurn;
        _burnStreal(amountToBurn, msg.sender);
    }

    function _burnStreal(
        uint256 amountToBurn,
        address onBehalfOf
    ) private {
        mintedStreal[onBehalfOf] -= amountToBurn;
        burn(amountToBurn);
    }




      ////////////////////////////////////
     // internal and private Functions //
    ////////////////////////////////////
    function getAccountCollateralValueInUsd(address user) public view returns(uint256 totalCollateralValueInUsd) {
        for (uint256 i = 0; i < _collateralTokens.length; i++) {
            address token = _collateralTokens[i];
            uint256 amount = _collateralDeposited[user][token];
            totalCollateralValueInUsd += getUsdValue(token, amount);  // add the value instead of replacing it
        }
        return totalCollateralValueInUsd;
    }



    function _getAccountInfo(address user) public view returns(uint256 totalStrealMinted, uint256 collateralValueInUsd){
        totalStrealMinted = mintedStreal[user];
        collateralValueInUsd = getAccountCollateralValueInUsd(user);
    }

    

    function getUsdValue(address token, uint256 amount) public view returns(uint256){
        AggregatorV3Interface price_Feed = AggregatorV3Interface(priceFeed[token]);
        (, int256 price,,,) = price_Feed.latestRoundData();
        return ((uint256(price) * Additional_Feed_Precision) * amount) / Feed_Precision ;

    }


    function withdraw() public onlyOwner {
        for (uint i=0; i<supportedTokens.length; i++) {
            IERC20 token = IERC20(supportedTokens[i]);
            uint256 balances = token.balanceOf(address(this));
            if (balances > 0) {
                token.transfer(msg.sender, balances);
            }
            emit withdrawal(msg.sender, balances);
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

    function snapshot() public onlyOwner { 
        _snapshot();
    }


    // 0x099fcF7Dd4819049bbAfF3C9dF3d490369513985

    function burn(uint256 _amount) public override{
        uint256 balances = balanceOf(msg.sender);
        
        require(_amount > 0);
        require (balances >= _amount); 
        super.burn(_amount);
    }

    function burnForCommerce(uint256 _amount) public  onlyOwner moreThanZero(_amount) nonReentrant {
        uint256 balances = balanceOf(msg.sender);
        require (balances >= _amount); 
        super.burn(_amount * 1e18);
    }


    function mint(address to, uint256 amount) internal nonReentrant returns (bool) {
        require (to != address(0));
        require (amount >= 0);
       _mint(to, amount);
       return true;
    }


    function mintForCommerce(address _to, uint256 amount) public nonReentrant  returns (bool) {
        require(msg.sender == Vaults[0]);
       address to = _to;  
        require (amount >= 0);
       _mint(to, amount);
       return true;
    }

    // this funcion allows new tokens to be minted into the adddresss of various users as redwards
    function mintReward(address[] memory recipients, uint256[] memory amounts) public onlyOwner nonReentrant returns (bool) {
        require(recipients.length == amounts.length);

        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            uint256 amount = amounts[i];
            require(to != address(0));
            require(amount >= 0);
            emit mintRewards(recipients[i]);
            _mint(to, amount * 1e18);
        }
        return true;
    }


    // The following functions are overrides required by Solidity.
    
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);

    }


    function getUserStartTime(address user) public view returns (uint256) {
        if (airdroppedAddress[user]){
            // If the user is in the airdrop list, use the airdrop time
            return airdropTimes[user];
        } else {
            // If the user is not in the airdrop list, use the time when the airdropLockTime was set
            return airdropLockTimeSet;
        }
    }


   function setAirdropLockTime(uint256 _airdropLockTime, uint256 _depositLocktime) public onlyOwner {
        airdropLockTime = _airdropLockTime;
        depositLocktime = _depositLocktime;
        airdropLockTimeSet = block.timestamp;
    }

    
    
    function airdrop(address[] memory recipients, uint256[] memory values) public onlyOwner nonReentrant returns (bool success) {
        require(recipients.length == values.length);

        uint256 totalValue = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0));
            totalValue += values[i];
        }

        require(totalValue <= airdrops);
 
        for (uint256 i = 0; i < recipients.length; i++) {
            transfer(recipients[i], values[i] * (10 ** 18));
            airdroppedAddresses.push(recipients[i]);
            airdroppedAddress[recipients[i]] = true;
            emit airdropped(recipients[i], values[i] * 1e18);
        }

        for (uint256 i = 0; i < recipients.length; i++) {
            airdropTimes[recipients[i]] = block.timestamp;
        }
        airdrops -= totalValue * 1e18;
        uint256 bal = balanceOf(owner());
        bal -= totalValue * 1e18; 
        return success;
    }

    function vote(address candidate, uint256 _amount) public returns (bool success) {
        require(candidate != msg.sender);
        require(hasVoted[msg.sender] != candidate);
        votes[candidate] += 1 * _amount;
        hasVoted[msg.sender] = candidate;
        _transfer(msg.sender, Vaults[1],  _amount * 1e18);
        emit voted(candidate);
        return success;
    }

}