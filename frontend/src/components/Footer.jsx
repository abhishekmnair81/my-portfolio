import React from 'react';
import { playClickSound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090c] border-t border-[#1b253b] py-8 px-4 font-code text-[10px] text-[#808a9d] text-center relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Copyright */}
        <div className="tracking-wider uppercase">
          &copy; 2025 Abhishek M Nair | Built with React + Django
        </div>

        {/* Scroll To Top Button */}
        <a 
          href="#hero" 
          onClick={scrollToTop}
          className="cyber-btn-secondary py-1.5 px-4 text-[9px] inline-flex items-center tracking-widest"
        >
          ▲ RESPAWN
        </a>

      </div>
    </footer>
  );
}
