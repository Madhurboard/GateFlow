import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
    not_started: {
        label: 'Not Started',
        color: 'bg-danger/20 text-danger',
        border: 'status-border-not-started',
        barColor: 'bg-danger',
    },
    in_progress: {
        label: 'In Progress',
        color: 'bg-warning/20 text-warning',
        border: 'status-border-in-progress',
        barColor: 'bg-warning',
    },
    confident: {
        label: 'Mastered',
        color: 'bg-success/20 text-success',
        border: 'status-border-confident',
        barColor: 'bg-success',
    },
};

export default function SubjectCard({ subject, progress, index }) {
    const navigate = useNavigate();
    const config = statusConfig[progress.status];

    return (
        <motion.div
            className={`glass-card-hover p-5 cursor-pointer ${config.border}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
                y: -4,
                transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/subject/${subject.id}`)}
            layout
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                        <h3 className="text-sm font-semibold text-white leading-tight">
                            {subject.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {progress.completed}/{progress.total} topics
                        </p>
                    </div>
                </div>
                <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${config.color}`}>
                    {config.label}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${config.barColor}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                />
            </div>

            {/* Percentage */}
            <div className="flex justify-end mt-2">
                <span className="text-xs text-slate-500 font-medium">{progress.percentage}%</span>
            </div>
        </motion.div>
    );
}
