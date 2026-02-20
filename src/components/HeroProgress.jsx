import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroProgress({ percentage, totalTopics, completedTopics }) {
    const size = 320;
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    // We only want a half circle (speedometer style)
    const circumference = Math.PI * radius;
    // Offset calculation for a half circle
    const offset = circumference - (percentage / 100) * circumference;

    const [count, setCount] = useState(0);

    // Animate the counter on mount
    useEffect(() => {
        let start = 0;
        const duration = 1500;
        const incrementTime = (duration / percentage) || 0;

        if (percentage === 0) return;

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === percentage) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [percentage]);

    return (
        <div className="relative inline-flex flex-col items-center justify-center p-8 mt-4" style={{ width: size, height: size * 0.6 }}>
            {/* Ambient Background Glow */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[280px] h-[140px] bg-primary/30 blur-[70px] rounded-[100%] pointer-events-none" />

            <svg width={size} height={size / 2} className="relative z-10 overflow-visible drop-shadow-2xl">
                {/* Background Track Arc */}
                <path
                    d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* Progress Arc */}
                <motion.path
                    d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                    fill="none"
                    stroke="url(#heroGradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                    className="drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                />
                <defs>
                    <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366F1" />    {/* Primary Indigo */}
                        <stop offset="50%" stopColor="#A855F7" />   {/* Vibrant Purple */}
                        <stop offset="100%" stopColor="#22C55E" />  {/* Success Green */}
                    </linearGradient>
                </defs>
            </svg>

            {/* Inner Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end h-full pb-2 z-20 pointer-events-none">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex items-baseline">
                        <span className="text-7xl sm:text-[80px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tighter drop-shadow-md leading-none">
                            {count}
                        </span>
                        <span className="text-3xl font-bold text-white/50 ml-1">%</span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom details */}
            <motion.div
                className="absolute -bottom-10 flex gap-6 text-sm font-semibold tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                    <span className="text-white">{completedTopics} <span className="text-slate-500">Mastered</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-surface-border" />
                    <span className="text-white">{totalTopics} <span className="text-slate-500">Total Topics</span></span>
                </div>
            </motion.div>
        </div>
    );
}
