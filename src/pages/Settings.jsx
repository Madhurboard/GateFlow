import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Bell, Volume2, Mail, Calendar, Clock, Sun, Moon, Sunset, Shield, Download, Trash2, Info, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';

function Toggle({ enabled, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`w-11 h-6 rounded-full flex items-center transition-colors ${enabled ? 'bg-primary' : 'bg-slate-200'}`}
        >
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
        </button>
    );
}

const timeChips = [
    { label: 'Morning', icon: Sun },
    { label: 'Afternoon', icon: Sunset },
    { label: 'Night', icon: Moon },
];

export default function Settings() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const { settings, updateSetting } = useSettings();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    // Format the target date for the date input
    const targetDateValue = settings.targetExamDate
        ? new Date(settings.targetExamDate).toISOString().split('T')[0]
        : '2027-02-01';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl space-y-8"
        >
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your preferences and account</p>
            </div>

            {/* Profile Section */}
            <div className="glass-card p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Profile</h2>
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <User size={28} />
                    </div>
                    <div className="flex-1">
                        <p className="text-lg font-bold text-slate-800">{user?.user_metadata?.full_name || 'Scholar'}</p>
                        <p className="text-sm text-slate-400">{user?.email || 'Guest Mode'}</p>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="glass-card p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Notifications</h2>
                <div className="space-y-5">
                    {[
                        { label: 'Daily Reminders', desc: 'Get notified about your daily study goals', icon: Bell, key: 'dailyReminders' },
                        { label: 'Email Notifications', desc: 'Receive weekly progress reports via email', icon: Mail, key: 'emailNotifs' },
                        { label: 'Sound Effects', desc: 'Play sounds on task completion', icon: Volume2, key: 'soundFx' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                                    <item.icon size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                                    <p className="text-xs text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                            <Toggle enabled={settings[item.key]} onToggle={() => updateSetting(item.key, !settings[item.key])} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Study Preferences */}
            <div className="glass-card p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Study Preferences</h2>
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700">Target Exam Date</p>
                                <p className="text-xs text-slate-400">Change your GATE exam target date</p>
                            </div>
                        </div>
                        <input
                            type="date"
                            value={targetDateValue}
                            onChange={e => updateSetting('targetExamDate', new Date(e.target.value).toISOString())}
                            className="text-sm font-bold text-primary bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                                <Clock size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700">Daily Study Goal</p>
                                <p className="text-xs text-slate-400">Set your target hours per day</p>
                            </div>
                        </div>
                        <select
                            value={settings.dailyGoalHours}
                            onChange={e => updateSetting('dailyGoalHours', Number(e.target.value))}
                            className="text-sm font-bold text-primary bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-lg outline-none"
                        >
                            <option value={1}>1 hr</option>
                            <option value={2}>2 hrs</option>
                            <option value={3}>3 hrs</option>
                            <option value={4}>4 hrs</option>
                            <option value={5}>5 hrs</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-700 mb-3">Preferred Study Time</p>
                        <div className="flex gap-3">
                            {timeChips.map(chip => (
                                <button
                                    key={chip.label}
                                    onClick={() => updateSetting('preferredTime', chip.label)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${settings.preferredTime === chip.label
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <chip.icon size={16} />
                                    {chip.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Account */}
            <div className="glass-card p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Account</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm font-semibold text-white bg-red-500 px-5 py-2.5 rounded-xl hover:bg-red-600 transition-colors shadow-sm"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </div>

            {/* About */}
            <div className="glass-card p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">About</h2>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Info size={14} />
                    <span>GATEflow v1.0.0</span>
                </div>
                <div className="flex gap-4 mt-3">
                    <a href="#" className="text-sm text-primary hover:underline">Privacy Policy</a>
                    <a href="#" className="text-sm text-primary hover:underline">Terms of Service</a>
                </div>
            </div>
        </motion.div>
    );
}
