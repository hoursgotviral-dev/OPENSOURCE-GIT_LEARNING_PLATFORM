import { Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function TopBar({ title }: { title: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">{title}</h1>
        <p className="text-xs font-mono text-slate-500 mt-1">
          SYSTEM STATUS: <span className="text-emerald-500">ACTIVE</span> // USER: SARAH_M
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">12,450 XP</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">420 CR</span>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
            <img 
              src="https://picsum.photos/seed/sarah/100/100" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
