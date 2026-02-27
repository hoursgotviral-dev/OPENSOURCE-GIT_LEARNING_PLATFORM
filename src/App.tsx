 @license


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import Dashboard from './Dashboard';
import LearningPath from './LearningPath';
import PracticeMode from './PracticeMode';
import ProgressAnalytics from './ProgressAnalytics';
import { useLocation } from 'react-router-dom';

import { ThemeProvider } from './ThemeContext';

function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isPracticeMode = location.pathname === '/practice';

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/learning': return 'Learning Path';
      case '/practice': return 'Practice Mode';
      case '/progress': return 'Your Progress';
      default: return 'GitFlow';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {!isPracticeMode && <TopBar title={getTitle()} />}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning" element={<LearningPath />} />
            <Route path="/practice" element={<PracticeMode />} />
            <Route path="/progress" element={<ProgressAnalytics />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}
