'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Network {
  id: string;
  name: string;
  icon: string;
}

interface NetworkSelectorProps {
  networks: Network[];
  selectedNetwork: Network;
  onSelect: (network: Network) => void;
}

const NetworkSelector = ({
  networks,
  selectedNetwork,
  onSelect,
}: NetworkSelectorProps) => {
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg"
      >
        <Image
          src={selectedNetwork.icon}
          alt={selectedNetwork.name}
          width={24}
          height={24}
        />
        <span>{selectedNetwork.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-full left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        {networks.map((network) => (
          <motion.button
            key={network.id}
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            onClick={() => onSelect(network)}
            className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-blue-500/10"
          >
            <Image
              src={network.icon}
              alt={network.name}
              width={24}
              height={24}
            />
            <span>{network.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default NetworkSelector; 