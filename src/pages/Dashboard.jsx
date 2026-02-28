import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';
import HeroProgress from '../components/HeroProgress';
import SubjectCard from '../components/SubjectCard';
import Countdown from '../components/Countdown';

export default function Dashboard() {
    const { getOverallProgress, getSubjectProgress, hasAnyProgress } = useProgress();
    const overall = getOverallProgress();
    const navigate = useNavigate();

    // Calculate total and completed topics across all subjects
    const totalTopics = subjects.reduce((acc, curr) => acc + curr.topics.length, 0);
    const completedTopics = subjects.reduce((acc, curr) => acc + getSubjectProgress(curr.id).completed, 0);

    const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="glass-card p-6 md:p-12 mb-6 md:mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-12">
                <div className="max-w-xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-3 md:mb-4 leading-tight">
                        Welcome back, <br />
                        <span className="text-primary italic">Scholar</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-6 md:mb-8 font-medium">
                        {overall === 0
                            ? 'Start your journey — mark topics as you study them!'
                            : overall < 25
                                ? <span>Good start! You've covered <span className="text-emerald-600 dark:text-emerald-400 font-bold">{overall}%</span> of the syllabus. Keep going!</span>
                                : overall < 50
                                    ? <span>Solid progress — <span className="text-emerald-600 dark:text-emerald-400 font-bold">{overall}%</span> done. Consistency is key!</span>
                                    : overall < 75
                                        ? <span>More than halfway! <span className="text-emerald-600 dark:text-emerald-400 font-bold">{overall}%</span> mastered. You're on track!</span>
                                        : <span>Almost there! <span className="text-emerald-600 dark:text-emerald-400 font-bold">{overall}%</span> mastered. The finish line is near!</span>
                        }
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-slate-50 dark:bg-dark-surface rounded-2xl p-3 md:p-4 flex-1 min-w-[160px] md:min-w-[200px] border border-slate-100 dark:border-dark-border">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Target</span>
                            <span className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-200 underline decoration-primary decoration-4 underline-offset-4 cursor-default">GATE 2027 Examination</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-dark-surface rounded-2xl p-3 md:p-4 flex-1 min-w-[160px] md:min-w-[200px] border border-slate-100 dark:border-dark-border">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Time Remaining</span>
                            <div className="flex items-center gap-2">
                                <Countdown />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <HeroProgress
                        percentage={overall}
                        totalTopics={totalTopics}
                        completedTopics={completedTopics}
                    />
                </div>
            </section>

            {/* Subject Grid Header */}
            <div className="flex items-center justify-between mb-6 md:mb-8 px-1 md:px-2">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Your Subjects</h2>
                <button
                    onClick={() => navigate('/subjects')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 group"
                >
                    View All Subjects <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>


            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-1">
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
            <motion.div
                className="text-center mt-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">GATEflow · Crafted for Excellence · 2027 Aspirant Portal</p>
            </motion.div>
        </div>
    );
}
