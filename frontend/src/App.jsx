import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AchievementToast from './components/ui/AchievementToast';
import WelcomeSplash from './components/WelcomeSplash';
import NeuralGrid from './components/ui/NeuralGrid';
import DiagnosticsDeck from './components/ui/DiagnosticsDeck';
import useFetch from './hooks/useFetch';
import MatrixOverlay from './components/ui/MatrixOverlay';
import SystemControlCenter from './components/ui/SystemControlCenter';
import { playBootSound, startAmbientHum } from './utils/sound';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [neuralGridEnabled, setNeuralGridEnabled] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [isBooted, setIsBooted] = useState(false);
  const [matrixRain, setMatrixRain] = useState(false);
  const [crtEffects, setCrtEffects] = useState(false);

  useEffect(() => {
    const handleToggle = () => setMatrixRain(prev => !prev);
    window.addEventListener('toggle-matrix', handleToggle);
    return () => window.removeEventListener('toggle-matrix', handleToggle);
  }, []);

  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const handleGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 250);
    };
    window.addEventListener('system-glitch', handleGlitch);
    return () => window.removeEventListener('system-glitch', handleGlitch);
  }, []);

  // Fetch sections data
  const about = useFetch('/api/about/');
  const skills = useFetch('/api/skills/');
  const projects = useFetch('/api/projects/');
  const experience = useFetch('/api/experience/');
  const certifications = useFetch('/api/certifications/');

  const addAchievement = (type, title, description) => {
    // Avoid double triggers
    setAchievements(prev => {
      if (prev.some(a => a.type === type && a.title === title)) return prev;
      return [...prev, {
        id: Date.now() + Math.random().toString(),
        type,
        title,
        description
      }];
    });
  };

  const removeAchievement = (id) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };

  // Intersection Observer for scroll highlight & achievement triggers
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleOfflineMode = () => {
    about.loadDemoData();
    skills.loadDemoData();
    projects.loadDemoData();
    experience.loadDemoData();
    certifications.loadDemoData();
  };

  const isAnyError = about.error || skills.error || projects.error || experience.error || certifications.error;
  const isAnyDemo = about.isDemoMode || skills.isDemoMode || projects.isDemoMode || experience.isDemoMode || certifications.isDemoMode;

  useEffect(() => {
    if (isAnyError && !isAnyDemo) {
      handleOfflineMode();
    }
  }, [isAnyError, isAnyDemo]);

  return (
    <div className={`relative min-h-screen bg-[#070708] text-[#f0f0f5] font-sans transition-all ${crtEffects ? 'crt-flicker crt-chromatic' : ''} ${isGlitching ? 'glitch-shake' : ''}`}>
      {!isBooted && (
        <WelcomeSplash 
          onEnter={() => { 
            setIsBooted(true); 
            playBootSound(); 
            startAmbientHum(); 
          }} 
        />
      )}

      {/* Neural grid background */}
      <NeuralGrid enabled={isBooted && neuralGridEnabled} />

      {/* Full screen falling hex matrix rain overlay */}
      {isBooted && matrixRain && <MatrixOverlay />}

      {/* System Diagnostics HUD Deck */}
      {isBooted && <DiagnosticsDeck addAchievement={addAchievement} />}

      {/* Achievements toast */}
      <AchievementToast achievements={achievements} removeAchievement={removeAchievement} />

      {/* Floating System Control Center Cockpit */}
      {isBooted && (
        <SystemControlCenter 
          neuralGridEnabled={neuralGridEnabled}
          setNeuralGridEnabled={setNeuralGridEnabled}
          matrixRain={matrixRain}
          setMatrixRain={setMatrixRain}
          crtEffects={crtEffects}
          setCrtEffects={setCrtEffects}
        />
      )}

      <Navbar 
        activeSection={activeSection} 
        logoName={about.data?.name} 
        neuralGridEnabled={neuralGridEnabled}
        setNeuralGridEnabled={setNeuralGridEnabled}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isBooted ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero aboutData={about.data} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <About 
          aboutData={about.data} 
          loading={about.loading} 
          error={about.error} 
          loadDemoData={handleOfflineMode} 
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Skills 
          skillsData={skills.data} 
          loading={skills.loading} 
          error={skills.error} 
          loadDemoData={handleOfflineMode} 
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Projects 
          projectsData={projects.data} 
          loading={projects.loading} 
          error={projects.error} 
          loadDemoData={handleOfflineMode} 
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Experience 
          experienceData={experience.data} 
          loading={experience.loading} 
          error={experience.error} 
          loadDemoData={handleOfflineMode} 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Certifications 
          certificationsData={certifications.data} 
          loading={certifications.loading} 
          error={certifications.error} 
          loadDemoData={handleOfflineMode} 
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Contact aboutData={about.data} />
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default App;

