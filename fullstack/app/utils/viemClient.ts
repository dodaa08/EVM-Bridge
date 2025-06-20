import { createWalletClient, createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

export const baseSepolia = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Base Sepolia Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
    public: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://sepolia.basescan.org' },
  },
  testnet: true,
};

export { sepolia };

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;

export const basePublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC),
});

export const ethPublicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.ETH_RPC),
});

export const baseWalletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC),
  account: PRIVATE_KEY,
});

export const ethWalletClient = createWalletClient({
  chain: sepolia,
  transport: http(process.env.ETH_RPC),
  account: PRIVATE_KEY,
});
