import React, { useEffect, useRef, useState } from 'react';
import { playClickSound, playLevelUpSound, playBreakSound, playBootSound } from '../../utils/sound';

export default function DiagnosticsDeck({ addAchievement }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' or 'radar' for mobile layout
  const [isScanning, setIsScanning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hackState, setHackState] = useState(null); // { word: string, scrambled: string }
  const [logs, setLogs] = useState([
    'AMN_OS [Version 2.42.0]',
    '(c) 2026 Abhishek M Nair. All systems operational.',
    'Type "help" to initialize command instructions.',
    ''
  ]);

  const [themeColors, setThemeColors] = useState({ primary: '#00f3ff', secondary: '#ff007f' });
  const [systemPing, setSystemPing] = useState(4);

  const logEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scrambled word bank for hacking mini-game
  const hackWords = ['REACT', 'DJANGO', 'PYTHON', 'JAVASCRIPT', 'POSTGRESQL', 'TAILWIND', 'CYBERPUNK', 'TELEMETRY'];

  // Radar nodes representing portfolio sections
  const radarNodes = [
    { id: 'hero', name: 'SYS_BOOT', angle: 45, dist: 0.35, label: '01' },
    { id: 'about', name: 'COGNITIVE', angle: 120, dist: 0.55, label: '02' },
    { id: 'skills', name: 'TUNING', angle: 210, dist: 0.7, label: '03' },
    { id: 'projects', name: 'GARAGE', angle: 290, dist: 0.8, label: '04' },
    { id: 'experience', name: 'TIMELINE', angle: 10, dist: 0.65, label: '05' },
    { id: 'contact', name: 'SIGNAL', angle: 165, dist: 0.85, label: '07' },
  ];

  // Dynamic Theme Variable Observer
  useEffect(() => {
    const getColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const primary = styles.getPropertyValue('--color-cyan').trim() || '#00f3ff';
      const secondary = styles.getPropertyValue('--color-pink').trim() || '#ff007f';
      return { primary, secondary };
    };

    setThemeColors(getColors());

    const observer = new MutationObserver(() => {
      setThemeColors(getColors());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => observer.disconnect();
  }, []);

  // Periodic network ping simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemPing(Math.floor(2 + Math.random() * 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Focus terminal input
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'terminal') {
      focusInput();
    }
  }, [isOpen, activeTab]);

  // Toggle HUD
  const toggleDeck = () => {
    if (!isOpen) {
      playBootSound();
      setIsOpen(true);
    } else {
      playClickSound();
      setIsOpen(false);
    }
  };

  // Scroll to portfolio section
  const handleNodeClick = (sectionId, name) => {
    playClickSound();
    const element = document.getElementById(sectionId);
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

      appendLog(`[SYS] Initializing navigation link to node: ${name.toUpperCase()}...`);
      appendLog(`[SYS] Handshake established with segment ${sectionId.toUpperCase()}. Status: STABLE`);
    } else {
      appendLog(`[ERR] Node target segment ${sectionId.toUpperCase()} not found on network stack.`);
    }
  };

  // Trigger Sector Sweeping Laser scan
  const triggerScan = () => {
    if (isScanning) return;
    playBreakSound();
    setIsScanning(true);
    appendLog('[SCAN] INITIATING FULL SPECTRUM DIAGNOSTIC SWEEP...');

    setTimeout(() => {
      appendLog('[SCAN] Analysing DOM Node Tree stability... STABLE');
    }, 400);
    setTimeout(() => {
      appendLog('[SCAN] Checking global theme parameters... SYNCED');
    }, 800);
    setTimeout(() => {
      appendLog('[SCAN] Auditing local skill registers... 100% CORRECT');
    }, 1200);
    setTimeout(() => {
      appendLog('[SCAN] DIAGNOSTICS DETECTED 0 VULNERABILITIES.');
      setIsScanning(false);
    }, 1800);
  };

  // Scramble word generator
  const scrambleWord = (word) => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };

  const appendLog = (message) => {
    setLogs((prev) => [...prev, message]);
  };

  // Terminal Command Logic
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    playClickSound();
    setLogs((prev) => [...prev, `AMN_OS> ${cmd}`]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputValue('');

    const lowerCmd = cmd.toLowerCase();
    const args = lowerCmd.split(' ');
    const primaryCmd = args[0];

    // Check if user is in middle of a security hack decryption
    if (hackState) {
      if (primaryCmd === 'exit' || primaryCmd === 'abort') {
        setHackState(null);
        appendLog('[HACK] Decryption protocol aborted. System firewall re-engaged.');
        return;
      }

      // Check guess
      const guess = cmd.toUpperCase();
      if (guess === hackState.word) {
        setHackState(null);
        playLevelUpSound();
        appendLog('[+] DECRYPTION SUCCESSFUL!');
        appendLog('[+] FIREWALL DEFEATED. ACCESS GRANTED TO CORE TELEMETRY.');
        appendLog('[+] UPLOADING ACHIEVEMENT CREDENTIALS TO ROOT DOCK...');
        if (addAchievement) {
          addAchievement(
            'HACK',
            'Neural Core Decrypted',
            'Bypassed the terminal firewall by solving the decryption challenge.'
          );
        } else {
          // Fallback event dispatch
          window.dispatchEvent(new CustomEvent('achievement-unlocked', {
            detail: { type: 'HACK', title: 'Neural Core Decrypted', description: 'Solved the decryption puzzle.' }
          }));
        }
      } else {
        appendLog(`[-] BYPASS FAILED. Scrambled signature mismatch.`);
        appendLog(`[-] Hint: Scrambled key is "${hackState.scrambled}". Type "exit" to quit.`);
      }
      return;
    }

    // Standard commands
    switch (primaryCmd) {
      case 'clear':
      case 'cls':
        setLogs([]);
        break;

      case 'help':
        appendLog('Available Command Protocols:');
        appendLog('  about      - Display developer biological background.');
        appendLog('  skills     - Access skill ratings and core vectors.');
        appendLog('  projects   - Scan projects directory and view builds.');
        appendLog('  system     - Check hardware specs, scan grid, or ping host.');
        appendLog('  hack       - Attempt to crack the neural firewall server.');
        appendLog('  clear      - Clear the console outputs.');
        break;

      case 'about':
        appendLog('RETRIEVING BIO_DATA FILE...');
        appendLog('------------------------------------');
        appendLog('NAME: Abhishek M Nair');
        appendLog('ROLE: AI & Full-Stack Engineer');
        appendLog('FOCUS: LLM Agents, Next.js, Django, Python');
        appendLog('STATUS: Active and open for innovative collaborations.');
        appendLog('------------------------------------');
        break;

      case 'skills':
        appendLog('COMPILING COGNITIVE ABILITY RATINGS...');
        appendLog('  React/Next.js  [██████████░░] 85%');
        appendLog('  Django/Python  [███████████░] 90%');
        appendLog('  Agentic AI     [██████████░░] 85%');
        appendLog('  PostgreSQL     [████████░░░░] 70%');
        appendLog('  DevOps/Docker  [████████░░░░] 68%');
        appendLog('System modules operational at 100% capacity.');
        break;

      case 'projects':
        if (args[1] === 'view' && args[2]) {
          const index = parseInt(args[2], 10) - 1;
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            appendLog(`[SYS] Accessing details for Build #${args[2]}...`);
            projectsSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            appendLog('[ERR] Failed to interface with Project Section.');
          }
        } else {
          appendLog('SCANNING PROJECT REPOSITORY...');
          appendLog('  Build #1: HoloGlobe Visualizer - WebGL FUI interface');
          appendLog('  Build #2: AI Agent Orchestration - LangChain backplane');
          appendLog('  Build #3: Cyberpunk Dashboard - Custom UI systems');
          appendLog('Type "projects view [number]" to navigate to a build.');
        }
        break;

      case 'system':
        if (args[1] === 'scan') {
          triggerScan();
        } else {
          appendLog('AMN_CORE TELEMETRY LOG:');
          appendLog(`  SYS_PING:       ${systemPing}ms`);
          appendLog(`  HOST_BROWSER:   ${navigator.userAgent.split(' ')[0]}`);
          appendLog(`  UI_THEME:       Active system variables detected`);
          appendLog(`  GRID_DENSITY:   70 connection nodes`);
          appendLog('Type "system scan" to sweep sector network.');
        }
        break;

      case 'hack':
        const targetWord = hackWords[Math.floor(Math.random() * hackWords.length)];
        const scrambled = scrambleWord(targetWord);
        setHackState({ word: targetWord, scrambled });
        appendLog('[WARNING] FIREWALL BYPASS CHALLENGE INITIALIZED.');
        appendLog(`[WARNING] Decrypt the scrambled core keyword: "${scrambled}"`);
        appendLog('[WARNING] Input your answer below (or type "exit" to abort):');
        break;

      default:
        appendLog(`[ERR] Command "${cmd}" unrecognized by AMN_OS host kernel.`);
        appendLog('Type "help" for a list of available command protocols.');
        break;
    }
  };

  // Keyboard navigation for history (Arrow Up/Down)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setInputValue(commandHistory[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIdx = historyIndex === -1 ? -1 : historyIndex + 1;
      if (newIdx >= commandHistory.length || newIdx === -1) {
        setHistoryIndex(-1);
        setInputValue('');
      } else {
        setHistoryIndex(newIdx);
        setInputValue(commandHistory[newIdx]);
      }
    }
  };

  return (
    <>
      {/* Full-Screen Laser Sweep (Visual Effect) */}
      {isScanning && (
        <>
          <style>{`
            @keyframes laserSweep {
              0% { transform: translateY(-10vh); opacity: 1; }
              50% { opacity: 1; }
              100% { transform: translateY(110vh); opacity: 0; }
            }
            .laser-sweep-line {
              position: fixed;
              left: 0;
              width: 100%;
              height: 3px;
              z-index: 9999;
              pointer-events: none;
              animation: laserSweep 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            }
          `}</style>
          <div 
            className="laser-sweep-line" 
            style={{ 
              top: 0,
              background: themeColors.primary,
              boxShadow: `0 0 10px ${themeColors.primary}, 0 0 20px ${themeColors.primary}`
            }} 
          />
        </>
      )}

      {/* Main Console Float Container */}
      <div className="fixed bottom-4 right-4 left-4 md:left-auto z-45 font-code text-xs">
        {/* COLLAPSED WIDGET - Sci-Fi Radar Disk */}
        {!isOpen && (
          <button
            onClick={toggleDeck}
            className="group relative ml-auto flex items-center gap-3 bg-[#080b10]/95 border p-2 pl-3 shadow-[0_6px_24px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer select-none transition-all duration-300 hover:scale-[1.02]"
            style={{
              borderColor: `${themeColors.primary}44`,
              boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5), inset 0 0 8px ${themeColors.primary}11`
            }}
            onMouseEnter={() => {
              // Glowing effect on hover
              const btn = document.getElementById('collapsed-disk-border');
              if (btn) btn.style.borderColor = themeColors.primary;
            }}
            onMouseLeave={() => {
              const btn = document.getElementById('collapsed-disk-border');
              if (btn) btn.style.borderColor = `${themeColors.primary}44`;
            }}
          >
            {/* Cyber Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: themeColors.primary }} />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: themeColors.secondary }} />

            {/* Glowing Telemetry Labels */}
            <div className="flex flex-col text-left">
              <span className="font-hud text-[8px] tracking-wider text-slate-500 uppercase">SYS_CONSOLE</span>
              <span className="font-hud text-[9px] font-bold tracking-widest text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: themeColors.primary }} />
                OS_ACTIVE
              </span>
            </div>

            {/* Rotating Vector Sonar Scanner (SVG) */}
            <div 
              id="collapsed-disk-border"
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 overflow-hidden bg-black/40"
              style={{ borderColor: `${themeColors.primary}44` }}
            >
              <svg className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" stroke={`${themeColors.primary}22`} strokeWidth="1" fill="none" />
                <line x1="20" y1="20" x2="36" y2="20" stroke={themeColors.primary} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="30" cy="20" r="2" fill={themeColors.secondary} />
              </svg>
            </div>
          </button>
        )}

        {/* EXPANDED FULL CYBER COMMAND CONSOLE */}
        {isOpen && (
          <div 
            className="w-full md:w-[720px] bg-[#070a0e]/95 border flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-lg relative transition-all duration-350 overflow-hidden"
            style={{
              borderColor: themeColors.primary,
              boxShadow: `0 0 30px ${themeColors.primary}22, inset 0 0 16px ${themeColors.primary}0a`
            }}
          >
            {/* Tech Carbon scan lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />

            {/* Cyber Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: themeColors.primary }} />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: themeColors.primary }} />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: themeColors.secondary }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: themeColors.secondary }} />

            {/* Header Console Bar */}
            <div className="flex justify-between items-center bg-black/60 border-b px-4 py-2 border-slate-900 z-20">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: themeColors.primary }} />
                <span className="font-hud text-[10px] text-slate-200 font-bold tracking-widest uppercase">
                  AMN // DECK_CONTROLLER_v2.4
                </span>
                {hackState && (
                  <span className="font-hud text-[8px] bg-red-950 border border-red-500 px-1 text-red-400 font-bold animate-pulse">
                    FIREWALL_ALERT
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={triggerScan}
                  disabled={isScanning}
                  className="font-hud text-[8px] px-2 py-0.5 border hover:text-white cursor-pointer select-none font-bold uppercase transition-all"
                  style={{
                    borderColor: `${themeColors.primary}88`,
                    color: themeColors.primary
                  }}
                >
                  {isScanning ? 'SCANNING...' : 'SECTOR SCAN'}
                </button>
                <button 
                  onClick={toggleDeck}
                  className="text-slate-400 hover:text-white text-xs select-none transition-colors cursor-pointer"
                  title="Close command console"
                >
                  [X]
                </button>
              </div>
            </div>

            {/* Content Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 h-[340px] md:h-[260px] relative z-20">
              {/* Tab Selector (Mobile Only) */}
              <div className="flex md:hidden bg-black/40 border-b border-slate-900 text-center text-[10px]">
                <button 
                  onClick={() => setActiveTab('terminal')}
                  className={`flex-1 py-2 font-hud tracking-widest border-r border-slate-900 ${
                    activeTab === 'terminal' ? 'text-white bg-black/30' : 'text-slate-500'
                  }`}
                  style={activeTab === 'terminal' ? { borderBottom: `2px solid ${themeColors.primary}` } : {}}
                >
                  [TERMINAL FEED]
                </button>
                <button 
                  onClick={() => setActiveTab('radar')}
                  className={`flex-1 py-2 font-hud tracking-widest ${
                    activeTab === 'radar' ? 'text-white bg-black/30' : 'text-slate-500'
                  }`}
                  style={activeTab === 'radar' ? { borderBottom: `2px solid ${themeColors.primary}` } : {}}
                >
                  [HOLO_RADAR]
                </button>
              </div>

              {/* LEFT PANE: Interactive Terminal Simulator */}
              <div 
                onClick={focusInput}
                className={`md:col-span-3 flex flex-col p-4 bg-black/35 overflow-y-auto cursor-text ${
                  activeTab === 'terminal' ? 'flex' : 'hidden md:flex'
                }`}
              >
                <div className="flex-1 space-y-1 overflow-y-auto select-text scrollbar-none">
                  {logs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`leading-relaxed break-all whitespace-pre-wrap ${
                        log.startsWith('AMN_OS>') 
                          ? 'text-white font-bold' 
                          : log.startsWith('[ERR]') || log.startsWith('[-]')
                          ? 'text-red-400 font-semibold'
                          : log.startsWith('[+]') || log.startsWith('[SUCCESS]')
                          ? 'text-[#39ff14]'
                          : log.startsWith('[WARNING]')
                          ? 'text-[#ffaa00]'
                          : 'text-slate-400'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                  {hackState && (
                    <div className="text-[#ffaa00] animate-pulse">
                      SECURE_BYPASS_MODE: Enter decrypted response...
                    </div>
                  )}
                  <div ref={logEndRef} />
                </div>

                {/* Command Input Prompt Form */}
                <form onSubmit={handleCommandSubmit} className="flex items-center mt-2 border-t border-slate-950 pt-2">
                  <span className="text-white font-bold mr-1.5">AMN_OS&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white border-none outline-none focus:ring-0 p-0 font-code text-xs caret-white"
                    placeholder={hackState ? "Enter decrypted string..." : "Type 'help' for options..."}
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                  <span className="w-1.5 h-3.5 bg-white animate-pulse" />
                </form>
              </div>

              {/* RIGHT PANE: Holographic Nav Radar */}
              <div 
                className={`md:col-span-2 flex flex-col items-center justify-between p-4 border-l border-slate-900 bg-[#090e15]/40 select-none relative ${
                  activeTab === 'radar' ? 'flex' : 'hidden md:flex'
                }`}
              >
                {/* Radar Rotating Scan Sweeper */}
                <div className="w-full flex-1 flex items-center justify-center relative max-h-[190px]">
                  <svg className="w-[170px] h-[170px] relative" viewBox="0 0 200 200">
                    {/* Concentric rings */}
                    <circle cx="100" cy="100" r="95" stroke={`${themeColors.primary}22`} strokeWidth="1" fill="none" />
                    <circle cx="100" cy="100" r="70" stroke={`${themeColors.primary}18`} strokeWidth="0.8" fill="none" />
                    <circle cx="100" cy="100" r="45" stroke={`${themeColors.primary}12`} strokeWidth="0.6" fill="none" />
                    <circle cx="100" cy="100" r="20" stroke={`${themeColors.primary}0a`} strokeWidth="0.4" fill="none" />
                    
                    {/* Crosshairs */}
                    <line x1="5" y1="100" x2="195" y2="100" stroke={`${themeColors.primary}11`} strokeWidth="0.8" />
                    <line x1="100" y1="5" x2="100" y2="195" stroke={`${themeColors.primary}11`} strokeWidth="0.8" />
                    
                    {/* Angular Grid Lines */}
                    <line x1="32.8" y1="32.8" x2="167.2" y2="167.2" stroke={`${themeColors.primary}07`} strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="167.2" y1="32.8" x2="32.8" y2="167.2" stroke={`${themeColors.primary}07`} strokeWidth="0.5" strokeDasharray="3,3" />

                    {/* Rotating scan sweeping line */}
                    <g className="animate-spin" style={{ animationDuration: '6s', transformOrigin: '100px 100px' }}>
                      <line x1="100" y1="100" x2="100" y2="5" stroke={themeColors.primary} strokeWidth="1.2" strokeOpacity="0.8" />
                      <polygon points="100,100 100,5 80,10" fill={`url(#radarSweepGlow-${themeColors.primary.replace('#','')})`} opacity="0.3" />
                    </g>

                    {/* Gradients */}
                    <defs>
                      <linearGradient id={`radarSweepGlow-${themeColors.primary.replace('#','')}`} x1="1" y1="0.5" x2="0" y2="0.5">
                        <stop offset="0%" stopColor={themeColors.primary} stopOpacity="1" />
                        <stop offset="100%" stopColor={themeColors.primary} stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Floating Radar Node targets */}
                    {radarNodes.map((node) => {
                      // Calculate Cartesian coordinates based on polar config
                      const rad = (node.angle * Math.PI) / 180;
                      const r = node.dist * 90; // scale distance to radar radius
                      const cx = 100 + r * Math.cos(rad);
                      const cy = 100 - r * Math.sin(rad); // invert Y for SVG

                      return (
                        <g 
                          key={node.id} 
                          className="cursor-pointer group/node"
                          onClick={() => handleNodeClick(node.id, node.name)}
                        >
                          {/* Inner glowing pulse */}
                          <circle cx={cx} cy={cy} r="4" fill={themeColors.secondary} className="animate-pulse" />
                          {/* Outer hover ring */}
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r="8" 
                            fill="none" 
                            stroke={themeColors.primary} 
                            strokeWidth="1.2" 
                            className="scale-0 opacity-0 group-hover/node:scale-100 group-hover/node:opacity-100 transition-all duration-250 origin-center"
                            style={{ transformOrigin: `${cx}px ${cy}px` }}
                          />
                          {/* Code Index Tag Label */}
                          <text 
                            x={cx + 7} 
                            y={cy + 3} 
                            fill="#ffffff" 
                            className="font-hud text-[6px] tracking-wide font-bold group-hover/node:fill-[#39ff14] transition-colors"
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Sonar sweep radial scan text info overlay */}
                  <div className="absolute top-2 left-2 text-[7px] text-slate-500 font-hud tracking-widest flex flex-col space-y-0.5">
                    <span>SECTOR_SCAN: ACTIVE</span>
                    <span>COORDS: RADIAL</span>
                  </div>
                </div>

                {/* Radar Info Badge Footer */}
                <div className="w-full border-t border-slate-950 pt-2 flex justify-between items-center text-[7px] text-slate-400 font-hud">
                  <div className="flex items-center space-x-1">
                    <span className="w-1 h-1 bg-[#39ff14] rounded-full" />
                    <span>SYS_PING: {systemPing}ms</span>
                  </div>
                  <span>RADAR LOCK: ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Footer telemetry confirmation */}
            <div className="bg-black/80 px-4 py-1.5 border-t border-slate-900 flex justify-between items-center text-[7px] text-[#808a9d] font-code relative z-20">
              <span className="flex items-center gap-1">
                <span>SECTOR_ALPHA: CONFIRMED</span>
                <span>|</span>
                <span>NODES: {radarNodes.length} ONLINE</span>
              </span>
              <span className="hover:text-white transition-colors cursor-pointer select-none" onClick={() => appendLog(`[SYS] Latency verified at ${systemPing}ms.`)}>
                LATENCY_CHECK // SECURE
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
