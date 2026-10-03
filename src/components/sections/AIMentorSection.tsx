import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Lightbulb, 
  Bug, 
  BookOpen, 
  CheckCircle, 
  HelpCircle,
  Cpu,
  RefreshCw,
  Terminal
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

type MentorMode = 'EXPLAIN' | 'HINT' | 'DEBUG' | 'PRACTICE' | 'REVIEW' | 'PROJECT HELP';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  mode: MentorMode;
  timestamp: string;
}

const SAMPLE_PROMPTS: Record<MentorMode, string[]> = {
  EXPLAIN: [
    'Explain how vector cosine similarity works in plain English.',
    'What is the difference between RAG and fine-tuning an LLM?',
    'Why do LLMs hallucinate numbers and citations?'
  ],
  HINT: [
    'How do I make my Cursor IDE respect project-specific coding rules?',
    'Give me a hint on reducing token usage in multi-turn conversations.',
    'How can I stream LLM responses in React without UI stutter?'
  ],
  DEBUG: [
    'My Zod schema validation is throwing an unexpected error on JSON output.',
    'Claude API returned 429 Too Many Requests. How do I implement exponential backoff?',
    'Pinecone vector search returns irrelevant document chunks. What should I inspect?'
  ],
  PRACTICE: [
    'Give me a practice challenge on writing system prompts with few-shot examples.',
    'Test my knowledge on context window management.',
    'Challenge me to write an n8n webhook workflow logic.'
  ],
  REVIEW: [
    'Review this system prompt for security vulnerabilities and prompt injection.',
    'Audit this API payload structure for performance bottlenecks.',
    'Check if my project architecture has any single point of failure.'
  ],
  'PROJECT HELP': [
    'Help me structure the database schema for my AI Resume Analyzer.',
    'What is the best way to handle user authentication in an AI Micro-SaaS?',
    'Which video AI model should I use for 60FPS consistent character motion?'
  ]
};

export const AIMentorSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<MentorMode>('EXPLAIN');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am your AI Learning Partner. Unlike normal chatbots that simply dump copy-paste answers, I work with you to understand the underlying architecture, develop mental models, and build production intuition. What challenge are we tackling today?",
      mode: 'EXPLAIN',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const modes: { id: MentorMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'EXPLAIN', label: 'Explain', icon: BookOpen },
    { id: 'HINT', label: 'Hint', icon: Lightbulb },
    { id: 'DEBUG', label: 'Debug', icon: Bug },
    { id: 'PRACTICE', label: 'Practice', icon: Terminal },
    { id: 'REVIEW', label: 'Review', icon: CheckCircle },
    { id: 'PROJECT HELP', label: 'Project Help', icon: HelpCircle },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    soundFX.playClick();
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      mode: activeMode,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      soundFX.playHover();
      setIsTyping(false);

      let reply = '';
      switch (activeMode) {
        case 'EXPLAIN':
          reply = `Let's break this down intuitively: Imagine high-dimensional vector embeddings as points in a giant celestial galaxy. When two concepts (like "king" and "queen") share semantic traits, their celestial coordinates cluster close together. Cosine similarity simply measures the angular distance between their vectors, ignoring document length!`;
          break;
        case 'HINT':
          reply = `Here is a strong directional hint: Look at your system prompt's schema definition. Rather than requesting freeform text, specify strict JSON output with a defined key list. How might you enforce this at runtime using Zod?`;
          break;
        case 'DEBUG':
          reply = `To debug this effectively: 1) Verify that your model parameters include \`response_format: { type: "json_object" }\`. 2) Check if your schema has optional fields that the model might be omitting. Try logging the raw string buffer right before parsing!`;
          break;
        case 'PRACTICE':
          reply = `Here is your challenge: Write a defensive system prompt for a Customer Support bot that must refuse questions about competitor pricing without sounding rude or defensive. What 3 constraints will you establish?`;
          break;
        case 'REVIEW':
          reply = `Reviewing your implementation: Your architectural separation between the ingestion worker and the query edge route is clean. However, consider adding a semantic cache layer (e.g. Upstash Vector) to save up to 40% on repeated query token costs!`;
          break;
        case 'PROJECT HELP':
          reply = `For this project architecture, I recommend: 1) Client upload to Supabase Storage with signed URLs, 2) Background webhook worker running PDF text extraction, 3) Chunking into 400-token blocks with 40-token overlap, 4) OpenAI text-embedding-3-small into Pinecone. Let's start with step 1!`;
          break;
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          mode: activeMode,
          timestamp: 'Just now'
        }
      ]);
    }, 800);
  };

  return (
    <section 
      id="mentor" 
      className="relative py-28 px-4 sm:px-6 bg-[#03050e] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Bot className="w-3.5 h-3.5" />
            <span>SOCRATIC LEARNING PARTNER</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            YOUR AI <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">LEARNING PARTNER.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            A mentor engineered to build deep comprehension, provide surgical hints, debug real-world exceptions, and review your code architectures.
          </p>
        </div>

        {/* Futuristic Terminal Shell */}
        <div className="rounded-3xl bg-[#060a19] border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col h-[650px]">
          
          {/* Top Control Bar with 6 Modes */}
          <div className="p-3 sm:p-4 bg-[#080e24] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-white">
                SOCRATIC NEURAL MENTOR v2.5
              </span>
            </div>

            {/* Mode Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none w-full sm:w-auto">
              {modes.map((m) => {
                const Icon = m.icon;
                const isActive = activeMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      soundFX.playClick();
                      setActiveMode(m.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Quick Suggested Queries Carousel */}
          <div className="px-4 py-2.5 bg-[#050814] border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider shrink-0">
              SUGGESTIONS:
            </span>
            {SAMPLE_PROMPTS[activeMode].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono-code bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/5 text-slate-300 hover:text-cyan-200 transition-colors whitespace-nowrap shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-body">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-wider">
                      {isAi ? `[AI MENTOR • ${msg.mode}]` : '[YOU]'}
                    </span>
                    <span className="text-[10px] font-mono-code text-slate-500">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? 'bg-gradient-to-br from-[#0c1435] to-[#070c22] border border-cyan-500/20 text-slate-200 rounded-tl-none shadow-[0_5px_20px_rgba(0,0,0,0.3)]'
                        : 'bg-cyan-600 text-white rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 text-cyan-400 text-xs font-mono-code">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>AI Partner is formulating pedagogical breakdown...</span>
              </div>
            )}
          </div>

          {/* Prompt Submission Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-[#080d24] border-t border-white/10 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask in [${activeMode}] mode (e.g. "${SAMPLE_PROMPTS[activeMode][0]}")`}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-body"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-40 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
