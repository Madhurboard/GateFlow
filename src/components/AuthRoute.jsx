// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// AUTH TEMPORARILY DISABLED — Supabase connectivity issues
// To re-enable: uncomment the imports and original component body below,
// then remove the bypass.

export default function AuthRoute({ children }) {
    // --- BYPASS: skip auth check ---
    return children;

    // --- ORIGINAL (re-enable when Supabase is back) ---
    // const { user, loading } = useAuth();
    //
    // if (loading) {
    //     return (
    //         <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    //             <div className="text-center">
    //                 <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
    //                 <p className="text-slate-400 text-sm font-medium">Loading...</p>
    //             </div>
    //         </div>
    //     );
    // }
    //
    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }
    //
    // return children;
}
