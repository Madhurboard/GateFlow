import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    Calendar,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, signOut } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { id: 'subjects', label: 'Subjects', icon: BookOpen, path: '/subjects' },
        { id: 'practice', label: 'Practice Tests', icon: GraduationCap, path: '/practice' },
        { id: 'planner', label: 'Study Planner', icon: Calendar, path: '/planner' },
        { id: 'performance', label: 'Performance', icon: BarChart3, path: '/performance' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <motion.aside
            className={`h-screen sticky top-0 bg-white dark:bg-dark-card border-r border-slate-200 dark:border-dark-border hidden md:flex flex-col transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}
            initial={{ x: -100 }}
            animate={{ x: 0 }}
        >
            {/* Header */}
            <div className="p-6 flex items-center justify-between mb-8">
                {!isCollapsed && (
                    <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                        GATE<span className="text-primary">flow</span>
                    </span>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-hover text-slate-500 dark:text-slate-400 transition-colors"
                >
                    {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${isActive(item.path)
                            ? 'bg-primary-light dark:bg-primary/20 text-primary font-semibold'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-hover hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                    >
                        <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                        {!isCollapsed && <span className="text-[15px]">{item.label}</span>}
                        {isCollapsed && (
                            <div className="absolute left-16 bg-slate-800 dark:bg-slate-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.label}
                            </div>
                        )}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-dark-border space-y-2">
                <button
                    onClick={() => navigate('/settings')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-hover hover:text-slate-700 dark:hover:text-slate-200 transition-all group"
                >
                    <Settings size={20} />
                    {!isCollapsed && <span className="text-[15px]">Settings</span>}
                </button>

                {user && (
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group"
                    >
                        <LogOut size={20} />
                        {!isCollapsed && <span className="text-[15px]">Log Out</span>}
                    </button>
                )}
            </div>
        </motion.aside>
    );
}
