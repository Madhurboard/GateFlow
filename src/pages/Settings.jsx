import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Volume2, Mail, Calendar, Clock, Sun, Moon, Sunset, Shield, Download, Trash2, Info } from 'lucide-react';

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
    const [dailyReminders, setDailyReminders] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(false);
    const [soundFx, setSoundFx] = useState(true);
    const [preferredTime, setPreferredTime] = useState('Morning');

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
                        <p className="text-lg font-bold text-slate-800">Scholar</p>
                        <p className="text-sm text-slate-400">test@example.com</p>
                    </div>
                    <button className="text-sm font-semibold text-primary border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary/5 transition-colors">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className="glass-card p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Notifications</h2>
                <div className="space-y-5">
                    {[
                        { label: 'Daily Reminders', desc: 'Get notified about your daily study goals', icon: Bell, enabled: dailyReminders, toggle: () => setDailyReminders(!dailyReminders) },
                        { label: 'Email Notifications', desc: 'Receive weekly progress reports via email', icon: Mail, enabled: emailNotifs, toggle: () => setEmailNotifs(!emailNotifs) },
                        { label: 'Sound Effects', desc: 'Play sounds on task completion', icon: Volume2, enabled: soundFx, toggle: () => setSoundFx(!soundFx) },
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
                            <Toggle enabled={item.enabled} onToggle={item.toggle} />
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
                                <p className="text-xs text-slate-400">GATE 2027 Examination</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-primary">Feb 2027</span>
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
                        <select className="text-sm font-bold text-primary bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-lg outline-none">
                            <option>1 hr</option>
                            <option>2 hrs</option>
                            <option selected>3 hrs</option>
                            <option>4 hrs</option>
                            <option>5 hrs</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-700 mb-3">Preferred Study Time</p>
                        <div className="flex gap-3">
                            {timeChips.map(chip => (
                                <button
                                    key={chip.label}
                                    onClick={() => setPreferredTime(chip.label)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${preferredTime === chip.label
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
                    <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                        <Shield size={16} /> Change Password
                    </button>
                    <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                        <Download size={16} /> Export Data
                    </button>
                    <button className="flex items-center gap-2 text-sm font-semibold text-red-500 border border-red-200 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors">
                        <Trash2 size={16} /> Delete Account
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
