// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Token.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeEth is Ownable{
    Token public token;

    event TokenMinted(address indexed token, uint256 amount);
    event TokenBurned(address indexed token, uint256 amount);

    constructor(address _token) {
        token = Token(_token);
    }

    function mintTokens(address user, uint256 amount) public  onlyOwner{
        token.mint(user, amount);   
        emit TokenMinted(user, amount); // to 
    }

    function burnTokens(uint256 amount) public {
        token.burnFrom(msg.sender, amount);
        emit TokenBurned(msg.sender, amount);  // from
    }
}

