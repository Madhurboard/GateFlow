import { motion, AnimatePresence } from 'framer-motion';

const stateConfig = {
    not_started: {
        label: 'Not Started',
        bg: 'bg-white/5 hover:bg-white/10',
        text: 'text-slate-400',
        dot: 'bg-slate-600',
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

export default function TopicRow({ topic, state, onToggle, index }) {
    const config = stateConfig[state];

    return (
        <motion.div
            className="flex items-center justify-between p-4 mb-3 glass-card bg-surface-card/50 border border-white/5 hover:border-white/10 transition-colors group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
            }}
        >
            {/* Topic name */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full ${config.dot} transition-all duration-300`} />
                <span
                    className={`text-sm font-medium truncate transition-colors duration-300 ${state === 'confident' ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                >
                    {topic.name}
                </span>
            </div>

            {/* Toggle button */}
            <motion.button
                className={`ml-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200
          ${config.bg} ${config.text} border border-transparent hover:border-white/5 flex-shrink-0 cursor-pointer`}
                onClick={onToggle}
                whileTap={{ scale: 0.95 }}
                layout
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={state}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                    >
                        {config.label}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
}
