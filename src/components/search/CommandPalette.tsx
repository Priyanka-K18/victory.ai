import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, Code, Video, Palette, Zap, Cpu } from 'lucide-react';
import { AI_TOOLS, PROJECT_LAB_ITEMS, CATEGORIES } from '../../data/mockData';
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

  const filteredTools = AI_TOOLS.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) || 
    t.category.toLowerCase().includes(query.toLowerCase()) ||
    t.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = PROJECT_LAB_ITEMS.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCategories = CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.tagline.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#090f24] border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#0c1430]">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI tools, projects, skills, or workflows..."
            className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm font-body outline-none"
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

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Categories */}
          {filteredCategories.length > 0 && (
            <div>
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-2 px-2">
                DISCOVERY DISCIPLINES ({filteredCategories.length})
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredCategories.slice(0, 4).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundFX.playClick();
                      onSelectAction(`category-${cat.id}`);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/5 text-left transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-300 font-mono-code text-xs">
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
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-2 px-2">
                AI TOOLS MATRIX ({filteredTools.length})
              </div>
              <div className="space-y-1.5">
                {filteredTools.slice(0, 4).map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      soundFX.playClick();
                      onSelectAction(`tool-${tool.id}`);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-cyan-400 font-mono-code font-bold text-xs shrink-0">
                        {tool.name[0]}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white group-hover:text-cyan-300">
                            {tool.name}
                          </span>
                          <span className="text-[9px] font-mono-code px-1.5 py-0.2 rounded bg-white/10 text-cyan-400">
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

          {/* Project Lab Items */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-2 px-2">
                PROJECT LAB MODULES ({filteredProjects.length})
              </div>
              <div className="space-y-1.5">
                {filteredProjects.slice(0, 3).map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      soundFX.playClick();
                      onSelectAction(`project-${proj.id}`);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/5 transition-all text-left group"
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

          {filteredTools.length === 0 && filteredProjects.length === 0 && filteredCategories.length === 0 && (
            <div className="py-8 text-center text-slate-400">
              <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-mono-code">No direct matches found for "{query}"</p>
              <p className="text-[11px] text-slate-500 mt-1">Try searching for "Cursor", "Video", "RAG", or "Next.js"</p>
            </div>
          )}

        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-[#070b1a] border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span className="text-cyan-400">VICTORY.AI DISCOVERY MATRIX</span>
        </div>

      </div>
    </div>
  );
};
