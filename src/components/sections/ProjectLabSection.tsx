import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Rocket, 
  Terminal,
  Code2,
  ExternalLink,
  X,
  Play,
  Bot
} from 'lucide-react';
import { PROJECT_LAB_ITEMS } from '../../data/mockData';
import { ProjectLabItem } from '../../types';
import { soundFX } from '../../utils/audio';

interface ProjectLabSectionProps {
  onOpenWorkspace: (project: ProjectLabItem) => void;
}

export const ProjectLabSection: React.FC<ProjectLabSectionProps> = ({ onOpenWorkspace }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [detailProject, setDetailProject] = useState<ProjectLabItem | null>(null);

  // 9 exact project categories from prompt Section 19
  const categories = [
    'ALL',
    'AI WEBSITE',
    'AI CHATBOT',
    'AI DASHBOARD',
    'AI RESUME ANALYZER',
    'AI CONTENT SYSTEM',
    'AI AUTOMATION',
    'AI VIDEO',
    'AI MARKETING SYSTEM',
    'AI EDUCATION TOOL',
  ];

  const filteredProjects = PROJECT_LAB_ITEMS.filter((p) => {
    return selectedCategory === 'ALL' || p.category === selectedCategory;
  });

  return (
    <section 
      id="projects" 
      className="relative py-28 px-4 sm:px-6 bg-[#030612] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>BUILD WITH AI — PROJECT LAB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-display font-black text-white tracking-tight uppercase mb-4">
            BUILD SOMETHING <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">REAL.</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 font-body max-w-2xl mx-auto leading-relaxed">
            No toy scripts or "Hello World" tutorials. Launch complete AI microservices, interactive 3D frontends, and automated workflows across 9 core project archetypes.
          </p>
        </div>

        {/* 9 Category Filters (Section 19) */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid (Section 19: Difficulty, Estimated time, Skills, AI tools, Final output, START BUILDING) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between shadow-xl hover:border-cyan-400/40"
              style={{
                background: 'rgba(10, 14, 25, 0.75)',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
              data-cursor-label="BUILD"
            >
              <div>
                {/* Category & Difficulty / Time Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                    {project.category}
                  </span>
                  
                  <div className="flex items-center gap-2 text-[10px] font-mono-code text-slate-400">
                    <span className="text-emerald-400 font-semibold">{project.difficulty}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {project.timeEstimate}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => {
                    soundFX.playClick();
                    setDetailProject(project);
                  }}
                  className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 font-body leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Skills & AI Tools */}
                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-[10px] font-mono-code text-slate-500 uppercase block mb-1">
                      SKILLS:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.skillsAcquired.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/5 text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-code text-slate-500 uppercase block mb-1">
                      AI TOOLS:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.aiTools.map((t, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-cyan-950/60 border border-cyan-500/20 text-cyan-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Final Output */}
                <div className="p-2.5 rounded-xl bg-white/[0.025] border border-white/5 text-xs text-slate-400 font-body mb-5">
                  <strong className="text-slate-200 block text-[10px] font-mono-code uppercase mb-0.5">
                    FINAL OUTPUT:
                  </strong>
                  <span className="text-[11px] text-emerald-300 font-mono-code">
                    {project.finalDeliverable}
                  </span>
                </div>
              </div>

              {/* Action Buttons: START BUILDING + Preview Detail */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onOpenWorkspace(project);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-body font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Rocket className="w-3.5 h-3.5 text-slate-950" />
                  <span>START BUILDING</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    setDetailProject(project);
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors text-xs font-mono-code"
                  title="View Project Briefing"
                >
                  Details
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* SECTION 20: PROJECT DETAIL MODAL */}
      {detailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div 
            className="relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 border shadow-2xl max-h-[90vh] overflow-y-auto text-slate-200"
            style={{
              background: 'rgba(8, 12, 24, 0.96)',
              borderColor: 'rgba(56, 189, 248, 0.35)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.15)'
            }}
          >
            <button
              onClick={() => {
                soundFX.playClick();
                setDetailProject(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                {detailProject.category}
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                Difficulty: {detailProject.difficulty} · {detailProject.timeEstimate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-3">
              {detailProject.title}
            </h2>
            <p className="text-sm text-slate-300 font-body leading-relaxed mb-6">
              {detailProject.description}
            </p>

            {/* Sections 20 Specification Details */}
            <div className="space-y-5 text-xs sm:text-sm font-body">
              
              {/* PROJECT OBJECTIVE */}
              <div>
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-1">
                  PROJECT OBJECTIVE:
                </strong>
                <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  {detailProject.objective}
                </p>
              </div>

              {/* WHAT YOU WILL LEARN & SKILLS */}
              <div>
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-2">
                  WHAT YOU WILL LEARN & SKILLS GAINED:
                </strong>
                <div className="flex flex-wrap gap-2">
                  {detailProject.skillsAcquired.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-mono-code text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* TOOLS REQUIRED */}
              <div>
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-2">
                  TOOLS REQUIRED:
                </strong>
                <div className="flex flex-wrap gap-2">
                  {detailProject.aiTools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono-code text-xs">
                      {tool}
                    </span>
                  ))}
                  {detailProject.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono-code text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* PROJECT STEPS (Roadmap preview) */}
              <div>
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-2">
                  PRACTICAL PROJECT STEPS:
                </strong>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                    <span className="text-[10px] text-slate-500 block">STEP 01</span>
                    <span className="text-white font-semibold">Understand</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                    <span className="text-[10px] text-slate-500 block">STEP 02</span>
                    <span className="text-white font-semibold">Plan Spec</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                    <span className="text-[10px] text-slate-500 block">STEP 03</span>
                    <span className="text-white font-semibold">Build & Pair</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                    <span className="text-[10px] text-slate-500 block">STEP 04</span>
                    <span className="text-white font-semibold">Integrate AI</span>
                  </div>
                </div>
              </div>

              {/* FINAL RESULT */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-emerald-400 mb-1">
                  FINAL RESULT & DELIVERABLE:
                </strong>
                <p className="text-xs text-slate-200 font-mono-code">
                  {detailProject.finalDeliverable}
                </p>
              </div>

              {/* AI MENTOR INVOLVEMENT */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300">
                <Bot className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>AI Mentor pairs with you throughout each step with progressive hints, architectural audits, and real-time debugging.</span>
              </div>

            </div>

            {/* Modal Footer with BUILD THIS PROJECT button */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenWorkspace(detailProject);
                  setDetailProject(null);
                }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-body font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-transform"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                <span>BUILD THIS PROJECT</span>
              </button>

              <button
                onClick={() => setDetailProject(null)}
                className="text-xs font-mono-code text-slate-400 hover:text-white"
              >
                Close Briefing
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
