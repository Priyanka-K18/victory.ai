import React from 'react';
import { 
  Code, 
  Palette, 
  Video, 
  Megaphone, 
  Briefcase, 
  Database, 
  GraduationCap, 
  Cpu, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface FieldCardItem {
  id: string;
  title: string;
  headline: string;
  description: string;
  animationType: 'code' | 'video' | 'design' | 'data' | 'marketing' | 'education' | 'engineering' | 'content';
  tools: string[];
}

const FIELDS: FieldCardItem[] = [
  {
    id: 'coding',
    title: 'CODING & SOFTWARE',
    headline: 'Autonomous Code Reviewers & Micro-Apps',
    description: 'Engineers use Cursor, Claude 3.7, and Copilot to write type-safe architectures, autogenerate unit tests, and deliver software 5x faster.',
    animationType: 'code',
    tools: ['Cursor', 'Claude 3.7', 'v0'],
  },
  {
    id: 'video',
    title: 'CINEMATIC VIDEO',
    headline: 'Text-to-Video & Virtual Cinematography',
    description: 'Creators direct Hollywood-grade video ads, photorealistic b-roll, and digital avatars with temporal motion consistency and camera framing.',
    animationType: 'video',
    tools: ['Runway Gen-3', 'Luma Dream', 'ElevenLabs'],
  },
  {
    id: 'design',
    title: 'SPATIAL & UI DESIGN',
    headline: 'Generative Design Systems & 3D Assets',
    description: 'Product designers generate accessible UI tokens, realistic product mockups, and spatial 3D interfaces in minutes with Midjourney & Figma AI.',
    animationType: 'design',
    tools: ['Midjourney v6', 'Spline 3D', 'Figma AI'],
  },
  {
    id: 'data',
    title: 'DATA & RAG ARCHITECTURES',
    headline: 'Vector Knowledge Bases & Analytics',
    description: 'Data analysts build self-querying databases, predictive anomaly detectors, and enterprise RAG systems with zero hallucinations.',
    animationType: 'data',
    tools: ['Pinecone', 'OpenAI Embeddings', 'Julius AI'],
  },
  {
    id: 'marketing',
    title: 'GROWTH MARKETING',
    headline: 'Multi-Agent Creative & Viral Copywriting',
    description: 'Growth teams deploy autonomous agents that analyze competitor ad spend, generate tailored ad variants, and optimize conversion loops.',
    animationType: 'marketing',
    tools: ['Perplexity Pro', 'Jasper', 'AdCreative.ai'],
  },
  {
    id: 'business',
    title: 'STRATEGY & OPERATIONS',
    headline: 'AI Executive Briefs & Automated Workflows',
    description: 'Founders and managers synthesize quarterly financial reports, automate lead routing, and eliminate repetitive clerical friction.',
    animationType: 'engineering',
    tools: ['Notion AI', 'n8n', 'ChatPDF Pro'],
  },
  {
    id: 'education',
    title: 'EDUCATION & TUTORING',
    headline: 'Adaptive Socratic Mentors & Curriculum',
    description: 'Educators and students build personalized learning agents that adapt dynamically to individual learning curves and test comprehension.',
    animationType: 'education',
    tools: ['NotebookLM', 'Claude 3.7', 'Quizlet Q-Chat'],
  },
  {
    id: 'content',
    title: 'CONTENT & PODCASTING',
    headline: 'Voice Cloning, Script Polish & Audiograms',
    description: 'Podcasters and creators clean studio audio in seconds, clone multilingual voice tracks, and generate multi-platform video clips.',
    animationType: 'content',
    tools: ['ElevenLabs', 'Descript', 'CapCut AI'],
  },
];

export const EveryFieldSection: React.FC<{
  onSelectField: (fieldId: string) => void;
}> = ({ onSelectField }) => {
  return (
    <section className="relative py-28 px-4 sm:px-6 bg-[#030611] overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>UNIVERSAL RELEVANCE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            AI IS FOR <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">EVERY FIELD.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            AI is not just for computer science PhDs. Discover how every modern profession builds real leverage using specialized AI workflows.
          </p>
        </div>

        {/* Dynamic 8 Field Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FIELDS.map((field) => (
            <div
              key={field.id}
              onClick={() => {
                soundFX.playClick();
                onSelectField(field.id);
              }}
              onMouseEnter={() => soundFX.playHover()}
              data-scanner="true"
              data-scanner-title={`FIELD: ${field.title}`}
              data-scanner-detail={field.headline}
              data-scanner-category="EVERY FIELD"
              className="group relative p-6 rounded-2xl bg-[#060a18] hover:bg-[#091028] border border-white/10 hover:border-cyan-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              
              {/* Bespoke Mini Animation Visualizer Box */}
              <div className="w-full h-32 rounded-xl bg-[#03050e] border border-white/10 mb-5 relative overflow-hidden flex items-center justify-center">
                
                {field.animationType === 'code' && (
                  <div className="p-3 font-mono-code text-[11px] text-cyan-400/80 leading-relaxed w-full">
                    <div className="text-purple-400">const agent = new AIAgent({'{'}</div>
                    <div className="pl-3 text-cyan-300">model: "claude-3-7",</div>
                    <div className="pl-3 text-emerald-400">autonomous: true</div>
                    <div className="text-purple-400">{'}'});</div>
                    <div className="text-slate-500 mt-1">// streaming output...</div>
                  </div>
                )}

                {field.animationType === 'video' && (
                  <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-r from-red-950/20 to-purple-950/20">
                    <div className="w-20 h-12 rounded border border-red-500/40 relative flex items-center justify-center">
                      <div className="w-0 h-0 border-y-4 border-y-transparent border-l-8 border-l-red-400 animate-pulse" />
                    </div>
                    <div className="absolute bottom-2 text-[9px] font-mono-code text-red-300">
                      REC [4K 60FPS]
                    </div>
                  </div>
                )}

                {field.animationType === 'design' && (
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-purple-500/40 animate-spin" style={{ animationDuration: '8s' }} />
                    <div className="absolute w-10 h-10 rounded-full border border-cyan-400/50 animate-ping" />
                    <div className="absolute w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  </div>
                )}

                {field.animationType === 'data' && (
                  <div className="flex items-end gap-1.5 h-16 w-32 justify-center">
                    {[35, 60, 45, 85, 70, 95].map((h, i) => (
                      <div
                        key={i}
                        className="w-3 rounded-t bg-gradient-to-t from-indigo-600 to-cyan-400"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                )}

                {field.animationType === 'marketing' && (
                  <div className="relative w-28 h-20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 text-[10px] font-mono-code font-bold">
                      ROAS
                    </div>
                    <span className="absolute -top-1 right-2 text-[9px] font-mono-code text-emerald-400">+340%</span>
                  </div>
                )}

                {field.animationType === 'education' && (
                  <div className="p-3 text-center">
                    <span className="text-xs font-mono-code text-pink-300 px-2 py-1 rounded bg-pink-500/10 border border-pink-500/20">
                      SOCRATIC REASONING
                    </span>
                    <div className="text-[10px] text-slate-400 mt-2 font-mono-code">
                      Knowledge Gap Diagnosed ✓
                    </div>
                  </div>
                )}

                {field.animationType === 'engineering' && (
                  <div className="flex items-center gap-2 text-xs font-mono-code text-teal-300">
                    <span className="p-1 rounded bg-teal-500/20">Trigger</span>
                    <span>→</span>
                    <span className="p-1 rounded bg-teal-500/20">LLM Node</span>
                    <span>→</span>
                    <span className="p-1 rounded bg-teal-500/20">API</span>
                  </div>
                )}

                {field.animationType === 'content' && (
                  <div className="flex items-center gap-1">
                    {[12, 28, 44, 20, 36, 48, 16, 32].map((val, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-purple-500 to-rose-400 rounded-full animate-pulse"
                        style={{ height: `${val}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                )}

              </div>

              <div>
                <span className="text-[10px] font-mono-code text-cyan-400 font-semibold uppercase tracking-wider block mb-1">
                  {field.title}
                </span>

                <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {field.headline}
                </h3>

                <p className="text-xs text-slate-400 font-body leading-relaxed mb-4">
                  {field.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {field.tools.map((t, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/5 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono-code text-cyan-400 group-hover:text-cyan-300 pt-3 border-t border-white/5">
                  <span>VIEW FIELD CURRICULUM</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
