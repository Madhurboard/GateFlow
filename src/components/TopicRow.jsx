import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stateConfig = {
    not_started: {
        label: 'Not Started',
        bg: 'bg-neutral/20 group-hover:bg-neutral/30',
        text: 'text-neutral',
        dot: 'bg-neutral',
    },
    in_progress: {
        label: 'In Progress',
        bg: 'bg-warning/10 hover:bg-warning/20',
        text: 'text-warning',
        dot: 'bg-warning shadow-glow-warning',
    },
    confident: {
        label: 'Confident',
        bg: 'bg-success/10 hover:bg-success/20',
        text: 'text-success',
        dot: 'bg-success shadow-glow-success',
    },
};

export default function TopicRow({ topic, state, onToggle, index, getSubtopicState, toggleSubtopicState }) {
    const config = stateConfig[state] || stateConfig.not_started;
    const [isExpanded, setIsExpanded] = useState(false);

    const subtopics = topic.subtopics || [];

    // Calculate subtopic progress
    const completedSubtopics = subtopics.filter(st => getSubtopicState(st.id)).length;
    const totalSubtopics = subtopics.length;
    const hasSubtopics = totalSubtopics > 0;

    return (
        <motion.div
            className={`flex flex-col mb-3 rounded-2xl bg-surface-card backdrop-blur-md border ${isExpanded ? 'border-primary/30' : 'border-surface-border'} hover:border-white/20 transition-all duration-300 group shadow-sm hover:shadow-md relative`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
            }}
        >
            {/* Subtle glow highlight on confident state */}
            {state === 'confident' && !isExpanded && (
                <div className="absolute inset-0 bg-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
            )}

            {/* Main Row Header */}
            <div
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 px-5 sm:px-6 cursor-pointer hover:bg-surface-hover/80 transition-colors z-10 relative rounded-2xl"
                onClick={() => hasSubtopics && setIsExpanded(!isExpanded)}
            >
                {/* Topic name & Subtopic Progress*/}
                <div className="flex items-center gap-4 flex-1 min-w-0 mb-3 sm:mb-0">
                    {/* Expand icon */}
                    {hasSubtopics && (
                        <div className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-primary' : ''}`}>
                            ▶
                        </div>
                    )}
                    {!hasSubtopics && (
                        <div className={`w-3 h-3 rounded-full ${config.dot} transition-all duration-300 ring-4 ring-white/5 flex-shrink-0`} />
                    )}

                    <div className="flex flex-col">
                        <span className={`text-sm md:text-base font-semibold tracking-wide transition-colors duration-300 ${state === 'confident' ? 'text-slate-200' : 'text-slate-300 group-hover:text-white'}`}>
                            {topic.name}
                        </span>
                        {hasSubtopics && (
                            <span className="text-xs text-slate-500 font-medium mt-0.5">
                                {completedSubtopics} of {totalSubtopics} topics completed
                            </span>
                        )}
                    </div>
                </div>

                {/* Toggle button indicator */}
                <div
                    onClick={onToggle}
                    className={`sm:ml-4 px-5 py-2 sm:py-1.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase transition-all duration-300
              ${config.bg} ${config.text} border border-${config.dot.split(' ')[0].split('-')[1]}/20 hover:border-${config.dot.split(' ')[0].split('-')[1]}/50 flex-shrink-0 text-center select-none shadow-sm z-20 cursor-pointer`}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={state}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="block drop-shadow-sm"
                        >
                            {config.label}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            {/* Subtopics Accordion */}
            <AnimatePresence>
                {isExpanded && hasSubtopics && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 px-5 sm:px-6 pt-0 pb-5 space-y-2 border-t border-surface-border/50 bg-black/20 rounded-b-2xl">
                            {subtopics.map((st, i) => {
                                const isCompleted = getSubtopicState(st.id);
                                return (
                                    <div
                                        key={st.id}
                                        onClick={() => toggleSubtopicState(st.id)}
                                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group/sub"
                                    >
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isCompleted ? 'bg-primary border-primary' : 'border-slate-600 group-hover/sub:border-slate-400 bg-transparent'
                                            }`}>
                                            {isCompleted && (
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-sm tracking-wide transition-colors ${isCompleted ? 'text-slate-300 line-through decoration-slate-500/50' : 'text-slate-400 group-hover/sub:text-slate-200'}`}>
                                            {st.name}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
