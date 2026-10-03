import React, { useRef, useState, useEffect } from 'react';

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface Skill { name: string; level: number; color: string; }

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    icon: '⬡',
    skills: [
      { name: 'React / Next.js',   level: 95, color: '#63b3ed' },
      { name: 'TypeScript',        level: 90, color: '#63b3ed' },
      { name: 'Three.js / WebGL',  level: 82, color: '#7c3aed' },
      { name: 'Tailwind CSS',      level: 92, color: '#63b3ed' },
      { name: 'Framer Motion',     level: 85, color: '#7c3aed' },
    ],
  },
  {
    title: 'Backend',
    icon: '⬡',
    skills: [
      { name: 'Node.js / Express', level: 88, color: '#34d399' },
      { name: 'Python / FastAPI',  level: 80, color: '#34d399' },
      { name: 'PostgreSQL',        level: 78, color: '#34d399' },
      { name: 'MongoDB',           level: 82, color: '#34d399' },
      { name: 'Redis',             level: 70, color: '#34d399' },
    ],
  },
  {
    title: 'AI / ML',
    icon: '⬡',
    skills: [
      { name: 'LangChain / LLMs',  level: 80, color: '#f472b6' },
      { name: 'OpenAI API',        level: 90, color: '#f472b6' },
      { name: 'Python / NumPy',    level: 78, color: '#f472b6' },
      { name: 'Prompt Engineering', level: 88, color: '#f472b6' },
      { name: 'Vector DBs',        level: 72, color: '#f472b6' },
    ],
  },
  {
    title: 'DevOps',
    icon: '⬡',
    skills: [
      { name: 'Docker',            level: 75, color: '#fbbf24' },
      { name: 'Git / GitHub',      level: 95, color: '#fbbf24' },
      { name: 'CI/CD Pipelines',   level: 72, color: '#fbbf24' },
      { name: 'Linux / Shell',     level: 80, color: '#fbbf24' },
      { name: 'Vercel / Railway',  level: 88, color: '#fbbf24' },
    ],
  },
];

const TOOLS = [
  'React', 'Next.js', 'TypeScript', 'Three.js', 'Node.js', 'Python', 'FastAPI',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Git', 'Figma', 'Vite', 'Prisma',
  'OpenAI', 'LangChain', 'Tailwind', 'GSAP', 'Framer Motion',
];

const SkillBar: React.FC<{ skill: Skill; delay: number; inView: boolean }> = ({ skill, delay, inView }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[#f0f2f8] text-xs font-mono-code">{skill.name}</span>
        <span className="text-[11px] font-mono-code" style={{ color: skill.color }}>{skill.level}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}55`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="skills"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: '#07080d' }}
    >
      <div className="absolute inset-0 bg-grid-cyber opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <span className="w-8 h-px" style={{ background: '#63b3ed' }} />
          <span className="text-[11px] font-mono-code text-[#63b3ed] tracking-widest uppercase">02 / Skills</span>
        </div>

        <h2
          className={`font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          My Tech<br />
          <span style={{
            background: 'linear-gradient(135deg, #63b3ed, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Arsenal.</span>
        </h2>
        <p className={`text-[#8892a4] max-w-xl mb-14 font-body text-base transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          A curated set of tools and technologies I use to build fast, scalable, and visually stunning products.
        </p>

        {/* Skill categories */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="glass-panel rounded-2xl p-6"
              data-scanner="true"
              data-scanner-title={`${cat.title} Skills`}
              data-scanner-category="SKILLS"
            >
              <h3 className="font-display font-bold text-white text-base mb-5 flex items-center gap-2">
                <span style={{ color: cat.skills[0].color }}>{cat.icon}</span>
                {cat.title}
              </h3>
              {cat.skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={300 + i * 80} inView={inView} />
              ))}
            </div>
          ))}
        </div>

        {/* Tech tag cloud */}
        <div className={`transition-all duration-700 delay-[500ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[11px] font-mono-code text-[#454d5c] tracking-widest uppercase mb-5">Also working with</p>
          <div className="flex flex-wrap gap-2.5">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-full text-xs font-mono-code text-[#8892a4] hover:text-white transition-colors duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseOver={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(99,179,237,0.25)'; (e.target as HTMLElement).style.color = '#63b3ed'; }}
                onMouseOut={(e)  => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.target as HTMLElement).style.color = ''; }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
