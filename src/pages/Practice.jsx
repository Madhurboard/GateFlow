import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, FileText, ChevronRight, Award } from 'lucide-react';

const quizModes = [
    {
        title: 'Topic Quiz',
        desc: 'Pick a subject and topic, answer 10 targeted questions.',
        icon: BookOpen,
        color: 'bg-blue-50 text-primary',
        badge: '10 Qs',
    },
    {
        title: 'Full Mock Test',
        desc: 'Simulate real GATE: 65 questions across all subjects, 3 hours.',
        icon: Clock,
        color: 'bg-amber-50 text-amber-600',
        badge: '3 Hrs',
    },
    {
        title: 'Previous Year Papers',
        desc: 'Practice with real GATE papers from 2022-2024.',
        icon: FileText,
        color: 'bg-emerald-50 text-emerald-600',
        badge: '3 Papers',
    },
];

const recentAttempts = [
    { date: 'Feb 25, 2026', type: 'Topic Quiz', subject: 'Operating Systems', score: '8/10', time: '12 min', percent: 80 },
    { date: 'Feb 24, 2026', type: 'Mock Test', subject: 'All Subjects', score: '48/65', time: '2h 45m', percent: 74 },
    { date: 'Feb 23, 2026', type: 'Topic Quiz', subject: 'Algorithms', score: '7/10', time: '15 min', percent: 70 },
    { date: 'Feb 22, 2026', type: 'PYQ 2024', subject: 'All Subjects', score: '42/65', time: '2h 50m', percent: 65 },
    { date: 'Feb 21, 2026', type: 'Topic Quiz', subject: 'DBMS', score: '9/10', time: '10 min', percent: 90 },
];

export default function Practice() {
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
                    Test your knowledge with topic-wise quizzes, full mock tests, and previous year GATE papers.
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
                <div className="glass-card overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Type</th>
                                <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Subject</th>
                                <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Score</th>
                                <th className="text-left py-3 px-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Time</th>
                                <th className="text-right py-3 px-5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAttempts.map((a, i) => (
                                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3.5 px-5 text-sm text-slate-500">{a.date}</td>
                                    <td className="py-3.5 px-5">
                                        <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-lg">{a.type}</span>
                                    </td>
                                    <td className="py-3.5 px-5 text-sm font-medium text-slate-700">{a.subject}</td>
                                    <td className="py-3.5 px-5">
                                        <span className={`text-sm font-bold ${a.percent >= 80 ? 'text-emerald-600' : a.percent >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                                            {a.score}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-5 text-sm text-slate-400">{a.time}</td>
                                    <td className="py-3.5 px-5 text-right">
                                        <button className="text-xs font-bold text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-all">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
