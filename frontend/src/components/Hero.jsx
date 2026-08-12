import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useTypewriter from '../hooks/useTypewriter';
import { playClickSound, playLevelUpSound } from '../utils/sound';

// Interactive Particle Constellation Canvas with mouse physics
function ParticleConstellationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 160 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particleCount = Math.min(Math.floor(width / 18), 70);
    const particles = [];

    const colors = ['#00f3ff', '#ff007f', '#39ff14', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      for (let p of particles) {
        // Mouse repelling physics
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const angle = Math.atan2(mdy, mdx);
          const force = (mouse.radius - mdist) / mouse.radius;
          p.x += Math.cos(angle) * force * 3;
          p.y += Math.sin(angle) * force * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />;
}

function SVGDial({ percent, valueText, label, strokeColor, glowColor }) {
  const radius = 30;
  const strokeDash = 2 * Math.PI * radius;
  const offset = strokeDash - (percent / 100) * strokeDash;

  return (
    <div className="flex flex-col items-center space-y-1.5 group">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '14s' }} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="37" stroke={`${strokeColor}22`} strokeWidth="0.8" strokeDasharray="5,6" fill="none" />
        </svg>

        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={radius} stroke="#0d1116" strokeWidth="3" fill="transparent" />
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

        <div className="absolute inset-0 flex items-center justify-center font-hud text-[8px] sm:text-[9.5px] text-white font-bold group-hover:scale-105 transition-transform">
          {valueText || `${percent}%`}
        </div>
      </div>
      <span className="font-tech text-[7px] sm:text-[8.5px] text-[#808a9d] group-hover:text-white transition-colors tracking-widest uppercase text-center block leading-tight px-0.5">
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
    let animId;
    let phase = 0;

    const render = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 15) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 8;

      for (let x = 0; x <= width; x += 3) {
        const y = height / 2 + Math.sin(x * 0.05 + phase) * 12 * Math.sin(x * 0.015);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 1;
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 6;

      for (let x = 0; x <= width; x += 4) {
        const y = height / 2 + Math.cos(x * 0.04 - phase * 1.2) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.06;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

export default function Hero({ aboutData }) {
  // 3D Tilt Card state
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleCardMouseLeave = (e) => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    });
  };

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

  const [logs, setLogs] = useState([
    "SYS_INIT: Accessing DeepMind computing core...",
    "COGNITIVE: Initializing neural network parameters...",
    "DATABASE: Connection to local SQLite telemetry node synced.",
    "STATUS: Core system diagnostic... 100% OK."
  ]);

  const [downloading, setDownloading] = useState(false);
  const consoleContainerRef = useRef(null);
  const [commandInput, setCommandInput] = useState('');

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
          "  system   - Print active CPU/GPU and compiler telemetry",
          "  matrix   - Toggle the full screen cascading hex stream",
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
          "  [Backend]  Python | Django | Django REST Framework",
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
          "  4. Plant Disease Detection [Deep Learning]",
          "  5. Safety Helmet Detection [YOLOv8 + CV]",
          "  6. Sentiment Analysis of Reviews [NLP + Scikit-Learn]"
        ]);
      } else if (cmd === 'system' || cmd === 'sys') {
        setLogs(prev => [
          ...prev,
          "SYSTEM CORE PERFORMANCE METRICS:",
          "  PING_LATENCY: 4ms",
          "  CUDA_STATUS: ACTIVE [1 GPU]",
          "  MEM_ALLOC:   1.46 GB / 8.00 GB",
          "  INF_SPEED:   8.2ms (YOLOv8 & NLP)",
          "  HUD_VERSION: v1.0.4 (Optimized)"
        ]);
      } else if (cmd === 'matrix' || cmd === 'rain') {
        window.dispatchEvent(new CustomEvent('toggle-matrix'));
        setLogs(prev => [
          ...prev,
          "MATRIX_MODE: Toggled falling code stream overlay."
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

    const element = document.createElement("a");
    element.href = "/Abhishek M Nair Resume.pdf";
    element.download = "Abhishek M Nair Resume.pdf";
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
      {/* Interactive Constellation Canvas */}
      <ParticleConstellationCanvas />

      {/* Floating ambient glowing spheres */}
      <div className="absolute top-1/4 left-[15%] w-80 h-80 bg-[#00f3ff]/8 rounded-full filter blur-[100px] pointer-events-none animate-float-orb z-[1]" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-[#ff007f]/7 rounded-full filter blur-[110px] pointer-events-none animate-float-orb-slow z-[1]" />
      <div className="absolute top-[60%] left-[5%] w-48 h-48 bg-[#39ff14]/5 rounded-full filter blur-[80px] pointer-events-none animate-float-orb z-[1]" style={{ animationDelay: '3s' }} />

      {/* Laser line sweep */}
      <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent pointer-events-none animate-scanline-sweep z-[3]" />

      {/* Corner borders */}
      <div className="absolute top-24 left-4 w-16 h-16 border-t border-l border-[#00f3ff]/30 pointer-events-none" />
      <div className="absolute top-24 right-4 w-16 h-16 border-t border-r border-[#ff007f]/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#00f3ff]/20 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#ff007f]/20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Bio & Intro */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Glowing Status badge */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            <div className="bg-[#0b0e14]/95 border border-[#1b253b] px-3.5 py-1.5 flex items-center space-x-2 relative overflow-hidden group animate-neon-pulse shadow-[0_0_15px_rgba(57,255,20,0.15)]">
              <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-ping" />
              <span className="font-code text-[9.5px] sm:text-[10.5px] font-bold tracking-widest text-slate-200 uppercase">
                STATUS: ONLINE // READY_FOR_HIRE
              </span>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#ff007f]" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f3ff]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
            <div className="bg-[#0b0e14]/95 border border-[#1b253b] px-3 py-1.5 flex items-center space-x-1.5">
              <span className="text-[#00f3ff] font-code text-[9.5px] sm:text-[10.5px]">LOC:</span>
              <span className="text-[#808a9d] font-code text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider">BLR_IND [12.97°N]</span>
            </div>
          </motion.div>

          {/* Large Animated Title */}
          <motion.h1
            className="text-3xl sm:text-5xl lg:text-6xl text-white font-black tracking-wider leading-none"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-white to-[#ff007f] animate-glitch-flicker drop-shadow-[0_0_25px_rgba(0,243,255,0.3)]">
              {name}
            </span>
          </motion.h1>

          {/* Futuristic divider line */}
          <motion.div
            className="flex items-center gap-3 w-full max-w-md justify-center lg:justify-start"
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, delay: 0.1 } } }}
            style={{ transformOrigin: 'left' }}
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00f3ff] to-transparent" />
            <span className="font-code text-[8.5px] text-[#00f3ff] font-bold tracking-[0.3em] uppercase">AI · FULL STACK · ML</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-[#ff007f] to-transparent" />
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            className="h-6 flex items-center justify-center lg:justify-start"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
          >
            <span className="font-code text-xs sm:text-sm text-[#ffaa00] font-bold">
              &gt;&gt; {typedRole}
              <span className="animate-cursor">|</span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="font-sans text-sm sm:text-base text-[#808a9d] max-w-md leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            {tagline}
          </motion.p>

          {/* Experience Progress Bar */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-black/70 border border-[#1b253b] hover:border-[#00f3ff]/50 p-3.5 font-code text-left relative overflow-hidden group shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f3ff]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#39ff14]" />
            <div className="flex justify-between text-[9.5px] text-[#ffaa00] mb-1.5 uppercase font-bold tracking-wider">
              <span>[ XP LEVEL: EXPERIENCE ]</span>
              <span>6 Months XP</span>
            </div>
            <div className="w-full h-3.5 bg-[#10141c] border border-slate-800 p-[1px] relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '25%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: "easeOut", delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#ffaa00] to-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.6)]"
              />
              <span className="absolute inset-0 flex items-center justify-center text-[8.5px] text-white font-bold tracking-widest uppercase">
                6 Months (Intern)
              </span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-900 grid grid-cols-2 gap-3 text-[8px] text-[#808a9d]">
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>CH_A // AI_COGNITIVE</span>
                  <span className="text-[#ff007f]">85%</span>
                </div>
                <div className="h-1 bg-[#10141c] rounded-none overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.7 }} className="h-full bg-[#ff007f] shadow-[0_0_4px_#ff007f]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>CH_B // FULLSTACK_ENG</span>
                  <span className="text-[#00f3ff]">90%</span>
                </div>
                <div className="h-1 bg-[#10141c] rounded-none overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.9 }} className="h-full bg-[#00f3ff] shadow-[0_0_4px_#00f3ff]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center lg:justify-start max-w-sm pt-2"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            <button className="cyber-btn w-full sm:w-auto" onClick={handleScrollToProjects}>
              VIEW PROJECTS
            </button>
            <button
              className="cyber-btn-secondary w-full sm:w-auto text-center"
              onClick={handleDownloadResume}
              disabled={downloading}
            >
              {downloading ? "DOWNLOADING..." : "DOWNLOAD RESUME"}
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex space-x-3.5 pt-3 justify-center lg:justify-start"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } } }}
          >
            {[
              { href: github, title: "GitHub Profile", svg: <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />, fill: true },
              { href: linkedin, title: "LinkedIn Profile", svg: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />, fill: true },
              { href: instagram, title: "Instagram Profile", svg: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>, fill: false },
              { href: twitter, title: "Twitter/X Profile", svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />, fill: true },
            ].map(({ href, title, svg, fill }) => (
              <motion.a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="p-2.5 bg-[#10141c]/80 border border-[#1b253b] hover:border-[#00f3ff] hover:text-[#00f3ff] text-[#808a9d] transition-all duration-300 shadow-lg"
                title={title}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill={fill ? "currentColor" : "none"}
                  stroke={fill ? "none" : "currentColor"}
                  strokeWidth={fill ? undefined : "2"}
                  strokeLinecap={fill ? undefined : "round"}
                  strokeLinejoin={fill ? undefined : "round"}
                >
                  {svg}
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Interactive Telemetry Deck */}
        <motion.div
          className="lg:col-span-5 flex flex-col space-y-6 items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Interactive 3D Tilt Dials Card */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              ...tiltStyle,
              transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s'
            }}
            className="w-full max-w-sm cyber-card-glow border border-[#1b253b] hover:border-[#00f3ff]/60 p-6 relative overflow-hidden scanner-container shadow-2xl group cursor-pointer"
          >
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
              <span className="font-hud text-[9px] text-[#00f3ff] tracking-widest uppercase">ACTIVE_ENGINE_DIALS</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#ff007f] rounded-full animate-ping" />
                <span className="font-code text-[8.5px] text-[#ff007f] font-bold">SYS_TELEMETRY</span>
              </div>
            </div>

            <div className="h-16 w-full mb-5 bg-black/70 border border-slate-900 overflow-hidden relative shadow-inner">
              <TelemetryWaveCanvas />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <SVGDial percent={95} label="AI & ML" strokeColor="#ff007f" glowColor="rgba(255, 0, 127, 0.4)" />
              <SVGDial percent={90} label="Full Stack" strokeColor="#39ff14" glowColor="rgba(57, 255, 20, 0.4)" />
              <SVGDial percent={100} valueText="8.2ms" label="Model Inf" strokeColor="#00f3ff" glowColor="rgba(0, 243, 255, 0.4)" />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center font-code text-[9px] text-[#808a9d]">
              <span>CORE_ALLOC: <span className="text-white font-bold">CUDA/GPU</span></span>
              <span>COMPILER: <span className="text-[#39ff14] font-bold">OPTIMIZED</span></span>
            </div>
          </div>

          {/* Interactive Console Card */}
          <div
            className="w-full max-w-sm cyber-card-glow p-4 flex flex-col h-56 border border-[#1b253b] shadow-2xl"
          >
            <div className="border-b border-slate-800 pb-1 mb-2 flex items-center justify-between">
              <span className="font-hud text-[8px] text-[#ff007f] tracking-widest">ENGINE_TELEMETRY_LOGS</span>
              <span className="w-1.5 h-1.5 bg-[#ff007f] rounded-full animate-blink" />
            </div>

            <div ref={consoleContainerRef} className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin select-none font-code text-[10px] text-[#39ff14] leading-snug">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="break-words opacity-90"
                >
                  <span className="text-[#808a9d] mr-1">&gt;&gt;</span> {log}
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleCommandSubmit} className="mt-2 pt-1.5 border-t border-slate-800 flex items-center text-[10px] font-code text-[#39ff14]">
              <span className="text-[#808a9d] mr-1">guest@amn-hud:~$</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[#39ff14] p-0 font-code text-[10px] focus:ring-0 focus:outline-none"
                placeholder="Type 'help'..."
                autoComplete="off"
              />
              <span className="w-1.5 h-3 bg-[#39ff14] animate-cursor ml-0.5" />
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}