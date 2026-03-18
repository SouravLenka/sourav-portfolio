// Component adapted for custom Skill elements by Antigravity
// Original concept by Dominik Koch
// https://x.com/dominikkoch

import { useMemo, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './OrbitSkills.css';
import SkillCard from './SkillCard';

function generateEllipsePath(cx, cy, rx, ry) {
    return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function OrbitItem({ item, index, totalItems, path, rotation, progress, fill }) {
    const itemOffset = fill ? (index / totalItems) * 100 : 0;

    const offsetDistance = useTransform(progress, (p) => {
        const offset = (((p + itemOffset) % 100) + 100) % 100;
        return `${offset}%`;
    });

    return (
        <motion.div
            className="orbit-item"
            style={{
                offsetPath: `path("${path}")`,
                offsetRotate: '0deg',
                offsetAnchor: 'center center',
                offsetDistance,
            }}
        >
            <div style={{ transform: `rotate(${-rotation}deg)` }}>
                <SkillCard skill={item} />
            </div>
        </motion.div>
    );
}

export default function OrbitSkills({
    skills = [],
    shape = 'ellipse',
    baseWidth = 1400,
    radiusX = 700,
    radiusY = 170,
    rotation = -8,
    duration = 40,
    direction = 'normal',
    fill = true,
    width = '100%',
    height = '100%',
    className = '',
    showPath = false,
    pathColor = 'rgba(255,255,255,0.05)',
    pathWidth = 1,
    easing = 'linear',
    paused = false,
    responsive = true,
}) {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    const designCenterX = baseWidth / 2;
    const designCenterY = baseWidth / 2;

    const path = useMemo(() => {
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
    }, [designCenterX, designCenterY, radiusX, radiusY]);

    useEffect(() => {
        if (!responsive || !containerRef.current) return;
        const updateScale = () => {
            if (!containerRef.current) return;
            setScale(containerRef.current.clientWidth / baseWidth);
        };
        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [responsive, baseWidth]);

    const progress = useMotionValue(0);

    useEffect(() => {
        if (paused) return;
        const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
            duration,
            ease: easing,
            repeat: Infinity,
            repeatType: 'loop',
        });
        return () => controls.stop();
    }, [progress, duration, easing, direction, paused]);

    const containerWidth = responsive ? '100%' : (typeof width === 'number' ? width : '100%');
    const containerHeight = responsive ? 'auto' : (typeof height === 'number' ? height : (typeof width === 'number' ? width : 'auto'));

    return (
        <div
            ref={containerRef}
            className={`orbit-container ${className}`}
            style={{
                width: containerWidth,
                height: containerHeight,
                aspectRatio: responsive ? '1 / 1' : undefined,
            }}
            aria-hidden="true"
        >
            <div
                className={responsive ? 'orbit-scaling-container orbit-scaling-container--responsive' : 'orbit-scaling-container'}
                style={{
                    width: responsive ? baseWidth : '100%',
                    height: responsive ? baseWidth : '100%',
                    transform: responsive ? `translate(-50%, -50%) scale(${scale})` : undefined,
                }}
            >
                <div
                    className="orbit-rotation-wrapper"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {showPath && (
                        <svg
                            width="100%"
                            height="100%"
                            viewBox={`0 0 ${baseWidth} ${baseWidth}`}
                            className="orbit-path-svg"
                        >
                            <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / scale} strokeDasharray="4 4" />
                        </svg>
                    )}

                    {skills.map((skill, index) => (
                        <OrbitItem
                            key={index}
                            item={skill}
                            index={index}
                            totalItems={skills.length}
                            path={path}
                            rotation={rotation}
                            progress={progress}
                            fill={fill}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
