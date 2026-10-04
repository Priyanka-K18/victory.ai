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
  ChevronRight,
  Play,
  Rocket,
  BookOpen
} from 'lucide-react';
import { AI_TOOLS, TASK_WORKFLOWS } from '../../data/mockData';
import { AITool, TaskWorkflow } from '../../types';
import { soundFX } from '../../utils/audio';

interface ToolGalaxySectionProps {
  onSelectToolLearningPath: (pathRef: string) => void;
  onLaunchLessonSandbox?: (toolName: string, category: string) => void;
  onOpenProject?: (projectTitle: string) => void;
}

export const ToolGalaxySection: React.FC<ToolGalaxySectionProps> = ({ 
  onSelectToolLearningPath,
  onLaunchLessonSandbox,
  onOpenProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [inspectedTool, setInspectedTool] = useState<AITool | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<TaskWorkflow>(TASK_WORKFLOWS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // 12 Purpose Categories (Section 9 exact specification)
  const categories = [
    'ALL',
    'AI CHAT',
    'CODING',
    'VIDEO',
    'IMAGE',
    'DESIGN',
    'VOICE',
    'AUDIO',
    'RESEARCH',
    'PRESENTATION',
    'MARKETING',
    'AUTOMATION',
    'DATA',
  ];

  const filteredTools = AI_TOOLS.filter((tool) => {
    const matchesCat = 
      selectedCategory === 'ALL' || 
      tool.category.toUpperCase() === selectedCategory ||
      (selectedCategory === 'VOICE' && (tool.category === 'AUDIO' || tool.name.toLowerCase().includes('voice')));
    
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI TOOL EXPLORER & WORKFLOW ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            AI TOOL <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">GALAXY</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400 font-body max-w-2xl mx-auto leading-relaxed">
            Curated by purpose, production capability, and real-world project applications. Learn not just what tools exist, but how to master and chain them together.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-3 rounded-2xl bg-[#070d22] border border-white/10">
          
          {/* Category Chips (Organized by Purpose - Section 9) */}
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
              placeholder="Search tools by name, tag..."
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

        </div>

        {/* Tools Cards Grid (Section 9 exact specification) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredTools.map((tool) => {
            const skillLevel = tool.skillLevel || (tool.category === 'AI CHAT' ? 'Beginner' : tool.category === 'DATA' ? 'Intermediate' : 'Intermediate');
            const projects = tool.projectsUsingThisTool || [
              `${tool.category} Production Sandbox`,
              'Full-Stack Portfolio Project'
            ];

            return (
              <div
                key={tool.id}
                className="group relative p-6 rounded-3xl border shadow-xl transition-all duration-300 flex flex-col justify-between"
                style={{
                  background: 'rgba(10, 14, 26, 0.75)',
                  borderColor: 'rgba(255, 255, 255, 0.08)'
                }}
                data-cursor-label="TOOL"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
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

                    <span className="text-[10px] font-mono-code text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                      Level: {skillLevel}
                    </span>
                  </div>

                  {/* Tool Name & Tagline */}
                  <h3 
                    onClick={() => {
                      soundFX.playClick();
                      setInspectedTool(tool);
                    }}
                    className="text-xl font-display font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-body leading-relaxed mb-4">
                    {tool.tagline}
                  </p>

                  {/* What It Does summary */}
                  <div className="text-xs text-slate-400 font-body mb-4 leading-relaxed">
                    <strong className="text-slate-300 block text-[11px] font-mono-code uppercase mb-0.5">
                      WHAT IT DOES:
                    </strong>
                    {tool.description}
                  </div>

                  {/* Best Use Cases */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-500 block mb-1.5">
                      BEST USE CASES:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.whatYouCanBuild.slice(0, 3).map((item, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/5 text-slate-300 truncate max-w-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Related Tools */}
                  <div className="mb-4 text-[11px] font-mono-code text-slate-400">
                    <span className="text-slate-500">Related: </span>
                    <span>{tool.relatedTools.slice(0, 2).join(', ')}</span>
                  </div>
                </div>

                {/* Card Actions: Learn This Tool + Inspect */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      onLaunchLessonSandbox?.(tool.name, tool.category);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 font-mono-code text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Play className="w-3 h-3 fill-cyan-400" />
                    <span>LEARN THIS TOOL</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFX.playClick();
                      setInspectedTool(tool);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
                    title="Inspect Blueprint"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* SECTION 10: TOOL WORKFLOW PIPELINE (Major Differentiator) */}
        <div 
          className="relative p-6 sm:p-10 rounded-3xl border shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #090e24 0%, #050815 100%)',
            borderColor: 'rgba(56, 189, 248, 0.25)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.7)'
          }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-2">
                <Workflow className="w-3.5 h-3.5" />
                <span>HOW AI TOOLS WORK TOGETHER</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-black text-white">
                MULTI-STAGE TOOL WORKFLOWS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-body mt-1">
                Don't just collect tools. Learn how enterprise creators chain tools together across every production milestone.
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
                        ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                        : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {wf.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workflow Steps Pipeline — full stages */}
          <div className="space-y-3.5">
            {selectedWorkflow.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="max-w-xl">
                  <div className="text-xs font-mono-code font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{step.stage}</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {step.description}
                  </div>
                  <div className="text-xs text-slate-400 font-body leading-relaxed">
                    <span className="text-amber-400 font-mono-code font-semibold">PRO TIP: </span>
                    {step.proTip}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block w-full md:w-auto">
                    RECOMMENDED SUITE:
                  </span>
                  {step.recommendedTools.map((toolName, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => {
                        soundFX.playClick();
                        onLaunchLessonSandbox?.(toolName, 'WORKFLOW');
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-mono-code bg-cyan-950/70 border border-cyan-500/30 text-cyan-200 hover:border-cyan-400 hover:text-white transition-all cursor-pointer"
                    >
                      {toolName}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* SECTION 11: TOOL DETAILS EXPERIENCE MODAL */}
      {inspectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div 
            className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl border shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto"
            style={{
              background: 'rgba(8, 12, 24, 0.96)',
              borderColor: 'rgba(56, 189, 248, 0.35)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.15)'
            }}
          >
            
            <button
              onClick={() => {
                soundFX.playClick();
                setInspectedTool(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-3">
              <span 
                className="px-3 py-0.5 rounded text-xs font-mono-code font-bold uppercase"
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

            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-1">
              {inspectedTool.name}
            </h2>
            <p className="text-sm text-cyan-300 font-body mb-6">
              {inspectedTool.tagline}
            </p>

            <div className="space-y-4 mb-6 text-xs sm:text-sm font-body">
              <div>
                <strong className="text-white block font-mono-code mb-1 uppercase tracking-wider text-xs text-slate-400">
                  WHAT IT DOES:
                </strong>
                <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  {inspectedTool.description}
                </p>
              </div>

              <div>
                <strong className="text-white block font-mono-code mb-1 uppercase tracking-wider text-xs text-slate-400">
                  WHO SHOULD USE IT:
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  {inspectedTool.whoShouldUse}
                </p>
              </div>

              <div>
                <strong className="text-white block font-mono-code mb-1 uppercase tracking-wider text-xs text-slate-400">
                  WHAT YOU CAN CREATE:
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
                <strong className="text-white block font-mono-code mb-1 uppercase tracking-wider text-xs text-slate-400">
                  HOW TO USE IT IN PRODUCTION:
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  Always configure project-level context or system schemas first. Use concise few-shot input/output pairs rather than lengthy open prompts.
                </p>
              </div>

              <div>
                <strong className="text-white block font-mono-code mb-1 uppercase tracking-wider text-xs text-slate-400">
                  RELATED & ALTERNATIVE TOOLS:
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
                  onLaunchLessonSandbox?.(inspectedTool.name, inspectedTool.category);
                  setInspectedTool(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] text-slate-950 font-body font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>START LEARNING</span>
              </button>

              <button
                onClick={() => setInspectedTool(null)}
                className="text-xs font-mono-code text-slate-400 hover:text-white"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
