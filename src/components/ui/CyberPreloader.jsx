import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS = ['PYTHON', 'DEVOPS', 'AUTOMATION', 'AI SYSTEMS'];

export default function CyberPreloader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Cycle through skills rapidly
    const skillInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < SKILLS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(skillInterval);
          setIsDone(true);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(skillInterval);
  }, []);

  useEffect(() => {
    if (isDone) {
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
      }, 500);
      return () => clearTimeout(exitTimeout);
    }
  }, [isDone]);

  // Percentage value synchronized with current step
  const progressPercent = isDone
    ? 100
    : Math.round(((currentIndex + 1) / SKILLS.length) * 85);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          key="solid-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className={`fixed inset-0 z-50 bg-[#0b0f14] text-slate-200 font-mono flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none ${
            isExiting ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* Top Bar Branding */}
          <div className="flex justify-between items-center text-xs tracking-[0.25em] font-mono text-slate-400 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-white font-bold">SOURAV LENKA</span>
            </div>
            <div className="text-accent/80">
              {isDone ? 'SYSTEM_READY' : 'LOADING_EXPERIENCE'}
            </div>
          </div>

          {/* Center Stage: Kinetic Skill Morph */}
          <div className="w-full max-w-2xl mx-auto text-center relative z-10 my-auto">
            <div className="text-[11px] font-mono tracking-[0.4em] text-accent/70 uppercase mb-4">
              {isDone ? 'WELCOME TO THE PORTFOLIO' : `[ 0${currentIndex + 1} / 04 ] ARCHITECTURE`}
            </div>
            
            {/* Animated Skill Title */}
            <div className="h-20 flex items-center justify-center overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDone ? 'FINAL_NAME' : SKILLS[currentIndex]}
                  initial={{ y: 25, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -25, opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-indigo-300 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] uppercase"
                >
                  {isDone ? 'SOURAV LENKA' : SKILLS[currentIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Horizontal Laser Progress Line */}
            <div className="w-full max-w-xs mx-auto h-[2px] bg-slate-800 rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_14px_#38bdf8]"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="font-mono text-xs tracking-widest text-slate-400">
              <span className="text-accent font-bold">{progressPercent}%</span> COMPLETED
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest text-slate-500 uppercase relative z-10">
            <div>INIT // CORE PIPELINE</div>
            <div className="text-slate-400">SCROLL DOWN TO EXPLORE</div>
          </div>

          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
