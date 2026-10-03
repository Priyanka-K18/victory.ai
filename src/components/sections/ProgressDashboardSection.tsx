import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { ConstellationCanvas, ConstellationNode } from '../canvas/ConstellationCanvas';
import { soundFX } from '../../utils/audio';

export const ProgressDashboardSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    name: string;
    level: number;
    category: string;
    description: string;
    unlockedCapabilities: string[];
  }>({
    id: 'ai-tools',
    name: 'AI TOOLS',
    level: 9,
    category: 'Intelligence',
    description: 'Mastery across 45+ foundation models, Cursor IDE, Claude 3.7 extended thinking, and agent orchestration.',
    unlockedCapabilities: ['Repo-wide context injection', 'Multi-modal reasoning', 'Latency tuning']
  });

  const handleSelectConstellationNode = (node: ConstellationNode) => {
    soundFX.playClick();
    const descriptions: Record<string, { desc: string; caps: string[] }> = {
      python: {
        desc: 'Advanced Python for AI: AsyncIO event loops, FastAPI microservices, and NumPy/PyTorch tensor manipulations.',
        caps: ['Custom embeddings server', 'FastAPI microservices', 'Batch inference pipelines']
      },
      'ai-tools': {
        desc: 'Deep mastery across foundation models, Cursor IDE, Claude 3.7 extended thinking, and prompt chain debuggers.',
        caps: ['Repo-wide context injection', 'Multi-modal reasoning', 'Latency tuning']
      },
      prompting: {
        desc: 'Deterministic prompt engineering adhering to the 7 structural pillars and Zod runtime schema validation.',
        caps: ['Self-reflecting reasoning loops', 'Zero hallucination schemas', 'Defensive security prompts']
      },
      'web-dev': {
        desc: 'Modern full-stack React 19, Next.js App Router, Tailwind CSS, and low-latency Server-Sent Events (SSE).',
        caps: ['Optimistic streaming UI', 'Edge functions', 'WebGL 3D canvas integration']
      },
      design: {
        desc: 'Spatial UI design systems, Midjourney 3D lighting, accessible color tokens, and Figma AI pipelines.',
        caps: ['Generative dark mode systems', 'Spatial 3D meshes', 'Micro-animation choreographies']
      },
      video: {
        desc: 'Virtual cinematography in Runway Gen-3, prompt-directed camera vectors, ElevenLabs audio mastering.',
        caps: ['4K narrative shorts', 'Temporal keyframe steering', 'Voice cloning synchronization']
      },
      automation: {
        desc: 'Self-hosted n8n workflows, event-driven webhooks, autonomous LangChain tool-calling nodes.',
        caps: ['24/7 lead scoring agents', 'Automated customer support routing', 'Multi-app sync']
      }
    };

    const extra = descriptions[node.id] || {
      desc: 'Advanced skills in AI technology and real-world system architecture.',
      caps: ['Production ready', 'Verified in portfolio']
    };

    setSelectedNode({
      id: node.id,
      name: node.name,
      level: node.level,
      category: node.category,
      description: extra.desc,
      unlockedCapabilities: extra.caps
    });
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 bg-[#030611] overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>NEURAL PROGRESS ENGINE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            SKILL CONSTELLATION <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">& XP</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Track your real-time skills in 3D celestial space. Higher proficiency expands your star's magnitude and unlocks deeper project blueprints.
          </p>
        </div>

        {/* Top 4 Stat Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          <div className="p-5 rounded-2xl bg-[#060a17] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white">4,850 XP</div>
              <div className="text-[11px] font-mono-code text-cyan-400 uppercase">Level 8 AI Architect</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#060a17] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white">18 Days</div>
              <div className="text-[11px] font-mono-code text-amber-400 uppercase">Active Coding Streak</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#060a17] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white">4 Deployed</div>
              <div className="text-[11px] font-mono-code text-emerald-400 uppercase">Verified Projects</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#060a17] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white">Top 2%</div>
              <div className="text-[11px] font-mono-code text-purple-400 uppercase">Global Builder Rank</div>
            </div>
          </div>

        </div>

        {/* 3D Constellation Visualizer + Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Canvas: 3D Skill Graph (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#060a19] border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] min-h-[460px] relative overflow-hidden">
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono-code text-cyan-300">
              Tap any star node to inspect prerequisites & unlocked projects
            </div>

            <ConstellationCanvas
              onSelectNode={handleSelectConstellationNode}
              selectedNodeId={selectedNode.id}
            />
          </div>

          {/* Right Panel: Active Star Node Inspector (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#070d22] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                  {selectedNode.category}
                </span>
                <span className="text-xs font-mono-code text-slate-400">
                  STAR MAGNITUDE: <strong className="text-white">{selectedNode.level}/10</strong>
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {selectedNode.name}
              </h3>

              <p className="text-xs text-slate-300 font-body leading-relaxed mb-6">
                {selectedNode.description}
              </p>

              <div>
                <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider block mb-2">
                  UNLOCKED ABILITIES:
                </span>
                <div className="space-y-2">
                  {selectedNode.unlockedCapabilities.map((cap, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-mono-code text-cyan-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <div className="flex justify-between text-xs font-mono-code mb-2">
                <span className="text-slate-400">Mastery Progress</span>
                <span className="text-cyan-400 font-bold">{selectedNode.level * 10}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500" 
                  style={{ width: `${selectedNode.level * 10}%` }}
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
