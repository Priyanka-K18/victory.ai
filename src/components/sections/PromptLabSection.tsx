import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Sliders, 
  Terminal, 
  Play, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

type PromptTier = 'BEGINNER' | 'BETTER' | 'EXPERT';

interface PromptExample {
  title: string;
  category: string;
  beginner: string;
  better: string;
  expert: {
    role: string;
    context: string;
    goal: string;
    constraints: string;
    examples: string;
    outputFormat: string;
    evaluation: string;
  };
}

const PROMPT_EXAMPLES: PromptExample[] = [
  {
    title: 'Full-Stack Code Architecture',
    category: 'CODING',
    beginner: 'Write a full-stack website in React with a backend that does AI stuff.',
    better: 'Create a Next.js 14 app with TypeScript and Tailwind CSS that connects to OpenAI API to summarize uploaded PDF documents.',
    expert: {
      role: 'Staff Principal Systems Architect specialized in high-performance Next.js App Router and edge runtimes.',
      context: 'We are engineering an enterprise RAG application processing 500-page SEC financial filings for investment analysts.',
      goal: 'Design a modular, type-safe API route handler that streams semantic chunk summaries with zero UI thread blocking.',
      constraints: 'Must use Zod validation on all request payloads. Token budget max 1,024 tokens. Include exponential retry with jitter.',
      examples: 'Input: {"pdfId": "sec-10k-2024", "query": "risks"} -> Output: Server-Sent Events (SSE) data stream with citations.',
      outputFormat: 'Production-ready TypeScript code with explicit imports, inline architectural comments, and no placeholder pseudo-code.',
      evaluation: 'Self-audit against OWASP LLM security top 10, specifically checking against system prompt exfiltration and SSRF vulnerabilities.'
    }
  },
  {
    title: 'Cinematic GenAI Video Direction',
    category: 'VIDEO',
    beginner: 'Make a video of a robot walking in a cyberpunk city in 4k.',
    better: 'Create a dramatic tracking shot of a weathered humanoid robot walking down a neon rain-slicked Tokyo street at night, cinematic lighting.',
    expert: {
      role: 'Master Director of Photography and Virtual Cinematographer working in Runway Gen-3 Alpha and Midjourney v6.',
      context: 'Opening scene of an independent sci-fi dystopian film exploring technological obsolescence.',
      goal: 'Direct an evocative 4-second sequence with consistent camera velocity and realistic optical lens distortion.',
      constraints: 'Focal length 35mm anamorphic lens, aperture f/1.8, low-angle tracking push-in shot, shutter speed 1/50, 24fps motion cadence.',
      examples: 'Avoid jerky pan motions; prioritize wet pavement reflections, volumetric sodium vapor streetlights, and natural physical weight.',
      outputFormat: 'Exact prompt token string with camera motion parameters and negative prompt exclusions.',
      evaluation: 'Verify temporal stability of the character frame across all 96 frames with zero morphing or artifact flickering.'
    }
  },
  {
    title: 'Autonomous Marketing Launch Squad',
    category: 'MARKETING',
    beginner: 'Write marketing emails to launch my new AI product to designers.',
    better: 'Write a 3-part launch email sequence targeting Figma UI designers highlighting how our AI plugin saves them 10 hours a week on asset generation.',
    expert: {
      role: 'Elite Direct-Response Copywriter and Product-Led Growth Strategist who has generated $10M+ in SaaS launches.',
      context: 'Targeting senior product designers at Series B startups who are skeptical of generic AI buzzwords and value craft.',
      goal: 'Craft a high-converting 3-email sequence that achieves a 48%+ open rate and 14%+ click-to-install rate.',
      constraints: 'Zero generic hype words like "revolutionize" or "game-changer". Focus on concrete workflow pain: tedious manual responsive variants.',
      examples: 'Email 1: The "Unfair Advantage" teardown; Email 2: Live 60-second video demo GIF; Email 3: Scarcity invite to closed pilot.',
      outputFormat: 'Subject lines (3 variants with curiosity hooks), preview text, email body, and explicit call-to-action buttons.',
      evaluation: 'Score against Flesch-Kincaid Grade 6 readability, mobile viewport preview, and absence of spam trigger keywords.'
    }
  }
];

