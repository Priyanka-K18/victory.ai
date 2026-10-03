import React, { useState, useRef, useEffect } from 'react';
import {
  Code, Palette, Video, Megaphone, Briefcase,
  Database, GraduationCap, Zap, ArrowRight, Sparkles, CheckCircle,
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { CategoryInfo } from '../../types';
import { soundFX } from '../../utils/audio';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, Palette, Video, Megaphone, Briefcase, Database, GraduationCap, Zap,
};

export const CategoryUniverseSection: React.FC<{
  onSelectCategory: (catId: string) => void;
}> = ({ onSelectCategory }) => {
  const [selected, setSelected] = useState<CategoryInfo | null>(CATEGORIES[0]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020308 0%, #030715 50%, #020410 100%)' }}
    >
      {/* Section divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background ambient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] opacity-12 transition-all duration-1000 pointer-events-none"
        style={{
          width: '900px',
          height: '600px',
          backgroundColor: selected?.accentColor ?? '#38bdf8',
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-fine opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-cyan-400 text-xs font-mono-code mb-5"
            style={{
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.18)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CHOOSE YOUR CREATIVE REALM</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            WHAT DO YOU WANT TO{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7b61ff 60%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              CREATE?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Hover to reveal the production workflow, recommended AI suite, and flagship project for each discipline.
          </p>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CATEGORIES.map((cat, idx) => {
            const Icon = ICON_MAP[cat.iconName] || Code;
            const isSelected = selected?.id === cat.id;
            const isHovered  = hovered === cat.id;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => { soundFX.playHover(); setHovered(cat.id); setSelected(cat); }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => { soundFX.playClick(); setSelected(cat); onSelectCategory(cat.id); }}
                data-scanner="true"
                data-scanner-title={`DISCIPLINE: ${cat.title}`}
                data-scanner-detail={cat.description}
                data-scanner-category="CREATIVE REALM"
                className={`group relative flex flex-col justify-between p-6 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${idx * 60}ms`,
                  background: isSelected
                    ? `linear-gradient(135deg, ${cat.accentColor}12 0%, rgba(7,14,32,0.95) 100%)`
                    : 'rgba(7, 11, 24, 0.85)',
                  border: isSelected
                    ? `1px solid ${cat.accentColor}45`
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: isSelected
                    ? `0 0 40px ${cat.accentColor}18, 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`
                    : '0 8px 32px rgba(0,0,0,0.35)',
                  transform: isHovered ? 'translateY(-6px) scale(1.015)' : isSelected ? 'translateY(-3px)' : '',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Top ambient glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500"
                  style={{
                    backgroundColor: cat.accentColor,
                    opacity: isHovered ? 0.35 : isSelected ? 0.2 : 0.08,
                  }}
                />

                {/* Shimmer on hover */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-400"
                  style={{
                    background: `linear-gradient(135deg, ${cat.accentColor}06 0%, transparent 50%)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                <div>
                  {/* Icon + ID row */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `${cat.accentColor}14`,
                        color: cat.accentColor,
                        border: `1px solid ${cat.accentColor}30`,
                        boxShadow: isHovered ? `0 0 20px ${cat.accentColor}35` : 'none',
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono-code font-bold tracking-wider text-slate-600 uppercase">
                      [{cat.id}]
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-display font-bold mb-1.5 transition-colors duration-200"
                    style={{ color: isHovered ? cat.accentColor : '#fff' }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-body leading-relaxed mb-4">
                    {cat.tagline}
                  </p>
                </div>

                <div>
                  {/* Tool badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cat.tools.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono-code text-slate-300"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {cat.tools.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono-code text-slate-500">
                        +{cat.tools.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action row */}
                  <div
                    className="flex items-center justify-between text-xs font-mono-code pt-3 transition-colors duration-200"
                    style={{
                      color: isHovered ? cat.accentColor : 'rgba(56,189,248,0.7)',
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span>EXPLORE PATH</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep-dive Panel */}
        {selected && (
          <div
            className={`relative p-6 sm:p-8 rounded-3xl overflow-hidden transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{
              background: 'rgba(6, 11, 26, 0.9)',
              border: '1px solid rgba(0,212,255,0.2)',
              boxShadow: '0 0 60px rgba(0,212,255,0.08), 0 32px 64px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Gradient accent bg */}
            <div
              className="absolute inset-0 opacity-5 rounded-3xl pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 20% 50%, ${selected.accentColor} 0%, transparent 60%)` }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code mb-3"
                  style={{
                    background: `${selected.accentColor}10`,
                    border: `1px solid ${selected.accentColor}25`,
                    color: selected.accentColor,
                  }}
                >
                  <span>DISCIPLINE ARCHITECTURE</span>
                  <span className="opacity-40">•</span>
                  <span className="font-bold text-white">{selected.title}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  {selected.sampleProject}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed mb-6">
                  {selected.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => { soundFX.playClick(); onSelectCategory(selected.id); }}
                    className="group px-6 py-3 rounded-full text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all overflow-hidden relative"
                    style={{
                      background: selected.accentColor,
                      boxShadow: `0 0 24px ${selected.accentColor}50`,
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 0 40px ${selected.accentColor}70`; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 0 24px ${selected.accentColor}50`; }}
                  >
                    <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-600"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
                    <span className="relative z-10">Launch {selected.title} Path</span>
                    <ArrowRight className="w-3.5 h-3.5 relative z-10" />
                  </button>

                  <div className="text-xs font-mono-code text-slate-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Includes 6 Practical Projects + Live Portfolio Card</span>
                  </div>
                </div>
              </div>

              <div
                className="lg:col-span-5 p-5 rounded-2xl"
                style={{
                  background: 'rgba(0,0,0,0.45)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400">RECOMMENDED AI STACK</span>
                  <span className="text-xs font-mono-code" style={{ color: selected.accentColor }}>{selected.tools.length} Tools</span>
                </div>
                <div className="space-y-2">
                  {selected.tools.map((tool, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-xl text-xs font-mono-code transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = `${selected.accentColor}0c`; e.currentTarget.style.borderColor = `${selected.accentColor}25`; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                    >
                      <span className="text-white font-medium">{tool}</span>
                      <span className="text-[10px]" style={{ color: selected.accentColor }}>Integrated</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom divider */}
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};
