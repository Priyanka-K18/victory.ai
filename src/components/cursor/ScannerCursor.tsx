import React, { useEffect, useState, useRef } from 'react';
import { soundFX } from '../../utils/audio';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export const ScannerCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -200, y: -200 });
  const laggedRef = useRef({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastLabelRef = useRef<string | null>(null);

  // Buttery-smooth direct DOM RAF animation (no React state updates in RAF!)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let frameId: number;
    const tick = () => {
      laggedRef.current.x = lerp(laggedRef.current.x, targetRef.current.x, 0.18);
      laggedRef.current.y = lerp(laggedRef.current.y, targetRef.current.y, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${laggedRef.current.x}px, ${laggedRef.current.y}px, 0)`;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Mouse event listeners
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const clickableEl = target?.closest('button, a, input, select, textarea, [role="button"]');
      const labeledEl = target?.closest('[data-cursor-label]');

      const newPointer = !!clickableEl;
      setIsPointer(prev => (prev !== newPointer ? newPointer : prev));

      const newLabel = labeledEl?.getAttribute('data-cursor-label') || null;
      if (newLabel !== lastLabelRef.current) {
        lastLabelRef.current = newLabel;
        setCursorLabel(newLabel);
      }
    };

    const onLeave = () => setIsVisible(false);
    const onDown = () => setIsClick(true);
    const onUp = () => setIsClick(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0"
        style={{ transform: 'translate3d(-200px, -200px, 0)', willChange: 'transform' }}
      >
        {/* Outer Ring */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 pointer-events-none"
          style={{
            width: cursorLabel ? 56 : isPointer ? 44 : isClick ? 22 : 28,
            height: cursorLabel ? 56 : isPointer ? 44 : isClick ? 22 : 28,
            borderColor: cursorLabel
              ? 'rgba(56, 189, 248, 0.7)'
              : isPointer
              ? 'rgba(56, 189, 248, 0.45)'
              : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: cursorLabel
              ? 'rgba(56, 189, 248, 0.08)'
              : isPointer
              ? 'rgba(56, 189, 248, 0.04)'
              : 'transparent',
            boxShadow: cursorLabel
              ? '0 0 20px rgba(56, 189, 248, 0.25)'
              : 'none',
          }}
        />

        {/* Center Glowing Dot */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 pointer-events-none"
          style={{
            width: cursorLabel ? 8 : isPointer ? 6 : 4,
            height: cursorLabel ? 8 : isPointer ? 6 : 4,
            backgroundColor: isPointer || cursorLabel ? '#38bdf8' : '#ffffff',
            boxShadow: isPointer || cursorLabel
              ? '0 0 10px rgba(56, 189, 248, 0.9), 0 0 20px rgba(56, 189, 248, 0.5)'
              : '0 0 6px rgba(255, 255, 255, 0.6)',
            transform: isClick ? 'scale(0.6)' : 'scale(1)',
          }}
        />

        {/* Dynamic Context Label badge beside cursor */}
        {cursorLabel && (
          <div
            className="absolute left-7 top-1 px-2 py-0.5 rounded bg-[#070b14]/90 border border-cyan-400/40 text-[9px] font-mono-code font-bold text-cyan-300 tracking-wider uppercase backdrop-blur-md shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
          >
            {cursorLabel}
          </div>
        )}
      </div>
    </div>
  );
};
