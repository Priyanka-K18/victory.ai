import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ExternalLink, 
  X, 
  SlidersHorizontal,
  Workflow,
  Cpu,
  Check,
  ChevronRight
} from 'lucide-react';
import { AI_TOOLS, TASK_WORKFLOWS } from '../../data/mockData';
import { AITool, TaskWorkflow } from '../../types';
import { soundFX } from '../../utils/audio';

export const ToolGalaxySection: React.FC<{
  onSelectToolLearningPath: (pathRef: string) => void;
}> = ({ onSelectToolLearningPath }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [inspectedTool, setInspectedTool] = useState<AITool | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<TaskWorkflow>(TASK_WORKFLOWS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'ALL',
    'AI CHAT',
    'CODING',
    'VIDEO',
    'IMAGE',
    'AUDIO',
    'DESIGN',
    'RESEARCH',
    'DATA',
    'AUTOMATION',
    'PRESENTATION',
  ];

  const filteredTools = AI_TOOLS.filter((tool) => {
    const matchesCat = selectedCategory === 'ALL' || tool.category === selectedCategory;
    const matchesQuery = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section 
      id="tools" 
      className="relative py-28 px-4 sm:px-6 bg-[#040714] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>CURATED INTELLIGENCE ORBIT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            AI TOOL <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">GALAXY</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Explore 45+ enterprise-grade AI tools mapped by production suitability, architecture fit, and real-world project capability.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-3 rounded-2xl bg-[#070d22] border border-white/10">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-code whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tools..."
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => {
                soundFX.playClick();
                setInspectedTool(tool);
              }}
              data-scanner="true"
              data-scanner-title={`TOOL: ${tool.name}`}
              data-scanner-detail={tool.tagline}
              data-scanner-category={tool.category}
              className="group relative p-6 rounded-2xl bg-[#070b1c]/80 hover:bg-[#0a112c] border border-white/10 hover:border-cyan-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span 
                    className="px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${tool.iconColor}15`,
                      color: tool.iconColor,
                      border: `1px solid ${tool.iconColor}35`
                    }}
                  >
                    {tool.category}
                  </span>

                  {tool.badge && (
                    <span className="text-[10px] font-mono-code text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Tool Name & Tagline */}
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-300 font-body leading-relaxed mb-4">
                  {tool.tagline}
                </p>
              </div>

              {/* What you can build preview */}
              <div>
                <div className="text-[10px] font-mono-code uppercase tracking-wider text-slate-500 mb-2">
                  FLAGSHIP CAPABILITIES:
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tool.whatYouCanBuild.slice(0, 2).map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/5 text-slate-300 truncate max-w-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Inspect Action */}
                <div className="flex items-center justify-between text-xs font-mono-code text-cyan-400 group-hover:text-cyan-300 pt-3 border-t border-white/5">
                  <span>INSPECT BLUEPRINT</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Task-Based Tool Comparison & Workflow Builder */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#080e26] to-[#040817] border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-2">
                <Workflow className="w-3.5 h-3.5" />
                <span>TASK-CENTRIC COMPARISON ENGINE</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white">
                WHAT IS YOUR GOAL?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-body mt-1">
                We compare tools based on stage-by-stage workflows, rather than vanity star ratings.
              </p>
            </div>

            {/* Workflow Selectors */}
            <div className="flex flex-wrap gap-2">
              {TASK_WORKFLOWS.map((wf) => {
                const isSelected = selectedWorkflow.id === wf.id;
                return (
                  <button
                    key={wf.id}
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedWorkflow(wf);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                        : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {wf.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workflow Steps Pipeline */}
          <div className="space-y-4">
            {selectedWorkflow.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="max-w-xl">
                  <div className="text-xs font-mono-code font-bold text-cyan-400 uppercase tracking-wider mb-1">
                    {step.stage}
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {step.description}
                  </div>
                  <div className="text-xs text-slate-400 font-body leading-relaxed">
                    <span className="text-amber-400 font-mono-code">PRO TIP: </span>
                    {step.proTip}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block w-full md:w-auto">
                    RECOMMENDED:
                  </span>
                  {step.recommendedTools.map((toolName, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono-code bg-cyan-950/80 border border-cyan-500/30 text-cyan-200"
                    >
                      {toolName}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Deep-Dive Inspection Modal */}
      {inspectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#080e24] border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.25)] text-slate-200">
            
            <button
              onClick={() => {
                soundFX.playClick();
                setInspectedTool(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="px-3 py-1 rounded text-xs font-mono-code font-bold uppercase"
                style={{
                  backgroundColor: `${inspectedTool.iconColor}20`,
                  color: inspectedTool.iconColor,
                  border: `1px solid ${inspectedTool.iconColor}40`
                }}
              >
                {inspectedTool.category}
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                Pricing: {inspectedTool.pricing}
              </span>
            </div>

            <h2 className="text-3xl font-display font-bold text-white mb-2">
              {inspectedTool.name}
            </h2>
            <p className="text-sm text-cyan-300 font-body mb-6">
              {inspectedTool.tagline}
            </p>

            <div className="space-y-4 mb-6 text-xs sm:text-sm font-body">
              <div>
                <strong className="text-white block font-display mb-1 uppercase tracking-wider text-xs text-slate-400">
                  WHAT IT DOES:
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  {inspectedTool.description}
                </p>
              </div>

              <div>
                <strong className="text-white block font-display mb-1 uppercase tracking-wider text-xs text-slate-400">
                  WHO SHOULD USE IT:
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  {inspectedTool.whoShouldUse}
                </p>
              </div>

              <div>
                <strong className="text-white block font-display mb-1 uppercase tracking-wider text-xs text-slate-400">
                  WHAT YOU CAN BUILD:
                </strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {inspectedTool.whatYouCanBuild.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-cyan-200 text-xs font-mono-code"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-white block font-display mb-1 uppercase tracking-wider text-xs text-slate-400">
                  RELATED / ALTERNATIVE TOOLS:
                </strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {inspectedTool.relatedTools.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-md bg-white/5 text-slate-400 text-xs font-mono-code"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onSelectToolLearningPath(inspectedTool.learningPathRef);
                  setInspectedTool(null);
                }}
                className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <span>View Learning Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setInspectedTool(null)}
                className="text-xs font-mono-code text-slate-400 hover:text-white"
              >
                Close Blueprint
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
