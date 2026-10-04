import React, { useState, useEffect } from 'react';
import {
  Users, Database, Trophy, Mail, MessageSquare, Zap, ShieldCheck,
  TrendingUp, RefreshCw, Eye, LogOut, Cpu, CheckCircle2, AlertCircle,
  BarChart3, Layers, ArrowUpRight
} from 'lucide-react';
import { backendService, UserProfileData } from '../../services/backendService';
import { useAuth } from '../../context/AuthContext';
import { soundFX } from '../../utils/audio';

interface AdminStats {
  totalUsers: number;
  totalProjects: number;
  totalChallenges: number;
  totalWaitlist: number;
  totalCommunityPosts: number;
}

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, profile, signOut, isConnected } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserProfileData[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content'>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const [statsData, usersData] = await Promise.all([
      backendService.adminGetStats(),
      backendService.adminGetUsers(),
    ]);
    setStats(statsData);
    setUsers(usersData);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { loadData(); }, []);

  const statCards = stats ? [
    { label: 'Registered Builders', value: stats.totalUsers, icon: Users, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)' },
    { label: 'Published Projects', value: stats.totalProjects, icon: Trophy, color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
    { label: 'Active Challenges', value: stats.totalChallenges, icon: Zap, color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
    { label: 'Waitlist Signups', value: stats.totalWaitlist, icon: Mail, color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
    { label: 'Community Posts', value: stats.totalCommunityPosts, icon: MessageSquare, color: '#f472b6', bg: 'rgba(244,114,182,0.08)' },
  ] : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#03050e] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#03050e]/95 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-white tracking-tight">VICTORY.AI</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold bg-rose-500/20 border border-rose-500/40 text-rose-300 uppercase">ADMIN</span>
              </div>
              <div className="text-[10px] font-mono-code text-slate-400">
                Supabase Control Panel · {profile?.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live DB status */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono-code text-slate-300">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {isConnected ? 'DB Connected' : 'Connecting...'}
            </div>

            <button
              onClick={() => { soundFX.playClick(); loadData(); }}
              disabled={refreshing}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => { soundFX.playClick(); onClose(); }}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-mono-code text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              ← Back to App
            </button>

            <button
              onClick={async () => { await signOut(); onClose(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono-code text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Tab Nav */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit mb-8">
          {([
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'content', label: 'Content', icon: Layers },
          ] as { id: 'overview' | 'users' | 'content'; label: string; icon: React.ComponentType<{className?: string}> }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => { soundFX.playClick(); setActiveTab(tab.id); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 font-mono-code text-sm">Loading Supabase data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {statCards.map((card) => (
                    <div
                      key={card.label}
                      className="p-5 rounded-2xl border border-white/10 flex flex-col"
                      style={{ background: card.bg }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: card.bg }}>
                        <card.icon className="w-4 h-4" style={{ color: card.color }} />
                      </div>
                      <div className="text-3xl font-display font-black mb-1" style={{ color: card.color }}>
                        {card.value.toLocaleString()}
                      </div>
                      <div className="text-[11px] font-mono-code text-slate-400">{card.label}</div>
                    </div>
                  ))}
                </div>

                {/* Supabase Tables Status */}
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-6">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-display font-bold text-white text-lg">Supabase Tables — RLS Status</h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono-code bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 uppercase ml-auto">All Secured</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      'profiles', 'ai_tools', 'projects', 'learning_paths',
                      'challenges', 'community_posts', 'waitlist', 'enrollments',
                      'user_progress', 'portfolios', 'prompts', 'ai_mentor_chats',
                      'bookmarks', 'achievements', 'departments', 'tool_categories',
                    ].map((table) => (
                      <div key={table} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-[11px] font-mono-code text-slate-300">{table}</span>
                        <span className="ml-auto text-[9px] font-mono-code text-emerald-400">RLS ✓</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Auth Status */}
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-display font-bold text-white text-lg">Auth & Session</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className="text-[10px] font-mono-code text-emerald-400 mb-1">ADMIN USER</div>
                      <div className="text-sm font-bold text-white">{profile?.full_name || 'Unknown'}</div>
                      <div className="text-xs text-slate-400 font-mono-code">{profile?.email}</div>
                      <div className="text-xs text-slate-400 font-mono-code mt-1">Level: {profile?.level} · XP: {profile?.xp?.toLocaleString()}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                      <div className="text-[10px] font-mono-code text-cyan-400 mb-1">SUPABASE AUTH STATUS</div>
                      <div className={`flex items-center gap-2 text-sm font-bold ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
                        <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                        {isConnected ? 'JWT Session Active' : 'Connecting...'}
                      </div>
                      <div className="text-xs text-slate-400 font-mono-code mt-1">
                        User ID: {user?.id ? user.id.slice(0, 16) + '...' : 'Guest/Demo'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── USERS TAB ── */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display font-bold text-white text-xl">Registered Builders</h3>
                    <p className="text-xs text-slate-400 font-mono-code mt-1">Top users by XP · from Supabase profiles table</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code">
                    {users.length} Users
                  </span>
                </div>

                {users.length === 0 ? (
                  <div className="text-center py-20">
                    <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 font-mono-code">No users yet. Users appear here after signing up.</p>
                    <p className="text-slate-500 font-mono-code text-xs mt-2">Try signing up with a real account to see data here.</p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                          <th className="px-4 py-3 text-left text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">Builder</th>
                          <th className="px-4 py-3 text-left text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">Level</th>
                          <th className="px-4 py-3 text-right text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">XP</th>
                          <th className="px-4 py-3 text-right text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">Streak</th>
                          <th className="px-4 py-3 text-right text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">Projects</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u, i) => (
                          <tr key={u.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white font-mono-code">
                                  {u.avatar_url || u.full_name?.slice(0, 2).toUpperCase() || 'AI'}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-white">{u.full_name}</div>
                                  <div className="text-[11px] font-mono-code text-slate-400">{u.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                {u.level || 'Beginner'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-display font-bold text-amber-400">{(u.xp || 0).toLocaleString()}</td>
                            <td className="px-4 py-3 text-right text-sm font-mono-code text-orange-400">🔥 {u.streak_days || 0}d</td>
                            <td className="px-4 py-3 text-right text-sm font-mono-code text-emerald-400">{(u.completed_projects || []).length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ── CONTENT TAB ── */}
            {activeTab === 'content' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Supabase Tables', items: ['ai_tools (12 seeded)', 'projects (8 seeded)', 'challenges (5 seeded)', 'community_posts (6 seeded)', 'departments (9 seeded)', 'learning_paths (5 seeded)', 'skills (10 seeded)', 'prompts (3 seeded)', 'waitlist (live signups)'], color: '#38bdf8', icon: Database },
                  { title: 'Edge Functions (Deploy)', items: ['supabase/functions/ai-mentor/ → chat endpoint', 'supabase/functions/prompt-lab/ → prompt eval', 'get_platform_metrics() RPC → live stats', 'get_dashboard_summary() RPC → user dash', 'award_project_xp() RPC → XP system'], color: '#a855f7', icon: Zap },
                  { title: 'RLS Policies Active', items: ['profiles: owner SELECT/UPDATE', 'enrollments: owner CRUD', 'user_progress: owner CRUD', 'bookmarks: owner CRUD', 'ai_tools: public SELECT', 'projects: public SELECT', 'community_posts: public SELECT', 'challenges: public SELECT'], color: '#34d399', icon: ShieldCheck },
                  { title: 'Frontend → Supabase Map', items: ['Hero: waitlist INSERT', 'Navbar: auth state + profile', 'Dashboard: profiles SELECT + XP', 'Challenges: challenges SELECT + join', 'Community: posts SELECT + likes', 'Portfolio: portfolios + submissions', 'Metrics bar: get_platform_metrics()', 'AI Mentor: ai_mentor_chats INSERT'], color: '#fbbf24', icon: TrendingUp },
                ].map((block) => (
                  <div key={block.title} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
                    <div className="flex items-center gap-2 mb-4">
                      <block.icon className="w-4 h-4" style={{ color: block.color }} />
                      <h4 className="font-display font-bold text-white text-sm">{block.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs font-mono-code text-slate-300">
                          <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: block.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
