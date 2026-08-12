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
import useFetch from './hooks/useFetch';
import MatrixOverlay from './components/ui/MatrixOverlay';
import { playBootSound, startAmbientHum } from './utils/sound';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [neuralGridEnabled, setNeuralGridEnabled] = useState(() => {
    const saved = localStorage.getItem('neuralGridEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [achievements, setAchievements] = useState([]);
  const [isBooted, setIsBooted] = useState(false);
  const [matrixRain, setMatrixRain] = useState(() => {
    const saved = localStorage.getItem('matrixRain');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [crtEffects, setCrtEffects] = useState(() => {
    const saved = localStorage.getItem('crtEffects');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [soundMuted, setSoundMuted] = useState(() => {
    const saved = localStorage.getItem('soundMuted');
    return saved !== null ? saved === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('neuralGridEnabled', JSON.stringify(neuralGridEnabled));
  }, [neuralGridEnabled]);

  useEffect(() => {
    localStorage.setItem('matrixRain', JSON.stringify(matrixRain));
  }, [matrixRain]);

  useEffect(() => {
    localStorage.setItem('crtEffects', JSON.stringify(crtEffects));
  }, [crtEffects]);

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


      {/* Achievements toast */}
      <AchievementToast achievements={achievements} removeAchievement={removeAchievement} />

      <Navbar 
        activeSection={activeSection} 
        logoName={about.data?.name} 
        neuralGridEnabled={neuralGridEnabled}
        setNeuralGridEnabled={setNeuralGridEnabled}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
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

