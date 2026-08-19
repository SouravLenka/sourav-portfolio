import InfiniteMarquee from '../ui/InfiniteMarquee';
import { skills } from '../../data/skills';

const Skills = () => {
    // Categorized Rows for AI & Automation Engineering
    const aiRow = skills.slice(0, 8);
    const automationRow = skills.slice(8, 15);
    const cloudDataRow = skills.slice(15);

    return (
        <section id="skills" className="skills-section relative z-10 overflow-x-hidden py-10 md:py-20 pb-32">
            <div className="max-w-[1440px] mx-auto px-1 md:px-4 mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Technical Arsenal</h2>
                <div className="h-1.5 w-24 bg-accent rounded-full mb-10 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
                <p className="text-text-muted text-lg md:text-xl max-w-3xl leading-relaxed">
                    A high-octane view of my technical stack—from <span className="text-white font-bold">agentic AI & RAG architecture</span> to <span className="text-white font-bold">Python system automation</span> and <span className="text-white font-bold">cloud DevOps infrastructure</span>.
                </p>
            </div>

            <div className="flex flex-col gap-8 md:gap-14 py-4">
                <InfiniteMarquee items={aiRow} speed={40} direction="left" />
                <InfiniteMarquee items={automationRow} speed={55} direction="right" />
                <InfiniteMarquee items={cloudDataRow} speed={45} direction="left" />
            </div>
        </section>
    );
};

export default Skills;
