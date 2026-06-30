import React from 'react';
import LoadingSkeleton from './ui/LoadingSkeleton';
import { playClickSound } from '../utils/sound';
import DecryptedText from './ui/DecryptedText';

export default function Skills({ skillsData, loading, error, loadDemoData }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  if (loading) {
    return (
      <section id="skills" className="px-4 py-20 bg-[#08090c] border-b border-[#1b253b]">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h2 className="font-hud text-base text-[#00f3ff] animate-pulse">INIT_INVENTORY: LOADING...</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <LoadingSkeleton type="skill" count={4} />
          </div>
        </div>
      </section>
    );
  }

  if (error && !skillsData) {
    return (
      <section id="skills" className="px-4 py-20 bg-[#08090c] border-b border-[#1b253b] text-center">
        <p className="text-red-500 font-hud text-xs mb-4">CRITICAL // INVENTORY_SYNC_ERROR</p>
        <button className="cyber-btn" onClick={loadDemoData}>RETRY SYNC</button>
      </section>
    );
  }

  // Categories mapped to colors/titles
  const categories = [
    {
      id: 'aiml',
      label: 'AI & COGNITIVE ENGINE',
      color: '#ff007f',
      glowColor: 'rgba(255, 0, 127, 0.25)',
      borderColor: 'border-[#ff007f]',
      textLight: 'text-[#ff007f]',
      fallbackSkills: [
        { name: 'Machine Learning', desc: 'Predictive regressions, classification systems', level: 90 },
        { name: 'Deep Learning', desc: 'Neural network architecture & optimization', level: 85 },
        { name: 'Computer Vision / YOLOv8', desc: 'Real-time object detection models', level: 92 },
        { name: 'NLP', desc: 'Sentiment analysis & chat assistant nodes', level: 80 }
      ]
    },
    {
      id: 'backend',
      label: 'BACKEND POWERBLOCK',
      color: '#39ff14',
      glowColor: 'rgba(57, 255, 20, 0.25)',
      borderColor: 'border-[#39ff14]',
      textLight: 'text-[#39ff14]',
      fallbackSkills: [
        { name: 'Python', desc: 'Core scripts, AI models & automation modules', level: 95 },
        { name: 'Django / REST Framework', desc: 'Highly secure scalable APIs and routes', level: 90 },
        { name: 'PostgreSQL & Databases', desc: 'Relational design & index optimization', level: 85 },
        { name: 'System Security', desc: 'CORS controls, tokens & session logic', level: 75 }
      ]
    },
    {
      id: 'frontend',
      label: 'TELEMETRY GUI',
      color: '#00f3ff',
      glowColor: 'rgba(0, 243, 255, 0.25)',
      borderColor: 'border-[#00f3ff]',
      textLight: 'text-[#00f3ff]',
      fallbackSkills: [
        { name: 'React', desc: 'Single-page component architectures', level: 88 },
        { name: 'JavaScript (ES6)', desc: 'Asynchronous fetches, interactive loops', level: 90 },
        { name: 'Tailwind CSS', desc: 'Modern responsive styling & flexgrids', level: 92 },
        { name: 'HTML5 & CSS3', desc: 'Semantic layouts & keyframe animations', level: 95 }
      ]
    },
    {
      id: 'devops',
      label: 'ASSEMBLY LINE & TOOLS',
      color: '#ffaa00',
      glowColor: 'rgba(255, 170, 0, 0.25)',
      borderColor: 'border-[#ffaa00]',
      textLight: 'text-[#ffaa00]',
      fallbackSkills: [
        { name: 'Git & GitHub', desc: 'Branching, PRs, actions & repositories', level: 90 },
        { name: 'Docker Containers', desc: 'Microservice builds & environment isolation', level: 70 },
        { name: 'VS Code & Linux', desc: 'Shell scripting & development pipeline', level: 85 },
        { name: 'Postman API Testing', desc: 'Testing responses & routes validation', level: 88 }
      ]
    }
  ];

  // Map API skills data to categories if present
  const renderCategories = categories.map(cat => {
    let list = cat.fallbackSkills;
    if (skillsData && skillsData.length > 0) {
      const matched = skillsData.filter(s => {
        const dbCat = s.category.toLowerCase();
        if (cat.id === 'aiml') return dbCat.includes('ai') || dbCat.includes('ml') || dbCat.includes('machine');
        if (cat.id === 'backend') return dbCat.includes('back');
        if (cat.id === 'frontend') return dbCat.includes('front');
        return dbCat.includes('tool') || dbCat.includes('devops') || dbCat.includes('weapon') || dbCat.includes('other');
      });
      if (matched.length > 0) {
        list = matched.map(m => ({ name: m.name, desc: m.description || 'Skill telemetry synchronized.', level: m.proficiency }));
      }
    }
    return { ...cat, skills: list };
  });

  return (
    <section id="skills" className="px-4 py-20 bg-[#08090c] border-b border-[#1b253b]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center">
          <div className="inline-block border-b border-[#ff007f] pb-1">
            <h2 className="font-hud text-lg text-white tracking-widest font-bold">
              <DecryptedText text="[ 03 // TECH DIALS & TUNING ]" />
            </h2>
          </div>
          <p className="font-sans text-xs text-[#808a9d] mt-2">Inspect technical core modifications and stock capabilities</p>
        </div>

        {/* 4-Quadrant Cyber Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderCategories.map((cat, idx) => (
            <div 
              key={idx} 
              onMouseMove={handleMouseMove}
              className={`cyber-card-glow border border-slate-900 p-5 relative overflow-hidden group/card transition-all duration-300 hover:border-slate-800`}
              style={{ boxShadow: `inset 0 0 10px ${cat.glowColor}` }}
            >
              {/* Dynamic category grid pattern on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/card:opacity-10 transition-opacity duration-500 pointer-events-none" 
                style={{
                  backgroundImage: `linear-gradient(to right, ${cat.color} 1px, transparent 1px), linear-gradient(to bottom, ${cat.color} 1px, transparent 1px)`,
                  backgroundSize: '1.25rem 1.25rem'
                }}
              />

              {/* Box Corner Decorations */}
              <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${cat.borderColor}`} />
              <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${cat.borderColor}`} />

              {/* Title */}
              <div className="flex justify-between items-center mb-5 border-b border-slate-800 pb-2 relative z-10">
                <span className="font-hud text-[10px] text-white tracking-widest font-bold">
                  {cat.label}
                </span>
                <span className={`font-code text-[8px] ${cat.textLight}`}>SEC_CORE_0{idx+1}</span>
              </div>

              {/* Skill chips */}
              <div className="space-y-4 relative z-10">
                {cat.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="group relative cursor-pointer"
                    onClick={playClickSound}
                  >
                    {/* Label & Level */}
                    <div className="flex justify-between items-center text-[11.5px] font-hud tracking-wide mb-0.5 text-slate-300 group-hover:text-white">
                      <span>{skill.name}</span>
                      <span className="font-code text-[#ffaa00]">{skill.level}%</span>
                    </div>

                    {/* Inline Description (mobile-friendly, details-rich) */}
                    <p className="text-[10px] text-[#808a9d] font-sans mb-1.5 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {skill.desc}
                    </p>

                    {/* Progress Slider Track with sweep animation */}
                    <div className="w-full h-1.5 bg-black border border-slate-850 p-[1px] relative overflow-hidden">
                      <div 
                        className="h-full transition-all duration-500 relative"
                        style={{ 
                          width: `${skill.level}%`, 
                          backgroundColor: cat.color,
                          boxShadow: `0 0 6px ${cat.color}`
                        }}
                      >
                        {/* Sweeping scanline indicator */}
                        <div 
                          className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[skill-scan_2s_infinite]"
                          style={{ animationDelay: `${sIdx * 0.25}s` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* GOLD HOTBAR QUICK SLOTS PANEL */}
        <div className="max-w-3xl mx-auto bg-[#0d1118]/70 border border-[#ffaa00]/40 p-4 relative shadow-[0_0_15px_rgba(255,170,0,0.08)] mt-6">
          {/* Corner highlights */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#ffaa00]" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#ffaa00]" />
          
          <div className="font-hud text-[9px] text-[#ffaa00] mb-3.5 tracking-widest text-center uppercase font-bold">
            ⚡ = CORE QUICK-ACCESS HOTBAR =
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 justify-center">
            {['React.js', 'Django', 'Python', 'Django REST Framework', 'PostgreSQL'].map((hotSkill, hIdx) => (
              <div 
                key={hIdx}
                className="bg-black/50 border border-[#ffaa00]/30 hover:border-[#ffaa00] p-2.5 text-center flex flex-col justify-center items-center relative group hover:bg-[#ffaa00]/10 transition-all duration-300 cursor-pointer shadow-[0_0_8px_rgba(255,170,0,0.1)] hover:shadow-[0_0_15px_rgba(255,170,0,0.2)]"
                onClick={playClickSound}
              >
                <span className="font-hud text-[10px] text-white font-bold tracking-wide group-hover:text-[#ffaa00] transition-colors relative z-10">
                  {hotSkill}
                </span>
                <span className="absolute bottom-1 right-1.5 font-code text-[8px] text-[#ffaa00] opacity-50 group-hover:opacity-100 transition-opacity">
                  {hIdx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded keyframe styles for progress sweeping */}
      <style>{`
        @keyframes skill-scan {
          0% { left: -30%; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
}
