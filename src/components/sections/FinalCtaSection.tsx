import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Compass, Zap, Users, Trophy } from 'lucide-react';
import { HeroCanvas } from '../canvas/HeroCanvas';
import { soundFX } from '../../utils/audio';

const SOCIAL_PROOF = [
  { icon: Users,  value: '10,000+', label: 'Builders' },
  { icon: Trophy, value: '98+',     label: 'Projects' },
  { icon: Zap,    value: '45+',     label: 'AI Tools' },
];

export const FinalCtaSection: React.FC<{
  onStartLearning: () => void;
  onExploreTools: () => void;
}> = ({ onStartLearning, onExploreTools }) => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] py-28 px-4 sm:px-6 overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #020308 0%, #040816 40%, #020308 100%)',
      }}
    >
      {/* Section divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Radial glow background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] pointer-events-none"
        style={{
          width: '800px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, rgba(155,64,255,0.06) 50%, transparent 70%)',
        }}
      />

      {/* 3D AI Core */}
      <div className="absolute inset-0 z-10 pointer-events-auto opacity-65">
        <HeroCanvas />
      </div>

      {/* Outer orbit rings — pure CSS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        {[400, 560, 720].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-cyan-500/5"
            style={{
              width: size,
              height: size,
              top: -size / 2,
              left: -size / 2,
              animation: `orbit-cw ${18 + i * 8}s linear infinite`,
              borderColor: i === 0 ? 'rgba(0,212,255,0.06)' : i === 1 ? 'rgba(155,64,255,0.04)' : 'rgba(244,114,182,0.03)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center pointer-events-none select-none">

        {/* Tag */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div
            data-scanner="true"
            data-scanner-title="AI CORE CONVERGENCE"
            data-scanner-detail="The learning loop is complete. Ready to begin your first production build."
            data-scanner-category="SYSTEM CORE"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 pointer-events-auto cursor-pointer"
            style={{
              background: 'rgba(0,212,255,0.07)',
              border: '1px solid rgba(0,212,255,0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-cyan-400" />
            </span>
            <span className="text-[11px] font-mono-code font-semibold tracking-[0.18em] text-cyan-300 uppercase">
              CIRCULAR RETURN TO SOURCE
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
          <h2 className="text-4xl sm:text-7xl md:text-8xl font-display font-black tracking-[-0.02em] text-white mb-6 uppercase leading-[0.92]">
            YOUR NEXT PROJECT
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7b8fff 40%, #a78bfa 70%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.4))',
            }}>
              STARTS HERE.
            </span>
          </h2>
        </div>

        {/* Subtext */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          <p className="max-w-xl mx-auto text-base sm:text-xl font-body text-slate-300 leading-relaxed mb-10">
            Learn the tools. Build the skills. Create something real. Join over 10,000+ builders deploying production AI systems today.
          </p>
        </div>

        {/* Social proof row */}
        <div
          className={`flex items-center justify-center gap-6 mb-10 pointer-events-auto transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '280ms' }}
        >
          {SOCIAL_PROOF.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-display font-bold text-white">{value}</div>
                <div className="text-[10px] font-mono-code text-slate-500 uppercase">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 pointer-events-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '350ms' }}
        >
          <button
            onClick={() => { soundFX.playClick(); onStartLearning(); }}
            onMouseEnter={() => soundFX.playHover()}
            data-scanner="true"
            data-scanner-title="ACTION: INITIALIZE PATH"
            data-scanner-detail="Launch your personalized AI curriculum and claim your starter project."
            data-scanner-category="GET STARTED"
            className="group relative px-10 py-4 rounded-full text-black font-display font-bold text-sm tracking-wider uppercase flex items-center gap-2.5 cursor-pointer overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7b61ff 100%)',
              boxShadow: '0 0 40px rgba(0,212,255,0.5), 0 12px 32px rgba(0,0,0,0.4)',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 0 65px rgba(0,212,255,0.8), 0 16px 40px rgba(0,0,0,0.5)';
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.5), 0 12px 32px rgba(0,0,0,0.4)';
              e.currentTarget.style.transform = '';
            }}
          >
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }} />
            <Sparkles className="w-5 h-5 relative z-10" />
            <span className="relative z-10">START LEARNING NOW</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => { soundFX.playClick(); onExploreTools(); }}
            onMouseEnter={() => soundFX.playHover()}
            className="group px-8 py-4 rounded-full text-white font-display font-medium text-sm tracking-wider uppercase flex items-center gap-2.5 cursor-pointer transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.07)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.transform = '';
            }}
          >
            <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            <span>EXPLORE AI GALAXY</span>
          </button>
        </div>
      </div>
    </section>
  );
};
