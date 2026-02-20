import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const targetDate = new Date('2027-02-01T00:00:00');
        const difference = +targetDate - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center mt-6 p-4 sm:p-5 bg-surface-card border border-surface-border rounded-2xl backdrop-blur-xl shadow-card inline-flex"
        >
            <div className="mr-5 pr-5 sm:mr-6 sm:pr-6 border-r border-white/10 flex flex-col items-center justify-center">
                <span className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-[0.2em] mb-1">Target</span>
                <span className="text-sm sm:text-base font-semibold text-white tracking-widest whitespace-nowrap">FEB 2027</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center w-12 sm:w-16">
                        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
                            {value.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                            {unit}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
