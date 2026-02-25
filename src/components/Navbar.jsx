import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ streak }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <header className="h-20 flex items-center justify-between px-8 bg-white/50 backdrop-blur-sm border-b border-slate-100 uppercase tracking-widest text-[13px] font-bold text-slate-400">
            <div>
                Overview <span className="mx-2 text-slate-200">/</span> <span className="text-slate-600">Main Dashboard</span>
            </div>

            <div className="flex items-center gap-6">
                {/* Streak */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                    <span className="text-lg">🔥</span>
                    <span className="text-slate-800">
                        {streak} <span className="text-slate-400 ml-1 uppercase text-[10px] font-black">Days</span>
                    </span>
                </div>

                <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
