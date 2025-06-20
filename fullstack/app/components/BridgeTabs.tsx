'use client';

import { motion } from 'framer-motion';

export default function BridgeTabs({ selected, onSelect }: { selected: string, onSelect: (tab: string) => void }) {
  const tabs = ['Bridge', 'History'];
  
  return (
    <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
      {tabs.map(tab => (
        <motion.button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`relative px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
            selected === tab 
              ? 'text-white' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {selected === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-lg"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </motion.button>
      ))}
    </div>
  );
}