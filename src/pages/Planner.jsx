import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Flame, Clock, Target, Check, X, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useProgress } from '../hooks/useProgress';

const subjectOptions = ['OS', 'DBMS', 'CN', 'TOC', 'COA', 'Algorithms', 'Compiler Design', 'Eng. Math', 'PDS', 'Digital Logic', 'General Aptitude', 'Practice', 'Mock Test', 'Revision'];
const colorOptions = [
    { label: 'Blue', classes: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'Purple', classes: 'bg-purple-50 border-purple-200 text-purple-700' },
    { label: 'Amber', classes: 'bg-amber-50 border-amber-200 text-amber-700' },
    { label: 'Green', classes: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { label: 'Red', classes: 'bg-red-50 border-red-200 text-red-700' },
    { label: 'Indigo', classes: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { label: 'Slate', classes: 'bg-slate-50 border-slate-200 text-slate-700' },
];

const defaultSessions = [
    { id: 1, day: 0, time: '09:00', subject: 'OS', topic: 'Memory Management', duration: '1hr', colorIdx: 0 },
    { id: 2, day: 0, time: '14:00', subject: 'Algorithms', topic: 'Dynamic Programming', duration: '1.5hr', colorIdx: 1 },
    { id: 3, day: 1, time: '10:00', subject: 'DBMS', topic: 'Normalization', duration: '1hr', colorIdx: 2 },
    { id: 4, day: 2, time: '09:00', subject: 'CN', topic: 'TCP/IP', duration: '1hr', colorIdx: 3 },
    { id: 5, day: 2, time: '16:00', subject: 'Practice', topic: '10 MCQs', duration: '30min', colorIdx: 6 },
    { id: 6, day: 3, time: '11:00', subject: 'TOC', topic: 'Pumping Lemma', duration: '1hr', colorIdx: 4 },
    { id: 7, day: 4, time: '09:00', subject: 'COA', topic: 'Pipelining', duration: '1.5hr', colorIdx: 5 },
    { id: 8, day: 5, time: '10:00', subject: 'Mock Test', topic: 'Full Simulation', duration: '3hr', colorIdx: 0 },
];

const defaultTasks = [
    { id: 1, text: 'Complete Graph Theory revision', done: false },
    { id: 2, text: 'Practice 10 MCQs on Algorithms', done: false },
    { id: 3, text: 'Revise Normalization (BCNF)', done: false },
    { id: 4, text: 'Watch OS: Deadlocks lecture', done: false },
    { id: 5, text: 'Solve PYQ 2024 Section A', done: false },
];

function getWeekDates(offset = 0) {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1 + offset * 7);
    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        days.push({ name: dayNames[i], date: d.getDate(), month: d.toLocaleDateString('en-US', { month: 'short' }), isToday: d.toDateString() === now.toDateString() });
    }
    return days;
}

