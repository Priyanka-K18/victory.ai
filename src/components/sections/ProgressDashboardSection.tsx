import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Target,
  Play,
  Rocket,
  Compass,
  Bot,
  Layers,
  BookOpen
} from 'lucide-react';
import { ConstellationCanvas, ConstellationNode } from '../canvas/ConstellationCanvas';
import { soundFX } from '../../utils/audio';

export const ProgressDashboardSection: React.FC<{
  onContinueLearning?: () => void;
  onOpenProject?: (projectTitle: string) => void;
}> = ({ onContinueLearning, onOpenProject }) => {
  const [selectedSkill, setSelectedSkill] = useState<{
    id: string;
    name: string;
    level: string;
    lessons: string;
    projects: string[];
    tools: string[];
    nextMilestone: string;
  }>({
    id: 'ai-tools',
    name: 'AI TOOLS',
    level: 'Advanced (Level 8)',
    lessons: '18 of 24 Completed',
    projects: ['Autonomous RAG Engine', 'Vector Search Gateway'],
    tools: ['Cursor', 'Claude 3.7 Sonnet', 'Pinecone'],
    nextMilestone: 'Deploy multi-agent orchestrator with LangGraph'
  });

  const skillDetailsMap: Record<string, {
    name: string;
    level: string;
    lessons: string;
    projects: string[];
    tools: string[];
    nextMilestone: string;
  }> = {
    python: {
      name: 'PYTHON FOR AI',
      level: 'Advanced (Level 9)',
      lessons: '22 of 25 Completed',
      projects: ['Async Vector Server', 'FastAPI Microservice'],
      tools: ['FastAPI', 'PyTorch', 'NumPy'],
      nextMilestone: 'Tensor parallelism benchmark test'
    },
    'ai-tools': {
      name: 'AI TOOLS',
      level: 'Advanced (Level 8)',
      lessons: '18 of 24 Completed',
      projects: ['Autonomous RAG Engine', 'Vector Search Gateway'],
      tools: ['Cursor', 'Claude 3.7 Sonnet', 'Pinecone'],
      nextMilestone: 'Deploy multi-agent orchestrator with LangGraph'
    },
    prompting: {
      name: 'PROMPTING MASTERY',
      level: 'Expert (Level 9)',
      lessons: '15 of 15 Completed',
      projects: ['Zero-Hallucination Schema', 'Defensive Guardrails'],
      tools: ['Claude 3.7 Extended Thinking', 'Promptfoo'],
      nextMilestone: 'Publish verified prompt evaluation benchmark'
    },
    'web-dev': {
      name: 'WEB DEVELOPMENT',
      level: 'Intermediate (Level 7)',
      lessons: '14 of 20 Completed',
      projects: ['Neural 3D Web App', 'Streaming Chat UI'],
      tools: ['Next.js 14', 'React 19', 'Tailwind CSS'],
      nextMilestone: 'Edge worker caching layer with sub-40ms TTFB'
    },
    video: {
      name: 'VIDEO GENERATION',
      level: 'Intermediate (Level 6)',
      lessons: '8 of 12 Completed',
      projects: ['60-Second Sci-Fi Trailer', 'Neural Voice Commercial'],
      tools: ['Runway Gen-3', 'ElevenLabs', 'CapCut AI'],
      nextMilestone: 'Keyframe steering with character reference seed'
    },
    design: {
      name: 'DESIGN & UI SYSTEMS',
      level: 'Advanced (Level 8)',
      lessons: '16 of 18 Completed',
      projects: ['Dark Mode Glassmorphic Kit', 'Spatial 3D Canvas'],
      tools: ['Midjourney v6', 'Spline 3D', 'Figma AI'],
      nextMilestone: 'Complete design token handoff to React tokens'
    },
    data: {
      name: 'DATA & RAG',
      level: 'Intermediate (Level 7)',
      lessons: '12 of 16 Completed',
      projects: ['Pinecone Knowledge Base', 'Semantic Reranker'],
      tools: ['Pinecone', 'OpenAI Embeddings', 'ChromaDB'],
      nextMilestone: 'Implement Cohere Rerank on 10,000 PDF chunks'
    },
    automation: {
      name: 'AUTOMATION PIPELINES',
      level: 'Intermediate (Level 6)',
      lessons: '10 of 14 Completed',
      projects: ['Zero-Touch Lead Enrichment', 'Support Ticket Bot'],
      tools: ['n8n AI Nodes', 'Webhooks', 'Make.com'],
      nextMilestone: 'Self-healing error webhook with Slack notifications'
    }
  };

  const handleSelectConstellationNode = (node: ConstellationNode) => {
    soundFX.playClick();
    const match = skillDetailsMap[node.id] || {
      name: node.name,
      level: `Level ${node.level}`,
      lessons: `${node.level * 2} Completed`,
      projects: ['Flagship Practice Lab'],
      tools: ['Cursor', 'Claude 3.7'],
      nextMilestone: 'Ship verified portfolio capstone'
    };
    setSelectedSkill({ id: node.id, ...match });
  };

  return (
    <section 
      id="dashboard"
      className="relative py-28 px-4 sm:px-6 bg-[#030611] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top: Welcome back & Command Center Header (Section 24) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono-code text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE LEARNING SESSION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              MY AI COMMAND CENTER
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-body mt-1">
              Welcome back, Builder 👋 · You are on a <strong className="text-amber-400 font-mono-code">18-day streak</strong>. Ready to advance your current mission?
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFX.playClick();
                onContinueLearning?.();
              }}
              className="px-6 py-3 rounded-xl font-body font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Continue Learning</span>
            </button>
          </div>
        </div>

        {/* Current Mission & Quick Overview Cards (Section 24) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          
          {/* CURRENT MISSION */}
          <div className="p-5 rounded-3xl bg-white/[0.025] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-2">
                <span className="text-cyan-400 font-bold uppercase">CURRENT MISSION</span>
                <span>Sprint 03 / 06</span>
              </div>
              <h4 className="text-base font-display font-bold text-white mb-1.5">
                RAG Embedding Optimization
              </h4>
              <p className="text-xs text-slate-300 font-body leading-relaxed mb-4">
                Master 512-token chunking strategies and implement Cohere semantic reranking on 500-page SEC financial filings.
              </p>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 w-[68%]" />
            </div>
          </div>

          {/* CURRENT PROJECT */}
          <div className="p-5 rounded-3xl bg-white/[0.025] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-2">
                <span className="text-emerald-400 font-bold uppercase">CURRENT PROJECT</span>
                <span>Step 03: BUILD</span>
              </div>
              <h4 className="text-base font-display font-bold text-white mb-1.5">
                Autonomous AI Resume Analyzer
              </h4>
              <p className="text-xs text-slate-300 font-body leading-relaxed mb-4">
                Parsing unstructured PDF resumes with OpenAI structured outputs and calculating cosine match against job descriptions.
              </p>
            </div>
            <button
              onClick={() => onOpenProject?.('AI Resume Analyzer')}
              className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              <span>Resume Workspace Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* STATS: Streak, Portfolio, Challenges */}
          <div className="p-5 rounded-3xl bg-white/[0.025] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono-code text-slate-400 uppercase mb-2">
              ACHIEVEMENT TELEMETRY
            </span>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span className="text-lg font-display font-black">18</span>
                </div>
                <span className="text-[10px] font-mono-code text-slate-400 uppercase">Streak Days</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-center gap-1 text-emerald-400 mb-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-lg font-display font-black">4</span>
                </div>
                <span className="text-[10px] font-mono-code text-slate-400 uppercase">Portfolio Proved</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] font-mono-code text-cyan-300 text-center">
              AI Tools Learned: 12 · Weekly Challenges: 3 Passed
            </div>
          </div>

        </div>

        {/* SECTION 25: SKILL VISUALIZATION CONSTELLATION */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>INTERACTIVE SKILL CONSTELLATION</span>
            </div>
            <span className="text-xs font-mono-code text-slate-500">
              Tap any star to inspect current level & next milestone
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 3D Constellation (8 cols) */}
            <div className="lg:col-span-8 rounded-3xl bg-[#060a19] border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] min-h-[460px] relative overflow-hidden">
              <ConstellationCanvas
                onSelectNode={handleSelectConstellationNode}
                selectedNodeId={selectedSkill.id}
              />
            </div>

            {/* Selected Skill Details (Section 25: Current level, Lessons, Projects, Tools, Next milestone) */}
            <div className="lg:col-span-4 rounded-3xl bg-[#070d22] border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 inline-block mb-3">
                  ACTIVE STAR FOCUS
                </span>

                <h3 className="text-2xl font-display font-black text-white mb-1">
                  {selectedSkill.name}
                </h3>
                <div className="text-xs font-mono-code text-emerald-400 mb-6 font-semibold">
                  {selectedSkill.level} · {selectedSkill.lessons}
                </div>

                <div className="space-y-4 font-body text-xs">
                  <div>
                    <strong className="block text-[10px] font-mono-code uppercase text-slate-500 mb-1">
                      ACTIVE PROJECTS:
                    </strong>
                    <div className="space-y-1">
                      {selectedSkill.projects.map((p, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-200 font-mono-code text-[11px] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong className="block text-[10px] font-mono-code uppercase text-slate-500 mb-1">
                      PRIMARY TOOLS:
                    </strong>
                    <div className="flex flex-wrap gap-1">
                      {selectedSkill.tools.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 font-mono-code text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong className="block text-[10px] font-mono-code uppercase text-slate-500 mb-1">
                      NEXT MILESTONE:
                    </strong>
                    <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                      {selectedSkill.nextMilestone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-6">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onContinueLearning?.();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-white/10 text-xs font-mono-code flex items-center justify-center gap-2 transition-all"
                >
                  <span>Practice In Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
