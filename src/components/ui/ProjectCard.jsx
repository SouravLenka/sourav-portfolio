import { motion } from 'framer-motion';
import TiltedCard from './TiltedCard';
import { Terminal, Cpu, Database, Brain, Globe, Bot, FileText, Calculator, Wallet, Hand, Flame, MessageSquare, ShoppingBag, QrCode, Sparkles, Lightbulb, Gamepad } from 'lucide-react';

const projectIcons = {
    "Gamepad": <Gamepad size={64} className="text-accent/60" />,
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

export default function ProjectCard({ project, index, onClick }) {
    return (
        <motion.div
            layoutId={`card-${index}`}
            onClick={onClick}
            className="cursor-pointer group h-full"
        >
            <TiltedCard className="h-full">
                <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col hover:border-accent/50 transition-colors shadow-lg">
                    <div className="h-48 flex items-center justify-center bg-linear-to-br from-white/5 to-white/[0.02] relative group-hover:from-accent/10 transition-colors duration-500">
                        {projectIcons[project.iconName] || projectIcons.default}
                        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-text-muted mb-4 flex-1 text-xs line-clamp-2">{project.shortDescription}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 3).map((t) => (
                                <span key={t} className="px-2 py-0.5 bg-white/5 text-[10px] rounded-full text-accent border border-white/5">
                                    {t}
                                </span>
                            ))}
                            {project.tech.length > 3 && (
                                <span className="px-2 py-0.5 bg-white/5 text-[10px] rounded-full text-accent border border-white/5">
                                    +{project.tech.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </TiltedCard>
        </motion.div>
    );
}
