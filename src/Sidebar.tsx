 @license
 
import { 
  LayoutDashboard, 
  BookOpen, 
  Terminal, 
  BarChart3, 
  Award, 
  Settings, 
  LogOut,
  Search
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from './lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: BookOpen, label: 'Learning Path', path: '/learning' },
  { icon: Terminal, label: 'Practice Mode', path: '/practice' },
  { icon: BarChart3, label: 'Progress', path: '/progress' },
  { icon: Award, label: 'Achievements', path: '/achievements' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-20 lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
          <Terminal size={24} />
        </div>
        <span className="font-bold text-xl text-slate-800 dark:text-white hidden lg:block">GitFlow</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={22} className={cn(isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-slate-800 dark:group-hover:text-slate-200")} />
              <span className="font-medium hidden lg:block">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 hidden lg:block" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button className="flex items-center gap-4 p-3 w-full text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all group">
          <LogOut size={22} />
          <span className="font-medium hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
