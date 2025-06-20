# EVM Bridge

This project implements a simple cross-chain token bridge using Solidity smart contracts. It allows users to lock tokens on one chain and mint or unlock equivalent tokens on another chain, facilitating asset transfers between EVM-compatible blockchains.

## Contracts

- **Token.sol**: An ERC20 token contract with minting and burning capabilities, owned by the deployer.
- **BridgeBase.sol**: A base bridge contract for locking and unlocking tokens, with owner-only unlock functionality.
- **BridgePolygon.sol**: A bridge contract for the Polygon network, allowing the owner to mint and burn tokens on Polygon.

## Features
- ERC20 token with mint and burn functions
- Owner-only minting and unlocking
- Event logging for token mint, burn, and lock actions

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```

3. **Run tests (if any):**
   ```bash
   npx hardhat test
   ```

## Usage

- Deploy `Token.sol` to your desired network.
- Deploy `BridgeBase.sol` or `BridgePolygon.sol`, passing the token contract address to the constructor.
- Use the bridge contracts to lock, mint, burn, or unlock tokens as needed.

## Directory Structure
```
contracts/
  ├── Token.sol
  ├── BridgeBase.sol
  └── BridgePolygon.sol
```

## Requirements
- Node.js
- Hardhat
- OpenZeppelin Contracts (v4.9.6 or later)

## License
MIT
