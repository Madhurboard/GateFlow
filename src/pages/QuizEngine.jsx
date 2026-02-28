import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, Target, Zap } from 'lucide-react';
import { subjects } from '../data';
import { useQuiz } from '../hooks/useQuiz';

const QUIZ_STATES = { SETUP: 'setup', ACTIVE: 'active', RESULTS: 'results' };

export default function QuizEngine() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { getQuestions, getMockTestQuestions, saveAttempt } = useQuiz();

    // State
    const [quizState, setQuizState] = useState(QUIZ_STATES.SETUP);
    const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '');
    const [selectedTopic, setSelectedTopic] = useState(searchParams.get('topic') || '');
    const [quizType, setQuizType] = useState(searchParams.get('type') || 'topic');
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [results, setResults] = useState(null);
    const timerRef = useRef(null);

    // Available topics for selected subject
    const availableTopics = useMemo(() => {
        if (!selectedSubject) return [];
        const subj = subjects.find(s => s.id === selectedSubject);
        return subj ? subj.topics : [];
    }, [selectedSubject]);

    // Timer
    useEffect(() => {
        if (quizState === QUIZ_STATES.ACTIVE) {
            timerRef.current = setInterval(() => {
                setElapsedSeconds(s => s + 1);
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [quizState]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Start quiz
    const startQuiz = () => {
        let qs;
        if (quizType === 'mock') {
            qs = getMockTestQuestions(30);
        } else {
            qs = getQuestions(selectedSubject, selectedTopic || null, 10);
        }
        if (qs.length === 0) return;
        setQuizQuestions(qs);
        setCurrentIndex(0);
        setAnswers({});
        setShowExplanation(false);
        setElapsedSeconds(0);
        setQuizState(QUIZ_STATES.ACTIVE);
    };

    // Answer a question
    const selectAnswer = (answerIdx) => {
        if (answers[currentIndex] !== undefined) return; // Already answered
        setAnswers(prev => ({ ...prev, [currentIndex]: answerIdx }));
        setShowExplanation(true);
    };

    // Next question
    const nextQuestion = () => {
        setShowExplanation(false);
        if (currentIndex < quizQuestions.length - 1) {
            setCurrentIndex(i => i + 1);
        } else {
            finishQuiz();
        }
    };

    // Finish quiz
    const finishQuiz = () => {
        clearInterval(timerRef.current);
        const questionResults = quizQuestions.map((q, i) => ({
            id: q.id,
            topicId: q.topicId,
            subjectId: q.subjectId,
            userAnswer: answers[i] ?? -1,
            correct: answers[i] === q.correctAnswer,
        }));
        const score = questionResults.filter(r => r.correct).length;
        const total = quizQuestions.length;

        const subjectName = quizType === 'mock' ? 'All Subjects' :
            (subjects.find(s => s.id === selectedSubject)?.name.replace('\n', ' ') || selectedSubject);

        const attempt = {
            subjectId: selectedSubject || 'mixed',
            topicId: selectedTopic || null,
            subjectName,
            type: quizType === 'mock' ? 'Mock Test' : 'Topic Quiz',
            questions: questionResults,
            score,
            total,
            timeSeconds: elapsedSeconds,
        };

        const saved = saveAttempt(attempt);
        setResults({ ...attempt, ...saved });
        setQuizState(QUIZ_STATES.RESULTS);
    };

    // ─── SETUP SCREEN ───
    if (quizState === QUIZ_STATES.SETUP) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-2xl mx-auto">
                <button onClick={() => navigate('/practice')} className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    <ArrowLeft size={16} /> Back to Practice
                </button>

                <div className="glass-card p-8">
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Start a Quiz</h1>
                    <p className="text-slate-500 mb-8">Test your knowledge with GATE-style questions</p>

                    {/* Quiz Type */}
                    <div className="mb-6">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-3">Quiz Type</label>
                        <div className="flex gap-3">
                            {[
                                { value: 'topic', label: 'Topic Quiz', desc: '10 questions' },
                                { value: 'mock', label: 'Mock Test', desc: '30 questions' },
                            ].map(t => (
                                <button
                                    key={t.value}
                                    onClick={() => setQuizType(t.value)}
                                    className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${quizType === t.value
                                        ? 'border-primary bg-primary/5'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <p className="font-bold text-sm text-slate-800">{t.label}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Subject Selection */}
                    {quizType === 'topic' && (
                        <>
                            <div className="mb-6">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-3">Subject</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {subjects.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => { setSelectedSubject(s.id); setSelectedTopic(''); }}
                                            className={`p-3 rounded-xl border text-left transition-all text-sm ${selectedSubject === s.id
                                                ? 'border-primary bg-primary/5 text-primary font-bold'
                                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                                }`}
                                        >
                                            <span className="mr-2">{s.icon}</span>
                                            {s.name.replace('\n', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Optional Topic */}
                            {selectedSubject && availableTopics.length > 0 && (
                                <div className="mb-6">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-3">Topic (Optional)</label>
                                    <select
                                        value={selectedTopic}
                                        onChange={e => setSelectedTopic(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                                    >
                                        <option value="">All topics</option>
                                        {availableTopics.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </>
                    )}

                    <button
                        onClick={startQuiz}
                        disabled={quizType === 'topic' && !selectedSubject}
                        className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        Start Quiz →
                    </button>
                </div>
            </motion.div>
        );
    }

    // ─── ACTIVE QUIZ SCREEN ───
    if (quizState === QUIZ_STATES.ACTIVE) {
        const q = quizQuestions[currentIndex];
        const userAnswer = answers[currentIndex];
        const answered = userAnswer !== undefined;

        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Question {currentIndex + 1} / {quizQuestions.length}
                        </span>
                        <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentIndex + (answered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={16} />
                        <span className="text-sm font-bold tabular-nums">{formatTime(elapsedSeconds)}</span>
                    </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass-card p-8"
                    >
                        <p className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">{q.question}</p>

                        <div className="space-y-3">
                            {q.options.map((option, i) => {
                                let classes = 'border-slate-200 hover:border-slate-300 text-slate-700';
                                if (answered) {
                                    if (i === q.correctAnswer) {
                                        classes = 'border-emerald-400 bg-emerald-50 text-emerald-800';
                                    } else if (i === userAnswer && i !== q.correctAnswer) {
                                        classes = 'border-red-400 bg-red-50 text-red-800';
                                    } else {
                                        classes = 'border-slate-100 text-slate-400';
                                    }
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => selectAnswer(i)}
                                        disabled={answered}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${classes} ${!answered ? 'cursor-pointer hover:shadow-sm' : ''}`}
                                    >
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${answered && i === q.correctAnswer
                                            ? 'bg-emerald-500 text-white'
                                            : answered && i === userAnswer
                                                ? 'bg-red-500 text-white'
                                                : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {answered && i === q.correctAnswer ? <CheckCircle size={18} /> :
                                                answered && i === userAnswer ? <XCircle size={18} /> :
                                                    String.fromCharCode(65 + i)}
                                        </span>
                                        <span className="text-sm font-medium">{option}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation */}
                        <AnimatePresence>
                            {showExplanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200"
                                >
                                    <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">Explanation</p>
                                    <p className="text-sm text-blue-800 leading-relaxed">{q.explanation}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Next Button */}
                        {answered && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={nextQuestion}
                                className="mt-6 w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
                            >
                                {currentIndex < quizQuestions.length - 1 ? (
                                    <>Next Question <ChevronRight size={18} /></>
                                ) : (
                                    <>See Results <Trophy size={18} /></>
                                )}
                            </motion.button>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        );
    }

    // ─── RESULTS SCREEN ───
    if (quizState === QUIZ_STATES.RESULTS && results) {
        const percentage = Math.round((results.score / results.total) * 100);
        const getGrade = () => {
            if (percentage >= 90) return { label: 'Excellent!', color: 'text-emerald-600', bg: 'bg-emerald-50' };
            if (percentage >= 70) return { label: 'Good Job!', color: 'text-blue-600', bg: 'bg-blue-50' };
            if (percentage >= 50) return { label: 'Keep Practicing', color: 'text-amber-600', bg: 'bg-amber-50' };
            return { label: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
        };
        const grade = getGrade();

        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-8">
                {/* Result Summary */}
                <div className="glass-card p-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className={`w-24 h-24 rounded-full ${grade.bg} flex items-center justify-center mx-auto mb-4`}
                    >
                        <Trophy size={40} className={grade.color} />
                    </motion.div>
                    <h1 className={`text-3xl font-extrabold ${grade.color} mb-1`}>{grade.label}</h1>
                    <p className="text-slate-500 mb-6">{results.type} · {results.subjectName}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Score', value: `${results.score}/${results.total}`, icon: Target, color: 'text-primary' },
                            { label: 'Percentage', value: `${percentage}%`, icon: Zap, color: percentage >= 70 ? 'text-emerald-600' : 'text-amber-500' },
                            { label: 'Time', value: formatTime(results.timeSeconds), icon: Clock, color: 'text-slate-500' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="bg-slate-50 rounded-xl p-4"
                            >
                                <stat.icon size={18} className={`${stat.color} mx-auto mb-1`} />
                                <p className="text-lg font-extrabold text-slate-800">{stat.value}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => { setQuizState(QUIZ_STATES.SETUP); setResults(null); }}
                            className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            <RotateCcw size={16} /> Try Again
                        </button>
                        <button
                            onClick={() => navigate('/practice')}
                            className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm text-sm"
                        >
                            Back to Practice
                        </button>
                    </div>
                </div>

                {/* Question Breakdown */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Question Breakdown</h2>
                    <div className="space-y-2">
                        {quizQuestions.map((q, i) => {
                            const userAns = answers[i];
                            const correct = userAns === q.correctAnswer;
                            return (
                                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${correct ? 'bg-emerald-50' : 'bg-red-50'}`}>
                                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${correct ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
                                        {correct ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-700 leading-relaxed">{q.question}</p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            Your answer: <span className={correct ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>{q.options[userAns] ?? 'No answer'}</span>
                                            {!correct && <> · Correct: <span className="text-emerald-600 font-bold">{q.options[q.correctAnswer]}</span></>}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        );
    }

    return null;
}
