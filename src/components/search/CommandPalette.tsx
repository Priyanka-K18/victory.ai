import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  Code, 
  Video, 
  Palette, 
  Zap, 
  Cpu, 
  BookOpen, 
  Terminal, 
  Award,
  Layers
} from 'lucide-react';
import { AI_TOOLS, PROJECT_LAB_ITEMS, CATEGORIES, CHALLENGES } from '../../data/mockData';
import { soundFX } from '../../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (targetId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  isOpen, 
  onClose,
  onSelectAction 
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundFX.playClick();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase();

  const filteredTools = AI_TOOLS.filter(t => 
    t.name.toLowerCase().includes(q) || 
    t.category.toLowerCase().includes(q) ||
    t.tagline.toLowerCase().includes(q)
  );

  const filteredProjects = PROJECT_LAB_ITEMS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.skillsAcquired.some(s => s.toLowerCase().includes(q))
  );

  const filteredCategories = CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.tagline.toLowerCase().includes(q)
  );

  const filteredChallenges = CHALLENGES.filter(ch =>
    ch.title.toLowerCase().includes(q) ||
    ch.category.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden text-slate-200"
        style={{
          background: 'rgba(9, 13, 24, 0.96)',
          borderColor: 'rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.15)'
        }}
      >
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-black/40">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI tools, lessons, projects, prompts, challenges..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm font-body outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/10 text-slate-400 border border-white/10">
            ESC
          </span>
        </div>

        {/* Results List (Section 34: Tools, Lessons, Projects, Skills, Challenges, Prompts, Departments) */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Departments & Disciplines */}
          {filteredCategories.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-code uppercase tracking-wider text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>DEPARTMENTS & DISCIPLINES ({filteredCategories.length})</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredCategories.slice(0, 4).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundFX.playClick();
                      onSelectAction('fields');
                      onClose();
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/5 text-left transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-300 font-mono-code text-xs">
                      {cat.title[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300 truncate">
                        {cat.title}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {cat.sampleProject}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Tools */}
          {filteredTools.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-code uppercase tracking-wider text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-purple-400" />
                <span>AI TOOLS ({filteredTools.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredTools.slice(0, 4).map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      soundFX.playClick();
                      onSelectAction('tools');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 font-mono-code font-bold text-xs shrink-0">
                        {tool.name[0]}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white group-hover:text-cyan-300">
                            {tool.name}
                          </span>
                          <span className="text-[9px] font-mono-code px-1.5 py-0.2 rounded bg-white/5 text-cyan-400">
                            {tool.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {tool.tagline}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project Lab Modules */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-code uppercase tracking-wider text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>PROJECT LAB BLUEPRINTS ({filteredProjects.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredProjects.slice(0, 3).map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      soundFX.playClick();
                      onSelectAction('projects');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/5 transition-all text-left group"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        {proj.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {proj.objective}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      {proj.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          {filteredChallenges.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-code uppercase tracking-wider text-slate-500 mb-2 px-1 flex items-center gap-1.5">
                <Award className="w-3 h-3 text-amber-400" />
                <span>AI BUILD CHALLENGES ({filteredChallenges.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredChallenges.slice(0, 2).map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      soundFX.playClick();
                      onSelectAction('challenges');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/5 transition-all text-left group"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        {ch.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {ch.brief}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 shrink-0">
                      +{ch.rewardXP} XP
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredTools.length === 0 && filteredProjects.length === 0 && filteredCategories.length === 0 && (
            <div className="py-8 text-center text-slate-400">
              <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-mono-code">No direct matches found for "{query}"</p>
              <p className="text-[11px] text-slate-500 mt-1">Try searching for "video", "cursor", "RAG", or "prompts"</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span className="text-cyan-400">VICTORY.AI GLOBAL SEARCH</span>
        </div>

      </div>
    </div>
  );
};
