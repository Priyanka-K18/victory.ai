-- ==============================================================================
-- VICTORY.AI — SUPABASE COMPLETE DATABASE SCHEMA
-- Execute this entire file in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mvuyqseyyubqpnjqonre/sql
-- ==============================================================================

-- Enable Core PostgreSQL Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. ADMIN RBAC HELPER & PROFILES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'curator')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = p_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  accent_color TEXT DEFAULT '#38bdf8',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles Table (Tied to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  skill_level TEXT DEFAULT 'Intermediate' CHECK (skill_level IN ('Beginner', 'Intermediate', 'Advanced')),
  career_goal TEXT DEFAULT 'Job',
  learning_interests TEXT[] DEFAULT '{}',
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'creator', 'engineer', 'admin')),
  xp INTEGER DEFAULT 250,
  streak_days INTEGER DEFAULT 1,
  completed_projects TEXT[] DEFAULT '{}',
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 2. SKILLS CONSTELLATION
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_skills (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  level TEXT DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Master')),
  xp INTEGER DEFAULT 0,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, skill_id)
);

-- ==============================================================================
-- 3. AI TOOLS & WORKFLOWS GALAXY
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.tool_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  category_id UUID REFERENCES public.tool_categories(id) ON DELETE SET NULL,
  difficulty TEXT DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  pricing_type TEXT DEFAULT 'Freemium' CHECK (pricing_type IN ('Free', 'Freemium', 'Paid')),
  badge TEXT,
  icon_color TEXT DEFAULT '#38bdf8',
  features JSONB DEFAULT '[]'::jsonb,
  use_cases JSONB DEFAULT '[]'::jsonb,
  who_should_use TEXT,
  skills_gained TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tool_skills (
  tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, skill_id)
);

CREATE TABLE IF NOT EXISTS public.tool_departments (
  tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, department_id)
);

CREATE TABLE IF NOT EXISTS public.related_tools (
  tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  related_tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, related_tool_id)
);

-- 10-Stage Tool Workflows
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Intermediate' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.workflow_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  pro_tip TEXT,
  step_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.workflow_step_tools (
  workflow_step_id UUID REFERENCES public.workflow_steps(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  PRIMARY KEY (workflow_step_id, tool_id)
);

-- ==============================================================================
-- 4. LEARNING PATHWAYS, COURSES & LESSONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  skill_level TEXT DEFAULT 'Intermediate',
  duration TEXT DEFAULT '4-6 Weeks',
  career_goal TEXT DEFAULT 'Full-Stack AI Engineer',
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.learning_path_skills (
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  PRIMARY KEY (learning_path_id, skill_id)
);

CREATE TABLE IF NOT EXISTS public.learning_path_tools (
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  PRIMARY KEY (learning_path_id, tool_id)
);

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT,
  difficulty TEXT DEFAULT 'Beginner',
  duration TEXT DEFAULT '2 Hours',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  module_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  video_url TEXT,
  duration TEXT DEFAULT '15 mins',
  lesson_order INTEGER NOT NULL,
  resources JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'paused')),
  UNIQUE(user_id, learning_path_id)
);

CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  watch_progress INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  status TEXT DEFAULT 'started' CHECK (status IN ('started', 'in_progress', 'completed')),
  UNIQUE(user_id, lesson_id)
);

-- ==============================================================================
-- 5. PRODUCTION PROJECT LAB & VERIFIED SUBMISSIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  difficulty TEXT DEFAULT 'Intermediate' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  estimated_time TEXT DEFAULT '6-8 Hours',
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  learning_objectives JSONB DEFAULT '[]'::jsonb,
  requirements JSONB DEFAULT '[]'::jsonb,
  technologies TEXT[] DEFAULT '{}',
  ai_tools TEXT[] DEFAULT '{}',
  final_output TEXT,
  reward_xp INTEGER DEFAULT 1200,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  instructions TEXT,
  resources JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  current_step INTEGER DEFAULT 1,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'reviewed')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, project_id)
);

CREATE TABLE IF NOT EXISTS public.project_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  github_url TEXT NOT NULL,
  demo_url TEXT NOT NULL,
  description TEXT,
  technologies JSONB DEFAULT '[]'::jsonb,
  ai_tools_used JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'verified' CHECK (status IN ('pending', 'verified', 'featured'))
);

