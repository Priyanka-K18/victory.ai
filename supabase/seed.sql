-- ==============================================================================
-- VICTORY.AI — COMPLETE SEED DATA
-- Run this AFTER schema.sql in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/mvuyqseyyubqpnjqonre/sql
-- ==============================================================================

-- ─── 1. DEPARTMENTS ──────────────────────────────────────────────────────────
INSERT INTO public.departments (id, name, slug, description, icon, accent_color, is_active) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'Coding & Development', 'coding', 'Build AI-native apps, autonomous agents, and full-stack systems', 'Code2', '#38bdf8', true),
  ('d1000000-0000-0000-0000-000000000002', 'Design & Creative', 'design', 'Generative UI, 3D assets, brand identity and spatial interfaces', 'Palette', '#c084fc', true),
  ('d1000000-0000-0000-0000-000000000003', 'Video & Media', 'video', 'Cinematic GenAI, talking avatars and automated content studios', 'Video', '#f43f5e', true),
  ('d1000000-0000-0000-0000-000000000004', 'Marketing & Growth', 'marketing', 'Predictive campaigns, viral copywriting and persona modeling', 'Megaphone', '#fb923c', true),
  ('d1000000-0000-0000-0000-000000000005', 'Business & Strategy', 'business', 'Financial models, AI executive briefs and competitive intelligence', 'Briefcase', '#34d399', true),
  ('d1000000-0000-0000-0000-000000000006', 'Data & Analytics', 'data', 'RAG architectures, vector embeddings and AI-powered analytics', 'Database', '#818cf8', true),
  ('d1000000-0000-0000-0000-000000000007', 'Education & Research', 'education', 'Adaptive AI tutors, interactive curriculum engines and learning systems', 'GraduationCap', '#e879f9', true),
  ('d1000000-0000-0000-0000-000000000008', 'Automation & Workflows', 'automation', 'No-code multi-agent orchestration and business process automation', 'Zap', '#fbbf24', true),
  ('d1000000-0000-0000-0000-000000000009', 'Healthcare & Science', 'healthcare', 'AI diagnostics, drug discovery and clinical research acceleration', 'Heart', '#f87171', true)
ON CONFLICT (slug) DO NOTHING;

-- ─── 2. TOOL CATEGORIES ──────────────────────────────────────────────────────
INSERT INTO public.tool_categories (id, name, slug, description, icon) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'AI Chat', 'ai-chat', 'Conversational AI models', 'Bot'),
  ('c1000000-0000-0000-0000-000000000002', 'Coding', 'coding', 'Code generation and review tools', 'Code2'),
  ('c1000000-0000-0000-0000-000000000003', 'Video', 'video', 'Text-to-video and video editing', 'Video'),
  ('c1000000-0000-0000-0000-000000000004', 'Image', 'image', 'Image generation and editing', 'ImageIcon'),
  ('c1000000-0000-0000-0000-000000000005', 'Design', 'design', 'UI/UX and brand design tools', 'Palette'),
  ('c1000000-0000-0000-0000-000000000006', 'Voice', 'voice', 'Voice cloning and speech synthesis', 'Mic'),
  ('c1000000-0000-0000-0000-000000000007', 'Research', 'research', 'AI-powered research and search', 'Search'),
  ('c1000000-0000-0000-0000-000000000008', 'Automation', 'automation', 'Workflow and process automation', 'Zap'),
  ('c1000000-0000-0000-0000-000000000009', 'Presentation', 'presentation', 'AI slide and deck creation', 'Layers'),
  ('c1000000-0000-0000-0000-000000000010', 'Marketing', 'marketing', 'AI copywriting and ad creative', 'Megaphone'),
  ('c1000000-0000-0000-0000-000000000011', 'Data', 'data', 'Data analysis and visualization', 'Database'),
  ('c1000000-0000-0000-0000-000000000012', 'Audio', 'audio', 'Music and audio generation', 'Music')
ON CONFLICT (slug) DO NOTHING;

