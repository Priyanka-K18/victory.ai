import React, { useState, useRef, useEffect } from 'react';
import {
  Trophy, Clock, Users, ArrowRight, CheckCircle, Zap, Flame, Timer,
} from 'lucide-react';
import { CHALLENGES } from '../../data/mockData';
import { ChallengeItem } from '../../types';
import { soundFX } from '../../utils/audio';

export const ChallengesSection: React.FC = () => {
  const [joinedId, setJoinedId] = useState<string | null>(null);
  const [visible, setVisible]   = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleJoin = (challenge: ChallengeItem) => {
    soundFX.playSuccess();
    setJoinedId(challenge.id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030710 0%, #04090f 100%)' }}
    >
      {/* Top section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Amber radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-8 pointer-events-none"
        style={{
          width: '900px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, rgba(239,68,68,0.3) 40%, transparent 70%)',
        }}
      />

      {/* Fine grid */}
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-mono-code mb-5"
            style={{
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.25)',
            }}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>WEEKLY AI HACK SPRINTS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4 leading-[0.95]">
            BUILD. COMPETE.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              CREATE.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Put your skills to the test in timed community hackathons. Win XP bounties, recruiter recognition, and feature spots on our global wall.
          </p>
        </div>

        {/* Challenge cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {CHALLENGES.map((challenge, idx) => {
            const isJoined = joinedId === challenge.id;
            return (
              <div
                key={challenge.id}
                onMouseEnter={() => soundFX.playHover()}
                data-scanner="true"
                data-scanner-title={`SPRINT: ${challenge.title}`}
                data-scanner-detail={challenge.brief}
                data-scanner-category="HACK SPRINT"
                className={`group relative flex flex-col justify-between rounded-3xl overflow-hidden transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                  background: 'rgba(8, 12, 28, 0.9)',
                  border: '1px solid rgba(245,158,11,0.18)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.45)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(245,158,11,0.15), 0 32px 60px rgba(0,0,0,0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.18)';
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
                }}
              >
                {/* Amber top glow accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), rgba(239,68,68,0.4), transparent)' }}
                />

                {/* Top corner glow */}
                <div
                  className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }}
                />

                <div className="p-8">
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider"
                      style={{
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        color: '#fbbf24',
                      }}
                    >
                      {challenge.category}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-mono-code text-amber-400">
                      <Timer className="w-3.5 h-3.5 animate-pulse" />
                      {challenge.daysRemaining} Days Left
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-display font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300"
                  >
                    {challenge.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-body leading-relaxed mb-6">
                    {challenge.brief}
                  </p>

                  {/* Deliverables */}
                  <div
                    className="p-4 rounded-2xl mb-6 space-y-2.5"
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider block mb-1">REQUIRED DELIVERABLES:</span>
                    {challenge.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono-code text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      {challenge.participantsCount} Builders
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      +{challenge.rewardXP} XP Bounty
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-8 pb-8">
                  <button
                    onClick={() => handleJoin(challenge)}
                    className="group/btn w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden transition-all"
                    style={{
                      background: isJoined
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : 'linear-gradient(135deg, #f59e0b, #ef4444)',
                      color: '#000',
                      boxShadow: isJoined
                        ? '0 0 24px rgba(16,185,129,0.4)'
                        : '0 0 24px rgba(245,158,11,0.35)',
                    }}
                    onMouseOver={(e) => {
                      if (!isJoined) e.currentTarget.style.boxShadow = '0 0 40px rgba(245,158,11,0.6)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = isJoined ? '0 0 24px rgba(16,185,129,0.4)' : '0 0 24px rgba(245,158,11,0.35)';
                      e.currentTarget.style.transform = '';
                    }}
                  >
                    {/* Shine sweep */}
                    <span
                      className="absolute inset-0 translate-x-[-110%] group-hover/btn:translate-x-[110%] transition-transform duration-700"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
                    />
                    {isJoined ? (
                      <>
                        <CheckCircle className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">SPRINT REGISTERED ✓</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">ENTER CHALLENGE SPRINT</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};