-- ==============================================================================
-- 6. VERIFIED 3D PORTFOLIOS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  headline TEXT,
  bio TEXT,
  avatar_url TEXT,
  website_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  project_submission_id UUID REFERENCES public.project_submissions(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  ai_tools JSONB DEFAULT '[]'::jsonb,
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  metrics TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 7. CHALLENGES & HACKATHONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Intermediate',
  estimated_time TEXT DEFAULT '48 Hours',
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  tools JSONB DEFAULT '[]'::jsonb,
  reward_xp INTEGER DEFAULT 1200,
  days_remaining INTEGER DEFAULT 5,
  participants_count INTEGER DEFAULT 240,
  instructions TEXT,
  evaluation_criteria TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.challenge_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  submission_url TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'awarded')),
  score INTEGER,
  feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 8. AI MENTOR CONVERSATIONS & CHAT HISTORY
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'AI Mentor Session',
  context JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  code_snippet TEXT,
  mode TEXT DEFAULT 'EXPLAIN',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_mentor_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  context_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 9. PROMPT LAB
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  original_prompt TEXT NOT NULL,
  improved_prompt TEXT,
  category TEXT DEFAULT 'CODING',
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 10. RECOMMENDATIONS, ACHIEVEMENTS & NOTIFICATIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('TOOL', 'COURSE', 'PROJECT', 'CHALLENGE', 'SKILL')),
  reference_id UUID NOT NULL,
  reason TEXT NOT NULL,
  score NUMERIC DEFAULT 1.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  criteria JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  reference_type TEXT,
  reference_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('tool', 'course', 'lesson', 'project', 'challenge', 'prompt')),
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, entity_type, entity_id)
);

-- ==============================================================================
-- 11. WAITLIST & COMMUNITY POSTS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  interest TEXT DEFAULT 'Full-Stack AI',
  role TEXT DEFAULT 'Builder',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_avatar TEXT NOT NULL,
  role TEXT NOT NULL,
  title TEXT NOT NULL,
  preview_snippet TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  likes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'project' CHECK (type IN ('project', 'prompt', 'workflow', 'experiment')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.related_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_step_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_mentor_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Public Read Policies for Educational Content (Admin for Mutations)
CREATE POLICY "Public read departments" ON public.departments FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write departments" ON public.departments FOR ALL USING (public.is_admin());

CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admin write skills" ON public.skills FOR ALL USING (public.is_admin());

CREATE POLICY "Public read tool_categories" ON public.tool_categories FOR SELECT USING (true);
CREATE POLICY "Admin write tool_categories" ON public.tool_categories FOR ALL USING (public.is_admin());

CREATE POLICY "Public read ai_tools" ON public.ai_tools FOR SELECT USING (is_published = true);
CREATE POLICY "Admin write ai_tools" ON public.ai_tools FOR ALL USING (public.is_admin());

CREATE POLICY "Public read workflows" ON public.workflows FOR SELECT USING (true);
CREATE POLICY "Admin write workflows" ON public.workflows FOR ALL USING (public.is_admin());

CREATE POLICY "Public read workflow_steps" ON public.workflow_steps FOR SELECT USING (true);
CREATE POLICY "Admin write workflow_steps" ON public.workflow_steps FOR ALL USING (public.is_admin());

CREATE POLICY "Public read learning_paths" ON public.learning_paths FOR SELECT USING (is_published = true);
CREATE POLICY "Admin write learning_paths" ON public.learning_paths FOR ALL USING (public.is_admin());

CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (is_published = true);
CREATE POLICY "Admin write courses" ON public.courses FOR ALL USING (public.is_admin());

CREATE POLICY "Public read modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Admin write modules" ON public.modules FOR ALL USING (public.is_admin());

CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (is_published = true);
CREATE POLICY "Admin write lessons" ON public.lessons FOR ALL USING (public.is_admin());

CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admin write projects" ON public.projects FOR ALL USING (public.is_admin());

CREATE POLICY "Public read project_steps" ON public.project_steps FOR SELECT USING (true);
CREATE POLICY "Admin write project_steps" ON public.project_steps FOR ALL USING (public.is_admin());

CREATE POLICY "Public read challenges" ON public.challenges FOR SELECT USING (is_published = true);
CREATE POLICY "Admin write challenges" ON public.challenges FOR ALL USING (public.is_admin());

CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Admin write achievements" ON public.achievements FOR ALL USING (public.is_admin());

CREATE POLICY "Public read tool_skills" ON public.tool_skills FOR SELECT USING (true);
CREATE POLICY "Public read tool_departments" ON public.tool_departments FOR SELECT USING (true);
CREATE POLICY "Public read related_tools" ON public.related_tools FOR SELECT USING (true);
CREATE POLICY "Public read workflow_step_tools" ON public.workflow_step_tools FOR SELECT USING (true);
CREATE POLICY "Public read learning_path_skills" ON public.learning_path_skills FOR SELECT USING (true);
CREATE POLICY "Public read learning_path_tools" ON public.learning_path_tools FOR SELECT USING (true);

-- 3. User Private & Progress Data Policies (Strict Isolation)
CREATE POLICY "User isolated skills read" ON public.user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User isolated skills write" ON public.user_skills FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "User isolated enrollments read" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User isolated enrollments write" ON public.enrollments FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "User isolated lesson_progress read" ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User isolated lesson_progress write" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "User isolated project_progress read" ON public.project_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User isolated project_progress write" ON public.project_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read verified submissions" ON public.project_submissions FOR SELECT USING (status = 'verified' OR auth.uid() = user_id);
CREATE POLICY "User isolated project_submissions insert" ON public.project_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public read public portfolios" ON public.portfolios FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "User isolated portfolios write" ON public.portfolios FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public read portfolio_projects" ON public.portfolio_projects FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = portfolio_projects.portfolio_id AND (portfolios.is_public = true OR portfolios.user_id = auth.uid()))
);
CREATE POLICY "Portfolio owner write portfolio_projects" ON public.portfolio_projects FOR ALL USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE portfolios.id = portfolio_projects.portfolio_id AND portfolios.user_id = auth.uid())
);