-- ─── 3. AI TOOLS ─────────────────────────────────────────────────────────────
INSERT INTO public.ai_tools (id, name, slug, category_id, tagline, description, pricing, badge, icon_color, skill_level, is_published) VALUES
  ('t1000000-0000-0000-0000-000000000001', 'Claude 3.7 Sonnet', 'claude-3-sonnet', 'c1000000-0000-0000-0000-000000000001', 'Frontier reasoning & coding AI', 'Advanced reasoning, multi-modal vision, 200K context window for enterprise-grade code generation', 'Freemium', 'BEST FOR CODE', '#38bdf8', 'Advanced', true),
  ('t1000000-0000-0000-0000-000000000002', 'Cursor AI IDE', 'cursor-ai', 'c1000000-0000-0000-0000-000000000002', 'AI-native code editor', 'Predictive multi-line edits, codebase-wide context, natural language code generation inside your IDE', 'Freemium', 'TOP PICK', '#06b6d4', 'Intermediate', true),
  ('t1000000-0000-0000-0000-000000000003', 'Runway Gen-3 Alpha', 'runway-gen3', 'c1000000-0000-0000-0000-000000000003', 'Professional text-to-video AI', 'Cinematic 4K video generation from text or image prompts with advanced motion control', 'Paid', 'CINEMA GRADE', '#f43f5e', 'Intermediate', true),
  ('t1000000-0000-0000-0000-000000000004', 'Midjourney v6', 'midjourney-v6', 'c1000000-0000-0000-0000-000000000004', 'Photorealistic image generation', 'Hyper-realistic imagery, concept art, product renders and brand identity visuals from text prompts', 'Paid', 'INDUSTRY STD', '#c084fc', 'Beginner', true),
  ('t1000000-0000-0000-0000-000000000005', 'ElevenLabs', 'elevenlabs', 'c1000000-0000-0000-0000-000000000006', 'Ultra-realistic voice synthesis', 'Clone any voice in 60 seconds, generate natural speech in 29 languages with emotional control', 'Freemium', 'VOICE LEADER', '#a78bfa', 'Beginner', true),
  ('t1000000-0000-0000-0000-000000000006', 'Perplexity Pro', 'perplexity-pro', 'c1000000-0000-0000-0000-000000000007', 'AI research & search engine', 'Real-time internet search with citations, academic paper synthesis and competitive intelligence', 'Freemium', 'RESEARCH PRO', '#818cf8', 'Beginner', true),
  ('t1000000-0000-0000-0000-000000000007', 'n8n Automation', 'n8n', 'c1000000-0000-0000-0000-000000000008', 'Open-source workflow automation', 'Connect 400+ apps, build multi-agent pipelines and automate complex business processes visually', 'Free', 'OPEN SOURCE', '#f59e0b', 'Intermediate', true),
  ('t1000000-0000-0000-0000-000000000008', 'Gamma App', 'gamma-app', 'c1000000-0000-0000-0000-000000000009', 'AI presentation generator', 'Generate beautiful pitch decks, reports and microsites from text in under 60 seconds', 'Freemium', 'DECK BUILDER', '#34d399', 'Beginner', true),
  ('t1000000-0000-0000-0000-000000000009', 'v0 by Vercel', 'v0-vercel', 'c1000000-0000-0000-0000-000000000002', 'AI frontend code generator', 'Describe UI in plain English and get production-ready React + Tailwind components instantly', 'Freemium', 'UI GENERATOR', '#f0f0f0', 'Beginner', true),
  ('t1000000-0000-0000-0000-000000000010', 'Suno AI', 'suno-ai', 'c1000000-0000-0000-0000-000000000012', 'AI music generation', 'Create radio-quality original songs with vocals, instruments and lyrics from a text prompt', 'Freemium', 'MUSIC AI', '#f472b6', 'Beginner', true),
  ('t1000000-0000-0000-0000-000000000011', 'LangChain', 'langchain', 'c1000000-0000-0000-0000-000000000002', 'LLM application framework', 'Build RAG pipelines, autonomous agents, memory systems and multi-tool orchestration for production', 'Free', 'DEV ESSENTIAL', '#38bdf8', 'Advanced', true),
  ('t1000000-0000-0000-0000-000000000012', 'Figma AI', 'figma-ai', 'c1000000-0000-0000-0000-000000000005', 'AI-powered design platform', 'AI layout suggestions, auto-rename layers, text generation and Figma-to-code pipelines', 'Freemium', 'DESIGN STD', '#c084fc', 'Intermediate', true)
ON CONFLICT (slug) DO NOTHING;

