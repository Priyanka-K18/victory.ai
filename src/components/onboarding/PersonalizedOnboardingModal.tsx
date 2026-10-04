import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  Compass, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  Cpu, 
  Layers, 
  Check
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompletePath: (pathSummary: {
    interest: string;
    level: string;
    goal: string;
  }) => void;
}

export const PersonalizedOnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onCompletePath
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [interest, setInterest] = useState<string>('Coding');
  const [level, setLevel] = useState<string>('Intermediate');
  const [goal, setGoal] = useState<string>('Job');

  const interests = [
    { id: 'Coding', desc: 'Full-stack web apps, autonomous code agents, microservices' },
    { id: 'Design', desc: 'UI systems, generative 3D assets, dark mode tokens' },
    { id: 'Video', desc: 'Cinematic GenAI, camera prompting, neural audio' },
    { id: 'Business', desc: 'Executive intelligence, automated workflows, financial models' },
    { id: 'Marketing', desc: 'Omnichannel ad creative, viral copy, predictive funnels' },
    { id: 'Data', desc: 'Vector RAG architectures, embeddings, semantic search' },
    { id: 'Education', desc: 'Adaptive Socratic tutors, interactive curriculum graphs' },
    { id: 'Automation', desc: 'Enterprise webhook pipelines, n8n multi-agent squads' },
  ];

  const levels = [
    { id: 'Beginner', desc: 'New to AI tools or learning foundational programming concepts.' },
    { id: 'Intermediate', desc: 'Comfortable with modern tools; ready to architect full production projects.' },
    { id: 'Advanced', desc: 'Experienced engineer or creator targeting high-scale enterprise architectures.' },
  ];

  const goals = [
    { id: 'Job', desc: 'Land a high-paying AI engineer or AI creative role with verified proof.' },
    { id: 'Internship', desc: 'Stand out from applicants with production repos instead of resume bullet points.' },
    { id: 'Freelancing', desc: 'Offer high-value AI solutions and automated client pipelines at premium rates.' },
    { id: 'College Project', desc: 'Build an extraordinary capstone project that wows professors and judges.' },
    { id: 'Startup', desc: 'Prototype, validate, and launch an AI-native SaaS product from scratch.' },
    { id: 'Personal Learning', desc: 'Master the bleeding edge of AI out of pure curiosity and personal leverage.' },
  ];

  const handleNext = () => {
    soundFX.playClick();
    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    } else {
      onCompletePath({ interest, level, goal });
      onClose();
    }
  };

  const handleBack = () => {
    soundFX.playClick();
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div 
        className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden text-slate-200"
        style={{
          background: 'rgba(11, 15, 26, 0.95)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar & Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-cyan-400 mb-2">
            <span>STEP 0{step} OF 04</span>
            <span className="text-slate-400">PERSONALIZED ONBOARDING</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Interest */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              What are you interested in?
            </h2>
            <p className="text-sm text-slate-400 font-body mb-6">
              Pick the domain you want to master using production AI workflows.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {interests.map((item) => {
                const isSelected = interest === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundFX.playClick();
                      setInterest(item.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                        : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between font-display font-semibold text-sm mb-1">
                      <span>{item.id}</span>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-xs text-slate-400 font-body leading-snug">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Level */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              What's your current level?
            </h2>
            <p className="text-sm text-slate-400 font-body mb-6">
              We calibrate the AI pair-programming hints, pacing, and architectural complexity.
            </p>

            <div className="space-y-3 mb-6">
              {levels.map((item) => {
                const isSelected = level === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundFX.playClick();
                      setLevel(item.id);
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                        : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between font-display font-bold text-base mb-1">
                      <span>{item.id}</span>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 font-body">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Goal */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              What's your primary goal?
            </h2>
            <p className="text-sm text-slate-400 font-body mb-6">
              Your goal determines the required proof of work, GitHub deliverables, and interview preparation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {goals.map((item) => {
                const isSelected = goal === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundFX.playClick();
                      setGoal(item.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                        : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between font-display font-bold text-sm mb-1">
                      <span>{item.id}</span>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-xs text-slate-400 font-body leading-snug">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Generated Learning Path */}
        {step === 4 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono-code text-emerald-400 font-semibold uppercase">
                TAILORED ROADMAP SYNTHESIZED
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              YOUR AI LEARNING PATH
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-body mb-6">
              Crafted specifically for a <strong className="text-cyan-300">{level}</strong> learner aiming for <strong className="text-cyan-300">{goal}</strong> in <strong className="text-cyan-300">{interest}</strong>.
            </p>

            {/* Visual Pathway Progression (Section 8 requirement) */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono-code">
                
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center w-full sm:w-auto">
                  <div className="text-[10px] text-slate-400">01. GOAL</div>
                  <div className="font-bold text-cyan-300">{goal}</div>
                </div>
                <span className="text-cyan-400 font-bold hidden sm:inline">→</span>
                <span className="text-cyan-400 font-bold sm:hidden">↓</span>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center w-full sm:w-auto">
                  <div className="text-[10px] text-slate-400">02. SKILLS</div>
                  <div className="font-bold text-purple-300">Prompt & Code</div>
                </div>
                <span className="text-cyan-400 font-bold hidden sm:inline">→</span>
                <span className="text-cyan-400 font-bold sm:hidden">↓</span>

                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center w-full sm:w-auto">
                  <div className="text-[10px] text-slate-400">03. AI TOOLS</div>
                  <div className="font-bold text-cyan-200">Cursor / Claude</div>
                </div>
                <span className="text-cyan-400 font-bold hidden sm:inline">→</span>
                <span className="text-cyan-400 font-bold sm:hidden">↓</span>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center w-full sm:w-auto">
                  <div className="text-[10px] text-slate-400">04. PRACTICE</div>
                  <div className="font-bold text-amber-300">Interactive Labs</div>
                </div>
                <span className="text-cyan-400 font-bold hidden sm:inline">→</span>
                <span className="text-cyan-400 font-bold sm:hidden">↓</span>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center w-full sm:w-auto">
                  <div className="text-[10px] text-slate-400">05. PROJECT</div>
                  <div className="font-bold text-indigo-300">Flagship App</div>
                </div>
                <span className="text-cyan-400 font-bold hidden sm:inline">→</span>
                <span className="text-cyan-400 font-bold sm:hidden">↓</span>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center w-full sm:w-auto">
                  <div className="text-[10px] text-slate-400">06. PORTFOLIO</div>
                  <div className="font-bold text-emerald-300">Verified Proof</div>
                </div>

              </div>
            </div>

            <div className="text-xs text-slate-300 font-body leading-relaxed mb-4">
              Estimated Completion: <strong className="text-white font-mono-code">4-6 Weeks</strong> · Weekly Commitment: <strong className="text-white font-mono-code">5-7 Hours</strong> · Final Deliverable: <strong className="text-emerald-300 font-mono-code">Live 3D Portfolio with 2 Deployed AI Projects</strong>.
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-xl text-xs font-mono-code text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl font-body font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)'
            }}
          >
            <span>{step === 4 ? 'ACTIVATE MY AI PATH' : 'Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
