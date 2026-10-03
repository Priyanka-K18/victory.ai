import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  MessageSquare, 
  Share2, 
  Sparkles, 
  Filter, 
  ArrowUpRight 
} from 'lucide-react';
import { COMMUNITY_POSTS } from '../../data/mockData';
import { CommunityPost } from '../../types';
import { soundFX } from '../../utils/audio';

export const CommunitySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'project' | 'prompt' | 'workflow' | 'experiment'>('all');
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);

  const filteredPosts = posts.filter(p => activeFilter === 'all' || p.type === activeFilter);

  const handleLikePost = (id: string) => {
    soundFX.playClick();
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <section 
      id="community" 
      className="relative py-28 px-4 sm:px-6 bg-[#03050e] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>GLOBAL BUILDER NETWORK</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            COMMUNITY <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">PROJECT WALL</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Explore live builds, copy production-tested prompts, fork automated workflows, and connect with fellow AI engineers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Artifacts' },
            { id: 'project', label: 'Projects' },
            { id: 'prompt', label: 'Prompt Formulas' },
            { id: 'workflow', label: 'Automation Blueprints' },
            { id: 'experiment', label: 'AI Experiments' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundFX.playClick();
                setActiveFilter(item.id as typeof activeFilter);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap ${
                activeFilter === item.id
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Masonry-Style Responsive Cards Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onMouseEnter={() => soundFX.playHover()}
              data-scanner="true"
              data-scanner-title={`COMMUNITY: ${post.title}`}
              data-scanner-detail={post.previewSnippet}
              data-scanner-category="COMMUNITY WALL"
              className="p-7 rounded-3xl bg-[#060a17]/90 hover:bg-[#080f24] border border-white/10 hover:border-cyan-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Author Info Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-mono-code font-bold text-xs shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                      {post.authorAvatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {post.authorName}
                      </div>
                      <div className="text-[11px] font-mono-code text-cyan-400">
                        {post.role}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-code uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                    {post.type}
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="text-xl font-display font-bold text-white mb-3 hover:text-cyan-300 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed mb-6">
                  {post.previewSnippet}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/5 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Interactions Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono-code text-slate-400">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>

                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>

                  <span className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer">
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
