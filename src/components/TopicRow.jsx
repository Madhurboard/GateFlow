import { motion, AnimatePresence } from 'framer-motion';

const stateConfig = {
    not_started: {
        label: 'Not Started',
        bg: 'bg-slate-700/50',
        text: 'text-slate-400',
        ring: '',
        dot: 'bg-slate-500',
    },
    in_progress: {
        label: 'In Progress',
        bg: 'bg-warning/10',
        text: 'text-warning',
        ring: 'ring-1 ring-warning/30',
        dot: 'bg-warning',
    },
    confident: {
        label: 'Confident',
        bg: 'bg-success/10',
        text: 'text-success',
        ring: 'ring-1 ring-success/30',
        dot: 'bg-success',
    },
};

export default function TopicRow({ topic, state, onToggle, index }) {
    const config = stateConfig[state];

    return (
        <motion.div
            className="flex items-center justify-between p-4 glass-card mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {/* Topic name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <motion.div
                    className={`w-2.5 h-2.5 rounded-full ${config.dot} flex-shrink-0`}
                    animate={{
                        scale: state === 'confident' ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                />
                <span
                    className={`text-sm font-medium truncate ${state === 'confident' ? 'text-slate-300' : 'text-slate-200'
                        }`}
                >
                    {topic.name}
                </span>
            </div>

            {/* Toggle button */}
            <motion.button
                className={`ml-4 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors
          ${config.bg} ${config.text} ${config.ring} flex-shrink-0 cursor-pointer`}
                onClick={onToggle}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                layout
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={state}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                    >
                        {config.label}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
}
