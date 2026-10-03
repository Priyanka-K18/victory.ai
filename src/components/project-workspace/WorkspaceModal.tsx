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
  Lightbulb
} from 'lucide-react';
import { ProjectLabItem } from '../../types';
import { soundFX } from '../../utils/audio';

interface WorkspaceModalProps {
  project: ProjectLabItem | null;
  onClose: () => void;
  onCompleteProject: (projectId: string) => void;
}

interface StepItem {
  id: number;
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

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'terminal'>('editor');
  const [codeContent, setCodeContent] = useState<string>(`// VICTORY.AI — Interactive Engineering Sandbox
// Target Project: ${project.title}

import { createAIClient } from '@victory/ai-core';

export async function runPipeline() {
  const ai = createAIClient({
    model: 'claude-3-7-sonnet',
    temperature: 0.2
  });

  const response = await ai.generate({
    system: "You are an autonomous domain agent.",
    prompt: "Execute initial step for ${project.title}..."
  });

  return response.data;
}`);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Victory.ai Workspace Sandbox v2.4 initialized.',
    `[INFO] Target Project: ${project.title}`,
    `[ENV] AI Nodes: ${project.aiTools.join(', ')} connected.`,
    '[READY] Type code or click "Execute Step" to run pipeline.'
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [mentorInput, setMentorInput] = useState('');
  const [mentorMessages, setMentorMessages] = useState<Array<{ sender: 'mentor' | 'user'; text: string; mode?: string }>>([
    {
      sender: 'mentor',
      text: `Welcome to the ${project.title} workspace! I'm your AI Pair Architect. You're starting Step 1. How would you like to begin?`,
      mode: 'EXPLAIN'
    }
  ]);
  const [steps, setSteps] = useState<StepItem[]>([
    {
      id: 1,
      title: 'Define Problem & System Boundary',
      description: 'Establish domain schema and input constraints.',
      codeSnippet: `// Step 1: System Spec & Zod Validator
import { z } from 'zod';

export const RequestSchema = z.object({
  query: z.string().min(5),
  maxTokens: z.number().default(1024),
  structuredFormat: z.boolean().default(true)
});`,
      taskInstructions: 'Review the input schema. Make sure prompt boundaries are strictly defined before sending payloads to LLMs.',
      completed: true,
    },
    {
      id: 2,
      title: 'Architect Prompt & Tool Orchestrator',
      description: 'Set system instructions, zero-shot few-shot guardrails, and JSON schemas.',
      codeSnippet: `// Step 2: System Prompt Definition
const SYSTEM_PROMPT = \`
You are an expert ${project.category} specialist.
Follow these strict rules:
1. Always output valid JSON conforming to RequestSchema.
2. Never hallucinate facts outside the provided context.
3. If uncertain, return {"status": "needs_clarification"}.
\`;`,
      taskInstructions: 'Inject guardrails into the system prompt to enforce reproducible outputs without token leakage.',
      completed: false,
    },
    {
      id: 3,
      title: 'Connect AI Runtime & Context Vector',
      description: 'Link embeddings, context cache, and streaming completions.',
      codeSnippet: `// Step 3: Vector Embeddings & Streaming
export async function streamCompletion(prompt: string) {
  const stream = await ai.chat.completions.create({
    model: 'claude-3-7-sonnet',
    messages: [{ role: 'user', content: prompt }],
    stream: true
  });
  return stream;
}`,
      taskInstructions: 'Connect the streaming generator so users see real-time low-latency response chunks.',
      completed: false,
    },
    {
      id: 4,
      title: 'Build Resilient Frontend Interface',
      description: 'Mount glassmorphism UI with optimistic updates and error boundaries.',
      codeSnippet: `// Step 4: UI Hook Integration
export function useAIStream() {
  const [buffer, setBuffer] = useState('');
  // Optimistic rendering loop...
  return { buffer };
}`,
      taskInstructions: 'Ensure loading spinners, retry buttons, and smooth token transitions are bound to state.',
      completed: false,
    },
    {
      id: 5,
      title: 'Evaluation, Benchmarks & Hardening',
      description: 'Run automated evaluation suite against edge-case test suites.',
      codeSnippet: `// Step 5: Test Evaluation Suite
test('handles edge case inputs without crash', async () => {
  const res = await runPipeline();
  expect(res).toBeDefined();
});`,
      taskInstructions: 'Verify latency is under 800ms and response validation achieves 100% pass rate.',
      completed: false,
    },
    {
      id: 6,
      title: 'Deploy to Production & Export Portfolio',
      description: 'Compile production bundle, generate live demo, and export proof.',
      codeSnippet: `// Step 6: Production Edge Deployment
export const config = { runtime: 'edge' };
console.log("Deployed to global edge network.");`,
      taskInstructions: 'Ship project live and automatically generate your verified portfolio card!',
      completed: false,
    },
  ]);

