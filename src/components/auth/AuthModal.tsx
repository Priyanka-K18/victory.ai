import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { soundFX } from '../../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { signIn, signUp, signInAsDemo, isConnected } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    soundFX.playClick();

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      setLoading(false);
      return;
    }

    if (mode === 'signin') {
      const res = await signIn(email, password);
      if (res.error) {
        setErrorMsg(res.error);
        soundFX.playClick();
      } else {
        soundFX.playSuccess();
        if (onSuccess) onSuccess(`Welcome back, ${email.split('@')[0]}!`);
        onClose();
      }
    } else {
      if (!fullName) {
        setErrorMsg('Please provide your name for your builder profile.');
        setLoading(false);
        return;
      }
      const res = await signUp(email, password, fullName);
      if (res.error) {
        setErrorMsg(res.error);
        soundFX.playClick();
      } else {
        soundFX.playSuccess();
        if (onSuccess) onSuccess(res.message || 'Account created successfully!');
        onClose();
      }
    }
    setLoading(false);
  };

  const handleDemoLogin = () => {
    soundFX.playSuccess();
    signInAsDemo();
    if (onSuccess) onSuccess('Logged in as Alex Rivera (VIP AI Builder Demo)!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden text-slate-200"
        style={{
          background: 'linear-gradient(180deg, #090e1c 0%, #060913 100%)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.15)',
        }}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono-code mb-3">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            <span>{isConnected ? 'SUPABASE BACKEND CONNECTED' : 'INITIALIZING BACKEND...'}</span>
          </div>

          <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
            {mode === 'signin' ? 'BUILDER LOGIN' : 'CREATE BUILDER ACCOUNT'}
          </h3>
          <p className="text-xs text-slate-400 font-body mt-1">
            Access your verified project portfolio, AI mentor chat history, and XP progress.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setMode('signin');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-lg text-xs font-mono-code transition-all ${
              mode === 'signin'
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-lg text-xs font-mono-code transition-all ${
              mode === 'signup'
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SIGN UP
          </button>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono-code text-slate-300 mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono-code text-slate-300 mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="developer@victory.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono-code text-slate-300 mb-1 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] font-display font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
            ) : (
              <>
                <span>{mode === 'signin' ? 'ENTER PLATFORM' : 'INITIALIZE PROFILE'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast-Track Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-[#060913] text-[10px] font-mono-code text-slate-500 uppercase tracking-widest">
            OR EXPLORE INSTANTLY
          </span>
        </div>

        {/* Demo Student Login Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-xs font-mono-code text-slate-300 hover:text-white flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Continue as Demo Builder (Alex Rivera · 1,250 XP)</span>
        </button>

        <div className="mt-5 text-center text-[10px] font-mono-code text-slate-500">
          Secured by Supabase Row-Level Security &amp; JWT Encryption
        </div>
      </div>
    </div>
  );
};
