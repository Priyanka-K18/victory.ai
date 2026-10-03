import React, { useRef, useEffect, useState } from 'react';
import {
  XCircle, AlertCircle, CheckCircle2, BrainCircuit, TrendingUp,
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

const MODELS = [
  {
    id: 'traditional',
    badge: 'MODEL 01 — HISTORICAL',
    badgeColor: '#64748b',
    title: 'Traditional Tech Education',
    loop: ['WATCH 40+ HOURS OF LECTURES', 'MEMORIZE SYNTAX FOR EXAM', 'FORGET WITHIN 14 DAYS'],
    loopColor: 'rgba(100,116,139,0.7)',
    dotColor: '#475569',
    description: 'Teaches theory without practical context. Students complete courses with zero deployed applications to show recruiters.',
    outcome: 'Retention Rate: ~12%',
    outcomeIcon: <XCircle className="w-4 h-4" />,
    outcomeColor: '#64748b',
    featured: false,
  },
  {
    id: 'generic',
    badge: 'MODEL 02 — SHALLOW PROMPTING',
    badgeColor: '#f59e0b',
    title: 'Generic AI "Cheat Codes"',
    loop: ['ASK VAGUE CHATBOT QUESTION', 'BLINDLY COPY-PASTE CODE', 'COLLAPSE WHEN ERRORS OCCUR'],
    loopColor: 'rgba(245,158,11,0.8)',
    dotColor: '#f59e0b',
    description: 'Creates reliance on autocomplete without foundational understanding of architecture, latency, cost, or security.',
    outcome: 'Fragile Understanding',
    outcomeIcon: <AlertCircle className="w-4 h-4" />,
    outcomeColor: '#f59e0b',
    featured: false,
  },
  {
    id: 'victory',
    badge: 'MODEL 03 — PRODUCTION COGNITION',
    badgeColor: '#00d4ff',
    title: 'Human + AI + Project Model',
    loop: [
      'DISCOVER & LEARN MENTAL MODELS',
      'EXPERIMENT & USE AI TOOLS',
      'BUILD, SOLVE & DEPLOY TO EDGE',
      'PROVE SKILLS IN 3D PORTFOLIO',
    ],
    loopColor: 'rgba(0,212,255,0.9)',
    dotColor: '#00d4ff',
    description: 'Human guidance provides direction, AI tools provide exponential speed, and real deployed projects provide undeniable proof.',
    outcome: 'Retention & Career Readiness: 94%+',
    outcomeIcon: <CheckCircle2 className="w-4 h-4" />,
    outcomeColor: '#00ff88',
    featured: true,
  },
];

export const ComparisonSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030710 0%, #02040b 100%)' }}
    >
      {/* Section divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-6 pointer-events-none"
        style={{
          width: '800px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.5) 0%, rgba(139,92,246,0.3) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-cyan-400 text-xs font-mono-code mb-5"
            style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.18)' }}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>PEDAGOGICAL PARADIGM SHIFT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4 leading-[0.95]">
            WHY THIS{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7b61ff 60%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              PLATFORM?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Passive video watching leads to forgetting. Copy-pasting AI prompts leads to shallow illusions of competence.
            Here is the modern learning model.
          </p>
        </div>

        {/* 3 Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {MODELS.map((model, idx) => (
            <div
              key={model.id}
              className={`group relative flex flex-col justify-between rounded-3xl overflow-hidden transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${idx * 100}ms`,
                padding: '2rem',
                background: model.featured
                  ? 'linear-gradient(180deg, rgba(0,212,255,0.06) 0%, rgba(7,12,28,0.95) 100%)'
                  : 'rgba(6, 10, 22, 0.8)',
                border: `1px solid ${model.featured ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: model.featured
                  ? '0 0 60px rgba(0,212,255,0.15), 0 32px 64px rgba(0,0,0,0.5)'
                  : '0 16px 40px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseOver={(e) => {
                if (!model.featured) {
                  e.currentTarget.style.borderColor = `${model.badgeColor}30`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 80px rgba(0,212,255,0.25), 0 40px 80px rgba(0,0,0,0.5)';
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = model.featured ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = model.featured ? '0 0 60px rgba(0,212,255,0.15), 0 32px 64px rgba(0,0,0,0.5)' : '0 16px 40px rgba(0,0,0,0.4)';
              }}
            >
              {/* Recommended badge */}
              {model.featured && (
                <div
                  className="absolute top-0 right-0 px-3.5 py-1.5 rounded-bl-2xl text-[10px] font-mono-code font-bold uppercase tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff, #7b61ff)',
                    color: '#000',
                  }}
                >
                  ✦ RECOMMENDED
                </div>
              )}

              {/* Top glow accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${model.badgeColor}80, transparent)`,
                }}
              />

              <div>
                <div className="text-[11px] font-mono-code uppercase tracking-widest mb-2 font-bold" style={{ color: model.badgeColor }}>
                  {model.badge}
                </div>
                <h3
                  className="text-2xl font-display font-bold mb-4 transition-colors"
                  style={{ color: model.featured ? '#fff' : '#cbd5e1' }}
                >
                  {model.title}
                </h3>

                {/* Loop display */}
                <div
                  className="p-4 rounded-2xl mb-5 space-y-2.5"
                  style={{
                    background: model.featured ? 'rgba(0,212,255,0.06)' : 'rgba(0,0,0,0.4)',
                    border: `1px solid ${model.featured ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
                  }}
                >
                  {model.loop.map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-mono-code" style={{ color: model.loopColor }}>
                      {model.featured
                        ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: model.badgeColor }} />
                        : <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: model.dotColor }} />
                      }
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 font-body leading-relaxed mb-5">
                  {model.description}
                </p>
              </div>

              {/* Outcome row */}
              <div
                className="pt-4 flex items-center gap-2 text-xs font-mono-code"
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  color: model.outcomeColor,
                }}
              >
                <span style={{ color: model.outcomeColor }}>{model.outcomeIcon}</span>
                <span>{model.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy banner */}
        <div
          className={`relative p-6 rounded-2xl text-center text-xs sm:text-sm font-mono-code text-slate-300 max-w-4xl mx-auto overflow-hidden transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transitionDelay: '400ms',
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.2) 0%, transparent 70%)',
            }}
          />
          <div className="flex items-center justify-center gap-2 relative z-10">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>
              <span className="text-cyan-400 font-bold">OUR FORMULA:</span> HUMAN DIRECTION + AI ASSISTANCE + PRODUCTION PROJECTS ={' '}
              <span className="text-emerald-400 font-bold">CAREER VELOCITY.</span>
            </span>
          </div>
        </div>

      </div>

      {/* Bottom divider */}
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};
