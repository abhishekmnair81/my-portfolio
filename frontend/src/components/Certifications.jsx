import React from 'react';
import { motion } from 'framer-motion';
import { playClickSound } from '../utils/sound';
import DecryptedText from './ui/DecryptedText';

export default function Certifications({ certificationsData, loading, error, loadDemoData }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const defaultCertifications = [
    {
      id: 1,
      title: "Complete Data Science, ML, Deep Learning & NLP Bootcamp",
      platform: "Udemy",
      status: "Ongoing",
      is_certified: false
    },
    {
      id: 2,
      title: "Fundamentals to Become a Machine Learning Engineer",
      platform: "LinkedIn Learning",
      status: "Ongoing",
      is_certified: false
    },
    {
      id: 3,
      title: "Programming Generative AI: From Variational Autoencoders to Stable Diffusion with PyTorch and Hugging Face",
      platform: "LinkedIn Learning",
      status: "Certified ✓",
      is_certified: true
    }
  ];

  const rawCerts = certificationsData || defaultCertifications;
  const certifications = rawCerts.map(cert => ({
    ...cert,
    color: cert.is_certified ? "border-[#39ff14] text-[#39ff14]" : "border-[#ffaa00] text-[#ffaa00]",
    status: cert.status || (cert.is_certified ? "Certified ✓" : "Ongoing")
  }));

  return (
    <section id="certifications" className="px-4 py-20 bg-[#08090c] border-b border-[#1b253b]">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block border-b border-[#ff007f] pb-1">
            <h2 className="font-hud text-lg text-white tracking-widest font-bold uppercase">
              <DecryptedText text="[ 06 // SYSTEM CREDENTIALS ]" />
            </h2>
          </div>
          <p className="font-sans text-xs text-[#808a9d] mt-2">Decrypted system certifications and active learning credentials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div 
              key={cert.id}
              onClick={playClickSound}
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="cyber-card-glow border border-[#1b253b] p-5 shadow-2xl relative hover:border-[#00f3ff] transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              {/* Holographic Watermark Badge */}
              <div className="absolute -right-3 -bottom-3 w-16 h-16 opacity-[0.03] group-hover:opacity-15 group-hover:scale-115 group-hover:rotate-12 transition-all duration-500 pointer-events-none text-[#00f3ff]">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="35" />
                  <path d="M50 5 L50 95 M5 50 L95 50" strokeDasharray="6 6" />
                  <rect x="36" y="36" width="28" height="28" transform="rotate(45 50 50)" />
                </svg>
              </div>

              {/* Corner decor */}
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff007f]" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00f3ff]" />

              {/* Status Indicator Bar */}
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2 relative z-10">
                <span className="font-hud text-[8px] text-slate-400 tracking-wider">MODULE_0{cert.id}</span>
                <span className={`font-code text-[9px] uppercase px-2 py-0.5 border ${cert.color} bg-black/60 font-bold`}>
                  {cert.status}
                </span>
              </div>

              {/* Title & Platform */}
              <div className="space-y-2 relative z-10">
                <h4 className="font-hud text-[11px] text-white leading-normal tracking-wide font-bold group-hover:text-[#00f3ff] transition-colors uppercase">
                  {cert.title}
                </h4>
                <p className="font-code text-[10px] text-[#ffaa00]">
                  PLATFORM: {cert.platform}
                </p>
              </div>

              {/* Decorative scanline indicator */}
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#1b253b] group-hover:bg-[#00f3ff] transition-colors" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
