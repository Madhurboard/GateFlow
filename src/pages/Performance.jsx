import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, Flame, AlertTriangle } from 'lucide-react';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';
import { useQuiz } from '../hooks/useQuiz';

function buildHeatmapData(streakDates) {
    const today = new Date();
    const data = [];
    const dateCountMap = {};
    (streakDates || []).forEach(d => {
        dateCountMap[d] = (dateCountMap[d] || 0) + 1;
    });
    for (let i = 89; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const count = dateCountMap[dateStr] || 0;
        const level = count === 0 ? 0 : Math.min(count, 4);
        data.push({ date: dateStr, level });
    }
    return data;
}

function getMonthLabels(data) {
    const labels = [];
    let lastMonth = '';
    data.forEach((d, i) => {
        const month = new Date(d.date).toLocaleDateString('en-US', { month: 'short' });
        if (month !== lastMonth) {
            labels.push({ month, index: i });
            lastMonth = month;
        }
    });
    return labels;
}

const heatmapColors = [
    'bg-slate-100 dark:bg-slate-800',
    'bg-blue-100 dark:bg-blue-900/60',
    'bg-blue-200 dark:bg-blue-800/80',
    'bg-blue-400 dark:bg-blue-600',
    'bg-blue-600 dark:bg-blue-500'
];

export default function Performance() {
    const { getSubjectProgress, getOverallProgress, getStreak, streakDates } = useProgress();
    const { getAverageScore, getWeakTopics, getQuizCount } = useQuiz();
    const overall = getOverallProgress();
    const streak = getStreak();
    const avgScore = getAverageScore();
    const weakTopics = getWeakTopics();
    const quizCount = getQuizCount();

    const subjectData = subjects.map(s => ({
        name: s.name.replace('\n', ' '),
        icon: s.icon,
        ...getSubjectProgress(s.id),
    }));

    const heatmapData = useMemo(() => buildHeatmapData(streakDates), [streakDates]);
    const monthLabels = useMemo(() => getMonthLabels(heatmapData), [heatmapData]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Performance</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Track your progress and identify areas for improvement</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Overall Score', value: `${overall}%`, icon: TrendingUp, color: 'text-primary' },
                    { label: 'Topics Mastered', value: `${subjectData.reduce((a, s) => a + s.completed, 0)} / ${subjectData.reduce((a, s) => a + s.total, 0)}`, icon: Target, color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Avg Quiz Score', value: quizCount > 0 ? `${avgScore}%` : '—', icon: Award, color: 'text-amber-500 dark:text-amber-400' },
                    { label: 'Study Streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, icon: Flame, color: 'text-red-500 dark:text-red-400' },
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
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Subject-wise Performance */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">Subject-wise Performance</h2>
                <div className="space-y-3">
                    {subjectData.map((s, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-lg w-8">{s.icon}</span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-24 sm:w-48 truncate">{s.name}</span>
                            <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${s.percentage}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                />
                            </div>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 w-10 text-right">{s.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Heatmap */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Study Activity (Last 90 Days)</h2>
                    <div className="flex gap-6 mb-3">
                        {monthLabels.map(m => (
                            <span key={m.month + m.index} className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{m.month}</span>
                        ))}
                    </div>
                    <div className="overflow-x-auto hide-scrollbar">
                        <div className="flex flex-wrap gap-[3px] min-w-[280px]">
                            {heatmapData.map((val, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-sm ${heatmapColors[val.level]}`}
                                    title={`${val.date}: ${val.level > 0 ? 'Active' : 'No activity'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-4 justify-end">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Less</span>
                        {heatmapColors.map((c, i) => (
                            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                        ))}
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">More</span>
                    </div>
                </div>

                {/* Weak Topics */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle size={18} className="text-amber-500" />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Weak Topics</h2>
                    </div>
                    {weakTopics.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-slate-400 dark:text-slate-500 font-semibold mb-1">No weak topics identified</p>
                            <p className="text-sm text-slate-300 dark:text-slate-600">Take some quizzes to see which topics need work!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {weakTopics.map((topic, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-dark-surface hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{topic.topicName}</p>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">{topic.subjectName}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-red-500 dark:text-red-400">{topic.score}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
