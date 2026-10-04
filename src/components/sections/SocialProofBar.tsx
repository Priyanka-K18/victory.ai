import React, { useEffect, useRef, useState } from 'react';
import { Users, Trophy, Zap, Briefcase, Star, Code2 } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: number;
  suffix: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const STATS: StatItem[] = [
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Active Builders',
    color: '#38bdf8',
    bgColor: 'rgba(56,189,248,0.08)',
    borderColor: 'rgba(56,189,248,0.2)',
  },
  {
    icon: Trophy,
    value: 98,
    suffix: '+',
    label: 'Real Projects',
    color: '#fbbf24',
    bgColor: 'rgba(251,191,36,0.08)',
    borderColor: 'rgba(251,191,36,0.2)',
  },
  {
    icon: Zap,
    value: 45,
    suffix: '+',
    label: 'AI Tools',
    color: '#a855f7',
    bgColor: 'rgba(168,85,247,0.08)',
    borderColor: 'rgba(168,85,247,0.2)',
  },
  {
    icon: Code2,
    value: 9,
    suffix: '',
    label: 'Disciplines',
    color: '#34d399',
    bgColor: 'rgba(52,211,153,0.08)',
    borderColor: 'rgba(52,211,153,0.2)',
  },
  {
    icon: Briefcase,
    value: 4,
    suffix: ' Tracks',
    label: 'Career Paths',
    color: '#f472b6',
    bgColor: 'rgba(244,114,182,0.08)',
    borderColor: 'rgba(244,114,182,0.2)',
  },
  {
    icon: Star,
    value: 98,
    suffix: '%',
    label: 'Satisfaction',
    color: '#fb923c',
    bgColor: 'rgba(251,146,60,0.08)',
    borderColor: 'rgba(251,146,60,0.2)',
  },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [active, target, duration]);

  return count;
}

const StatCard: React.FC<{ stat: StatItem; delay: number; active: boolean }> = ({
  stat,
  delay,
  active,
}) => {
  const count = useCountUp(stat.value, 1800, active);
  const Icon = stat.icon;

  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-500 group hover:scale-105"
      style={{
        background: stat.bgColor,
        borderColor: stat.borderColor,
        transitionDelay: `${delay}ms`,
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${stat.borderColor}`;
        (e.currentTarget as HTMLElement).style.borderColor = stat.color.replace(')', ', 0.5)').replace('rgb', 'rgba');
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.borderColor = stat.borderColor;
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ background: stat.bgColor, border: `1px solid ${stat.borderColor}` }}
      >
        <Icon className="w-5 h-5" style={{ color: stat.color }} />
      </div>
      <div
        className="text-3xl sm:text-4xl font-display font-black tabular-nums mb-1"
        style={{ color: stat.color }}
      >
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider text-center">
        {stat.label}
      </div>
    </div>
  );
};

export const SocialProofBar: React.FC = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-16 px-4 sm:px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #04090f 0%, #060d1a 50%, #04090f 100%)',
      }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[200px] rounded-full blur-[100px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, rgba(129,140,248,0.1) 50%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono-code tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-live" />
            PLATFORM METRICS — LIVE
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={i * 80} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
};
