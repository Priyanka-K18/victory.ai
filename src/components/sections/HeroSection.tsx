import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Code2, 
  Video, 
  Palette, 
  Rocket, 
  Play, 
  Zap, 
  CheckCircle2, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { HeroCanvas } from '../canvas/HeroCanvas';
import { soundFX } from '../../utils/audio';

interface HeroSectionProps {
  onStartLearning: () => void;
  onExploreTools: () => void;
  onOpenProject?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onStartLearning, 
  onExploreTools,
  onOpenProject 
}) => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroRef.current.style.setProperty('--mx', `${x}%`);
      heroRef.current.style.setProperty('--my', `${y}%`);
      heroRef.current.style.setProperty('--tilt-x', `${(x - 50) * 0.08}px`);
      heroRef.current.style.setProperty('--tilt-y', `${(y - 50) * 0.08}px`);
    };

    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMove, { passive: true });
    return () => el?.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
      style={{
        background: `
          radial-gradient(ellipse 65% 50% at var(--mx, 50%) var(--my, 30%), rgba(56,189,248,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 55% 45% at calc(100% - var(--mx, 50%)) calc(100% - var(--my, 30%)), rgba(129,140,248,0.06) 0%, transparent 60%),
          linear-gradient(180deg, #05070d 0%, #070a12 50%, #05070d 100%)
        `,
      }}
    >
      {/* Subtle futuristic cyber grid */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)'
        }}
      />

      {/* 3D Knowledge Universe Canvas — centered interactive AI Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[620px] h-[620px] sm:w-[750px] sm:h-[750px] opacity-80">
          <HeroCanvas />
        </div>
      </div>

      {/* Floating Knowledge / Node Cards on Left and Right (Desktops) */}
      <div className="hidden lg:block absolute inset-0 max-w-7xl mx-auto pointer-events-none">
        {/* Floating Card: AI Video Workflow */}
        <div 
          className="absolute top-36 left-8 p-3.5 rounded-2xl border backdrop-blur-xl transition-transform duration-300 pointer-events-auto shadow-2xl"
          style={{
            background: 'rgba(10, 14, 24, 0.75)',
            borderColor: 'rgba(56, 189, 248, 0.25)',
            transform: 'translate(calc(var(--tilt-x, 0px) * -1), calc(var(--tilt-y, 0px) * -1))',
          }}
          data-cursor-label="EXPLORE"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Video className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-mono-code font-bold text-slate-200">AI VIDEO PIPELINE</div>
              <div className="text-[9px] font-mono-code text-slate-500">Runway · ElevenLabs · CapCut</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono-code bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Workflow Verified · 9 Stages
          </div>
        </div>

        {/* Floating Card: Autonomous Code Agents */}
        <div 
          className="absolute top-44 right-8 p-3.5 rounded-2xl border backdrop-blur-xl transition-transform duration-300 pointer-events-auto shadow-2xl"
          style={{
            background: 'rgba(10, 14, 24, 0.75)',
            borderColor: 'rgba(129, 140, 248, 0.25)',
            transform: 'translate(var(--tilt-x, 0px), calc(var(--tilt-y, 0px) * -1))',
          }}
          data-cursor-label="BUILD"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-mono-code font-bold text-slate-200">AUTONOMOUS AGENTS</div>
              <div className="text-[9px] font-mono-code text-slate-500">Claude 3.7 · Cursor · LangChain</div>
            </div>
          </div>
          <div className="text-[10px] text-cyan-300 font-mono-code flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            Build Production Full-Stack App
          </div>
        </div>

        {/* Floating Node: Prompt Lab Pill */}
        <div 
          className="absolute bottom-28 left-12 p-3 rounded-xl border backdrop-blur-md transition-transform duration-300 pointer-events-auto"
          style={{
            background: 'rgba(10, 14, 24, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translate(calc(var(--tilt-x, 0px) * -0.6), calc(var(--tilt-y, 0px) * 0.6))',
          }}
          data-cursor-label="LEARN"
        >
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Prompt Lab: <span className="text-cyan-400">Beginner → Expert</span></span>
          </div>
        </div>

        {/* Floating Node: Live Portfolio Output */}
        <div 
          className="absolute bottom-32 right-12 p-3 rounded-xl border backdrop-blur-md transition-transform duration-300 pointer-events-auto"
          style={{
            background: 'rgba(10, 14, 24, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translate(calc(var(--tilt-x, 0px) * 0.6), calc(var(--tilt-y, 0px) * 0.6))',
          }}
          data-cursor-label="SHOWCASE"
        >
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Student Proof · <span className="text-emerald-400">Deployed</span></span>
          </div>
        </div>
      </div>

      {/* Central Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Platform Identity Badge */}
        <div
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 text-xs font-mono-code tracking-widest uppercase transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 0 24px rgba(56, 189, 248, 0.12)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-semibold">VICTORY.AI</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">PRACTICAL AI LEARNING PLATFORM</span>
        </div>

        {/* Hero Headline — exact requirement: LEARN AI. BUILD REAL THINGS. */}
        <h1
          className={`font-display font-black leading-[0.92] mb-6 tracking-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)' }}
        >
          <span className="block text-white">LEARN AI.</span>
          <span 
            className="block"
            style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            BUILD REAL THINGS.
          </span>
        </h1>

        {/* Supporting Message — exact requirement */}
        <p
          className={`max-w-2xl text-slate-300 text-base sm:text-xl leading-relaxed mb-10 font-body transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          Learn AI tools, coding, creativity and practical skills by building real-world projects with AI as your learning partner.
        </p>

        {/* CTAs — exact requirement: START LEARNING (Primary) & EXPLORE AI TOOLS (Secondary) */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Primary CTA */}
          <button
            onClick={() => {
              soundFX.playClick();
              onStartLearning();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-body font-bold text-sm tracking-wider uppercase text-slate-950 flex items-center justify-center gap-2.5 transition-all duration-300 group shadow-[0_0_35px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.6)] hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #60a5fa 100%)',
            }}
            data-cursor-label="START"
          >
            <span>START LEARNING</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => {
              soundFX.playClick();
              onExploreTools();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-body font-semibold text-sm tracking-wider uppercase text-slate-200 flex items-center justify-center gap-2.5 border border-white/10 hover:border-cyan-400/40 hover:text-white transition-all duration-300 group hover:bg-white/[0.04] active:scale-[0.98]"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(12px)',
            }}
            data-cursor-label="EXPLORE"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>EXPLORE AI TOOLS</span>
          </button>
        </div>

        {/* 7-Step Core Learning Flow Banner */}
        <div
          className={`w-full max-w-4xl p-3 sm:p-4 rounded-2xl border transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            background: 'rgba(10, 14, 24, 0.65)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-widest mb-2.5 text-center">
            THE PRACTICAL PATHWAY TO AI MASTERY
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono-code">
            <span className="px-2.5 py-1 rounded bg-white/5 text-slate-200 font-semibold">LEARN</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded bg-white/5 text-slate-200 font-semibold">EXPERIMENT</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/20">USE AI TOOLS</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20">BUILD PROJECTS</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded bg-white/5 text-slate-200 font-semibold">SOLVE PROBLEMS</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">PORTFOLIO</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">CAREER</span>
          </div>
        </div>

        {/* Scroll Prompt */}
        <button
          onClick={() => {
            soundFX.playClick();
            onExploreTools();
          }}
          className="mt-12 flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors group cursor-pointer"
        >
          <span className="text-[10px] font-mono-code tracking-widest uppercase">DISCOVER THE UNIVERSE</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400/80 group-hover:text-cyan-400" />
        </button>

      </div>
    </section>
  );
};
