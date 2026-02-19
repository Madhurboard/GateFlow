import { motion } from 'framer-motion';

export default function Navbar({ streak }) {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-surface-dark/80 border-b border-white/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center">
                        <span className="text-white text-sm font-bold">G</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        <span className="text-white">GATE</span>
                        <span className="text-gradient">flow</span>
                    </span>
                </motion.div>

                {/* Streak */}
                <motion.div
                    className="flex items-center gap-2 glass-card px-4 py-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="text-lg">🔥</span>
                    <span className="text-sm font-semibold text-white">
                        {streak}
                    </span>
                    <span className="text-xs text-slate-400">
                        day{streak !== 1 ? 's' : ''}
                    </span>
                </motion.div>
            </div>
        </nav>
    );
}
