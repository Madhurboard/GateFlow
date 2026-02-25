import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const statusConfig = {
    not_started: {
        color: 'text-slate-400',
        bg: 'bg-slate-50',
        dot: 'bg-slate-200',
        label: 'Not Started'
    },
    in_progress: {
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        dot: 'bg-amber-400',
        label: 'In Progress'
    },
    confident: {
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        dot: 'bg-emerald-500',
        label: 'Mastered'
    },
};

export default function TopicRow({ topic, progress, onToggleSubtopic }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Ensure progress has a status, default to not_started
    const currentStatus = (progress && progress.status) || 'not_started';
    const subtopicsProgress = (progress && progress.subtopics) || [];

    const config = statusConfig[currentStatus];

    const completedCount = subtopicsProgress.length;
    const totalCount = topic.subtopics.length;

    return (
        <div className="glass-card overflow-hidden transition-all duration-300">
            <div
                className={`p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${isExpanded ? 'bg-slate-50/50' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-5">
                    <div className={`w-2.5 h-2.5 rounded-full ${config.dot} shadow-sm`} />
                    <div>
                        <h4 className="text-[15px] font-bold text-slate-800 mb-0.5">{topic.title}</h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {completedCount} / {totalCount} Modules Complete
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className={`px-2.5 py-1 rounded-lg ${config.bg} border border-black/5`}>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${config.color}`}>
                            {config.label}
                        </span>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-slate-300"
                    >
                        <ChevronDown size={18} />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="px-5 pb-5 pt-2 space-y-1">
                            {topic.subtopics.map((subtopic) => {
                                const isChecked = subtopicsProgress.includes(subtopic.id);
                                return (
                                    <div
                                        key={subtopic.id}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group cursor-pointer"
                                        onClick={() => onToggleSubtopic(subtopic.id)}
                                    >
                                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isChecked
                                                ? 'bg-primary border-primary'
                                                : 'border-slate-200 bg-white group-hover:border-slate-300'
                                            }`}>
                                            {isChecked && <Check size={14} className="text-white stroke-[3px]" />}
                                        </div>
                                        <span className={`text-sm font-medium ${isChecked ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                            {subtopic.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
