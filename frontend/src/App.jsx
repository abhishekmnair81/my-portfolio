import React, { useState, useEffect } from 'react';
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

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [neuralGridEnabled, setNeuralGridEnabled] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [isBooted, setIsBooted] = useState(false);

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
    <div className="relative min-h-screen bg-[#070708] text-[#f0f0f5] font-sans">
      {!isBooted && <WelcomeSplash onEnter={() => setIsBooted(true)} />}
      
      {/* Neural grid background */}
      <NeuralGrid enabled={isBooted && neuralGridEnabled} />

      {/* System Diagnostics HUD Deck */}
      {isBooted && <DiagnosticsDeck addAchievement={addAchievement} />}

      {/* Achievements toast */}
      <AchievementToast achievements={achievements} removeAchievement={removeAchievement} />

      <Navbar 
        activeSection={activeSection} 
        logoName={about.data?.name} 
        neuralGridEnabled={neuralGridEnabled}
        setNeuralGridEnabled={setNeuralGridEnabled}
      />
      
      <Hero aboutData={about.data} />
      
      <About 
        aboutData={about.data} 
        loading={about.loading} 
        error={about.error} 
        loadDemoData={handleOfflineMode} 
      />
      
      <Skills 
        skillsData={skills.data} 
        loading={skills.loading} 
        error={skills.error} 
        loadDemoData={handleOfflineMode} 
      />
      
      <Projects 
        projectsData={projects.data} 
        loading={projects.loading} 
        error={projects.error} 
        loadDemoData={handleOfflineMode} 
      />
      
      <Experience 
        experienceData={experience.data} 
        loading={experience.loading} 
        error={experience.error} 
        loadDemoData={handleOfflineMode} 
      />

      <Certifications 
        certificationsData={certifications.data} 
        loading={certifications.loading} 
        error={certifications.error} 
        loadDemoData={handleOfflineMode} 
      />
      
      <Contact aboutData={about.data} />
      
      <Footer />
    </div>
  );
}

export default App;
