import { motion } from 'framer-motion';

export default function Navbar({ streak }) {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-transparent border-b border-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-2xl font-bold tracking-tight">
                        <span className="text-white">GATE</span>
                        <span className="text-primary">flow</span>
                    </span>
                </motion.div>

                {/* Streak */}
                <motion.div
                    className="relative group overflow-hidden rounded-full p-[1px]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-success opacity-80" />
                    <div className="relative bg-surface-dark px-4 py-1.5 rounded-full flex items-center gap-2 back">
                        <span className="text-lg">🔥</span>
                        <span className="text-sm font-semibold text-white">
                            {streak}
                        </span>
                    </div>
                </motion.div>
            </div>
        </nav>
    );
}
