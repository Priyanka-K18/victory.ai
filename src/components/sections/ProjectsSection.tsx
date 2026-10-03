import React, { useRef, useState, useEffect } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Github } from '../common/Icons';

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

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accent: string;
  badge: string;
  year: string;
  stats: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 'ai-saas',
    title: 'AI SaaS Platform',
    subtitle: 'Production AI Toolkit',
    description: 'A full-stack AI productivity suite with GPT-4 integration, real-time collaboration, and a custom prompt engineering workbench. 500+ active users.',
    tags: ['Next.js', 'OpenAI', 'Prisma', 'Redis', 'Stripe'],
    accent: '#63b3ed',
    badge: 'Featured',
    year: '2024',
    stats: [{ label: 'Users', value: '500+' }, { label: 'APIs', value: '12' }, { label: 'Uptime', value: '99.9%' }],
  },
  {
    id: '3d-portfolio',
    title: '3D Interactive Portfolio',
    subtitle: 'Three.js Masterpiece',
    description: 'An immersive 3D portfolio experience built with Three.js and React. Features custom shaders, particle systems, and physics-based interactions.',
    tags: ['Three.js', 'React', 'GLSL', 'GSAP', 'TypeScript'],
    accent: '#7c3aed',
    badge: 'Creative',
    year: '2024',
    stats: [{ label: 'FPS', value: '60' }, { label: 'Shaders', value: '8' }, { label: 'Particles', value: '50K' }],
  },
  {
    id: 'devtool',
    title: 'CLI Dev Automation Tool',
    subtitle: 'OSS Developer Tool',
    description: 'A powerful command-line toolkit for automating repetitive development tasks — project scaffolding, CI/CD setup, and intelligent code generation.',
    tags: ['Node.js', 'TypeScript', 'Commander', 'Inquirer', 'Plop'],
    accent: '#34d399',
    badge: 'Open Source',
    year: '2024',
    stats: [{ label: 'Stars', value: '280+' }, { label: 'Downloads', value: '2K+' }, { label: 'Commands', value: '30+' }],
  },
  {
    id: 'realtime',
    title: 'Real-Time Collab Editor',
    subtitle: 'Google Docs Alternative',
    description: 'A real-time collaborative document editor with WebSocket sync, operational transforms, conflict resolution, and rich-text support.',
    tags: ['React', 'WebSockets', 'Node.js', 'MongoDB', 'Y.js'],
    accent: '#fbbf24',
    badge: 'Full Stack',
    year: '2023',
    stats: [{ label: 'Latency', value: '<50ms' }, { label: 'Users', value: '100+' }, { label: 'Docs', value: '1K+' }],
  },
  {
    id: 'ecom',
    title: 'AI-Powered E-Commerce',
    subtitle: 'Smart Shopping Platform',
    description: 'A modern e-commerce platform with AI-driven product recommendations, semantic search, and a frictionless checkout powered by Stripe.',
    tags: ['Next.js', 'Pinecone', 'Stripe', 'PostgreSQL', 'Tailwind'],
    accent: '#f472b6',
    badge: 'E-Commerce',
    year: '2023',
    stats: [{ label: 'Products', value: '500+' }, { label: 'Revenue', value: '$10K+' }, { label: 'Conv.', value: '4.2%' }],
  },
  {
    id: 'dapp',
    title: 'DeFi Dashboard',
    subtitle: 'Web3 Analytics',
    description: 'A real-time DeFi analytics dashboard with on-chain data, portfolio tracking, and gas price alerts across Ethereum and Polygon.',
    tags: ['React', 'Ethers.js', 'The Graph', 'Web3', 'Recharts'],
    accent: '#a78bfa',
    badge: 'Web3',
    year: '2023',
    stats: [{ label: 'Chains', value: '5' }, { label: 'Tokens', value: '200+' }, { label: 'Txns', value: '1M+' }],
  },
];

export const ProjectsSection: React.FC = () => {
  const { ref, inView } = useInView();
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Featured', 'Full Stack', 'Open Source', 'Creative', 'Web3'];

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.badge === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #07080d 0%, #0b0e16 50%, #07080d 100%)' }}
    >
      <div className="absolute inset-0 bg-grid-fine opacity-25 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(99,179,237,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <span className="w-8 h-px" style={{ background: '#63b3ed' }} />
          <span className="text-[11px] font-mono-code text-[#63b3ed] tracking-widest uppercase">03 / Projects</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className={`font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-3 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Selected<br />
              <span style={{ background: 'linear-gradient(135deg, #63b3ed, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Work.</span>
            </h2>
          </div>
          {/* Filter pills */}
          <div className={`flex flex-wrap gap-2 transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-3 py-1.5 rounded-full text-xs font-mono-code transition-all duration-200"
                style={{
                  background: activeFilter === f ? 'rgba(99,179,237,0.15)' : 'rgba(255,255,255,0.04)',
                  border: activeFilter === f ? '1px solid rgba(99,179,237,0.35)' : '1px solid rgba(255,255,255,0.07)',
                  color: activeFilter === f ? '#63b3ed' : '#8892a4',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 70} inView={inView} />
          ))}
        </div>

        {/* View all */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-mono-code text-[#8892a4] hover:text-white transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,179,237,0.3)'; e.currentTarget.style.color = '#63b3ed'; }}
            onMouseOut={(e)  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = ''; }}
          >
            <Github className="w-4 h-4" />
            View All on GitHub
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; delay: number; inView: boolean }> = ({ project, delay, inView }) => {
  return (
    <div
      className={`neon-card p-6 flex flex-col group spotlight-card transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay + 200}ms` }}
      data-scanner="true"
      data-scanner-title={project.title}
      data-scanner-detail={project.description}
      data-scanner-category="PROJECT"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span
            className="text-[10px] font-mono-code px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}
          >
            {project.badge}
          </span>
        </div>
        <span className="text-[10px] font-mono-code text-[#454d5c]">{project.year}</span>
      </div>

      <h3 className="font-display font-black text-lg text-white mb-1 group-hover:text-[#63b3ed] transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-[11px] font-mono-code text-[#454d5c] mb-3">{project.subtitle}</p>
      <p className="text-[#8892a4] text-sm font-body leading-relaxed mb-4 flex-1">{project.description}</p>

      {/* Stats row */}
      <div className="flex gap-4 mb-5">
        {project.stats.map(s => (
          <div key={s.label}>
            <div className="font-display font-bold text-sm" style={{ color: project.accent }}>{s.value}</div>
            <div className="text-[10px] font-mono-code text-[#454d5c] uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono-code text-[#8892a4]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <a href="#" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-mono-code text-black font-bold transition-all duration-200"
          style={{ background: `linear-gradient(135deg, ${project.accent}, #7c3aed)` }}>
          <ExternalLink className="w-3.5 h-3.5" />
          Live Demo
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono-code text-[#8892a4] hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Github className="w-3.5 h-3.5" />
          Code
        </a>
      </div>
    </div>
  );
};
