# EVM Bridge: Ethereum to Base

## Overview

This project is an EVM-compatible cross-chain bridge that enables seamless transfer of assets, primarily ETH, from the Ethereum mainnet to the Base network. The bridge ensures secure, fast, and decentralized token transfers using smart contracts and off-chain relayers.

---

## Features

- **Secure Transfers**: Utilizes smart contracts on both Ethereum and Base to lock and mint tokens securely.
- **Cross-Chain Compatibility**: Fully compatible with EVM-based networks.
- **Efficient Relaying**: Off-chain relayers monitor and relay transfer proofs for confirmation.
- **User-Friendly Interface**: Simple commands or frontend integration to initiate transfers.
- **Event Logs and Verification**: Transparent on-chain event logs for tracking bridge activity.

---

## How It Works

1. **Lock on Ethereum:** User deposits ETH into a smart contract on the Ethereum mainnet.
2. **Relay Event:** The deposit event is detected by the relayer service.
3. **Mint on Base:** After verifying the event, the relayer triggers minting of corresponding wrapped ETH tokens on the Base network.
4. **Redeem Back:** Users can redeem wrapped tokens on Base back to ETH on Ethereum by reversing the process.

---

## Installation

### Prerequisites

- Node.js (v16+)
- Foundry or Hardhat (for smart contract compilation and testing)
- Access to Ethereum and Base RPC endpoints
- [Optional] Docker for running local testnets

### Clone the Repo

```bash
git clone https://github.com/dodaa08/EVM-Bridge.git
cd EVM-Bridge
