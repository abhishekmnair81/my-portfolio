import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useTypewriter from '../hooks/useTypewriter';
import { playClickSound, playLevelUpSound } from '../utils/sound';

function SVGDial({ percent, valueText, label, strokeColor, glowColor }) {
  const radius = 30;
  const strokeDash = 2 * Math.PI * radius;
  const offset = strokeDash - (percent / 100) * strokeDash;

  return (
    <div className="flex flex-col items-center space-y-2 group">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer spinning dash guide */}
        <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '14s' }} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="37" stroke={`${strokeColor}22`} strokeWidth="0.8" strokeDasharray="5,6" fill="none" />
        </svg>

        <svg className="w-18 h-18 transform -rotate-90">
          {/* Main track ring */}
          <circle cx="36" cy="36" r={radius} stroke="#0d1116" strokeWidth="3" fill="transparent" />
          
          {/* Progress arc */}
          <motion.circle
            cx="36"
            cy="36"
            r={radius}
            stroke={strokeColor}
            strokeWidth="3.5"
            fill="transparent"
            strokeDasharray={strokeDash}
            initial={{ strokeDashoffset: strokeDash }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }}
          />
        </svg>

        {/* Value Text */}
        <div className="absolute inset-0 flex items-center justify-center font-hud text-[9.5px] text-white font-bold group-hover:scale-105 transition-transform">
          {valueText || `${percent}%`}
        </div>
      </div>
      <span className="font-tech text-[8px] sm:text-[9px] text-[#808a9d] group-hover:text-white transition-colors tracking-widest uppercase text-center block leading-tight">
        {label}
      </span>
    </div>
  );
}

function TelemetryWaveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth || 300;
      canvas.height = canvas.parentElement.clientHeight || 64;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const themeColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-cyan')
        .trim() || '#00f3ff';

      // Grid mesh background
      ctx.strokeStyle = '#10141c';
      ctx.lineWidth = 0.5;
      const gridSize = 10;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = themeColor;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 3;

      for (let x = 0; x < canvas.width; x++) {
        const sine = Math.sin(x * 0.055 + offset);
        let spike = 0;
        const period = (x + offset * 8) % 150;
        if (period > 115 && period < 128) {
          const t = (period - 115) / 13;
          spike = Math.sin(t * Math.PI) * 16;
        } else if (period >= 128 && period < 136) {
          const t = (period - 128) / 8;
          spike = -Math.sin(t * Math.PI) * 8;
        }

        const y = canvas.height / 2 + sine * 3.5 + spike;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // scanbar line
      const scanX = (offset * 90) % canvas.width;
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.4)';
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, canvas.height);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '7px Courier New';
      ctx.fillText(`FRQ: ${(54 + Math.sin(offset) * 1.5).toFixed(1)}Hz`, 6, 12);
      ctx.fillText(`SYS_LOAD: ${(68 + Math.cos(offset) * 3).toFixed(1)}%`, 6, 22);
      ctx.fillText(`SIGNAL: LOCK`, canvas.width - 64, 12);

      offset += 0.04;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

