// SPDX-License-Identifier: MIT

/*
 * @title DecentralizedStableCoin
 * @author James Luiz
 * Collateral: Exogenous
 * Minting (Stability Mechanism): Decentralized (Algorithmic)
 * Value (Relative Stability): Anchored (Pegged to USD)
 * Collateral Type: Crypto
 *
 * This is the contract meant to be owned by DSCEngine. It is a ERC20 token that can be minted and burned by the strealEngine.
 */




pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract Streal2 is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, AccessControl {
    uint256 public airdrops = 100000000 * 1e18;
    uint256 public supply = 200000000 * 1e18;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor() ERC20("Streal", "Streal") {
        
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, supply);
        supply -= airdrops;

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

    function burn(uint256 _amount) public override onlyRole(ADMIN_ROLE) {
        uint256 balance = balanceOf(msg.sender);
        
        require(_amount > 0, "amount must be more than zero");
        require (balance > _amount, "burnable exceeds balance"); 
        super.burn(_amount);
    }


    function mint(address to, uint256 amount) public onlyRole(ADMIN_ROLE) returns (bool) {

        require (to != address(0), "invalid address");
        require (amount >= 0, "amount must be more than zero");
       _mint(to, amount);
       return true;
    }

    // this funcion allows new tokens to be minted into the adddresss of various users as redwards
    function mintReward(address[] memory recipients, uint256[] memory amounts) public onlyOwner returns (bool) {
        require(recipients.length == amounts.length, "recipients and amounts arrays must have the same length");

        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            uint256 amount = amounts[i];
            require(to != address(0), "invalid address");
            require(amount >= 0, "amount must be more than zero");

            _mint(to, amount);
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

    function airdrop(address[] memory recipients, uint256[] memory values) public onlyOwner returns (bool success) {
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