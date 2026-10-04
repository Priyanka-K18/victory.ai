import React, { useEffect, useRef } from 'react';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export const ScannerCursor: React.FC = () => {
  // Use refs for everything to avoid ANY re-render inside RAF / event handlers
  const cursorRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef({ x: -300, y: -300 });
  const laggedRef = useRef({ x: -300, y: -300 });
  const stateRef = useRef({ isPointer: false, isClick: false, label: '' });

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // --- RAF Animation loop (no React state = no interference) ---
    let frameId: number;
    const tick = () => {
      laggedRef.current.x = lerp(laggedRef.current.x, targetRef.current.x, 0.18);
      laggedRef.current.y = lerp(laggedRef.current.y, targetRef.current.y, 0.18);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${laggedRef.current.x}px, ${laggedRef.current.y}px, 0)`;
        cursorRef.current.style.opacity = laggedRef.current.x < -200 ? '0' : '1';
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    // --- Update outer ring DOM directly (no React state) ---
    const updateRingDOM = () => {
      const { isPointer, isClick, label } = stateRef.current;
      if (!outerRingRef.current || !innerDotRef.current || !labelRef.current) return;

      const size = label ? 56 : isPointer ? 44 : isClick ? 22 : 28;
      outerRingRef.current.style.width = `${size}px`;
      outerRingRef.current.style.height = `${size}px`;
      outerRingRef.current.style.borderColor = label
        ? 'rgba(56, 189, 248, 0.7)'
        : isPointer
        ? 'rgba(56, 189, 248, 0.45)'
        : 'rgba(255, 255, 255, 0.2)';
      outerRingRef.current.style.backgroundColor = label
        ? 'rgba(56, 189, 248, 0.08)'
        : isPointer
        ? 'rgba(56, 189, 248, 0.04)'
        : 'transparent';
      outerRingRef.current.style.boxShadow = label
        ? '0 0 20px rgba(56, 189, 248, 0.25)'
        : 'none';

      const dotSize = label ? 8 : isPointer ? 6 : 4;
      innerDotRef.current.style.width = `${dotSize}px`;
      innerDotRef.current.style.height = `${dotSize}px`;
      innerDotRef.current.style.backgroundColor = isPointer || label ? '#38bdf8' : '#ffffff';
      innerDotRef.current.style.boxShadow =
        isPointer || label
          ? '0 0 10px rgba(56, 189, 248, 0.9), 0 0 20px rgba(56, 189, 248, 0.5)'
          : '0 0 6px rgba(255, 255, 255, 0.6)';
      innerDotRef.current.style.transform = isClick ? 'scale(0.6) translate(-50%,-50%)' : 'scale(1) translate(-50%,-50%)';

      if (label) {
        labelRef.current.textContent = label;
        labelRef.current.style.display = 'block';
      } else {
        labelRef.current.style.display = 'none';
      }
    };

    // --- Event handlers (stable references, no setState) ---
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      // Use composedPath instead of elementFromPoint to avoid interfering with click targets
      const target = e.target as Element | null;
      const clickableEl = target?.closest('button, a, input, select, textarea, [role="button"]');
      const labeledEl = target?.closest('[data-cursor-label]');

      const newPointer = !!clickableEl;
      const newLabel = labeledEl?.getAttribute('data-cursor-label') || '';

      if (
        stateRef.current.isPointer !== newPointer ||
        stateRef.current.label !== newLabel
      ) {
        stateRef.current.isPointer = newPointer;
        stateRef.current.label = newLabel;
        updateRingDOM();
      }
    };

    const onDown = () => {
      stateRef.current.isClick = true;
      updateRingDOM();
    };
    const onUp = () => {
      stateRef.current.isClick = false;
      updateRingDOM();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []); // ← EMPTY dependency array — runs once, never detaches

  return (
    // pointer-events-none on ALL levels — cursor NEVER intercepts clicks
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          transform: 'translate3d(-300px, -300px, 0)',
          willChange: 'transform',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Outer Ring */}
        <div
          ref={outerRingRef}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
          style={{
            width: 28,
            height: 28,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            backgroundColor: 'transparent',
            transition: 'width 0.15s ease, height 0.15s ease, border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Center Glowing Dot */}
        <div
          ref={innerDotRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 4,
            height: 4,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.1s ease, height 0.1s ease, background-color 0.1s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic Label Badge */}
        <div
          ref={labelRef}
          className="absolute left-7 top-1 px-2 py-0.5 rounded bg-[#070b14]/90 border border-cyan-400/40 text-[9px] font-mono-code font-bold text-cyan-300 tracking-wider uppercase backdrop-blur-md shadow-lg pointer-events-none whitespace-nowrap"
          style={{ display: 'none', pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
};
