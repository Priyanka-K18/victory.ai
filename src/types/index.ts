export type CategoryId = 
  | 'coding'
  | 'design'
  | 'video'
  | 'marketing'
  | 'business'
  | 'data'
  | 'education'
  | 'automation';

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  tagline: string;
  description: string;
  tools: string[];
  sampleProject: string;
  accentColor: string;
  iconName: string;
}

export interface AITool {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  whoShouldUse: string;
  whatYouCanBuild: string[];
  skillsGained: string[];
  relatedTools: string[];
  learningPathRef: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  badge?: string;
  iconColor: string;
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  projectsUsingThisTool?: string[];
  howToUseIt?: string[];
  bestWorkflows?: string[];
}

export interface TaskWorkflow {
  id: string;
  title: string;
  description: string;
  steps: {
    stage: string;
    description: string;
    recommendedTools: string[];
    proTip: string;
  }[];
}

export interface LearningPathNode {
  id: string;
  title: string;
  type: 'goal' | 'skills' | 'ai-tools' | 'practice' | 'project' | 'deploy' | 'portfolio';
  status: 'completed' | 'active' | 'locked';
  duration: string;
  description: string;
  deliverable: string;
  skills: string[];
}

export interface ProjectLabItem {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  technologies: string[];
  aiTools: string[];
  objective: string;
  skillsAcquired: string[];
  stepsCount: number;
  finalDeliverable: string;
  imageAccent: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  aiToolsUsed: string[];
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  metrics: string;
  featured: boolean;
}

export interface ChallengeItem {
  id: string;
  title: string;
  category: string;
  daysRemaining: number;
  participantsCount: number;
  rewardXP: number;
  difficulty: string;
  brief: string;
  deliverables: string[];
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  role: string;
  title: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  previewSnippet: string;
  type: 'project' | 'prompt' | 'workflow' | 'experiment';
}
