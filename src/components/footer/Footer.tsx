import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  ArrowUp, 
  Terminal, 
  ExternalLink, 
  Heart,
  Code2,
  Layers,
  Rocket
} from 'lucide-react';
import { Github, Twitter, Linkedin } from '../common/Icons';
import { soundFX } from '../../utils/audio';

interface FooterProps {
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #05070d 0%, #030408 100%)',
        borderColor: 'rgba(255,255,255,0.07)',
      }}
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-[1px] shadow-[0_0_20px_rgba(56,189,248,0.35)]">
                <div className="w-full h-full rounded-[11px] bg-[#070a14] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black tracking-tight text-white text-lg">VICTORY</span>
                  <span className="text-cyan-400 font-display font-black text-lg">.AI</span>
                </div>
                <div className="text-[10px] font-mono-code text-slate-400 tracking-wider">
                  AI-POWERED PRACTICAL LEARNING PLATFORM
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm font-body leading-relaxed max-w-sm mb-6">
              Learn AI tools, master multi-stage workflows, build real production projects, and prove your engineering competence through verified portfolio artifacts.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/30 transition-all"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Column 1: Ecosystem */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-slate-300 font-bold mb-4">
              AI Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-code text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('tools')} className="hover:text-cyan-300 transition-colors">
                  AI Tool Universe
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('tools')} className="hover:text-cyan-300 transition-colors">
                  Tool Workflows
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('fields')} className="hover:text-cyan-300 transition-colors">
                  AI for Every Field
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('paths')} className="hover:text-cyan-300 transition-colors">
                  Spatial Learning Paths
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Build & Practice */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-slate-300 font-bold mb-4">
              Build &amp; Practice
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-code text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('projects')} className="hover:text-cyan-300 transition-colors">
                  Production Project Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('mentor')} className="hover:text-cyan-300 transition-colors">
                  AI Mentor 24/7
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('prompt-lab')} className="hover:text-cyan-300 transition-colors">
                  Prompt Engineering Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('challenges')} className="hover:text-cyan-300 transition-colors">
                  Weekend AI Hackathons
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Outcomes */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-slate-300 font-bold mb-4">
              Outcomes &amp; Career
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-code text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('dashboard')} className="hover:text-cyan-300 transition-colors">
                  Student Command Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('portfolio')} className="hover:text-cyan-300 transition-colors">
                  Verified Portfolio Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('career')} className="hover:text-cyan-300 transition-colors">
                  Career Transition Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('community')} className="hover:text-cyan-300 transition-colors">
                  Builder Community
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-500">
          <div>
            © {new Date().getFullYear()} VICTORY.AI. All rights reserved. Practical AI Learning Platform.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-cyan-400/40 text-slate-400 hover:text-white transition-all group"
            data-cursor-label="TOP"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
