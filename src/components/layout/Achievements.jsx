import CircularGallery from '../ui/CircularGallery';
import { achievements } from '../../data/achievements';
import './Achievements.css';

const Achievements = () => {
    return (
        <section id="achievements" className="achievements-section relative z-10 overflow-hidden py-20">
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Achievements</h2>
                <div className="h-1 w-20 bg-accent rounded-full mb-8" />
                <p className="text-text-muted text-base max-w-2xl">
                    A showcase of my certifications and technical learning milestones from Google, AWS, and more.
                    <span className="text-accent ml-2 font-medium">Drag or scroll to rotate the gallery.</span>
                </p>
            </div>

            <div className="achievements-gallery-container w-full h-[600px] md:h-[800px] relative mt-10">
                <CircularGallery
                    items={achievements}
                    bend={3}
                    borderRadius={0.06}
                    scrollSpeed={2.5}
                    scrollEase={0.03}
                />
            </div>
        </section>
    );
};

export default Achievements;
