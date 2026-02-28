import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDarkMode } from '../hooks/useDarkMode';
import { Moon, Sun } from 'lucide-react';

const breadcrumbs = {
    '/': 'Dashboard',
    '/subjects': 'Subjects',
    '/practice': 'Practice Tests',
    '/practice/quiz': 'Quiz',
    '/planner': 'Study Planner',
    '/performance': 'Performance',
    '/settings': 'Settings',
};

export default function Navbar({ streak }) {
    const { pathname } = useLocation();
    const { user } = useAuth();
    const { isDark, toggle } = useDarkMode();

    // Resolve breadcrumb text
    let pageTitle = breadcrumbs[pathname] || 'Dashboard';
    if (pathname.startsWith('/subject/')) {
        pageTitle = 'Subject Detail';
    }

    return (
        <header className="h-16 flex items-center justify-between px-8 bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm border-b border-slate-100 dark:border-dark-border">
            <div className="uppercase tracking-widest text-[12px] font-bold text-slate-400 dark:text-slate-500">
                GATEflow <span className="mx-2 text-slate-200 dark:text-slate-600">/</span> <span className="text-slate-600 dark:text-slate-300">{pageTitle}</span>
            </div>

            <div className="flex items-center gap-4">
                {/* Dark mode toggle */}
                <button
                    onClick={toggle}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-dark-hover border border-slate-100 dark:border-dark-border text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Streak */}
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-dark-hover border border-slate-100 dark:border-dark-border px-3.5 py-1.5 rounded-xl">
                    <span className="text-base">🔥</span>
                    <span className="text-slate-800 dark:text-slate-200 text-sm font-bold">
                        {streak} <span className="text-slate-400 dark:text-slate-500 ml-0.5 uppercase text-[9px] font-black tracking-widest">days</span>
                    </span>
                </div>

                <div className="flex items-center gap-3 border-l border-slate-200 dark:border-dark-border pl-4">
                    <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-dark-hover">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
