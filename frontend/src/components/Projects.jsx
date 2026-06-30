import React, { useState } from 'react';
import LoadingSkeleton from './ui/LoadingSkeleton';
import { playClickSound } from '../utils/sound';
import DecryptedText from './ui/DecryptedText';

function ProjectSchematic({ techStack = [] }) {
  const tech = techStack.join(', ').toLowerCase();
  
  let type = 'ml'; // default
  let nodes = ['INPUT', 'MODEL', 'OUTPUT'];
  let color = '#ff007f';
  
  if (tech.includes('react') || tech.includes('django') || tech.includes('api') || tech.includes('html') || tech.includes('bootstrap')) {
    type = 'web';
    nodes = ['UI_CLIENT', 'API_GATEWAY', 'DB_DATA'];
    color = '#00f3ff';
  } else if (tech.includes('yolo') || tech.includes('opencv') || tech.includes('cv') || tech.includes('keras') || tech.includes('tensorflow') || tech.includes('vision')) {
    type = 'cv';
    nodes = ['FRAME_FEED', 'YOLO_INFERENCE', 'HUD_OVERLAY'];
    color = '#39ff14';
  } else {
    type = 'ml';
    nodes = ['RAW_DATA', 'SCIKIT_MODEL', 'PREDICTIONS'];
    color = '#ffaa00';
  }

  return (
    <div className="w-full bg-black/60 border border-slate-900 p-2.5 flex flex-col items-center mt-2 relative select-none">
      <span className="font-hud text-[8px] text-[#ffaa00] mb-2 uppercase self-start tracking-wider">
        [ SYSTEM SCHEMATIC: {type.toUpperCase()} ]
      </span>
      
      <svg className="w-full max-w-[280px] h-[75px]" viewBox="0 0 240 70">
        {/* Paths */}
        <path d="M 45,35 L 95,35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 145,35 L 195,35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        
        {/* Animated Glow Dots */}
        <circle r="2.5" fill={color}>
          <animateMotion dur="2s" repeatCount="indefinite" path="M 45,35 L 95,35" />
        </circle>
        <circle r="2.5" fill={color}>
          <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M 145,35 L 195,35" />
        </circle>

        {/* Node 1 */}
        <rect x="5" y="20" width="40" height="30" fill="#0d1118" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text x="25" y="32" textAnchor="middle" fill="#fff" className="font-code text-[6px] font-bold">
          {nodes[0]}
        </text>
        <text x="25" y="44" textAnchor="middle" fill="#808a9d" className="font-code text-[5px]">
          [0x5A_IN]
        </text>

        {/* Node 2 */}
        <rect x="95" y="20" width="50" height="30" fill="#0d1118" stroke={color} strokeWidth="1.2" style={{ filter: `drop-shadow(0 0 3px ${color}44)` }} />
        <text x="120" y="32" textAnchor="middle" fill="#fff" className="font-code text-[6px] font-bold">
          {nodes[1]}
        </text>
        <text x="120" y="44" textAnchor="middle" fill={color} className="font-code text-[5px] animate-pulse">
          [0xB3_PROC]
        </text>

        {/* Node 3 */}
        <rect x="195" y="20" width="40" height="30" fill="#0d1118" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text x="215" y="32" textAnchor="middle" fill="#fff" className="font-code text-[6px] font-bold">
          {nodes[2]}
        </text>
        <text x="215" y="44" textAnchor="middle" fill="#808a9d" className="font-code text-[5px]">
          [0xF7_OUT]
        </text>
      </svg>
      
      <div className="flex justify-between w-full font-code text-[7px] text-slate-500 mt-1 border-t border-slate-950 pt-1">
        <span>FLOW: BI-DIRECTIONAL</span>
        <span>TELEMETRY: ONLINE</span>
      </div>
    </div>
  );
}

