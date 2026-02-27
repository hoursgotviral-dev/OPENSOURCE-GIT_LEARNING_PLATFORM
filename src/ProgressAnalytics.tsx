import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from 'recharts';
import { TrendingUp, Target, Zap, Award, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const efficiencyData = [
  { name: 'Week 1', current: 15, previous: 10 },
  { name: 'Week 2', current: 28, previous: 8 },
  { name: 'Week 3', current: 45, previous: 12 },
  { name: 'Week 4', current: 62, previous: 5 },
];

const skillDistribution = [
  { subject: 'Committing', A: 120, fullMark: 150 },
  { subject: 'Branching', A: 98, fullMark: 150 },
  { subject: 'Merging', A: 86, fullMark: 150 },
  { subject: 'Conflict Res.', A: 65, fullMark: 150 },
  { subject: 'Clean Source', A: 85, fullMark: 150 },
  { subject: 'Staging', A: 110, fullMark: 150 },
];

export default function ProgressAnalytics() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Your Progress</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Detailed analysis of your Git mastery and learning journey.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-500">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skill Level</p>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase">Mid-Level Dev</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Efficiency Trend */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Efficiency Trend</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                <span className="text-[10px] font-black text-slate-400 uppercase">Previous</span>
              </div>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#1e293b',
                    color: '#f8fafc'
                  }}
                />
                <Bar dataKey="current" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="previous" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mistake Reduction</p>
              <h4 className="text-2xl font-black text-emerald-500 mt-1">-75%</h4>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Practices</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">142</h4>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Accuracy</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">92%</h4>
            </div>
          </div>
        </motion.div>

        {/* Skill Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col"
        >
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10">Skill Distribution</h3>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillDistribution}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }}
                />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-900/30">
            <p className="text-xs text-blue-800 dark:text-blue-200 text-center leading-relaxed">
              You are exceptionally strong in <span className="font-black">Committing</span> and <span className="font-black">Staging</span>.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mastery Timeline */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
        <div className="flex items-center gap-3 mb-8">
          <Zap size={20} className="text-blue-400" />
          <h3 className="text-lg font-black uppercase tracking-tight">Mastery Timeline</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { date: 'FEB 12', event: 'First Commit', status: 'Completed' },
            { date: 'FEB 18', event: 'Branching Basics', status: 'Completed' },
            { date: 'FEB 25', event: 'Conflict Resolution', status: 'In Progress' },
            { date: 'MAR 05', event: 'Advanced Rebase', status: 'Upcoming' },
          ].map((item, i) => (
            <div key={i} className="relative pl-6 border-l border-slate-800">
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.date}</p>
              <h4 className="text-sm font-bold mt-1">{item.event}</h4>
              <p className="text-[10px] font-mono text-blue-400 mt-1 uppercase">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
