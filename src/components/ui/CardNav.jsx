import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';

export default function CardNav({ items }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="relative">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-card/80 backdrop-blur-md border border-white/10 text-primary p-3 rounded-full shadow-lg hover:bg-card/100 transition-colors"
                    whileTap={{ scale: 0.95 }}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={20} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <Menu size={20} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="absolute top-14 left-1/2 -translate-x-1/2 w-max bg-card/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl flex gap-2 flex-col min-w-[150px]"
                        >
                            {items.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="px-4 py-2 rounded-lg hover:bg-white/5 text-sm font-medium text-text-primary transition-colors text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
