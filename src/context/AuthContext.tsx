import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, testSupabaseConnection } from '../lib/supabase';
import { backendService, UserProfileData } from '../services/backendService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfileData | null;
  loading: boolean;
  isConnected: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string; message?: string }>;
  signInAsDemo: (demoRole?: string) => void;
  signOut: () => Promise<void>;
  updatePreferences: (prefs: { interest: string; level: string; goal: string }) => Promise<void>;
  awardXp: (amount: number, projectId?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Initial check & Supabase connection test
  useEffect(() => {
    testSupabaseConnection().then((res) => {
      setIsConnected(res.connected);
    });

    // Check existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        backendService
          .getUserProfile(session.user.id, session.user.email || 'builder@victory.ai')
          .then(setProfile);
      } else {
        // Check if demo session exists in localStorage
        const demoStored = localStorage.getItem('victory_ai_demo_user');
        if (demoStored) {
          try {
            const parsed = JSON.parse(demoStored);
            setProfile(parsed);
          } catch {
            // ignore
          }
        }
      }
      setLoading(false);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          localStorage.removeItem('victory_ai_demo_user');
          const p = await backendService.getUserProfile(
            newSession.user.id,
            newSession.user.email || 'builder@victory.ai'
          );
          setProfile(p);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
          localStorage.removeItem('victory_ai_demo_user');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { error: error.message };
      }
      if (data.user) {
        const p = await backendService.getUserProfile(data.user.id, data.user.email || email);
        setProfile(p);
      }
      return {};
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      return { error: msg };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<{ error?: string; message?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        const p = await backendService.getUserProfile(data.user.id, email);
        setProfile({ ...p, full_name: fullName });
      }

      return {
        message: data.session
          ? 'Account created and signed in successfully!'
          : 'Registration submitted! Please check your email to confirm your account.',
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign up failed';
      return { error: msg };
    }
  };

  const signInAsDemo = (demoRole = 'Full-Stack AI Engineer') => {
    const demoProfile: UserProfileData = {
      id: 'demo_user_007',
      email: 'alex.builder@victory.ai',
      full_name: 'Alex Rivera',
      avatar_url: 'AR',
      interest: 'Coding',
      level: 'Intermediate',
      goal: 'Job',
      xp: 1250,
      streak_days: 7,
      completed_projects: ['autonomous-code-agents'],
    };
    localStorage.setItem('victory_ai_demo_user', JSON.stringify(demoProfile));
    setProfile(demoProfile);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('victory_ai_demo_user');
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updatePreferences = async (prefs: { interest: string; level: string; goal: string }) => {
    const userId = user?.id || profile?.id || 'guest_user';
    await backendService.saveLearningPreferences(userId, prefs);
    if (profile) {
      setProfile((prev) => (prev ? { ...prev, ...prefs } : null));
    }
  };

  const awardXp = async (amount: number, projectId?: string) => {
    const userId = user?.id || profile?.id || 'guest_user';
    if (projectId) {
      const res = await backendService.recordProjectCompletion(userId, projectId, amount);
      if (profile) {
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                xp: res.newXp,
                completed_projects: res.completedProjects,
              }
            : null
        );
      }
    } else if (profile) {
      const newXp = profile.xp + amount;
      setProfile((prev) => (prev ? { ...prev, xp: newXp } : null));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isConnected,
        signIn,
        signUp,
        signInAsDemo,
        signOut,
        updatePreferences,
        awardXp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
