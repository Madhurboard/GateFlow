import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroProgress({ percentage, totalTopics, completedTopics }) {
    const size = 320;
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const [count, setCount] = useState(0);

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
            <svg width={size} height={size / 2} className="relative z-10 overflow-visible">
                {/* Background Track Arc */}
                <path
                    d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                    fill="none"
                    className="stroke-slate-100 dark:stroke-slate-700"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* Progress Arc */}
                <motion.path
                    d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                />
            </svg>

            {/* Inner Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end h-full pb-2 z-20 pointer-events-none">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex items-baseline">
                        <span className="text-7xl sm:text-[80px] font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter leading-none">
                            {count}
                        </span>
                        <span className="text-3xl font-bold text-slate-400 dark:text-slate-500 ml-1">%</span>
                    </div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Overall Progress</div>
                </motion.div>
            </div>

            {/* Bottom details */}
            <motion.div
                className="absolute -bottom-10 flex gap-8 text-[13px] font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-slate-600 dark:text-slate-300">{completedTopics} <span className="text-slate-400 dark:text-slate-500 font-medium">Mastered</span></span>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-600" />
                    <span className="text-slate-600 dark:text-slate-300">{totalTopics} <span className="text-slate-400 dark:text-slate-500 font-medium">Total</span></span>
                </div>
            </motion.div>
        </div>
    );
}
