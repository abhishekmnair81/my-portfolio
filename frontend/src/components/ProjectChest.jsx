import React, { useState } from 'react';
import PixelButton from './ui/PixelButton';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Pixel Art Chest Graphic
const ChestGraphic = ({ isOpen }) => (
  <svg className="w-12 h-12 mx-auto" viewBox="0 0 16 16" fill="none">
    {isOpen ? (
      <>
        {/* Open Chest */}
        {/* Lid tilted back */}
        <path d="M2 1h12v3H2V1z" fill="#5c2d1b" />
        <path d="M1 2h1v2H1V2zm14 0h1v2h-1V2z" fill="#000" />
        <path d="M7 2h2v2H7V2z" fill="#a0a0a0" />
        {/* Glowing diamond treasure */}
        <rect x="3" y="4" width="10" height="2" fill="#4de6ff" className="animate-pulse" />
        {/* Chest Base */}
        <path d="M2 6h12v9H2V6z" fill="#7f3d24" />
        <rect x="7" y="6" width="2" height="3" fill="#a0a0a0" />
        <path d="M1 6h1v9H1V6zm14 0h1v9h-1V6z" fill="#000" />
        <path d="M2 14h12v1H2v-1z" fill="#3f1e12" />
      </>
    ) : (
      <>
        {/* Closed Chest */}
        <path d="M2 2h12v12H2V2z" fill="#7f3d24" />
        {/* Straps/Outlines */}
        <path d="M1 2h1v12H1V2zm14 0h1v12h-1V2zm-14 3h14v2H1V5zm0 6h14v2H1v-2z" fill="#000" />
        <path d="M2 2h12v1H2V2z" fill="#3f1e12" />
        {/* Wood Texture Planks */}
        <rect x="4" y="3" width="2" height="10" fill="#5c2d1b" />
        <rect x="10" y="3" width="2" height="10" fill="#5c2d1b" />
        {/* Metal Iron Latch */}
        <rect x="7" y="6" width="2" height="3" fill="#a0a0a0" />
        <rect x="7" y="7" width="2" height="1" fill="#555" />
      </>
    )}
  </svg>
);

export default function ProjectChest({ project }) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, description, tech_stack, github_url, live_url, is_featured } = project;

  return (
    <div 
      className={`bg-[#151515] border-2 shadow-pixel p-5 flex flex-col justify-between transition-all duration-100 ${
        is_featured 
          ? 'border-mc-gold col-span-1 md:col-span-2' 
          : 'border-mc-border hover:border-mc-green'
      }`}
    >
      <div className="space-y-4">
        
        {/* Featured Badge */}
        {is_featured && (
          <div className="flex items-center space-x-2">
            <span className="font-pixel text-[8px] text-mc-gold bg-mc-gold/10 px-2 py-0.5 border border-mc-gold">
              ★ FEATURED BUILD
            </span>
          </div>
        )}

        {/* Thumbnail Screen */}
        <div className="relative w-full aspect-video bg-[#0a0a0a] border-2 border-mc-border flex flex-col items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-dirt-pattern opacity-30 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <ChestGraphic isOpen={isOpen} />
            <span className="font-pixel text-[8px] tracking-wider text-mc-muted uppercase">
              {isOpen ? "[ CHEST OPEN ]" : "[ CHEST SECURED ]"}
            </span>
          </div>
        </div>

        {/* Info Area */}
        <div className="space-y-2">
          <h3 className="font-pixel text-xs sm:text-sm text-white">
            {title}
          </h3>
          
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5">
            {tech_stack.map((tech) => (
              <span 
                key={tech} 
                className="font-code text-[9px] text-mc-diamond bg-mc-diamond/5 px-2 py-0.5 border border-mc-diamond/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Expanded Description */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="overflow-hidden border-t border-mc-border pt-4 mt-2"
            >
              <p className="font-sans text-xs sm:text-sm text-mc-text leading-relaxed">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        {!isOpen ? (
          <PixelButton 
            variant="primary" 
            className="w-full text-[10px]"
            onClick={() => setIsOpen(true)}
          >
            OPEN CHEST
          </PixelButton>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <PixelButton 
              variant="primary" 
              className="text-[9px] w-full"
              href={github_url}
            >
              CODE
            </PixelButton>
            <PixelButton 
              variant="primary" 
              className="text-[9px] w-full border-mc-diamond text-mc-diamond"
              href={live_url}
            >
              DEMO
            </PixelButton>
            <PixelButton 
              variant="secondary" 
              className="text-[9px] w-full"
              onClick={() => setIsOpen(false)}
            >
              CLOSE
            </PixelButton>
          </div>
        )}
      </div>

    </div>
  );
}
