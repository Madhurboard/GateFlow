import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
    not_started: {
        label: 'Not Started',
        color: 'text-slate-400',
        bg: 'bg-neutral',
        border: 'border-l-neutral',
        barColor: 'bg-neutral',
        shadow: 'shadow-none',
    },
    in_progress: {
        label: 'In Progress',
        color: 'text-warning',
        bg: 'bg-warning',
        border: 'border-l-warning',
        barColor: 'bg-warning',
        shadow: 'shadow-glow-warning',
    },
    confident: {
        label: 'Confident',
        color: 'text-success',
        bg: 'bg-success',
        border: 'border-l-success',
        barColor: 'bg-success',
        shadow: 'shadow-glow-success',
    },
};

export default function SubjectCard({ subject, progress, index, className = '' }) {
    const navigate = useNavigate();
    const config = statusConfig[progress.status];

    return (
        <motion.div
            className={`relative glass-card bg-surface-card border border-surface-border p-6 sm:p-7 flex flex-col justify-between h-full cursor-pointer overflow-hidden group transition-all duration-300 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
                y: -4,
                scale: 1.01,
                transition: { duration: 0.2 },
            }}
            onClick={() => navigate(`/subject/${subject.id}`)}
        >
            {/* Left accent border */}
            <div className={`absolute left-0 top-0 bottom-0 w-[4px] ${config.border}`} />

            <div className="flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-start mb-5 block">
                        <span className="text-4xl filter drop-shadow-md">{subject.icon}</span>
                        <div className={`px-3 py-1.5 rounded-full ${config.bg}/20 backdrop-blur-md border border-${config.bg.split('-')[1]}/30`}>
                            <span className={`text-[11px] uppercase font-bold tracking-wider ${config.color}`}>
                                {config.label}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-primary-400 transition-colors">
                        {subject.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium">
                        {progress.completed} / {progress.total} topics
                    </p>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between text-sm mb-2.5">
                        <span className="text-slate-400 font-medium tracking-wide">Progress</span>
                        <span className="text-white font-bold">{progress.percentage}%</span>
                    </div>

                    <div className="w-full h-[6px] bg-white/10 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            className={`h-full rounded-full ${config.barColor} ${config.shadow}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
