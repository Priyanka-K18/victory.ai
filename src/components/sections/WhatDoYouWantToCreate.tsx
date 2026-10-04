import React, { useState } from 'react';
import { 
  Code2, 
  Video, 
  Palette, 
  Briefcase, 
  Database, 
  Megaphone, 
  Zap, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Layers,
  Rocket,
  Play,
  HelpCircle
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

export type CreationCategory = 
  | 'CODING'
  | 'VIDEO'
  | 'DESIGN'
  | 'BUSINESS'
  | 'DATA'
  | 'MARKETING'
  | 'AUTOMATION'
  | 'EDUCATION';

interface CategoryData {
  id: CreationCategory;
  name: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  recommendedTools: {
    name: string;
    role: string;
    whyThisTool: string;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  }[];
  learningPath: {
    step: string;
    title: string;
    description: string;
  }[];
  projectIdeas: {
    title: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    time: string;
    deliverable: string;
  }[];
  skills: string[];
}

const CATEGORY_DATA: Record<CreationCategory, CategoryData> = {
  CODING: {
    id: 'CODING',
    name: 'Coding & Autonomous Software',
    tagline: 'Pair-program with autonomous code agents to build real-world full-stack web applications and microservices.',
    icon: Code2,
    accentColor: '#38bdf8',
    recommendedTools: [
      { name: 'Cursor', role: 'AI-First Code Editor', whyThisTool: 'Recommended for instant repo-wide codebase refactoring and auto-completions.', skillLevel: 'Beginner' },
      { name: 'Claude 3.7 Sonnet', role: 'Extended Thinking Engine', whyThisTool: 'Unmatched architectural reasoning for full system specifications and type safety.', skillLevel: 'Intermediate' },
      { name: 'v0 by Vercel', role: 'Generative UI to React', whyThisTool: 'Translates natural language into production Tailwind and accessible React components.', skillLevel: 'Beginner' },
      { name: 'GitHub Copilot', role: 'In-line Autonomous Companion', whyThisTool: 'Eliminates boilerplate repetition across complex TypeScript logic.', skillLevel: 'Beginner' }
    ],
    learningPath: [
      { step: '01', title: 'Context Architecture', description: 'Master repo-wide indexing and write precise system prompts with typed contracts.' },
      { step: '02', title: 'Generative Frontend', description: 'Synthesize responsive dark-mode interfaces in v0 and wire to Next.js routes.' },
      { step: '03', title: 'Agentic Workflows', description: 'Deploy autonomous debugging agents in Cursor to auto-resolve failing test suites.' },
      { step: '04', title: 'Production Deploy', description: 'Deploy to Vercel edge runtime with automated CI/CD and telemetry.' }
    ],
    projectIdeas: [
      { title: 'Autonomous Code Review Bot', difficulty: 'Intermediate', time: '6 Hours', deliverable: 'GitHub PR security scanner bot' },
      { title: 'Full-Stack Micro-SaaS Portal', difficulty: 'Advanced', time: '10 Hours', deliverable: 'Live web app with Stripe & Auth' },
      { title: 'AI API Documentation Hub', difficulty: 'Beginner', time: '4 Hours', deliverable: 'Interactive OpenAPI sandbox' }
    ],
    skills: ['TypeScript', 'Prompt Architectures', 'Next.js App Router', 'Zod Validation', 'Edge Runtimes']
  },
  VIDEO: {
    id: 'VIDEO',
    name: 'Cinematic GenAI & Studio Video',
    tagline: 'Direct broadcast-quality cinematic videos, talking avatars, and viral storytelling pipelines.',
    icon: Video,
    accentColor: '#f43f5e',
    recommendedTools: [
      { name: 'Runway Gen-3 Alpha', role: 'World Simulation & Video Gen', whyThisTool: 'Highest temporal motion fidelity and cinematic 35mm camera controls.', skillLevel: 'Intermediate' },
      { name: 'ElevenLabs', role: 'Emotive Neural Voice Synthesis', whyThisTool: 'Ultra-realistic human inflection, breath pacing, and multi-lingual voice cloning.', skillLevel: 'Beginner' },
      { name: 'Midjourney v6', role: 'Concept Plates & Visual Seeds', whyThisTool: 'Photorealistic character reference sheets (--cref) and atmospheric keyframes.', skillLevel: 'Intermediate' },
      { name: 'CapCut Desktop AI', role: 'Automated Editing & Captions', whyThisTool: 'Instantly trims silences and animates kinetic word-by-word subtitles.', skillLevel: 'Beginner' }
    ],
    learningPath: [
      { step: '01', title: 'Cinematic Storyboard', description: 'Structure narrative arcs, character reference seeds, and lighting moodboards.' },
      { step: '02', title: 'Text-to-Video Physics', description: 'Command camera angles, focal lengths, volumetric haze, and motion speeds.' },
      { step: '03', title: 'Multi-Track Audio Mastering', description: 'Layer neural voice narration with generative dynamic soundtracks in Suno.' },
      { step: '04', title: 'Viral Polish & Publishing', description: 'Cut dynamic micro-clips for TikTok/Reels and generate high-CTR thumbnails.' }
    ],
    projectIdeas: [
      { title: 'Sci-Fi Short Film Trailer', difficulty: 'Intermediate', time: '5 Hours', deliverable: '60s 4K cinematic trailer with voiceover' },
      { title: 'AI Commercial for Luxury Brand', difficulty: 'Advanced', time: '8 Hours', deliverable: 'Multi-shot commercial with sound design' },
      { title: 'Faceless YouTube Explainer', difficulty: 'Beginner', time: '3 Hours', deliverable: 'Complete automated 3-minute video' }
    ],
    skills: ['Virtual Cinematography', 'Temporal Pacing', 'Voice Cloning', 'Audio Engineering', 'Thumbnail Science']
  },
  DESIGN: {
    id: 'DESIGN',
    name: 'Spatial UI & Generative Design',
    tagline: 'Synthesize production design systems, 3D web assets, and high-fidelity product prototypes.',
    icon: Palette,
    accentColor: '#c084fc',
    recommendedTools: [
      { name: 'Midjourney v6', role: 'Aesthetic Generative Engine', whyThisTool: 'Creates ultra-clean concept art, spatial UI backdrops, and product renders.', skillLevel: 'Intermediate' },
      { name: 'Figma AI', role: 'Automated Design Systems', whyThisTool: 'Generates cohesive color tokens, typographic hierarchies, and layout auto-frames.', skillLevel: 'Beginner' },
      { name: 'Spline 3D AI', role: 'Interactive 3D Web Assets', whyThisTool: 'Generates responsive 3D web models that animate cleanly on mouse parallax.', skillLevel: 'Intermediate' },
      { name: 'Recraft', role: 'Infinite Vector & Icon Generator', whyThisTool: 'Exports brand-consistent clean SVGs and vector icons in seconds.', skillLevel: 'Beginner' }
    ],
    learningPath: [
      { step: '01', title: 'Design System Tokens', description: 'Prompt cohesive color palettes, spacing grids, and accessible contrast levels.' },
      { step: '02', title: 'Glassmorphism & Depth', description: 'Synthesize layered translucent panels, controlled blurs, and subtle rim glows.' },
      { step: '03', title: '3D Spatial Modeling', description: 'Generate real-time WebGL interactive 3D elements that react to cursor motion.' },
      { step: '04', title: 'Design-to-Code Handoff', description: 'Seamlessly convert Figma wireframes into production React and Tailwind code.' }
    ],
    projectIdeas: [
      { title: 'Dark-Mode Futuristic Design System', difficulty: 'Intermediate', time: '6 Hours', deliverable: 'Complete Figma & Tailwind component kit' },
      { title: 'Spatial 3D Product Landing Page', difficulty: 'Advanced', time: '8 Hours', deliverable: 'Interactive 3D WebGL hero interface' },
      { title: 'Generative Brand Identity Package', difficulty: 'Beginner', time: '4 Hours', deliverable: 'Logo, vector icons, and typography scale' }
    ],
    skills: ['Design Tokens', 'Glassmorphism', 'Spline 3D', 'Spatial Layouts', 'Responsive Grids']
  },
  BUSINESS: {
    id: 'BUSINESS',
    name: 'Executive Strategy & Autonomous Ops',
    tagline: 'Synthesize complex financial models, automate executive memos, and streamline business operations.',
    icon: Briefcase,
    accentColor: '#34d399',
    recommendedTools: [
      { name: 'Julius AI', role: 'Computational Data Analyst', whyThisTool: 'Runs Python statistics and creates publication-grade financial charts in seconds.', skillLevel: 'Beginner' },
      { name: 'ChatPDF Pro', role: 'Document Synthesizer', whyThisTool: 'Audits 500-page SEC 10-K filings and contracts with exact citation references.', skillLevel: 'Beginner' },
      { name: 'Notion AI', role: 'Knowledge Management Hub', whyThisTool: 'Organizes team wikis, project roadmaps, and auto-summarizes sprint meetings.', skillLevel: 'Beginner' },
      { name: 'Claude 3.7', role: 'Executive Strategy Consultant', whyThisTool: 'Synthesizes market entry strategies, SWOT analyses, and board presentations.', skillLevel: 'Intermediate' }
    ],
    learningPath: [
      { step: '01', title: 'Document Synthesis', description: 'Extract key operational risks and financial ratios from dense corporate filings.' },
      { step: '02', title: 'Predictive Modeling', description: 'Run automated regression and trend forecasts across quarterly revenue data.' },
      { step: '03', title: 'Executive Memos', description: 'Format complex strategy teardowns into scannable C-suite decision briefs.' },
      { step: '04', title: 'Automated Operations', description: 'Connect email feeds and CRM webhooks to eliminate repetitive clerical work.' }
    ],
    projectIdeas: [
      { title: 'Automated Market Competitor Brief', difficulty: 'Beginner', time: '4 Hours', deliverable: 'Comprehensive 15-page strategy audit' },
      { title: '5-Year SaaS Financial Projection', difficulty: 'Intermediate', time: '6 Hours', deliverable: 'Interactive forecast model with Julius AI' },
      { title: 'Autonomous Executive Dashboard', difficulty: 'Advanced', time: '8 Hours', deliverable: 'Live executive decision support portal' }
    ],
    skills: ['Financial Analysis', 'Executive Writing', 'Data Synthesis', 'Decision Frameworks', 'Automation']
  },
  DATA: {
    id: 'DATA',
    name: 'Vector RAG & Neural Analytics',
    tagline: 'Master vector embeddings, enterprise RAG architectures, and semantic search intelligence.',
    icon: Database,
    accentColor: '#818cf8',
    recommendedTools: [
      { name: 'Pinecone', role: 'Serverless Vector Database', whyThisTool: 'Stores millions of document embeddings with sub-50ms cosine similarity lookup.', skillLevel: 'Intermediate' },
      { name: 'OpenAI Embeddings', role: 'Semantic Vector Model', whyThisTool: 'Converts unstructured text into dense 1,536-dimensional semantic coordinates.', skillLevel: 'Beginner' },
      { name: 'LangChain', role: 'RAG Pipeline Framework', whyThisTool: 'Chains document loaders, text chunkers, retrievers, and LLM reasoning steps.', skillLevel: 'Advanced' },
      { name: 'LangSmith', role: 'Observability & Evaluation', whyThisTool: 'Tracks token latency, hallucination rates, and prompt performance at scale.', skillLevel: 'Intermediate' }
    ],
    learningPath: [
      { step: '01', title: 'Vector Math & Embeddings', description: 'Understand high-dimensional space, token limits, and cosine distance mechanics.' },
      { step: '02', title: 'Chunking Strategies', description: 'Optimize token chunk size (512 vs 1024) and metadata overlap to prevent context loss.' },
      { step: '03', title: 'Hybrid Search & Reranking', description: 'Combine dense vector search with BM25 keyword matching and Cohere rerankers.' },
      { step: '04', title: 'Defensive Guardrails', description: 'Prevent hallucinations and prompt injection using strict output schemas.' }
    ],
    projectIdeas: [
      { title: 'Multi-Document Enterprise RAG', difficulty: 'Intermediate', time: '7 Hours', deliverable: 'Zero-hallucination semantic search engine' },
      { title: 'Real-Time Financial Anomaly Detector', difficulty: 'Advanced', time: '9 Hours', deliverable: 'Streaming vector cluster analyzer' },
      { title: 'Personal Second Brain Chatbot', difficulty: 'Beginner', time: '4 Hours', deliverable: 'Full search over personal markdown notes' }
    ],
    skills: ['Vector Databases', 'RAG Architecture', 'Cosine Similarity', 'LangChain', 'Embedding Chunking']
  },
  MARKETING: {
    id: 'MARKETING',
    name: 'Growth & Omnichannel Campaigns',
    tagline: 'Deploy autonomous copywriting squads, predictive ad creatives, and high-converting funnel systems.',
    icon: Megaphone,
    accentColor: '#fb923c',
    recommendedTools: [
      { name: 'Perplexity Pro', role: 'Audience & Trend Intelligence', whyThisTool: 'Discovers viral hooks, user friction points, and competitor ad spend data.', skillLevel: 'Beginner' },
      { name: 'Jasper AI', role: 'Direct-Response Copywriting', whyThisTool: 'Generates brand-voice calibrated email sequences and high-CTR ad variants.', skillLevel: 'Beginner' },
      { name: 'AdCreative.ai', role: 'Algorithmic Banner Generation', whyThisTool: 'Predicts ad conversion scores and generates 50+ image ad sizes automatically.', skillLevel: 'Beginner' },
      { name: 'Claude 3.7', role: 'Positioning & Messaging Architect', whyThisTool: 'Creates deep psychological customer personas and overcomes objections.', skillLevel: 'Intermediate' }
    ],
    learningPath: [
      { step: '01', title: 'Persona Modeling', description: 'Synthesize granular buyer psychographics and extract emotional buying triggers.' },
      { step: '02', title: 'Multivariate Copywriting', description: 'Draft 20 hook variants testing curiosity, fear of missing out, and authority.' },
      { step: '03', title: 'Creative Asset Production', description: 'Generate high-impact ad graphics and product mockups for Facebook/Instagram/X.' },
      { step: '04', title: 'Conversion Funnel Tuning', description: 'Optimize landing page headlines, social proof placement, and CTA buttons.' }
    ],
    projectIdeas: [
      { title: 'Omnichannel Viral Product Launch', difficulty: 'Intermediate', time: '5 Hours', deliverable: '3-week campaign with copy, ads & emails' },
      { title: 'Autonomous SEO Content Cluster', difficulty: 'Intermediate', time: '6 Hours', deliverable: '10 interlinked keyword-optimized articles' },
      { title: 'Automated Cold Outbound Engine', difficulty: 'Beginner', time: '3 Hours', deliverable: 'Personalized multi-touch outreach sequence' }
    ],
    skills: ['Direct-Response Copy', 'Conversion Rate Opt', 'A/B Testing', 'Ad Generation', 'Audience Psychology']
  },
  AUTOMATION: {
    id: 'AUTOMATION',
    name: 'Autonomous Agent Pipelines & Webhooks',
    tagline: 'Connect enterprise APIs with LLM reasoning nodes to automate complex multi-step workflows.',
    icon: Zap,
    accentColor: '#2dd4bf',
    recommendedTools: [
      { name: 'n8n', role: 'Visual Workflow Orchestration', whyThisTool: 'Self-hostable visual automation platform with native AI agent and vector nodes.', skillLevel: 'Intermediate' },
      { name: 'Make.com', role: 'Cloud Integration Engine', whyThisTool: 'Connects 1,500+ SaaS apps with drag-and-drop data routing and error handling.', skillLevel: 'Beginner' },
      { name: 'Zapier Central', role: 'Autonomous AI Copilot', whyThisTool: 'Teaches AI agents to monitor spreadsheets and trigger email follow-ups automatically.', skillLevel: 'Beginner' },
      { name: 'Browse AI', role: 'Visual Web Scraper & Monitor', whyThisTool: 'Extracts real-time data from any website without writing fragile code.', skillLevel: 'Beginner' }
    ],
    learningPath: [
      { step: '01', title: 'Webhook Architecture', description: 'Trigger workflows instantaneously on user signup, Stripe payment, or form submit.' },
      { step: '02', title: 'LLM Reasoning Nodes', description: 'Insert intelligence into workflows to classify incoming intent and summarize data.' },
      { step: '03', title: 'Error Retries & Fallbacks', description: 'Build self-healing automations with exponential backoff and alert webhooks.' },
      { step: '04', title: 'Human-in-the-Loop', description: 'Add Slack or Telegram approval buttons before critical database actions are committed.' }
    ],
    projectIdeas: [
      { title: 'Zero-Touch Inbound Lead Qualifier', difficulty: 'Beginner', time: '3 Hours', deliverable: 'Auto-enriches leads and books calendar calls' },
      { title: 'Multi-Agent Support Ticket Resolver', difficulty: 'Intermediate', time: '6 Hours', deliverable: 'Answers 70% of tickets with vector lookup' },
      { title: 'Competitor Price & Stock Tracker', difficulty: 'Advanced', time: '8 Hours', deliverable: 'Scrapes 50 e-commerce stores with auto-alerts' }
    ],
    skills: ['Webhooks', 'n8n Nodes', 'JSON Transformation', 'API Security', 'Human-in-the-Loop']
  },
  EDUCATION: {
    id: 'EDUCATION',
    name: 'Adaptive Socratic Mentors & Tutoring',
    tagline: 'Build personalized pedagogical AI agents that adapt dynamically to individual learning curves.',
    icon: GraduationCap,
    accentColor: '#e879f9',
    recommendedTools: [
      { name: 'NotebookLM', role: 'Source-Grounded Notebook', whyThisTool: 'Creates interactive Socratic study guides and audio discussions from source PDFs.', skillLevel: 'Beginner' },
      { name: 'Claude 3.7', role: 'Socratic Curriculum Designer', whyThisTool: 'Engineered to diagnose misconceptions and offer progressive pedagogical hints.', skillLevel: 'Intermediate' },
      { name: 'Synthesia', role: 'Interactive AI Video Instructors', whyThisTool: 'Generates professional teacher avatars presenting curriculum in 120+ languages.', skillLevel: 'Beginner' },
      { name: 'Quizlet Q-Chat', role: 'Adaptive Flashcard Tutor', whyThisTool: 'Tests active recall and tracks spaced repetition intervals dynamically.', skillLevel: 'Beginner' }
    ],
    learningPath: [
      { step: '01', title: 'Pedagogical System Prompting', description: 'Instruct LLMs to ask guiding questions rather than immediately blurting the answer.' },
      { step: '02', title: 'Knowledge Gap Diagnosis', description: 'Parse student answers to identify exact conceptual misunderstandings.' },
      { step: '03', title: 'Spaced Repetition Graphs', description: 'Algorithmically calculate when a student needs to review key technical terms.' },
      { step: '04', title: 'Interactive Code Sandboxes', description: 'Embed runnable exercises with real-time test case verification.' }
    ],
    projectIdeas: [
      { title: 'Socratic Python Coding Tutor', difficulty: 'Intermediate', time: '5 Hours', deliverable: 'Interactive terminal bot that guides students' },
      { title: 'Adaptive Medical Exam Prep Agent', difficulty: 'Advanced', time: '9 Hours', deliverable: 'Dynamic quiz generator with citation feedback' },
      { title: 'Audio Study Guide Generator', difficulty: 'Beginner', time: '3 Hours', deliverable: 'Transforms dense textbook chapters into audio' }
    ],
    skills: ['Socratic Prompting', 'Curriculum Mapping', 'Pedagogical Design', 'Spaced Repetition', 'Assessment Logic']
  }
};

interface WhatDoYouWantToCreateProps {
  onSelectCategory?: (category: CreationCategory) => void;
  onStartPersonalizedPath?: (category: CreationCategory) => void;
  onLaunchLessonSandbox?: (toolName: string, category: string) => void;
  onOpenProject?: (projectTitle: string) => void;
}

export const WhatDoYouWantToCreate: React.FC<WhatDoYouWantToCreateProps> = ({
  onSelectCategory,
  onStartPersonalizedPath,
  onLaunchLessonSandbox,
  onOpenProject
}) => {
  const [selectedCat, setSelectedCat] = useState<CreationCategory>('CODING');
  const activeData = CATEGORY_DATA[selectedCat];

  const handleSelect = (cat: CreationCategory) => {
    soundFX.playClick();
    setSelectedCat(cat);
    onSelectCategory?.(cat);
  };

  const categories: CreationCategory[] = [
    'CODING',
    'VIDEO',
    'DESIGN',
    'BUSINESS',
    'DATA',
    'MARKETING',
    'AUTOMATION',
    'EDUCATION'
  ];

  return (
    <section 
      id="creator-flow" 
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #05070d 0%, #070913 50%, #05070d 100%)'
      }}
    >
      {/* Background Accent Gradients */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: activeData.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-code mb-4 border"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              color: '#38bdf8'
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTANT DISCOVERY ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            WHAT DO YOU WANT TO <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${activeData.accentColor} 100%)`
              }}
            >
              CREATE?
            </span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 font-body max-w-2xl mx-auto leading-relaxed">
            Select your discipline to dynamically unlock tailored AI tools, step-by-step learning roadmaps, real-world project blueprints, and career skills.
          </p>
        </div>

        {/* 8 Category Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-12">
          {categories.map((catKey) => {
            const cat = CATEGORY_DATA[catKey];
            const Icon = cat.icon;
            const isSelected = selectedCat === catKey;

            return (
              <button
                key={catKey}
                onClick={() => handleSelect(catKey)}
                onMouseEnter={() => soundFX.playHover()}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 border text-center ${
                  isSelected
                    ? 'shadow-lg scale-[1.03] font-bold'
                    : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 border-white/[0.06]'
                }`}
                style={{
                  background: isSelected ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.02)',
                  borderColor: isSelected ? activeData.accentColor : 'rgba(255, 255, 255, 0.07)',
                  boxShadow: isSelected ? `0 0 24px ${activeData.accentColor}30` : 'none',
                }}
                data-cursor-label={catKey}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: isSelected ? `${cat.accentColor}25` : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? cat.accentColor : '#94a3b8'
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono-code tracking-wider uppercase ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  {catKey}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Intelligence Dashboard Panel */}
        <div 
          className="rounded-3xl p-6 sm:p-10 border transition-all duration-500 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          style={{
            background: 'rgba(13, 16, 25, 0.85)',
            borderColor: 'rgba(255, 255, 255, 0.09)',
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${activeData.accentColor}10`
          }}
        >
          {/* Top Category Title Banner */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono-code font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${activeData.accentColor}20`,
                    color: activeData.accentColor,
                    border: `1px solid ${activeData.accentColor}40`
                  }}
                >
                  {selectedCat} ECOSYSTEM
                </span>
                <span className="text-xs font-mono-code text-slate-400">
                  Curated for Practical Mastery
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                {activeData.name}
              </h3>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                {activeData.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onStartPersonalizedPath?.(selectedCat);
                }}
                className="px-6 py-3 rounded-xl font-body font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, #ffffff 0%, ${activeData.accentColor} 100%)`
                }}
                data-cursor-label="START"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                <span>Start This Learning Path</span>
              </button>
            </div>
          </div>

          {/* 4 Quadrants: Tools, Learning Path, Project Ideas, Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. Recommended AI Tools (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>RECOMMENDED AI TOOLS</span>
                </div>
                <span className="text-[10px] font-mono-code text-slate-500">
                  WHY THIS TOOL?
                </span>
              </div>

              <div className="space-y-3">
                {activeData.recommendedTools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border transition-all duration-300 hover:border-white/20 group"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderColor: 'rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {tool.name}
                        </span>
                        <span className="text-[10px] font-mono-code text-slate-400 px-2 py-0.5 rounded bg-white/5">
                          {tool.role}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded border border-white/10 text-slate-300">
                        {tool.skillLevel}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-body leading-relaxed mb-3">
                      <span className="text-cyan-400/90 font-mono-code text-[11px] block mb-0.5">
                        Why this tool:
                      </span>
                      {tool.whyThisTool}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <button
                        onClick={() => {
                          soundFX.playClick();
                          onLaunchLessonSandbox?.(tool.name, selectedCat);
                        }}
                        className="text-[11px] font-mono-code text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
                      >
                        <Play className="w-3 h-3 fill-cyan-400" />
                        <span>Interactive Try It Lesson</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Step-by-Step Learning Path & Project Ideas (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Learning Path */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 mb-4">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>STRUCTURED LEARNING ROADMAP</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeData.learningPath.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border relative"
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderColor: 'rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono-code font-bold"
                          style={{
                            backgroundColor: `${activeData.accentColor}25`,
                            color: activeData.accentColor
                          }}
                        >
                          {step.step}
                        </span>
                        <h4 className="text-xs font-mono-code font-semibold text-white">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 font-body leading-relaxed pl-7">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Blueprints */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 mb-4">
                  <Rocket className="w-4 h-4 text-emerald-400" />
                  <span>REAL-WORLD PROJECT BLUEPRINTS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeData.projectIdeas.map((proj, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        soundFX.playClick();
                        onOpenProject?.(proj.title);
                      }}
                      className="p-3.5 rounded-xl border transition-all hover:border-emerald-500/40 hover:bg-white/[0.04] cursor-pointer flex flex-col justify-between"
                      style={{
                        background: 'rgba(255, 255, 255, 0.025)',
                        borderColor: 'rgba(255, 255, 255, 0.07)'
                      }}
                      data-cursor-label="BUILD"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-1.5">
                          <span className="text-emerald-400 font-semibold">{proj.difficulty}</span>
                          <span>{proj.time}</span>
                        </div>
                        <h5 className="font-display font-bold text-xs text-white mb-2 leading-snug">
                          {proj.title}
                        </h5>
                      </div>
                      <div className="text-[10px] font-mono-code text-slate-400 pt-2 border-t border-white/5 truncate">
                        Output: {proj.deliverable}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Skills Badges */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 mr-2">
                  VERIFIED SKILLS:
                </span>
                {activeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono-code border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(255, 255, 255, 0.09)',
                      color: '#e2e8f0'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
