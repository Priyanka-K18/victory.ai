import React, { useState } from 'react';
import { 
  Code2, 
  Palette, 
  Video, 
  Megaphone, 
  Briefcase, 
  Database, 
  GraduationCap, 
  Cpu, 
  Mic, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Rocket, 
  Trophy, 
  TrendingUp 
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

export interface DepartmentItem {
  id: string;
  title: string;
  tagline: string;
  headline: string;
  description: string;
  animationType: 'code' | 'video' | 'design' | 'data' | 'marketing' | 'business' | 'education' | 'engineering' | 'content';
  tools: string[];
  skills: string[];
  learningPathSummary: string;
  sampleProject: string;
  weeklyChallenge: string;
  careerRoles: string[];
}

const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'computer-science',
    title: 'COMPUTER SCIENCE',
    tagline: 'Autonomous Code & Systems',
    headline: 'Agentic Pair-Programming & Typed Architectures',
    description: 'Engineers use Cursor, Claude 3.7, and Copilot to write type-safe architectures, autogenerate unit test suites, and deliver software 5x faster.',
    animationType: 'code',
    tools: ['Cursor', 'Claude 3.7 Sonnet', 'v0 by Vercel', 'GitHub Copilot'],
    skills: ['Repo-wide context prompt engineering', 'TypeScript contracts', 'Full-stack Next.js', 'Autonomous agent loops'],
    learningPathSummary: 'Foundations -> In-line AI coding -> Autonomous multi-file refactoring -> Edge microservice deployment',
    sampleProject: 'Autonomous GitHub PR code reviewer & security auditing bot',
    weeklyChallenge: 'Refactor a legacy monolithic REST route into a streaming SSE handler with Zod validation',
    careerRoles: ['AI Software Engineer', 'Full-Stack AI Developer', 'Agentic Systems Architect']
  },
  {
    id: 'design',
    title: 'DESIGN',
    tagline: 'Generative UI & Spatial 3D',
    headline: 'Design Tokens & Interactive Spatial Interfaces',
    description: 'Product designers generate accessible UI tokens, realistic product mockups, and spatial 3D interfaces in minutes with Midjourney & Figma AI.',
    animationType: 'design',
    tools: ['Midjourney v6', 'Spline 3D', 'Figma AI', 'Recraft'],
    skills: ['Generative visual prompting', 'Dark-mode glassmorphic tokens', '3D WebGL asset creation', 'Figma-to-React'],
    learningPathSummary: 'Color & Typography tokens -> Generative concept plates -> 3D WebGL scene -> Component export',
    sampleProject: 'Futuristic Dark-Mode Design System & Dynamic 3D UI Assets',
    weeklyChallenge: 'Design a responsive glassmorphic dashboard with 60FPS mouse tilt interactions in Spline',
    careerRoles: ['AI Product Designer', 'Generative UI Specialist', 'Spatial 3D Visualizer']
  },
  {
    id: 'video-media',
    title: 'VIDEO & MEDIA',
    tagline: 'Virtual Cinematography',
    headline: '4K Text-to-Video & Neural Audio Mastering',
    description: 'Creators direct Hollywood-grade video ads, photorealistic b-roll, and digital avatars with temporal motion consistency and camera framing.',
    animationType: 'video',
    tools: ['Runway Gen-3 Alpha', 'Luma Dream Machine', 'ElevenLabs', 'CapCut AI'],
    skills: ['Focal lens & camera prompting', 'Temporal stability control', 'Voice cloning & alignment', 'Audio mastering'],
    learningPathSummary: 'Scriptwriting -> Visual storyboarding -> Video physics generation -> Sound design & thumbnail',
    sampleProject: '60-Second 4K Sci-Fi Short Documentary with Neural Voiceover',
    weeklyChallenge: 'Produce a 15-second cinematic brand commercial with consistent character seeds across 3 shots',
    careerRoles: ['Generative Video Director', 'AI Content Producer', 'Virtual Cinematographer']
  },
  {
    id: 'business',
    title: 'BUSINESS',
    tagline: 'Strategy & Financial Models',
    headline: 'Autonomous Operations & Financial Intelligence',
    description: 'Founders and managers synthesize quarterly financial reports, automate lead routing, and eliminate repetitive clerical friction.',
    animationType: 'business',
    tools: ['Julius AI', 'Notion AI', 'ChatPDF Pro', 'Claude 3.7'],
    skills: ['Financial model generation', 'SEC 10-K document auditing', 'Executive memo writing', 'Competitive intelligence'],
    learningPathSummary: 'Document synthesis -> Quantitative trend forecasting -> Executive memo drafting -> Workflow automations',
    sampleProject: 'Autonomous Market Research & 5-Year Financial Forecast Engine',
    weeklyChallenge: 'Extract competitive risk factors and profitability metrics from 3 competitor annual reports',
    careerRoles: ['AI Operations Lead', 'Strategic Business Analyst', 'AI Automation Consultant']
  },
  {
    id: 'data',
    title: 'DATA',
    tagline: 'Vector RAG & Neural Analytics',
    headline: 'Enterprise Vector Databases & Semantic Search',
    description: 'Data analysts build self-querying databases, predictive anomaly detectors, and enterprise RAG systems with zero hallucinations.',
    animationType: 'data',
    tools: ['Pinecone', 'OpenAI text-embedding-3', 'LangChain', 'PandasAI'],
    skills: ['Vector embeddings & cosine math', 'Token chunking strategies', 'Hybrid keyword + vector search', 'Telemetry'],
    learningPathSummary: 'Embedding math -> Vector index setup -> Reranking pipelines -> Evaluation & latency benchmarking',
    sampleProject: 'Enterprise Multi-Document RAG Knowledge Base with Semantic Recall',
    weeklyChallenge: 'Build a semantic search endpoint over 10,000 PDF pages with sub-100ms response latency',
    careerRoles: ['AI Data Engineer', 'Vector Search Architect', 'RAG Systems Specialist']
  },
  {
    id: 'marketing',
    title: 'MARKETING',
    tagline: 'Growth & Predictive Campaigns',
    headline: 'Multivariate Copywriting & Automated Funnels',
    description: 'Growth teams deploy autonomous agents that analyze competitor ad spend, generate tailored ad variants, and optimize conversion loops.',
    animationType: 'marketing',
    tools: ['Perplexity Pro', 'Jasper AI', 'AdCreative.ai', 'Copy.ai'],
    skills: ['Psychological persona modeling', 'A/B hook variant generation', 'Ad creative asset scaling', 'Funnel optimization'],
    learningPathSummary: 'Audience research -> Direct-response copy -> Multi-platform visual ad batches -> Conversion analytics',
    sampleProject: 'Omnichannel Viral Launch Engine with Dynamic Audience Tailoring',
    weeklyChallenge: 'Generate 20 high-converting TikTok/IG ad scripts testing 4 distinct psychological angles',
    careerRoles: ['AI Growth Marketer', 'Algorithmic Copywriter', 'Performance Campaign Specialist']
  },
  {
    id: 'education',
    title: 'EDUCATION',
    tagline: 'Adaptive Socratic Mentors',
    headline: 'Pedagogical Agents & Personalized Knowledge Graphs',
    description: 'Educators and students build personalized learning agents that adapt dynamically to individual learning curves and test comprehension.',
    animationType: 'education',
    tools: ['NotebookLM', 'Claude 3.7', 'Quizlet Q-Chat', 'Synthesia'],
    skills: ['Socratic questioning frameworks', 'Misconception diagnostic prompting', 'Spaced repetition graphs', 'Interactive exercises'],
    learningPathSummary: 'Pedagogical prompting -> Knowledge gap diagnosis -> Interactive quiz generation -> Learning telemetry',
    sampleProject: 'Socratic AI Mentor with Real-time Code Debugging & Knowledge Graphs',
    weeklyChallenge: 'Design a tutor agent that guides a learner through binary search trees without ever giving away the code',
    careerRoles: ['Learning Experience Designer', 'Educational AI Technologist', 'EdTech Systems Architect']
  },
  {
    id: 'engineering',
    title: 'ENGINEERING',
    tagline: 'Hardware, IoT & Automation',
    headline: 'Event-Driven Microservices & Sensor Logic',
    description: 'Systems engineers orchestrate event-driven IoT webhooks, CAD component optimization, and automated hardware diagnostics.',
    animationType: 'engineering',
    tools: ['n8n AI Nodes', 'AutoCAD AI', 'FastAPI', 'Make.com'],
    skills: ['Event-driven webhooks', 'Hardware telemetry processing', 'Predictive maintenance modeling', 'API integration'],
    learningPathSummary: 'Sensor telemetry ingestion -> Anomaly detection algorithms -> Automated incident routing -> Fleet dashboard',
    sampleProject: 'Autonomous IoT Predictive Maintenance & Anomaly Alert Pipeline',
    weeklyChallenge: 'Connect simulated factory temperature telemetry to an auto-alert webhook with failure prediction',
    careerRoles: ['AI Systems Engineer', 'IoT Automation Specialist', 'Hardware Integration Lead']
  },
  {
    id: 'content-creation',
    title: 'CONTENT CREATION',
    tagline: 'Podcasting & Omnichannel Media',
    headline: 'Voice Cloning, Script Polish & Audiograms',
    description: 'Podcasters and creators clean studio audio in seconds, clone multilingual voice tracks, and generate multi-platform video clips.',
    animationType: 'content',
    tools: ['ElevenLabs', 'Descript', 'CapCut Desktop AI', 'Opus Clip'],
    skills: ['Audio noise reduction & mastering', 'Multilingual voice translation', 'Dynamic video clipping', 'Thumbnail optimization'],
    learningPathSummary: 'Raw audio recording -> AI studio sound pass -> Multi-clip vertical reframing -> Social syndication',
    sampleProject: 'Automated 1-to-10 Omnichannel Content Repurposing Pipeline',
    weeklyChallenge: 'Turn a 30-minute podcast episode into 5 viral vertical reels with automated captions and dynamic b-roll',
    careerRoles: ['AI Media Producer', 'Digital Content Strategist', 'Podcast Sound Designer']
  },
];

