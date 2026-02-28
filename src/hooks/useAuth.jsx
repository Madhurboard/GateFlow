import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

// GUEST MODE — Supabase is temporarily unavailable
const GUEST_MODE = true;

const GUEST_USER = {
    id: 'local-guest',
    email: 'guest@gateflow.local',
    user_metadata: { full_name: 'Scholar' },
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(GUEST_MODE ? GUEST_USER : null);
    const [loading, setLoading] = useState(GUEST_MODE ? false : true);

    useEffect(() => {
        if (GUEST_MODE) return;

        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes on auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        if (!GUEST_MODE) {
            await supabase.auth.signOut();
        }
        setUser(GUEST_MODE ? GUEST_USER : null);
    };

    const value = {
        user,
        loading,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
