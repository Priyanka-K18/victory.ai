import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ScannerCursor } from './components/cursor/ScannerCursor';
import { Navbar } from './components/nav/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ToolGalaxySection } from './components/sections/ToolGalaxySection';
import { EveryFieldSection } from './components/sections/EveryFieldSection';
import { LearningPathSection } from './components/sections/LearningPathSection';
import { ProjectLabSection } from './components/sections/ProjectLabSection';
import { AIMentorSection } from './components/sections/AIMentorSection';
import { PromptLabSection } from './components/sections/PromptLabSection';
import { ProgressDashboardSection } from './components/sections/ProgressDashboardSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { CareerMatrixSection } from './components/sections/CareerMatrixSection';
import { ChallengesSection } from './components/sections/ChallengesSection';
import { CommunitySection } from './components/sections/CommunitySection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';
import { Footer } from './components/footer/Footer';
import { WorkspaceModal } from './components/project-workspace/WorkspaceModal';
import { CommandPalette } from './components/search/CommandPalette';
import { ProjectLabItem } from './types';
import { soundFX } from './utils/audio';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeWorkspaceProject, setActiveWorkspaceProject] = useState<ProjectLabItem | null>(null);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);

  // Smooth scrolling with Lenis
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll spy to update active navbar item
  useEffect(() => {
    const SECTIONS = [
      'hero',
      'tools',
      'fields',
      'paths',
      'projects',
      'mentor',
      'prompt-lab',
      'dashboard',
      'portfolio',
      'career',
      'challenges',
      'community',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    soundFX.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCompleteProject = (projectId: string) => {
    soundFX.playSuccess();
    setCompletedProjects(prev => [...new Set([...prev, projectId])]);
    setActiveWorkspaceProject(null);
  };

  return (
    <div
      className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200"
      style={{ background: '#05070d', cursor: 'none' }}
    >
      {/* Dynamic Cursor with Scanning Rings and Custom Labels */}
      <ScannerCursor />

      {/* Primary Fixed Floating Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={(targetId) => {
          scrollToSection(targetId);
        }}
      />

      {/* Interactive Project Learning Sandbox / Workspace */}
      <WorkspaceModal
        project={activeWorkspaceProject}
        onClose={() => setActiveWorkspaceProject(null)}
        onCompleteProject={handleCompleteProject}
      />

      {/* Continuous AI Learning Journey */}
      <main className="relative z-10">
        
        {/* 1. HERO — "LEARN AI. BUILD REAL THINGS." */}
        <HeroSection
          onStartLearning={() => scrollToSection('paths')}
          onExploreTools={() => scrollToSection('tools')}
          onOpenProject={() => scrollToSection('projects')}
        />

        {/* 2. AI TOOL EXPLORER & WORKFLOW PIPELINE SYSTEM */}
        <ToolGalaxySection
          onSelectToolLearningPath={() => scrollToSection('paths')}
        />

        {/* 3. AI FOR EVERY FIELD */}
        <div id="fields">
          <EveryFieldSection
            onSelectField={(fieldId) => {
              scrollToSection('tools');
            }}
          />
        </div>

        {/* 4. SPATIAL 3D LEARNING PATHS (Goal -> Skills -> Tools -> Practice -> Project -> Deploy -> Portfolio) */}
        <LearningPathSection
          onLaunchProjectLab={() => scrollToSection('projects')}
        />

        {/* 5. PRODUCTION PROJECT LAB ("BUILD WITH AI" — 3D Project Gallery) */}
        <ProjectLabSection
          onOpenWorkspace={(project) => {
            soundFX.playClick();
            setActiveWorkspaceProject(project);
          }}
        />

        {/* 6. AI MENTOR 24/7 (Futuristic Conversational Learning Partner) */}
        <AIMentorSection />

        {/* 7. PROMPT ENGINEERING LAB (Kinetic Typography: Bad -> Better -> Expert) */}
        <PromptLabSection />

        {/* 8. STUDENT DASHBOARD (My AI Learning Command Center & 3D Constellation) */}
        <div id="dashboard">
          <ProgressDashboardSection />
        </div>

        {/* 9. PORTFOLIO BUILDER & STUDENT SHOWCASE */}
        <PortfolioSection
          userCompletedProjects={completedProjects}
        />

        {/* 10. CAREER MATRIX (From Learning to Career: Skills -> Projects -> Portfolio -> Resume -> Interview) */}
        <CareerMatrixSection />

        {/* 11. WEEKEND AI HACKATHONS & CHALLENGES */}
        <div id="challenges">
          <ChallengesSection />
        </div>

        {/* 12. BUILDER COMMUNITY */}
        <div id="community">
          <CommunitySection />
        </div>

        {/* 13. FINAL CALL TO ACTION */}
        <FinalCtaSection
          onStartLearning={() => scrollToSection('paths')}
          onExploreTools={() => scrollToSection('tools')}
        />

      </main>

      {/* Global Platform Footer */}
      <Footer onNavigateSection={scrollToSection} />
    </div>
  );
}

export default App;
