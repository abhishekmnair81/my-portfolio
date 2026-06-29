import React from 'react';

// Custom pixel art SVG renderers for each skill
const IconRenderer = ({ name }) => {
  const normName = name.toLowerCase();

  if (normName.includes('react')) {
    return (
      <svg className="w-8 h-8 text-mc-diamond fill-current" viewBox="0 0 16 16">
        <path d="M7 1h2v2H7V1zm4 1h2v2h-2V2zM4 2h2v2H4V2zM2 5h2v2H2V5zm10 0h2v2h-2V5zM1 8h2v2H1V8zm12 0h2v2h-2V8zm-1 3h2v2h-2v-2zM3 11h2v2H3v-2zm5 1h2v2H8v-2zm-1-5h2v2H7V7z" />
      </svg>
    );
  }
  if (normName.includes('django')) {
    return (
      <svg className="w-8 h-8 text-mc-green fill-current" viewBox="0 0 16 16">
        <path d="M2 2h8v2H4v2h6v2H4v4h6v2H2V2zM11 6h3v6h-3V6z" />
      </svg>
    );
  }
  if (normName.includes('python')) {
    return (
      <svg className="w-8 h-8 fill-current" viewBox="0 0 16 16">
        <path d="M3 2h7v3H5v2H2V4c0-1.1.9-2 2-2z" fill="#3776ab" />
        <path d="M6 3h1v1H6V3z" fill="#fff" />
        <path d="M11 7v2H9v2H4v3h7c1.1 0 2-.9 2-2V9h-2z" fill="#ffd343" />
        <path d="M9 12h1v1H9v-1z" fill="#fff" />
      </svg>
    );
  }
  if (normName.includes('tailwind')) {
    return (
      <svg className="w-8 h-8 text-mc-diamond fill-current" viewBox="0 0 16 16">
        <path d="M1 5h3v2H1V5zm3 2h4v2H4V7zm4-2h3v2H8V5zm3 4h4v2h-4V9zm-5 2h4v2H6v-2zm-5-2h4v2H1V9z" />
      </svg>
    );
  }
  if (normName.includes('javascript') || normName === 'js') {
    return (
      <svg className="w-8 h-8 text-[#ffd343] fill-current" viewBox="0 0 16 16">
        <path d="M2 2h12v12H2V2zm8 6h2v4H10V8zm-4 2h2v2H6v-2z" />
      </svg>
    );
  }
  if (normName.includes('html') || normName.includes('css')) {
    return (
      <svg className="w-8 h-8 text-[#e34f26] fill-current" viewBox="0 0 16 16">
        <path d="M2 1h12l-1 12-5 2-5-2-1-12zM5 4l1 3h4l1-3H5zm-1 4l1 3 4 1 4-1 .5-3H4z" />
      </svg>
    );
  }
  if (normName.includes('postgres')) {
    return (
      <svg className="w-8 h-8 text-[#336791] fill-current" viewBox="0 0 16 16">
        <path d="M2 2h10v2H4v2h6v2H4v4h8v2H2V2z" />
      </svg>
    );
  }
  if (normName.includes('api') || normName.includes('rest')) {
    return (
      <svg className="w-8 h-8 text-mc-gold fill-current" viewBox="0 0 16 16">
        <path d="M2 2h4v4H2V2zm8 0h4v4h-4V2zm-4 6h4v4H6V8z" />
      </svg>
    );
  }
  if (normName.includes('git')) {
    return (
      <svg className="w-8 h-8 text-[#f05032] fill-current" viewBox="0 0 16 16">
        <path d="M8 1L1 8l7 7 7-7-7-7zm-1 8H5v-2h2v2zm2 2H7v-2h2v2z" />
      </svg>
    );
  }
  if (normName.includes('docker')) {
    return (
      <svg className="w-8 h-8 text-[#2496ed] fill-current" viewBox="0 0 16 16">
        <path d="M1 9h4v4H1V9zm5-2h4v6H6V7zm5-2h4v8h-4V5z" />
      </svg>
    );
  }

  // Fallback blocky icon
  return (
    <svg className="w-8 h-8 text-mc-muted fill-current" viewBox="0 0 16 16">
      <path d="M2 2h12v12H2V2zm4 4h4v4H6V6z" />
    </svg>
  );
};

export default function SkillSlot({ skill }) {
  const { name, category, proficiency, is_hotbar } = skill;

  // Gold border for Hotbar items, standard grey for normal inventory slots
  const borderClass = is_hotbar 
    ? 'border-mc-gold shadow-[inset_-2px_-2px_0px_#7f5500,inset_2px_2px_0px_#ffcc66]' 
    : 'border-mc-border shadow-[inset_-2px_-2px_0px_#111,inset_2px_2px_0px_#444]';

  return (
    <div className="group relative flex flex-col items-center justify-center">
      {/* Skill inventory slot box */}
      <div 
        className={`w-20 h-20 sm:w-24 sm:h-24 bg-[#2e2e2e] border-2 flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-100 hover:border-mc-green hover:bg-[#3e3e3e] z-10 ${borderClass}`}
      >
        <IconRenderer name={name} />
        <span className="font-sans text-[9px] sm:text-[10px] text-mc-text mt-2 font-medium truncate w-full text-center">
          {name}
        </span>

        {/* Hotbar Slot Number indicator (1-5 labels) */}
        {is_hotbar && (
          <span className="absolute top-1 right-2 font-pixel text-[8px] text-mc-gold font-bold pointer-events-none">
            ★
          </span>
        )}
      </div>

      {/* Retro Minecraft Tooltip */}
      <div 
        className="absolute bottom-full mb-3 hidden group-hover:flex flex-col z-30 pointer-events-none p-3 w-40 text-left bg-[#100517]/95 border-2 border-[#2e0863] shadow-[inset_1px_1px_0px_#4a0d9e,inset_-1px_-1px_0px_#1a0435]"
      >
        <span className="font-pixel text-[10px] text-[#ffffff] font-bold block mb-1">
          {name}
        </span>
        <span className="font-pixel text-[8px] text-mc-gold block mb-2 uppercase">
          {category}
        </span>
        
        {/* Level bar */}
        <div className="space-y-1">
          <div className="flex justify-between font-pixel text-[7px] text-mc-muted">
            <span>LEVEL:</span>
            <span className="text-mc-green">{proficiency}%</span>
          </div>
          <div className="h-1.5 bg-[#000] border border-[#222] p-[1px] flex items-center">
            <div 
              className="h-full bg-mc-green" 
              style={{ width: `${proficiency}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
