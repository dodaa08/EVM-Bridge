'use client';

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { 
  metaMaskWallet, 
  walletConnectWallet, 
  coinbaseWallet, 
  phantomWallet,
  trustWallet,
  rainbowWallet,
  argentWallet,
  ledgerWallet
} from '@rainbow-me/rainbowkit/wallets'
import '@rainbow-me/rainbowkit/styles.css'
import { baseSepolia } from '../utils/viemClient'

const { chains, publicClient } = configureChains(
  [sepolia, baseSepolia],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || 'demo' }),
    publicProvider()
  ]
)

const projectId = 'eea4c8fc69d394908a9e6b1f19b5b255'

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains, projectId }),
      walletConnectWallet({ chains, projectId }),
      coinbaseWallet({ appName: 'Bridge App', chains }),
      phantomWallet({ chains }),
      trustWallet({ chains, projectId }),
      rainbowWallet({ chains, projectId }),
      argentWallet({ chains, projectId }),
      ledgerWallet({ chains, projectId })
    ]
  }
])

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
} 