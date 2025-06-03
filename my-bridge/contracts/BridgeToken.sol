// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeToken is ERC20, Ownable {
    mapping(bytes32 => bool) public processedNonces;

    event Mint(address indexed to, uint256 amount, uint256 nonce);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount, uint256 nonce) external onlyOwner {
        bytes32 mintId = keccak256(abi.encodePacked(to, amount, nonce));
        require(!processedNonces[mintId], "Already processed");

        processedNonces[mintId] = true;
        _mint(to, amount);

        emit Mint(to, amount, nonce);
    }
}
