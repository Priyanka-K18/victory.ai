import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Layers,
  Award,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_PROJECTS } from '../../data/mockData';
import { PortfolioProject } from '../../types';
import { soundFX } from '../../utils/audio';

export const PortfolioSection: React.FC<{
  userCompletedProjects?: string[];
}> = ({ userCompletedProjects = [] }) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject>(PORTFOLIO_PROJECTS[0]);
  const [customProjects, setCustomProjects] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);
  const [showProofModal, setShowProofModal] = useState<PortfolioProject | null>(null);

  const handleSimulateAddPortfolio = () => {
    soundFX.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    const newProject: PortfolioProject = {
      id: `user-proj-${Date.now()}`,
      title: 'Neural Scribe: Autonomous Research Agent',
      category: 'Autonomous Multi-Agent Systems',
      summary: 'Automated 12-page comprehensive tech research briefs with verifiable source provenance and latency optimization.',
      problem: 'Research analysts spend 18+ hours weekly reading papers and synthesizing literature reviews.',
      solution: 'Engineered an autonomous loop using Claude 3.7 Sonnet, Tavily Search API, and ChromaDB vector embeddings.',
      result: 'Automated 400+ research briefs with 98.4% factual accuracy verified by human senior auditors.',
      aiToolsUsed: ['Claude 3.7 Sonnet', 'Perplexity Pro', 'Cursor'],
      technologies: ['TypeScript', 'LangChain', 'Next.js', 'Vercel Edge'],
      githubUrl: 'https://github.com/victory-ai/neural-scribe',
      liveDemoUrl: 'https://neural-scribe.vercel.app',
      metrics: '18h -> 4min Generation · 98.4% Accuracy · Deployed Live',
      featured: true,
    };

    setCustomProjects(prev => [newProject, ...prev]);
    setSelectedProject(newProject);
  };

  return (
    <section 
      id="portfolio" 
      className="relative py-28 px-4 sm:px-6 bg-[#03050e] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-purple-600/10 via-cyan-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>NIRAJAN KHADKA-INSPIRED 3D SHOWCASE</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-display font-black text-white tracking-tight uppercase mb-4 leading-tight">
            TURN WHAT YOU LEARN <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              INTO PROOF.
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Certificates get ignored. Deployed production applications with verifiable GitHub commits and measurable business impact get you hired.
          </p>
        </div>

        {/* Add Project Simulation CTA */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleSimulateAddPortfolio}
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono-code text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Simulate "Deploy Project to 3D Portfolio" (+1,500 XP)</span>
          </button>
        </div>

        {/* Nirajan Khadka Style 3D Tilt Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {customProjects.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <div
                key={project.id}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedProject(project);
                  setShowProofModal(project);
                }}
                onMouseEnter={() => soundFX.playHover()}
                data-scanner="true"
                data-scanner-title={`PORTFOLIO: ${project.title}`}
                data-scanner-detail={project.metrics}
                data-scanner-category="PROOF OF SKILL"
                className={`group relative p-7 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? 'bg-[#09112b] border-cyan-400/60 shadow-[0_25px_50px_rgba(6,182,212,0.25)] -translate-y-2'
                    : 'bg-[#060a17]/90 hover:bg-[#080f24] border-white/10 hover:border-cyan-500/40'
                }`}
              >
                {/* Visual Glass Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-cyan-400 font-semibold px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                      {project.category}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-body leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                <div>
                  {/* Verified Impact Metrics Ribbon */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono-code mb-5">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">
                      VERIFIED OUTCOME:
                    </span>
                    {project.metrics}
                  </div>

                  {/* AI Tools Used */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {project.aiToolsUsed.map((tool, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/5 text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Proof Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono-code text-cyan-400 group-hover:text-cyan-300">
                    <span>INSPECT VERIFIED PROOF</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selected Project Full Verification Drawer / Panel */}
        {selectedProject && (
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#080f28] to-[#040816] border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono-code mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PUBLIC VERIFICATION CASE STUDY</span>
                </div>

                <h3 className="text-3xl font-display font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-xs font-body">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <strong className="text-red-400 block font-mono-code uppercase mb-1">
                      THE PROBLEM:
                    </strong>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <strong className="text-cyan-400 block font-mono-code uppercase mb-1">
                      THE SOLUTION:
                    </strong>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <strong className="text-emerald-400 block font-mono-code uppercase mb-1">
                      THE RESULT:
                    </strong>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedProject.result}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Live Deployed App</span>
                  </a>

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-code text-xs flex items-center gap-2 transition-all"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <span>Audit GitHub Repository</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#02050e] p-6 rounded-2xl border border-white/10 font-mono-code text-xs">
                <div className="text-slate-400 uppercase tracking-wider text-[11px] mb-3 pb-2 border-b border-white/10">
                  RECRUITER AUDIT CHECKLIST
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Real-world Problem Formulation</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Clean Git Commit History</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Production Edge Deployment</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Quantified ROI & Efficiency Lift</span>
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
