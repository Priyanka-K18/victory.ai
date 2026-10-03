import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Compass, 
  Target, 
  Cpu, 
  Code2, 
  Terminal, 
  Rocket, 
  Briefcase,
  Layers
} from 'lucide-react';
import { LearningPathNode } from '../../types';
import { soundFX } from '../../utils/audio';

type GoalType = 'Job' | 'Internship' | 'Freelancing' | 'Startup' | 'College Project' | 'Personal Skill';
type LevelType = 'Beginner' | 'Intermediate' | 'Advanced';

export const LearningPathSection: React.FC<{
  onLaunchProjectLab: () => void;
}> = ({ onLaunchProjectLab }) => {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('Job');
  const [selectedLevel, setSelectedLevel] = useState<LevelType>('Intermediate');
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(3); // currently on Practice node

  const goals: GoalType[] = [
    'Job',
    'Internship',
    'Freelancing',
    'Startup',
    'College Project',
    'Personal Skill',
  ];

  const levels: LevelType[] = ['Beginner', 'Intermediate', 'Advanced'];

  // Dynamically constructed learning path nodes
  const nodes: LearningPathNode[] = [
    {
      id: 'node-1',
      title: `Define North Star: ${selectedGoal}`,
      type: 'goal',
      status: 'completed',
      duration: 'Day 1',
      description: `Establish tangible milestones tailored specifically to securing a ${selectedGoal}. We audit target company expectations and required GitHub deliverables.`,
      deliverable: 'Target Role & Project Architecture Spec',
      skills: ['Goal Alignment', 'Ecosystem Scoping', 'Spec Writing'],
    },
    {
      id: 'node-2',
      title: 'Core Foundations & Mental Models',
      type: 'skills',
      status: 'completed',
      duration: 'Week 1-2',
      description: `Grasp LLM architectures, token economics, context window mechanics, and vector embedding math at a ${selectedLevel} level.`,
      deliverable: 'LLM Foundations Self-Audit Matrix',
      skills: ['Tokenization', 'Attention Heads', 'Zero-Shot Reasoning'],
    },
    {
      id: 'node-3',
      title: 'Master Modern AI Tool Suite',
      type: 'ai-tools',
      status: 'completed',
      duration: 'Week 3',
      description: 'Hands-on pair programming using Cursor IDE, Claude 3.7 Sonnet extended thinking, and prompt chain debuggers.',
      deliverable: 'Configured Local Developer Toolchain',
      skills: ['Cursor IDE', 'Claude Code', 'v0 Prototyping'],
    },
    {
      id: 'node-4',
      title: 'Interactive Guided Practice Sprints',
      type: 'practice',
      status: 'active',
      duration: 'Week 4',
      description: 'Solve real algorithmic challenges, diagnose hallucination vectors, and implement defensive guardrails.',
      deliverable: '3 Interactive Code Challenges Passed',
      skills: ['Defensive Prompting', 'Zod Output Validation', 'Error Handling'],
    },
    {
      id: 'node-5',
      title: 'Build Flagship Production Project',
      type: 'project',
      status: 'locked',
      duration: 'Week 5-6',
      description: 'Build an end-to-end full-stack AI system solving a real-world problem with database persistence and streaming responses.',
      deliverable: 'Production Web Application with GitHub Repo',
      skills: ['Next.js / FastAPI', 'RAG Vectors', 'Streaming UI'],
    },
    {
      id: 'node-6',
      title: 'Edge Deployment & Observability',
      type: 'deploy',
      status: 'locked',
      duration: 'Week 7',
      description: 'Deploy to high-speed edge infrastructure, set up token cost monitoring with LangSmith, and stress-test latency.',
      deliverable: 'Live Production URL with 99.9% Uptime',
      skills: ['Vercel Edge', 'LangSmith Monitoring', 'Rate Limiting'],
    },
    {
      id: 'node-7',
      title: 'Publish Verified 3D Portfolio Proof',
      type: 'portfolio',
      status: 'locked',
      duration: 'Week 8',
      description: 'Convert your deployed project into an interactive 3D portfolio card with live metrics, recruiter walkthrough, and GitHub badge.',
      deliverable: 'Public Recruiter-Ready Portfolio Showcase',
      skills: ['Case Study Writing', 'Recruiter Pitching', 'Public Demo'],
    },
  ];

  return (
    <section 
      id="paths" 
      className="relative py-28 px-4 sm:px-6 bg-[#030612] overflow-hidden"
    >
      {/* Background ambient ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono-code mb-4">
            <Target className="w-3.5 h-3.5" />
            <span>CUSTOMIZED LEARNING ENGINE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase mb-4">
            YOUR AI <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">LEARNING PATH</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 font-body">
            Answer two quick questions to generate an exact 8-stage production roadmap from raw theory to deployed proof.
          </p>
        </div>

        {/* Wizard Controls */}
        <div className="max-w-4xl mx-auto mb-16 p-6 rounded-3xl bg-[#070d22] border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          
          {/* Question 1: What do you want to achieve? */}
          <div className="mb-6">
            <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-3">
              01. WHAT DO YOU WANT TO ACHIEVE?
            </label>
            <div className="flex flex-wrap gap-2">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedGoal(goal);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all ${
                    selectedGoal === goal
                      ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: What is your current level? */}
          <div>
            <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-3">
              02. WHAT IS YOUR CURRENT LEVEL?
            </label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedLevel(level);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all ${
                    selectedLevel === level
                      ? 'bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 3D Spatial Timeline Track */}
        <div className="relative mb-14">
          
          {/* Connecting glowing rail line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600/40 z-0" />

          {/* Nodes Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
            {nodes.map((node, idx) => {
              const isActive = activeNodeIdx === idx;
              const isCompleted = node.status === 'completed';
              const isLocked = node.status === 'locked';

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveNodeIdx(idx);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  data-scanner="true"
                  data-scanner-title={`STAGE 0${idx + 1}: ${node.title}`}
                  data-scanner-detail={node.description}
                  data-scanner-category="LEARNING PATH"
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#0b1435] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] -translate-y-2'
                      : isCompleted
                      ? 'bg-[#060c1d] border-cyan-500/30 text-slate-300 hover:border-cyan-400/50'
                      : 'bg-[#040816]/70 border-white/5 text-slate-500 hover:border-white/20'
                  }`}
                >
                  {/* Status Indicator Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-code font-bold text-slate-400">
                      0{idx + 1}
                    </span>

                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>

                  {/* Title & Stage */}
                  <div className="mb-4">
                    <span className="text-[9px] font-mono-code text-cyan-400 uppercase tracking-widest block mb-1">
                      {node.duration}
                    </span>
                    <h4 className={`text-xs font-display font-bold leading-snug ${isActive ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-400'}`}>
                      {node.title}
                    </h4>
                  </div>

                  {/* Bottom Deliverable */}
                  <div className="text-[10px] font-mono-code text-slate-400 pt-2 border-t border-white/5 truncate">
                    {node.deliverable}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Inspected Node Deep-Dive Showcase */}
        {nodes[activeNodeIdx] && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#070e24] to-[#09122f] border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono-code mb-2">
                  <span>STAGE 0{activeNodeIdx + 1} OF 07</span>
                  <span>•</span>
                  <span>ESTIMATED {nodes[activeNodeIdx].duration}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                  {nodes[activeNodeIdx].title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed mb-4">
                  {nodes[activeNodeIdx].description}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono-code text-slate-400">SKILLS ACQUIRED:</span>
                  {nodes[activeNodeIdx].skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono-code bg-white/5 border border-white/10 text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-3 w-full lg:w-auto">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onLaunchProjectLab();
                  }}
                  className="px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
                >
                  <span>Enter Project Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-[11px] font-mono-code text-center text-slate-400">
                  Target Deliverable: <span className="text-white">{nodes[activeNodeIdx].deliverable}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
