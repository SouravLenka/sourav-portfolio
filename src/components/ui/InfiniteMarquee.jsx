import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const InfiniteMarquee = ({ items, speed = 40, direction = 'left' }) => {
    // Sufficient duplication for seamless loop
    const displayItems = [...items, ...items, ...items, ...items];
    
    const xValues = direction === 'left' ? ["0%", "-25%"] : ["-25%", "0%"];

    return (
        <div className="w-full overflow-hidden whitespace-nowrap py-6 relative">
            {/* Smooth Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-96 bg-gradient-to-r from-bg-main via-bg-main/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 md:w-96 bg-gradient-to-l from-bg-main via-bg-main/80 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="inline-flex gap-6 md:gap-10 px-10 will-change-transform"
                animate={{
                    x: xValues,
                }}
                transition={{
                    x: {
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                    },
                }}
            >
                {displayItems.map((item, idx) => {
                    const IconComponent = Icons[item.icon] || Icons.Terminal;
                    const itemColor = item.color === '#accent' ? '#38bdf8' : item.color;
                    
                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-4 px-8 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-3xl transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 hover:scale-[1.02] group pointer-events-auto"
                        >
                            {/* Icon avec glow subtil */}
                            <div 
                                className="p-3 rounded-2xl bg-white/5 transition-all duration-500 group-hover:scale-110 shadow-inner"
                                style={{ border: `1px solid ${itemColor}20` }}
                            >
                                <IconComponent 
                                    size={24} 
                                    style={{ color: itemColor, filter: `drop-shadow(0 0 8px ${itemColor}40)` }}
                                    className="transition-all duration-500"
                                />
                            </div>
                            
                            <div className="flex flex-col">
                                <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-white/60 transition-colors">
                                    {item.category || 'Tech'}
                                </span>
                                <span className="text-white/90 text-lg md:text-xl font-black tracking-tight group-hover:text-white transition-colors">
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default InfiniteMarquee;
