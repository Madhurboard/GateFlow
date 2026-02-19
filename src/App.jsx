import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useProgress } from './hooks/useProgress';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SubjectDetail from './pages/SubjectDetail';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subject/:id" element={<SubjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { getStreak } = useProgress();

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar streak={getStreak()} />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
