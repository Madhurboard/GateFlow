import { motion } from 'framer-motion';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';
import ProgressRing from '../components/ProgressRing';
import SubjectCard from '../components/SubjectCard';

export default function Dashboard() {
    const { getOverallProgress, getSubjectProgress, hasAnyProgress } = useProgress();
    const overall = getOverallProgress();
    const anyProgress = hasAnyProgress();

    return (
        <motion.div
            className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Hero Section */}
            <section className="flex flex-col items-center text-center mb-12 sm:mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mb-6"
                >
                    <ProgressRing percentage={overall} />
                </motion.div>

                <motion.h1
                    className="text-2xl sm:text-3xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {anyProgress ? 'Keep it up!' : 'Ready to conquer GATE?'}
                </motion.h1>
                <motion.p
                    className="text-slate-400 text-sm sm:text-base max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {anyProgress
                        ? `You've mastered ${overall}% of the GATE CSE syllabus. Every topic counts!`
                        : 'Start tracking your syllabus progress. Tap any subject to begin.'}
                </motion.p>
            </section>

            {/* Empty State */}
            {!anyProgress && (
                <motion.div
                    className="glass-card p-8 text-center mb-10 glow-indigo"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <span className="text-4xl mb-3 block">🚀</span>
                    <h2 className="text-lg font-semibold text-white mb-2">
                        Your GATE journey starts here
                    </h2>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto">
                        Pick a subject below and start marking topics as you study.
                        Watch your progress ring fill up — one topic at a time.
                    </p>
                </motion.div>
            )}

            {/* Section Header */}
            <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <h2 className="text-lg font-semibold text-white">Subjects</h2>
                <span className="text-xs text-slate-500">{subjects.length} subjects</span>
            </motion.div>

            {/* Subject Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject, index) => (
                    <SubjectCard
                        key={subject.id}
                        subject={subject}
                        progress={getSubjectProgress(subject.id)}
                        index={index}
                    />
                ))}
            </div>

            {/* Footer tagline */}
            <motion.p
                className="text-center text-xs text-slate-600 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                Built for GATE CSE aspirants · GATEflow
            </motion.p>
        </motion.div>
    );
}
