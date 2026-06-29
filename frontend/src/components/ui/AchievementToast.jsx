import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playLevelUpSound } from '../../utils/sound';

export default function AchievementToast({ achievements, removeAchievement }) {
  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {achievements.map((achievement) => (
          <AchievementItem 
            key={achievement.id} 
            achievement={achievement} 
            onClose={() => removeAchievement(achievement.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function AchievementItem({ achievement, onClose }) {
  useEffect(() => {
    // Play sci-fi synth ping
    playLevelUpSound();

    // Auto-remove after 4 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'bio':
        return '🤖'; // Robot
      case 'inventory':
        return '⚡'; // Lightning
      case 'chests':
        return '💿'; // Disc
      case 'quest':
        return '🛰️'; // Satellite
      case 'signal':
        return '📶'; // Signal bars
      default:
        return '🌌'; // Space
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-[#0b0e14]/95 border border-[#00f3ff] p-3 flex items-start space-x-3 pointer-events-auto relative shadow-[0_0_15px_rgba(0,243,255,0.2)]"
    >
      {/* Corner Brackets */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff007f]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff007f]" />

      {/* Icon Frame */}
      <div className="bg-black/60 border border-[#00f3ff]/40 p-2 flex items-center justify-center text-xl w-11 h-11 select-none">
        {getIcon(achievement.type)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4">
        <h4 className="font-hud text-[#00f3ff] text-[9px] leading-tight tracking-wider uppercase font-bold">
          CORE_UPGRADE_ACQUIRED
        </h4>
        <p className="font-hud text-white text-[10px] mt-0.5 leading-normal tracking-wide font-bold uppercase">
          {achievement.title}
        </p>
        <p className="font-sans text-[#808a9d] text-[10px] mt-0.5 leading-snug">
          {achievement.description}
        </p>
      </div>

      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-1 right-2 font-code text-[#ff007f] hover:text-white text-[8px] cursor-pointer"
      >
        [X]
      </button>
    </motion.div>
  );
}
