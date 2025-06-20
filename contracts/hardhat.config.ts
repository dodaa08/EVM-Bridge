import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox"; // Prefer toolbox (includes ethers, waffle, etc.)
import dotenv from "dotenv";

dotenv.config();

const { Eth_RPC, BASE_RPC, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    baseSepolia: {
      url: BASE_RPC || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 84532,
    },
    sepolia: {
      url: Eth_RPC || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111, // ✅ Ethereum Sepolia Chain ID
    },
  },
};

export default config;
