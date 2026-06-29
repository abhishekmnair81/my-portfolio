import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound, playBootSound } from '../utils/sound';
import DecryptedText from './ui/DecryptedText';

// Rotating Gyro Core Reactor Widget
function HolographicCore({ isLoaded }) {
  return (
    <div className="relative w-20 h-20 mx-auto flex items-center justify-center select-none">
      {/* Outer spinning ring */}
      <svg className="absolute w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="var(--color-cyan)" strokeWidth="0.8" strokeDasharray="6,4" fill="none" opacity="0.25" />
        <circle cx="50" cy="50" r="45" stroke="var(--color-pink)" strokeWidth="1.2" strokeDasharray="30,150" fill="none" opacity="0.8" />
      </svg>
      
      {/* Reverse spinning inner ring */}
      <svg className="absolute w-14 h-14 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="var(--color-cyan)" strokeWidth="1.2" strokeDasharray="8,8" fill="none" opacity="0.4" />
        <circle cx="50" cy="50" r="40" stroke="var(--color-pink)" strokeWidth="0.8" strokeDasharray="40,40" fill="none" opacity="0.25" />
      </svg>
      
      {/* Concentric grid guide */}
      <svg className="absolute w-8 h-8" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" stroke="var(--color-cyan)" strokeWidth="0.5" strokeDasharray="2,2" fill="none" opacity="0.15" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="var(--color-cyan)" strokeWidth="0.5" strokeDasharray="1,9" opacity="0.2" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="var(--color-cyan)" strokeWidth="0.5" strokeDasharray="1,9" opacity="0.2" />
      </svg>

      {/* Pulsing center node */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 border ${
        isLoaded 
          ? 'bg-[#39ff14]/10 border-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.4)]' 
          : 'bg-[#00f3ff]/10 border-[#00f3ff] shadow-[0_0_12px_rgba(0,243,255,0.3)] animate-pulse'
      }`}>
        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
          isLoaded 
            ? 'bg-[#39ff14] scale-110 shadow-[0_0_6px_#39ff14]' 
            : 'bg-[#00f3ff]'
        }`} />
      </div>
      
      <div className="absolute inset-1 border border-[#00f3ff]/5 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
    </div>
  );
}

// Soundwave Oscilloscope Telemetry Visualizer
function SoundwaveVisualizer({ isActive }) {
  const [wavePath, setWavePath] = useState('');
  
  useEffect(() => {
    let animId;
    let phase = 0;
    
    const generatePath = () => {
      const width = 160;
      const height = 16;
      const points = [];
      const amp = isActive ? 5 : 1.2; // Fluctuate more when booting
      const freq = isActive ? 0.14 : 0.035;
      
      for (let x = 0; x <= width; x += 4) {
        const envelop = Math.sin((x / width) * Math.PI);
        const y = height / 2 + Math.sin(x * freq - phase) * amp * envelop;
        points.push(`${x},${y}`);
      }
      
      phase += isActive ? 0.22 : 0.04;
      return `M 0,${height/2} L ` + points.join(' L ') + ` L ${width},${height/2}`;
    };
    
    const update = () => {
      setWavePath(generatePath());
      animId = requestAnimationFrame(update);
    };
    
    update();
    return () => cancelAnimationFrame(animId);
  }, [isActive]);
  
  return (
    <div className="flex items-center justify-center gap-3 py-0.5 text-slate-500 select-none">
      <span className="font-code text-[7px] tracking-widest text-[#808a9d]">OSC_TUNE:</span>
      <svg width="160" height="16" className="stroke-[1px]" fill="none">
        <path d={wavePath} stroke="var(--color-cyan)" strokeOpacity="0.45" />
      </svg>
      <span className="font-code text-[7px] tracking-widest text-[#39ff14] animate-pulse">
        {isActive ? 'BOOTING' : 'STANDBY'}
      </span>
    </div>
  );
}

