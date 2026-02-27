import { 
  FileCode, 
  Folder, 
  Terminal as TerminalIcon, 
  Send, 
  RotateCcw, 
  CheckCircle,
  ChevronRight,
  MessageSquare,
  Bot
} from 'lucide-react';
import { useState } from 'react';
import { cn } from './lib/utils';

export default function PracticeMode() {
  const [activeFile, setActiveFile] = useState('index.js');

  const files = [
    { name: 'src', type: 'folder', open: true },
    { name: 'index.js', type: 'file', parent: 'src' },
    { name: 'styles.css', type: 'file', parent: 'src' },
    { name: '.gitignore', type: 'file' },
  ];

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-slate-50 dark:bg-[#0d1117] text-slate-900 dark:text-slate-300 overflow-hidden transition-colors">
      {/* Top Header */}
      <div className="h-12 bg-white dark:bg-[#161b22] border-b border-slate-200 dark:border-[#30363d] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Practice Mode: Branching Basics</span>
          <div className="h-4 w-px bg-slate-200 dark:bg-[#30363d]" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Repo Status: Clean</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#30363d] rounded-lg transition-colors text-slate-600 dark:text-slate-400">
            <RotateCcw size={16} />
          </button>
          <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">
            Finish Mission
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Explorer */}
        <aside className="w-64 bg-slate-50 dark:bg-[#0d1117] border-r border-slate-200 dark:border-[#30363d] flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-[#30363d]">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Explorer</span>
          </div>
          <div className="flex-1 p-2 space-y-1">
            {files.map((file) => (
              <button 
                key={file.name}
                onClick={() => file.type === 'file' && setActiveFile(file.name)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                  file.type === 'folder' ? "text-slate-500 dark:text-slate-400" : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#161b22]",
                  activeFile === file.name && "bg-blue-50 dark:bg-[#161b22] text-blue-600 dark:text-blue-400"
                )}
              >
                {file.type === 'folder' ? <Folder size={14} /> : <FileCode size={14} />}
                <span className={cn(file.parent && "ml-2")}>{file.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Editor Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="h-9 bg-slate-100 dark:bg-[#161b22] flex items-center px-2 gap-1">
            <div className="px-4 h-full flex items-center gap-2 bg-white dark:bg-[#0d1117] border-t-2 border-blue-500 text-xs text-slate-900 dark:text-white">
              <FileCode size={14} className="text-blue-500 dark:text-blue-400" />
              {activeFile}
            </div>
          </div>

          {/* Code Editor Mock */}
          <div className="flex-1 p-6 font-mono text-sm overflow-auto bg-white dark:bg-[#0d1117]">
            <div className="flex gap-6">
              <div className="text-slate-400 dark:text-slate-600 text-right select-none w-8">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-purple-600 dark:text-purple-400">const <span className="text-blue-600 dark:text-blue-300">app</span> = <span className="text-yellow-600 dark:text-yellow-200">require</span>(<span className="text-emerald-600 dark:text-emerald-300">'express'</span>)();</div>
                <div className="text-slate-400 dark:text-slate-500">// TODO: Implement branch logic here</div>
                <div className="flex items-center">
                  <div className="w-0.5 h-5 bg-blue-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="h-64 bg-white dark:bg-[#0d1117] border-t border-slate-200 dark:border-[#30363d] flex flex-col">
            <div className="h-9 bg-slate-50 dark:bg-[#161b22] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <TerminalIcon size={14} /> Terminal
              </div>
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-[#30363d] rounded transition-colors">
                <ChevronRight size={14} className="rotate-90 text-slate-400" />
              </button>
            </div>
            <div className="flex-1 p-4 font-mono text-xs overflow-auto space-y-2">
              <div className="flex gap-2">
                <span className="text-emerald-500 dark:text-emerald-400">➜</span>
                <span className="text-blue-600 dark:text-blue-400">~/project</span>
                <span className="text-slate-900 dark:text-white">git status</span>
              </div>
              <div className="text-slate-500 dark:text-slate-400">On branch main</div>
              <div className="text-slate-500 dark:text-slate-400">Your branch is up to date with 'origin/main'.</div>
              <div className="text-slate-500 dark:text-slate-400">nothing to commit, working tree clean</div>
              <div className="flex gap-2 items-center">
                <span className="text-emerald-500 dark:text-emerald-400">➜</span>
                <span className="text-blue-600 dark:text-blue-400">~/project</span>
                <span className="text-slate-400 animate-pulse">type command...</span>
              </div>
            </div>
          </div>
        </main>

        {/* AI Mentor Panel */}
        <aside className="w-80 bg-slate-50 dark:bg-[#161b22] border-l border-slate-200 dark:border-[#30363d] flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-[#30363d] flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
              <Bot size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">AI Mentor</p>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Senior Dev Bot</h3>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-auto space-y-4">
            <div className="bg-white dark:bg-[#0d1117] p-4 rounded-2xl border border-slate-200 dark:border-[#30363d] text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Hello Sarah! I'm your Senior Dev mentor. Today we're learning about branching. Try running <code className="bg-slate-100 dark:bg-[#161b22] px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">git checkout -b feature-cool</code> in the terminal to get started!
            </div>
            
            <div className="pt-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Model</p>
              <div className="h-32 bg-white dark:bg-[#0d1117] rounded-2xl border border-dashed border-slate-200 dark:border-[#30363d] flex items-center justify-center text-[10px] text-slate-400 dark:text-slate-600 uppercase font-black">
                Visualizing Graph...
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-[#30363d] space-y-3">
            <div className="relative">
              <textarea 
                placeholder="Ask your mentor..."
                className="w-full bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#30363d] rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none h-20"
              />
              <button className="absolute bottom-3 right-3 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send size={14} />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-slate-200 dark:bg-[#30363d] hover:bg-slate-300 dark:hover:bg-[#3d444d] text-[10px] font-black uppercase text-slate-700 dark:text-white rounded-lg transition-colors">
                Explain mistake
              </button>
              <button className="flex-1 py-2 bg-slate-200 dark:bg-[#30363d] hover:bg-slate-300 dark:hover:bg-[#3d444d] text-[10px] font-black uppercase text-slate-700 dark:text-white rounded-lg transition-colors">
                What next?
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
