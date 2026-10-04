import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Lightbulb, 
  Bug, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  Mic, 
  Copy, 
  Check, 
  RotateCcw,
  Cpu,
  MessageSquare
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

type MentorMode = 
  | 'EXPLAIN' 
  | 'HINT' 
  | 'DEBUG' 
  | 'PRACTICE' 
  | 'REVIEW' 
  | 'PROJECT HELP' 
  | 'TOOL HELP' 
  | 'ROADMAP';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  codeSnippet?: string;
  mode?: MentorMode;
  timestamp: string;
}

interface PersistentAIMentorProps {
  currentSection: string;
  activeContextName?: string;
}

export const PersistentAIMentor: React.FC<PersistentAIMentorProps> = ({
  currentSection,
  activeContextName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMode, setActiveMode] = useState<MentorMode>('EXPLAIN');
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStatus, setThinkingStatus] = useState('AI is analyzing context...');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Derive friendly context name based on scroll position or props
  const getContextName = () => {
    if (activeContextName) return activeContextName;
    switch (currentSection) {
      case 'hero': return 'Platform Overview';
      case 'creator-flow': return 'What Do You Want to Create';
      case 'tools': return 'AI Tool Explorer & Pipeline';
      case 'fields': return 'Department Learning (Every Field)';
      case 'paths': return 'Personalized Learning Roadmap';
      case 'projects': return 'Project Lab & Workspace';
      case 'mentor': return 'AI Learning Mentor';
      case 'prompt-lab': return 'Prompt Engineering Sandbox';
      case 'dashboard': return 'Student Command Center';
      case 'portfolio': return 'Verified 3D Portfolio';
      case 'career': return 'Career Readiness Matrix';
      case 'challenges': return 'Weekend AI Hackathons';
      case 'community': return 'AI Builders Community';
      default: return 'Victory.ai Learning Partner';
    }
  };

  // Context-specific suggested questions (Prompt Section 18 requirement)
  const getSuggestedQuestions = (): string[] => {
    switch (currentSection) {
      case 'tools':
        return [
          'Explain this tool at a beginner level.',
          'Which tool should I use for audio vs video?',
          'How do Cursor and Claude 3.7 work together?'
        ];
      case 'projects':
        return [
          'Help me with this architectural step.',
          'How should I structure the vector embeddings?',
          'Review my system schema before I build.'
        ];
      case 'prompt-lab':
        return [
          'How do I structure the evaluation block?',
          'Give me a hint on eliminating hallucinations.',
          'Turn my basic prompt into an expert prompt.'
        ];
      case 'portfolio':
        return [
          'Improve my project problem & solution description.',
          'What quantifiable metrics impress hiring managers?',
          'How do I showcase full-stack AI skills?'
        ];
      case 'dashboard':
        return [
          'What should I learn next based on my streak?',
          'Which project will accelerate my career most?',
          'Explain the next milestone in my skill constellation.'
        ];
      default:
        return [
          'Explain the core Victory.ai learning loop.',
          'Where should I begin if I want to build AI video?',
          'What is the difference between RAG and fine-tuning?'
        ];
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello! I'm your continuous AI Learning Partner. As you explore tools, projects, and prompts, I keep track of your context to give you Socratic explanations, architectural hints, and code audits. What would you like to explore together?",
      mode: 'EXPLAIN',
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  const handleCopyCode = (text: string, id: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    soundFX.playClick();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsThinking(true);
    setThinkingStatus('AI is analyzing your request...');

    setTimeout(() => {
      setThinkingStatus('Synthesizing pedagogical response...');
    }, 450);

    setTimeout(() => {
      soundFX.playSuccess();
      setIsThinking(false);

      let reply = '';
      let codeSnippet: string | undefined = undefined;

      const qLower = query.toLowerCase();

      if (activeMode === 'HINT') {
        reply = `Here is a surgical hint: Look closely at your payload schema before invoking the model. Enforcing a Zod schema at runtime guarantees that missing fields won't cause runtime frontend errors. Have you defined strict TypeScript types for the returned JSON?`;
      } else if (activeMode === 'DEBUG') {
        reply = "Let's diagnose this: 90% of model parsing exceptions stem from unexpected markdown code fences wrapped around the output. Ensure you strip markdown delimiters before running JSON.parse()!";
        codeSnippet = '// Defensive JSON parser\nfunction cleanLLMJson(raw: string) {\n  const clean = raw.replace(/^```json\\s*|\\s*```$/gi, "").trim();\n  return JSON.parse(clean);\n}';
      } else if (activeMode === 'REVIEW') {
        reply = `Reviewing your approach: Your separation between vector ingestion and client edge streaming is solid. Consider adding an in-memory semantic cache (e.g., Upstash Vector or Redis) to save up to 45% on repetitive embedding token costs.`;
      } else if (activeMode === 'ROADMAP') {
        reply = `For your current topic (${getContextName()}), the optimal pathway is: 1) Master the core prompt schema, 2) Run the Try-It sandbox, 3) Build the flagship project in Project Lab, 4) Deploy to edge and publish proof to your 3D Portfolio.`;
      } else if (qLower.includes('tool') || activeMode === 'TOOL HELP') {
        reply = `When selecting tools for ${getContextName()}, prioritize workflow composition over isolated features. For example: Pair Claude 3.7 (for system spec & architectural reasoning) with Cursor (for repo-wide file edits) and v0 (for rapid Tailwind UI generation).`;
      } else {
        reply = `Let's break this down intuitively for ${getContextName()}: Modern AI systems succeed when they follow the principle of constrained generation. Rather than asking an LLM for open-ended creative outputs, establish explicit boundaries: define the exact role, provide context, constrain token length, and enforce a verified output structure.`;
        if (qLower.includes('code') || qLower.includes('api')) {
          codeSnippet = `import { z } from 'zod';\n\nexport const AgentResponseSchema = z.object({\n  title: z.string(),\n  summary: z.string().max(200),\n  confidenceScore: z.number().min(0).max(1)\n});`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          codeSnippet,
          mode: activeMode,
          timestamp: 'Just now'
        }
      ]);
    }, 1000);
  };

  const modes: { id: MentorMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'EXPLAIN', label: 'Explain', icon: BookOpen },
    { id: 'HINT', label: 'Hint', icon: Lightbulb },
    { id: 'DEBUG', label: 'Debug', icon: Bug },
    { id: 'PRACTICE', label: 'Practice', icon: Sparkles },
    { id: 'REVIEW', label: 'Review', icon: CheckCircle2 },
    { id: 'PROJECT HELP', label: 'Project Help', icon: HelpCircle },
    { id: 'TOOL HELP', label: 'Tool Help', icon: Cpu },
    { id: 'ROADMAP', label: 'Roadmap', icon: Compass }
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isOpen && (
        <button
          onClick={() => {
            soundFX.playClick();
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-4 sm:py-3 rounded-full flex items-center gap-3 transition-all duration-300 group shadow-2xl hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(10, 14, 26, 0.88)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 35px rgba(56, 189, 248, 0.35), 0 10px 30px rgba(0, 0, 0, 0.6)'
          }}
          data-cursor-label="MENTOR"
        >
          {/* Glowing Green Online Indicator */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 relative" />
          </div>

          <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
            <Bot className="w-4 h-4" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-mono-code font-bold text-white flex items-center gap-1.5">
              <span>AI MENTOR</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                24/7
              </span>
            </div>
            <div className="text-[10px] font-mono-code text-slate-400 max-w-[140px] truncate">
              Context: {getContextName()}
            </div>
          </div>
        </button>
      )}

      {/* Expandable Chat Panel Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 backdrop-blur-2xl ${
            isExpanded 
              ? 'w-[92vw] sm:w-[680px] h-[85vh] max-h-[780px]' 
              : 'w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh]'
          }`}
          style={{
            background: 'rgba(8, 12, 22, 0.94)',
            borderColor: 'rgba(56, 189, 248, 0.3)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.15)'
          }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-white">AI Mentor</span>
                  <div className="flex items-center gap-1 text-[10px] font-mono-code text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono-code text-slate-400 flex items-center gap-1 truncate max-w-[220px]">
                  <span>Topic:</span>
                  <span className="text-cyan-300">{getContextName()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsExpanded(!isExpanded);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Selector Strip */}
          <div className="px-3 py-2 border-b border-white/[0.06] bg-white/[0.015] flex items-center gap-1 overflow-x-auto scrollbar-none">
            {modes.map((m) => {
              const Icon = m.icon;
              const isSelected = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveMode(m.id);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono-code whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Contextual Suggested Questions */}
          <div className="px-4 py-2 border-b border-white/[0.04] bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[9px] font-mono-code text-slate-500 uppercase shrink-0">
              Suggested:
            </span>
            {getSuggestedQuestions().map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] font-body text-slate-300 hover:text-cyan-300 hover:bg-white/5 px-2 py-0.5 rounded border border-white/5 truncate shrink-0 max-w-[260px] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 font-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.mode && msg.sender === 'ai' && (
                  <span className="text-[9px] font-mono-code text-cyan-400/80 mb-1 tracking-wider uppercase">
                    [{msg.mode} MODE]
                  </span>
                )}

                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-none shadow-md font-medium'
                      : 'bg-white/[0.04] border border-white/[0.08] text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                  style={{
                    backdropFilter: msg.sender === 'ai' ? 'blur(12px)' : 'none'
                  }}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Render Code Block if present */}
                  {msg.codeSnippet && (
                    <div className="mt-3 rounded-xl bg-black/60 border border-white/10 overflow-hidden font-mono-code text-[11px]">
                      <div className="px-3 py-1.5 bg-white/5 border-b border-white/5 flex items-center justify-between text-slate-400">
                        <span>TypeScript</span>
                        <button
                          onClick={() => handleCopyCode(msg.codeSnippet!, msg.id)}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 text-cyan-200 overflow-x-auto">
                        <code>{msg.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>

                <span className="text-[9px] font-mono-code text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Thinking / Typing Animation State */}
            {isThinking && (
              <div className="flex flex-col items-start">
                <div 
                  className="p-3 rounded-2xl bg-white/[0.04] border border-cyan-500/20 text-cyan-300 text-xs flex items-center gap-2 rounded-tl-none"
                  style={{ backdropFilter: 'blur(12px)' }}
                >
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] font-mono-code text-slate-400">{thinkingStatus}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-white/[0.08] bg-black/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={`Ask AI Mentor in [${activeMode}] mode...`}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-3 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => soundFX.playClick()}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                  title="Voice Input (Future-Ready UI)"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="submit"
                disabled={!inputVal.trim() || isThinking}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
