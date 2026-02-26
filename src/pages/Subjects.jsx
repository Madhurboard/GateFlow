import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';

const filters = ['All', 'In Progress', 'Not Started', 'Mastered'];

export default function Subjects() {
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const { getSubjectProgress } = useProgress();
    const navigate = useNavigate();

    const filtered = subjects
        .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
        .filter(s => {
            if (activeFilter === 'All') return true;
            const prog = getSubjectProgress(s.id);
            if (activeFilter === 'Mastered') return prog.status === 'confident';
            if (activeFilter === 'In Progress') return prog.status === 'in_progress';
            if (activeFilter === 'Not Started') return prog.status === 'not_started';
            return true;
        });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">All Subjects</h1>
                <p className="text-slate-500 mt-1">Track your progress across all GATE CSE topics</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search subjects..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === f
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Subject Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((subject, i) => {
                    const prog = getSubjectProgress(subject.id);
                    return (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => navigate(`/subject/${subject.id}`)}
                            className="glass-card p-6 cursor-pointer group hover:scale-[1.02] transition-transform"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-3xl">{subject.icon}</span>
                                <div className="relative w-12 h-12">
                                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                                        <circle
                                            cx="18" cy="18" r="15.5" fill="none"
                                            stroke="#3B82F6" strokeWidth="3"
                                            strokeDasharray={`${prog.percentage} 100`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700">
                                        {prog.percentage}%
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-base font-bold text-slate-800 mb-1 leading-tight">
                                {subject.name.replace('\n', ' ')}
                            </h3>
                            <p className="text-xs text-slate-400 font-semibold mb-3">
                                {prog.completed} / {prog.total} topics covered
                            </p>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${prog.percentage === 100 ? 'bg-emerald-500' :
                                            prog.percentage > 0 ? 'bg-primary' : 'bg-slate-200'
                                        }`}
                                    style={{ width: `${prog.percentage}%` }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                    <p className="text-lg font-semibold">No subjects found</p>
                    <p className="text-sm mt-1">Try a different search or filter</p>
                </div>
            )}
        </motion.div>
    );
}
