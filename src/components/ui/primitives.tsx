/**
 * Reusable scroll-reveal wrapper.
 * Fades and slides up children when they enter the viewport.
 */
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;   // ms
  threshold?: number; // 0–1
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // px offset
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.12,
  direction = 'up',
  distance = 28,
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const translateMap = {
    up:    `0, ${distance}px`,
    down:  `0, -${distance}px`,
    left:  `${distance}px, 0`,
    right: `-${distance}px, 0`,
    none:  '0, 0',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : `translate(${translateMap[direction]})`,
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Section header compound component ─────────────────────── */
interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  className = '',
  centered = true,
}) => (
  <ScrollReveal className={`${centered ? 'text-center' : ''} max-w-3xl ${centered ? 'mx-auto' : ''} mb-16 ${className}`}>
    {eyebrow && (
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-cyan-400 text-xs font-mono-code mb-5"
        style={{
          background: 'rgba(0,212,255,0.06)',
          border: '1px solid rgba(0,212,255,0.18)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span>{eyebrow}</span>
      </div>
    )}
    <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4 leading-[0.95]">
      {title}
    </h2>
    {subtitle && (
      <p className="text-base sm:text-lg text-slate-400 font-body leading-relaxed">
        {subtitle}
      </p>
    )}
  </ScrollReveal>
);

/* ─── Generic neon card wrapper ─────────────────────────────── */
interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  onClick?: () => void;
}

export const NeonCard: React.FC<NeonCardProps> = ({
  children,
  className = '',
  accentColor = '#00d4ff',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`neon-card spotlight-card ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty('--card-x', `${x}%`);
        e.currentTarget.style.setProperty('--card-y', `${y}%`);
      }}
    >
      {children}
    </div>
  );
};
