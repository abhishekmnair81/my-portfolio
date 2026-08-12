import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LoadingSkeleton from './ui/LoadingSkeleton';
import { playClickSound } from '../utils/sound';
import DecryptedText from './ui/DecryptedText';

function ProjectSchematic({ techStack = [] }) {
  const tech = techStack.join(', ').toLowerCase();
  
  let type = 'ml';
  let nodes = ['INPUT', 'MODEL', 'OUTPUT'];
  let color = '#ff007f';
  
  if (tech.includes('react') || tech.includes('django') || tech.includes('api') || tech.includes('html') || tech.includes('bootstrap')) {
    type = 'web';
    nodes = ['UI_CLIENT', 'API_GATEWAY', 'DB_DATA'];
    color = '#00f3ff';
  } else if (tech.includes('yolo') || tech.includes('opencv') || tech.includes('cv') || tech.includes('pytorch') || tech.includes('vision')) {
    type = 'cv';
    nodes = ['FRAME_FEED', 'YOLO_INFERENCE', 'HUD_OVERLAY'];
    color = '#39ff14';
  } else {
    type = 'ml';
    nodes = ['RAW_DATA', 'SCIKIT_MODEL', 'PREDICTIONS'];
    color = '#ffaa00';
  }

  return (
    <div className="w-full bg-black/80 border border-slate-800 p-2 flex flex-col items-center mt-2 relative select-none">
      <span className="font-hud text-[7.5px] text-[#ffaa00] mb-1.5 uppercase self-start tracking-wider">
        [ SCHEMATIC: {type.toUpperCase()} ]
      </span>
      
      <svg className="w-full max-w-[240px] h-[60px]" viewBox="0 0 240 70">
        <path d="M 45,35 L 95,35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 145,35 L 195,35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        
        <circle r="2.5" fill={color}>
          <animateMotion dur="2s" repeatCount="indefinite" path="M 45,35 L 95,35" />
        </circle>
        <circle r="2.5" fill={color}>
          <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M 145,35 L 195,35" />
        </circle>

        <rect x="5" y="20" width="40" height="30" fill="#0d1118" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text x="25" y="32" textAnchor="middle" fill="#fff" className="font-code text-[6px] font-bold">
          {nodes[0]}
        </text>

        <rect x="95" y="20" width="50" height="30" fill="#0d1118" stroke={color} strokeWidth="1.2" style={{ filter: `drop-shadow(0 0 3px ${color}44)` }} />
        <text x="120" y="32" textAnchor="middle" fill="#fff" className="font-code text-[6px] font-bold">
          {nodes[1]}
        </text>

        <rect x="195" y="20" width="40" height="30" fill="#0d1118" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text x="215" y="32" textAnchor="middle" fill="#fff" className="font-code text-[6px] font-bold">
          {nodes[2]}
        </text>
      </svg>
    </div>
  );
}

