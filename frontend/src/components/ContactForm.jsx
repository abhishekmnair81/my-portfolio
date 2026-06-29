import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getApiUrl } from '../utils/api';
import { playClickSound } from '../utils/sound';

export default function ContactForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth || 300;
      canvas.height = 40;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const themeColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-cyan')
        .trim() || '#00f3ff';
      
      const inputLen = formData.name.length + formData.email.length + formData.message.length;
      
      const amp = inputLen > 0 ? Math.min(15, 3 + inputLen * 0.12) : 2.5;
      const freq = inputLen > 0 ? Math.min(0.15, 0.015 + inputLen * 0.001) : 0.015;
      const speed = inputLen > 0 ? Math.min(0.4, 0.04 + inputLen * 0.003) : 0.04;
      
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = themeColor;
      
      for (let x = 0; x < canvas.width; x++) {
        const noise = inputLen > 0 ? (Math.random() - 0.5) * (inputLen * 0.05) : 0;
        const y = canvas.height / 2 + Math.sin(x * freq + phase) * amp + noise;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      ctx.strokeStyle = themeColor + '12';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      phase += speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onFormSubmit({ message: '[ TRANSMISSION FAILED - RETRY ]', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await axios.post(getApiUrl('/api/contact/'), formData);
      onFormSubmit({ message: '[ MESSAGE DELIVERED ]', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact submission failed:', error);
      onFormSubmit({ message: '[ TRANSMISSION FAILED - RETRY ]', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 bg-[#0d1118]/70 border border-[#1b253b] p-6 shadow-2xl relative"
    >
      {/* Corner bracket decorations */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff007f]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f3ff]" />

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block font-hud text-[8px] text-slate-400 mb-2 tracking-widest uppercase">
          SENDER NAME
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-black/60 border border-[#1b253b] text-white px-3 py-2 rounded-none font-sans text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all font-medium"
          placeholder="e.g. Recruiter Name"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block font-hud text-[8px] text-slate-400 mb-2 tracking-widest uppercase">
          SENDER EMAIL
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-black/60 border border-[#1b253b] text-white px-3 py-2 rounded-none font-sans text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all font-medium"
          placeholder="e.g. recruit@company.com"
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block font-hud text-[8px] text-slate-400 mb-2 tracking-widest uppercase">
          SIGNAL DATA (MESSAGE)
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full bg-black/60 border border-[#1b253b] text-white px-3 py-2 rounded-none font-sans text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all font-medium resize-none"
          placeholder="Type message specs..."
        />
      </div>

      {/* Signal Modulator HUD Screen */}
      <div className="bg-[#05080d] border border-slate-900 p-2.5 flex flex-col space-y-1">
        <div className="flex justify-between font-hud text-[8px] text-slate-500 tracking-wider">
          <span>SIGNAL ENCODING CARRIER WAVE</span>
          <span className="text-[#00f3ff] font-code">
            MOD: {formData.name.length + formData.email.length + formData.message.length > 0 ? 'ACTIVE_MODULATION' : 'CARRIER_STANDBY'}
          </span>
        </div>
        <div className="h-10 w-full overflow-hidden relative">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="cyber-btn w-full text-center py-3 flex items-center justify-center font-bold tracking-widest mt-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? 'TRANSMITTING...' : 'TRANSMIT_SIGNAL // SEND'}
      </button>

    </form>
  );
}