-- ─── 4. PROJECTS ─────────────────────────────────────────────────────────────
INSERT INTO public.projects (id, title, slug, description, difficulty, time_estimate, category, technologies, ai_tools, skills_acquired, final_deliverable, is_published, department_id) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'Autonomous AI Code Agent', 'autonomous-code-agents', 'Build a production multi-agent system that autonomously reviews code, writes tests, and deploys fixes using Claude 3.7 and LangGraph', 'Advanced', '6-8 hours', 'AI AUTOMATION', ARRAY['TypeScript', 'Node.js', 'LangChain', 'GitHub API'], ARRAY['Claude 3.7 Sonnet', 'Cursor', 'LangChain'], ARRAY['Multi-agent orchestration', 'RAG pipelines', 'GitHub API integration', 'Prompt engineering'], 'Live deployed AI agent that monitors repos and auto-fixes bugs', true, 'd1000000-0000-0000-0000-000000000001'),
  ('p1000000-0000-0000-0000-000000000002', 'AI Video Pipeline', 'ai-video-pipeline', 'Orchestrate a full GenAI content studio: text → script → voiceover → video → auto-edited final cut', 'Intermediate', '4-5 hours', 'AI VIDEO', ARRAY['Python', 'FFmpeg', 'AWS S3'], ARRAY['Runway Gen-3', 'ElevenLabs', 'Claude 3.7'], ARRAY['Video generation', 'Voice synthesis', 'Content automation', 'Pipeline architecture'], 'Automated pipeline that converts blog posts into 4K videos', true, 'd1000000-0000-0000-0000-000000000003'),
  ('p1000000-0000-0000-0000-000000000003', 'AI SaaS Dashboard', 'ai-saas-dashboard', 'Design and launch a full-stack AI analytics dashboard with real-time insights, predictive charts, and NLP query interface', 'Intermediate', '5-7 hours', 'AI DASHBOARD', ARRAY['React', 'Supabase', 'TailwindCSS', 'Recharts'], ARRAY['Claude 3.7', 'v0 by Vercel', 'Cursor'], ARRAY['Full-stack development', 'Data visualization', 'NLP interfaces', 'Supabase integration'], 'Live SaaS product with user auth, analytics, and AI chat', true, 'd1000000-0000-0000-0000-000000000001'),
  ('p1000000-0000-0000-0000-000000000004', 'AI Resume Analyzer', 'ai-resume-analyzer', 'Build a GPT-4 powered tool that scores resumes, suggests improvements, and matches candidates to job descriptions', 'Beginner', '3-4 hours', 'AI RESUME ANALYZER', ARRAY['Next.js', 'OpenAI API', 'PDF.js'], ARRAY['GPT-4o', 'Claude 3.7', 'v0'], ARRAY['PDF parsing', 'Prompt engineering', 'ATS optimization', 'Next.js deployment'], 'Production resume scoring tool with a beautiful UI', true, 'd1000000-0000-0000-0000-000000000001'),
  ('p1000000-0000-0000-0000-000000000005', 'AI Marketing System', 'ai-marketing-system', 'Deploy a multi-agent marketing engine that generates copy, images, social posts and campaign analytics in one workflow', 'Advanced', '6-8 hours', 'AI MARKETING SYSTEM', ARRAY['Python', 'LangChain', 'Zapier', 'Notion API'], ARRAY['Claude 3.7', 'Midjourney', 'Jasper', 'AdCreative.ai'], ARRAY['Marketing automation', 'Agent orchestration', 'Creative AI', 'Analytics dashboards'], 'Full AI-powered marketing department in one workflow', true, 'd1000000-0000-0000-0000-000000000004'),
  ('p1000000-0000-0000-0000-000000000006', 'AI Chatbot Platform', 'ai-chatbot-platform', 'Build a white-label RAG chatbot with knowledge base ingestion, memory, and a polished enterprise-grade chat UI', 'Intermediate', '4-6 hours', 'AI CHATBOT', ARRAY['React', 'Supabase', 'Pinecone', 'LangChain'], ARRAY['Claude 3.7', 'OpenAI', 'Pinecone'], ARRAY['RAG architecture', 'Vector databases', 'Chat UX design', 'Context management'], 'Deployable chatbot SaaS with custom knowledge base', true, 'd1000000-0000-0000-0000-000000000001'),
  ('p1000000-0000-0000-0000-000000000007', 'AI Content Machine', 'ai-content-machine', 'Create an automated content engine that researches, writes, edits, images, and publishes a full article end-to-end', 'Beginner', '2-3 hours', 'AI CONTENT SYSTEM', ARRAY['Python', 'WordPress API', 'Unsplash API'], ARRAY['Claude 3.7', 'Perplexity', 'Midjourney'], ARRAY['Content automation', 'API integration', 'SEO optimization', 'Workflow design'], '1-click system that publishes 5 SEO articles in 10 minutes', true, 'd1000000-0000-0000-0000-000000000004'),
  ('p1000000-0000-0000-0000-000000000008', 'AI Education Platform', 'ai-education-platform', 'Build a Socratic AI tutor that diagnoses learner weaknesses, generates adaptive quizzes, and creates personalized learning paths', 'Advanced', '7-9 hours', 'AI EDUCATION TOOL', ARRAY['React', 'Supabase', 'OpenAI', 'LangGraph'], ARRAY['GPT-4o', 'Claude 3.7', 'Cursor', 'LangChain'], ARRAY['EdTech architecture', 'Adaptive learning', 'LangGraph workflows', 'Pedagogical AI design'], 'Live AI tutoring platform with 100+ adaptive quiz questions', true, 'd1000000-0000-0000-0000-000000000007')
