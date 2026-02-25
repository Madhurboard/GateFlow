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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-6"
        >
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-800 tracking-tight tabular-nums">
                        {value.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                        {unit}
                    </span>
                </div>
            ))}
        </motion.div>
    );
}
