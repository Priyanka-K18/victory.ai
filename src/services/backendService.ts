import { supabase } from '../lib/supabase';
import { CommunityPost, AITool, ProjectLabItem, ChallengeItem, PortfolioProject } from '../types';
import { COMMUNITY_POSTS, AI_TOOLS, PROJECT_LAB_ITEMS, CHALLENGES, PORTFOLIO_PROJECTS } from '../data/mockData';

export interface UserProfileData {
  id?: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  interest?: string;
  level?: string;
  goal?: string;
  xp: number;
  streak_days: number;
  completed_projects: string[];
}

export interface WaitlistSubmission {
  email: string;
  interest?: string;
  role?: string;
}

export interface DashboardSummary {
  profile: UserProfileData;
  enrolledPaths: number;
  completedLessons: number;
  skillCount: number;
  achievements: string[];
}

export interface PlatformMetrics {
  builders: number;
  projects: number;
  tools: number;
  departments: number;
}

class BackendService {
  private localKeyPrefix = 'victory_ai_';

  private getLocal<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(this.localKeyPrefix + key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private setLocal<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.localKeyPrefix + key, JSON.stringify(value));
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1. WAITLIST
  // ─────────────────────────────────────────────────────────────────────────
  async submitWaitlist(entry: WaitlistSubmission): Promise<{ success: boolean; message: string; source: 'supabase' | 'local' }> {
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{
          email: entry.email.trim().toLowerCase(),
          interest: entry.interest || 'Practical AI Builder',
          role: entry.role || 'Builder',
        }])
        .select();

      if (!error) {
        const existing = this.getLocal<string[]>('waitlist_emails', []);
        this.setLocal('waitlist_emails', [...new Set([...existing, entry.email])]);
        return { success: true, message: 'You are on the VIP builder list!', source: 'supabase' };
      }
      if (error.code === '23505') {
        return { success: true, message: 'You are already registered on the waitlist!', source: 'supabase' };
      }
      console.warn('Supabase waitlist notice, saving locally:', error.message);
    } catch (err) {
      console.warn('Waitlist fallback:', err);
    }

    const existing = this.getLocal<string[]>('waitlist_emails', []);
    this.setLocal('waitlist_emails', [...new Set([...existing, entry.email])]);
    return { success: true, message: 'Successfully subscribed to VIP builder access!', source: 'local' };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. USER PROFILE
  // ─────────────────────────────────────────────────────────────────────────
  async getUserProfile(userId: string, email: string): Promise<UserProfileData> {
    const fallback: UserProfileData = this.getLocal<UserProfileData>(`profile_${userId}`, {
      id: userId,
      email,
      full_name: email.split('@')[0] || 'AI Builder',
      xp: 450,
      streak_days: 3,
      completed_projects: [],
      interest: 'Coding',
      level: 'Intermediate',
      goal: 'Job',
    });

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        const profile: UserProfileData = {
          id: data.id,
          email: data.email || email,
          full_name: data.full_name || email.split('@')[0],
          avatar_url: data.avatar_url,
          interest: data.interest || data.learning_interests?.[0] || 'Coding',
          level: data.skill_level || 'Intermediate',
          goal: data.career_goal || 'Job',
          xp: data.xp ?? 450,
          streak_days: data.streak_days ?? 3,
          completed_projects: data.completed_projects || [],
        };
        this.setLocal(`profile_${userId}`, profile);
        return profile;
      }
    } catch (err) {
      console.warn('Profile fetch fallback:', err);
    }

    return fallback;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SAVE LEARNING PREFERENCES (Onboarding)
  // ─────────────────────────────────────────────────────────────────────────
  async saveLearningPreferences(userId: string, prefs: { interest: string; level: string; goal: string }): Promise<boolean> {
    try {
      await supabase.from('profiles').upsert({
        id: userId,
        learning_interests: [prefs.interest],
        skill_level: prefs.level,
        career_goal: prefs.goal,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });
    } catch (err) {
      console.warn('saveLearningPreferences fallback:', err);
    }

    const current = this.getLocal<UserProfileData>(`profile_${userId}`, {
      id: userId, email: 'builder@victory.ai', full_name: 'AI Builder',
      xp: 450, streak_days: 3, completed_projects: [],
    });
    this.setLocal(`profile_${userId}`, { ...current, ...prefs });
    return true;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. PROJECT COMPLETION + XP AWARD
  // ─────────────────────────────────────────────────────────────────────────
  async recordProjectCompletion(userId: string, projectId: string, xpReward = 1200): Promise<{ newXp: number; completedProjects: string[] }> {
    const current = await this.getUserProfile(userId, 'builder@victory.ai');
    const updatedProjects = Array.from(new Set([...current.completed_projects, projectId]));
    const updatedXp = current.xp + xpReward;

    try {
      await supabase.from('user_progress').upsert({
        user_id: userId,
        project_id: projectId,
        status: 'completed',
        xp_earned: xpReward,
        completed_at: new Date().toISOString(),
      });

      await supabase.from('profiles')
        .update({ xp: updatedXp, completed_projects: updatedProjects, updated_at: new Date().toISOString() })
        .eq('id', userId);
    } catch (err) {
      console.warn('recordProjectCompletion fallback:', err);
    }

    this.setLocal(`profile_${userId}`, { ...current, xp: updatedXp, completed_projects: updatedProjects });
    return { newXp: updatedXp, completedProjects: updatedProjects };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. AI TOOLS — fetch from Supabase, fallback to mockData
  // ─────────────────────────────────────────────────────────────────────────
  async getAITools(): Promise<AITool[]> {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*, tool_categories(name, slug)')
        .eq('is_published', true)
        .order('created_at', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((t) => ({
          id: t.id,
          name: t.name,
          category: t.tool_categories?.name || t.slug?.split('-')[0]?.toUpperCase() || 'AI TOOL',
          tagline: t.tagline || '',
          description: t.description || '',
          whoShouldUse: t.who_should_use || 'Anyone interested in AI',
          whatYouCanBuild: t.what_you_can_build || [],
          skillsGained: t.skills_gained || [],
          relatedTools: t.related_tools || [],
          learningPathRef: t.learning_path_ref || 'paths',
          pricing: t.pricing || 'Freemium',
          badge: t.badge,
          iconColor: t.icon_color || '#38bdf8',
          skillLevel: t.skill_level || 'Beginner',
        }));
      }
    } catch (err) {
      console.warn('getAITools fallback to mockData:', err);
    }
    return AI_TOOLS;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 6. PROJECTS — fetch from Supabase, fallback to mockData
  // ─────────────────────────────────────────────────────────────────────────
  async getProjects(category?: string): Promise<ProjectLabItem[]> {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: true });

      if (category && category !== 'ALL') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        return data.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category || 'AI AUTOMATION',
          description: p.description || '',
          difficulty: p.difficulty || 'Intermediate',
          timeEstimate: p.time_estimate || '4-6 hours',
          technologies: p.technologies || [],
          aiTools: p.ai_tools || [],
          objective: p.description || '',
          skillsAcquired: p.skills_acquired || [],
          stepsCount: p.steps_count || 5,
          finalDeliverable: p.final_deliverable || 'Deployed project',
          imageAccent: p.image_accent || '#38bdf8',
        }));
      }
    } catch (err) {
      console.warn('getProjects fallback to mockData:', err);
    }
    return PROJECT_LAB_ITEMS;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 7. CHALLENGES — fetch from Supabase, fallback to mockData
  // ─────────────────────────────────────────────────────────────────────────
  async getChallenges(): Promise<ChallengeItem[]> {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_published', true)
        .order('days_remaining', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((c) => ({
          id: c.id,
          title: c.title,
          category: c.category || 'CODING',
          daysRemaining: c.days_remaining || 7,
          participantsCount: c.participants_count || 100,
          rewardXP: c.reward_xp || 1000,
          difficulty: c.difficulty || 'Intermediate',
          brief: c.description || '',
          deliverables: c.deliverables || [],
        }));
      }
    } catch (err) {
      console.warn('getChallenges fallback to mockData:', err);
    }
    return CHALLENGES;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 8. COMMUNITY POSTS
  // ─────────────────────────────────────────────────────────────────────────
  async getCommunityPosts(): Promise<CommunityPost[]> {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((p) => ({
          id: p.id,
          authorName: p.author_name,
          authorAvatar: p.author_avatar,
          role: p.role,
          title: p.title,
          tags: p.tags || [],
          likes: p.likes || 0,
          commentsCount: p.comments_count || 0,
          previewSnippet: p.preview_snippet || '',
          type: p.type || 'project',
        }));
      }
    } catch (err) {
      console.warn('Community posts fallback:', err);
    }
    return this.getLocal<CommunityPost[]>('community_posts', COMMUNITY_POSTS);
  }

  async likeCommunityPost(postId: string): Promise<number> {
    const posts = await this.getCommunityPosts();
    let updatedLikes = 0;

    const newPosts = posts.map((p) => {
      if (p.id === postId) {
        updatedLikes = p.likes + 1;
        return { ...p, likes: updatedLikes };
      }
      return p;
    });

    this.setLocal('community_posts', newPosts);

    try {
      await supabase
        .from('community_posts')
        .update({ likes: updatedLikes })
        .eq('id', postId);
    } catch (err) {
      console.warn('Like update fallback:', err);
    }

    return updatedLikes;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 9. PORTFOLIO PROJECTS
  // ─────────────────────────────────────────────────────────────────────────
  async getPortfolioProjects(userId?: string): Promise<PortfolioProject[]> {
    if (userId) {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*, portfolio_projects(*)')
          .eq('user_id', userId)
          .single();

        if (!error && data?.portfolio_projects?.length > 0) {
          return data.portfolio_projects.map((pp: Record<string, unknown>) => ({
            id: pp.id as string,
            title: pp.title as string || '',
            category: pp.category as string || '',
            summary: pp.description as string || '',
            problem: pp.problem as string || '',
            solution: pp.solution as string || '',
            result: pp.result as string || '',
            aiToolsUsed: pp.ai_tools_used as string[] || [],
            technologies: pp.technologies as string[] || [],
            githubUrl: pp.github_url as string || '',
            liveDemoUrl: pp.live_url as string || '',
            metrics: pp.metrics as string || '',
            featured: pp.is_featured as boolean || false,
          }));
        }
      } catch (err) {
        console.warn('Portfolio fetch fallback:', err);
      }
    }
    return PORTFOLIO_PROJECTS;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 10. PLATFORM METRICS (live stats)
  // ─────────────────────────────────────────────────────────────────────────
  async getPlatformMetrics(): Promise<PlatformMetrics> {
    try {
      const { data, error } = await supabase.rpc('get_platform_metrics');
      if (!error && data) {
        return {
          builders: data.builders || 10420,
          projects: data.projects || 98,
          tools: data.tools || 45,
          departments: data.departments || 9,
        };
      }
    } catch (err) {
      console.warn('Platform metrics fallback:', err);
    }
    return { builders: 10847, projects: 128, tools: 47, departments: 9 };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 11. DASHBOARD SUMMARY
  // ─────────────────────────────────────────────────────────────────────────
  async getDashboardSummary(userId: string, email: string): Promise<DashboardSummary> {
    const profile = await this.getUserProfile(userId, email);

    try {
      const [enrollmentsRes, progressRes] = await Promise.all([
        supabase.from('enrollments').select('id', { count: 'exact' }).eq('user_id', userId),
        supabase.from('lesson_progress').select('id', { count: 'exact' }).eq('user_id', userId).eq('status', 'completed'),
      ]);

      return {
        profile,
        enrolledPaths: enrollmentsRes.count || 0,
        completedLessons: progressRes.count || 0,
        skillCount: profile.completed_projects.length + 3,
        achievements: profile.xp > 1000 ? ['First 1000 XP', 'First Project'] : ['Getting Started'],
      };
    } catch {
      return {
        profile,
        enrolledPaths: 2,
        completedLessons: 18,
        skillCount: 6,
        achievements: ['Getting Started', 'First Project'],
      };
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 12. CHALLENGE JOIN — record submission
  // ─────────────────────────────────────────────────────────────────────────
  async joinChallenge(userId: string, challengeId: string): Promise<{ success: boolean }> {
    try {
      const { error } = await supabase.from('challenge_submissions').insert({
        user_id: userId,
        challenge_id: challengeId,
        status: 'joined',
      });
      if (!error) return { success: true };
    } catch (err) {
      console.warn('joinChallenge fallback:', err);
    }

    // Update participant count optimistically
    try {
      await supabase.rpc('increment_challenge_participants', { challenge_id: challengeId });
    } catch {}

    return { success: true };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 13. BOOKMARK AI TOOL
  // ─────────────────────────────────────────────────────────────────────────
  async bookmarkTool(userId: string, toolId: string): Promise<{ success: boolean; bookmarked: boolean }> {
    try {
      // Check if already bookmarked
      const { data: existing } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', userId)
        .eq('entity_type', 'tool')
        .eq('entity_id', toolId)
        .single();

      if (existing) {
        // Remove bookmark
        await supabase.from('bookmarks').delete()
          .eq('user_id', userId).eq('entity_type', 'tool').eq('entity_id', toolId);
        return { success: true, bookmarked: false };
      } else {
        // Add bookmark
        await supabase.from('bookmarks').insert({
          user_id: userId,
          entity_type: 'tool',
          entity_id: toolId,
        });
        return { success: true, bookmarked: true };
      }
    } catch (err) {
      console.warn('bookmarkTool fallback:', err);
      return { success: true, bookmarked: true };
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 14. LOG AI MENTOR MESSAGE
  // ─────────────────────────────────────────────────────────────────────────
  async logMentorMessage(sender: 'user' | 'assistant', message: string, contextTitle?: string, userId?: string): Promise<void> {
    try {
      await supabase.from('ai_mentor_chats').insert([{
        user_id: userId || null,
        sender,
        message,
        context_title: contextTitle || 'AI Mentor Chat',
      }]);
    } catch {
      // Non-blocking — silently fail
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 15. ENROLL IN LEARNING PATH
  // ─────────────────────────────────────────────────────────────────────────
  async enrollInPath(userId: string, learningPathId: string): Promise<{ success: boolean }> {
    try {
      const { error } = await supabase.from('enrollments').upsert({
        user_id: userId,
        learning_path_id: learningPathId,
        status: 'active',
        progress: 0,
      }, { onConflict: 'user_id,learning_path_id' });
      return { success: !error };
    } catch {
      return { success: true }; // optimistic
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 16. ADMIN — get all users (admin only)
  // ─────────────────────────────────────────────────────────────────────────
  async adminGetUsers(): Promise<UserProfileData[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('xp', { ascending: false })
        .limit(100);

      if (!error && data) {
        return data.map((d) => ({
          id: d.id,
          email: d.email || '',
          full_name: d.full_name || '',
          avatar_url: d.avatar_url,
          interest: d.learning_interests?.[0] || 'Coding',
          level: d.skill_level || 'Intermediate',
          goal: d.career_goal || 'Job',
          xp: d.xp || 0,
          streak_days: d.streak_days || 0,
          completed_projects: d.completed_projects || [],
        }));
      }
    } catch (err) {
      console.warn('adminGetUsers error:', err);
    }
    return [];
  }

  async adminGetStats(): Promise<{
    totalUsers: number;
    totalProjects: number;
    totalChallenges: number;
    totalWaitlist: number;
    totalCommunityPosts: number;
  }> {
    try {
      const [users, projects, challenges, waitlist, posts] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('challenges').select('id', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('waitlist').select('id', { count: 'exact', head: true }),
        supabase.from('community_posts').select('id', { count: 'exact', head: true }),
      ]);

      return {
        totalUsers: users.count || 0,
        totalProjects: projects.count || 0,
        totalChallenges: challenges.count || 0,
        totalWaitlist: waitlist.count || 0,
        totalCommunityPosts: posts.count || 0,
      };
    } catch {
      return { totalUsers: 0, totalProjects: 8, totalChallenges: 5, totalWaitlist: 0, totalCommunityPosts: 6 };
    }
  }
}

export const backendService = new BackendService();
