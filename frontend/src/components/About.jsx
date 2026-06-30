import React, { useState, useEffect, useRef } from 'react';
import LoadingSkeleton from './ui/LoadingSkeleton';
import { playClickSound } from '../utils/sound';
import DecryptedText from './ui/DecryptedText';

// Import the 3 user images
import abhi1 from '../assets/Abhi1.png';
import abhi2 from '../assets/Abhi2.png';
import abhi3 from '../assets/Abhi3.png';

// Fallback Cyber SVG Avatar if image fails
const FallbackAvatar = () => (
  <svg className="w-full h-full bg-[#0b0e14] text-[#00f3ff]" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <path d="M30 40 L40 50 L30 60 M70 40 L60 50 L70 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="42" y="38" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
    <path d="M25 75 C 30 65, 70 65, 75 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function About({ aboutData, loading, error, loadDemoData }) {
  const [activeCam, setActiveCam] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [imageErrors, setImageErrors] = useState([false, false, false]);
  const [hoveredAttr, setHoveredAttr] = useState(0);

  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setMousePos({ x, y, active: true });
  };

  const feeds = [
    { name: 'Abhi1.png', src: abhi1, label: 'FEED_01' },
    { name: 'Abhi2.png', src: abhi2, label: 'FEED_02' },
    { name: 'Abhi3.png', src: abhi3, label: 'FEED_03' }
  ];

  const handleFeedSwitch = (idx) => {
    if (idx === activeCam) return;
    playClickSound();
    setIsGlitching(true);
    setActiveCam(idx);
    setTimeout(() => {
      setIsGlitching(false);
    }, 250);
  };

  const handleImageError = (idx) => {
    setImageErrors(prev => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });
  };

  if (loading) {
    return (
      <section id="about" className="px-4 py-20 bg-[#070708] border-y border-[#1b253b]">
        <div className="max-w-4xl mx-auto">
          <LoadingSkeleton type="text" />
        </div>
      </section>
    );
  }

  if (error && !aboutData) {
    return (
      <section id="about" className="px-4 py-20 bg-[#070708] border-y border-[#1b253b] flex flex-col items-center text-center">
        <p className="text-red-500 font-hud text-xs mb-4">CRITICAL // TELEMETRY DATA LOSS</p>
        <button className="cyber-btn" onClick={loadDemoData}>RETRY CONFIG SYSTEM</button>
      </section>
    );
  }

  const bioParagraphs = aboutData?.bio || [
    "I am an MCA graduate student specializing in Artificial Intelligence & Machine Learning and a Full-Stack developer based in Bengaluru, India.",
    "I design and engineer intelligent data pipelines, model classifications, and robust scalable web backends."
  ];

  const stats = aboutData?.stats || {
    years_experience: 2,
    projects_built: 10,
    technologies_known: 12
  };

  const attributes = [
    { name: 'INT (Intelligence)', level: '95%', desc: 'Machine Learning, Deep Learning, OpenCV Computer Vision, YOLOv8', color: '#00f3ff', trackClass: 'bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]' },
    { name: 'STR (Strength)', level: '90%', desc: 'Backend Engineering, Django REST Framework, database query optimization, PostgreSQL', color: '#ef4444', trackClass: 'bg-red-500 shadow-[0_0_8px_#ef4444]' },
    { name: 'AGI (Agility)', level: '85%', desc: 'Frontend Development speed, responsive user interfaces, React single-page architectures, CSS layouts', color: '#39ff14', trackClass: 'bg-[#39ff14] shadow-[0_0_8px_#39ff14]' },
    { name: 'DEF (Defense)', level: '75%', desc: 'Version control (Git), Docker containers, continuous integration, backend routing security', color: '#ffaa00', trackClass: 'bg-[#ffaa00] shadow-[0_0_8px_#ffaa00]' },
    { name: 'LUCK (Luck)', level: '70%', desc: 'Product UX/UI design thinking, sketch artistry, visually beautiful interfaces, attention to details', color: '#a855f7', trackClass: 'bg-purple-500 shadow-[0_0_8px_#a855f7]' }
  ];

  return (
    <section id="about" className="px-4 py-20 bg-[#070708] border-y border-[#1b253b]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Avatar & Character Specs */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Character Frame */}
            <div className="w-full max-w-sm bg-[#0d1118]/80 border border-[#1b253b] p-6 flex flex-col items-center shadow-2xl relative">
              
              {/* Corner decorative borders */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f3ff]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f3ff]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f3ff]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f3ff]" />

              {/* Feed Header */}
              <div className="w-full flex justify-between items-center mb-3 font-code text-[9px] text-[#ffaa00] border-b border-slate-900 pb-1">
                <span>REC_FEED_CHANNEL</span>
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                  <span>LIVE</span>
                </span>
              </div>

              {/* Avatar Scan Container */}
              <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePos(prev => ({ ...prev, active: false }))}
                className="w-48 h-56 border border-[#1b253b] p-1 bg-black relative scanner-container overflow-hidden cursor-crosshair group/feed"
              >
                
                {/* Glitch Overlay Effect */}
                {isGlitching && (
                  <div className="absolute inset-0 bg-slate-900/60 z-20 flex items-center justify-center font-code text-[10px] text-[#00f3ff] select-none">
                    <span>CONNECTING_FEED...</span>
                  </div>
                )}

                {/* Cyber Facial Grid Track HUD */}
                {mousePos.active && (
                  <div className="absolute inset-0 pointer-events-none z-30 font-code text-[8px]">
                    {/* Crosshair Guidelines */}
                    <div className="absolute left-0 w-full h-[0.5px] bg-[#39ff14]/30" style={{ top: `${mousePos.y}px` }} />
                    <div className="absolute top-0 h-full w-[0.5px] bg-[#39ff14]/30" style={{ left: `${mousePos.x}px` }} />
                    
                    {/* Ring Target Reticle */}
                    <div 
                      className="absolute w-8 h-8 border border-dashed rounded-full flex items-center justify-center animate-pulse"
                      style={{ 
                        left: `${mousePos.x}px`, 
                        top: `${mousePos.y}px`, 
                        transform: 'translate(-50%, -50%)',
                        borderColor: 'var(--color-cyan)',
                        boxShadow: '0 0 8px var(--color-cyan)'
                      }}
                    >
                      <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full" />
                    </div>
                    
                    {/* Float Coordinates badge */}
                    <span className="absolute bottom-2 left-2 bg-black/85 px-1.5 py-0.5 border border-slate-900 text-[#39ff14] font-bold">
                      COORDS: X_{mousePos.x} Y_{mousePos.y}
                    </span>
                    <span className="absolute top-2 right-2 bg-black/85 px-1.5 py-0.5 border border-slate-900 text-[#ffaa00] animate-pulse">
                      LOCK_ESTABLISHED
                    </span>
                  </div>
                )}

                {!imageErrors[activeCam] ? (
                  <img 
                    src={feeds[activeCam].src} 
                    alt={`Abhishek Feed 0${activeCam + 1}`} 
                    onError={() => handleImageError(activeCam)}
                    className={`w-full h-full object-cover filter contrast-[1.03] transition-all duration-150 ${
                      isGlitching ? 'brightness-150 saturate-200 blur-[2px]' : ''
                    }`}
                  />
                ) : (
                  <FallbackAvatar />
                )}
              </div>

              {/* Camera Feed Controller buttons */}
              <div className="grid grid-cols-3 gap-1.5 w-full mt-3">
                {feeds.map((feed, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleFeedSwitch(idx)}
                    className={`py-1 text-[9px] font-code border transition-all cursor-pointer text-center select-none ${
                      activeCam === idx
                        ? 'bg-[#00f3ff]/15 border-[#00f3ff] text-[#00f3ff] font-bold shadow-[0_0_8px_rgba(0,243,255,0.2)]'
                        : 'bg-black/50 border-slate-900 text-[#808a9d] hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    [{feed.label}]
                  </button>
                ))}
              </div>

              {/* Character Details */}
              <div className="w-full mt-5 space-y-4">
                
                <div className="text-center">
                  <h3 className="font-hud text-base text-white font-bold leading-tight">
                    {aboutData?.name || "ABHISHEK M NAIR"}
                  </h3>
                  <span className="font-code text-[9px] text-[#ffaa00] uppercase tracking-widest mt-1 block">
                    LVL 1 // COGNITIVE AGENT
                  </span>
                </div>

                {/* Grid Specs */}
                <div className="bg-black/60 border border-slate-900 p-3 space-y-1.5 font-code text-xs text-[#808a9d]">
                  <div className="flex justify-between">
                    <span>CLASS:</span>
                    <span className="text-[#39ff14] font-bold">{aboutData?.class_name || "Full Stack Developer"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SERVER:</span>
                    <span className="text-[#00f3ff]">{aboutData?.server || "Bengaluru, India"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className="text-white">{aboutData?.status || "Open to Opportunities"}</span>
                  </div>
                </div>

                {/* Telemetry Status bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-code text-[#ff007f]">
                    <span>COGNITIVE CORE SYSTEM LOAD</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#10141c] border border-slate-800 p-[1px]">
                    <div className="h-full bg-[#ff007f] shadow-[0_0_6px_#ff007f]" style={{ width: '100%' }} />
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: Bio & Core Attributes Matrix */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-block border-b border-[#00f3ff] pb-1 mb-2">
              <h2 className="font-hud text-lg text-[#00f3ff] tracking-wider font-bold">
                <DecryptedText text="[ 02 // COGNITIVE ENGINE ]" />
              </h2>
            </div>

            <div className="font-sans text-sm sm:text-base text-[#808a9d] leading-relaxed space-y-4">
              {bioParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* RPG Attributes SVG Radar Chart & Telemetry Panel */}
            <div className="bg-[#0b0e14]/60 border border-[#1b253b] p-5 shadow-xl relative">
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00f3ff]" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff007f]" />
              
              <div className="font-hud text-[10px] text-[#ffaa00] mb-4 tracking-widest uppercase flex justify-between items-center border-b border-slate-900 pb-2">
                <span>[ CAPABILITIES RADAR MATRIX ]</span>
                <span className="text-[8px] text-[#808a9d] lowercase font-code">hover or tap sectors to decode telemetry</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Left: SVG Radar Chart */}
                <div className="md:col-span-5 flex justify-center py-2 bg-black/45 border border-slate-900 p-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#00f3ff] opacity-40" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#ff007f] opacity-40" />
                  
                  <svg className="w-full max-w-[200px] aspect-square" viewBox="0 0 220 220">
                    {/* Concentric grid pentagons */}
                    <polygon points={(() => {
                      const R = 80; const centerX = 110; const centerY = 110;
                      return Array.from({ length: 5 }, (_, i) => {
                        const angle = -Math.PI / 2 + (2 * Math.PI / 5) * i;
                        const r = 0.25 * R;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                      }).join(' ');
                    })()} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />

                    <polygon points={(() => {
                      const R = 80; const centerX = 110; const centerY = 110;
                      return Array.from({ length: 5 }, (_, i) => {
                        const angle = -Math.PI / 2 + (2 * Math.PI / 5) * i;
                        const r = 0.5 * R;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                      }).join(' ');
                    })()} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.5" />

                    <polygon points={(() => {
                      const R = 80; const centerX = 110; const centerY = 110;
                      return Array.from({ length: 5 }, (_, i) => {
                        const angle = -Math.PI / 2 + (2 * Math.PI / 5) * i;
                        const r = 0.75 * R;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                      }).join(' ');
                    })()} fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.5" />

                    <polygon points={(() => {
                      const R = 80; const centerX = 110; const centerY = 110;
                      return Array.from({ length: 5 }, (_, i) => {
                        const angle = -Math.PI / 2 + (2 * Math.PI / 5) * i;
                        const r = R;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                      }).join(' ');
                    })()} fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="3,3" />

                    {/* Radial axis lines */}
                    {Array.from({ length: 5 }).map((_, i) => {
                      const R = 80; const centerX = 110; const centerY = 110;
                      const angle = -Math.PI / 2 + (2 * Math.PI / 5) * i;
                      return (
                        <line
                          key={i}
                          x1={centerX}
                          y1={centerY}
                          x2={centerX + R * Math.cos(angle)}
                          y2={centerY + R * Math.sin(angle)}
                          stroke="rgba(255, 255, 255, 0.12)"
                          strokeWidth="0.75"
                        />
                      );
                    })}

                    {/* Active values filled polygon */}
                    <polygon
                      points={attributes.map((attr, i) => {
                        const R = 80; const centerX = 110; const centerY = 110;
                        const angle = -Math.PI / 2 + (2 * Math.PI / 5) * i;
                        const val = parseInt(attr.level, 10);
                        const r = (val / 100) * R;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                      }).join(' ')}
                      fill="rgba(0, 243, 255, 0.15)"
                      stroke="var(--color-cyan)"
                      strokeWidth="1.5"
                      style={{ filter: 'drop-shadow(0 0 4px var(--color-cyan))', transition: 'all 0.4s ease' }}
                    />

                    {/* Vertex nodes */}
                    {attributes.map((attr, i) => {
                      const R = 80; const centerX = 110; const centerY = 110;
                      const angle = -Math.PI / 2 + (2 * Math.PI / 5) * i;
                      const val = parseInt(attr.level, 10);
                      const r = (val / 100) * R;
                      const x = centerX + r * Math.cos(angle);
                      const y = centerY + r * Math.sin(angle);
                      const isSelected = hoveredAttr === i;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={isSelected ? 5.5 : 3.5}
                          fill={isSelected ? '#ffffff' : attr.color}
                          stroke="var(--color-cyan)"
                          strokeWidth="1"
                          className="cursor-pointer transition-all duration-150"
                          onMouseEnter={() => { playClickSound(); setHoveredAttr(i); }}
                          onClick={() => { playClickSound(); setHoveredAttr(i); }}
                          style={{ filter: `drop-shadow(0 0 3px ${attr.color})` }}
                        />
                      );
                    })}

                    {/* Text labels outside */}
                    {attributes.map((attr, i) => {
                      const R = 80; const centerX = 110; const centerY = 110;
                      const angle = -Math.PI / 2 + (2 * Math.PI / 5) * i;
                      const labelR = R + 18;
                      const x = centerX + labelR * Math.cos(angle);
                      const y = centerY + labelR * Math.sin(angle);
                      const shortNames = ['INT', 'STR', 'AGI', 'DEF', 'LUCK'];
                      const isSelected = hoveredAttr === i;
                      return (
                        <text
                          key={i}
                          x={x}
                          y={y + 3}
                          textAnchor="middle"
                          className={`font-hud text-[8px] sm:text-[9px] font-bold tracking-widest cursor-pointer transition-colors ${
                            isSelected ? 'fill-[#00f3ff]' : 'fill-[#808a9d] hover:fill-white'
                          }`}
                          onMouseEnter={() => { playClickSound(); setHoveredAttr(i); }}
                          onClick={() => { playClickSound(); setHoveredAttr(i); }}
                        >
                          {shortNames[i]}
                        </text>
                      );
                    })}
                  </svg>


                </div>

                {/* Right: Telemetry Information Panel */}
                <div className="md:col-span-7 space-y-3 p-3.5 bg-black/30 border border-slate-900 min-h-[170px] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <span className="font-hud text-[11px] text-white tracking-widest font-extrabold uppercase">
                        {attributes[hoveredAttr].name}
                      </span>
                      <span className="font-code text-xs text-[#ff007f] font-bold">
                        RANK: {attributes[hoveredAttr].level}
                      </span>
                    </div>

                    <p className="font-sans text-[11.5px] leading-relaxed text-[#808a9d]">
                      {attributes[hoveredAttr].desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center font-code text-[8px] text-slate-500 pt-2 border-t border-slate-850">
                    <span>COGNITIVE MATRIX TELEMETRY SYNCED</span>
                    <span className="text-[#39ff14] animate-pulse">● READY</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#0b0e14]/40 border border-[#1b253b] p-3 text-center hover:border-[#39ff14] transition-colors">
                <span className="font-hud text-[8px] text-[#808a9d] block mb-1">EXP_TIMELINE</span>
                <span className="font-code text-lg sm:text-xl text-[#39ff14] font-bold">
                  6+ MNTS
                </span>
              </div>
              
              <div className="bg-[#0b0e14]/40 border border-[#1b253b] p-3 text-center hover:border-[#00f3ff] transition-colors">
                <span className="font-hud text-[8px] text-[#808a9d] block mb-1">PROJ_GARAGE</span>
                <span className="font-code text-lg sm:text-xl text-[#00f3ff] font-bold">
                  {aboutData?.stats?.projects_built !== undefined ? aboutData.stats.projects_built : "6"}+ BUILDS
                </span>
              </div>

              <div className="bg-[#0b0e14]/40 border border-[#1b253b] p-3 text-center hover:border-[#ff007f] transition-colors">
                <span className="font-hud text-[8px] text-[#808a9d] block mb-1">TECH_STOCK</span>
                <span className="font-code text-lg sm:text-xl text-[#ff007f] font-bold">
                  {aboutData?.stats?.technologies_known !== undefined ? aboutData.stats.technologies_known : "15"}+ CORES
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
