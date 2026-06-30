import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound, playLevelUpSound, playBreakSound, startAmbientHum, stopAmbientHum, toggleMute, isMuted } from '../../utils/sound';

export default function SystemControlCenter({ 
  neuralGridEnabled, 
  setNeuralGridEnabled, 
  matrixRain, 
  setMatrixRain,
  crtEffects,
  setCrtEffects
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(4);
  const [isGlitching, setIsGlitching] = useState(false);
  const [pingRunning, setPingRunning] = useState(false);
  const [pingLogs, setPingLogs] = useState([]);
  
  // Custom theme colors state
  const [primaryColor, setPrimaryColor] = useState('#00f3ff');
  const [secondaryColor, setSecondaryColor] = useState('#ff007f');

  // FPS calculator
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let animId;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    calcFps();

    return () => cancelAnimationFrame(animId);
  }, []);

  // Sync color states with current document styling variables on open
  useEffect(() => {
    if (isOpen) {
      const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-cyan').trim() || '#00f3ff';
      const secondary = getComputedStyle(document.documentElement).getPropertyValue('--color-pink').trim() || '#ff007f';
      setPrimaryColor(primary);
      setSecondaryColor(secondary);
    }
  }, [isOpen]);

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color);
    document.documentElement.style.setProperty('--color-cyan', color);
  };

  const updateSecondaryColor = (color) => {
    setSecondaryColor(color);
    document.documentElement.style.setProperty('--color-pink', color);
  };

  const applyPreset = (prim, sec) => {
    playClickSound();
    updatePrimaryColor(prim);
    updateSecondaryColor(sec);
  };

  const handleMuteToggleLocal = () => {
    const isMutedNow = toggleMute();
    playClickSound();
  };

  const runPingDiagnostic = () => {
    if (pingRunning) return;
    playClickSound();
    setPingRunning(true);
    setPingLogs(['INITIALIZING PORT TRACER...', 'PINGING MAIN GATEWAY [127.0.0.1]...']);
    
    let step = 0;
    const interval = setInterval(() => {
      const ms = Math.floor(Math.random() * 8) + 2;
      step++;
      if (step === 1) {
        setPingLogs(prev => [...prev, `-> 64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=${ms}ms`]);
        setLatency(ms);
      } else if (step === 2) {
        setPingLogs(prev => [...prev, `-> 64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=${ms - 1}ms`]);
        setLatency(ms - 1);
      } else if (step === 3) {
        setPingLogs(prev => [...prev, `-> 64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=${ms + 2}ms`]);
        setLatency(ms + 2);
      } else {
        setPingLogs(prev => [...prev, 'PACKET TRACE RESOLVED. STATUS: 100% SECURE']);
        setPingRunning(false);
        clearInterval(interval);
      }
    }, 600);
  };

  const triggerGlitchEffect = () => {
    playBreakSound();
    setIsGlitching(true);
    // Dispatch glitch events to other components to render scrambled text
    window.dispatchEvent(new CustomEvent('system-glitch'));
    setTimeout(() => {
      setIsGlitching(false);
    }, 900);
  };

  const resetAllData = () => {
    playBreakSound();
    localStorage.clear();
    alert('System Cache cleared. Reloading page...');
    window.location.reload();
  };

  return (
    <>
      {/* Floating control trigger button */}
      <div className="fixed bottom-[68px] right-4 z-40">
        <button
          onClick={() => { playClickSound(); setIsOpen(!isOpen); }}
          className="bg-[#0b0e14]/90 border border-[#1b253b] hover:border-[#00f3ff] text-[#00f3ff] hover:text-white px-3 py-1.5 font-hud text-[9px] tracking-widest cursor-pointer shadow-[0_0_12px_rgba(0,0,0,0.5)] flex items-center space-x-1.5 relative overflow-hidden group select-none"
        >
          <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse" />
          <span>[ SYS_CTRL_CENTER ]</span>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#ff007f]" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#080a0f] border border-[#1b253b] shadow-2xl relative p-4 sm:p-6 font-code text-[#808a9d] select-none scrollbar-thin ${isGlitching ? 'crt-flicker duration-75' : ''}`}
            >
              {/* Sci-fi corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f3ff]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff007f]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff007f]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f3ff]" />

              {/* Title Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#ff007f] rounded-none animate-blink" />
                  <span className="font-hud text-xs text-white tracking-widest uppercase">SYSTEM CONTROL COCKPIT</span>
                </div>
                <button 
                  onClick={() => { playClickSound(); setIsOpen(false); }}
                  className="text-xs hover:text-white border border-[#1b253b] px-2 py-0.5 hover:border-red-500 transition-all cursor-pointer"
                >
                  ESC // CLOSE
                </button>
              </div>

              {/* Grid content */}
              <div className="space-y-5">
                
                {/* Visual Accent Presets */}
                <div className="space-y-2 border-b border-slate-900 pb-4">
                  <span className="text-[10px] text-white font-hud tracking-widest block uppercase">[ 01 // ACCENT COLORS CONFIG ]</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button onClick={() => applyPreset('#00f3ff', '#ff007f')} className="px-2 py-1.5 border border-slate-800 bg-[#10141c] hover:border-[#00f3ff] text-[9px] text-left text-white flex justify-between items-center cursor-pointer">
                      <span>CYAN PRES</span>
                      <div className="flex space-x-1"><div className="w-2 h-2 bg-[#00f3ff]" /><div className="w-2 h-2 bg-[#ff007f]" /></div>
                    </button>
                    <button onClick={() => applyPreset('#39ff14', '#00ffaa')} className="px-2 py-1.5 border border-slate-800 bg-[#10141c] hover:border-[#39ff14] text-[9px] text-left text-white flex justify-between items-center cursor-pointer">
                      <span>MATR PRES</span>
                      <div className="flex space-x-1"><div className="w-2 h-2 bg-[#39ff14]" /><div className="w-2 h-2 bg-[#00ffaa]" /></div>
                    </button>
                    <button onClick={() => applyPreset('#ffaa00', '#ff3c00')} className="px-2 py-1.5 border border-slate-800 bg-[#10141c] hover:border-[#ffaa00] text-[9px] text-left text-white flex justify-between items-center cursor-pointer">
                      <span>AMB PRES</span>
                      <div className="flex space-x-1"><div className="w-2 h-2 bg-[#ffaa00]" /><div className="w-2 h-2 bg-[#ff3c00]" /></div>
                    </button>
                    <button onClick={() => applyPreset('#ff007f', '#a855f7')} className="px-2 py-1.5 border border-slate-800 bg-[#10141c] hover:border-[#ff007f] text-[9px] text-left text-white flex justify-between items-center cursor-pointer">
                      <span>SYN PRES</span>
                      <div className="flex space-x-1"><div className="w-2 h-2 bg-[#ff007f]" /><div className="w-2 h-2 bg-[#a855f7]" /></div>
                    </button>
                  </div>

                  {/* Custom color picker */}
                  <div className="flex space-x-4 items-center pt-2">
                    <div className="flex items-center space-x-2 text-[9px]">
                      <span>PRIMARY:</span>
                      <input 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => updatePrimaryColor(e.target.value)}
                        className="w-5 h-5 bg-transparent border border-slate-800 cursor-pointer p-0"
                      />
                      <span className="text-white font-mono">{primaryColor.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[9px]">
                      <span>SECONDARY:</span>
                      <input 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => updateSecondaryColor(e.target.value)}
                        className="w-5 h-5 bg-transparent border border-slate-800 cursor-pointer p-0"
                      />
                      <span className="text-white font-mono">{secondaryColor.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Display Filter Toggles */}
                <div className="space-y-2 border-b border-slate-900 pb-4">
                  <span className="text-[10px] text-white font-hud tracking-widest block uppercase">[ 02 // VISUAL FILTERS ]</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Neural grid toggle */}
                    <button 
                      onClick={() => { playClickSound(); setNeuralGridEnabled(!neuralGridEnabled); }}
                      className={`px-3 py-1.5 border text-[9px] font-bold flex justify-between items-center cursor-pointer transition-all ${
                        neuralGridEnabled ? 'border-[#00f3ff] bg-[#00f3ff]/5 text-white' : 'border-slate-800 text-slate-500'
                      }`}
                    >
                      <span>NEURAL_PARTICLE_GRID</span>
                      <span>{neuralGridEnabled ? 'ON' : 'OFF'}</span>
                    </button>

                    {/* Matrix rain toggle */}
                    <button 
                      onClick={() => { playClickSound(); setMatrixRain(!matrixRain); }}
                      className={`px-3 py-1.5 border text-[9px] font-bold flex justify-between items-center cursor-pointer transition-all ${
                        matrixRain ? 'border-[#00f3ff] bg-[#00f3ff]/5 text-white' : 'border-slate-800 text-slate-500'
                      }`}
                    >
                      <span>MATRIX_HEX_RAIN</span>
                      <span>{matrixRain ? 'ACTIVE' : 'MUTED'}</span>
                    </button>

                    {/* CRT Scanline Toggle */}
                    <button 
                      onClick={() => { playClickSound(); setCrtEffects(!crtEffects); }}
                      className={`px-3 py-1.5 border text-[9px] font-bold flex justify-between items-center cursor-pointer transition-all ${
                        crtEffects ? 'border-[#00f3ff] bg-[#00f3ff]/5 text-white' : 'border-slate-800 text-slate-500'
                      }`}
                    >
                      <span>CRT_FLICKER_FILTERS</span>
                      <span>{crtEffects ? 'ENABLED' : 'DISABLED'}</span>
                    </button>

                    {/* Sound core audio toggle */}
                    <button 
                      onClick={handleMuteToggleLocal}
                      className={`px-3 py-1.5 border text-[9px] font-bold flex justify-between items-center cursor-pointer transition-all ${
                        !isMuted() ? 'border-[#00f3ff] bg-[#00f3ff]/5 text-white' : 'border-slate-800 text-slate-500'
                      }`}
                    >
                      <span>SYSTEM_SPEAKER_CORES</span>
                      <span>{!isMuted() ? 'UNMUTED' : 'MUTED'}</span>
                    </button>
                  </div>
                </div>

                {/* Diagnostics Panel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-1 border-b border-slate-900 pb-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-white font-hud tracking-widest block uppercase">[ 03 // DIAG_TELEMETRY ]</span>
                    <div className="space-y-1 text-[9px] bg-black/40 p-2.5 border border-slate-950">
                      <div>CLIENT_FPS: <span className="text-[#39ff14] font-bold">{fps} FPS</span></div>
                      <div>PING_DELAY: <span className="text-[#00f3ff] font-bold">{latency} ms</span></div>
                      <div>BROWSER: <span className="text-white truncate block max-w-[180px]">{navigator.userAgent.split(' ')[0]}</span></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-white font-hud tracking-widest block uppercase">[ 04 // DIAG_UTILITIES ]</span>
                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={runPingDiagnostic}
                        disabled={pingRunning}
                        className="py-1 border border-slate-800 bg-[#10141c] hover:border-[#00f3ff] hover:text-white text-[9px] uppercase cursor-pointer disabled:opacity-50"
                      >
                        {pingRunning ? 'RUNNING...' : 'PING PACKET SWEEP'}
                      </button>
                      <button 
                        onClick={triggerGlitchEffect}
                        className="py-1 border border-slate-800 bg-[#10141c] hover:border-[#ff007f] hover:text-white text-[9px] uppercase cursor-pointer"
                      >
                        TRIGGER SYSTEM GLITCH
                      </button>
                    </div>
                  </div>
                </div>

                {/* Port sweep output */}
                {pingLogs.length > 0 && (
                  <div className="bg-black border border-slate-950 p-2.5 max-h-24 overflow-y-auto font-mono text-[8px] text-[#39ff14] leading-tight space-y-0.5">
                    {pingLogs.map((log, i) => <div key={i}>{log}</div>)}
                  </div>
                )}

                {/* Safety Reset Block */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[8px] text-slate-600 font-code">AMN_OS INTERNAL BACKPLANE SERVICE PORT // ALL RIGHTS SECURED</span>
                  <button 
                    onClick={resetAllData}
                    className="border border-red-950 bg-red-950/10 hover:bg-red-500 hover:text-black hover:border-red-500 px-3 py-1 text-[9px] uppercase font-bold transition-all duration-200 cursor-pointer"
                  >
                    WIPE SESSION DATA
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
