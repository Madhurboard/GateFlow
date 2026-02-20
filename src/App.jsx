import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useProgress } from './hooks/useProgress';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SubjectDetail from './pages/SubjectDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthRoute from './components/AuthRoute';
import { AuthProvider } from './hooks/useAuth';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AuthRoute><Dashboard /></AuthRoute>} />
        <Route path="/subject/:id" element={<AuthRoute><SubjectDetail /></AuthRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { getStreak } = useProgress();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar streak={getStreak()} />
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
