import { motion } from "framer-motion";

export default function Aurora({
  colorStops = ["#7cff67", "#38bdf8", "#818cf8"],
  amplitude = 0.8,
  blend = 0.6,
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(1200px circle at 0% 0%, ${colorStops[0]} 0%, transparent 40%)`,
            `radial-gradient(1200px circle at 100% 0%, ${colorStops[1]} 0%, transparent 40%)`,
            `radial-gradient(1200px circle at 50% 100%, ${colorStops[2]} 0%, transparent 40%)`,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          filter: `blur(${amplitude * 120}px)`,
          opacity: blend,
        }}
      />
    </div>
  );
}
