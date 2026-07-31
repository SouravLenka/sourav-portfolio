import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Prism from './components/background/Prism';
import DotGrid from './components/background/DotGrid';
import Dock from './components/ui/Dock';
import CyberPreloader from './components/ui/CyberPreloader';
import Hero from './components/layout/MainHero';
import Introduction from './components/layout/Introduction';
import Projects from './components/layout/Projects';
import Skills from './components/layout/Skills';
import Achievements from './components/layout/Achievements';
import Contact from './components/layout/Contact';
import { Home, FolderGit2, Github, Mail, FileDown, Linkedin, Award } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Prevent background scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [showAllProjects]);

  const dockItems = [
    {
      icon: <Home size={20} color='white' />,
      href: '#home',
      onClick: () => {
        if (showAllProjects) {
          setShowAllProjects(false);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    },
    {
      icon: <FolderGit2 size={20} color='white' />,
      href: '#',
      onClick: () => setShowAllProjects(true)
    },
    { icon: <Github size={20} color='white' />, href: 'https://github.com/SouravLenka' },
    { icon: <Linkedin size={20} color='white' />, href: 'https://www.linkedin.com/in/souravlenkaaa' },
    {
      icon: <Mail size={20} color='white' />,
      href: '#contact',
      onClick: (e) => {
        if (showAllProjects) {
          setShowAllProjects(false);
          // Simple scroll with delay since we removed the complex logic
          setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }, 600);
        } else {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { icon: <FileDown size={20} color='white' />, href: '/resume.pdf', download: true },
  ];

  return (
    <main className="relative bg-bg-main min-h-screen text-text-primary selection:bg-accent selection:text-white">
      {/* Cyber Preloader Intro */}
      {isLoading && <CyberPreloader onComplete={() => setIsLoading(false)} />}

      {/* Persistent Backgrounds with Smooth Cross-Fade */}
      <AnimatePresence mode="wait">
        {!showAllProjects ? (
          <motion.div
            key="prism-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
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
        ) : (
          <motion.div
            key="dotgrid-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-0"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!showAllProjects ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isLoading ? { opacity: 0, scale: 0.98 } : { opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="pb-32 px-0.5 md:px-2"
            >
              <Hero />
              <Introduction />
              <Projects onOpenAll={() => setShowAllProjects(true)} />
              <Skills />
              <Achievements />
              <Contact />
            </motion.div>
          ) : (
            <motion.div
              key="projects-page"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="pt-20 px-1 md:px-4 pb-32"
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
