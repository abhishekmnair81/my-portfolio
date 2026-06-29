import React, { useState } from 'react';
import ContactForm from './ContactForm';
import Toast from './ui/Toast';
import DecryptedText from './ui/DecryptedText';

export default function Contact({ aboutData }) {
  const [toast, setToast] = useState(null);

  // Exact fallbacks provided by user
  const email = aboutData?.email || "abhishekmnair81@gmail.com";
  const github = aboutData?.github || "https://github.com/abhishekmnair81";
  const linkedin = aboutData?.linkedin || "https://linkedin.com/in/abhishekmnair81";
  const location = aboutData?.location || "Bengaluru, Karnataka, India";

  const handleFormSubmit = ({ message, type }) => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <section id="contact" className="px-4 py-20 bg-[#08090c]">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block border-b border-[#00f3ff] pb-1">
            <h2 className="font-hud text-lg text-white tracking-widest font-bold">
              <DecryptedText text="[ 07 // TRANSMISSION SIGNAL ]" />
            </h2>
          </div>
          <p className="font-sans text-xs text-[#808a9d] mt-2">Open connection pipeline to log messages to console</p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Info Card */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#0d1118]/70 border border-[#1b253b] p-6 shadow-2xl space-y-6 relative">
              {/* Corner decor */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f3ff]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff007f]" />

              <h3 className="font-hud text-xs text-[#00f3ff] tracking-wider font-bold">
                SYSTEM ADDRESSES
              </h3>

              {/* Status Banner Request */}
              <div className="flex items-center space-x-2 bg-black/60 border border-slate-900 p-3">
                <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-blink flex-shrink-0" />
                <span className="font-code text-[9px] text-[#39ff14] tracking-widest uppercase font-bold">
                  ● OPEN TO OPPORTUNITIES
                </span>
              </div>

              {/* Fields */}
              <div className="space-y-4 font-sans text-sm text-[#808a9d]">
                
                {/* Email */}
                <div className="border-b border-slate-800 pb-3">
                  <span className="font-hud text-[8px] text-slate-400 block mb-1">EMAIL</span>
                  <a 
                    href={`mailto:${email}`} 
                    className="text-white hover:text-[#00f3ff] transition-colors font-code text-xs break-all"
                  >
                    {email}
                  </a>
                </div>

                {/* LinkedIn */}
                <div className="border-b border-slate-800 pb-3">
                  <span className="font-hud text-[8px] text-slate-400 block mb-1">LINKEDIN</span>
                  <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-[#00f3ff] transition-colors font-code text-xs break-all"
                  >
                    {linkedin.replace('https://', '')}
                  </a>
                </div>

                {/* GitHub */}
                <div className="border-b border-slate-800 pb-3">
                  <span className="font-hud text-[8px] text-slate-400 block mb-1">GITHUB</span>
                  <a 
                    href={github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-[#00f3ff] transition-colors font-code text-xs break-all"
                  >
                    {github.replace('https://', '')}
                  </a>
                </div>

                {/* Location */}
                <div>
                  <span className="font-hud text-[8px] text-slate-400 block mb-1">COORDINATES</span>
                  <span className="text-[#ffaa00] font-code text-xs">
                    {location}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-7">
            <ContactForm onFormSubmit={handleFormSubmit} />
          </div>

        </div>

      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={handleCloseToast} 
        />
      )}

    </section>
  );
}
