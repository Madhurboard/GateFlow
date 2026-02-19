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
    if (!subject) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <span className="text-5xl mb-4 block">🤔</span>
                <h2 className="text-xl font-semibold text-white mb-2">Subject not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-primary text-sm hover:underline cursor-pointer"
                >
                    ← Back to Dashboard
                </button>
            </div>
        );
    }

    const progress = getSubjectProgress(subject.id);

    return (
        <motion.div
            className="max-w-3xl mx-auto px-4 sm:px-6 py-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Back button */}
            <motion.button
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 cursor-pointer group"
                onClick={() => navigate('/')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Dashboard
            </motion.button>

            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{subject.icon}</span>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white">{subject.name}</h1>
                        <p className="text-sm text-slate-400">
                            {progress.completed} of {progress.total} topics mastered
                        </p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-success"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-xs text-slate-500">{progress.percentage}% complete</span>
                    <span className="text-xs text-slate-500">
                        {progress.inProgress} in progress
                    </span>
                </div>
            </motion.div>

            {/* Topic List */}
            <div>
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

            {/* Tip */}
            <motion.div
                className="mt-8 glass-card p-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <p className="text-xs text-slate-500">
                    💡 Tap the status badge to cycle: <span className="text-slate-400">Not Started</span> →{' '}
                    <span className="text-warning">In Progress</span> →{' '}
                    <span className="text-success">Confident</span>
                </p>
            </motion.div>
        </motion.div>
    );
}
