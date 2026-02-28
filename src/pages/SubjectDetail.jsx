import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';

export default function SubjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getTopicState, cycleTopicState, getSubjectProgress, getSubtopicState, toggleSubtopicState } = useProgress();

    const subject = subjects.find((s) => s.id === id);

    if (!subject) {
        return (
            <div className="flex items-center justify-center py-32">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Subject Not Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary hover:underline font-semibold"
                    >
                        ← Go Home
                    </button>
                </div>
            </div>
        );
    }

    const progress = getSubjectProgress(subject.id);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-primary font-bold text-sm mb-4 flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-4">
                        <span className="text-5xl">{subject.icon}</span>
                        {subject.name.replace('\n', ' ')}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        {subject.topics.length} topics · {subject.topics.reduce((a, t) => a + t.subtopics.length, 0)} subtopics
                    </p>
                </div>

                <div className="glass-card p-6 flex flex-col items-center justify-center min-w-[200px]">
                    <div className="text-4xl font-black text-primary mb-1">
                        {progress.percentage}%
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Subject Mastery</div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${progress.percentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Topics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-3">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Syllabus Progress</h2>
                    {subject.topics.map((topic, i) => {
                        const topicState = getTopicState(topic.id);
                        const completedSubs = topic.subtopics.filter(s => getSubtopicState(s.id)).length;
                        return (
                            <TopicAccordion
                                key={topic.id}
                                topic={topic}
                                topicState={topicState}
                                completedSubs={completedSubs}
                                onCycleTopic={() => cycleTopicState(topic.id)}
                                getSubtopicState={getSubtopicState}
                                toggleSubtopicState={toggleSubtopicState}
                                index={i}
                            />
                        );
                    })}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <span className="text-primary">⚡</span> Quick Stats
                        </h3>
                        <div className="space-y-4">
                            <StatRow label="Mastered" value={progress.completed} total={progress.total} color="text-emerald-600 dark:text-emerald-400" />
                            <StatRow label="In Progress" value={progress.inProgress} total={progress.total} color="text-amber-600 dark:text-amber-400" />
                            <StatRow label="Not Started" value={progress.total - progress.completed - progress.inProgress} total={progress.total} color="text-slate-400 dark:text-slate-500" />
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-primary dark:bg-primary/90">
                        <h3 className="text-white font-bold mb-2">Practice Mode</h3>
                        <p className="text-white/70 text-sm mb-4">Test your knowledge with handpicked PYQs.</p>
                        <button
                            onClick={() => navigate(`/practice/quiz?type=topic&subject=${subject.id}`)}
                            className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StatRow({ label, value, total, color }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</span>
            <span className={`text-sm font-bold ${color}`}>{value} / {total}</span>
        </div>
    );
}

const statusConfig = {
    not_started: { bg: 'bg-slate-50 dark:bg-slate-800', dot: 'bg-slate-200 dark:bg-slate-600', color: 'text-slate-400', label: 'Not Started' },
    in_progress: { bg: 'bg-amber-50 dark:bg-amber-900/30', dot: 'bg-amber-400', color: 'text-amber-600 dark:text-amber-400', label: 'In Progress' },
    confident: { bg: 'bg-emerald-50 dark:bg-emerald-900/30', dot: 'bg-emerald-500', color: 'text-emerald-700 dark:text-emerald-400', label: 'Mastered' },
};

function TopicAccordion({ topic, topicState, completedSubs, onCycleTopic, getSubtopicState, toggleSubtopicState, index }) {
    const [open, setOpen] = useState(false);
    const cfg = statusConfig[topicState];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="glass-card overflow-hidden"
        >
            <div
                className={`p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 dark:hover:bg-dark-hover transition-colors ${open ? 'bg-slate-50/50 dark:bg-dark-hover/50' : ''}`}
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                    <div>
                        <h4 className="text-[15px] font-bold text-slate-800 dark:text-slate-100">{topic.name}</h4>
                        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            {completedSubs} / {topic.subtopics.length} subtopics done
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); onCycleTopic(); }}
                        className={`px-2.5 py-1 rounded-lg ${cfg.bg} border border-black/5 dark:border-white/5`}
                    >
                        <span className={`text-[10px] font-black uppercase tracking-widest ${cfg.color}`}>
                            {cfg.label}
                        </span>
                    </button>
                    <motion.div animate={{ rotate: open ? 180 : 0 }} className="text-slate-300 dark:text-slate-600">
                        <ChevronDown size={18} />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="px-5 pb-5 pt-1 space-y-1">
                            {topic.subtopics.map((sub) => {
                                const checked = getSubtopicState(sub.id);
                                return (
                                    <div
                                        key={sub.id}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-hover transition-all cursor-pointer group"
                                        onClick={() => toggleSubtopicState(sub.id)}
                                    >
                                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checked ? 'bg-primary border-primary' : 'border-slate-200 dark:border-slate-600 group-hover:border-slate-300 dark:group-hover:border-slate-500'
                                            }`}>
                                            {checked && <Check size={14} className="text-white stroke-[3px]" />}
                                        </div>
                                        <span className={`text-sm font-medium ${checked ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-600 dark:text-slate-300'}`}>
                                            {sub.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
