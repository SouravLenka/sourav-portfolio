import InfiniteMarquee from '../ui/InfiniteMarquee';
import { skills } from '../../data/skills';

const Skills = () => {
    // Categorized Rows for a structured visual narrative
    const devOpsRow = skills.slice(0, 7);
    const aiPythonRow = skills.slice(7, 14);
    const webDataRow = skills.slice(14);

    return (
        <section id="skills" className="skills-section relative z-10 overflow-x-hidden py-10 md:py-20 pb-32">
            <div className="max-w-[1440px] mx-auto px-1 md:px-4 mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Technical Arsenal</h2>
                <div className="h-1.5 w-24 bg-accent rounded-full mb-10 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
                <p className="text-text-muted text-lg md:text-xl max-w-3xl leading-relaxed">
                    A high-octane, multi-layered view of my technical mastery, from <span className="text-white font-bold">system-level automation</span> to <span className="text-white font-bold">cloud infrastructure</span> and <span className="text-white font-bold">AI integration</span>.
                </p>
            </div>

            <div className="flex flex-col gap-8 md:gap-14 py-4">
                <InfiniteMarquee items={devOpsRow} speed={40} direction="left" />
                <InfiniteMarquee items={aiPythonRow} speed={55} direction="right" />
                <InfiniteMarquee items={webDataRow} speed={45} direction="left" />
            </div>
        </section>
    );
};

export default Skills;