export default function Projects({ projectsData, loading, error, loadDemoData }) {
  const [openSchematicId, setOpenSchematicId] = useState(null);

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
  
  // Sort projects: featured first, then by order
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    return (a.order || 0) - (b.order || 0);
  });

  return (
    <section id="projects" className="px-4 py-20 bg-[#070708] border-b border-[#1b253b]">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block border-b border-[#39ff14] pb-1">
            <h2 className="font-hud text-lg text-white tracking-widest font-bold">
              <DecryptedText text="[ 04 // PROJECT GARAGE ]" />
            </h2>
          </div>
          <p className="font-sans text-xs text-[#808a9d] mt-2">Access blueprint blueprints, active build files, and source trees</p>
        </div>

        {/* Project Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => {
            const techList = Array.isArray(project.tech_stack) 
              ? project.tech_stack 
              : (project.technologies ? project.technologies.split(',') : []);

            const githubUrl = project.github_url || project.github_link;
            const liveUrl = project.live_url || project.live_link;

            return (
              <div 
                key={project.id} 
                onMouseMove={handleMouseMove}
                className="cyber-card-glow border border-slate-900 p-5 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Tech Bracket corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f3ff] opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f3ff] opacity-40 group-hover:opacity-100 transition-opacity" />

                {/* Blueprint grid lines on card hover */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Sweeping laser scanline inside card on hover */}
                <div className="absolute left-0 w-full h-[1.5px] bg-[#00f3ff] opacity-0 group-hover:opacity-20 group-hover:animate-[card-scan_4s_linear_infinite] pointer-events-none z-10" />

                <div>
                   {/* Schematic Header */}
                  <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-2">
                    <span className="font-code text-[8px] text-[#ff007f]">BUILD_NO: #0{project.id || 'X'}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => { playClickSound(); setOpenSchematicId(openSchematicId === project.id ? null : project.id); }}
                        className={`font-code text-[8px] px-1.5 py-0.5 border cursor-pointer transition-all select-none ${
                          openSchematicId === project.id 
                            ? 'border-[#00f3ff] text-[#00f3ff] bg-[#00f3ff]/10 font-bold shadow-[0_0_6px_rgba(0,243,255,0.25)]' 
                            : 'border-slate-800 text-[#808a9d] hover:border-slate-500 hover:text-white'
                        }`}
                      >
                        {openSchematicId === project.id ? '[CLOSE SCHEMA]' : '[VIEW SCHEMA]'}
                      </button>
                      <span className="font-code text-[8px] text-[#39ff14] flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse" />
                        <span>STABLE</span>
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-hud text-sm text-white font-bold mb-2 group-hover:text-[#00f3ff] transition-colors uppercase">
                    {project.title}
                  </h3>

                  {/* Featured Tag / Badge */}
                  {project.is_featured && (
                    <div className="inline-block bg-[#00f3ff]/10 border border-[#00f3ff]/30 px-2 py-0.5 mb-3">
                      <span className="font-code text-[8px] text-[#00f3ff] tracking-widest uppercase">
                        ★ FEATURED BUILD | Currently Working On
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="font-sans text-xs text-[#808a9d] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techList.map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="font-code text-[9px] bg-black/60 border border-slate-800 text-slate-300 px-1.5 py-0.5 rounded-none"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Schematic Drawer */}
                  {openSchematicId === project.id && (
                    <div className="mb-5 animate-[fadeIn_0.2s_ease-out]">
                      <ProjectSchematic techStack={techList} />
                    </div>
                  )}
                </div>

                {/* Cyber Action Buttons */}
                <div className="flex space-x-3 pt-3 border-t border-slate-850">
                  {liveUrl && (
                    <a 
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      className="cyber-btn text-[9px] py-2 px-3 flex-1 text-center"
                    >
                      LAUNCH_DEMO
                    </a>
                  )}
                  {githubUrl && (
                    <a 
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      className="cyber-btn-secondary text-[9px] py-2 px-3 flex-1 text-center"
                    >
                      SOURCE_TREE
                    </a>
                  )}
                </div>

              </div>
            );
          })}

          {sortedProjects.length === 0 && (
            <div className="col-span-full text-center py-12 bg-[#0b0e14]/50 border border-dashed border-slate-800">
              <span className="font-hud text-xs text-[#808a9d]">[ SHOWROOM GARAGE EMPTY // SYSTEM OFFLINE ]</span>
            </div>
          )}
        </div>

      </div>

      {/* Embedded style keyframes for project card scanning */}
      <style>{`
        @keyframes card-scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </section>
  );
}
