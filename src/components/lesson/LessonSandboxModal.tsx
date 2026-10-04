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
  ArrowRight,
  Layers,
  Video,
  Award
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface LessonSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName?: string;
  category?: string;
  onLaunchProjectWorkspace?: (projectTitle: string) => void;
}

interface RoadmapItem {
  id: number;
  label: string;
  title: string;
  status: 'completed' | 'current' | 'locked';
}

export const LessonSandboxModal: React.FC<LessonSandboxModalProps> = ({
  isOpen,
  onClose,
  toolName = 'Cursor AI IDE',
  category = 'CODING',
  onLaunchProjectWorkspace
}) => {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState<number>(3); // 03 Practice
  const [centerTab, setCenterTab] = useState<'video' | 'try-it' | 'challenge' | 'project-app'>('try-it');
  
  // Interactive Prompt / Code Try It sandbox
  const [tryItInput, setTryItInput] = useState<string>(
    `// Step 03: Practice Exercise — Tool: ${toolName}
// Task: Define a structured system prompt that parses unstructured user text into typed JSON.

import { createAIClient } from '@victory/ai-core';

export async function parseKnowledge() {
  const client = createAIClient({
    model: 'claude-3-7-sonnet',
    role: 'Autonomous Extraction Specialist'
  });

  const res = await client.extract({
    input: "User requested 4K video commercial with 35mm lens and 24fps motion.",
    schema: {
      resolution: "string",
      lens: "string",
      cadence: "number"
    }
  });

  return res;
}`
  );

  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [mentorChat, setMentorChat] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Welcome to Lesson 03: Practice! In this sandbox, we're exploring ${toolName}. Try executing your schema test to verify token extraction.`
    }
  ]);
  const [mentorInput, setMentorInput] = useState('');

  const roadmap: RoadmapItem[] = [
    { id: 1, label: '01', title: 'Introduction', status: 'completed' },
    { id: 2, label: '02', title: 'Learn the tool', status: 'completed' },
    { id: 3, label: '03', title: 'Practice', status: 'current' },
    { id: 4, label: '04', title: 'Mini challenge', status: 'locked' },
    { id: 5, label: '05', title: 'Build project', status: 'locked' },
    { id: 6, label: '06', title: 'Deploy', status: 'locked' },
    { id: 7, label: '07', title: 'Portfolio', status: 'locked' },
  ];

  const handleRunCode = () => {
    soundFX.playClick();
    setIsRunningTest(true);
    setTestOutput(null);

    setTimeout(() => {
      soundFX.playSuccess();
      setIsRunningTest(false);
      setTestOutput(
        JSON.stringify(
          {
            status: "SUCCESS",
            extractedData: {
              resolution: "4K UHD (3840x2160)",
              lens: "35mm Anamorphic Prime",
              cadence: 24
            },
            tokensConsumed: 142,
            latencyMs: 380,
            guardrailsPass: true
          },
          null,
          2
        )
      );
    }, 700);
  };

  const handleNextStep = () => {
    soundFX.playClick();
    if (activeStep < 7) {
      setActiveStep(prev => prev + 1);
    } else {
      soundFX.playSuccess();
      onLaunchProjectWorkspace?.(`${toolName} Capstone Project`);
      onClose();
    }
  };

  const handleSendMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorInput.trim()) return;

    soundFX.playClick();
    const query = mentorInput;
    setMentorChat(prev => [...prev, { sender: 'user', text: query }]);
    setMentorInput('');

    setTimeout(() => {
      soundFX.playHover();
      setMentorChat(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `For ${toolName} Step 0${activeStep}: Remember to specify strict fallback values in case an unexpected token is returned. Try clicking 'Execute Try-It' to test your current setup!`
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div 
        className="relative w-full max-w-7xl h-[92vh] max-h-[880px] rounded-3xl border shadow-2xl overflow-hidden flex flex-col text-slate-200"
        style={{
          background: 'rgba(8, 11, 20, 0.95)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.1)'
        }}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <span 
              className="px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
            >
              LEARN BY DOING
            </span>
            <div className="h-4 w-[1px] bg-white/10" />
            <h2 className="font-display font-bold text-base sm:text-lg text-white">
              {toolName} — Masterclass Sprint
            </h2>
            <span className="hidden sm:inline-block text-xs font-mono-code text-slate-500">
              · {category}
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

        {/* Main 3-Column Layout: Left (Roadmap), Center (Video/TryIt/Challenge), Right (AI Mentor) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* COLUMN 1: LEFT LEARNING ROADMAP (3 Cols) */}
          <div className="hidden lg:flex lg:col-span-3 border-r border-white/[0.08] p-5 flex-col justify-between bg-[#060812]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 mb-4">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>LEARNING ROADMAP</span>
              </div>

              <div className="space-y-2">
                {roadmap.map((item) => {
                  const isCurrent = activeStep === item.id;
                  const isCompleted = activeStep > item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        soundFX.playClick();
                        setActiveStep(item.id);
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-cyan-500/15 border-cyan-400/50 text-white font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : isCompleted
                          ? 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5'
                          : 'bg-white/[0.01] border-transparent text-slate-500 hover:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono-code font-bold">
                          {item.label}
                        </span>
                        <span className="text-xs font-body">
                          {item.title}
                        </span>
                      </div>

                      <span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
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

            {/* Practical Mindset Card */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 font-body">
              <strong className="text-slate-200 block font-mono-code mb-1">
                VICTORY.AI PHILOSOPHY:
              </strong>
              Never just watch tutorials. Practice in the code runner, pass the mini challenge, and ship to your portfolio.
            </div>
          </div>

          {/* COLUMN 2: CENTER VIDEO / LESSON / TRY IT (6 Cols) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col border-r border-white/[0.08] bg-[#04060f] overflow-hidden">
            
            {/* Center Tab Strip: Video, Try It, Challenge, Project Application */}
            <div className="px-4 py-2 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setCenterTab('try-it')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors flex items-center gap-1.5 ${
                    centerTab === 'try-it'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>03. Try It Sandbox</span>
                </button>

                <button
                  onClick={() => setCenterTab('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors flex items-center gap-1.5 ${
                    centerTab === 'video'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Briefing</span>
                </button>

                <button
                  onClick={() => setCenterTab('challenge')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors flex items-center gap-1.5 ${
                    centerTab === 'challenge'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>AI Challenge</span>
                </button>
              </div>

              {centerTab === 'try-it' && (
                <button
                  onClick={handleRunCode}
                  disabled={isRunningTest}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono-code font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] disabled:opacity-40 transition-all cursor-pointer"
                >
                  {isRunningTest ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-slate-950" />
                      <span>Execute Try-It</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Main Interactive Center Content */}
            <div className="flex-1 overflow-y-auto p-4 font-mono-code">
              {centerTab === 'try-it' && (
                <div className="h-full flex flex-col gap-4">
                  <div className="flex-1 p-3.5 rounded-2xl bg-black/60 border border-white/10 flex flex-col">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 mb-2 border-b border-white/5">
                      <span>interactive_sandbox.ts</span>
                      <span className="text-cyan-400">Editable Live Buffer</span>
                    </div>
                    <textarea
                      value={tryItInput}
                      onChange={(e) => setTryItInput(e.target.value)}
                      className="w-full flex-1 bg-transparent resize-none outline-none text-xs text-slate-200 leading-relaxed font-mono-code selection:bg-cyan-500/30"
                      spellCheck={false}
                    />
                  </div>

                  {/* Test Output Panel */}
                  <div className="h-44 p-3.5 rounded-2xl bg-[#020308] border border-white/10 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Execution Console Output</span>
                      </span>
                      {testOutput && (
                        <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          Pass (All 3 Guardrails Passed)
                        </span>
                      )}
                    </div>
                    <pre className="flex-1 overflow-auto text-[11px] text-emerald-300 leading-relaxed">
                      {testOutput || '[READY] Click "Execute Try-It" to run your prompt schema against test payloads.'}
                    </pre>
                  </div>
                </div>
              )}

              {centerTab === 'video' && (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-full max-w-md aspect-video rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center mb-6 relative group overflow-hidden">
                    <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-6 h-6 fill-cyan-300 ml-1" />
                    </div>
                    <div className="absolute bottom-3 text-xs font-mono-code text-slate-400">
                      4:20 · Production Architecture Walkthrough
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">
                    Understanding {toolName} in Production
                  </h3>
                  <p className="text-xs text-slate-400 font-body max-w-md leading-relaxed">
                    Watch how senior developers constrain output tokens, implement exponential retries with jitter, and wire streaming endpoints into production frontends.
                  </p>
                </div>
              )}

              {centerTab === 'challenge' && (
                <div className="p-4 space-y-4 font-body">
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                    <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-300 font-bold mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>MINI CHALLENGE: ZERO-SHOT SCHEMA REFACTOR</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Given an ambiguous user prompt like "Make me an audio soundtrack", enforce a strict output contract requiring BPM, key signature, and instruments list without hallucinations.
                    </p>
                  </div>
                  <button
                    onClick={() => setCenterTab('try-it')}
                    className="px-4 py-2 rounded-xl text-xs font-mono-code bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Open in Try-It Sandbox →
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* COLUMN 3: RIGHT AI MENTOR SIDE PANEL (3 Cols) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col bg-[#050711] overflow-hidden">
            <div className="p-4 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-white">
                  LESSON AI MENTOR
                </span>
              </div>
              <span className="text-[10px] font-mono-code text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                ACTIVE
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-body">
              {mentorChat.map((msg, i) => (
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
                placeholder="Ask mentor for a hint..."
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

        {/* Bottom Progress Bar + Next Step Action Bar */}
        <div className="px-6 py-3.5 border-t border-white/[0.08] bg-black/60 flex items-center justify-between text-xs font-mono-code">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">PROGRESS:</span>
            <div className="w-36 sm:w-60 h-2 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${(activeStep / 7) * 100}%` }}
              />
            </div>
            <span className="text-cyan-300 font-bold">{Math.round((activeStep / 7) * 100)}%</span>
            <span className="hidden sm:inline text-slate-500">
              (Step 0{activeStep} of 07)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNextStep}
              className="px-5 py-2 rounded-xl font-body font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-transform hover:scale-105 active:scale-95"
            >
              <span>{activeStep === 7 ? 'Complete & Go to Project' : 'Next Step →'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