ON CONFLICT (slug) DO NOTHING;

-- ─── 5. LEARNING PATHS ───────────────────────────────────────────────────────
INSERT INTO public.learning_paths (id, title, slug, description, total_duration, difficulty, skills, is_published, department_id) VALUES
  ('lp000000-0000-0000-0000-000000000001', 'AI Developer Mastery', 'ai-developer', 'From Python basics to deploying autonomous agents and full-stack AI applications in production', '12 weeks', 'Intermediate', ARRAY['Python', 'LangChain', 'RAG', 'Supabase', 'Cursor AI', 'Claude'], true, 'd1000000-0000-0000-0000-000000000001'),
  ('lp000000-0000-0000-0000-000000000002', 'AI Creative Director', 'ai-creative', 'Master generative image, video, audio and design tools to build a fully-automated creative studio', '8 weeks', 'Beginner', ARRAY['Midjourney', 'Runway', 'ElevenLabs', 'Figma AI', 'Suno'], true, 'd1000000-0000-0000-0000-000000000002'),
  ('lp000000-0000-0000-0000-000000000003', 'AI Business Strategist', 'ai-business', 'Deploy AI to automate research, financial modeling, competitive intelligence and executive reporting', '6 weeks', 'Beginner', ARRAY['Claude', 'Perplexity', 'Julius AI', 'Gamma', 'Notion AI'], true, 'd1000000-0000-0000-0000-000000000005'),
  ('lp000000-0000-0000-0000-000000000004', 'AI Automation Engineer', 'ai-automation', 'Build no-code and pro-code multi-agent workflows that replace entire business departments', '10 weeks', 'Advanced', ARRAY['n8n', 'Make', 'LangGraph', 'Zapier', 'Python', 'APIs'], true, 'd1000000-0000-0000-0000-000000000008'),
  ('lp000000-0000-0000-0000-000000000005', 'AI Marketing Machine', 'ai-marketing', 'Run AI-powered campaigns, viral copy generation, ad creative, and full-funnel analytics automation', '7 weeks', 'Intermediate', ARRAY['Claude', 'Jasper', 'AdCreative.ai', 'Midjourney', 'Perplexity'], true, 'd1000000-0000-0000-0000-000000000004')
ON CONFLICT (slug) DO NOTHING;

-- ─── 6. CHALLENGES ───────────────────────────────────────────────────────────
INSERT INTO public.challenges (id, title, slug, description, category, difficulty, reward_xp, days_remaining, participants_count, deliverables, is_published) VALUES
  ('ch000000-0000-0000-0000-000000000001', 'Build an AI SaaS in 48 Hours', 'ai-saas-48h', 'Ship a fully functional AI-powered SaaS product with Supabase backend, real authentication, and a live demo URL', 'CODING', 'Advanced', 5000, 3, 2847, ARRAY['GitHub repo with README', 'Live deployed Vercel URL', '60-second product demo video', 'Supabase database schema'], true),
  ('ch000000-0000-0000-0000-000000000002', 'AI Video Creator Challenge', 'ai-video-48h', 'Produce a stunning 60-second AI-generated short film using at least 3 GenAI tools in a cohesive pipeline', 'CREATIVE', 'Intermediate', 2500, 6, 1204, ARRAY['60-second video file', 'Behind-the-scenes workflow breakdown', 'Tool stack and prompts used'], true),
  ('ch000000-0000-0000-0000-000000000003', 'Prompt Engineering Olympiad', 'prompt-olympiad', 'Craft the most effective system prompt for a customer service AI agent — judged on accuracy, tone, and edge case handling', 'AI PROMPTS', 'Beginner', 1500, 12, 3921, ARRAY['Final system prompt document', 'Test case results (10 scenarios)', 'Reasoning writeup'], true),
  ('ch000000-0000-0000-0000-000000000004', 'Automation Blueprint Battle', 'automation-battle', 'Build and document a multi-step n8n or Make workflow that automates a real business process end-to-end', 'AUTOMATION', 'Intermediate', 3000, 8, 876, ARRAY['Exported workflow JSON/blueprint', 'Live demo video', 'Business impact analysis'], true),
  ('ch000000-0000-0000-0000-000000000005', 'AI Research Sprint', 'ai-research-sprint', 'Use AI tools to produce a 10-page comprehensive research brief on any technical topic with citations and visual summaries', 'RESEARCH', 'Beginner', 1000, 14, 567, ARRAY['10-page PDF research report', 'Source citations list', 'AI tools and prompts used'], true)
