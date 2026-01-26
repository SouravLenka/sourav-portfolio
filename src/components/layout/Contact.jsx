import Stepper from '../ui/Stepper';

export default function Contact() {
    const handleFinish = (data) => {
        const subject = `Portfolio Contact from ${data.name}`;
        const body = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0A%0D%0AMessage:%0D%0A${data.message}`;
        window.location.href = `mailto:lenkasourav09@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <section id="contact" className="py-20 px-4 min-h-[80vh] flex flex-col items-center justify-center relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
                <p className="text-text-muted text-base max-w-xl mx-auto">
                    Interested in working together? Let's discuss your next project.
                </p>
            </div>

            <Stepper onFinish={handleFinish} />

            <footer className="relative mt-20 pb-10 text-center text-text-muted text-sm w-full">
                <p>© {new Date().getFullYear()} Sourav Lenka. Built with React + Vite + Tailwind v4.</p>
            </footer>
        </section>
    );
}
