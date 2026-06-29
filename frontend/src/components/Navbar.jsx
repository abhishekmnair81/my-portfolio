import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound, toggleMute, isMuted } from '../utils/sound';
import DecryptedText from './ui/DecryptedText';

export default function Navbar({ activeSection = "hero", logoName, neuralGridEnabled, setNeuralGridEnabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [muted, setMuted] = useState(isMuted());
  const [timeStr, setTimeStr] = useState('');

  // HUD Color Themes
  const themes = [
    { name: 'CYAN', primary: '#00f3ff', secondary: '#ff007f' },
    { name: 'AMBER', primary: '#ffaa00', secondary: '#ff3c00' },
    { name: 'GREEN', primary: '#39ff14', secondary: '#00ffaa' },
    { name: 'PINK', primary: '#ff007f', secondary: '#a855f7' }
  ];
  const [activeTheme, setActiveTheme] = useState(0);

  // Initialize theme from localStorage if set
  useEffect(() => {
    const saved = localStorage.getItem('hud-theme');
    if (saved) {
      const idx = parseInt(saved, 10);
      if (idx >= 0 && idx < themes.length) {
        setActiveTheme(idx);
        document.documentElement.style.setProperty('--color-cyan', themes[idx].primary);
        document.documentElement.style.setProperty('--color-pink', themes[idx].secondary);
      }
    }
  }, []);

  const cycleTheme = () => {
    playClickSound();
    const nextIdx = (activeTheme + 1) % themes.length;
    setActiveTheme(nextIdx);
    localStorage.setItem('hud-theme', nextIdx.toString());
    
    // Dynamically update CSS custom variables
    document.documentElement.style.setProperty('--color-cyan', themes[nextIdx].primary);
    document.documentElement.style.setProperty('--color-pink', themes[nextIdx].secondary);
  };

  // Clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: 'hero', code: '01', label: 'SYS_BOOT' },
    { id: 'about', code: '02', label: 'COGNITIVE' },
    { id: 'skills', code: '03', label: 'TUNING' },
    { id: 'projects', code: '04', label: 'GARAGE' },
    { id: 'experience', code: '05', label: 'TIMELINE' },
    { id: 'certifications', code: '06', label: 'CREDENTIALS' },
    { id: 'contact', code: '07', label: 'SIGNAL' },
  ];

  const handleScroll = (id) => {
    playClickSound();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMuteToggle = () => {
    const val = toggleMute();
    setMuted(val);
    if (!val) {
      playClickSound();
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#08090c]/90 backdrop-blur-md border-b border-[#1b253b] z-40 px-4 md:px-8 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          {/* Logo / System Version */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleScroll('hero'); }} 
            className="flex items-center space-x-2 font-hud text-xs text-[#00f3ff] hover:text-white transition-colors"
          >
            <span className="w-2 h-2 bg-[#00f3ff] rounded-none animate-blink" />
            <span className="font-bold tracking-widest uppercase">
              <DecryptedText text="ABHI // HUD_v1.0" />
            </span>
            <span className={`inline-block w-1.5 h-3 bg-[#00f3ff] ${cursorBlink ? 'opacity-100' : 'opacity-0'}`}></span>
          </a>

          {/* Desktop Controls & Nav */}
          <div className="flex items-center space-x-6">
            
            {/* Navigation links */}
            <div className="hidden lg:flex space-x-5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleScroll(link.id); }}
                  className={`font-tech text-xs tracking-wider transition-all duration-200 uppercase flex items-center space-x-1 py-1 border-b ${
                    activeSection === link.id
                      ? 'text-[#00f3ff] border-[#00f3ff] drop-shadow-[0_0_4px_rgba(0,243,255,0.4)]'
                      : 'text-[#808a9d] border-transparent hover:text-white hover:border-slate-500'
                  }`}
                >
                  <span className="text-[9px] text-[#ff007f] font-code mr-0.5">{link.code}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* HUD Status telemetry details */}
            <div className="hidden md:flex items-center space-x-4 border-l border-slate-800 pl-6 text-[#808a9d] font-code text-[10px] tracking-wide">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse" />
                <span>PING: <span className="text-white">4ms</span></span>
              </div>
              <div className="text-white border-l border-slate-800 pl-4 font-bold">
                {timeStr || '00:00:00'}
              </div>
            </div>

            {/* Dynamic theme switcher (Desktop only) */}
            <button
              onClick={cycleTheme}
              className="hidden sm:inline-block px-2 py-1 bg-black/40 border border-[#00f3ff]/40 hover:border-[#00f3ff] text-[#00f3ff] hover:text-white transition-all font-code text-[9px] cursor-pointer select-none"
              title="Switch HUD accent color theme"
            >
              [COLOR: {themes[activeTheme].name}]
            </button>

            {/* Grid toggle (Desktop only) */}
            <button
              onClick={() => { playClickSound(); setNeuralGridEnabled(!neuralGridEnabled); }}
              className="hidden sm:inline-block px-2 py-1 bg-black/40 border border-[#00f3ff]/40 hover:border-[#00f3ff] text-[#00f3ff] hover:text-white transition-all font-code text-[9px] cursor-pointer select-none"
              title="Toggle global background neural particle grid"
            >
              [GRID: {neuralGridEnabled ? 'ON' : 'OFF'}]
            </button>

            {/* Mute button (Desktop only) */}
            <button
              onClick={handleMuteToggle}
              className="hidden sm:inline-block px-2.5 py-1 bg-[#10141c] border border-[#1b253b] hover:border-[#00f3ff] hover:text-[#00f3ff] text-[#808a9d] transition-all font-code text-[9px] cursor-pointer select-none"
              title={muted ? "Unmute system core audio" : "Mute system core audio"}
            >
              {muted ? "AUDIO_OFF" : "AUDIO_ON"}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => { playClickSound(); setIsOpen(!isOpen); }}
              className="lg:hidden flex flex-col justify-between w-5 h-3 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className={`h-[1px] bg-white w-full transition-transform ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`h-[1px] bg-white w-full transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[1px] bg-white w-full transition-transform ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-[#08090c] z-30 pt-20 px-6 flex flex-col space-y-3.5 lg:hidden border-b border-[#1b253b] overflow-y-auto pb-10"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleScroll(link.id); }}
                className={`font-tech text-sm tracking-widest py-2.5 border-b border-slate-900 flex items-center justify-between ${
                  activeSection === link.id ? 'text-[#00f3ff]' : 'text-[#808a9d]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-[#ff007f] font-code">{link.code}</span>
              </a>
            ))}
            
            {/* Theme and Audio Controls for Mobile / Tablets */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-900">
              <button
                onClick={cycleTheme}
                className="py-2.5 bg-black/60 border border-[#00f3ff]/40 text-[#00f3ff] text-center font-code text-[10px] cursor-pointer"
              >
                [COLOR: {themes[activeTheme].name}]
              </button>
              <button
                onClick={handleMuteToggle}
                className="py-2.5 bg-[#10141c] border border-slate-800 text-slate-350 text-center font-code text-[10px] cursor-pointer"
              >
                {muted ? "AUDIO: OFF" : "AUDIO: ON"}
              </button>
              <button
                onClick={() => { playClickSound(); setNeuralGridEnabled(!neuralGridEnabled); }}
                className="col-span-2 py-2.5 bg-black/60 border border-[#00f3ff]/40 text-[#00f3ff] text-center font-code text-[10px] cursor-pointer"
              >
                [GRID BACKGROUND: {neuralGridEnabled ? 'ENABLED' : 'DISABLED'}]
              </button>
            </div>

            {/* Mobile telemetry details */}
            <div className="flex justify-between items-center pt-6 font-code text-[10px] text-[#808a9d]">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse" />
                <span>SYS_HEALTH: <span className="text-white">100%</span></span>
              </div>
              <span className="text-[#ff007f]">{timeStr || '00:00:00'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
