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

export default function TopicRow({ topic, state, onToggle, index }) {
    const config = stateConfig[state] || stateConfig.not_started;

    return (
        <motion.div
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
            }}
            onClick={onToggle}
            whileTap={{ scale: 0.98 }}
        >
            {/* Topic name */}
            <div className="flex items-center gap-4 flex-1 min-w-0 mb-3 sm:mb-0">
                <div className={`w-2 h-2 rounded-full ${config.dot} transition-all duration-300`} />
                <span
                    className={`text-sm md:text-base font-medium transition-colors duration-300 ${state === 'confident' ? 'text-slate-200' : 'text-slate-300 group-hover:text-white'
                        }`}
                >
                    {topic.name}
                </span>
            </div>

            {/* Toggle button indicator */}
            <div
                className={`sm:ml-4 px-4 py-2 sm:py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200
          ${config.bg} ${config.text} border border-transparent group-hover:border-white/10 flex-shrink-0 text-center select-none`}
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
            </div>
        </motion.div>
    );
}
