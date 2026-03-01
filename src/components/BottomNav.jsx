import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    Calendar,
    BarChart3,
    Settings,
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard, path: '/' },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, path: '/subjects' },
    { id: 'practice', label: 'Practice', icon: GraduationCap, path: '/practice' },
    { id: 'planner', label: 'Planner', icon: Calendar, path: '/planner' },
    { id: 'performance', label: 'Stats', icon: BarChart3, path: '/performance' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export default function BottomNav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isActive = (path) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    return (
        <div className="fixed bottom-3 md:bottom-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none pb-safe">
            <nav className="pointer-events-auto w-full md:max-w-[80%] lg:max-w-[60%] md:hidden liquid-glass border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-around px-1 h-[68px]">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-2xl transition-all duration-300 ${active
                                    ? 'text-primary'
                                    : 'text-slate-400 dark:text-slate-500 active:scale-90'
                                    }`}
                            >
                                {/* Active glow pill behind icon */}
                                {active && (
                                    <div className="absolute top-1 w-10 h-10 rounded-2xl bg-primary/10 dark:bg-primary/15 blur-sm" />
                                )}
                                <item.icon
                                    size={active ? 22 : 20}
                                    strokeWidth={active ? 2.5 : 1.8}
                                    className="relative z-10 transition-all duration-300"
                                />
                                <span
                                    className={`relative z-10 text-[10px] leading-tight transition-all duration-300 ${active ? 'font-bold' : 'font-medium'
                                        }`}
                                >
                                    {item.label}
                                </span>
                                {active && (
                                    <div className="w-1 h-1 rounded-full bg-primary relative z-10" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
