import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Prism from './components/background/Prism';
import DotGrid from './components/background/DotGrid';
import Dock from './components/ui/Dock';
import Hero from './components/layout/Hero';
import Introduction from './components/layout/Introduction';
import Projects from './components/layout/Projects';
import Achievements from './components/layout/Achievements';
import Contact from './components/layout/Contact';
import { Home, FolderGit2, Github, Mail, FileDown, Linkedin, Award } from 'lucide-react';

function App() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [showAllProjects]);

  const dockItems = [
    { icon: <Home size={20} color='white' />, href: '#home', onClick: () => setShowAllProjects(false) },
    { icon: <FolderGit2 size={20} color='white' />, href: '#', onClick: () => setShowAllProjects(true) },
    { icon: <Github size={20} color='white' />, href: 'https://github.com/SouravLenka' },
    { icon: <Linkedin size={20} color='white' />, href: 'https://www.linkedin.com/in/sourav-lenka-a82882295' },
    { icon: <Mail size={20} color='white' />, href: '#contact' },
    { icon: <FileDown size={20} color='white' />, href: '/resume.pdf', download: true },
  ];

  return (
    <main className="relative bg-bg-main min-h-screen text-text-primary selection:bg-accent selection:text-white">
      {/* Persistent Backgrounds */}
      {!showAllProjects && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          style={{ opacity: backgroundOpacity, scale: backgroundScale }}
          className="fixed inset-0 z-0 pointer-events-none"
        >
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={1}
          />
        </motion.div>
      )}

      {showAllProjects && (
        <div className="fixed inset-0 z-0">
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#1e1b4b"
            activeColor="#6366f1"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      )}

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!showAllProjects ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pb-32"
            >
              <Hero />
              <Introduction />
              <Projects onOpenAll={() => setShowAllProjects(true)} />
              <Achievements />
              <Contact />
            </motion.div>
          ) : (
            <motion.div
              key="projects-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-20 px-4 pb-32"
            >
              <Projects showAll={true} />
              <div className="flex justify-center mt-12 mb-20">
                <button
                  onClick={() => setShowAllProjects(false)}
                  className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Dock items={dockItems} />
    </main>
  );
}

export default App;
