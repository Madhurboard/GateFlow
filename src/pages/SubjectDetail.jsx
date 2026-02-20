import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';
import TopicRow from '../components/TopicRow';

export default function SubjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getTopicState, cycleTopicState, getSubjectProgress, getSubtopicState, toggleSubtopicState } = useProgress();

    const subject = subjects.find((s) => s.id === id);

    // Handle not found
    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Subject Not Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary hover:text-white transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    const progress = getSubjectProgress(subject.id);

    return (
        <motion.div
            className="relative min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="glow-radial-top" />
            <div className="glow-radial-bottom" />

            <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10 w-full">
                {/* Back button */}
                <motion.button
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-8 sm:mb-12 group font-medium py-2 pr-4 -ml-2 select-none"
                    onClick={() => navigate('/')}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Dashboard
                </motion.button>

                {/* Header */}
                <motion.div
                    className="mb-12 sm:mb-16 glass-card p-6 sm:p-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8 mb-8">
                        <div className="flex items-center gap-6 sm:gap-8">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-surface-card border border-surface-border flex items-center justify-center shadow-card text-5xl sm:text-6xl filter drop-shadow-md">
                                {subject.icon}
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-[40px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 tracking-tight mb-2 sm:mb-3 leading-tight">
                                    {subject.name}
                                </h1>
                                <p className="text-slate-400 font-medium text-sm sm:text-base">
                                    <span className="text-white font-bold">{progress.completed}</span> of {progress.total} topics mastered
                                </p>
                            </div>
                        </div>

                        <div className="text-left sm:text-right bg-surface-card border border-surface-border rounded-2xl p-4 sm:p-5 min-w-[140px]">
                            <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none mb-1">
                                {progress.percentage}<span className="text-2xl sm:text-3xl text-slate-400 font-bold">%</span>
                            </div>
                            <div className="text-[10px] sm:text-xs text-primary-300 font-bold uppercase tracking-[0.2em]">Completion</div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 sm:h-2.5 bg-surface-border rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            className={`h-full rounded-full ${progress.percentage === 100 ? 'bg-success shadow-glow-success' : 'bg-primary shadow-glow-primary'
                                }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                        />
                    </div>
                </motion.div>

                {/* Topic List */}
                <div className="space-y-4 pb-24">
                    {subject.topics.map((topic, index) => (
                        <TopicRow
                            key={topic.id}
                            topic={topic}
                            state={getTopicState(topic.id)}
                            onToggle={(e) => { e.stopPropagation(); cycleTopicState(topic.id); }}
                            index={index}
                            getSubtopicState={getSubtopicState}
                            toggleSubtopicState={toggleSubtopicState}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
