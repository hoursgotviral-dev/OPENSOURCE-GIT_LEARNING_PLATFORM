import { CheckCircle2, ChevronRight, Star, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

const modules = [
  {
    id: 'basics',
    title: 'GETTING STARTED',
    description: 'Initial steps into the Git universe. Master the core lifecycle of local changes.',
    progress: '3 / 3',
    completed: true,
    lessons: [
      { id: 1, title: 'YOUR FIRST COMMIT', tags: ['BEGINNER'], time: '10 MINS', xp: 200, type: 'COMMIT', completed: true },
      { id: 2, title: 'THE STAGING AREA', tags: ['BEGINNER'], time: '15 MINS', xp: 350, type: 'STAGING', completed: true },
      { id: 3, title: 'UNDERSTANDING STATUS', tags: ['BEGINNER'], time: '5 MINS', xp: 150, type: 'STATUS', completed: true },
    ]
  },
  {
    id: 'history',
    title: 'EDITING HISTORY',
    description: 'Learn how to travel back in time and fix mistakes before they reach production.',
    progress: '0 / 4',
    completed: false,
    lessons: [
      { id: 4, title: 'AMENDING COMMITS', tags: ['INTERMEDIATE'], time: '12 MINS', xp: 400, type: 'AMEND', completed: false },
      { id: 5, title: 'INTERACTIVE REBASE', tags: ['ADVANCED'], time: '25 MINS', xp: 800, type: 'REBASE', completed: false },
    ]
  }
];

export default function LearningPath() {
  return (
    <div className="p-8 space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <ChevronRight className="text-blue-500" /> Learning Path
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
          Follow the tactical curriculum to master Git. Each module is a chapter in your journey to becoming a maintainer.
        </p>
      </div>

      {/* Global Progress */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-500">
            <Star size={24} fill="currentColor" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Sync Status</p>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[33%]" />
              </div>
              <span className="text-xs font-black text-slate-900 dark:text-white">33%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-16 relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden lg:block" />

        {modules.map((module, idx) => (
          <div key={module.id} className="relative">
            {/* Section Divider */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-slate-50 dark:bg-slate-950 px-6 py-1 border border-slate-200 dark:border-slate-800 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] relative z-10">
                {module.id === 'basics' ? 'Basics' : 'Advanced'}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all",
                    module.completed ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-500" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700"
                  )}>
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{module.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{module.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress {module.progress}</p>
                  <div className="h-1.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className={cn(
                      "h-full transition-all duration-1000",
                      module.completed ? "bg-emerald-500 w-full" : "bg-blue-500 w-0"
                    )} />
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {module.lessons.map((lesson) => (
                  <button 
                    key={lesson.id}
                    className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all text-left relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        {lesson.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black rounded uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                        <span className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase">
                          <Clock size={10} /> {lesson.time}
                        </span>
                      </div>
                      {lesson.completed && <CheckCircle2 size={16} className="text-emerald-500" />}
                    </div>

                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {lesson.title}
                    </h4>
                    
                    <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                      <span className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 text-[8px] font-black rounded uppercase tracking-widest">
                        {lesson.type}
                      </span>
                      <ChevronRight size={16} className="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-blue-500 font-black text-[10px]">
                      <Zap size={10} fill="currentColor" /> {lesson.xp} XP
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
