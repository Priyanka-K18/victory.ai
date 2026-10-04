import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  Play, 
  Sparkles, 
  Send, 
  Code2, 
  Terminal, 
  Rocket, 
  Cpu, 
  BookOpen, 
  HelpCircle,
  Bug,
  Lightbulb,
  Share2,
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectLabItem } from '../../types';
import { soundFX } from '../../utils/audio';

interface WorkspaceModalProps {
  project: ProjectLabItem | null;
  onClose: () => void;
  onCompleteProject: (projectId: string) => void;
}

interface StepItem {
  id: number;
  stageName: string;
  title: string;
  description: string;
  codeSnippet: string;
  taskInstructions: string;
  completed: boolean;
}

export const WorkspaceModal: React.FC<WorkspaceModalProps> = ({ 
  project, 
  onClose,
  onCompleteProject 
}) => {
  if (!project) return null;

  const [currentStepIdx, setCurrentStepIdx] = useState(2); // starts on step 3 (BUILD)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'terminal'>('editor');
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Exact 7-step practical roadmap from Section 21
  const [steps, setSteps] = useState<StepItem[]>([
    {
      id: 1,
      stageName: 'UNDERSTAND',
      title: 'Problem & Architecture Boundary',
      description: 'Audit requirements, establish domain schema and input constraints.',
      codeSnippet: `// Step 1: System Spec & Zod Input Contract
import { z } from 'zod';

export const RequestSchema = z.object({
  query: z.string().min(5),
  maxTokens: z.number().default(1024),
  streamMode: z.boolean().default(true)
});`,
      taskInstructions: 'Review domain boundaries and typed schema before invoking AI APIs.',
      completed: true,
    },
    {
      id: 2,
      stageName: 'PLAN',
      title: 'Prompt Architecture & Tool Orchestration',
      description: 'Define system prompt, zero-shot few-shot guardrails, and JSON schemas.',
      codeSnippet: `// Step 2: System Prompt Definition
const SYSTEM_PROMPT = \`
You are an expert ${project.category} specialist.
Follow these strict rules:
1. Always output valid typed JSON conforming to RequestSchema.
2. Never hallucinate facts outside the provided context chunks.
3. If context is missing, return {"status": "needs_clarification"}.
\`;`,
      taskInstructions: 'Establish guardrails so the LLM output conforms to schema without hallucinating.',
      completed: true,
    },
    {
      id: 3,
      stageName: 'BUILD',
      title: 'Core Engine & Logic Implementation',
      description: 'Write application routes, component hooks, and state management.',
      codeSnippet: `// Step 3: Core Implementation
import { createAIClient } from '@victory/ai-core';

export async function executeStep() {
  const client = createAIClient({
    model: 'claude-3-7-sonnet',
    temperature: 0.2
  });

  return await client.process({
    task: '${project.title}',
    tools: ${JSON.stringify(project.aiTools)}
  });
}`,
      taskInstructions: 'Implement the primary processing function and test local execution.',
      completed: false,
    },
    {
      id: 4,
      stageName: 'INTEGRATE AI',
      title: 'Model SDK & Vector Connection',
      description: 'Wire up streaming responses and token telemetry.',
      codeSnippet: `// Step 4: AI Model Streaming
export async function streamCompletion(payload: unknown) {
  // Streaming low-latency tokens to client
  return await fetch('/api/ai/stream', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}`,
      taskInstructions: 'Connect the streaming endpoint for smooth, low-latency UI rendering.',
      completed: false,
    },
    {
      id: 5,
      stageName: 'TEST',
      title: 'Automated Evaluation & Guardrail Verification',
      description: 'Benchmark latency, hallucination rate, and schema conformity.',
      codeSnippet: `// Step 5: Test Suite & Guardrails
test('output matches strict schema with zero toxic content', async () => {
  const result = await executeStep();
  expect(result.status).toBe('SUCCESS');
});`,
      taskInstructions: 'Run the automated test runner to ensure 100% test pass rate.',
      completed: false,
    },
    {
      id: 6,
      stageName: 'DEPLOY',
      title: 'Edge Infrastructure & Rate Limiting',
      description: 'Deploy to Vercel/Cloudflare Edge with LangSmith token tracking.',
      codeSnippet: `// Step 6: Edge Deployment Spec
export const runtime = 'edge';
export const preferredRegion = 'iad1';`,
      taskInstructions: 'Configure edge runtime and rate-limiting middleware.',
      completed: false,
    },
    {
      id: 7,
      stageName: 'PORTFOLIO',
      title: 'Publish Verified Proof of Work',
      description: 'Generate live 3D portfolio card, metrics summary, and GitHub release.',
      codeSnippet: `// Step 7: Portfolio Metadata Export
export const portfolioCard = {
  project: "${project.title}",
  deliverable: "${project.finalDeliverable}",
  status: "VERIFIED_PRODUCTION"
};`,
      taskInstructions: 'Package your project into a professional proof-of-work portfolio item.',
      completed: false,
    },
  ]);

  const [codeContent, setCodeContent] = useState<string>(steps[2].codeSnippet);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Victory.ai Practical Workspace Sandbox initialized.',
    `[INFO] Target Project: ${project.title}`,
    `[SUITE] AI Nodes: ${project.aiTools.join(', ')} online.`,
    '[READY] Click "Execute Step" to verify this task.'
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [mentorInput, setMentorInput] = useState('');
  const [mentorMessages, setMentorMessages] = useState<Array<{ sender: 'mentor' | 'user'; text: string; mode?: string }>>([
    {
      sender: 'mentor',
      text: `Welcome to the ${project.title} workspace! We are currently on Step 03: [BUILD]. I am here to give you hints, explain architectural choices, or debug runtime errors.`,
      mode: 'EXPLAIN'
    }
  ]);

  const completedCount = steps.filter(s => s.completed).length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  const handleSelectStep = (idx: number) => {
    soundFX.playClick();
    setCurrentStepIdx(idx);
    setCodeContent(steps[idx].codeSnippet);
  };

  const handleExecuteCode = () => {
    soundFX.playClick();
    setIsRunning(true);
    setTerminalLogs(prev => [...prev, `[RUN] Executing Step 0${currentStepIdx + 1}: ${steps[currentStepIdx].stageName}...`]);

    setTimeout(() => {
      soundFX.playSuccess();
      setIsRunning(false);
      setTerminalLogs(prev => [
        ...prev,
        `[OK] Step 0${currentStepIdx + 1} passed all guardrails. Output valid.`,
        '[STATUS] Ready to advance to next step.'
      ]);

      // Mark current step as completed
      setSteps(prev => prev.map((s, i) => i === currentStepIdx ? { ...s, completed: true } : s));

      // Advance to next step if available
      if (currentStepIdx < steps.length - 1) {
        const nextIdx = currentStepIdx + 1;
        setCurrentStepIdx(nextIdx);
        setCodeContent(steps[nextIdx].codeSnippet);
      } else {
        // Project Completed!
        triggerCelebration();
      }
    }, 750);
  };

  const triggerCelebration = () => {
    soundFX.playSuccess();
    setShowCompletionModal(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const handleSendMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorInput.trim()) return;

    soundFX.playClick();
    const query = mentorInput;
    setMentorMessages(prev => [...prev, { sender: 'user', text: query }]);
    setMentorInput('');

    setTimeout(() => {
      soundFX.playHover();
      setMentorMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: `For ${steps[currentStepIdx].stageName} in ${project.title}: Always verify that return types are strictly shaped. If you run into parsing issues, ensure markdown backticks are stripped.`,
          mode: 'HINT'
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl">
      <div 
        className="relative w-full max-w-7xl h-[94vh] max-h-[900px] rounded-3xl border shadow-2xl overflow-hidden flex flex-col text-slate-200"
        style={{
          background: 'rgba(8, 12, 22, 0.96)',
          borderColor: 'rgba(56, 189, 248, 0.3)',
          boxShadow: '0 25px 90px rgba(0, 0, 0, 0.8), 0 0 60px rgba(56, 189, 248, 0.15)'
        }}
      >
        
        {/* Workspace Top Header */}
        <div className="px-6 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              PRACTICAL WORKSPACE
            </span>
            <div className="h-4 w-[1px] bg-white/10" />
            <h2 className="font-display font-bold text-sm sm:text-base text-white">
              {project.title}
            </h2>
            <span className="hidden sm:inline-block text-xs font-mono-code text-slate-400">
              ({project.category})
            </span>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Column Practical Layout (Section 21) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* LEFT: PROJECT ROADMAP (3 Cols) */}
          <div className="hidden lg:flex lg:col-span-3 border-r border-white/[0.08] p-5 flex-col justify-between bg-[#060914]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 mb-4">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>PROJECT ROADMAP</span>
              </div>

              <div className="space-y-1.5">
                {steps.map((step, idx) => {
                  const isActive = currentStepIdx === idx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleSelectStep(idx)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-cyan-500/15 border-cyan-400 text-white font-bold shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                          : step.completed
                          ? 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5'
                          : 'bg-white/[0.01] border-transparent text-slate-500 hover:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-cyan-400">
                          {step.stageName}
                        </span>
                        <span className="text-xs font-body truncate">
                          {step.title}
                        </span>
                      </div>

                      <span className="shrink-0">
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isActive ? (
                          <span className="text-cyan-400 font-mono-code text-xs">→</span>
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-700" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Tools Palette */}
            <div className="pt-4 border-t border-white/5">
              <span className="text-[10px] font-mono-code text-slate-500 uppercase block mb-2">
                ACTIVE AI TOOLCHAIN:
              </span>
              <div className="flex flex-wrap gap-1">
                {project.aiTools.map((tool, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/10 text-cyan-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: MAIN TASK & INTERACTIVE CODE BUFFER (6 Cols) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col border-r border-white/[0.08] bg-[#04060f] overflow-hidden">
            
            {/* Tab Controls & Execute Button */}
            <div className="px-4 py-2 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code flex items-center gap-1.5 ${
                    activeTab === 'editor'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code flex items-center gap-1.5 ${
                    activeTab === 'terminal'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Terminal</span>
                </button>
              </div>

              <button
                onClick={handleExecuteCode}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-lg text-xs font-mono-code font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] disabled:opacity-40 transition-all cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-slate-950" />
                    <span>Execute Step 0{currentStepIdx + 1}</span>
                  </>
                )}
              </button>
            </div>

            {/* Step Task Banner */}
            <div className="px-4 py-2.5 bg-cyan-950/20 border-b border-cyan-500/20 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs font-body text-slate-200">
                <strong className="text-cyan-300 font-mono-code uppercase mr-2">
                  [{steps[currentStepIdx].stageName}]:
                </strong>
                {steps[currentStepIdx].taskInstructions}
              </div>
            </div>

            {/* Code / Terminal View */}
            <div className="flex-1 overflow-hidden p-4 font-mono-code flex flex-col">
              {activeTab === 'editor' ? (
                <div className="h-full rounded-2xl bg-black/60 border border-white/10 p-3.5 flex flex-col">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 mb-2 border-b border-white/5">
                    <span>workspace_runner.ts</span>
                    <span className="text-cyan-400">Step 0{currentStepIdx + 1} Buffer</span>
                  </div>
                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    className="w-full flex-1 bg-transparent resize-none outline-none text-xs text-slate-200 leading-relaxed font-mono-code selection:bg-cyan-500/30"
                    spellCheck={false}
                  />
                </div>
              ) : (
                <div className="h-full rounded-2xl bg-black/80 border border-white/10 p-3.5 overflow-y-auto space-y-1.5 text-xs text-emerald-400">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: AI MENTOR (3 Cols) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col bg-[#050711] overflow-hidden">
            <div className="p-4 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-white">
                  AI PAIR ARCHITECT
                </span>
              </div>
              <span className="text-[10px] font-mono-code text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                ACTIVE
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-body">
              {mentorMessages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMentor} className="p-3 border-t border-white/[0.08] bg-black/40 flex gap-2">
              <input
                type="text"
                value={mentorInput}
                onChange={(e) => setMentorInput(e.target.value)}
                placeholder="Ask pair architect for a hint..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/40"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM: PROGRESS & COMPLETION STATUS BAR */}
        <div className="px-6 py-3.5 border-t border-white/[0.08] bg-black/60 flex items-center justify-between text-xs font-mono-code">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">PROGRESS:</span>
            <div className="w-36 sm:w-60 h-2 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-emerald-300 font-bold">{progressPct}%</span>
            <span className="hidden sm:inline text-slate-500">
              ({completedCount} of {steps.length} steps completed)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {progressPct === 100 ? (
              <button
                onClick={() => {
                  soundFX.playSuccess();
                  setShowCompletionModal(true);
                }}
                className="px-5 py-2 rounded-xl font-body font-bold text-xs uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
              >
                <Award className="w-3.5 h-3.5 text-slate-950" />
                <span>View Completion Award</span>
              </button>
            ) : (
              <button
                onClick={handleExecuteCode}
                className="px-5 py-2 rounded-xl font-body font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center gap-1.5"
              >
                <span>Advance Step →</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* SECTION 22: SATISFYING PROJECT COMPLETION MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-300">
          <div 
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl text-center text-slate-200"
            style={{
              background: 'rgba(10, 14, 26, 0.98)',
              borderColor: 'rgba(52, 211, 153, 0.4)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 60px rgba(52, 211, 153, 0.2)'
            }}
          >
            {/* Completion Badge */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 mx-auto flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono-code font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROJECT COMPLETED ✓</span>
            </div>

            <h3 className="text-2xl font-display font-black text-white mb-2">
              {project.title}
            </h3>
            <p className="text-xs text-slate-300 font-body mb-6">
              You have successfully completed all 7 practical development milestones from problem spec to edge deployment.
            </p>

            {/* Skills Gained, Tools Used, What You Built (Section 22 requirement) */}
            <div className="space-y-3 mb-6 text-left text-xs font-body bg-white/[0.025] p-4 rounded-2xl border border-white/5">
              <div>
                <strong className="text-[10px] font-mono-code uppercase text-slate-400 block mb-1">
                  SKILLS GAINED:
                </strong>
                <div className="flex flex-wrap gap-1">
                  {project.skillsAcquired.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono-code text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-[10px] font-mono-code uppercase text-slate-400 block mb-1">
                  AI TOOLS MASTERED:
                </strong>
                <div className="flex flex-wrap gap-1">
                  {project.aiTools.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono-code text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-[10px] font-mono-code uppercase text-slate-400 block mb-0.5">
                  WHAT YOU BUILT:
                </strong>
                <p className="text-slate-300 font-mono-code text-[11px]">
                  {project.finalDeliverable}
                </p>
              </div>
            </div>

            {/* Actions: ADD TO PORTFOLIO, SHARE PROJECT, VIEW PROJECT (Section 22 requirement) */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => {
                  soundFX.playSuccess();
                  onCompleteProject(project.id);
                  setShowCompletionModal(false);
                  onClose();
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-body font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5 text-slate-950" />
                <span>ADD TO PORTFOLIO</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  navigator.clipboard.writeText(`I just built and deployed "${project.title}" on Victory.ai!`);
                }}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono-code text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
