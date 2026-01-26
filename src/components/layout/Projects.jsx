import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import TiltedCard from '../ui/TiltedCard';
import { X, Github, ExternalLink, Terminal, Cpu, Database, Brain, Globe, Layout, Bot, FileCode2, Calculator, Wallet, Hand, Flame, MessageSquare, FileText, ShoppingBag } from 'lucide-react';

const projectIcons = {
    "Jarvis AI Assistant": <Bot size={64} className="text-accent/60" />,
    "RAG-Based PDF Question Answering Chatbot": <Brain size={64} className="text-accent/60" />,
    "Nexus Learning Platform": <Globe size={64} className="text-accent/60" />,
    "EcoAssist": <Cpu size={64} className="text-accent/60" />,
    "Crude Oil Price Prediction": <Database size={64} className="text-accent/60" />,
    "Attendance Calculator": <Calculator size={64} className="text-accent/60" />,
    "AI Personal Finance Tracker": <Wallet size={64} className="text-accent/60" />,
    "ISL Detection Project": <Hand size={64} className="text-accent/60" />,
    "Firebase Basic Projects": <Flame size={64} className="text-accent/60" />,
    "OMEN Chatbot": <MessageSquare size={64} className="text-accent/60" />,
    "AI Resume Parser": <FileText size={64} className="text-accent/60" />,
    "Mini E-Commerce Website": <ShoppingBag size={64} className="text-accent/60" />,
    "default": <Terminal size={64} className="text-accent/60" />
};

export default function Projects({ onOpenAll, showAll = false }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const displayProjects = showAll ? projects : projects.slice(0, 4);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProject]);

    return (
        <section id="projects" className={`py-20 px-4 min-h-screen relative w-full max-w-7xl mx-auto ${selectedProject ? 'z-50' : 'z-10'}`}>
            <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {showAll ? 'All Projects' : 'Featured Projects'}
                </h2>
                <div className="h-1 w-20 bg-accent rounded-full mb-8" />
                <p className="text-text-muted text-base max-w-2xl">
                    {showAll ? 'Explore my full catalog of work.' : 'Python automation tools, AI-assisted systems, cloud-backed applications, and full-stack projects.'}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        layoutId={`card-${index}`}
                        onClick={() => setSelectedProject(project)}
                        className="cursor-pointer group"
                    >
                        <TiltedCard className="h-full">
                            <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col hover:border-accent/50 transition-colors shadow-lg">
                                <div className="h-48 flex items-center justify-center bg-linear-to-br from-white/5 to-white/[0.02] relative group-hover:from-accent/10 transition-colors duration-500">
                                    {projectIcons[project.title] || projectIcons.default}
                                    <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-text-muted mb-4 flex-1 text-xs line-clamp-2">{project.shortDescription}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-2 py-0.5 bg-white/5 text-[10px] rounded-full text-accent border border-white/5">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TiltedCard>
                    </motion.div>
                ))}
            </div>

            {!showAll && projects.length > 4 && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={onOpenAll}
                        className="px-8 py-3 rounded-full border border-accent/50 bg-accent/10 backdrop-blur-md text-accent font-bold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                    >
                        View More Projects
                    </button>
                </div>
            )}

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`card-${projects.indexOf(selectedProject)}`}
                            className="w-full max-w-3xl bg-bg-card border border-white/10 rounded-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col shadow-2xl"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white z-20 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            <div className="h-64 sm:h-80 w-full flex items-center justify-center bg-linear-to-br from-white/10 to-transparent shrink-0 relative">
                                <div className="scale-125 opacity-40">
                                    {projectIcons[selectedProject.title] || projectIcons.default}
                                </div>
                                <div className="absolute inset-0 bg-radial-to-t from-bg-card via-transparent to-transparent" />
                            </div>

                            <div className="p-8 overflow-y-auto">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                                <p className="text-accent text-lg mb-6">{selectedProject.shortDescription}</p>

                                <div className="prose prose-invert max-w-none mb-8">
                                    <p className="text-text-muted leading-relaxed text-lg">
                                        {selectedProject.longDescription}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h4 className="text-white font-semibold mb-3">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map((t) => (
                                                <span key={t} className="px-3 py-1 bg-white/10 text-sm rounded-md text-white">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {(selectedProject.github || selectedProject.live) && (
                                        <div>
                                            <h4 className="text-white font-semibold mb-3">Links</h4>
                                            <div className="flex flex-col gap-3">
                                                {selectedProject.github && (
                                                    <a
                                                        href={selectedProject.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-accent hover:text-white transition-colors"
                                                    >
                                                        <Github size={20} />
                                                        View Source on GitHub
                                                    </a>
                                                )}
                                                {selectedProject.live && (
                                                    <a
                                                        href={selectedProject.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-accent hover:text-white transition-colors"
                                                    >
                                                        <ExternalLink size={20} />
                                                        View Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
