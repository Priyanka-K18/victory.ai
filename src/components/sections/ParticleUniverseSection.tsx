import React, { useState } from 'react';
import { ParticleMorphCanvas, MorphState } from '../canvas/ParticleMorphCanvas';
import { Sparkles, Cpu, Layers, Terminal, Video, Palette, TrendingUp, Network, Zap, Award } from 'lucide-react';
import { soundFX } from '../../utils/audio';

const STATES_INFO: Record<MorphState, {
  label: string;
  tagline: string;
  description: string;
  shapeName: string;
  tools: string[];
  icon: React.ComponentType<{ className?: string }>;
}> = {
  AI: {
    label: 'AI FOUNDATION',
    tagline: 'Raw Probabilistic Intelligence & Neural Latent Space',
    description: 'Particles assemble into a high-dimensional neural sphere, representing the foundational LLMs, weights, and multi-modal embeddings that power modern intelligent applications.',
    shapeName: 'Neural Concentric Sphere',
    tools: ['Claude 3.7', 'GPT-4o', 'DeepSeek R1', 'Llama 3.3'],
    icon: Cpu,
  },
  CODING: {
    label: 'CODE MATRIX',
    tagline: 'Turning Natural Language into Production Software',
    description: 'The particles rearrange into a rigid cybernetic matrix grid, representing the structured syntax of TypeScript, Python, AST trees, and automated code generation.',
    shapeName: 'Matrix Coordinate Grid',
    tools: ['Cursor IDE', 'Claude Code', 'v0 by Vercel', 'Copilot'],
    icon: Terminal,
  },
  VIDEO: {
    label: 'CINEMATIC VIDEO',
    tagline: 'Generative Storytelling & Physical Simulation',
    description: 'Particles form a 16:9 widescreen cinematic viewport with a glowing play nexus, embodying the leap from static prompts to temporal motion vectors and virtual cameras.',
    shapeName: '16:9 Widescreen Viewport',
    tools: ['Runway Gen-3', 'Luma Dream Machine', 'ElevenLabs', 'CapCut'],
    icon: Video,
  },
  DESIGN: {
    label: 'GENERATIVE DESIGN',
    tagline: 'Spatial Aesthetics, UI Tokens & 3D Renderings',
    description: 'Particles trace a golden-ratio Fibonacci spiral, visualizing the fusion of human art direction, generative graphics, and responsive UI components.',
    shapeName: 'Fibonacci Golden Spiral',
    tools: ['Midjourney v6', 'Recraft', 'Spline 3D', 'Figma AI'],
    icon: Palette,
  },
  BUSINESS: {
    label: 'BUSINESS VALUE',
    tagline: 'Financial Models, Automation & Revenue Acceleration',
    description: 'The particle swarm forms ascending isometric growth bars, proving that AI skills translate directly into operational leverage, valuation growth, and enterprise speed.',
    shapeName: 'Isometric Growth Columns',
    tools: ['Julius AI', 'Notion AI', 'ChatPDF Pro', 'Perplexity'],
    icon: TrendingUp,
  },
  DATA: {
    label: 'VECTOR DATA & RAG',
    tagline: 'Semantic Recall, Embeddings & Grounded Truth',
    description: 'Particles morph into an enterprise multi-layer neural network with interconnected vector nodes, eliminating hallucinations through verifiable retrieval.',
    shapeName: 'Bipartite Vector Graph',
    tools: ['Pinecone', 'ChromaDB', 'OpenAI Embeddings', 'LangSmith'],
    icon: Network,
  },
  AUTOMATION: {
    label: 'AUTONOMOUS WORKFLOWS',
    tagline: 'Event-Driven Webhooks & 24/7 Multi-Agent Orchestration',
    description: 'Particles construct a continuous double helix / infinity loop, symbolizing recursive agentic reasoning, autonomous tool calling, and self-healing pipelines.',
    shapeName: 'Möbius Infinity Loop',
    tools: ['n8n', 'Make.com', 'Zapier Central', 'Supabase'],
    icon: Zap,
  },
  CAREER: {
    label: 'CAREER & PROOF',
    tagline: 'Deployed Projects, Verified Portfolio & Elite Opportunities',
    description: 'The particles erupt into a radiant starburst constellation, cementing your trajectory from an curious learner into a high-earning AI engineer or creative leader.',
    shapeName: 'Ascendant Starburst',
    tools: ['GitHub Verified', 'Live Vercel Apps', 'Portfolio Proof', 'AI Credentials'],
    icon: Award,
  },
};