  const handleExecuteCode = () => {
    soundFX.playClick();
    setIsRunning(true);
    setTerminalLogs(prev => [...prev, `[EXEC] Compiling step ${currentStepIdx + 1}...`]);

    setTimeout(() => {
      setIsRunning(false);
      soundFX.playSuccess();
      setTerminalLogs(prev => [
        ...prev, 
        `[SUCCESS] Step ${currentStepIdx + 1} validation passed with 0 errors.`,
        `[METRICS] Latency: 142ms | Tokens: 489 | Accuracy: 100%`
      ]);

      // Mark step completed
      setSteps(prev => prev.map((s, idx) => idx === currentStepIdx ? { ...s, completed: true } : s));

      // Advance step if not at end
      if (currentStepIdx < steps.length - 1) {
        const nextIdx = currentStepIdx + 1;
        setCurrentStepIdx(nextIdx);
        setCodeContent(steps[nextIdx].codeSnippet);
        setMentorMessages(prev => [
          ...prev,
          {
            sender: 'mentor',
            text: `Great job passing Step ${currentStepIdx + 1}! Now let's tackle "${steps[nextIdx].title}". ${steps[nextIdx].taskInstructions}`,
            mode: 'HINT'
          }
        ]);
      } else {
        // All completed!
        setTerminalLogs(prev => [
          ...prev,
          '🎉 ALL STEPS COMPLETED! Project ready to publish to your 3D Portfolio.'
        ]);
        onCompleteProject(project.id);
      }
    }, 850);
  };

