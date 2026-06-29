import React from 'react';
import LoadingSkeleton from './ui/LoadingSkeleton';
import DecryptedText from './ui/DecryptedText';

// Cyber Briefcase SVG
const BriefcaseIcon = () => (
  <svg className="w-4 h-4 text-[#ffaa00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

// Cyber Graduation Cap SVG
const GraduationCapIcon = () => (
  <svg className="w-4 h-4 text-[#00f3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

export default function Experience({ experienceData, loading, error, loadDemoData }) {
  if (loading) {
    return (
      <section id="experience" className="px-4 py-20 bg-[#070708] border-b border-[#1b253b]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-hud text-base text-center text-[#00f3ff] animate-pulse">TIMELINE: LOGGING CHECKPOINTS...</h2>
          <LoadingSkeleton type="timeline" count={2} />
        </div>
      </section>
    );
  }

  if (error && !experienceData) {
    return (
      <section id="experience" className="px-4 py-20 bg-[#070708] border-b border-[#1b253b] text-center">
        <p className="text-red-500 font-hud text-xs mb-4">CRITICAL // CHECKPOINT_REGISTRY_ERROR</p>
        <button className="cyber-btn" onClick={loadDemoData}>RETRY CONFIG</button>
      </section>
    );
  }

  const items = experienceData || [];
  
  // Sort items by order
  const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="experience" className="px-4 py-20 bg-[#070708] border-b border-[#1b253b]">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block border-b border-[#ffaa00] pb-1">
            <h2 className="font-hud text-lg text-white tracking-widest font-bold">
              <DecryptedText text="[ 05 // SYSTEM ROADMAP ]" />
            </h2>
          </div>
          <p className="font-sans text-xs text-[#808a9d] mt-2">Active checkpoints, structural training, and workspace integrations</p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          
          {/* Vertical glowing center line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00f3ff] via-[#ff007f] to-[#ffaa00] -translate-x-[1px] shadow-[0_0_8px_rgba(0,243,255,0.4)]" />

          {/* Fiber-optic particle flow tracer */}
          <div className="absolute left-6 lg:left-1/2 w-[3px] h-24 bg-gradient-to-b from-[#00f3ff] via-[#39ff14] to-transparent -translate-x-[1.5px] shadow-[0_0_12px_#39ff14] animate-[timeline-flow_8s_linear_infinite]" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {sortedItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const isWork = item.type === 'work';
              const bullets = item.description ? item.description.split('\n').filter(Boolean) : [];
              const themeColor = isWork ? '#ffaa00' : '#00f3ff';
              const borderGlow = isWork ? 'hover:border-[#ffaa00] hover:shadow-[0_0_15px_rgba(255,170,0,0.15)]' : 'hover:border-[#00f3ff] hover:shadow-[0_0_15px_rgba(0,243,255,0.15)]';
              
              return (
                <div 
                  key={item.id} 
                  className={`relative flex flex-col lg:flex-row items-start group ${
                    isEven ? 'lg:justify-start' : 'lg:justify-end'
                  }`}
                >
                  
                  {/* Timeline node selector dot */}
                  <div 
                    className="absolute left-6 lg:left-1/2 -translate-x-[16px] lg:-translate-x-[16px] w-8 h-8 rounded-full bg-[#08090c] border-2 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      borderColor: themeColor, 
                      boxShadow: `0 0 8px ${themeColor}`,
                      '--theme-glow': themeColor 
                    }}
                  >
                    <div className="group-hover:animate-[spin_6s_linear_infinite]">
                      {isWork ? <BriefcaseIcon /> : <GraduationCapIcon />}
                    </div>
                  </div>

                  {/* Glassmorphic Checkpoint Card */}
                  <div 
                    className={`ml-16 lg:ml-0 w-[calc(100%-4rem)] lg:w-[45%] bg-[#0d1118]/70 border border-[#1b253b] p-5 shadow-2xl transition-all duration-300 ${borderGlow} ${
                      isEven ? 'lg:mr-auto' : 'lg:ml-auto'
                    } relative`}
                  >
                    {/* Glowing side accent line */}
                    <div 
                      className="absolute top-0 bottom-0 w-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ 
                        backgroundColor: themeColor,
                        left: isEven ? 'auto' : '0px',
                        right: isEven ? '0px' : 'auto',
                        boxShadow: `0 0 8px ${themeColor}`
                      }}
                    />
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-1.5 border-b border-slate-800 pb-2">
                      <div>
                        <h3 className="font-hud text-xs text-white font-bold tracking-wider">
                          {item.role_or_degree}
                        </h3>
                        <span className="font-code text-[11px] text-[#ffaa00] font-semibold mt-0.5 block">
                          {item.company_or_school}
                        </span>
                      </div>
                      
                      {/* Date Badge */}
                      <span className="font-code text-[9px] text-[#808a9d] bg-black/60 px-2 py-0.5 border border-slate-900 flex-shrink-0 self-start sm:self-auto">
                        {item.start_date} - {item.is_current ? 'PRESENT' : item.end_date || 'COMPLETED'}
                      </span>
                    </div>

                    {/* Bullet logs */}
                    <ul className="space-y-2 list-none pl-0">
                      {bullets.map((bullet, idx) => {
                        const cleanBullet = bullet.replace(/^[\s-*•▶]+/, '');
                        return (
                          <li key={idx} className="text-xs text-[#808a9d] flex items-start space-x-2 leading-relaxed">
                            <span className="text-[#39ff14] font-code font-bold select-none mt-0.5">=&gt;</span>
                            <span>{cleanBullet}</span>
                          </li>
                        );
                      })}
                    </ul>

                  </div>

                </div>
              );
            })}

            {sortedItems.length === 0 && (
              <div className="text-center py-10 bg-[#0b0e14]/50 border border-slate-800 max-w-sm mx-auto">
                <span className="font-hud text-xs text-[#808a9d]">[ TIMELINE REGISTER EMPTY ]</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Embedded timeline keyframes */}
      <style>{`
        @keyframes timeline-flow {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
