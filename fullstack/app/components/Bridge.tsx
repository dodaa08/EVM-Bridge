'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import BridgeTabs from './BridgeTabs';
import { useBalance } from 'wagmi';
import { ArrowUpDownIcon, ChevronDownIcon, SettingsIcon, InfoIcon } from './Icons';

const Bridge = () => {
  const { isConnected, address } = useAccount();
  const [selectedTab, setSelectedTab] = useState('Bridge');
  const [fromAmount, setFromAmount] = useState('');
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [fromNetwork, setFromNetwork] = useState('ethereum');
  const [toNetwork, setToNetwork] = useState('base');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isSuccess, isError, isLoading } = useBalance({
    address,
  });

  const networks = {
    ethereum: {
      name: 'Ethereum',
      icon: 'https://i.pinimg.com/736x/97/c4/a0/97c4a08498d7652df955e9d53d14e220.jpg',
      color: 'from-blue-500 to-purple-600'
    },
    base: {
      name: 'Base',
      icon: 'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue-300x300.webp',
      color: 'from-blue-400 to-blue-600'
    }
  };

  const swapNetworks = () => {
    const temp = fromNetwork;
    setFromNetwork(toNetwork);
    setToNetwork(temp);
  };

  const formatBalance = (balance: bigint | undefined) => {
    if (!balance) return '0.00';
    const formatted = Number(balance) / 1e18;
    return formatted.toFixed(4);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg"
      >
        {/* Main Bridge Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
          
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between mb-6">
            <BridgeTabs selected={selectedTab} onSelect={setSelectedTab} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <SettingsIcon className="w-5 h-5 text-gray-300" />
            </motion.button>
          </div>

          {/* From Section */}
          <div className="relative z-10 mb-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-400">From</span>
              <span className="text-sm text-gray-400">
                Balance: {isClient ? formatBalance(data?.value) : '0.00'} ETH
              </span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFromDropdownOpen(!isFromDropdownOpen)}
                    className="flex items-center space-x-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2 hover:bg-white/20 transition-all duration-200"
                  >
                    <div className="relative">
                      <img 
                        src={networks[fromNetwork as keyof typeof networks].icon} 
                        alt={networks[fromNetwork as keyof typeof networks].name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${networks[fromNetwork as keyof typeof networks].color} opacity-20`} />
                    </div>
                    <span className="font-semibold text-white">{networks[fromNetwork as keyof typeof networks].name}</span>
                    <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isFromDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">ETH</span>
                  <img 
                    src="https://i.pinimg.com/736x/97/c4/a0/97c4a08498d7652df955e9d53d14e220.jpg" 
                    alt="ETH" 
                    className="w-6 h-6 rounded-full"
                  />
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
                  className="px-3 py-1 text-sm font-semibold text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  MAX
                </motion.button>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="relative z-10 flex justify-center -my-2">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={swapNetworks}
              className="p-3 bg-white/10 border border-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              <ArrowUpDownIcon className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* To Section */}
          <div className="relative z-10 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-400">To</span>
              <span className="text-sm text-gray-400">
                Balance: 0.0000 ETH
              </span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsToDropdownOpen(!isToDropdownOpen)}
                    className="flex items-center space-x-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2 hover:bg-white/20 transition-all duration-200"
                  >
                    <div className="relative">
                      <img 
                        src={networks[toNetwork as keyof typeof networks].icon} 
                        alt={networks[toNetwork as keyof typeof networks].name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${networks[toNetwork as keyof typeof networks].color} opacity-20`} />
                    </div>
                    <span className="font-semibold text-white">{networks[toNetwork as keyof typeof networks].name}</span>
                    <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isToDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Base</span>
                  <img 
                    src="https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue-300x300.webp" 
                    alt="ETH" 
                    className="w-6 h-6 rounded-full"
                  />
                </div>
              </div>
              
              <div className="text-3xl font-bold text-gray-500">
                {fromAmount || '0.0'}
              </div>
            </div>
          </div>

          {/* Bridge Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6"
          >
            <div className="flex items-start space-x-3">
              <InfoIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">Bridge Time: ~3-5 minutes</p>
                <p className="text-blue-300/80">Your tokens will be available on {networks[toNetwork as keyof typeof networks].name} after confirmation.</p>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          {isConnected ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setFromAmount(fromAmount);
              }}
              disabled={!fromAmount || !data || BigInt(Math.floor(parseFloat(fromAmount) * 1000000)) * BigInt(10**12) > data.value}
              className={`relative z-10 w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                !fromAmount || !data || BigInt(Math.floor(parseFloat(fromAmount) * 1000000)) * BigInt(10**12) > data.value
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/30'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              {!fromAmount 
                ? "Enter an amount" 
                : data && BigInt(Math.floor(parseFloat(fromAmount) * 1000000)) * BigInt(10**12) <= data.value 
                  ? <> <button className='bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700'>Bridge tokens</button> </> 
                  : "Insufficient balance"
              }
            </motion.button>
          ) : (
            <div className="relative z-10 flex justify-center">
              <div className="connect-button-wrapper">
                <ConnectButton />
              </div>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
        >
          <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
          <div className="text-center py-8 text-gray-400">
            <p>No recent transactions</p>
            <p className="text-sm mt-1">Your bridge history will appear here</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Bridge;