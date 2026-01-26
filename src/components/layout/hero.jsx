import { motion } from 'framer-motion';
import RotatingText from '../ui/RotatingText';

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Content Layer */}
      <div className="relative z-10 text-center px-4 space-y-8 max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-4">
            Hi, I’m <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-500 to-indigo-500 animate-pulse">Sourav Lenka</span>
          </h1>

          <div className="flex justify-center items-center h-12">
            <RotatingText
              texts={['Python', 'Linux', 'AWS', 'Automation', 'AI Systems']}
              mainClassName="px-4 py-2 bg-accent/20 text-accent font-bold text-2xl md:text-4xl rounded-lg overflow-hidden flex items-center justify-center border border-accent/30 backdrop-blur-sm"
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
        </motion.div>

      </div>
    </section>
  );
}
