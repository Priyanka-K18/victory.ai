# VICTORY.AI — SUPABASE BACKEND ARCHITECTURE MAP

This document maps all Victory.ai frontend pages, sections, and user journeys to their corresponding Supabase PostgreSQL tables, queries, Row Level Security (RLS) policies, and Supabase Edge Functions.

---

## 1. System Architecture Overview

```
                      React 19 + Vite Frontend (Victory.ai)
                                      │
            ┌─────────────────────────┴────────────────────────┐
            ▼                                                  ▼
     Supabase Client SDK                              Edge Functions (Deno)
  (Auth, DB, Realtime, Storage)                      (AI Mentor, Prompt Lab)
            │                                                  │
            ▼                                                  ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      Supabase PostgreSQL Core                          │
 │  ┌──────────────────────────────────────────────────────────────────┐  │
 │  │ Row Level Security (RLS) & Role Checks (auth.uid(), is_admin())   │  │
 │  └──────────────────────────────────────────────────────────────────┘  │
 │                                                                        │
 │  • Profiles & Auth     • AI Tools & Galaxy    • Projects & Submissions │
 │  • Departments         • Workflows            • Portfolios & Proof     │
 │  • Skills Constellation• Learning Paths       • Challenges & Hackathons│
 │  • Progress & Mastery  • Courses & Lessons    • AI Mentor Conversations│
 │  • Recommendations     • Bookmarks & Prompts  • Storage Buckets        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend to Supabase Table & Function Mapping

| Frontend Page / Section | Feature / Action | Supabase Table(s) | Primary Query / Operation | RLS Policy Enforced | Edge Function / RPC |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Global / Navigation (`Navbar`)** | User Authentication (Sign In, Sign Up, Sign Out) | `auth.users`, `profiles` | `supabase.auth.signInWithPassword()`, `supabase.auth.signUp()`, `supabase.auth.signOut()` | User can view/edit own profile (`auth.uid() = id`) | Auto-creates profile on signup via trigger |
| **Global / Navigation (`Navbar`)** | Real-time XP, Level & Streak Badge | `profiles` | `SELECT xp, skill_level, streak_days FROM profiles WHERE id = auth.uid()` | Self SELECT only | `calculate_user_streak(auth.uid())` |
| **Global / Command Palette (`⌘K`)** | Cross-Platform Unified Search | `ai_tools`, `courses`, `lessons`, `projects`, `challenges`, `prompts`, `departments` | Full-Text Search across entities | Public SELECT for published content | `search_victory_content(search_term)` |
| **1. Hero Section (`HeroSection`)** | VIP Builder Waitlist & Project Drops Signup | `waitlist` | `INSERT INTO waitlist (email, interest, role) VALUES (...)` | Public INSERT allowed; SELECT restricted to admins | None |
| **1. Hero Section (`HeroSection`)** | Launch Interactive Project Cards ("AI Video Pipeline", "Autonomous Agents") | `projects`, `project_steps` | `SELECT * FROM projects WHERE slug = '...'` | Public SELECT where `is_published = true` | None |
| **1. Hero Section (`HeroSection`)** | Platform Metrics Live Counters | `profiles`, `projects`, `ai_tools`, `departments` | Aggregated count queries | Public SELECT | `get_platform_metrics()` |
| **2. Creator Flow (`WhatDoYouWantToCreate`)** | Discovery by Category & Interactive Tool Cards | `tool_categories`, `ai_tools`, `workflows` | `SELECT * FROM tool_categories ORDER BY name` | Public SELECT | None |
| **2. Creator Flow (`WhatDoYouWantToCreate`)** | Personalized Path Launch | `learning_paths`, `enrollments` | `INSERT INTO enrollments (user_id, learning_path_id) VALUES (...) ON CONFLICT DO NOTHING` | Authenticated users can insert own enrollments | None |
| **3. AI for Every Field (`EveryFieldSection`)** | 9 Cross-Disciplinary Departments | `departments`, `learning_paths` | `SELECT * FROM departments WHERE is_active = true ORDER BY name` | Public SELECT for active departments | None |
| **4. AI Tool Universe (`ToolGalaxySection`)** | Filter Tools by Category, Pricing, Difficulty | `ai_tools`, `tool_categories`, `tool_skills` | `SELECT * FROM ai_tools WHERE is_published = true` with joins | Public SELECT | None |
| **4. AI Tool Universe (`ToolGalaxySection`)** | Bookmark / Favorite AI Tool | `bookmarks` | `INSERT INTO bookmarks (user_id, entity_type, entity_id) VALUES (auth.uid(), 'tool', ...)` | User can insert/delete own bookmarks; UNIQUE constraint prevents duplicates | None |
| **4. AI Tool Universe (`ToolGalaxySection`)** | 10-Stage Tool Workflows | `workflows`, `workflow_steps`, `workflow_step_tools` | Nested relational query on workflow steps and associated tools | Public SELECT | None |
| **5. Learning Pathway (`LearningPathSection`)** | Spatial 6-Stage Roadmap (Goal → Skills → Tools → Practice → Project → Deploy) | `learning_paths`, `learning_path_skills`, `learning_path_tools`, `courses` | `SELECT * FROM learning_paths WHERE is_published = true` | Public SELECT | None |
| **5. Learning Pathway (`LearningPathSection`)** | Enroll and Track Pathway Progress | `enrollments`, `lesson_progress` | `UPSERT INTO enrollments (user_id, learning_path_id, progress, status)` | User can view and update own enrollments | None |
| **6. Production Project Lab (`ProjectLabSection`)** | Filter & Browse Real-World Projects | `projects`, `departments`, `project_steps` | `SELECT * FROM projects WHERE is_published = true ORDER BY difficulty` | Public SELECT | None |
| **6. Project Workspace (`WorkspaceModal`)** | Step-by-Step Guided Build Sandbox | `project_steps`, `project_progress` | `SELECT * FROM project_steps WHERE project_id = ... ORDER BY step_order` | Public SELECT for steps; User-isolated for progress | None |
| **6. Project Workspace (`WorkspaceModal`)** | Submit GitHub & Demo URLs for Verification | `project_submissions`, `project_progress`, `profiles` | `INSERT INTO project_submissions (user_id, project_id, github_url, demo_url, ...) VALUES (...)` | User can insert own submissions | `award_project_xp(user_id, project_id)` |
| **7. AI Mentor Section (`AIMentorSection` & `PersistentAIMentor`)** | Socratic Pedagogical Dialogue across 9 Modes | `conversations`, `chat_messages` | Realtime append to chat messages; session context tracking | User can only read/write own conversations | `supabase/functions/ai-mentor/` (Secured AI Edge Function with context injection) |
| **8. Prompt Lab (`PromptLabSection`)** | Analyze, Improve & Test Prompt Formulas | `prompts` | `INSERT INTO prompts (user_id, title, original_prompt, improved_prompt, category, tags)` | Users can view public prompts and view/edit own prompts | `supabase/functions/prompt-lab/` (Prompt engineering evaluator) |
| **8. Prompt Lab (`PromptLabSection`)** | Copy, Fork & Bookmark Production Prompts | `bookmarks`, `prompts` | `INSERT INTO bookmarks (user_id, entity_type, entity_id)` | User-isolated bookmarks | None |
| **9. Student Command Center (`ProgressDashboardSection`)** | Unified Student Overview (Streak, Constellation, Progress, Recommendations) | `profiles`, `user_skills`, `enrollments`, `project_progress`, `achievements`, `recommendations` | Fast single RPC: `get_dashboard_summary(auth.uid())` | User can only access own dashboard data | `get_dashboard_summary()` RPC |
| **9. Recommendations Engine** | Contextual Tool & Project Suggestions | `recommendations` | `SELECT * FROM recommendations WHERE user_id = auth.uid() ORDER BY score DESC` | User can view own recommendations | `generate_recommendations(user_id)` |
| **10. Portfolio Builder (`PortfolioSection`)** | Verified Student Proof & 3D Interactive Cards | `portfolios`, `portfolio_projects`, `project_submissions` | `SELECT * FROM portfolios JOIN portfolio_projects ON ... WHERE is_public = true` | Public SELECT if `is_public = true`; Owner-only mutations | None |
| **10. Portfolio Builder (`PortfolioSection`)** | Deploy Verified Project to Portfolio | `portfolio_projects` | `INSERT INTO portfolio_projects (portfolio_id, project_submission_id, ...)` | Portfolio owner only | Storage bucket: `portfolio-images` |
| **11. Career Matrix (`CareerMatrixSection`)** | Career Transition Pathways & Salary Projections | `departments`, `skills`, `learning_paths` | `SELECT * FROM departments` | Public SELECT | None |
| **12. Weekend AI Hackathons (`ChallengesSection`)** | Browse Challenges & Countdown | `challenges` | `SELECT * FROM challenges WHERE is_published = true ORDER BY created_at DESC` | Public SELECT | None |
| **12. Challenges (`ChallengesSection`)** | Submit Challenge Solution & Earn XP | `challenge_submissions`, `profiles`, `user_achievements` | `INSERT INTO challenge_submissions (challenge_id, user_id, submission_url, ...)` | User can insert own submissions | `award_challenge_xp()` |
| **13. Community Feed (`CommunitySection`)** | Builder Project Wall & Artifact Shares | `community_posts` | `SELECT * FROM community_posts ORDER BY created_at DESC` | Public SELECT; Authenticated INSERT | Realtime broadcast for new posts |
| **13. Community Feed (`CommunitySection`)** | Like Community Post | `community_posts` | `UPDATE community_posts SET likes = likes + 1 WHERE id = ...` | Anyone can increment likes | None |
| **14. Final Call to Action (`FinalCtaSection`)** | Start Learning Personalized Gateway | `profiles`, `enrollments` | Redirect to onboarding or active pathway | Authenticated / Guest | None |
| **Onboarding Modal (`PersonalizedOnboardingModal`)** | Save Discipline, Skill Level & Career Goal | `profiles` | `UPDATE profiles SET department_id = ..., skill_level = ..., career_goal = ... WHERE id = auth.uid()` | Self UPDATE only | Triggers initial recommendations |
| **Supabase Storage Buckets** | Avatar, Screenshot & Deliverable Uploads | `storage.objects` | `supabase.storage.from('avatars').upload(...)` | User can only write to their own folder path (`userId/*`) | Signed URLs for private assets |

---

## 3. Row Level Security (RLS) Strategy Matrix

1. **User-Owned Private Data**:
   - `profiles`: SELECT public (safe fields) / own full; UPDATE only `auth.uid() = id`.
   - `user_skills`: SELECT/INSERT/UPDATE where `auth.uid() = user_id`.
   - `enrollments`: SELECT/INSERT/UPDATE where `auth.uid() = user_id`.
   - `lesson_progress`: SELECT/INSERT/UPDATE where `auth.uid() = user_id`.
   - `project_progress`: SELECT/INSERT/UPDATE where `auth.uid() = user_id`.
   - `project_submissions`: SELECT/INSERT where `auth.uid() = user_id`.
   - `challenge_submissions`: SELECT/INSERT where `auth.uid() = user_id`.
   - `portfolios`: SELECT public if `is_public = true`; ALL where `auth.uid() = user_id`.
   - `portfolio_projects`: SELECT public if parent portfolio `is_public = true`; ALL where portfolio owner `auth.uid()`.
   - `conversations` & `chat_messages`: SELECT/INSERT/DELETE where `auth.uid() = user_id`.
   - `prompts`: SELECT public if `is_public = true` OR `auth.uid() = user_id`; ALL where `auth.uid() = user_id`.
   - `recommendations`: SELECT where `auth.uid() = user_id`.
   - `user_achievements`: SELECT where `auth.uid() = user_id`.
   - `notifications`: SELECT/UPDATE where `auth.uid() = user_id`.
   - `bookmarks`: SELECT/INSERT/DELETE where `auth.uid() = user_id`.

2. **Public Educational Content (Admin Controlled)**:
   - `departments`, `skills`, `tool_categories`, `ai_tools`, `tool_skills`, `tool_departments`, `related_tools`, `workflows`, `workflow_steps`, `workflow_step_tools`, `learning_paths`, `learning_path_skills`, `learning_path_tools`, `courses`, `modules`, `lessons`, `projects`, `project_steps`, `challenges`, `achievements`:
     - SELECT: Public (`is_published = true` or unrestricted for foundational reference data).
     - INSERT / UPDATE / DELETE: Restricted to administrators via `is_admin(auth.uid())`.

---

## 4. Edge Functions & AI Services

1. **`ai-mentor` (`supabase/functions/ai-mentor/index.ts`)**:
   - Server-side Deno Edge Function.
   - Verifies Supabase Bearer Auth Token.
   - Injects full contextual state (Active Page, Lesson, Project, Step, Active Tool, Track, Skill Level, Career Goal).
   - Enforces Pedagogical Socratic Persona across all 9 modes (EXPLAIN, HINT, DEBUG, PRACTICE, REVIEW, PROJECT_HELP, TOOL_HELP, ROADMAP, CAREER).
   - Communicates with AI model using server-side environment secrets (`OPENAI_API_KEY` / `GEMINI_API_KEY` / `OPENROUTER_API_KEY`).
   - Persists conversation & messages to Supabase DB.
   - Never exposes AI API keys to the browser client.

2. **`prompt-lab` (`supabase/functions/prompt-lab/index.ts`)**:
   - Analyzes user prompt for clarity, constraints, context, and structural output.
   - Produces surgical improvement suggestions and optimized prompt templates.
   - Benchmarks prompt execution against sample test variables.