export default function Planner() {
    const [sessions, setSessions] = useLocalStorage('gateflow_planner_sessions', defaultSessions);
    const [tasks, setTasks] = useLocalStorage('gateflow_planner_tasks', defaultTasks);
    const [showModal, setShowModal] = useState(false);
    const [editingSession, setEditingSession] = useState(null);
    const [weekOffset, setWeekOffset] = useState(0);
    const [newTask, setNewTask] = useState('');
    const { getStreak } = useProgress();

    const weekDays = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
    let nextId = Math.max(...sessions.map(s => s.id), ...tasks.map(t => t.id), 0) + 1;

    const toggleTask = (id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks(prev => [...prev, { id: nextId++, text: newTask.trim(), done: false }]);
        setNewTask('');
    };

    const deleteSession = (id) => {
        setSessions(prev => prev.filter(s => s.id !== id));
    };

    const openAddSession = (day = 0) => {
        setEditingSession({ id: null, day, time: '09:00', subject: subjectOptions[0], topic: '', duration: '1hr', colorIdx: 0 });
        setShowModal(true);
    };

    const openEditSession = (session) => {
        setEditingSession({ ...session });
        setShowModal(true);
    };

    const saveSession = () => {
        if (!editingSession.topic.trim()) return;
        if (editingSession.id) {
            setSessions(prev => prev.map(s => s.id === editingSession.id ? editingSession : s));
        } else {
            setSessions(prev => [...prev, { ...editingSession, id: nextId++ }]);
        }
        setShowModal(false);
        setEditingSession(null);
    };

    const totalHours = sessions.reduce((a, s) => {
        const match = s.duration.match(/([\d.]+)/);
        return a + (match ? parseFloat(match[1]) : 0);
    }, 0);

    const streak = getStreak();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Study Planner</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">Organize your weekly study schedule</p>
                </div>
                <button onClick={() => openAddSession()} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm w-full sm:w-auto justify-center">
                    <Plus size={18} /> Add Session
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {[
                    { label: 'This Week', value: `${totalHours} hrs`, icon: Clock, color: 'text-primary' },
                    { label: 'Daily Average', value: `${(totalHours / 7).toFixed(1)} hrs`, icon: Target, color: 'text-emerald-600' },
                    { label: 'Streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, icon: Flame, color: 'text-amber-500' },
                ].map((stat, i) => (
                    <div key={stat.label} className="glass-card p-4 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-slate-50 dark:bg-dark-surface flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{stat.label}</p>
                            <p className="text-lg font-extrabold text-slate-800 dark:text-slate-100">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Calendar */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Weekly Schedule</h2>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setWeekOffset(o => o - 1)} className="p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-hover text-slate-400"><ChevronLeft size={18} /></button>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 min-w-[100px] text-center">{weekDays[0].month} {weekDays[0].date} – {weekDays[6].date}</span>
                            <button onClick={() => setWeekOffset(o => o + 1)} className="p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-hover text-slate-400"><ChevronRight size={18} /></button>
                        </div>
                    </div>
                    <div className="overflow-x-auto hide-scrollbar -mx-2 px-2">
                        <div className="grid grid-cols-7 gap-2 min-w-[700px]">
                            {weekDays.map((day, di) => (
                                <div key={di} className="min-h-[200px]">
                                    <div className={`text-center py-2 mb-2 rounded-lg ${day.isToday ? 'bg-primary text-white' : 'bg-slate-50 dark:bg-dark-surface text-slate-500 dark:text-slate-400'}`}>
                                        <div className="text-[10px] font-black uppercase tracking-widest">{day.name}</div>
                                        <div className="text-sm font-bold">{day.date}</div>
                                    </div>
                                    <div className="space-y-1.5">
                                        {sessions.filter(s => s.day === di).map(session => (
                                            <div
                                                key={session.id}
                                                onClick={() => openEditSession(session)}
                                                className={`p-2 rounded-xl border text-[10px] leading-tight cursor-pointer hover:shadow-sm transition-shadow relative group ${colorOptions[session.colorIdx].classes}`}
                                            >
                                                <button onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <X size={10} />
                                                </button>
                                                <p className="font-bold">{session.subject}</p>
                                                <p className="opacity-70 mt-0.5 truncate">{session.topic}</p>
                                                <p className="mt-1 font-semibold opacity-60">{session.time} · {session.duration}</p>
                                            </div>
                                        ))}
                                        <button onClick={() => openAddSession(di)} className="w-full py-2 text-slate-300 dark:text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-xs">
                                            <Plus size={14} className="mx-auto" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Today's Tasks */}
                <div className="glass-card p-6 flex flex-col">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Today's Tasks</h2>
                    <div className="flex-1 space-y-1">
                        {tasks.map(task => (
                            <div key={task.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-hover transition-colors group">
                                <div
                                    onClick={() => toggleTask(task.id)}
                                    className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-all ${task.done ? 'bg-primary border-primary' : 'border-slate-200 dark:border-slate-600 group-hover:border-slate-300 dark:group-hover:border-slate-500'
                                        }`}
                                >
                                    {task.done && <Check size={14} className="text-white stroke-[3px]" />}
                                </div>
                                <span className={`text-sm flex-1 ${task.done ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-600 dark:text-slate-300'}`}>{task.text}</span>
                                <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-dark-border">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTask}
                                onChange={e => setNewTask(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addTask()}
                                placeholder="Add a new task..."
                                className="flex-1 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                            <button onClick={addTask} className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-2 text-center">
                            {tasks.filter(t => t.done).length} / {tasks.length} completed
                        </p>
                    </div>
                </div>
            </div>

            {/* Add/Edit Session Modal */}
            <AnimatePresence>
                {showModal && editingSession && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 dark:border-dark-border"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{editingSession.id ? 'Edit Session' : 'Add Study Session'}</h3>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X size={20} /></button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Day</label>
                                    <select value={editingSession.day} onChange={e => setEditingSession({ ...editingSession, day: +e.target.value })} className="w-full bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d, i) => <option key={i} value={i}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Time</label>
                                        <input type="time" value={editingSession.time} onChange={e => setEditingSession({ ...editingSession, time: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Duration</label>
                                        <select value={editingSession.duration} onChange={e => setEditingSession({ ...editingSession, duration: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                                            {['30min', '45min', '1hr', '1.5hr', '2hr', '2.5hr', '3hr'].map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Subject</label>
                                    <select value={editingSession.subject} onChange={e => setEditingSession({ ...editingSession, subject: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                                        {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Topic / Description</label>
                                    <input type="text" value={editingSession.topic} onChange={e => setEditingSession({ ...editingSession, topic: e.target.value })} placeholder="e.g. Memory Management" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Color</label>
                                    <div className="flex gap-2">
                                        {colorOptions.map((c, i) => (
                                            <button key={i} onClick={() => setEditingSession({ ...editingSession, colorIdx: i })} className={`w-8 h-8 rounded-lg border-2 transition-all ${c.classes} ${editingSession.colorIdx === i ? 'ring-2 ring-primary ring-offset-1' : ''}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                {editingSession.id && (
                                    <button onClick={() => { deleteSession(editingSession.id); setShowModal(false); }} className="px-4 py-2.5 text-red-500 border border-red-200 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors">
                                        Delete
                                    </button>
                                )}
                                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-dark-hover transition-colors">Cancel</button>
                                <button onClick={saveSession} className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
                                    {editingSession.id ? 'Save Changes' : 'Add Session'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
