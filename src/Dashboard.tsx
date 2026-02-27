import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Play, Award, Zap, Flame, Clock, ChevronRight, BarChart3, Terminal, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

const skillData = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 25 },
  { name: 'Fri', value: 45 },
  { name: 'Sat', value: 30 },
  { name: 'Sun', value: 55 },
];

const achievements = [
  { id: 1, name: 'First Commit', icon: '🌱', color: 'bg-emerald-50 text-emerald-600' },
  { id: 2, name: 'Branch Master', icon: '🌿', color: 'bg-blue-50 text-blue-600' },
  { id: 3, name: 'Conflict Solver', icon: '⚔️', color: 'bg-slate-50 text-slate-400', locked: true },
  { id: 4, name: 'PR Pro', icon: '🚀', color: 'bg-purple-50 text-purple-600' },
];

const recentPractice = [
  { id: 1, title: 'Your First Commit', module: 'Basics', time: '3m ago', status: 'DONE' },
  { id: 2, title: 'Staging Files', module: 'Workflow', time: '1h ago', status: 'DONE' },
];

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Git Journey</p>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mt-1">42%</h3>
            <p className="text-xs font-mono text-blue-500 mt-1">LEVEL 12 // SYNCED</p>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeDasharray="100, 100"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-500"
                strokeDasharray="42, 100"
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-600">42%</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Missions</p>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mt-1">12 / 30</h3>
            <p className="text-xs font-mono text-purple-500 mt-1">SYSTEM DEPLOYED</p>
          </div>
          <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-500">
            <Zap size={32} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice</p>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mt-1">18.5H</h3>
            <p className="text-xs font-mono text-orange-500 mt-1 flex items-center gap-1">
              STREAK: 14D <Flame size={12} />
            </p>
          </div>
          <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-500">
            <Clock size={32} />
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Next Mission Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 flex gap-2">
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Easy</span>
              <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-full uppercase tracking-wider">10M</span>
            </div>
            
            <p className="text-xs font-mono text-orange-500 flex items-center gap-2">
              <ChevronRight size={14} /> NEXT MISSION
            </p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-4 uppercase tracking-tight">Create & Merge a Branch</h2>
            <p className="text-sm font-mono text-slate-400 mt-1 uppercase">Module: Branching_Basics</p>
            
            <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-orange-200">
              Start Mission <Play size={18} fill="currentColor" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Achievements */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Award size={18} className="text-purple-500" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Achievements</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {achievements.map((item) => (
                  <div key={item.id} className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 dark:border-slate-800",
                      item.color,
                      item.locked && "grayscale opacity-50"
                    )}>
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase text-center leading-tight">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Growth Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Skill Growth</h3>
                  <p className="text-[10px] font-mono text-blue-500 uppercase">Commits_Mastered: +24%</p>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <BarChart3 size={16} className="text-slate-400" />
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillData}>
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {skillData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === skillData.length - 1 ? '#3b82f6' : '#cbd5e1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recently Practiced */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Clock size={18} className="text-blue-500" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Recently Practiced</h3>
            </div>
            <div className="space-y-4">
              {recentPractice.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-800">
                      <Terminal size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase">{item.title}</h4>
                      <p className="text-[10px] font-mono text-slate-400 uppercase">{item.module} <span className="mx-1">•</span> {item.time}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold rounded-md border border-emerald-100 dark:border-emerald-900/30">DONE</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Terminal, label: 'Basics', active: true },
              { icon: ChevronRight, label: 'Branch', active: false },
              { icon: ChevronRight, label: 'Merge', active: false },
              { icon: User, label: 'Collab', active: false },
            ].map((item, i) => (
              <button key={i} className={cn(
                "p-6 rounded-2xl flex flex-col items-center gap-3 transition-all border",
                item.active 
                  ? "bg-blue-600 text-white border-blue-700 shadow-lg shadow-blue-500/20" 
                  : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              )}>
                <item.icon size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Daily Challenge */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4">
              <Zap size={24} className="text-purple-500 opacity-20" />
            </div>
            <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2">
              <Zap size={12} fill="currentColor" /> Daily_Challenge
            </p>
            <h4 className="text-sm font-black text-slate-900 dark:text-white mt-4 leading-tight">FIX A BROKEN COMMIT HISTORY WITH `REBASE -I`.</h4>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                <span>Sync_Progress</span>
                <span className="text-purple-600">04 / 07</span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[57%]" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1 text-blue-500 font-bold text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500" /> +200 XP
              </div>
              <button className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                Execute
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User size={18} className="text-emerald-500" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Leaderboard</h3>
            </div>
            <div className="space-y-4">
              {[
                { rank: 1, name: 'Alex_Dev', xp: '15,200', avatar: 'https://picsum.photos/seed/1/40/40' },
                { rank: 2, name: 'Sarah_M', xp: '12,450', avatar: 'https://picsum.photos/seed/sarah/40/40', me: true },
                { rank: 3, name: 'Code_Ninja', xp: '11,800', avatar: 'https://picsum.photos/seed/3/40/40' },
              ].map((user) => (
                <div key={user.rank} className={cn(
                  "flex items-center justify-between p-3 rounded-2xl border transition-all",
                  user.me ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30" : "bg-white dark:bg-slate-900 border-transparent"
                )}>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 w-4">{user.rank}</span>
                    <img src={user.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <span className={cn("text-xs font-bold", user.me ? "text-blue-700 dark:text-blue-400" : "text-slate-700 dark:text-slate-200")}>{user.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{user.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
