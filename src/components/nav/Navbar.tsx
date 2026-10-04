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
  Briefcase,
  Database,
  User as UserIcon,
  LogOut,
  Trophy,
  Flame,
  ChevronDown
} from 'lucide-react';
import { soundFX } from '../../utils/audio';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  onOpenOnboarding?: () => void;
  onOpenAuth?: () => void;
  onOpenAdmin?: () => void;
}

const NAV_ITEMS = [
  { id: 'creator-flow', label: 'Create' },
  { id: 'fields',      label: 'Every Field' },
  { id: 'tools',       label: 'AI Tools' },
  { id: 'paths',       label: 'Roadmap' },
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
  onOpenOnboarding,
  onOpenAuth,
  onOpenAdmin,
}) => {
  const { user, profile, signOut, isConnected } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
            ? 'py-2.5 bg-[#05070d]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => {
              soundFX.playClick();
              onNavigateSection('hero');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
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
                  className={`px-3 py-1.5 rounded-full text-xs font-mono-code transition-all duration-200 cursor-pointer ${
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
          <div className="flex items-center gap-2">
            
            {/* Supabase status indicator badge */}
            <div 
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono-code text-slate-400 cursor-default"
              title="Connected to Supabase Backend Database"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-slate-300">Supabase</span>
            </div>

            {/* Search command trigger */}
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenSearch();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono-code text-slate-400 hover:text-white hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all cursor-pointer"
              title="Search tools & projects (Cmd+K)"
              data-cursor-label="SEARCH"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 text-[9px] rounded bg-white/[0.06] border border-white/10 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* User Auth or Profile Section */}
            {profile ? (
              <div className="relative">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setUserDropdownOpen(!userDropdownOpen);
                  }}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono-code text-slate-200 transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-slate-950 font-mono-code">
                    {profile.avatar_url || profile.full_name?.slice(0, 2).toUpperCase() || 'AI'}
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-[11px] font-bold text-white leading-tight max-w-[90px] truncate">
                      {profile.full_name}
                    </span>
                    <span className="text-[9px] text-cyan-400 font-mono-code flex items-center gap-1">
                      ⚡ {profile.xp} XP
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#080d1a] border border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-3 text-xs font-mono-code z-50">
                    <div className="pb-2 border-b border-white/10 mb-2">
                      <div className="font-bold text-white">{profile.full_name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{profile.email}</div>
                      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>Streak: {profile.streak_days} days · Level: {profile.level || 'Intermediate'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setUserDropdownOpen(false);
                        onNavigateSection('dashboard');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Command Center</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setUserDropdownOpen(false);
                        if (onOpenOnboarding) onOpenOnboarding();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Adjust AI Track</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setUserDropdownOpen(false);
                        if (onOpenAdmin) onOpenAdmin();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <Database className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Admin Panel</span>
                      <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">ADMIN</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFX.playClick();
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 mt-1 border-t border-white/5 pt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  soundFX.playClick();
                  if (onOpenAuth) {
                    onOpenAuth();
                  } else if (onOpenOnboarding) {
                    onOpenOnboarding();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-cyan-400/50 text-xs font-mono-code text-slate-200 transition-all cursor-pointer"
                data-cursor-label="SIGN IN"
              >
                <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Start Learning Pill */}
            <button
              onClick={() => {
                soundFX.playClick();
                if (onOpenOnboarding) {
                  onOpenOnboarding();
                } else {
                  onNavigateSection('paths');
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono-code font-bold tracking-wide uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all active:scale-95 cursor-pointer"
              data-cursor-label="START"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Personalize Path</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="xl:hidden bg-[#070a14] border-b border-white/10 px-6 py-4 space-y-2">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono-code text-slate-400">Database Status:</span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-cyan-300">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>{isConnected ? 'Supabase Live' : 'Connecting...'}</span>
              </div>
            </div>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  onNavigateSection(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-mono-code cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-cyan-500/10 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            {!profile && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  setMobileOpen(false);
                  if (onOpenAuth) onOpenAuth();
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono-code flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
};
