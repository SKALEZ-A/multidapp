// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12; 
import {Streal} from "./streal2.sol"; 
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Vault is ReentrancyGuard{
    address internal owner;
    address internal CDS;
    mapping(address => uint256) public balance; 
    Streal public i_streal;
    
    event collateralDeposit(address indexed user, uint256 amount);
    constructor() {
        owner = msg.sender;
    }
 

    function getBalance(address token) public view returns (uint256 balances) {
        return balances = IERC20(token).balanceOf(address(this));
    }

    function withdraw(address token, uint256 amount) external nonReentrant {
        require(msg.sender == owner, "only the owner can call this function");
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient balance.");
        // Transfer the tokens from the contract to the caller
        IERC20(token).transfer(msg.sender, amount);
    }

    function SetCDS(address _CDS) public {
        require(msg.sender == owner, "only owner can call this function");
        i_streal = Streal(_CDS);
        CDS = _CDS;
    }

    function transferToken(address token, address recipient, uint256 amount) external nonReentrant {
        require(msg.sender == CDS, "Function only accessible to Streal contract");
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient balance.");

        // Transfer the tokens from the contract to the recipient
        IERC20(token).transfer(recipient, amount);
    }

    function deposit(address user, address tokenAddress, uint256 amount) external {
       
        require(amount > 0, "Amount must be greater than zero");
        require(tokenAddress != address(0), "Invalid token address");
        
        // Update the balance
        balance[tokenAddress] += amount;
        
        // Call the 'mint' and depositCollateral function
        uint256 payment = i_streal.depositCollateral(msg.sender, tokenAddress, amount);
        i_streal.mintForCommerce(user, payment);
        emit collateralDeposit(user, amount);
    }
}
