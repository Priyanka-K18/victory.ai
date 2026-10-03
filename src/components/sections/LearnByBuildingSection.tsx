import React, { useState } from 'react';
import { 
  Play, 
  Terminal, 
  Cpu, 
  CheckCircle, 
  ArrowRight, 
  Code2, 
  Sparkles, 
  Layers, 
  RefreshCw 
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

type ModeType = 'WATCH' | 'PRACTICE' | 'BUILD';

export const LearnByBuildingSection: React.FC<{
  onLaunchBuild: () => void;
}> = ({ onLaunchBuild }) => {
  const [activeMode, setActiveMode] = useState<ModeType>('PRACTICE');
  const [practiceCode, setPracticeCode] = useState(`// Challenge: Enforce JSON Schema Guardrail on LLM Output
import { z } from 'zod';

const AgentOutputSchema = z.object({
  analysis: z.string().min(10),
  confidenceScore: z.number().min(0).max(1),
  recommendedAction: z.enum(['APPROVE', 'REVISE', 'ESCALATE'])
});

export function validateLLMResponse(rawPayload: unknown) {
  return AgentOutputSchema.safeParse(rawPayload);
}`);
  const [challengeResult, setChallengeResult] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleTestChallenge = () => {
    soundFX.playClick();
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      soundFX.playSuccess();
      setChallengeResult('PASS: Zod schema strictly rejected malformed payload and validated schema in 12ms! +150 XP');
    }, 600);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 bg-[#040815] overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACTIVE PEDAGOGY</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-display font-black text-white tracking-tight uppercase mb-4 leading-tight">
            DON'T JUST WATCH. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              BUILD.
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Passive video lectures lead to zero retention. Switch between the three dimensions of the platform to experience the difference.
          </p>
        </div>

        {/* 3-Mode Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#080d22] border border-white/10">
            {(['WATCH', 'PRACTICE', 'BUILD'] as ModeType[]).map((mode) => {
              const isActive = activeMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveMode(mode);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  data-scanner="true"
                  data-scanner-title={`MODE: ${mode}`}
                  data-scanner-detail={`Experience the ${mode.toLowerCase()} dimension of the platform.`}
                  data-scanner-category="PEDAGOGY"
                  className={`px-6 sm:px-10 py-3 rounded-xl font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* Massive Interactive Panel Container */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-[#070b1c] border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] min-h-[480px] flex flex-col justify-center">
          
          {/* MODE 01: WATCH */}
          {activeMode === 'WATCH' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5">
                <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider mb-2">
                  DIMENSION 01 — ARCHITECTURAL DECONSTRUCTION
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-3">
                  Short, Dense System Walkthroughs
                </h3>
                <p className="text-sm text-slate-300 font-body leading-relaxed mb-6">
                  No 40-hour bloated courses. Every video is a 5-minute surgical breakdown of production architecture, prompt contracts, and system trade-offs.
                </p>
                <div className="space-y-2 text-xs font-mono-code text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Interactive timestamped architectural diagrams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Side-by-side token efficiency comparisons</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#02040b] p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                <div className="w-full h-64 rounded-xl bg-gradient-to-br from-cyan-950/40 via-black to-indigo-950/40 border border-cyan-500/20 flex flex-col items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-cyan-300 ml-1" />
                  </div>
                  <div className="text-xs font-mono-code text-slate-300 mt-4">
                    MODULE: Autonomous RAG with Hybrid Embeddings
                  </div>
                  <div className="text-[10px] font-mono-code text-cyan-400/80">
                    Duration: 4m 32s · 4K Studio Quality
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 02: PRACTICE */}
          {activeMode === 'PRACTICE' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5">
                <div className="text-xs font-mono-code text-emerald-400 uppercase tracking-wider mb-2">
                  DIMENSION 02 — LIVE IN-BROWSER REASONING
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-3">
                  Interactive Socratic Challenges
                </h3>
                <p className="text-sm text-slate-300 font-body leading-relaxed mb-6">
                  Verify your understanding instantly. Fix broken prompts, implement output guardrails, and benchmark response latency in our interactive runner.
                </p>

                <button
                  onClick={handleTestChallenge}
                  disabled={isEvaluating}
                  className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Validating Schema...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-black" />
                      <span>Run Test Suite</span>
                    </>
                  )}
                </button>

                {challengeResult && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono-code text-emerald-300">
                    {challengeResult}
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 bg-[#02040a] p-4 rounded-2xl border border-white/10 font-mono-code text-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-cyan-400 text-[11px]">guardrailValidator.ts</span>
                  </div>
                  <span className="text-[10px] text-slate-500">TypeScript / Zod</span>
                </div>
                <textarea
                  value={practiceCode}
                  onChange={(e) => setPracticeCode(e.target.value)}
                  className="w-full h-56 bg-transparent text-slate-200 outline-none resize-none leading-relaxed font-mono-code text-xs"
                  spellCheck={false}
                />
              </div>
            </div>
          )}

          {/* MODE 03: BUILD */}
          {activeMode === 'BUILD' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6">
                <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider mb-2">
                  DIMENSION 03 — PRODUCTION DEPLOYMENT
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-3">
                  Full-Stack Production Projects
                </h3>
                <p className="text-sm text-slate-300 font-body leading-relaxed mb-6">
                  Transition into our dedicated Project Lab. Connect enterprise LLM APIs, build rich user interfaces, and deploy your project live to the internet.
                </p>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    onLaunchBuild();
                  }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                >
                  <span>Launch Project Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="lg:col-span-6 bg-gradient-to-br from-[#0c1435] to-[#060a1c] p-6 rounded-2xl border border-purple-500/30">
                <div className="text-xs font-mono-code text-purple-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>DEPLOYMENT BLUEPRINT</span>
                  <span>98+ PROJECTS AVAILABLE</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono-code">
                    <span className="text-white font-medium">Autonomous Support Agent</span>
                    <span className="text-cyan-400">n8n + Claude 3.7</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono-code">
                    <span className="text-white font-medium">Interactive 3D AI Portfolio</span>
                    <span className="text-purple-400">Three.js + React</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono-code">
                    <span className="text-white font-medium">Enterprise Legal RAG System</span>
                    <span className="text-emerald-400">Pinecone + Cohere</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
