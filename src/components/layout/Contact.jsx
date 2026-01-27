import { useState } from 'react';
import Stepper from '../ui/Stepper';

export default function Contact() {
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

    const handleFinish = async (data) => {
        setStatus('submitting');
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            // Reset to idle after a delay so the user can try again
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 min-h-[80vh] flex flex-col items-center justify-center relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
                <p className="text-text-muted text-base max-w-xl mx-auto">
                    Interested in working together? Let's discuss your next project.
                </p>
            </div>

            <Stepper onFinish={handleFinish} status={status} />
            {status === 'error' && (
                <p className="mt-4 text-red-500 font-medium">Something went wrong. Please try again.</p>
            )}

            <footer className="relative mt-32 w-full max-w-6xl mx-auto">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 text-text-muted text-sm px-4">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-white font-medium text-lg tracking-tight">Sourav Lenka</p>
                        <p>© {new Date().getFullYear()} All rights reserved.</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="flex items-center gap-1.5">
                            Built by <span className="text-white font-medium">Sourav</span>
                        </p>
                        <p className="text-xs opacity-50">React + Vite + Tailwind</p>
                    </div>
                </div>
            </footer>
        </section>
    );
}
