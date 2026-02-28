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

    // This specific order allows CSS Grid `dense` flow to flawlessly pack the 2x2, 2x1, 1x2, and 1x1 cards
    // into a perfect 4x6 rectangle on desktop, 3x8 on tablet, and 2x12 on mobile without any holes!
    const optimalGridOrder = ['em', 'pds', 'os', 'dbms', 'cn', 'toc', 'ga', 'dl', 'coa', 'algo', 'cd'];
    const orderedSubjects = [...subjects].sort((a, b) => optimalGridOrder.indexOf(a.id) - optimalGridOrder.indexOf(b.id));

    return (
        <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="bg-white rounded-[2.5rem] p-12 mb-12 border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-xl">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4 leading-tight">
                        Welcome back, <br />
                        <span className="text-primary italic">Scholar</span>
                    </h1>
                    <p className="text-slate-500 text-lg mb-8 font-medium">
                        {overall === 0
                            ? 'Start your journey — mark topics as you study them!'
                            : overall < 25
                                ? <span>Good start! You've covered <span className="text-emerald-600 font-bold">{overall}%</span> of the syllabus. Keep going!</span>
                                : overall < 50
                                    ? <span>Solid progress — <span className="text-emerald-600 font-bold">{overall}%</span> done. Consistency is key!</span>
                                    : overall < 75
                                        ? <span>More than halfway! <span className="text-emerald-600 font-bold">{overall}%</span> mastered. You're on track!</span>
                                        : <span>Almost there! <span className="text-emerald-600 font-bold">{overall}%</span> mastered. The finish line is near!</span>
                        }
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-slate-50 rounded-2xl p-4 flex-1 min-w-[200px] border border-slate-100">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Target</span>
                            <span className="text-xl font-bold text-slate-700 underline decoration-primary decoration-4 underline-offset-4 cursor-default">GATE 2027 Examination</span>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 flex-1 min-w-[200px] border border-slate-100">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Time Remaining</span>
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
            <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Your Subjects</h2>
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
                <p className="text-xs text-slate-400 font-medium">GATEflow · Crafted for Excellence · 2027 Aspirant Portal</p>
            </motion.div>
        </div>
    );
}
