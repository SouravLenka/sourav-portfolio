import { motion } from 'framer-motion';
import RotatingText from '../ui/RotatingText';

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[100dvh] py-16 md:py-0 flex flex-col items-center justify-center overflow-hidden">
      {/* Content Layer */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 space-y-8 max-w-4xl mx-auto my-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4">
            Hi, I’m <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-white to-accent animate-gradient-slow">Sourav Lenka</span>
          </h1>
          <div className="flex justify-center items-center h-12">
            <RotatingText
              texts={['Python', 'DevOps', 'Automation', 'AI Systems']}
              mainClassName="px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/20 text-accent font-bold text-xl sm:text-2xl md:text-4xl rounded-lg overflow-hidden flex items-center justify-center border border-accent/30 backdrop-blur-sm"
              staggerFrom={"last"}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-10 flex flex-col items-center"
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-3 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl hover:bg-white/10"
            >
              {/* Subtle Thematic Glow */}
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Button Text */}
              <span className="relative z-10 flex items-center gap-2">
                Let’s Connect
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </button>
            
            {/* Subtle glow underneath */}
            <div className="w-24 h-1 bg-accent/30 blur-xl mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