// Curved Arc 3D Deck Stage - Cards slide 1-by-1 along a curved parabolic arch upon 2-finger touchpad scroll or touch swipes
function CurvedArc3DStage({ projects, onSelectSchematic, openSchematicId }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollCooldownRef = useRef(false);
  const count = projects.length;

  // Intercept 2-finger touchpad scroll & wheel events to step card-by-card along the curved arc
  const handleWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 15 || scrollCooldownRef.current) return;

    scrollCooldownRef.current = true;

    if (delta > 0) {
      // Step right along the curved arc
      setActiveIndex(prev => (prev + 1) % count);
      playClickSound();
    } else {
      // Step left along the curved arc
      setActiveIndex(prev => (prev - 1 + count) % count);
      playClickSound();
    }

    setTimeout(() => {
      scrollCooldownRef.current = false;
    }, 320);
  };

  // Touch drag handlers for mobile / touchscreens
  const touchStartXRef = useRef(0);
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        setActiveIndex(prev => (prev + 1) % count);
        playClickSound();
      } else {
        setActiveIndex(prev => (prev - 1 + count) % count);
        playClickSound();
      }
    }
  };

  if (count === 0) return null;

  return (
    <div 
      className="relative w-full py-8 flex flex-col items-center justify-center overflow-hidden select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sleek Touchpad Guidance HUD */}
      <div className="flex items-center justify-center space-x-3 bg-[#0b0e14]/90 border border-[#00f3ff]/40 px-4 py-2 mb-6 z-20 font-hud text-[9.5px] text-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.15)]">
        <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-ping" />
        <span className="tracking-widest uppercase font-bold">
          ✌ SCROLL 2 FINGERS ON TOUCHPAD / WHEEL TO SLIDE 1-BY-1 ALONG 3D CURVED ARC
        </span>
        <span className="text-[#ff007f] font-code text-[9px] font-bold">
          [BUILD #0{activeIndex + 1} / {count}]
        </span>
      </div>

      {/* 3D Curved Arc Viewport */}
      <div className="relative w-full h-[480px] max-w-6xl flex items-center justify-center perspective-[1500px]">
        
        {/* Holographic Arc Background Floor Guides */}
        <div className="absolute w-[800px] h-[300px] rounded-full border border-[#00f3ff]/15 pointer-events-none transform rotateX-[75deg] translate-y-24" />

        {projects.map((project, idx) => {
          // Calculate offset relative to active card
          let offset = idx - activeIndex;

          // Wrap around logic for seamless round circular loop
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const absOffset = Math.abs(offset);

          // Render visible range
          if (absOffset > 3) return null;

          const isCenter = offset === 0;

          // Math for Curved Parabolic Arc Deck:
          // Cards slide along a curved horizontal bow (translateX), curving backward into 3D depth (translateZ & rotateY)
          const translateX = offset * 255;
          const rotateY = offset * -18; // Curves inward towards viewer at center
          const translateZ = -Math.pow(absOffset, 1.35) * 85 + (isCenter ? 35 : 0);
          const rotateZ = offset * -1.5; // Subtle fan angle
          const scale = isCenter ? 1 : Math.max(0.72, 1 - absOffset * 0.12);
          const opacity = isCenter ? 1 : Math.max(0.25, 0.7 - absOffset * 0.2);

          const techList = Array.isArray(project.tech_stack) 
            ? project.tech_stack 
            : (project.technologies ? project.technologies.split(',') : []);

          const githubUrl = project.github_url || project.github_link;
          const liveUrl = project.live_url || project.live_link;

          return (
            <motion.div
              key={project.id}
              onClick={() => {
                if (!isCenter) {
                  playClickSound();
                  setActiveIndex(idx);
                }
              }}
              initial={false}
              animate={{
                x: translateX,
                rotateY: rotateY,
                rotateZ: rotateZ,
                z: translateZ,
                scale: scale,
                opacity: opacity
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 25
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`absolute w-[280px] sm:w-[310px] cursor-pointer transition-shadow duration-300 ${
                isCenter ? 'z-30' : 'z-10'
              }`}
            >
              <div 
                className={`cyber-card-glow border p-5 rounded-none relative bg-[#0b0e14]/95 backdrop-blur-md transition-all duration-300 ${
                  isCenter 
                    ? 'border-[#00f3ff] shadow-[0_0_30px_rgba(0,243,255,0.45)]' 
                    : 'border-slate-800/80 hover:border-slate-600'
                }`}
              >
                {/* Accent Corner Brackets on Center Card */}
                {isCenter && (
                  <>
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f3ff]" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f3ff]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f3ff]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f3ff]" />
                  </>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-2.5 border-b border-slate-800 pb-2">
                  <span className="font-code text-[8px] text-[#ff007f]">BUILD #0{project.id || idx + 1}</span>
                  {project.is_featured && (
                    <span className="font-code text-[8px] text-[#39ff14] bg-[#39ff14]/10 border border-[#39ff14]/30 px-1.5 py-0.5">
                      FEATURED BUILD
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-hud text-xs sm:text-sm text-white font-bold mb-2 uppercase text-left group-hover:text-[#00f3ff]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-[#808a9d] leading-relaxed mb-4 line-clamp-3 text-left">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {techList.map((tech, tIdx) => (
                    <span key={tIdx} className="font-code text-[8.5px] bg-black/70 border border-slate-800 text-slate-300 px-1.5 py-0.5">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* Schematic view */}
                {openSchematicId === project.id && (
                  <div className="mb-4 text-left">
                    <ProjectSchematic techStack={techList} />
                  </div>
                )}

                {/* Card Buttons */}
                <div className="flex space-x-2 pt-3 border-t border-slate-850">
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelectSchematic(project.id); }}
                    className="cyber-btn-secondary text-[8.5px] py-1.5 px-2 flex-1"
                  >
                    {openSchematicId === project.id ? 'CLOSE SCHEMA' : 'SCHEMA'}
                  </button>
                  {liveUrl && (
                    <a 
                      href={liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()} 
                      className="cyber-btn text-[8.5px] py-1.5 px-2 flex-1 text-center"
                    >
                      LIVE DEMO
                    </a>
                  )}
                  {githubUrl && (
                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()} 
                      className="cyber-btn-secondary text-[8.5px] py-1.5 px-2 flex-1 text-center"
                    >
                      GITHUB
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

  );
}

export default function Projects({ projectsData, loading, error, loadDemoData }) {
  const [openSchematicId, setOpenSchematicId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('3D');

  const filters = [
    { id: 'ALL', label: 'ALL_BUILDS' },
    { id: 'AI', label: 'AI_ML_COGNITIVE' },
    { id: 'FULLSTACK', label: 'FULL_STACK_TELEMETRY' },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  if (loading) {
    return (
      <section id="projects" className="px-4 py-20 bg-[#070708] border-b border-[#1b253b]">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="font-hud text-base text-center text-[#00f3ff] animate-pulse">GARAGE: RETRIEVING SHELTER FILES...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingSkeleton type="card" count={3} />
          </div>
        </div>
      </section>
    );
  }

  if (error && !projectsData) {
    return (
      <section id="projects" className="px-4 py-20 bg-[#070708] border-b border-[#1b253b] text-center">
        <p className="text-red-500 font-hud text-xs mb-4">CRITICAL // PROJECT_GARAGE_SYNC_LOSS</p>
        <button className="cyber-btn" onClick={loadDemoData}>RETRY LOG CONNECTIONS</button>
      </section>
    );
  }

  const projects = projectsData || [];
  
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    return (a.order || 0) - (b.order || 0);
  });

  const filteredProjects = sortedProjects.filter(project => {
    if (activeFilter === 'ALL') return true;
    
    const tech = Array.isArray(project.tech_stack) 
      ? project.tech_stack.join(', ').toLowerCase() 
      : (project.technologies ? project.technologies.toLowerCase() : '');
      
    if (activeFilter === 'AI') {
      return tech.includes('ml') || tech.includes('ai') || tech.includes('yolo') || tech.includes('vision') || tech.includes('nlp') || tech.includes('learning') || tech.includes('pytorch');
    }
    if (activeFilter === 'FULLSTACK') {
      return tech.includes('react') || tech.includes('django') || tech.includes('api') || tech.includes('rest') || tech.includes('sql') || tech.includes('postgres') || tech.includes('js') || tech.includes('javascript') || tech.includes('tailwind') || tech.includes('css') || tech.includes('html');
    }
    return true;
  });

  return (
    <section id="projects" className="px-4 py-20 bg-[#070708] border-b border-[#1b253b]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block border-b border-[#39ff14] pb-1">
            <h2 className="font-hud text-lg text-white tracking-widest font-bold">
              <DecryptedText text="[ 04 // PROJECT GARAGE ]" />
            </h2>
          </div>
          <p className="font-sans text-xs text-[#808a9d] mt-2">Interactive 1-by-1 3D curved arc stage and technical build catalog</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-slate-900 pb-4">
          {filters.map(f => {
            const count = sortedProjects.filter(p => {
              if (f.id === 'ALL') return true;
              const tech = Array.isArray(p.tech_stack) 
                ? p.tech_stack.join(', ').toLowerCase() 
                : (p.technologies ? p.technologies.toLowerCase() : '');
              if (f.id === 'AI') {
                return tech.includes('ml') || tech.includes('ai') || tech.includes('yolo') || tech.includes('vision') || tech.includes('nlp') || tech.includes('learning') || tech.includes('pytorch');
              }
              if (f.id === 'FULLSTACK') {
                return tech.includes('react') || tech.includes('django') || tech.includes('api') || tech.includes('rest') || tech.includes('sql') || tech.includes('postgres') || tech.includes('js') || tech.includes('javascript') || tech.includes('tailwind') || tech.includes('css') || tech.includes('html');
              }
              return true;
            }).length;

            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => { playClickSound(); setActiveFilter(f.id); }}
                className={`font-hud text-[9px] tracking-widest px-3 py-1.5 border transition-all duration-200 cursor-pointer select-none flex items-center space-x-2 ${
                  isActive
                    ? 'border-[#39ff14] text-[#39ff14] bg-[#39ff14]/5 shadow-[0_0_8px_rgba(57,255,20,0.15)] font-bold'
                    : 'border-slate-900 bg-[#0d1118]/45 text-[#808a9d] hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-[8px] font-code px-1 py-0.5 rounded-none font-bold ${isActive ? 'bg-[#39ff14] text-black' : 'bg-slate-900 text-slate-500'}`}>
                  {count.toString().padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Curved Arc 3D Stage */}
        <CurvedArc3DStage 
          projects={filteredProjects} 
          openSchematicId={openSchematicId}
          onSelectSchematic={(id) => {
            playClickSound();
            setOpenSchematicId(openSchematicId === id ? null : id);
          }}
        />


      </div>
    </section>
  );
}
