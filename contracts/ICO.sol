// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
/*
["0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0", "0xe9DcE89B076BA6107Bb64EF30678efec11939234", "0xF14f9596430931E177469715c591513308244e8F"]

*/
contract ICO is Ownable {
    
    mapping(address => uint256) public balance;
    address[] public supportedTokens;
    address[] public vault;
    uint256 public ICOpricePeg;


    constructor() {
        
    }

    function setSupportedToken (address _supportedTokens) public onlyOwner {
        supportedTokens.push(_supportedTokens);
    }

    // takes an index parameter to specify the position of the token you want to modify. It checks if the index is valid and then updates the token at that index with the new token address.
    function modifyToken(uint index, address newToken) public onlyOwner {
        require(index < supportedTokens.length, "Invalid index");
        supportedTokens[index] = newToken;
    }

    // // remove token by specifying the index
    function removeToken(uint index) public onlyOwner{
        require(index < supportedTokens.length, "Invalid index");
        if (index != supportedTokens.length - 1) {
            supportedTokens[index] = supportedTokens[supportedTokens.length - 1];
        }
        supportedTokens.pop();
    }


    function removeVault(uint index) public onlyOwner{
        require(index < vault.length, "Invalid index");
        if (index != vault.length - 1) {
            vault[index] = vault[vault.length - 1];
        }
        vault.pop();
    }

    function isTokenSupported(address token) internal view returns (bool) {
        // Check if the token is present in the array of supported tokens
        for (uint i = 0; i < supportedTokens.length; i++) {
            if (supportedTokens[i] == token) {
            return true;
            }
        }
        return false;
    }

    function getDecimals(address tokenAddress) public view returns (uint8) {
        IERC20Metadata token = IERC20Metadata(tokenAddress);
        return token.decimals();

    }

    function setPricePeg (uint256 _pricePeg) public onlyOwner {
        ICOpricePeg = _pricePeg * 1e18;
    }

    function setVault (address _vault) public onlyOwner {
        vault.push(_vault);
    }

    function deposit(address tokenAddress, uint256 amount) public {

        require(tokenAddress != address(0) && isTokenSupported(tokenAddress), "token not supported");
        require(amount > 0, "Amount must be greater than zero");
        require(tokenAddress != address(0), "Invalid token address");
        uint256 decimals = getDecimals(tokenAddress);
        uint256 _amount = amount * 10**decimals;
        require(IERC20(tokenAddress).balanceOf(msg.sender) >= _amount, "Insufficient balance.");
        uint256 equivalentAmount = (_amount * (10**(18-decimals))) / ICOpricePeg;
        uint256 finalAmount = equivalentAmount * 1e18;
        IERC20(tokenAddress).transferFrom(msg.sender, owner(), _amount);
        IERC20(vault[1]).transferFrom(vault[0], msg.sender, finalAmount);
        balance[tokenAddress] += amount;

    }
}