ON CONFLICT (slug) DO NOTHING;

-- ─── 7. COMMUNITY POSTS ──────────────────────────────────────────────────────
INSERT INTO public.community_posts (id, author_name, author_avatar, role, title, preview_snippet, tags, likes, comments_count, type) VALUES
  ('cp000000-0000-0000-0000-000000000001', 'Sarah Chen', 'SC', 'Full-Stack AI Engineer · Google', 'Built a full RAG chatbot in 4 hours with Supabase + LangChain', 'Detailed walkthrough of my production RAG architecture using Supabase pgvector, LangChain document loaders, and Claude 3.7 for response synthesis. Includes full GitHub repo and deployment guide.', ARRAY['RAG', 'Supabase', 'LangChain', 'Claude'], 847, 124, 'project'),
  ('cp000000-0000-0000-0000-000000000002', 'Marcus Williams', 'MW', 'AI Creative Director · Freelance', 'My Runway + ElevenLabs pipeline: 4K sci-fi short in 6 hours', 'Step-by-step breakdown of my automated video production workflow: Perplexity for research, Claude for scripting, Runway Gen-3 for visuals, ElevenLabs for voiceover, and CapCut for final edit.', ARRAY['Runway', 'ElevenLabs', 'Video', 'Pipeline'], 1203, 89, 'workflow'),
  ('cp000000-0000-0000-0000-000000000003', 'Priya Sharma', 'PS', 'Data Scientist · Microsoft', 'The ultimate system prompt template for code review agents', 'After 200+ hours of testing, I distilled the perfect system prompt structure for autonomous code review agents. Includes role, context injection, output format, and chain-of-thought reasoning templates.', ARRAY['Prompting', 'Agents', 'Claude', 'Code Review'], 2341, 312, 'prompt'),
  ('cp000000-0000-0000-0000-000000000004', 'Jordan Kim', 'JK', 'AI Automation Specialist', 'n8n workflow that replaces my entire content team', 'Full n8n automation blueprint: Perplexity research → Claude writing → Midjourney images → WordPress publishing → Slack notification. Runs 24/7 unattended. Exporting my full workflow JSON below.', ARRAY['n8n', 'Automation', 'Content', 'Workflow'], 1876, 203, 'workflow'),
  ('cp000000-0000-0000-0000-000000000005', 'Alex Rivera', 'AR', 'ML Engineer · Startup', 'Autonomous agent beat my senior dev at code optimization', 'I ran a blind experiment: gave the same refactoring task to Claude 3.7 with Cursor and my senior engineer. Sharing the prompt chain, results breakdown, and what I learned about AI pair programming.', ARRAY['Cursor', 'Claude', 'Agents', 'Experiment'], 3102, 445, 'experiment'),
  ('cp000000-0000-0000-0000-000000000006', 'Zoe Laurent', 'ZL', 'AI Product Manager · Meta', 'How I shipped a SaaS product in 48 hours with AI', 'Solo founder story: used v0 for frontend, Cursor for backend, Supabase for database, and Claude for everything else. $0 to live product in 2 days. Full breakdown of tools, prompts, and architecture decisions.', ARRAY['v0', 'Cursor', 'Supabase', 'SaaS'], 4521, 567, 'project')
ON CONFLICT DO NOTHING;

