import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Check, ChevronRight, ChevronLeft, Send } from 'lucide-react';

export default function Stepper({ onFinish }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [error, setError] = useState('');

    const steps = [
        {
            title: "Hello!",
            description: "Let's get in touch.",
            field: <div className="text-xl font-light text-text-primary">Click next to start.</div>
        },
        {
            title: "Your Name",
            description: "How should I address you?",
            field: <input
                autoFocus
                type="text"
                placeholder=""
                className="w-full bg-transparent border-b border-white/20 p-2 text-xl outline-none focus:border-accent transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
        },
        {
            title: "Email or Contact Number",
            description: "Where can I reach you?",
            field: (
                <div className="space-y-2">
                    <input
                        autoFocus
                        type="text"
                        placeholder="email@example.com or 10-digit number"
                        className={cn(
                            "w-full bg-transparent border-b p-2 text-xl outline-none transition-colors",
                            error ? "border-red-500 focus:border-red-500" : "border-white/20 focus:border-accent"
                        )}
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setError('');
                        }}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            )
        },
        {
            title: "Message",
            description: "What's on your mind?",
            field: <textarea
                autoFocus
                rows={3}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border-b border-white/20 p-2 text-xl outline-none focus:border-accent transition-colors resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
        },
        {
            title: "All Set?",
            description: "Ready to send your message.",
            field: <div className="text-lg text-text-muted">I'll get back to you as soon as possible.</div>
        }
    ];

    const validateStep = () => {
        if (step === 1 && !formData.name.trim()) {
            setError('Please enter your name');
            return false;
        }
        if (step === 2) {
            const input = formData.email.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;

            if (!input) {
                setError('Please enter your email or contact number');
                return false;
            }
            if (!emailRegex.test(input) && !phoneRegex.test(input)) {
                setError('Please enter a valid email or 10-digit number');
                return false;
            }
        }
        if (step === 3 && !formData.message.trim()) {
            setError('Please enter a message');
            return false;
        }
        setError('');
        return true;
    };

    const handleNext = () => {
        if (step > 0 && step < steps.length - 1) {
            if (!validateStep()) return;
        }

        if (step < steps.length - 1) {
            setStep(step + 1);
            setError('');
        } else {
            onFinish(formData);
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col justify-center"
                >
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{steps[step].title}</h3>
                    <p className="text-text-muted mb-6">{steps[step].description}</p>
                    <div className="mb-4">
                        {steps[step].field}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={handleBack}
                    disabled={step === 0}
                    className="p-2 rounded-full hover:bg-white/5 disabled:opacity-0 transition-all text-text-muted"
                >
                    <ChevronLeft />
                </button>

                <div className="flex gap-2">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                i === step ? "w-8 bg-accent" : "w-1.5 bg-white/20"
                            )}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-accent text-white hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                >
                    {step === steps.length - 1 ? <Send size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>
        </div>
    );
}
