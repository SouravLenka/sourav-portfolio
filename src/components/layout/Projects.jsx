import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import { X, Github, ExternalLink, Terminal, Cpu, Database, Brain, Globe, Bot, FileText, Calculator, Wallet, Hand, Flame, MessageSquare, ShoppingBag, QrCode, Sparkles, Lightbulb, CheckCircle2 } from 'lucide-react';

const projectIcons = {
    "Bot": <Bot size={64} className="text-accent/60" />,
    "Brain": <Brain size={64} className="text-accent/60" />,
    "Globe": <Globe size={64} className="text-accent/60" />,
    "Cpu": <Cpu size={64} className="text-accent/60" />,
    "Database": <Database size={64} className="text-accent/60" />,
    "Calculator": <Calculator size={64} className="text-accent/60" />,
    "Wallet": <Wallet size={64} className="text-accent/60" />,
    "Hand": <Hand size={64} className="text-accent/60" />,
    "Flame": <Flame size={64} className="text-accent/60" />,
    "MessageSquare": <MessageSquare size={64} className="text-accent/60" />,
    "FileText": <FileText size={64} className="text-accent/60" />,
    "ShoppingBag": <ShoppingBag size={64} className="text-accent/60" />,
    "QrCode": <QrCode size={64} className="text-accent/60" />,
    "Story": <Sparkles size={64} className="text-accent/60" />,
    "Mind": <Lightbulb size={64} className="text-accent/60" />,
    "default": <Terminal size={64} className="text-accent/60" />
};

export default function Projects({ onOpenAll, showAll = false }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const displayProjects = showAll ? projects : projects.slice(0, 4);

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
                    <ProjectCard 
                        key={project.title} 
                        project={project} 
                        index={projects.indexOf(project)} 
                        onClick={() => setSelectedProject(project)} 
                    />
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

            <AnimatePresence mode="wait">
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
                                    {projectIcons[selectedProject.iconName] || projectIcons.default}
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

                                {selectedProject.features && (
                                    <div className="mb-8">
                                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                            <Sparkles size={20} className="text-accent" />
                                            Key Features
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {selectedProject.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                                                    <span className="text-text-muted text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h4 className="text-white font-semibold mb-3">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map((t) => (
                                                <span key={t} className="px-3 py-1 bg-white/10 text-sm rounded-md text-white border border-white/5">
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
                                                        className="flex items-center gap-2 text-accent hover:text-white transition-colors group"
                                                    >
                                                        <Github size={20} />
                                                        <span className="group-hover:translate-x-1 transition-transform">View Source on GitHub</span>
                                                    </a>
                                                )}
                                                {selectedProject.live && (
                                                    <a
                                                        href={selectedProject.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-accent hover:text-white transition-colors group"
                                                    >
                                                        <ExternalLink size={20} />
                                                        <span className="group-hover:translate-x-1 transition-transform">View Live Demo</span>
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