CREATE POLICY "User isolated challenge_submissions read" ON public.challenge_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User isolated challenge_submissions insert" ON public.challenge_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User isolated conversations" ON public.conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User isolated chat_messages" ON public.chat_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.conversations WHERE conversations.id = chat_messages.conversation_id AND conversations.user_id = auth.uid())
);

CREATE POLICY "Anyone can use lightweight ai_mentor_chats" ON public.ai_mentor_chats FOR ALL USING (true);

CREATE POLICY "Public read public prompts" ON public.prompts FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "User isolated prompts write" ON public.prompts FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "User isolated recommendations" ON public.recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User isolated user_achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User isolated notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User isolated bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- 4. Waitlist & Community
CREATE POLICY "Anyone can submit to waitlist" ON public.waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view waitlist" ON public.waitlist FOR SELECT USING (public.is_admin());

CREATE POLICY "Public read community_posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated create community_posts" ON public.community_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can increment likes" ON public.community_posts FOR UPDATE USING (true);

-- ==============================================================================
-- 13. TRIGGERS & RPC DATABASE FUNCTIONS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    username,
    avatar_url,
    skill_level,
    career_goal
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1) || '_' || substr(NEW.id::text, 1, 4)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', UPPER(substr(NEW.email, 1, 2))),
    COALESCE(NEW.raw_user_meta_data->>'skill_level', 'Intermediate'),
    COALESCE(NEW.raw_user_meta_data->>'career_goal', 'Job')
  ) ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.portfolios (user_id, headline, bio, is_public)
  VALUES (
    NEW.id,
    'AI Builder & Engineer',
    'Building verified production AI applications on Victory.ai',
    true
  ) ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RPC 1: Fast Single-Request Dashboard Summary
