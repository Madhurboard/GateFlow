import { motion } from 'framer-motion';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';
import HeroProgress from '../components/HeroProgress';
import SubjectCard from '../components/SubjectCard';
import Countdown from '../components/Countdown';

export default function Dashboard() {
    const { getOverallProgress, getSubjectProgress, hasAnyProgress } = useProgress();
    const overall = getOverallProgress();

    // Calculate total and completed topics across all subjects
    const totalTopics = subjects.reduce((acc, curr) => acc + curr.topics.length, 0);
    const completedTopics = subjects.reduce((acc, curr) => acc + getSubjectProgress(curr.id).completed, 0);

    const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    // Asymmetric Bento Grid Logic (By GATE Marks Weightage)
    // High Weightage (13-15 marks)   -> 2x2 slots (ga, em, pds)
    // Medium Weightage (8-10 marks)  -> 2x1 slots (cn, toc, os, dbms) (Note: cn & toc span 2 cols, os & dbms span 2 rows for visual variety in the dense grid)
    // Low Weightage (4-7 marks)      -> 1x1 slots (algo, dl, coa, cd)
    const getCardClass = (id) => {
        switch (id) {
            case 'ga':
            case 'em':
            case 'pds':
                return 'lg:col-span-2 lg:row-span-2 min-h-[380px]';
            case 'cn':
            case 'toc':
                return 'lg:col-span-2 min-h-[180px]';
            case 'os':
            case 'dbms':
                return 'lg:row-span-2 min-h-[380px]';
            default:
                return 'min-h-[180px]'; // standard 1x1 block
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Radial Glows */}
            <div className="glow-radial-top" />
            <div className="glow-radial-bottom" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 relative z-10 pb-24">
                {/* Hero Section */}
                <section className="flex flex-col items-center text-center mb-16 sm:mb-24 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut', type: 'spring', bounce: 0.4 }}
                        className="mb-8 sm:mb-12 relative transform scale-75 sm:scale-100 origin-center"
                    >
                        {/* New Advanced Hero Visualization */}
                        <HeroProgress
                            percentage={overall}
                            totalTopics={totalTopics}
                            completedTopics={completedTopics}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-3xl px-4"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 mb-4 sm:mb-6 tracking-tight leading-tight">
                            Command Your <br className="sm:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-success drop-shadow-sm">GATE Journey</span>
                        </h1>
                        <p className="text-slate-400 font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm bg-surface-card border border-surface-border inline-block px-6 py-2 rounded-full shadow-sm backdrop-blur-md">
                            {today} <span className="mx-3 text-slate-600">|</span> GATE 2027 <span className="mx-3 text-slate-600">|</span> CSE
                        </p>
                        <div className="mt-4">
                            <Countdown />
                        </div>
                    </motion.div>
                </section>

                {/* Symmetrical Bento Grid */}
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
