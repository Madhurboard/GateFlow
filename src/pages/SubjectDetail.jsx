import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subjects } from '../data';
import { useProgress } from '../hooks/useProgress';
import TopicRow from '../components/TopicRow';

export default function SubjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getTopicState, cycleTopicState, getSubjectProgress, getSubtopicState, toggleSubtopicState } = useProgress();

    const subject = subjects.find((s) => s.id === id);

    // Handle not found
    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Subject Not Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary hover:text-white transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    const progress = getSubjectProgress(subject.id);

    return (
        <div className="animate-in fade-in duration-700">
            {/* Header / Breadcrumb area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary font-bold text-sm mb-4 flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-4">
                        <span className="text-5xl">{subject.icon}</span>
                        {subject.name}
                    </h1>
                </div>

                <div className="glass-card p-6 flex flex-col items-center justify-center min-w-[200px]">
                    <div className="text-4xl font-black text-primary mb-1">
                        {progress.percentage}%
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject Mastery</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Topics List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Syllabus Progress</h2>
                    <div className="space-y-4">
                        {subject.topics.map((topic) => (
                            <TopicRow
                                key={topic.id}
                                topic={topic}
                                progress={progress.topics[topic.id] || { status: 'not_started', subtopics: [] }}
                                onToggleSubtopic={(subtopicId) => toggleSubtopic(subject.id, topic.id, subtopicId)}
                            />
                        ))}
                    </div>
                </div>

                {/* Sidebar Column: Resources & Insights */}
                <div className="space-y-6">
                    <div className="glass-card p-8 bg-slate-50/50">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="text-primary">⚡</span> Key Insights
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary-light flex-shrink-0 flex items-center justify-center text-primary">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Topic Analysis</p>
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed">Focus more on <span className="text-slate-900 border-b-2 border-primary-light">Deadlocks</span> - historically 15% of GATE questions.</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Mastery Checklist</p>
                                <ul className="space-y-3">
                                    {[
                                        'Standard Formulae',
                                        'Previous Year Questions',
                                        'Short Notes Generated'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 bg-primary">
                        <h3 className="text-white font-bold mb-2">Practice Mode</h3>
                        <p className="text-white/70 text-sm mb-6">Test your knowledge with 50+ handpicked PYQs.</p>
                        <button className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