const MORPH_KEYS: MorphState[] = [
  'AI',
  'CODING',
  'VIDEO',
  'DESIGN',
  'BUSINESS',
  'DATA',
  'AUTOMATION',
  'CAREER',
];

export const ParticleUniverseSection: React.FC = () => {
  const [activeState, setActiveState] = useState<MorphState>('AI');
  const info = STATES_INFO[activeState];
  const Icon = info.icon;

  const handleStateClick = (state: MorphState) => {
    soundFX.playClick();
    setActiveState(state);
  };

  return (
    <section 
      id="universe" 
      className="relative min-h-[95vh] py-24 px-4 sm:px-6 bg-[#03050c] overflow-hidden flex flex-col justify-between"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-6xl mx-auto text-center relative z-20 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>VALICRED-INSPIRED PARTICLE DYNAMICS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-3">
          AI KNOWLEDGE <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">UNIVERSE</span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-body">
          Watch 1,400+ dynamic particles physically rearrange into mathematical topologies representing the evolution of AI mastery.
        </p>
      </div>

      {/* Center Morph Canvas & HUD Telemetry */}
      <div className="relative flex-1 min-h-[460px] max-w-6xl w-full mx-auto rounded-3xl bg-[#060a17]/70 border border-cyan-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden my-4">
        
        {/* The Live WebGL 3D Canvas */}
        <div className="absolute inset-0 z-10">
          <ParticleMorphCanvas currentState={activeState} />
        </div>

        {/* Top Left HUD Telemetry */}
        <div className="absolute top-5 left-5 z-20 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 text-[11px] font-mono-code text-cyan-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            PARTICLE CONVERGENCE ENGINE
          </div>
          <div className="text-xs font-mono-code text-slate-300">
            Topology: <span className="text-white font-semibold">{info.shapeName}</span>
          </div>
          <div className="text-[10px] font-mono-code text-slate-500 mt-1">
            Particles: 1,400 | Lerp Damping: 4.5 | 60 FPS
          </div>
        </div>

        {/* Bottom Floating Narrative HUD */}
        <div className="absolute bottom-6 left-6 right-6 z-20 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#070d22]/90 to-[#0e1635]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-code text-cyan-400 font-semibold uppercase tracking-wider">
                    PHASE: {info.label}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-slate-400 font-mono-code">
                    {info.tagline}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-body leading-relaxed mt-1 max-w-3xl">
                  {info.description}
                </p>
              </div>
            </div>

            {/* Recommended Tools in Phase */}
            <div className="shrink-0 flex flex-wrap gap-1.5 self-end md:self-center">
              {info.tools.map((tool, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono-code bg-white/10 border border-white/10 text-cyan-300"
                >
                  {tool}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Bottom 8-State Timeline Interactive Scrubber */}
      <div className="max-w-6xl mx-auto w-full relative z-20 mt-4">
        <div className="flex items-center justify-between gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#080d22] border border-white/10 overflow-x-auto">
          {MORPH_KEYS.map((key, idx) => {
            const isActive = activeState === key;
            return (
              <button
                key={key}
                onClick={() => handleStateClick(key)}
                onMouseEnter={() => soundFX.playHover()}
                data-scanner="true"
                data-scanner-title={`MORPH STATE 0${idx + 1}: ${key}`}
                data-scanner-detail={`Morphs 1,400 particles into ${STATES_INFO[key].shapeName}.`}
                data-scanner-category="PARTICLE GEOMETRY"
                className={`flex-1 min-w-[90px] py-2 sm:py-2.5 px-2 rounded-xl text-center transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="text-[9px] font-mono-code opacity-75 uppercase">
                  0{idx + 1}
                </div>
                <div className="text-xs font-display tracking-wider font-semibold truncate">
                  {key}
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
};
