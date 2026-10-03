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
  ExternalLink
} from 'lucide-react';
import { PROJECT_LAB_ITEMS } from '../../data/mockData';
import { ProjectLabItem } from '../../types';
import { soundFX } from '../../utils/audio';

export const ProjectLabSection: React.FC<{
  onOpenWorkspace: (project: ProjectLabItem) => void;
}> = ({ onOpenWorkspace }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProject, setActiveProject] = useState<ProjectLabItem>(PROJECT_LAB_ITEMS[0]);

  const categories = [
    'ALL',
    'CODING & DESIGN',
    'DATA & CODING',
    'DATA & AUTOMATION',
    'VIDEO & CREATIVE',
    'BUSINESS & DATA',
    'AUTOMATION',
  ];

  const filteredProjects = PROJECT_LAB_ITEMS.filter((p) => {
    return selectedCategory === 'ALL' || p.category.includes(selectedCategory);
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>PRODUCTION ENGINEERING WORKSPACE</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-display font-black text-white tracking-tight uppercase mb-4">
            BUILD SOMETHING <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">REAL.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            No toy scripts or "Hello World" tutorials. Launch complete AI microservices, interactive 3D frontends, and automated workflows.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Depth Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project, idx) => {
            const isSelected = activeProject.id === project.id;
            return (
              <div
                key={project.id}
                onClick={() => {
                  soundFX.playClick();
                  setActiveProject(project);
                }}
                onMouseEnter={() => soundFX.playHover()}
                data-scanner="true"
                data-scanner-title={`PROJECT: ${project.title}`}
                data-scanner-detail={project.description}
                data-scanner-category={project.category}
                className={`group relative p-6 rounded-3xl border transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? 'bg-[#09112b] border-cyan-400/60 shadow-[0_20px_40px_rgba(6,182,212,0.25)] -translate-y-2'
                    : 'bg-[#060a17]/90 hover:bg-[#080e24] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Visual Accent Header Box */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 text-cyan-400 border border-white/10">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono-code text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {project.timeEstimate}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-body leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack & AI tools */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider block mb-1">
                        AI INTEGRATIONS:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {project.aiTools.map((tool, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-cyan-950/60 border border-cyan-500/30 text-cyan-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider block mb-1">
                        TECHNOLOGIES:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Start Building Trigger Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.playClick();
                      onOpenWorkspace(project);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                  >
                    <span>START BUILDING (6 STEPS)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selected Project Flagship Blueprint Spec */}
        {activeProject && (
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#080f28] to-[#040816] border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono-code mb-3">
                  <span>ACTIVE LAB SPECIFICATION</span>
                  <span>•</span>
                  <span>{activeProject.difficulty} LEVEL</span>
                </div>

                <h3 className="text-3xl font-display font-bold text-white mb-3">
                  {activeProject.title}
                </h3>

                <p className="text-sm text-slate-300 font-body leading-relaxed mb-4">
                  <strong className="text-white block font-display mb-1 uppercase tracking-wider text-xs text-slate-400">
                    CORE OBJECTIVE:
                  </strong>
                  {activeProject.objective}
                </p>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 text-xs font-mono-code text-cyan-200">
                  <span className="text-slate-400 uppercase tracking-wider block mb-1">
                    VERIFIED DELIVERABLE:
                  </span>
                  {activeProject.finalDeliverable}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      onOpenWorkspace(activeProject);
                    }}
                    className="px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
                  >
                    <span>Launch Project Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono-code text-slate-400">
                    Includes Interactive Code Editor, Terminal & AI Pair Architect
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#02050e] p-6 rounded-2xl border border-white/10 font-mono-code text-xs">
                <div className="text-slate-400 uppercase tracking-wider text-[11px] mb-3 pb-2 border-b border-white/10">
                  PROJECT SPEC SHEET
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pipeline Stages:</span>
                    <span className="text-white font-semibold">6 Interactive Steps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time to Complete:</span>
                    <span className="text-cyan-400 font-semibold">{activeProject.timeEstimate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Difficulty:</span>
                    <span className="text-emerald-400 font-semibold">{activeProject.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Portfolio Proof:</span>
                    <span className="text-purple-400 font-semibold">Auto-Generated</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
