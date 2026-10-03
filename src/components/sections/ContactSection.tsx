import React, { useRef, useState, useEffect } from 'react';
import { Mail, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Github, Linkedin, Twitter } from '../common/Icons';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const SOCIALS = [
  { icon: Github,   label: 'GitHub',   sub: '@nirajandev',    href: 'https://github.com',   color: '#f0f2f8' },
  { icon: Linkedin, label: 'LinkedIn', sub: 'Nirajan Khadka', href: 'https://linkedin.com', color: '#63b3ed' },
  { icon: Twitter,  label: 'Twitter',  sub: '@nirajandev',    href: 'https://twitter.com',  color: '#7c3aed' },
  { icon: Mail,     label: 'Email',    sub: 'nirajan@dev.np', href: 'mailto:nirajan@dev.np', color: '#34d399' },
];

export const ContactSection: React.FC = () => {
  const { ref, inView } = useInView();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1800);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#f0f2f8',
    outline: 'none',
  };

  const focusStyle = {
    background: 'rgba(99,179,237,0.04)',
    border: '1px solid rgba(99,179,237,0.25)',
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #07080d 0%, #0b0e16 50%, #07080d 100%)' }}
    >
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,179,237,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <span className="w-8 h-px" style={{ background: '#63b3ed' }} />
          <span className="text-[11px] font-mono-code text-[#63b3ed] tracking-widest uppercase">05 / Contact</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — text & socials */}
          <div>
            <h2 className={`font-display font-black text-4xl sm:text-5xl text-white leading-tight mb-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Let's Build<br />
              <span style={{ background: 'linear-gradient(135deg, #63b3ed, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Together.</span>
            </h2>

            <p className={`text-[#8892a4] font-body leading-relaxed mb-10 max-w-md transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Have a project in mind or want to discuss an opportunity? I'm always open to interesting conversations and collaborations. Let's create something amazing.
            </p>

            {/* Socials */}
            <div className={`space-y-3 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(99,179,237,0.04)'; e.currentTarget.style.borderColor = 'rgba(99,179,237,0.2)'; }}
                  onMouseOut={(e)  => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-display font-bold group-hover:text-[#63b3ed] transition-colors">{s.label}</div>
                    <div className="text-[#454d5c] text-xs font-mono-code">{s.sub}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#454d5c] ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className={`transition-all duration-700 delay-[400ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center glass-panel rounded-3xl p-10">
                <CheckCircle className="w-14 h-14 text-[#34d399] mb-4" />
                <h3 className="font-display font-black text-2xl text-white mb-2">Message Sent!</h3>
                <p className="text-[#8892a4] font-body text-sm">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 text-xs font-mono-code text-[#63b3ed] hover:underline"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-7 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono-code text-[#8892a4] uppercase tracking-wider mb-1.5">Name</label>
                    <input
                      type="text" required
                      placeholder="Your name"
                      value={formState.name}
                      onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body placeholder-[#454d5c] transition-all duration-200"
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono-code text-[#8892a4] uppercase tracking-wider mb-1.5">Email</label>
                    <input
                      type="email" required
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body placeholder-[#454d5c] transition-all duration-200"
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono-code text-[#8892a4] uppercase tracking-wider mb-1.5">Subject</label>
                  <input
                    type="text" required
                    placeholder="What's this about?"
                    value={formState.subject}
                    onChange={e => setFormState(p => ({ ...p, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm font-body placeholder-[#454d5c] transition-all duration-200"
                    style={inputStyle}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-code text-[#8892a4] uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    required rows={5}
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm font-body placeholder-[#454d5c] resize-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-display font-bold text-sm text-black transition-all duration-300 disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #63b3ed 0%, #7c3aed 100%)',
                    boxShadow: '0 0 24px rgba(99,179,237,0.35)',
                  }}
                  onMouseOver={(e) => { if (!sending) (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(99,179,237,0.55)'; }}
                  onMouseOut={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(99,179,237,0.35)'; }}
                >
                  {sending ? (
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
