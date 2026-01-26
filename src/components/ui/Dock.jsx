import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

function AppIcon({ mouseX, children, href, download, onClick }) {
    let ref = useRef(null);
    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.a
            href={href}
            download={download}
            onClick={onClick}
            ref={ref}
            style={{ width }}
            className="aspect-square w-10 rounded-xl bg-gray-800/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
        >
            {children}
        </motion.a>
    );
}

export default function Dock({ items }) {
    let mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 h-16 flex items-end gap-4 px-4 pb-3 rounded-2xl bg-black/20 backdrop-blur-lg border border-white/10 z-50"
        >
            {items.map((item, i) => (
                <AppIcon
                    mouseX={mouseX}
                    key={i}
                    href={item.href}
                    download={item.download}
                    onClick={(e) => {
                        if (item.href === '#' || item.onClick) {
                            e.preventDefault();
                            if (item.onClick) item.onClick();
                        }
                    }}
                >
                    {item.icon}
                </AppIcon>
            ))}
        </motion.div>
    );
}
