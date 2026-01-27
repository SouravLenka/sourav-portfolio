import { motion } from 'framer-motion';
import './Introduction.css';

const Introduction = () => {
    return (
        <section id="introduction" className="py-20 px-4 relative z-10 w-full max-w-7xl mx-auto">
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
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-white to-accent animate-gradient-slow font-bold">Sourav Lenka</span>, a Python and DevOps-oriented Computer Science undergraduate with a strong interest in building reliable, cloud-ready, and automation-driven systems.
                        </p>

                        <p className="text-lg text-text-muted leading-relaxed">
                            I enjoy working with <span className="text-white font-medium">Python, Linux, AWS</span>, and modern DevOps practices to solve real-world problems and develop practical, scalable applications.
                        </p>

                        <p className="text-lg text-text-muted leading-relaxed">
                            I’ve worked on projects such as AI-powered tools, RAG-based chatbots, OCR-driven resume parsers, finance and attendance trackers, and cloud-backed applications, gaining hands-on experience in <span className="text-white font-medium">Python automation, testing and debugging, CI/CD concepts, databases (MySQL, Firebase)</span>, and Streamlit-based dashboards.
                        </p>

                        <p className="text-lg text-text-muted leading-relaxed">
                            I’m continuously learning and improving my skills in cloud technologies, DevOps workflows, and AI systems, with the goal of building efficient, maintainable, and industry-ready solutions.
                        </p>
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                            <h3 className="text-accent font-bold mb-4 uppercase tracking-wider text-sm">Focus Areas</h3>
                            <ul className="space-y-3">
                                {['Python Automation', 'Cloud Infrastructure', 'DevOps Practices', 'AI-Driven Systems'].map((item) => (
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
