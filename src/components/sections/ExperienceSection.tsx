import React, { useRef, useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const EXPERIENCES = [
  {
    role: 'Senior Full Stack Developer',
    company: 'TechNova Solutions',
    period: 'Jan 2024 — Present',
    location: 'Remote · Nepal',
    type: 'Full-time',
    accent: '#63b3ed',
    description: 'Leading frontend architecture for a B2B SaaS platform serving 5K+ users. Rebuilt the core dashboard from scratch with React, TypeScript, and real-time data pipelines, reducing load time by 60%.',
    highlights: ['Built scalable micro-frontend architecture', 'Integrated AI-powered analytics (GPT-4)', 'Led team of 4 developers', 'Reduced API response times by 40%'],
  },
  {
    role: 'AI Integration Engineer',
    company: 'DataForge Labs',
    period: 'Jun 2023 — Dec 2023',
    location: 'Kathmandu, Nepal',
    type: 'Contract',
    accent: '#7c3aed',
    description: 'Developed LLM-powered automation pipelines and AI workflows for enterprise clients. Built a document processing system handling 10K+ PDFs/day using LangChain and vector databases.',
    highlights: ['LangChain / LLM pipeline development', 'Pinecone vector DB integration', '10K+ docs/day processing', 'Python, FastAPI backend'],
  },
  {
    role: 'Frontend Developer',
    company: 'Creative Digital Studio',
    period: 'Mar 2022 — May 2023',
    location: 'Remote',
    type: 'Full-time',
    accent: '#34d399',
    description: 'Crafted pixel-perfect, performant UI for 15+ client projects ranging from e-commerce to interactive marketing sites. Introduced Three.js to the team for 3D web experiences.',
    highlights: ['15+ client projects shipped', 'Introduced Three.js to the team', 'React, Next.js, animations', 'Mentored 2 junior developers'],
  },
  {
    role: 'Freelance Developer',
    company: 'Independent',
    period: '2021 — 2022',
    location: 'Worldwide · Remote',
    type: 'Freelance',
    accent: '#fbbf24',
    description: 'Built custom web applications, landing pages, and automation tools for international clients. Delivered 20+ projects with a 5-star rating on all platforms.',
    highlights: ['20+ projects delivered', '5★ avg client rating', 'Full-stack development', 'E-commerce integrations'],
  },
];

export const ExperienceSection: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: '#07080d' }}
    >
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <span className="w-8 h-px" style={{ background: '#63b3ed' }} />
          <span className="text-[11px] font-mono-code text-[#63b3ed] tracking-widest uppercase">04 / Experience</span>
        </div>

        <h2 className={`font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-14 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Career<br />
          <span style={{ background: 'linear-gradient(135deg, #63b3ed, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Journey.</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 sm:left-7 top-0 bottom-0 w-px pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(99,179,237,0.3) 0%, rgba(99,179,237,0.05) 100%)' }} />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.company}
                className={`relative pl-8 sm:pl-20 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[-4px] sm:left-[22px] top-6 w-3 h-3 rounded-full border-2"
                  style={{ borderColor: exp.accent, background: '#07080d', boxShadow: `0 0 12px ${exp.accent}60` }}
                />

                <div
                  className="glass-panel rounded-2xl p-6 group hover:border-opacity-30 transition-all duration-300"
                  data-scanner="true"
                  data-scanner-title={exp.role}
                  data-scanner-detail={exp.company}
                  data-scanner-category="EXPERIENCE"
                  style={{ '--hover-border': exp.accent } as React.CSSProperties}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${exp.accent}30`; }}
                  onMouseOut={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display font-black text-lg text-white mb-1 group-hover:text-[#63b3ed] transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono-code text-sm" style={{ color: exp.accent }}>{exp.company}</span>
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full uppercase tracking-wide"
                          style={{ background: `${exp.accent}15`, color: exp.accent, border: `1px solid ${exp.accent}25` }}>
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-right shrink-0">
                      <div className="flex items-center gap-1.5 text-[#8892a4] text-xs font-mono-code justify-end">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1.5 text-[#454d5c] text-xs font-mono-code justify-end">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-[#8892a4] text-sm font-body leading-relaxed mb-4">{exp.description}</p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-2">
                    {exp.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-1.5 text-xs font-mono-code text-[#8892a4]">
                        <ArrowUpRight className="w-3 h-3 shrink-0" style={{ color: exp.accent }} />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
