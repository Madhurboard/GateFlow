import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame, Clock, Target, Check } from 'lucide-react';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const scheduledSessions = {
    Mon: [
        { time: '9:00', subject: 'OS', topic: 'Memory Management', duration: '1hr', color: 'bg-blue-50 border-blue-200 text-blue-700' },
        { time: '14:00', subject: 'Algorithms', topic: 'Dynamic Programming', duration: '1.5hr', color: 'bg-purple-50 border-purple-200 text-purple-700' },
    ],
    Tue: [
        { time: '10:00', subject: 'DBMS', topic: 'Normalization', duration: '1hr', color: 'bg-amber-50 border-amber-200 text-amber-700' },
    ],
    Wed: [
        { time: '9:00', subject: 'CN', topic: 'TCP/IP', duration: '1hr', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
        { time: '16:00', subject: 'Practice', topic: '10 MCQs', duration: '30min', color: 'bg-slate-50 border-slate-200 text-slate-700' },
    ],
    Thu: [
        { time: '11:00', subject: 'TOC', topic: 'Pumping Lemma', duration: '1hr', color: 'bg-red-50 border-red-200 text-red-700' },
    ],
    Fri: [
        { time: '9:00', subject: 'COA', topic: 'Pipelining', duration: '1.5hr', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    ],
    Sat: [
        { time: '10:00', subject: 'Mock Test', topic: 'Full Simulation', duration: '3hr', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    ],
    Sun: [],
};

const todayTasks = [
    { text: 'Complete Graph Theory revision', done: true },
    { text: 'Practice 10 MCQs on Algorithms', done: false },
    { text: 'Revise Normalization (BCNF)', done: false },
    { text: 'Watch OS: Deadlocks lecture', done: false },
    { text: 'Solve PYQ 2024 Section A', done: false },
];

export default function Planner() {
    const [tasks, setTasks] = useState(todayTasks);

    const toggleTask = (i) => {
        setTasks(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Study Planner</h1>
                    <p className="text-slate-500 mt-1">Organize your weekly study schedule</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm">
                    <Plus size={18} /> Add Session
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5">
                {[
                    { label: 'This Week', value: '12 hrs', icon: Clock, color: 'text-primary' },
                    { label: 'Daily Average', value: '1.7 hrs', icon: Target, color: 'text-emerald-600' },
                    { label: 'Streak', value: '5 days', icon: Flame, color: 'text-amber-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-5 flex items-center gap-4"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                            <p className="text-xl font-extrabold text-slate-800">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Calendar */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-5">Weekly Schedule</h2>
                    <div className="grid grid-cols-7 gap-3">
                        {weekDays.map(day => (
                            <div key={day} className="min-h-[200px]">
                                <div className={`text-center py-2 mb-3 rounded-lg text-xs font-black uppercase tracking-widest ${day === 'Wed' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500'
                                    }`}>
                                    {day}
                                </div>
                                <div className="space-y-2">
                                    {(scheduledSessions[day] || []).map((session, i) => (
                                        <div
                                            key={i}
                                            className={`p-2.5 rounded-xl border text-[11px] leading-tight ${session.color}`}
                                        >
                                            <p className="font-bold">{session.subject}</p>
                                            <p className="opacity-70 mt-0.5">{session.topic}</p>
                                            <p className="mt-1 font-semibold opacity-60">{session.time} · {session.duration}</p>
                                        </div>
                                    ))}
                                    {(!scheduledSessions[day] || scheduledSessions[day].length === 0) && (
                                        <div className="text-center text-slate-300 text-xs py-6">Rest day</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Today's Tasks */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Today's Tasks</h2>
                    <div className="space-y-2">
                        {tasks.map((task, i) => (
                            <div
                                key={i}
                                onClick={() => toggleTask(i)}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${task.done ? 'bg-primary border-primary' : 'border-slate-200 group-hover:border-slate-300'
                                    }`}>
                                    {task.done && <Check size={14} className="text-white stroke-[3px]" />}
                                </div>
                                <span className={`text-sm ${task.done ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                    {task.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400 font-semibold">
                            {tasks.filter(t => t.done).length} / {tasks.length} completed
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
