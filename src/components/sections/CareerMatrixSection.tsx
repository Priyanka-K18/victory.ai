import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  DollarSign,
  GraduationCap
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface CareerPath {
  role: string;
  avgSalary: string;
  demand: string;
  skills: string[];
  flagshipProject: string;
  portfolioAsset: string;
  interviewFocus: string;
}

const CAREER_TRACKS: CareerPath[] = [
  {
    role: 'AI Application Engineer',
    avgSalary: '$140k - $190k',
    demand: 'Explosive (+420% YoY)',
    skills: ['LangChain / LlamaIndex', 'FastAPI / Next.js', 'Vector DBs (Pinecone)', 'Context Injection'],
    flagshipProject: 'Enterprise Multi-Tenant RAG Knowledge Base',
    portfolioAsset: 'Production Next.js Edge App with Sub-400ms Streaming',
    interviewFocus: 'RAG latency optimization, token caching, and defensive system prompting',
  },
  {
    role: 'Generative AI Creative Technologist',
    avgSalary: '$110k - $160k',
    demand: 'High (+280% YoY)',
    skills: ['Runway Gen-3', 'Midjourney v6 & ComfyUI', 'ElevenLabs Audio', 'Spatial 3D UI'],
    flagshipProject: 'Autonomous Commercial Studio & Sci-Fi Short Trailer',
    portfolioAsset: '4K Commercial Reel with Custom Generative Score',
    interviewFocus: 'Temporal video consistency, motion prompting, and multi-modal storyboard curation',
  },
  {
    role: 'AI Automation & Operations Architect',
    avgSalary: '$120k - $175k',
    demand: 'Massive (+360% YoY)',
    skills: ['n8n AI Nodes', 'Webhooks & REST APIs', 'Claude Tool Calling', 'PostgreSQL'],
    flagshipProject: 'Zero-Touch Customer Onboarding & Autonomous Support Loop',
    portfolioAsset: 'Exportable JSON Workflow Blueprints + Case Study',
    interviewFocus: 'Error retry mechanics, webhook security, and human-in-the-loop compliance thresholds',
  },
  {
    role: 'AI Product Manager & Prompt Specialist',
    avgSalary: '$135k - $185k',
    demand: 'Very High (+310% YoY)',
    skills: ['The 7 Pillars of Prompting', 'Eval Frameworks (Promptfoo)', 'Zod Schema Validation', 'ROI Modeling'],
    flagshipProject: 'Predictive E-Commerce Inventory & Churn Engine',
    portfolioAsset: 'Quantified Executive Teardown & Live Benchmark Dashboard',
    interviewFocus: 'Unit economics of tokens, model selection trade-offs, and evaluation benchmark sets',
  },
];

export const CareerMatrixSection: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<CareerPath>(CAREER_TRACKS[0]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="career" className="relative py-28 px-4 sm:px-6 bg-[#040715] overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[150px] pointer-events-none" />

      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>REAL-WORLD MARKET VALUE</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-display font-black text-white tracking-tight uppercase mb-4">
            FROM LEARNING TO <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              OPPORTUNITY.
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Every lesson you take connects directly to a verified career pipeline: <br className="hidden sm:block" />
            <span className="text-cyan-300 font-mono-code font-semibold">SKILL → PROJECT → PORTFOLIO → CAREER</span>
          </p>
        </div>

        {/* 4 Track Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CAREER_TRACKS.map((track, idx) => {
            const isSelected = selectedTrack.role === track.role;
            return (
              <button
                key={idx}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedTrack(track);
                }}
                className={`p-5 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                    : 'bg-[#060a17] border-white/10 hover:border-white/20 text-slate-400'
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${200 + idx * 80}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${200 + idx * 80}ms, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                <div className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-widest mb-1">
                  ROLE 0{idx + 1}
                </div>
                <div className="text-base font-display font-bold text-white mb-2">
                  {track.role}
                </div>
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                  <span className="text-emerald-400 font-semibold">{track.avgSalary}</span>
                  <span className="text-[10px]">{track.demand}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pipeline Visualizer Box (Skill -> Project -> Portfolio -> Career) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#070c22] border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider block mb-1">
                CAREER TRAJECTORY SPECIFICATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {selectedTrack.role}
              </h3>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono-code text-slate-400">TARGET BASE COMPENSATION</div>
              <div className="text-xl sm:text-2xl font-display font-bold text-emerald-400">
                {selectedTrack.avgSalary}
              </div>
            </div>
          </div>

          {/* 4 Pipeline Stages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Stage 1: Skills */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono-code text-cyan-400 font-bold uppercase tracking-wider mb-2">
                  01. CORE SKILLS
                </div>
                <div className="space-y-1.5 mb-4">
                  {selectedTrack.skills.map((s, i) => (
                    <div key={i} className="text-xs font-mono-code text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[10px] font-mono-code text-slate-500 pt-2 border-t border-white/5">
                Foundation Mastery
              </div>
            </div>

            {/* Stage 2: Flagship Project */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono-code text-purple-400 font-bold uppercase tracking-wider mb-2">
                  02. FLAGSHIP PROJECT
                </div>
                <div className="text-xs font-semibold text-white mb-2">
                  {selectedTrack.flagshipProject}
                </div>
                <p className="text-[11px] text-slate-400 font-body leading-relaxed">
                  Engineered directly in our interactive Project Lab with step-by-step guidance.
                </p>
              </div>
              <div className="text-[10px] font-mono-code text-purple-400 pt-2 border-t border-white/5">
                6 Verified Steps
              </div>
            </div>

            {/* Stage 3: Portfolio Asset */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono-code text-emerald-400 font-bold uppercase tracking-wider mb-2">
                  03. PORTFOLIO PROOF
                </div>
                <div className="text-xs font-semibold text-white mb-2">
                  {selectedTrack.portfolioAsset}
                </div>
                <p className="text-[11px] text-slate-400 font-body leading-relaxed">
                  Turned into a live deployed link and audited GitHub repository.
                </p>
              </div>
              <div className="text-[10px] font-mono-code text-emerald-400 pt-2 border-t border-white/5">
                Recruiter Ready
              </div>
            </div>

            {/* Stage 4: Interview & Offer */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono-code text-amber-400 font-bold uppercase tracking-wider mb-2">
                  04. INTERVIEW BENCHMARK
                </div>
                <div className="text-xs text-slate-300 font-body leading-relaxed mb-2">
                  {selectedTrack.interviewFocus}
                </div>
              </div>
              <div className="text-[10px] font-mono-code text-amber-400 pt-2 border-t border-white/5">
                High-Intent Hiring
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
