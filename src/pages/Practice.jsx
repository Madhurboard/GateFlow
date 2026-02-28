import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, FileText, ChevronRight, Award } from 'lucide-react';
import { useQuiz } from '../hooks/useQuiz';

const quizModes = [
    {
        title: 'Topic Quiz',
        desc: 'Pick a subject and topic, answer 10 targeted questions.',
        icon: BookOpen,
        color: 'bg-blue-50 text-primary',
        badge: '10 Qs',
        link: '/practice/quiz?type=topic',
    },
    {
        title: 'Full Mock Test',
        desc: 'Simulate real GATE: 30 questions across all subjects.',
        icon: Clock,
        color: 'bg-amber-50 text-amber-600',
        badge: '30 Qs',
        link: '/practice/quiz?type=mock',
    },
    {
        title: 'Quick Challenge',
        desc: 'Random 10 questions from any subject. Test your breadth!',
        icon: FileText,
        color: 'bg-emerald-50 text-emerald-600',
        badge: 'Random',
        link: '/practice/quiz?type=mock',
    },
];

function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(seconds) {
    if (!seconds) return '—';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m >= 60) {
        const h = Math.floor(m / 60);
        const rm = m % 60;
        return `${h}h ${rm}m`;
    }
    return `${m} min`;
}

export default function Practice() {
    const navigate = useNavigate();
    const { getAttemptHistory } = useQuiz();
    const recentAttempts = getAttemptHistory(10);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-2">
                    <Award className="text-primary" size={28} />
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Practice Mode</h1>
                </div>
                <p className="text-slate-500 max-w-xl">
                    Test your knowledge with topic-wise quizzes, full mock tests, and challenge yourself with random questions.
                </p>
            </div>

            {/* Quick Start Cards */}
            <div>
                <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Start</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {quizModes.map((mode, i) => (
                        <motion.div
                            key={mode.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => navigate(mode.link)}
                            className="glass-card p-6 cursor-pointer group hover:scale-[1.02] transition-transform"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${mode.color}`}>
                                    <mode.icon size={22} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">
                                    {mode.badge}
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-slate-800 mb-1">{mode.title}</h3>
                            <p className="text-sm text-slate-400 mb-4 leading-relaxed">{mode.desc}</p>
                            <button className="flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all">
                                Start Now <ChevronRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recent Attempts */}
            <div>
                <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Attempts</h2>
                {recentAttempts.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <p className="text-slate-400 font-semibold mb-1">No quiz attempts yet</p>
                        <p className="text-sm text-slate-300">Start a quiz above to track your progress here!</p>
                    </div>
                ) : (
                    <div className="glass-card overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                    <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Type</th>
                                    <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Subject</th>
                                    <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Score</th>
                                    <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentAttempts.map((a, i) => {
                                    const percent = Math.round((a.score / a.total) * 100);
                                    return (
                                        <tr key={a.id || i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="py-3.5 px-5 text-sm text-slate-500">{formatDate(a.date)}</td>
                                            <td className="py-3.5 px-5">
                                                <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-lg">{a.type}</span>
                                            </td>
                                            <td className="py-3.5 px-5 text-sm font-medium text-slate-700">{a.subjectName || 'Mixed'}</td>
                                            <td className="py-3.5 px-5">
                                                <span className={`text-sm font-bold ${percent >= 80 ? 'text-emerald-600' : percent >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                                                    {a.score}/{a.total}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-5 text-sm text-slate-400">{formatTime(a.timeSeconds)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
