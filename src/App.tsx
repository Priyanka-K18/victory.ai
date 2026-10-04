import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ScannerCursor } from './components/cursor/ScannerCursor';
import { Navbar } from './components/nav/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { WhatDoYouWantToCreate, CreationCategory } from './components/sections/WhatDoYouWantToCreate';
import { SocialProofBar } from './components/sections/SocialProofBar';
import { EveryFieldSection } from './components/sections/EveryFieldSection';
import { ToolGalaxySection } from './components/sections/ToolGalaxySection';
import { LearningPathSection } from './components/sections/LearningPathSection';
import { ProjectLabSection } from './components/sections/ProjectLabSection';
import { AIMentorSection } from './components/sections/AIMentorSection';
import { LearnByBuildingSection } from './components/sections/LearnByBuildingSection';
import { PromptLabSection } from './components/sections/PromptLabSection';
import { ProgressDashboardSection } from './components/sections/ProgressDashboardSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { CareerMatrixSection } from './components/sections/CareerMatrixSection';
import { ChallengesSection } from './components/sections/ChallengesSection';
import { CommunitySection } from './components/sections/CommunitySection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';
import { Footer } from './components/footer/Footer';

// Interactive modals and companions
import { WorkspaceModal } from './components/project-workspace/WorkspaceModal';
import { LessonSandboxModal } from './components/lesson/LessonSandboxModal';
import { PersonalizedOnboardingModal } from './components/onboarding/PersonalizedOnboardingModal';
import { PersistentAIMentor } from './components/mentor/PersistentAIMentor';
import { CommandPalette } from './components/search/CommandPalette';
import { NotificationToast, ToastItem } from './components/ui/NotificationToast';
import { KineticTickerBar } from './components/common/KineticTickerBar';

