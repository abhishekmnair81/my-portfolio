import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const borderColor = type === 'success' ? 'border-[#39ff14]' : 'border-[#ff007f]';
  const textColor = type === 'success' ? 'text-[#39ff14]' : 'text-[#ff007f]';
  const dotColor = type === 'success' ? 'bg-[#39ff14]' : 'bg-[#ff007f]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={`fixed bottom-6 right-6 z-50 bg-[#0b0e14]/95 border ${borderColor} shadow-2xl p-4 max-w-md`}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor} animate-blink`} />
        <span className={`font-code text-[11px] tracking-wider leading-relaxed ${textColor}`}>
          {message}
        </span>
      </div>
    </motion.div>
  );
}
