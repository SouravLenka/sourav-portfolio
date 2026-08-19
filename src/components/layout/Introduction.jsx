import { motion } from 'framer-motion';
import './Introduction.css';

const Introduction = () => {
    return (
        <section id="introduction" className="py-20 px-1 md:px-2 relative z-10 w-full max-w-[1440px] mx-auto">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Introduction</h2>
                <div className="h-1 w-20 bg-accent rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
            >
                <div className="intro-content grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8 space-y-6">
                        <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                            Hi, I’m <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-white to-accent animate-gradient-slow font-bold">Sourav Lenka</span>, an aspiring <span className="text-accent font-bold">AI & Automation Engineer</span> and Computer Science undergraduate dedicated to building intelligent agentic systems, autonomous workflows, and cloud-backed AI applications.
                        </p>

                        <p className="text-lg text-text-muted leading-relaxed">
                            I specialize in leveraging <span className="text-white font-medium">Python, LLMs, RAG Pipelines, Vector Databases (FAISS/ChromaDB), and DevOps Cloud Infrastructure</span> to automate complex processes and engineer resilient, self-sustaining AI solutions.
                        </p>

                        <p className="text-lg text-text-muted leading-relaxed">
                            My portfolio spans <span className="text-white font-medium">AI document intelligence (Vision-Language OCR), RAG doubt-resolution systems, system automation bots, computer vision pipelines, and full-stack cloud applications</span>—combining deep AI integration with practical end-to-end software engineering.
                        </p>

                        <p className="text-lg text-text-muted leading-relaxed">
                            I am driven to pioneer continuous automation workflows, agentic decision-making systems, and production-ready AI architectures that deliver high-impact real-world automation.
                        </p>
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                            <h3 className="text-accent font-bold mb-4 uppercase tracking-wider text-sm">Focus Areas</h3>
                            <ul className="space-y-3">
                                {[
                                    'AI & Agentic Workflows',
                                    'LLMs & RAG Pipelines',
                                    'Python & System Automation',
                                    'Cloud & DevOps Infrastructure'
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-white/80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Introduction;
