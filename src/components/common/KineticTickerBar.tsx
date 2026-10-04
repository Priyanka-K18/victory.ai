import React from 'react';
import { Zap } from 'lucide-react';

const TICKER_ITEMS = [
  'LEARN AI TOOLS',
  'BUILD REAL PROJECTS',
  'MASTER PROMPT ENGINEERING',
  'DEPLOY TO PRODUCTION',
  'CREATE YOUR PORTFOLIO',
  'JOIN 10,000+ BUILDERS',
  'AI FOR EVERY FIELD',
  'CURSOR · CLAUDE · RUNWAY · MIDJOURNEY',
  'FROM ZERO TO AI ENGINEER',
  'PRACTICAL LEARNING. REAL RESULTS.',
];

interface KineticTickerBarProps {
  variant?: 'default' | 'highlight';
}

export const KineticTickerBar: React.FC<KineticTickerBarProps> = ({ variant = 'default' }) => {
  // Duplicate items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  
  const isHighlight = variant === 'highlight';

  return (
    <div
      className="ticker-wrap relative py-3 overflow-hidden border-y"
      style={{
        background: isHighlight
          ? 'linear-gradient(90deg, rgba(56,189,248,0.06) 0%, rgba(129,140,248,0.05) 50%, rgba(56,189,248,0.06) 100%)'
          : 'rgba(255,255,255,0.015)',
        borderColor: isHighlight ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.05)',
      }}
    >
      <div
        className="ticker-inner gap-0"
        style={{ animationDuration: isHighlight ? '22s' : '30s' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6"
          >
            <Zap
              className="w-3 h-3 flex-shrink-0"
              style={{ color: isHighlight ? '#38bdf8' : 'rgba(99,179,237,0.4)' }}
            />
            <span
              className="text-[11px] font-mono-code font-semibold tracking-[0.2em] uppercase"
              style={{ color: isHighlight ? 'rgba(240,242,248,0.85)' : 'rgba(148,163,184,0.6)' }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