export const PromptLabSection: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<PromptExample>(PROMPT_EXAMPLES[0]);
  const [activeTier, setActiveTier] = useState<PromptTier>('EXPERT');
  const [copied, setCopied] = useState(false);

  // Live Prompt Playground State
  const [playgroundText, setPlaygroundText] = useState(
    "Act as a Senior AI Architect. Context: Building an enterprise RAG system. Goal: Explain chunking strategies with code examples. Output format: Markdown with diagrams."
  );
  const [rubricScore, setRubricScore] = useState<number>(88);
  const [isScoring, setIsScoring] = useState(false);

  const handleCopyPrompt = () => {
    soundFX.playClick();
    const textToCopy = activeTier === 'BEGINNER' 
      ? selectedExample.beginner 
      : activeTier === 'BETTER'
      ? selectedExample.better
      : Object.entries(selectedExample.expert).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScorePrompt = () => {
    soundFX.playClick();
    setIsScoring(true);
    setTimeout(() => {
      setIsScoring(false);
      soundFX.playSuccess();
      // Compute score based on length and key pillars
      let score = 50;
      const lower = playgroundText.toLowerCase();
      if (lower.includes('role') || lower.includes('act as')) score += 10;
      if (lower.includes('context')) score += 10;
      if (lower.includes('goal') || lower.includes('objective')) score += 10;
      if (lower.includes('constraint') || lower.includes('rule') || lower.includes('must')) score += 10;
      if (lower.includes('output') || lower.includes('format')) score += 10;
      setRubricScore(Math.min(score, 98));
    }, 600);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 bg-[#040715] overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE 7 PILLARS OF PROMPT REASONING</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-display font-black text-white tracking-tight uppercase mb-4">
            LEARN TO TALK <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              TO AI.
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Amateurs talk to AI like a search engine. Professionals talk to AI like an executive briefing a principal engineer.
          </p>
        </div>

        {/* 3 Discipline Examples Tabs */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {PROMPT_EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFX.playClick();
                setSelectedExample(ex);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap ${
                selectedExample.title === ex.title
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </div>

        {/* Tier Transformer View */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#070c20] border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] mb-16">
          
          {/* Tier Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-widest block mb-1">
                DISCIPLINE: {selectedExample.category}
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                {selectedExample.title} Transformation
              </h3>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
              {(['BEGINNER', 'BETTER', 'EXPERT'] as PromptTier[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveTier(tier);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono-code transition-all ${
                    activeTier === tier
                      ? tier === 'BEGINNER'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : tier === 'BETTER'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Display Box */}
          <div className="relative p-6 rounded-2xl bg-[#030612] border border-white/10 mb-6">
            
            <button
              onClick={handleCopyPrompt}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono-code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {activeTier === 'BEGINNER' && (
              <div className="text-slate-300 font-mono-code text-sm leading-relaxed pr-16">
                <span className="text-red-400 block text-xs font-bold mb-2 uppercase">
                  [Beginner Prompt — Weak Context, Ambiguous Outputs]
                </span>
                "{selectedExample.beginner}"
              </div>
            )}

            {activeTier === 'BETTER' && (
              <div className="text-slate-200 font-mono-code text-sm leading-relaxed pr-16">
                <span className="text-amber-400 block text-xs font-bold mb-2 uppercase">
                  [Better Prompt — Added Tech Stack, Still Missing Guardrails]
                </span>
                "{selectedExample.better}"
              </div>
            )}

            {activeTier === 'EXPERT' && (
              <div className="space-y-4 font-mono-code text-xs leading-relaxed pr-16">
                <span className="text-cyan-400 block text-xs font-bold mb-2 uppercase">
                  [Expert Prompt — 7 Structural Pillars of Deterministic Output]
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-cyan-400 font-bold block mb-1">01. ROLE</span>
                    <p className="text-slate-300">{selectedExample.expert.role}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-cyan-400 font-bold block mb-1">02. CONTEXT</span>
                    <p className="text-slate-300">{selectedExample.expert.context}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-cyan-400 font-bold block mb-1">03. GOAL</span>
                    <p className="text-slate-300">{selectedExample.expert.goal}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-cyan-400 font-bold block mb-1">04. CONSTRAINTS</span>
                    <p className="text-slate-300">{selectedExample.expert.constraints}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-cyan-400 font-bold block mb-1">05. EXAMPLES</span>
                    <p className="text-slate-300">{selectedExample.expert.examples}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-cyan-400 font-bold block mb-1">06. OUTPUT FORMAT</span>
                    <p className="text-slate-300">{selectedExample.expert.outputFormat}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                  <span className="text-cyan-400 font-bold block mb-1">07. EVALUATION</span>
                  <p className="text-cyan-200">{selectedExample.expert.evaluation}</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Live Interactive Prompt Playground */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#060a1a] border border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                Live Prompt Engineering Playground
              </h3>
              <p className="text-xs text-slate-400 font-body">
                Test your own prompts. Our automated grading algorithm evaluates your prompt against the 7 Pillars.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono-code">
                <span className="text-slate-400">QUALITY SCORE: </span>
                <span className="text-cyan-400 font-bold text-sm">{rubricScore} / 100</span>
              </div>

              <button
                onClick={handleScorePrompt}
                disabled={isScoring}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
              >
                {isScoring ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                <span>Grade Prompt</span>
              </button>
            </div>
          </div>

          <textarea
            value={playgroundText}
            onChange={(e) => setPlaygroundText(e.target.value)}
            rows={4}
            className="w-full bg-[#030612] p-4 rounded-xl border border-white/10 text-xs sm:text-sm font-mono-code text-slate-200 outline-none focus:border-cyan-500/50 resize-y leading-relaxed"
          />
        </div>

      </div>
    </section>
  );
};
