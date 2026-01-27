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

            <footer className="relative mt-20 pb-10 text-center text-text-muted text-sm w-full">
                <p>© {new Date().getFullYear()} Sourav Lenka. Built with React + Vite + Tailwind v4.</p>
            </footer>
        </section>
    );
}
