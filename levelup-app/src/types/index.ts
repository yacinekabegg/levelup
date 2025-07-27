// Types pour les domaines de vie
export interface LifeDomain {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  priority: number;
}

// Types pour les défis
export interface Challenge {
  id: string;
  title: string;
  description: string;
  domain: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // en minutes
  xpReward: number;
  tags: string[];
  isActive: boolean;
  createdAt: string;
}

// Types pour l'utilisateur
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: Avatar;
  level: number;
  xp: number;
  maxXp: number;
  totalXp: number;
  selectedDomains: string[];
  completedChallenges: string[];
  badges: Badge[];
  streak: number;
  lastLoginDate: string;
  createdAt: string;
}

// Types pour l'avatar
export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  level: number;
  equipment: Equipment[];
  accessories: Accessory[];
}

// Types pour l'équipement
export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'shield' | 'helmet';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  bonus: number;
  icon: string;
}

// Types pour les accessoires
export interface Accessory {
  id: string;
  name: string;
  type: 'pet' | 'aura' | 'effect';
  icon: string;
  animation?: string;
}

// Types pour les badges
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: string;
  condition: string;
}

// Types pour les défis quotidiens
export interface DailyChallenge {
  id: string;
  challenge: Challenge;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  notes?: string;
}

// Types pour les statistiques
export interface Stats {
  totalChallengesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalXpEarned: number;
  favoriteDomain: string;
  averageCompletionTime: number;
  badgesUnlocked: number;
}

// Types pour les notifications
export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Types pour les récompenses
export interface Reward {
  id: string;
  type: 'xp' | 'badge' | 'equipment' | 'accessory';
  value: number | string;
  description: string;
  icon: string;
}

// Types pour les missions
export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  challenges: string[];
  reward: Reward;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  expiresAt?: string;
}

// Types pour les paramètres utilisateur
export interface UserSettings {
  notifications: {
    dailyReminder: boolean;
    weeklyReport: boolean;
    achievementAlerts: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'en';
  privacy: {
    shareProgress: boolean;
    showBadges: boolean;
  };
} 