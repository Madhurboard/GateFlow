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
            className={`relative glass-card bg-surface-card border border-surface-border p-6 cursor-pointer overflow-hidden group hover:shadow-card-hover ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
                scale: 1.02,
                borderColor: 'rgba(255,255,255,0.15)',
                transition: { duration: 0.2 },
            }}
            onClick={() => navigate(`/subject/${subject.id}`)}
        >
            {/* Left accent border */}
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${config.border}`} />

            <div className="flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-3xl filter drop-shadow-md">{subject.icon}</span>
                        <div className={`px-2 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/5`}>
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${config.color}`}>
                                {config.label}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                        {subject.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium lowercase">
                        {progress.completed} / {progress.total} topics
                    </p>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400 font-medium">Progress</span>
                        <span className="text-white font-bold">{progress.percentage}%</span>
                    </div>

                    <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
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
