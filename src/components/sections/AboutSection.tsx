import React, { useRef, useState, useEffect } from 'react';
import { Terminal, Code2, Cpu, Globe, Coffee, Zap } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Code2,    title: 'Clean Code',       desc: 'Writing maintainable, scalable code is a craft I take seriously.' },
  { icon: Cpu,      title: 'AI-Powered',       desc: 'Integrating cutting-edge AI tools to supercharge every project.' },
  { icon: Globe,    title: 'Web3 & Modern Web', desc: 'From React to Three.js — building immersive web experiences.' },
  { icon: Zap,      title: 'Performance First', desc: 'Obsessed with fast load times and silky-smooth interactions.' },
  { icon: Coffee,   title: 'Always Learning',   desc: 'Exploring new tech daily — curiosity is my superpower.' },
  { icon: Terminal, title: 'Dev Automation',    desc: 'Scripts, CI/CD, and tooling to keep workflows friction-free.' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export const AboutSection: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #07080d 0%, #0b0e16 50%, #07080d 100%)' }}
    >
      <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none" />

      {/* Section label */}
      <div className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`} ref={ref}>
          <span className="w-8 h-px" style={{ background: '#63b3ed' }} />
          <span className="text-[11px] font-mono-code text-[#63b3ed] tracking-widest uppercase">01 / About</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2
              className={`font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Crafting Digital<br />
              <span style={{
                background: 'linear-gradient(135deg, #63b3ed, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Experiences.</span>
            </h2>

            <div className={`space-y-4 text-[#8892a4] font-body leading-relaxed transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p>
                Hey! I'm <span className="text-white font-medium">Nirajan Khadka</span>, a passionate Full Stack Developer and AI Engineer based in <span className="text-[#63b3ed]">Nepal</span>. I love building things that live on the internet — from blazing-fast web apps to immersive 3D experiences.
              </p>
              <p>
                My journey started with curiosity about how websites work, and it evolved into a deep passion for crafting production-grade applications with modern technology. I specialize in <span className="text-white font-medium">React, TypeScript, Node.js, Three.js</span>, and AI/ML integrations.
              </p>
              <p>
                When I'm not coding, I'm exploring new frameworks, contributing to open source, or architecting solutions to complex problems. I believe great software is at the intersection of beautiful design and solid engineering.
              </p>
            </div>

            {/* Terminal-style bio card */}
            <div
              className={`mt-8 p-5 rounded-2xl font-mono-code text-sm transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,179,237,0.12)' }}
            >
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-[#454d5c] text-xs ml-2">~/nirajan — terminal</span>
              </div>
              <div className="space-y-1.5 text-[#8892a4] text-xs">
                <div><span className="text-[#63b3ed]">nirajan@dev</span><span className="text-[#454d5c]">:~$ </span><span className="text-white">whoami</span></div>
                <div className="text-[#8892a4] pl-2">Nirajan Khadka — Full Stack &amp; AI Developer</div>
                <div className="mt-2"><span className="text-[#63b3ed]">nirajan@dev</span><span className="text-[#454d5c]">:~$ </span><span className="text-white">cat location.txt</span></div>
                <div className="text-[#8892a4] pl-2">Kathmandu, Nepal 🇳🇵</div>
                <div className="mt-2"><span className="text-[#63b3ed]">nirajan@dev</span><span className="text-[#454d5c]">:~$ </span><span className="text-white">echo $STATUS</span></div>
                <div className="text-[#34d399] pl-2">✔ Available for freelance &amp; full-time</div>
                <div className="mt-1 text-[#63b3ed]/50 animate-pulse">▋</div>
              </div>
            </div>
          </div>

          {/* Highlights grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-[400ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={h.title}
                className="neon-card p-5 group"
                data-scanner="true"
                data-scanner-title={h.title}
                data-scanner-detail={h.desc}
                data-scanner-category="TRAIT"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <h.icon className="w-5 h-5 mb-3 text-[#63b3ed] group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-display font-bold text-sm mb-1.5">{h.title}</h3>
                <p className="text-[#8892a4] text-xs font-body leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
