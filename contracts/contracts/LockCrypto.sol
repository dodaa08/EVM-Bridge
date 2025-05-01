// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

// Functions Deposit and withdraw crypto

// Add an IERC20 for CCI into this contract using the interface.

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LockCrypto {
    IERC20 public token;


    mapping (address => uint256) pendingAmount; // keep a track of amount an address holds..
 
    constructor(address _USDTaddress){
        token = IERC20(_USDTaddress);  // contract address to hold the assets..
    }

    function Deposit(uint256 amount, address to) public {
        require(amount > 0, "Enter a valid amount..");
        token.transferFrom(msg.sender, address(this), amount);
        pendingAmount[to] += amount;   
    }

    function withdraw(uint256 amount, address from) public {
        require(msg.sender == from, "Only owner can withdraw");
        require(pendingAmount[from] >= amount);  // why ? 
        pendingAmount[from] -= amount;
        token.transfer(from, amount);
    }
    
}



// Locking and unlocking of the crypto for the first part of building a Bridge..
