'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useBalance, useWriteContract, useConfig } from 'wagmi';
import { waitForTransactionReceipt, readContract } from 'wagmi/actions';
import { parseEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import BridgeTabs from './BridgeTabs';
import { ArrowUpDownIcon, ChevronDownIcon, SettingsIcon, InfoIcon } from './Icons';
import BridgeBaseAbi from '../contracts/BridgeBase.json';

const BASE_SEPOLIA_CHAIN_ID = 84532;
const ETH_SEPOLIA_CHAIN_ID = 11155111;

const Bridge = () => {
  const { isConnected, address } = useAccount();
  const [selectedTab, setSelectedTab] = useState('Bridge');
  const [fromAmount, setFromAmount] = useState('');
  const fromNetwork = 'base';
  const toNetwork = 'ethereum';
  const [isClient, setIsClient] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  const handleBridging = async () => {
    if (!fromAmount || !address) return;

    const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_BASE_A! as `0x${string}`;
    const bridgeAddress = process.env.NEXT_PUBLIC_BRIDGE_BASE_A! as `0x${string}`;
    
    let amount: bigint;
    try {
      amount = parseEther(fromAmount as `${number}`);
    } catch (error) {
      alert("Invalid amount entered. Please enter a valid number.");
      return;
    }

    const erc20Abi = [
      {
        "inputs": [
          { "name": "spender", "type": "address" },
          { "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [ { "name": "", "type": "bool" } ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
            { "name": "owner", "type": "address" },
            { "name": "spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [ { "name": "", "type": "uint256" } ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    try {
      // 1. Approve the bridge contract to spend tokens
      alert("Please approve the token spending in your wallet.");
      const approveHash = await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [bridgeAddress, amount],
        chainId: BASE_SEPOLIA_CHAIN_ID,
      });

      alert(`Approval transaction sent: ${approveHash}. Waiting for confirmation...`);
      await waitForTransactionReceipt(config, { hash: approveHash, chainId: BASE_SEPOLIA_CHAIN_ID });
      alert('Approval confirmed! Verifying allowance on-chain before locking...');

      // Poll to verify allowance
      const checkAllowance = async () => {
        for (let i = 0; i < 15; i++) { // Poll for ~30 seconds
          try {
            const allowance = await readContract(config, {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: 'allowance',
              args: [address!, bridgeAddress],
              chainId: BASE_SEPOLIA_CHAIN_ID,
            }) as bigint;

            if (allowance >= amount) {
              console.log(`Allowance verified: ${allowance}`);
              return;
            }
            console.log(`Polling for allowance... Current: ${allowance}, Needed: ${amount}`);
          } catch (e) {
            console.error("Polling error:", e);
          }
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
        throw new Error("Allowance not confirmed on-chain in time.");
      };
      await checkAllowance();

      // 2. Lock tokens on the source chain (Base Sepolia)
      alert("Allowance verified. Please approve the lock transaction in your wallet.");
      const lockHash = await writeContractAsync({
        address: bridgeAddress,
        abi: BridgeBaseAbi,
        functionName: 'lock',
        args: [tokenAddress, amount],
        chainId: BASE_SEPOLIA_CHAIN_ID,
      });

      alert(`Lock transaction sent: ${lockHash}. Waiting for confirmation...`);
      await waitForTransactionReceipt(config, { hash: lockHash, chainId: BASE_SEPOLIA_CHAIN_ID });
      alert('Lock confirmed! Now minting on the destination chain...');

      // 3. Call the backend to mint tokens on the destination chain (ETH Sepolia)
      const mintResponse = await fetch("/api/bridge/mint", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: address,
          amount: amount.toString(),
        })
      });

      if (!mintResponse.ok) {
        const errorData = await mintResponse.text();
        throw new Error(`Minting failed: ${errorData}`);
      }

      const mintData = await mintResponse.json();

      alert(`Bridge successful!\n\nLock Tx: https://sepolia.basescan.org/tx/${lockHash}\nMint Tx: https://sepolia.etherscan.io/tx/${mintData.hash}`);
    } catch (error) {
      console.error('Bridge error:', error);
      alert(`Error during bridge operation: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data } = useBalance({
    address,
    chainId: BASE_SEPOLIA_CHAIN_ID
  });

  const networks = {
    base: {
      name: 'Base Sepolia',
      icon: 'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue-300x300.webp',
      color: 'from-blue-400 to-blue-600'
    },
    ethereum: {
      name: 'Ethereum Sepolia',
      icon: 'https://i.pinimg.com/736x/97/c4/a0/97c4a08498d7652df955e9d53d14e220.jpg',
      color: 'from-blue-500 to-purple-600'
    }
  };

  const formatBalance = (balance: bigint | undefined) => {
    if (!balance) return '0.00';
    return (Number(balance) / 1e18).toFixed(4);
  };

  return (
    <div className="flex flex-col justify-center p-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />

          <div className="relative z-10 flex items-center justify-between mb-6">
            <BridgeTabs selected={selectedTab} onSelect={setSelectedTab} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
            >
              <SettingsIcon className="w-5 h-5 text-gray-300" />
            </motion.button>
          </div>

          <div className="relative z-10 mb-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-400">From</span>
              <span className="text-sm text-gray-400">Balance: {isClient ? formatBalance(data?.value) : '0.00'} ETH</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img src={networks[fromNetwork].icon} alt={networks[fromNetwork].name} className="w-8 h-8 rounded-full" />
                  <span className="font-semibold text-white">{networks[fromNetwork].name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">ETH</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={fromAmount}
                  onChange={e => {
                    const filtered = e.target.value.replace(/[^0-9.]/g, '');
                    const valid = filtered.replace(/(\..*)\./g, '$1');
                    setFromAmount(valid);
                  }}
                  placeholder="0.0"
                  className="bg-transparent text-3xl font-bold outline-none w-full text-white placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (data?.value) {
                      const maxAmount = (Number(data.value) / 1e18 * 0.95).toFixed(6);
                      setFromAmount(maxAmount);
                    }
                  }}
                  className="px-3 py-1 text-sm font-semibold text-white rounded-lg hover:shadow-lg"
                >
                  MAX
                </motion.button>
              </div>
            </div>
          </div>

          <div className="relative z-10 mb-6 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-400">To</span>
              <span className="text-sm text-gray-400">Network: Ethereum Sepolia</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <img src={networks[toNetwork].icon} alt={networks[toNetwork].name} className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-white">{networks[toNetwork].name}</span>
              </div>

              <div className="text-3xl font-bold text-gray-500 mt-2">{fromAmount || '0.0'}</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6"
          >
            <div className="flex items-start space-x-3">
              <InfoIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">Bridge Time: ~3-5 minutes</p>
                <p className="text-blue-300/80">Your tokens will be available on Ethereum Sepolia after confirmation.</p>
              </div>
            </div>
          </motion.div>

          {isConnected ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBridging}
              disabled={!fromAmount || !data || parseEther(fromAmount as `${number}`,'wei') > data.value}
              className={`relative z-10 w-full py-4 rounded-2xl font-bold text-lg ${
                !fromAmount || !data || parseEther(fromAmount as `${number}`,'wei') > data.value
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/30'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {!fromAmount
                ? "Enter an amount"
                : data && parseEther(fromAmount as `${number}`,'wei') <= data.value
                ? "Bridge Tokens"
                : "Insufficient balance"}
            </motion.button>
          ) : (
            <div className="relative z-10 flex justify-center">
              <ConnectButton />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Bridge;
