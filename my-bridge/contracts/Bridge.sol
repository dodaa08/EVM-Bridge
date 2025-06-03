// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bridge is Ownable {
    IERC20 public token; // token to be bridged
    mapping(bytes32 => bool) public processedNonces;
    uint256 public nonce;

    event Lock(address indexed sender, address indexed recipient, uint256 amount, uint256 nonce);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function lockTokens(address recipient, uint256 amount) external {
        require(amount > 0, "Amount must be > 0");

        // Transfer tokens from sender to this contract (user must approve first)
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        nonce++;
        bytes32 lockId = keccak256(abi.encodePacked(msg.sender, recipient, amount, nonce));
        processedNonces[lockId] = true;

        emit Lock(msg.sender, recipient, amount, nonce);
    }
}