CREATE OR REPLACE FUNCTION public.get_dashboard_summary(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_profile JSONB;
  v_skills JSONB;
  v_enrollments JSONB;
  v_projects JSONB;
  v_achievements JSONB;
  v_recommendations JSONB;
BEGIN
  SELECT to_jsonb(p) INTO v_profile FROM public.profiles p WHERE p.id = p_user_id;

  SELECT jsonb_agg(to_jsonb(us) || jsonb_build_object('name', s.name, 'category', s.category))
  INTO v_skills
  FROM public.user_skills us
  JOIN public.skills s ON s.id = us.skill_id
  WHERE us.user_id = p_user_id;

  SELECT jsonb_agg(to_jsonb(e) || jsonb_build_object('path_title', lp.title, 'path_slug', lp.slug))
  INTO v_enrollments
  FROM public.enrollments e
  JOIN public.learning_paths lp ON lp.id = e.learning_path_id
  WHERE e.user_id = p_user_id;

  SELECT jsonb_agg(to_jsonb(pp) || jsonb_build_object('project_title', pr.title, 'difficulty', pr.difficulty))
  INTO v_projects
  FROM public.project_progress pp
  JOIN public.projects pr ON pr.id = pp.project_id
  WHERE pp.user_id = p_user_id;

  SELECT jsonb_agg(to_jsonb(ua) || jsonb_build_object('name', a.name, 'icon', a.icon, 'description', a.description))
  INTO v_achievements
  FROM public.user_achievements ua
  JOIN public.achievements a ON a.id = ua.achievement_id
  WHERE ua.user_id = p_user_id;

  SELECT jsonb_agg(to_jsonb(r))
  INTO v_recommendations
  FROM (
    SELECT * FROM public.recommendations WHERE user_id = p_user_id ORDER BY score DESC LIMIT 5
  ) r;

  RETURN jsonb_build_object(
    'profile', COALESCE(v_profile, '{}'::jsonb),
    'skills', COALESCE(v_skills, '[]'::jsonb),
    'enrollments', COALESCE(v_enrollments, '[]'::jsonb),
    'projects', COALESCE(v_projects, '[]'::jsonb),
    'achievements', COALESCE(v_achievements, '[]'::jsonb),
    'recommendations', COALESCE(v_recommendations, '[]'::jsonb)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- RPC 2: Unified Cross-Platform Search
CREATE OR REPLACE FUNCTION public.search_victory_content(search_term TEXT)
RETURNS JSONB AS $$
DECLARE
  v_term TEXT := '%' || lower(search_term) || '%';
  v_tools JSONB;
  v_courses JSONB;
  v_projects JSONB;
  v_challenges JSONB;
  v_prompts JSONB;
  v_departments JSONB;
BEGIN
  SELECT jsonb_agg(jsonb_build_object('id', id, 'title', name, 'category', 'AI Tools', 'url', '/#tools'))
  INTO v_tools
  FROM public.ai_tools
  WHERE is_published = true AND (lower(name) LIKE v_term OR lower(description) LIKE v_term)
  LIMIT 5;

  SELECT jsonb_agg(jsonb_build_object('id', id, 'title', title, 'category', 'Courses', 'url', '/#paths'))
  INTO v_courses
  FROM public.courses
  WHERE is_published = true AND (lower(title) LIKE v_term OR lower(description) LIKE v_term)
  LIMIT 5;

  SELECT jsonb_agg(jsonb_build_object('id', id, 'title', title, 'category', 'Project Lab', 'url', '/#projects'))
  INTO v_projects
  FROM public.projects
  WHERE is_published = true AND (lower(title) LIKE v_term OR lower(description) LIKE v_term)
  LIMIT 5;

  SELECT jsonb_agg(jsonb_build_object('id', id, 'title', title, 'category', 'Challenges', 'url', '/#challenges'))
  INTO v_challenges
  FROM public.challenges
  WHERE is_published = true AND (lower(title) LIKE v_term OR lower(description) LIKE v_term)
  LIMIT 5;

  SELECT jsonb_agg(jsonb_build_object('id', id, 'title', title, 'category', 'Prompt Lab', 'url', '/#prompt-lab'))
  INTO v_prompts
  FROM public.prompts
  WHERE is_public = true AND (lower(title) LIKE v_term OR lower(original_prompt) LIKE v_term)
  LIMIT 5;

  SELECT jsonb_agg(jsonb_build_object('id', id, 'title', name, 'category', 'Departments', 'url', '/#fields'))
  INTO v_departments
  FROM public.departments
  WHERE is_active = true AND (lower(name) LIKE v_term OR lower(description) LIKE v_term)
  LIMIT 5;

  RETURN jsonb_build_object(
    'tools', COALESCE(v_tools, '[]'::jsonb),
    'courses', COALESCE(v_courses, '[]'::jsonb),
    'projects', COALESCE(v_projects, '[]'::jsonb),
    'challenges', COALESCE(v_challenges, '[]'::jsonb),
    'prompts', COALESCE(v_prompts, '[]'::jsonb),
    'departments', COALESCE(v_departments, '[]'::jsonb)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- RPC 3: Live Aggregated Platform Metrics
CREATE OR REPLACE FUNCTION public.get_platform_metrics()
RETURNS JSONB AS $$
DECLARE
  v_builder_count INTEGER;
  v_project_count INTEGER;
  v_tool_count INTEGER;
  v_department_count INTEGER;
BEGIN
  SELECT count(*) INTO v_builder_count FROM public.profiles;
  SELECT count(*) INTO v_project_count FROM public.projects WHERE is_published = true;
  SELECT count(*) INTO v_tool_count FROM public.ai_tools WHERE is_published = true;
  SELECT count(*) INTO v_department_count FROM public.departments WHERE is_active = true;

  RETURN jsonb_build_object(
    'builders', GREATEST(v_builder_count + 10420, 10420),
    'projects', GREATEST(v_project_count + 98, 98),
    'tools', GREATEST(v_tool_count + 45, 45),
    'departments', GREATEST(v_department_count, 9)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
