import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  mode: string;
  context?: string;
  userId?: string;
}

const SYSTEM_PROMPT = `You are ARIA (AI Research & Implementation Assistant), the expert AI mentor on Victory.AI — a practical AI learning platform.

ROLE: Senior AI Engineer & Educator with expertise in:
- LLM APIs (Claude, GPT-4, Gemini), LangChain, LangGraph, RAG pipelines
- Production deployment: Supabase, Vercel, Railway, Docker  
- AI tools: Cursor, v0, Midjourney, Runway, ElevenLabs, n8n
- Code review, debugging, architecture guidance
- Practical project building — no fluff, real deliverables

PERSONALITY: Direct, expert, encouraging. You give concrete code examples. You break down complex AI concepts into actionable steps. You celebrate when students make progress.

RULES:
1. Always respond with practical, actionable advice
2. Include code snippets when relevant (TypeScript, Python)
3. Reference Victory.AI tools and projects when relevant
4. Keep responses concise but complete — max 300 words unless code-heavy
5. Never hallucinate — if you don't know, say so clearly
6. End with a challenge or next step the student can take TODAY`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const openaiKey = Deno.env.get('OPENAI_API_KEY') ?? '';
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY') ?? '';

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { messages, mode, context, userId }: ChatRequest = await req.json();

    // Build the mode-specific system prompt addendum
    const modeInstructions: Record<string, string> = {
      EXPLAIN: 'Your goal: explain the concept clearly with an analogy + concrete code example.',
      HINT: 'Your goal: give a subtle hint that guides them to the answer without spoiling it.',
      DEBUG: 'Your goal: identify the exact bug, explain WHY it happens, and provide the corrected code.',
      PRACTICE: 'Your goal: give them a practice exercise related to the current topic with clear requirements.',
      REVIEW: 'Your goal: review their code/work for bugs, style issues, and improvements.',
      'PROJECT HELP': 'Your goal: help them plan and implement their project step by step.',
      'TOOL HELP': 'Your goal: explain the AI tool, give the best prompts and workflows to master it.',
      ROADMAP: 'Your goal: create a personalized 30-day learning roadmap based on their goals.',
    };

    const systemContent = `${SYSTEM_PROMPT}\n\nCURRENT MODE: ${mode}\n${modeInstructions[mode] || ''}\n${context ? `\nCONTEXT: User is currently working on: ${context}` : ''}`;

    let responseText = '';

    // Try Claude first, fall back to OpenAI
    if (anthropicKey) {
      const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1024,
          system: systemContent,
          messages: messages.filter(m => m.role !== 'system'),
        }),
      });

      if (anthropicRes.ok) {
        const data = await anthropicRes.json();
        responseText = data.content[0]?.text ?? '';
      }
    }

    // Fallback to OpenAI GPT-4o-mini
    if (!responseText && openaiKey) {
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 1024,
          messages: [
            { role: 'system', content: systemContent },
            ...messages.filter(m => m.role !== 'system'),
          ],
        }),
      });

      if (openaiRes.ok) {
        const data = await openaiRes.json();
        responseText = data.choices[0]?.message?.content ?? '';
      }
    }

    // If no AI key configured — smart canned response for demo
    if (!responseText) {
      responseText = getDemoResponse(mode, messages[messages.length - 1]?.content || '');
    }

    // Log to ai_mentor_chats table
    if (userId && responseText) {
      await supabase.from('ai_mentor_chats').insert([
        { user_id: userId, sender: 'user', message: messages[messages.length - 1]?.content, context_title: context || mode },
        { user_id: userId, sender: 'assistant', message: responseText, context_title: context || mode },
      ]);
    }

    return new Response(
      JSON.stringify({ response: responseText, model: anthropicKey ? 'claude-haiku' : openaiKey ? 'gpt-4o-mini' : 'demo' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function getDemoResponse(mode: string, userMessage: string): string {
  const lowerMsg = userMessage.toLowerCase();

  if (lowerMsg.includes('rag') || lowerMsg.includes('retrieval')) {
    return `## RAG Architecture in Production\n\nHere's the core RAG pattern:\n\n\`\`\`typescript\n// 1. Embed user query\nconst queryEmbedding = await openai.embeddings.create({\n  model: "text-embedding-3-small",\n  input: userQuery\n});\n\n// 2. Search vector DB (Supabase pgvector)\nconst { data: docs } = await supabase.rpc('match_documents', {\n  query_embedding: queryEmbedding.data[0].embedding,\n  match_threshold: 0.78,\n  match_count: 5\n});\n\n// 3. Generate with context\nconst response = await claude.messages.create({\n  model: "claude-3-5-haiku-20241022",\n  messages: [{ role: "user", content: \`Context: \${docs.map(d => d.content).join('\\n')}\n\nQuestion: \${userQuery}\` }]\n});\n\`\`\`\n\n**Next step:** Implement this in the AI Chatbot project in your Project Lab. Try it with 5 PDF documents first.`;
  }

  if (lowerMsg.includes('agent') || lowerMsg.includes('langchain')) {
    return `## Building Production AI Agents\n\nThe key is the ReAct loop: **Reason → Act → Observe → Repeat**\n\n\`\`\`python\nfrom langchain.agents import create_react_agent\nfrom langchain_anthropic import ChatAnthropic\n\nllm = ChatAnthropic(model="claude-3-5-haiku-20241022")\ntools = [search_tool, code_runner, file_reader]\n\nagent = create_react_agent(llm, tools, prompt)\nresult = agent.invoke({"input": "Review this codebase for security issues"})\n\`\`\`\n\n**The winning pattern:** Keep tools small, single-purpose, and well-documented. Your agent is only as good as its tools.\n\n**Your challenge today:** Build a 2-tool agent that can search the web AND write to a file. Ship it in under 2 hours.`;
  }

  const modeResponses: Record<string, string> = {
    EXPLAIN: `Great question! Here's how I'd break this down:\n\n**Core Concept:** Start with the why — every AI tool exists to solve a specific problem faster than a human could.\n\n**Practical Approach:**\n1. Identify the input (what you give the AI)\n2. Define the output (what you want back)\n3. Engineer the prompt to bridge them\n\n**Quick Win:** Try this in Cursor right now — open any file and ask it to "explain this function and suggest 3 improvements." That's the foundation of AI-assisted development.\n\n**Your next step:** Build one project using this tool this week. Start with the 2-hour beginner project in the Project Lab.`,
    DEBUG: `Let me analyze this systematically:\n\n**Step 1 — Check the obvious:**\n- Console errors (F12 → Console)\n- Network tab for failed API calls\n- TypeScript type errors in your editor\n\n**Step 2 — Isolate the problem:**\n\`\`\`typescript\n// Add logging at each step\nconsole.log('Before Supabase call:', { userId, data });\nconst result = await supabase.from('table').select();\nconsole.log('Supabase result:', result);\n\`\`\`\n\n**Most common culprits:** RLS policy blocking the query, missing \`await\`, or mismatched column names.\n\nShare the exact error message and I'll pinpoint it precisely.`,
    HINT: `Think about it this way — what would you need to know to solve this from scratch?\n\n🔍 **Clue:** Look at how the data flows from the Supabase response to your component. Is there a transformation step you're missing?\n\nTry \`console.log()\` at each step and watch where the data changes shape unexpectedly.\n\nYou're close — try one more approach before asking for the full solution!`,
    ROADMAP: `## Your 30-Day AI Builder Roadmap\n\n**Week 1 — Foundation (Days 1-7)**\n- Day 1-2: Prompt engineering mastery\n- Day 3-4: Claude/GPT-4 API integration\n- Day 5-7: Build AI Resume Analyzer project\n\n**Week 2 — RAG & Data (Days 8-14)**\n- Day 8-10: Vector databases + embeddings\n- Day 11-14: Full RAG chatbot project\n\n**Week 3 — Agents & Automation (Days 15-21)**\n- Day 15-17: LangChain multi-tool agents\n- Day 18-21: n8n automation workflows\n\n**Week 4 — Ship It (Days 22-30)**\n- Day 22-25: Full-stack AI SaaS project\n- Day 26-28: Portfolio setup & GitHub\n- Day 29-30: Deploy + share to community\n\n**Your first action:** Start the AI Resume Analyzer project in the Project Lab TODAY.`,
  };

  return modeResponses[mode] || `I'm ARIA, your AI mentor on Victory.AI. I'm powered by Claude and GPT-4, but need API keys configured in your Supabase Edge Function environment variables.\n\n**To activate full AI:** Add \`ANTHROPIC_API_KEY\` or \`OPENAI_API_KEY\` to your Supabase project settings → Edge Functions → Secrets.\n\nFor now, here's a direct answer: Focus on building one real project today. The fastest way to learn AI development is to ship something, even if it's imperfect. Pick a project from the Project Lab and start right now.`;
}
