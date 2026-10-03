import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  Menu,
  X,
  Cpu,
  Layers,
  Rocket,
  Bot,
  Terminal,
  Briefcase
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'tools',       label: 'AI Tools' },
  { id: 'fields',      label: 'Every Field' },
  { id: 'paths',       label: 'Learning Paths' },
  { id: 'projects',    label: 'Project Lab' },
  { id: 'mentor',      label: 'AI Mentor' },
  { id: 'prompt-lab',  label: 'Prompt Lab' },
  { id: 'dashboard',   label: 'Dashboard' },
  { id: 'portfolio',   label: 'Portfolio' },
  { id: 'career',      label: 'Career' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onNavigateSection,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#05070d]/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => {
              soundFX.playClick();
              onNavigateSection('hero');
            }}
            className="flex items-center gap-3 group text-left"
            data-cursor-label="HOME"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-[1px] shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.6)] transition-all">
              <div className="w-full h-full rounded-[11px] bg-[#070a14] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black tracking-tight text-white text-base">VICTORY</span>
                <span className="text-cyan-400 font-display font-black text-base">.AI</span>
              </div>
              <div className="text-[9px] font-mono-code text-slate-400 tracking-wider uppercase">
                PRACTICAL LEARNING
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFX.playClick();
                    onNavigateSection(item.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-[0_0_12px_rgba(56,189,248,0.25)] font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  data-cursor-label={item.label.toUpperCase()}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Search command trigger */}
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenSearch();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono-code text-slate-400 hover:text-white hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all"
              title="Search tools & projects (Cmd+K)"
              data-cursor-label="SEARCH"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-white/[0.06] border border-white/10 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Start Learning Pill */}
            <button
              onClick={() => {
                soundFX.playClick();
                onNavigateSection('projects');
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono-code font-bold tracking-wide uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all active:scale-95"
              data-cursor-label="START"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Start Learning</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="xl:hidden bg-[#070a14] border-b border-white/10 px-6 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  onNavigateSection(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-mono-code ${
                  activeSection === item.id
                    ? 'bg-cyan-500/10 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
