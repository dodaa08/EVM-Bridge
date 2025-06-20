'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between w-full max-w-6xl px-6 py-4 mb-8"
    >
      <motion.div 
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-30" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            BridgeCrypto
          </h1>
          <p className="text-sm text-gray-400">Cross-chain bridge</p>
        </div>
      </motion.div>
      
      <div className="flex items-center space-x-4">
       
        
        <div className="connect-button-wrapper">
          <ConnectButton />
        </div>
      </div>
    </motion.header>
  );
}