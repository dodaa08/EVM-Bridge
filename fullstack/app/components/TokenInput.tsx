'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Token {
  symbol: string;
  icon: string;
  balance: string;
}

interface TokenInputProps {
  label: string;
  token: Token;
  value: string;
  onChange: (value: string) => void;
  onMaxClick?: () => void;
}

const TokenInput = ({
  label,
  token,
  value,
  onChange,
  onMaxClick,
}: TokenInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-700 rounded-xl p-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400">{label}</span>
        <div className="flex items-center space-x-2">
          <Image
            src={token.icon}
            alt={token.symbol}
            width={24}
            height={24}
          />
          <span>{token.symbol}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="w-full bg-transparent text-2xl outline-none"
        />
        {onMaxClick && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMaxClick}
            className="px-2 py-1 text-sm bg-blue-600 rounded-lg"
          >
            MAX
          </motion.button>
        )}
      </div>

      <div className="mt-2 text-sm text-gray-400">
        Balance: {token.balance} {token.symbol}
      </div>
    </motion.div>
  );
};

export default TokenInput; 