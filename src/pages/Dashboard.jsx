import { motion } from 'framer-motion';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';
import ProgressRing from '../components/ProgressRing';
import SubjectCard from '../components/SubjectCard';

export default function Dashboard() {
    const { getOverallProgress, getSubjectProgress, hasAnyProgress } = useProgress();
    const overall = getOverallProgress();
    // We use this to check strict empty state (no progress at all)
    // but for the redesign we might want to always show the ring
    const anyProgress = hasAnyProgress();

    const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    // Bento Grid Logic: OS, Algo, DBMS are taller cards
    const getCardClass = (id) => {
        if (['os', 'algo', 'dbms'].includes(id)) {
            return 'md:row-span-2 h-full min-h-[320px]';
        }
        return 'h-full min-h-[240px]';
    };

    return (
        <div className="relative min-h-screen">
            {/* Radial Glows */}
            <div className="glow-radial-top" />
            <div className="glow-radial-bottom" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10 pb-24">
                {/* Hero Section */}
                <section className="flex flex-col items-center text-center mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mb-8 relative"
                    >
                        <ProgressRing percentage={overall} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h1 className="text-4xl sm:text-[44px] font-bold text-white mb-3 tracking-tight">
                            Your GATE Journey
                        </h1>
                        <p className="text-slate-500 font-semibold uppercase tracking-widest text-xs">
                            {today} <span className="mx-2">·</span> GATE 2026 <span className="mx-2">·</span> CSE
                        </p>
                    </motion.div>
                </section>

                {/* Bento Grid */}
                <div className="bento-grid">
                    {subjects.map((subject, index) => (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            progress={getSubjectProgress(subject.id)}
                            index={index}
                            className={getCardClass(subject.id)}
                        />
                    ))}
                </div>

                {/* Footer tagline */}
                <motion.div
                    className="text-center mt-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-xs text-slate-700 font-medium">GATEflow · Crafted for Excellence</p>
                </motion.div>
            </main>
        </div>
    );
}
