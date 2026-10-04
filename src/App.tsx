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
import { AuthModal } from './components/auth/AuthModal';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectLabItem } from './types';
import { PROJECT_LAB_ITEMS } from './data/mockData';
import { soundFX } from './utils/audio';
import { AdminDashboard } from './components/admin/AdminDashboard';

function MainApp() {
  const { profile, awardXp } = useAuth();
  const [activeSection, setActiveSection] = useState('hero');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeWorkspaceProject, setActiveWorkspaceProject] = useState<ProjectLabItem | null>(null);
  const [activeLesson, setActiveLesson] = useState<{ toolName: string; category: string } | null>(null);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [currentToast, setCurrentToast] = useState<ToastItem | null>(null);

  // Sync completed projects from Supabase profile if present
  useEffect(() => {
    if (profile?.completed_projects && profile.completed_projects.length > 0) {
      setCompletedProjects(profile.completed_projects);
    }
  }, [profile]);

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

  const handleCompleteProject = async (projectId: string) => {
    soundFX.playSuccess();
    setCompletedProjects((prev) => [...new Set([...prev, projectId])]);
    setActiveWorkspaceProject(null);
    
    // Save to Supabase backend & award XP
    await awardXp(1200, projectId);

    setCurrentToast({
      id: Date.now().toString(),
      type: 'PROJECT COMPLETED',
      title: 'Project Verified & Deployed',
      message: 'Your project has been recorded in Supabase and added to your verified 3D portfolio (+1,200 XP)!',
    });
  };

  const handleOnboardingComplete = (summary: { interest: string; level: string; goal: string }) => {
    soundFX.playSuccess();
    setCurrentToast({
      id: Date.now().toString(),
      type: 'LEARNING STREAK',
      title: 'Personalized Path Activated in Supabase',
      message: `Roadmap tailored for ${summary.level} in ${summary.interest} aiming for ${summary.goal}.`,
    });
    scrollToSection('creator-flow');
  };

  const handleLaunchProjectFromTitle = (title?: string) => {
    soundFX.playClick();
    const match = title
      ? PROJECT_LAB_ITEMS.find((p) => p.title.toLowerCase().includes(title.toLowerCase())) || PROJECT_LAB_ITEMS[0]
      : PROJECT_LAB_ITEMS[0];
    setActiveWorkspaceProject(match);
  };

  return (
    <div
      className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200"
      style={{ background: '#05070d' }}
    >
      {/* 1. Custom Scanning Cursor */}
      <ScannerCursor />

      {/* 2. Navigation Bar with Supabase Auth & Live Status */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={scrollToSection}
        activeSection={activeSection}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 3. Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={(targetId) => {
          scrollToSection(targetId);
        }}
      />

      {/* Admin Dashboard Overlay */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}

      {/* 4. Notification Toast Alert */}
      <NotificationToast
        toast={currentToast}
        onDismiss={() => setCurrentToast(null)}
      />

      {/* 5. Supabase Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(msg) =>
          setCurrentToast({
            id: Date.now().toString(),
            type: 'AUTH',
            title: 'Authentication',
            message: msg,
          })
        }
      />

      {/* 6. Personalized Onboarding Modal */}
      <PersonalizedOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onCompletePath={handleOnboardingComplete}
      />

      {/* 7. Lesson Sandbox */}
      <LessonSandboxModal
        isOpen={!!activeLesson}
        onClose={() => setActiveLesson(null)}
        toolName={activeLesson?.toolName}
        category={activeLesson?.category}
        onLaunchProjectWorkspace={handleLaunchProjectFromTitle}
      />

      {/* 8. Production Project Workspace */}
      <WorkspaceModal
        project={activeWorkspaceProject}
        onClose={() => setActiveWorkspaceProject(null)}
        onCompleteProject={handleCompleteProject}
      />

      {/* 9. Socratic AI Learning Mentor */}
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

      {/* Main Pages Flow */}
      <main className="relative z-10">
        
        {/* 1. HERO — "LEARN AI. BUILD REAL THINGS." */}
        <HeroSection
          onStartLearning={() => setIsOnboardingOpen(true)}
          onExploreTools={() => scrollToSection('tools')}
          onOpenProject={handleLaunchProjectFromTitle}
          onNavigateSection={scrollToSection}
          onShowToast={(title, message, type) =>
            setCurrentToast({
              id: Date.now().toString(),
              title,
              message,
              type,
            })
          }
        />

        {/* Live Metrics Counter Bar */}
        <SocialProofBar />

        {/* Kinetic Ticker */}
        <KineticTickerBar variant="highlight" />

        {/* 2. CREATOR FLOW — "WHAT DO YOU WANT TO CREATE?" */}
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

        {/* 3. AI FOR EVERY FIELD */}
        <EveryFieldSection
          onSelectField={(fieldId) => {
            // open details
          }}
          onLaunchPath={(fieldTitle) => {
            scrollToSection('paths');
          }}
        />

        {/* 4. AI TOOL UNIVERSE */}
        <ToolGalaxySection
          onSelectToolLearningPath={() => scrollToSection('paths')}
          onLaunchLessonSandbox={(toolName, category) => {
            setActiveLesson({ toolName, category });
          }}
          onOpenProject={handleLaunchProjectFromTitle}
        />

        {/* Kinetic Ticker */}
        <KineticTickerBar />

        {/* 5. PERSONALIZED 3D LEARNING PATHWAY */}
        <LearningPathSection
          onLaunchProjectLab={() => scrollToSection('projects')}
        />

        {/* 6. PRODUCTION PROJECT LAB */}
        <ProjectLabSection
          onOpenWorkspace={(project) => {
            soundFX.playClick();
            setActiveWorkspaceProject(project);
          }}
        />

        {/* 7. SOCRATIC AI LEARNING MENTOR */}
        <AIMentorSection />

        {/* 7.5. ACTIVE PEDAGOGY */}
        <LearnByBuildingSection
          onLaunchBuild={() => scrollToSection('projects')}
        />

        {/* 8. PROMPT LAB */}
        <PromptLabSection />

        {/* 9. STUDENT COMMAND CENTER */}
        <ProgressDashboardSection
          onContinueLearning={() => {
            setActiveLesson({ toolName: 'Cursor AI IDE', category: 'CODING' });
          }}
          onOpenProject={handleLaunchProjectFromTitle}
        />

        {/* Kinetic Ticker */}
        <KineticTickerBar variant="highlight" />

        {/* 10. PORTFOLIO BUILDER */}
        <PortfolioSection
          userCompletedProjects={completedProjects}
        />

        {/* 11. CAREER MATRIX */}
        <CareerMatrixSection />

        {/* 12. BUILD CHALLENGES */}
        <div id="challenges">
          <ChallengesSection />
        </div>

        {/* 13. COMMUNITY FEED */}
        <div id="community">
          <CommunitySection />
        </div>

        {/* 14. FINAL CALL TO ACTION */}
        <FinalCtaSection
          onStartLearning={() => setIsOnboardingOpen(true)}
          onExploreTools={() => scrollToSection('tools')}
        />

      </main>

      {/* Global Footer */}
      <Footer onNavigateSection={scrollToSection} />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
