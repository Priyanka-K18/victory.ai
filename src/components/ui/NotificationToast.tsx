import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Cpu, 
  BookOpen, 
  Bot, 
  X 
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

export interface ToastItem {
  id: string;
  type: 'PROJECT COMPLETED' | 'NEW CHALLENGE' | 'LEARNING STREAK' | 'AI TOOL UPDATE' | 'NEW LESSON' | 'MENTOR FEEDBACK';
  title: string;
  message: string;
}

interface NotificationToastProps {
  toast: ToastItem | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  toast,
  onDismiss
}) => {
  if (!toast) return null;

  useEffect(() => {
    soundFX.playHover();
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'PROJECT COMPLETED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'LEARNING STREAK':
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 'NEW CHALLENGE':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'AI TOOL UPDATE':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'NEW LESSON':
        return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'MENTOR FEEDBACK':
        return <Bot className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
      <div 
        className="p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start gap-3 relative"
        style={{
          background: 'rgba(10, 14, 26, 0.92)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.1)'
        }}
      >
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-cyan-400">
              {toast.type}
            </span>
          </div>
          <h4 className="text-xs font-display font-bold text-white truncate">
            {toast.title}
          </h4>
          <p className="text-[11px] text-slate-400 font-body leading-snug mt-0.5">
            {toast.message}
          </p>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-500 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
