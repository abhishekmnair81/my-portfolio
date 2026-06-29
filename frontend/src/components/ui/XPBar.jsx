import React from 'react';
import { motion } from 'framer-motion';

export default function XPBar({ label = "EXPERIENCE", level = 3, progress = 75 }) {
  return (
    <div className="w-full max-w-md mx-auto my-6">
      <div className="flex justify-between items-center mb-1 px-1">
        <span className="font-pixel text-[10px] text-mc-green tracking-wider">{label}</span>
        <span className="font-pixel text-[10px] text-mc-green tracking-wider">LVL {level}</span>
      </div>
      
      {/* Minecraft XP bar container */}
      <div className="h-5 bg-[#000000] border-2 border-mc-border p-[2px] relative flex items-center">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-mc-green"
          style={{
            backgroundImage: 'linear-gradient(90deg, #5b8a32 0%, #8ebd5e 100%)'
          }}
        />
        
        {/* Highlight overlays on the XP bar */}
        <div className="absolute inset-0 flex justify-between pointer-events-none px-[10%]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-full w-[2px] bg-black opacity-40" />
          ))}
        </div>
      </div>
    </div>
  );
}
