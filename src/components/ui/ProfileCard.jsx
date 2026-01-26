import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import TiltedCard from './TiltedCard';

export default function ProfileCard() {
    return (
        <TiltedCard className="w-full max-w-sm mx-auto">
            <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-2xl">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent shadow-lg">
                        {/* Placeholder for user avatar, using a gradient for now if no image provided */}
                        <div className="w-full h-full bg-linear-to-br from-accent to-purple-600 flex items-center justify-center text-4xl font-bold text-white">
                            S
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-bg-card flex items-center justify-center">
                        <span className="sr-only">Online</span>
                    </div>
                </div>

                <div className="text-center space-y-1">
                    <h2 className="text-xl font-bold text-text-primary">Sourav Lenka</h2>
                    <p className="text-accent text-sm font-medium">Python-Centric DevOps & Automation Engineer</p>
                    <div className="flex items-center justify-center gap-2 text-text-muted text-sm mt-2">
                        <MapPin size={14} />
                        <span>Rourkela, Odisha, India</span>
                    </div>
                </div>

                <div className="flex gap-4 mt-2">
                    {/* Social links could be dynamic or hardcoded here as per requirements */}
                    <a href="https://github.com/SouravLenka" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="#" className="p-2 rounded-full hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:lenkasourav09@gmail.com" className="p-2 rounded-full hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </TiltedCard>
    );
}