interface EveryFieldSectionProps {
  onSelectField?: (fieldId: string) => void;
  onLaunchPath?: (fieldTitle: string) => void;
}

export const EveryFieldSection: React.FC<EveryFieldSectionProps> = ({
  onSelectField,
  onLaunchPath
}) => {
  const [selectedDept, setSelectedDept] = useState<DepartmentItem | null>(null);

  return (
    <section 
      id="fields"
      className="relative py-28 px-4 sm:px-6 bg-[#030611] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>CROSS-DISCIPLINARY INTELLIGENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            AI FOR <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">EVERY FIELD.</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 font-body max-w-2xl mx-auto leading-relaxed">
            AI is not restricted to computer science PhDs. Discover how 9 modern disciplines leverage tailored AI pipelines to build massive practical leverage.
          </p>
        </div>

        {/* 9 Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              onClick={() => {
                soundFX.playClick();
                setSelectedDept(dept);
                onSelectField?.(dept.id);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="group relative p-6 rounded-3xl border transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl"
              style={{
                background: 'rgba(10, 14, 25, 0.75)',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
              data-cursor-label="EXPLORE"
            >
              <div>
                {/* Department Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono-code font-bold tracking-widest text-cyan-400 uppercase">
                    {dept.title}
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-500">
                    {dept.tagline}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {dept.headline}
                </h3>
                <p className="text-xs text-slate-400 font-body leading-relaxed mb-5">
                  {dept.description}
                </p>

                {/* Bespoke Visual Micro-Interaction Preview Box (Section 12 requirement: NOT identical cards) */}
                <div className="w-full h-28 rounded-2xl bg-black/60 border border-white/[0.08] mb-5 relative overflow-hidden flex items-center justify-center p-3">
                  
                  {dept.animationType === 'code' && (
                    <div className="w-full font-mono-code text-[10px] text-cyan-300/90 leading-relaxed">
                      <span className="text-purple-400">const</span> agent = <span className="text-emerald-400">new Agent</span>({'{'}
                      <div className="pl-3 text-slate-400">model: "claude-3-7-sonnet",</div>
                      <div className="pl-3 text-cyan-300">autoDebug: true</div>
                      {'}'});
                    </div>
                  )}

                  {dept.animationType === 'video' && (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <div className="w-20 h-12 rounded-lg border border-rose-500/40 bg-rose-950/20 flex items-center justify-center">
                        <Video className="w-5 h-5 text-rose-400 animate-pulse" />
                      </div>
                      <span className="absolute bottom-1 right-2 text-[9px] font-mono-code text-rose-300">
                        4K 60FPS CINEMATIC
                      </span>
                    </div>
                  )}

                  {dept.animationType === 'design' && (
                    <div className="relative flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-purple-500/40 animate-spin" style={{ animationDuration: '6s' }} />
                      <div className="absolute w-8 h-8 rounded-full border border-cyan-400/50 animate-ping" />
                      <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
                    </div>
                  )}

                  {dept.animationType === 'data' && (
                    <div className="flex items-end gap-1.5 h-14 w-28 justify-center">
                      {[30, 65, 45, 80, 60, 95, 75].map((h, i) => (
                        <div
                          key={i}
                          className="w-2.5 rounded-t bg-gradient-to-t from-indigo-600 to-cyan-400"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  )}

                  {dept.animationType === 'marketing' && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-mono-code font-bold text-xs">
                        ROAS
                      </div>
                      <div>
                        <div className="text-xs font-mono-code font-bold text-emerald-400">+380% Lift</div>
                        <div className="text-[9px] font-mono-code text-slate-500">Multivariate Tested</div>
                      </div>
                    </div>
                  )}

                  {dept.animationType === 'business' && (
                    <div className="w-full text-center">
                      <div className="inline-block px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono-code">
                        EXECUTIVE BRIEF SYNTHESIZED
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono-code mt-1.5">
                        SEC 10-K Cash Flow Analyzed ✓
                      </div>
                    </div>
                  )}

                  {dept.animationType === 'education' && (
                    <div className="text-center p-2">
                      <span className="text-[10px] font-mono-code text-pink-300 px-2.5 py-1 rounded bg-pink-500/10 border border-pink-500/20">
                        SOCRATIC DIAGNOSIS
                      </span>
                      <div className="text-[9px] text-slate-400 mt-1.5 font-mono-code">
                        Knowledge Gap Diagnosed in Step 3
                      </div>
                    </div>
                  )}

                  {dept.animationType === 'engineering' && (
                    <div className="flex items-center gap-2 text-[10px] font-mono-code text-teal-300">
                      <span className="p-1 rounded bg-teal-500/20 border border-teal-500/30">Webhook</span>
                      <span>→</span>
                      <span className="p-1 rounded bg-teal-500/20 border border-teal-500/30">LLM Node</span>
                      <span>→</span>
                      <span className="text-emerald-400">Deployed</span>
                    </div>
                  )}

                  {dept.animationType === 'content' && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono-code text-white">Voice Clone 99.4%</div>
                        <div className="text-[9px] font-mono-code text-slate-400">1 Episode → 10 Formats</div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Tool Suite Chips & Details Link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dept.tools.slice(0, 3).map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                  {dept.tools.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 text-slate-500">
                      +{dept.tools.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono-code text-cyan-400 group-hover:text-cyan-300 pt-3 border-t border-white/5">
                  <span>EXPLORE DEPARTMENT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Department Modal (Section 12 requirement: Skills, AI tools, Learning paths, Projects, Challenges, Career applications) */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div 
            className="relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 border shadow-2xl max-h-[90vh] overflow-y-auto text-slate-200"
            style={{
              background: 'rgba(10, 14, 26, 0.95)',
              borderColor: 'rgba(56, 189, 248, 0.3)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.15)'
            }}
          >
            {/* Close */}
            <button
              onClick={() => {
                soundFX.playClick();
                setSelectedDept(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Department Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                DEPARTMENT BLUEPRINT
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-2">
              {selectedDept.title}
            </h2>
            <p className="text-sm text-cyan-300 font-body mb-6">
              {selectedDept.headline}
            </p>

            <div className="space-y-6 font-body text-xs sm:text-sm">
              
              {/* Core Skills */}
              <div>
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-2">
                  1. CORE AI SKILLS MASTERED:
                </strong>
                <div className="flex flex-wrap gap-2">
                  {selectedDept.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-mono-code text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended AI Tools */}
              <div>
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-2">
                  2. PRODUCTION AI TOOLS SUITE:
                </strong>
                <div className="flex flex-wrap gap-2">
                  {selectedDept.tools.map((tool, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono-code text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Path */}
              <div>
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-1">
                  3. STRUCTURED LEARNING PATH:
                </strong>
                <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  {selectedDept.learningPathSummary}
                </p>
              </div>

              {/* Sample Project & Challenge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-400 font-bold mb-1">
                    <Rocket className="w-3.5 h-3.5" />
                    <span>FLAGSHIP PROJECT</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {selectedDept.sampleProject}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-mono-code text-amber-400 font-bold mb-1">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>WEEKLY CHALLENGE</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {selectedDept.weeklyChallenge}
                  </div>
                </div>
              </div>

              {/* Career Applications */}
              <div>
                <strong className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-2">
                  5. CAREER APPLICATIONS & ROLES:
                </strong>
                <div className="flex flex-wrap gap-2">
                  {selectedDept.careerRoles.map((role, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 font-mono-code text-xs flex items-center gap-1.5"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>{role}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onLaunchPath?.(selectedDept.title);
                  setSelectedDept(null);
                }}
                className="px-6 py-2.5 rounded-xl font-body font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                <span>Launch Department Path</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>

              <button
                onClick={() => setSelectedDept(null)}
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
