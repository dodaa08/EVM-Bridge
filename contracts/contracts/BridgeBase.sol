// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract BridgeBase is Ownable{ 
    IERC20 public token;
    event TokenLocked(address indexed user, address indexed token, uint256 amount);

    constructor(address _token) {
        token = Token(_token);
    }

    function lock(address tokenAddress, uint256 amount) public {
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount); // from msg.sender to the contract address of this contract where it will be deployed..
        emit TokenLocked(msg.sender, tokenAddress, amount);
    }

    function unlock( address user, address tokenAddress, uint256 amount ) public onlyOwner {
        IERC20(tokenAddress).transfer(user, amount); // unlock it to the address of the user means transfer them from the contract to the pol chain.. 
    }
}