import { ProjectLabItem } from './types';
import { PROJECT_LAB_ITEMS } from './data/mockData';
import { soundFX } from './utils/audio';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [activeWorkspaceProject, setActiveWorkspaceProject] = useState<ProjectLabItem | null>(null);
  const [activeLesson, setActiveLesson] = useState<{ toolName: string; category: string } | null>(null);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [currentToast, setCurrentToast] = useState<ToastItem | null>(null);

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
      'creator-flow',
      'fields',
      'tools',
      'paths',
      'projects',
      'mentor',
      'learn-build',
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
    setCurrentToast({
      id: Date.now().toString(),
      type: 'PROJECT COMPLETED',
      title: 'Project Verified & Deployed',
      message: 'Your project has been added to your verified 3D portfolio (+1,200 XP)!'
    });
  };

  const handleOnboardingComplete = (summary: { interest: string; level: string; goal: string }) => {
    soundFX.playSuccess();
    setCurrentToast({
      id: Date.now().toString(),
      type: 'LEARNING STREAK',
      title: 'Personalized Path Activated',
      message: `Roadmap tailored for ${summary.level} in ${summary.interest} aiming for ${summary.goal}.`
    });
    scrollToSection('creator-flow');
  };

  const handleLaunchProjectFromTitle = (title: string) => {
    soundFX.playClick();
    const match = PROJECT_LAB_ITEMS.find(p => p.title.toLowerCase().includes(title.toLowerCase())) || PROJECT_LAB_ITEMS[0];
    setActiveWorkspaceProject(match);
  };

  return (
    <div
      className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200"
      style={{ background: '#05070d', cursor: 'none' }}
    >
      {/* 1. Intelligent Custom Cursor with Scanning Reticle and Dynamic Labels */}
      <ScannerCursor />

      {/* 2. Primary Navigation Bar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={scrollToSection}
        activeSection={activeSection}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* 3. Global Command Palette (⌘K) — Searches tools, lessons, projects, prompts */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={(targetId) => {
          scrollToSection(targetId);
        }}
      />

      {/* 4. Subtle Notification Toast Alert (Section 35) */}
      <NotificationToast
        toast={currentToast}
        onDismiss={() => setCurrentToast(null)}
      />

      {/* 5. Personalized Onboarding Modal (Section 8) */}
      <PersonalizedOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onCompletePath={handleOnboardingComplete}
      />

      {/* 6. Interactive "Learn By Doing" Lesson Sandbox (Section 13 & 14) */}
      <LessonSandboxModal
        isOpen={!!activeLesson}
        onClose={() => setActiveLesson(null)}
        toolName={activeLesson?.toolName}
        category={activeLesson?.category}
        onLaunchProjectWorkspace={handleLaunchProjectFromTitle}
      />

      {/* 7. Production Project Workspace Sandbox (Section 21 & 22) */}
      <WorkspaceModal
        project={activeWorkspaceProject}
        onClose={() => setActiveWorkspaceProject(null)}
        onCompleteProject={handleCompleteProject}
      />

      {/* 8. Persistent Floating AI Learning Mentor (Section 15-18) */}
      <PersistentAIMentor
        currentSection={activeSection}
        activeContextName={
          activeWorkspaceProject
            ? `Project: ${activeWorkspaceProject.title}`
            : activeLesson
            ? `Lesson: ${activeLesson.toolName}`
            : undefined
        }
      />

      {/* Continuous AI Learning Journey — SECTION 44 EXACT FLOW */}
      <main className="relative z-10">
        
        {/* 1. HERO — "LEARN AI. BUILD REAL THINGS." */}
        <HeroSection
          onStartLearning={() => setIsOnboardingOpen(true)}
          onExploreTools={() => scrollToSection('tools')}
          onOpenProject={() => scrollToSection('projects')}
        />

        {/* Social Proof Bar — Animated Stats */}
        <SocialProofBar />

        {/* Kinetic Ticker — Platform Identity */}
        <KineticTickerBar variant="highlight" />

        {/* 2. HERO USER FLOW — "WHAT DO YOU WANT TO CREATE?" (Section 7) */}
        <WhatDoYouWantToCreate
          onSelectCategory={(cat) => {
            // updates active category
          }}
          onStartPersonalizedPath={(cat) => {
            setIsOnboardingOpen(true);
          }}
          onLaunchLessonSandbox={(toolName, category) => {
            setActiveLesson({ toolName, category });
          }}
          onOpenProject={handleLaunchProjectFromTitle}
        />

        {/* 3. AI FOR EVERY FIELD — 9 Cross-Disciplinary Departments (Section 12) */}
        <EveryFieldSection
          onSelectField={(fieldId) => {
            // open details
          }}
          onLaunchPath={(fieldTitle) => {
            scrollToSection('paths');
          }}
        />

        {/* 4. AI TOOL UNIVERSE & MULTI-STAGE WORKFLOW PIPELINE (Section 9 & 10 & 11) */}
        <ToolGalaxySection
          onSelectToolLearningPath={() => scrollToSection('paths')}
          onLaunchLessonSandbox={(toolName, category) => {
            setActiveLesson({ toolName, category });
          }}
          onOpenProject={handleLaunchProjectFromTitle}
        />

        {/* Kinetic Ticker — between AI Tools & Learning Path */}
        <KineticTickerBar />

        {/* 5. PERSONALIZED 3D LEARNING PATHWAY (Goal -> Skills -> Tools -> Practice -> Project -> Portfolio) */}
        <LearningPathSection
          onLaunchProjectLab={() => scrollToSection('projects')}
        />

        {/* 6. PRODUCTION PROJECT LAB ("BUILD WITH AI" — 9 Project Categories - Section 19 & 20) */}
        <ProjectLabSection
          onOpenWorkspace={(project) => {
            soundFX.playClick();
            setActiveWorkspaceProject(project);
          }}
        />

        {/* 7. SOCRATIC AI LEARNING MENTOR TERMINAL (Section 15 & 16) */}
        <AIMentorSection />

        {/* 7.5. ACTIVE PEDAGOGY — "DON'T JUST WATCH. BUILD." */}
        <LearnByBuildingSection
          onLaunchBuild={() => scrollToSection('projects')}
        />

        {/* 8. PROMPT LAB — "MASTER THE WAY YOU TALK TO AI" (Section 26) */}
        <PromptLabSection />

        {/* 9. STUDENT COMMAND CENTER & SKILL CONSTELLATION (Section 24 & 25) */}
        <ProgressDashboardSection
          onContinueLearning={() => {
            setActiveLesson({ toolName: 'Cursor AI IDE', category: 'CODING' });
          }}
          onOpenProject={handleLaunchProjectFromTitle}
        />

        {/* Kinetic Ticker — between Dashboard & Portfolio */}
        <KineticTickerBar variant="highlight" />

        {/* 10. PORTFOLIO BUILDER — "TURN WHAT YOU LEARN INTO PROOF" (Section 23) */}
        <PortfolioSection
          userCompletedProjects={completedProjects}
        />

        {/* 11. CAREER MATRIX — FROM LEARNING TO CAREER (Section 29) */}
        <CareerMatrixSection />

        {/* 12. BUILD CHALLENGES (Section 27) */}
        <div id="challenges">
          <ChallengesSection />
        </div>

        {/* 13. AI BUILDERS COMMUNITY FEED (Section 28) */}
        <div id="community">
          <CommunitySection />
        </div>

        {/* 14. FINAL CALL TO ACTION */}
        <FinalCtaSection
          onStartLearning={() => setIsOnboardingOpen(true)}
          onExploreTools={() => scrollToSection('tools')}
        />

      </main>

      {/* Global Platform Footer */}
      <Footer onNavigateSection={scrollToSection} />
    </div>
  );
}

export default App;
