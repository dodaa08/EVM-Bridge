<!-- Banner/Logo suggestion -->
<p align="center">
  <img src="https://placehold.co/600x120/222/fff?text=EVM+Bridge" alt="EVM Bridge Logo" width="60%"/>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/openzeppelin-4.9.6%2B-4B32C3" alt="OpenZeppelin"></a>
</p>

# EVM Bridge

> **A simple, creative cross-chain token bridge for EVM-compatible blockchains!**

---

## Features

- **ERC20 token** with mint & burn
- **Owner-only** minting & unlocking
- **Event logging** for all bridge actions
- **Cross-chain** asset transfer support

---

## Contracts

| Contract            | Description                                                      |
|--------------------|------------------------------------------------------------------|
| `Token.sol`        | ERC20 token with mint/burn, owned by deployer                     |
| `BridgeBase.sol`   | Base bridge for locking/unlocking tokens, owner-only unlock       |
| `BridgePolygon.sol`| Polygon bridge, owner can mint/burn tokens on Polygon             |

---

## Directory Structure

```text
contracts/
  ├── Token.sol
  ├── BridgeBase.sol
  └── BridgePolygon.sol
```

---

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```
3. **Run tests:**
   ```bash
   npx hardhat test
   ```

---

## Usage

- Deploy `Token.sol` to your network.
- Deploy `BridgeBase.sol` or `BridgePolygon.sol`, passing the token address.
- Use bridge contracts to lock, mint, burn, or unlock tokens as needed.

---

## How It Works

```mermaid
flowchart LR
    User1[User on Chain A] -- Lock --> BridgeA[BridgeEth]
    BridgeA -- Event --> OffChainRelayer
    OffChainRelayer -- Mint Request --> BridgeB[BridgeBase]
    BridgeB -- Mint --> User2[User on Chain B]
```

---

## Requirements

- Node.js
- Hardhat
- OpenZeppelin Contracts (v4.9.6+)

---

## ⚖️ License

[MIT](./LICENSE)

---

<p align="center">
  <b>Made with ❤️ for the EVM ecosystem</b>
</p>