export default function WelcomeSplash({ onEnter }) {
  const [logs, setLogs] = useState([]);
  const [bootStep, setBootStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  const telemetrySequence = [
    "SYS_BOOT: Booting telemetry kernel...",
    "SEC_CHECK: Authorization bypass [OK]",
    "SQL_SYNC: DB linked. Nodes sync: 100%",
    "AUD_GEN: Sound generators primed.",
    "GRID_MAP: Mapping neural grid canvas...",
    "BOOT_COMPLETE: Modules aligned. Ready."
  ];

  // Falling Hex Matrix Rain Canvas Background
  useEffect(() => {
    const canvas = document.getElementById('matrix-rain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    const hexChars = '0123456789ABCDEFabcdef/*-+[]{}<>';
    const fontSize = 10;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(4, 6, 10, 0.16)';
      ctx.fillRect(0, 0, width, height);
      
      const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-cyan').trim() || '#00f3ff';
      ctx.fillStyle = themeColor + '12'; // very low opacity hex rain
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = hexChars[Math.floor(Math.random() * hexChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Sequential loading logs
  useEffect(() => {
    if (bootStep < telemetrySequence.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, telemetrySequence[bootStep]]);
        setBootStep(prev => prev + 1);
        playClickSound();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [bootStep]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink(p => !p);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const handleEnterClick = () => {
    playBootSound();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 900); // Allow time for sweep animation and sound to complete
  };

  const isLoaded = bootStep >= telemetrySequence.length;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040609] text-[#00f3ff] transition-all duration-750 ease-in-out select-none overflow-hidden ${
      isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      
      {/* Hex Matrix Canvas Background */}
      <canvas 
        id="matrix-rain-canvas" 
        className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-75"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Futuristic Vector Overlay Grid */}
      <div className="absolute inset-0 bg-[#080d1a]/15 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_50%,#040609_100%)] pointer-events-none z-[2]" />

      {/* Sweeping Laser Line Scanning effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent animate-[bounce_4.5s_infinite] pointer-events-none z-[3]" />

      {/* Main Terminal Frame */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        className="relative max-w-sm w-[92%] bg-[#080b11]/90 border border-[#1b253b] p-4 sm:p-5 shadow-[0_0_60px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-col space-y-3.5 z-10"
        style={{
          boxShadow: `0 0 40px rgba(0, 243, 255, 0.05), inset 0 0 12px var(--color-cyan)0a`
        }}
      >
        {/* Glow corners */}
        <div className="absolute top-[-2px] left-[-2px] w-4 h-4 border-t-2 border-l-2" style={{ borderColor: 'var(--color-cyan)' }} />
        <div className="absolute top-[-2px] right-[-2px] w-4 h-4 border-t-2 border-r-2" style={{ borderColor: 'var(--color-cyan)' }} />
        <div className="absolute bottom-[-2px] left-[-2px] w-4 h-4 border-b-2 border-l-2" style={{ borderColor: 'var(--color-pink)' }} />
        <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 border-b-2 border-r-2" style={{ borderColor: 'var(--color-pink)' }} />

        {/* Telemetry Header */}
        <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 text-[8px] font-code tracking-widest text-[#808a9d]">
          <span>BOOTSTRAP // PORT_5180</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: 'var(--color-cyan)' }} />
            <span>SECURE_LINK</span>
          </span>
        </div>

        {/* Central Holographic Gyroscope Reactor Core */}
        <HolographicCore isLoaded={isLoaded} />

        {/* Brand/User Identity Header */}
        <div className="text-center space-y-0.5">
          <h1 className="font-hud text-base sm:text-lg text-white tracking-widest font-extrabold uppercase">
            ABHISHEK M NAIR
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-4 bg-slate-800" />
            <p className="font-code text-[8px] text-[#ffaa00] tracking-wider uppercase font-bold">
              AI & FULL-STACK ENGINE
            </p>
            <span className="h-[1px] w-4 bg-slate-800" />
          </div>
        </div>

        {/* Diagnostic Logs Screen */}
        <div className="bg-black/60 border border-slate-950 p-3 font-code text-[9px] sm:text-[10px] leading-relaxed space-y-1 h-[90px] text-slate-400 select-text overflow-y-auto relative scrollbar-none">
          {/* Inner ambient screen shadow */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_3px] pointer-events-none" />
          
          {logs.map((log, idx) => {
            const isLast = idx === logs.length - 1;
            return (
              <div key={idx} className="flex items-start gap-1">
                <span className="text-[#ffaa00] font-bold">&gt;</span>
                <span className={isLast && isLoaded ? "text-[#39ff14] font-bold" : ""}>
                  {log}
                </span>
              </div>
            );
          })}
          
          {!isLoaded ? (
            <div className="flex items-center gap-1 text-[#00f3ff] font-bold">
              <span className="animate-pulse">&gt;&gt;</span>
              <span>SYNAPSE_ALLOCATION_LOAD</span>
              <span className={cursorBlink ? 'opacity-100' : 'opacity-0'}>█</span>
            </div>
          ) : null}
        </div>

        {/* Real-time Oscilloscope Waves */}
        <SoundwaveVisualizer isActive={!isLoaded} />

        {/* Start Button Zone */}
        <div className="flex flex-col items-center justify-center pt-0.5">
          <button
            onClick={handleEnterClick}
            onMouseEnter={() => {
              if (isLoaded) playClickSound();
            }}
            disabled={!isLoaded}
            className={`w-full font-hud text-[10px] tracking-widest font-bold py-2.5 px-4 border uppercase relative overflow-hidden transition-all duration-300 group flex items-center justify-center gap-2 ${
              !isLoaded
                ? 'border-slate-800 text-slate-600 bg-transparent cursor-not-allowed'
                : 'text-white border-white hover:bg-white hover:text-black cursor-pointer active:scale-[0.98]'
            }`}
            style={
              isLoaded
                ? {
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
                    borderColor: 'var(--color-cyan)',
                    boxShadow: `0 0 12px rgba(0, 243, 255, 0.12)`
                  }
                : {}
            }
          >
            {/* Sliding scanner shine */}
            {isLoaded && (
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.4s_infinite]" />
            )}
            
            <DecryptedText 
              text={!isLoaded ? "SYNCING TELEMETRY..." : "INITIALIZE CONSOLE // ENTER SYSTEM"} 
              speed={40}
              useHover={false}
            />
          </button>
          
          <span className="font-code text-[7px] text-slate-500 mt-2 tracking-wider select-none">
            SYS_SECURE_CHANNEL: ACTIVE [AES_256]
          </span>
        </div>

      </motion.div>

      {/* Embedded shimmer keyframes style */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