export default function Hero({ aboutData }) {
  const roles = [
    "Abhishek M Nair joined as React Developer",
    "Abhishek M Nair joined as Full Stack Developer",
    "Abhishek M Nair joined as Django REST API Engineer",
    "Abhishek M Nair joined as AI/ML Enthusiast"
  ];
  const typedRole = useTypewriter(roles);

  const name = aboutData?.name || "Abhishek M Nair";
  const tagline = aboutData?.tagline || "Building intelligent web apps with Django, React & Machine Learning";

  const github = aboutData?.github || "https://github.com/abhishekmnair81";
  const linkedin = aboutData?.linkedin || "https://linkedin.com/in/abhishekmnair81";
  const instagram = aboutData?.instagram || "https://instagram.com/abhishek__muralidharan";
  const twitter = aboutData?.twitter || "https://x.com/abhishekm_nair";

  // System status codes
  const [logs, setLogs] = useState([
    "SYS_INIT: Accessing DeepMind computing core...",
    "COGNITIVE: Initializing neural network parameters...",
    "DATABASE: Connection to local SQLite telemetry node synced.",
    "STATUS: Core system diagnostic... 100% OK."
  ]);

  const [downloading, setDownloading] = useState(false);
  const consoleContainerRef = useRef(null);
  const [commandInput, setCommandInput] = useState('');

  // Auto-scroll logs internally without pulling the parent window viewport
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    playClickSound();

    // Add command to log
    setLogs(prev => [...prev, `guest@amn-hud:~$ ${commandInput}`]);
    setCommandInput('');

    setTimeout(() => {
      if (cmd === 'help') {
        setLogs(prev => [
          ...prev,
          "TELEMETRY_SHELL MODULE HELP v1.0",
          "Available commands:",
          "  help     - Show telemetry guide instructions",
          "  about    - Print biographical core specs",
          "  skills   - List all loaded programming skill items",
          "  projects - Print current technical builds catalog",
          "  clear    - Clear console log stack"
        ]);
      } else if (cmd === 'about') {
        setLogs(prev => [
          ...prev,
          `NAME: Abhishek M Nair`,
          `ROLE: Full Stack Developer | AI & ML Enthusiast`,
          `LOCATION: Bengaluru, Karnataka, India`,
          `TAGLINE: "${tagline}"`
        ]);
      } else if (cmd === 'skills') {
        setLogs(prev => [
          ...prev,
          "PRIMARY STOCK CORES:",
          "  [Frontend] React.js | JavaScript | HTML5 & CSS3 | Bootstrap",
          "  [Backend]  Python | Django | Django REST Framework | Flask",
          "  [Database] PostgreSQL | SQLite | MySQL",
          "  [AI & ML]  Machine Learning | Deep Learning | NLP | PyTorch"
        ]);
      } else if (cmd === 'projects') {
        setLogs(prev => [
          ...prev,
          "BLUEPRINTS RETRIEVED:",
          "  1. AI-Integrated Telemedicine System [Django + React]",
          "  2. LearnNova — E-Learning Web App [React + REST API]",
          "  3. Credit Card Fraud Detection [Python + ML]",
          "  4. Plant Disease Detection [TensorFlow + Keras]",
          "  5. Safety Helmet Detection [YOLOv8 + CV]",
          "  6. Sentiment Analysis of Reviews [NLP + Scikit-Learn]"
        ]);
      } else if (cmd === 'clear') {
        setLogs([
          "Console stack cleared.",
          "Type 'help' for options."
        ]);
      } else {
        setLogs(prev => [
          ...prev,
          `bash: command not found: ${cmd}. Type 'help' for available command vectors.`
        ]);
      }
    }, 150);
  };

  // Terminal logging ticks
  useEffect(() => {
    const messages = [
      "DIAGNOSTIC: Ping check complete. Client response latency: 4ms",
      "AI_CORE: Loading custom NLP sentiment classifier weights...",
      "AI_CORE: Telemedicine prediction inference benchmark: 8.2ms",
      "SYS_STATUS: Developer telemetry stream synced.",
      "TELEMETRY: Querying remote project nodes... Success.",
      "GIT_LOG: Syncing repo abhishekmnair81 updates... Done.",
      "DATABASE: SQLite database cache levels normal.",
      "SYS_ALERT: Connection to backend node verified."
    ];

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setLogs(prev => [...prev.slice(-5), `[${timeStr}] ${randomMsg}`]);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleScrollToProjects = () => {
    playClickSound();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = (elementRect - bodyRect) - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    playLevelUpSound();
    setDownloading(true);

    // Download static PDF resume from public folder
    const element = document.createElement("a");
    element.href = "/Abhishek_M_Nair_Resume.pdf";
    element.download = "Abhishek_M_Nair_Resume.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setDownloading(false);
      setLogs(prev => [...prev, `[LOG] RESUME_MODULE_DOWNLOAD_COMPLETE: 200 OK`]);
    }, 1200);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-28 pb-20 bg-cyber-grid scanlines overflow-hidden border-b border-[#1b253b]"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00f3ff]/5 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ff007f]/5 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Introductions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7">

          {/* Diagnostic Tag */}
          <div className="bg-[#0b0e14] border border-[#1b253b] px-3 py-1 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-blink" />
            <span className="font-code text-[9px] sm:text-[10px] tracking-widest text-[#808a9d] uppercase">
              STATUS: ONLINE // BOOT_SECTOR_LOADED
            </span>
          </div>

          {/* Large Name */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-black tracking-wider leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-white to-[#ff007f]">
              {name}
            </span>
          </h1>

          {/* Typewriter role (joined server logs) */}
          <div className="h-6 flex items-center justify-center lg:justify-start">
            <span className="font-code text-xs sm:text-sm text-[#ffaa00] font-bold">
              &gt;&gt; {typedRole}
              <span className="animate-blink">|</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="font-sans text-sm sm:text-base text-[#808a9d] max-w-md leading-relaxed">
            {tagline}
          </p>

          {/* XP PROGRESS BAR REQUEST */}
          <div className="w-full max-w-md bg-black/60 border border-slate-900 p-3 font-code text-left relative">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#39ff14]" />
            <div className="flex justify-between text-[9px] text-[#ffaa00] mb-1.5 uppercase font-bold tracking-wider">
              <span>[ XP LEVEL: EXPERIENCE ]</span>
              <span>6 Months XP</span>
            </div>
            {/* Bar track */}
            <div className="w-full h-3.5 bg-[#10141c] border border-slate-800 p-[1px] relative">
              <div className="h-full bg-gradient-to-r from-[#ffaa00] to-[#39ff14] shadow-[0_0_8px_rgba(57,255,20,0.5)]" style={{ width: '25%' }} />
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold tracking-widest uppercase">
                6 Months (Intern)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center lg:justify-start max-w-sm pt-2">
            <button
              className="cyber-btn w-full sm:w-auto"
              onClick={handleScrollToProjects}
            >
              VIEW PROJECTS
            </button>
            <button
              className="cyber-btn-secondary w-full sm:w-auto text-center"
              onClick={handleDownloadResume}
              disabled={downloading}
            >
              {downloading ? "DOWNLOADING..." : "DOWNLOAD RESUME"}
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3.5 pt-3 justify-center lg:justify-start">

            {/* GitHub */}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="p-2.5 bg-[#10141c]/80 border border-[#1b253b] hover:border-[#00f3ff] hover:text-[#00f3ff] text-[#808a9d] transition-all shadow-lg"
              title="GitHub Profile"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="p-2.5 bg-[#10141c]/80 border border-[#1b253b] hover:border-[#00f3ff] hover:text-[#00f3ff] text-[#808a9d] transition-all shadow-lg"
              title="LinkedIn Profile"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="p-2.5 bg-[#10141c]/80 border border-[#1b253b] hover:border-[#00f3ff] hover:text-[#00f3ff] text-[#808a9d] transition-all shadow-lg"
              title="Instagram Profile"
            >
              <svg className="w-4.5 h-4.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="p-2.5 bg-[#10141c]/80 border border-[#1b253b] hover:border-[#00f3ff] hover:text-[#00f3ff] text-[#808a9d] transition-all shadow-lg"
              title="Twitter/X Profile"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Right Column: Telemetry Scanning Card & Server Log */}
        <div className="lg:col-span-5 flex flex-col space-y-6 items-center">

          <div className="w-full max-w-sm cyber-card border border-[#1b253b] p-6 relative overflow-hidden scanner-container">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
              <span className="font-hud text-[9px] text-[#00f3ff] tracking-widest uppercase">ACTIVE_ENGINE_DIALS</span>
              <span className="font-code text-[8px] text-[#ff007f]">SYS_TELEMETRY</span>
            </div>

            {/* Realtime Telemetry Grid Wave */}
            <div className="h-16 w-full mb-5 bg-black/60 border border-slate-900 overflow-hidden relative">
              <TelemetryWaveCanvas />
            </div>

            {/* SVG GAUGE DIALS */}
            <div className="grid grid-cols-3 gap-2">
              <SVGDial
                percent={95}
                label="AI & MLSpecial"
                strokeColor="#ff007f"
                glowColor="rgba(255, 0, 127, 0.4)"
              />
              <SVGDial
                percent={90}
                label="Full StackEng"
                strokeColor="#39ff14"
                glowColor="rgba(57, 255, 20, 0.4)"
              />
              <SVGDial
                percent={100}
                valueText="8.2ms"
                label="ModelInf Speed"
                strokeColor="#00f3ff"
                glowColor="rgba(0, 243, 255, 0.4)"
              />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center font-code text-[9px] text-[#808a9d]">
              <span>CORE_ALLOC: <span className="text-white">CUDA/GPU</span></span>
              <span>COMPILER: <span className="text-[#39ff14]">OPTIMIZED</span></span>
            </div>
          </div>

          {/* Scrolling System Console */}
          <div className="w-full max-w-sm bg-black/95 border border-[#1b253b] p-4 flex flex-col h-56 shadow-[0_0_15px_rgba(57,255,20,0.05)]">
            <div className="border-b border-slate-800 pb-1 mb-2 flex items-center justify-between">
              <span className="font-hud text-[8px] text-[#ff007f] tracking-widest">🖥️ ENGINE_TELEMETRY_LOGS</span>
              <span className="w-1.5 h-1.5 bg-[#ff007f] rounded-full animate-blink" />
            </div>

            <div ref={consoleContainerRef} className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin select-none font-code text-[10px] text-[#39ff14] leading-snug">
              {logs.map((log, i) => (
                <div key={i} className="break-words opacity-90">
                  <span className="text-[#808a9d] mr-1">&gt;&gt;</span> {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleCommandSubmit} className="mt-2 pt-1.5 border-t border-slate-850 flex items-center text-[10px] font-code text-[#39ff14]">
              <span className="text-[#808a9d] mr-1">guest@amn-hud:~$</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[#39ff14] p-0 font-code text-[10px] focus:ring-0 focus:outline-none"
                placeholder="Type 'help'..."
                autoComplete="off"
              />
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
