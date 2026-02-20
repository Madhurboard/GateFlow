import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';
import TopicRow from '../components/TopicRow';

export default function SubjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getTopicState, cycleTopicState, getSubjectProgress } = useProgress();

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
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-surface-card border border-surface-border flex items-center justify-center shadow-card text-4xl">
                                {subject.icon}
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">{subject.name}</h1>
                                <p className="text-slate-400 font-medium">
                                    {progress.completed} of {progress.total} topics mastered
                                </p>
                            </div>
                        </div>

                        <div className="text-left sm:text-right">
                            <div className="text-4xl font-bold text-white tracking-tight">{progress.percentage}%</div>
                            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Completion</div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-surface-border rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${progress.percentage === 100 ? 'bg-success shadow-glow-success' : 'bg-primary shadow-glow-primary'
                                }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
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
                            onToggle={() => cycleTopicState(topic.id)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
