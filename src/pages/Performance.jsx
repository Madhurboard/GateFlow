import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, Flame, AlertTriangle } from 'lucide-react';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';

const months = ['Nov', 'Dec', 'Jan'];
const daysInMonth = [30, 31, 31];

function generateHeatmapData() {
    const data = [];
    for (let m = 0; m < 3; m++) {
        for (let d = 0; d < daysInMonth[m]; d++) {
            data.push(Math.floor(Math.random() * 5));
        }
    }
    return data;
}

const heatmapData = generateHeatmapData();
const heatmapColors = ['bg-slate-100', 'bg-blue-100', 'bg-blue-200', 'bg-blue-400', 'bg-blue-600'];

const weakTopics = [
    { name: 'Instruction Pipelining', subject: 'COA', score: 35 },
    { name: 'Pumping Lemma', subject: 'TOC', score: 40 },
    { name: 'Normalization (BCNF)', subject: 'DBMS', score: 42 },
    { name: 'Page Replacement', subject: 'OS', score: 45 },
    { name: 'Dynamic Programming', subject: 'Algorithms', score: 48 },
];

export default function Performance() {
    const { getSubjectProgress, getOverallProgress } = useProgress();
    const overall = getOverallProgress();

    const subjectData = subjects.map(s => ({
        name: s.name.replace('\n', ' '),
        icon: s.icon,
        ...getSubjectProgress(s.id),
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Performance</h1>
                <p className="text-slate-500 mt-1">Track your progress and identify areas for improvement</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Overall Score', value: `${overall}%`, icon: TrendingUp, color: 'text-primary' },
                    { label: 'Topics Mastered', value: `${subjectData.reduce((a, s) => a + s.completed, 0)} / ${subjectData.reduce((a, s) => a + s.total, 0)}`, icon: Target, color: 'text-emerald-600' },
                    { label: 'Avg Quiz Score', value: '72%', icon: Award, color: 'text-amber-500' },
                    { label: 'Study Streak', value: '5 days', icon: Flame, color: 'text-red-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="glass-card p-5"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <stat.icon size={16} className={stat.color} />
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Subject-wise Performance */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-5">Subject-wise Performance</h2>
                <div className="space-y-3">
                    {subjectData.map((s, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-lg w-8">{s.icon}</span>
                            <span className="text-sm font-medium text-slate-700 w-48 truncate">{s.name}</span>
                            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${s.percentage}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                />
                            </div>
                            <span className="text-sm font-bold text-slate-600 w-10 text-right">{s.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Heatmap */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Study Activity</h2>
                    <div className="flex gap-1 mb-3">
                        {months.map(m => (
                            <span key={m} className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex-1">{m}</span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-[3px]">
                        {heatmapData.map((val, i) => (
                            <div key={i} className={`w-3 h-3 rounded-sm ${heatmapColors[val]}`} title={`Activity level: ${val}`} />
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 mt-4 justify-end">
                        <span className="text-[10px] text-slate-400">Less</span>
                        {heatmapColors.map((c, i) => (
                            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                        ))}
                        <span className="text-[10px] text-slate-400">More</span>
                    </div>
                </div>

                {/* Weak Topics */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle size={18} className="text-amber-500" />
                        <h2 className="text-lg font-bold text-slate-800">Weak Topics</h2>
                    </div>
                    <div className="space-y-3">
                        {weakTopics.map((topic, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">{topic.name}</p>
                                    <p className="text-[11px] text-slate-400 font-semibold">{topic.subject}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-red-500">{topic.score}%</span>
                                    <button className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-2.5 py-1 rounded-lg hover:bg-primary/20 transition-colors">
                                        Retry
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
