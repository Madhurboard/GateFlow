import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ streak }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };
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

                <div className="flex items-center gap-4">
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

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="bg-white/[0.05] border border-white/[0.1] px-4 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.1] transition-all text-sm font-semibold"
                        >
                            Log Out
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