-- ─── 8. SKILLS ───────────────────────────────────────────────────────────────
INSERT INTO public.skills (id, name, slug, category, description) VALUES
  ('sk000000-0000-0000-0000-000000000001', 'Prompt Engineering', 'prompt-engineering', 'AI Fundamentals', 'Craft effective prompts for any LLM model'),
  ('sk000000-0000-0000-0000-000000000002', 'RAG Architecture', 'rag-architecture', 'AI Engineering', 'Build retrieval-augmented generation pipelines'),
  ('sk000000-0000-0000-0000-000000000003', 'Python for AI', 'python-ai', 'Programming', 'Python programming for AI and ML applications'),
  ('sk000000-0000-0000-0000-000000000004', 'LangChain & Agents', 'langchain-agents', 'AI Engineering', 'Multi-agent orchestration with LangChain/LangGraph'),
  ('sk000000-0000-0000-0000-000000000005', 'Video Generation', 'video-generation', 'Creative AI', 'Text-to-video production with Runway and Luma'),
  ('sk000000-0000-0000-0000-000000000006', 'Voice Synthesis', 'voice-synthesis', 'Creative AI', 'Professional voice cloning with ElevenLabs'),
  ('sk000000-0000-0000-0000-000000000007', 'UI with AI', 'ui-with-ai', 'Design', 'Generate interfaces with v0, Figma AI, and Uizard'),
  ('sk000000-0000-0000-0000-000000000008', 'Workflow Automation', 'workflow-automation', 'Automation', 'Build no-code automations with n8n, Make, Zapier'),
  ('sk000000-0000-0000-0000-000000000009', 'Vector Databases', 'vector-databases', 'Data Engineering', 'Pinecone, pgvector, Qdrant for semantic search'),
  ('sk000000-0000-0000-0000-000000000010', 'AI Image Prompting', 'ai-image-prompting', 'Creative AI', 'Midjourney and Stable Diffusion prompting mastery')
ON CONFLICT (slug) DO NOTHING;

-- ─── 9. WAITLIST (sample entries) ────────────────────────────────────────────
INSERT INTO public.waitlist (email, interest, role) VALUES
  ('demo1@victory.ai', 'Coding', 'Full-Stack Developer'),
  ('demo2@victory.ai', 'Design', 'UI/UX Designer'),
  ('demo3@victory.ai', 'Video', 'Content Creator')
ON CONFLICT (email) DO NOTHING;

-- ─── 10. PROMPTS (starter library) ───────────────────────────────────────────
INSERT INTO public.prompts (id, user_id, title, original_prompt, improved_prompt, category, tags, is_public) VALUES
  ('pr000000-0000-0000-0000-000000000001', NULL, 'Perfect Code Review Agent', 'Review this code', 'You are an expert senior software engineer with 15 years of experience. Review the following code for: (1) bugs and logic errors, (2) security vulnerabilities, (3) performance bottlenecks, (4) code style and maintainability issues. For each issue found, provide: the exact line, severity (Critical/High/Medium/Low), explanation, and a corrected code snippet. Format your output as a structured report.', 'Coding', ARRAY['code-review', 'agents', 'engineering'], true),
  ('pr000000-0000-0000-0000-000000000002', NULL, 'RAG System Prompt Template', 'Answer questions using the provided context', 'You are a precise knowledge base assistant. You must ONLY answer based on the provided context documents. Rules: (1) If the answer is not in the context, say "I don''t have information about this in the knowledge base" — never hallucinate. (2) Always cite which document section your answer comes from. (3) If multiple documents conflict, acknowledge the discrepancy. Context: {context} Question: {question}', 'AI Engineering', ARRAY['RAG', 'knowledge-base', 'grounding'], true),
  ('pr000000-0000-0000-0000-000000000003', NULL, 'Viral Marketing Copy Generator', 'Write marketing copy for my product', 'You are a world-class direct response copywriter who has generated $500M+ in online sales. Write 5 variations of marketing copy for: Product: {product_name}. Target audience: {audience}. Core benefit: {benefit}. Each variation should use a different psychological trigger: (1) Fear of missing out, (2) Social proof, (3) Aspirational identity, (4) Problem-agitate-solve, (5) Contrarian hook. Include a power headline, 3 bullet benefits, and a clear CTA for each.', 'Marketing', ARRAY['copywriting', 'viral', 'sales'], true)
ON CONFLICT DO NOTHING;

-- Done!
SELECT 'Victory.AI seed data inserted successfully!' AS status;