  const handleSendMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorInput.trim()) return;

    soundFX.playClick();
    const userMsg = mentorInput;
    setMentorInput('');
    setMentorMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      soundFX.playHover();
      let reply = `Here's how to think about this in ${project.title}: Rather than hardcoding responses, focus on structuring the context first. What data does the model need to make an accurate decision here?`;
      if (userMsg.toLowerCase().includes('error') || userMsg.toLowerCase().includes('bug')) {
        reply = `To debug this, check your schema definition in Step ${currentStepIdx + 1}. Ensure the output keys match the TypeScript interface exactly.`;
      } else if (userMsg.toLowerCase().includes('deploy') || userMsg.toLowerCase().includes('finish')) {
        reply = `You're making great progress! Finish the current step check and click Execute. Once step 6 is complete, your project transforms into a live portfolio item.`;
      }
      setMentorMessages(prev => [...prev, { sender: 'mentor', text: reply, mode: 'EXPLAIN' }]);
    }, 500);
  };

  const progressPct = Math.round((steps.filter(s => s.completed).length / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-7xl h-[92vh] flex flex-col rounded-2xl bg-[#070b19] border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.15)] overflow-hidden text-slate-200">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090f24]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-cyan-400">
                  {project.category}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs text-slate-400 font-mono-code">
                  Est. {project.timeEstimate}
                </span>
              </div>
              <h2 className="text-lg font-display font-bold text-white tracking-wide">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono-code">
              <span className="text-slate-400">STATUS:</span>
              <span className="text-emerald-400 font-semibold">{progressPct}% COMPLETE</span>
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Column Studio Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Column 1: Project Steps List (3 Cols) */}
          <div className="lg:col-span-3 border-r border-white/10 bg-[#060a17]/90 p-4 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 font-semibold">
                  PROJECT PIPELINE
                </span>
                <span className="text-xs font-mono-code text-cyan-400">
                  {currentStepIdx + 1} / {steps.length}
                </span>
              </div>

              <div className="space-y-2">
                {steps.map((step, idx) => {
                  const isActive = idx === currentStepIdx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        soundFX.playClick();
                        setCurrentStepIdx(idx);
                        setCodeContent(step.codeSnippet);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all border ${
                        isActive
                          ? 'bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white'
                          : step.completed
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300 hover:bg-white/5'
                          : 'bg-white/[0.02] border-white/5 text-slate-500 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5">
                          {step.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : isActive ? (
                            <Circle className="w-4 h-4 text-cyan-400 fill-cyan-400/30 animate-pulse" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600" />
                          )}
                        </span>
                        <div>
                          <div className="text-xs font-mono-code font-semibold tracking-wide">
                            STEP 0{step.id}
                          </div>
                          <div className={`text-xs font-medium mt-0.5 leading-snug ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            {step.title}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tools Badge */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider block mb-2">
                RECOMMENDED AI SUITE
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.aiTools.map((tool, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-white/5 border border-white/10 text-cyan-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Center Editor & Execution Sandbox (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col border-r border-white/10 bg-[#040814]">
            {/* Tab Controls */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#070d1e]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono-code transition-colors ${
                    activeTab === 'editor' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Code Sandbox
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono-code transition-colors ${
                    activeTab === 'terminal' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Terminal Log
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExecuteCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono-code text-xs font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50"
                >
                  {isRunning ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Execute Step 0{currentStepIdx + 1}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step Task Banner */}
            <div className="px-5 py-3 bg-cyan-950/20 border-b border-cyan-500/20 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div className="text-xs text-cyan-200/90 leading-relaxed font-body">
                <strong className="text-white font-semibold block font-display mb-0.5">
                  Task Objective: {steps[currentStepIdx]?.title}
                </strong>
                {steps[currentStepIdx]?.taskInstructions}
              </div>
            </div>

            {/* Main Interactive Editor View */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
              {activeTab === 'editor' ? (
                <div className="flex-1 p-4 font-mono-code text-xs text-cyan-100 bg-[#02050e] overflow-auto">
                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    className="w-full h-full bg-transparent resize-none outline-none font-mono-code text-xs leading-relaxed text-slate-200 selection:bg-cyan-500/30"
                    spellCheck={false}
                  />
                </div>
              ) : (
                <div className="flex-1 p-4 font-mono-code text-xs bg-[#010309] text-emerald-400 overflow-y-auto space-y-1.5">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Column 3: AI Learning Partner Mentor (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col bg-[#050917]">
            <div className="p-4 border-b border-white/10 bg-[#080d21] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-white">
                  AI LEARNING PARTNER
                </span>
              </div>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                ACTIVE
              </span>
            </div>

            {/* Quick Mode Filters */}
            <div className="p-2 border-b border-white/5 flex gap-1 bg-[#040714] text-[10px] font-mono-code overflow-x-auto">
              {['EXPLAIN', 'HINT', 'DEBUG', 'REVIEW'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    soundFX.playClick();
                    setMentorMessages(prev => [
                      ...prev,
                      {
                        sender: 'mentor',
                        text: `Switched mode to [${mode}]. What concept from Step ${currentStepIdx + 1} would you like me to analyze?`,
                        mode
                      }
                    ]);
                  }}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-400 transition-colors"
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-body">
              {mentorMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.mode && (
                    <span className="text-[9px] font-mono-code text-cyan-400/80 mb-0.5 tracking-wider uppercase">
                      [{msg.mode} MODE]
                    </span>
                  )}
                  <div
                    className={`max-w-[92%] p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMentor} className="p-3 border-t border-white/10 bg-[#070c1e] flex gap-2">
              <input
                type="text"
                value={mentorInput}
                onChange={(e) => setMentorInput(e.target.value)}
                placeholder="Ask your AI Mentor for a hint..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Progress & Deploy Status Bar */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#060b1c] flex items-center justify-between text-xs font-mono-code">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">TOTAL PROGRESS:</span>
            <div className="w-48 h-2 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500" 
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-white font-semibold">{progressPct}%</span>
          </div>

          <div className="flex items-center gap-3">
            {progressPct === 100 ? (
              <button
                onClick={() => {
                  soundFX.playSuccess();
                  onCompleteProject(project.id);
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <Rocket className="w-3.5 h-3.5" />
                Add to 3D Portfolio (+1,200 XP)
              </button>
            ) : (
              <span className="text-slate-500 flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" />
                Finish all 6 steps to deploy to portfolio
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
