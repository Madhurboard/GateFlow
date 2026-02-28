import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useProgress } from './hooks/useProgress';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SubjectDetail from './pages/SubjectDetail';
import Subjects from './pages/Subjects';
import Practice from './pages/Practice';
import QuizEngine from './pages/QuizEngine';
import Planner from './pages/Planner';
import Performance from './pages/Performance';
import Settings from './pages/Settings';
import AuthRoute from './components/AuthRoute';
import { AuthProvider } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

function Layout({ children, streak }) {
  return (
    <div className="app-container flex min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <Sidebar />
      <div className="main-content flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
        <Navbar streak={streak} />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const { getStreak } = useProgress();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Login/Signup disabled — redirect to dashboard */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />

        <Route path="/" element={
          <AuthRoute>
            <Layout streak={getStreak()}>
              <Dashboard />
            </Layout>
          </AuthRoute>
        } />

        <Route path="/subjects" element={
          <AuthRoute>
            <Layout streak={getStreak()}>
              <Subjects />
            </Layout>
          </AuthRoute>
        } />

        <Route path="/subject/:id" element={
          <AuthRoute>
            <Layout streak={getStreak()}>
              <SubjectDetail />
            </Layout>
          </AuthRoute>
        } />

        <Route path="/practice" element={
          <AuthRoute>
            <Layout streak={getStreak()}>
              <Practice />
            </Layout>
          </AuthRoute>
        } />

        <Route path="/practice/quiz" element={
          <AuthRoute>
            <Layout streak={getStreak()}>
              <QuizEngine />
            </Layout>
          </AuthRoute>
        } />

        <Route path="/planner" element={
          <AuthRoute>
            <Layout streak={getStreak()}>
              <Planner />
            </Layout>
          </AuthRoute>
        } />

        <Route path="/performance" element={
          <AuthRoute>
            <Layout streak={getStreak()}>
              <Performance />
            </Layout>
          </AuthRoute>
        } />

        <Route path="/settings" element={
          <AuthRoute>
            <Layout streak={getStreak()}>
              <Settings />
            </Layout>
          </AuthRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
