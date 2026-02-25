import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
    not_started: {
        label: 'Not Started',
        color: 'text-slate-500',
        bg: 'bg-slate-100',
        barColor: 'bg-slate-200',
    },
    in_progress: {
        label: 'In Progress',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        barColor: 'bg-amber-400',
    },
    confident: {
        label: 'Confident',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        barColor: 'bg-emerald-500',
    },
};

export default function SubjectCard({ subject, progress, index, className = '' }) {
    const navigate = useNavigate();
    const config = statusConfig[progress.status];

    return (
        <motion.div
            className={`glass-card p-6 flex flex-col justify-between cursor-pointer group hover:bg-slate-50/50 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
            }}
            onClick={() => navigate(`/subject/${subject.id}`)}
        >
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                        {subject.icon}
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg ${config.bg} border border-black/5`}>
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${config.color}`}>
                            {config.label}
                        </span>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                        {subject.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                        {progress.completed} / {progress.total} topics covered
                    </p>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between text-[11px] mb-2 font-bold uppercase tracking-tight text-slate-400">
                        <span>Progress</span>
                        <span className="text-slate-600">{progress.percentage}%</span>
                    </div>

                    <div className="progress-bar-container">
                        <motion.div
                            className={`progress-bar-fill ${config.barColor}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
