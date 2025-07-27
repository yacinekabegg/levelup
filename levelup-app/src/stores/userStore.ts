import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Challenge, DailyChallenge, Badge, Stats } from '@/types';
import { getDailyChallenges } from '@/data/challenges';

interface UserState {
  // Données utilisateur
  user: User | null;
  isOnboarded: boolean;
  
  // Défis quotidiens
  dailyChallenges: DailyChallenge[];
  
  // Statistiques
  stats: Stats;
  
  // Actions
  initializeUser: (username: string, email: string, selectedDomains: string[]) => void;
  completeChallenge: (challengeId: string) => void;
  startChallenge: (challengeId: string) => void;
  failChallenge: (challengeId: string) => void;
  generateDailyChallenges: () => void;
  addXp: (amount: number) => void;
  levelUp: () => void;
  unlockBadge: (badge: Badge) => void;
  updateStats: () => void;
  resetUser: () => void;
}

const calculateMaxXp = (level: number): number => {
  return Math.floor(100 * Math.pow(1.2, level - 1));
};

const createInitialUser = (username: string, email: string, selectedDomains: string[]): User => {
  return {
    id: Date.now().toString(),
    username,
    email,
    avatar: {
      id: 'avatar-1',
      name: 'Débutant',
      emoji: '😊',
      level: 1,
      equipment: [],
      accessories: []
    },
    level: 1,
    xp: 0,
    maxXp: calculateMaxXp(1),
    totalXp: 0,
    selectedDomains: selectedDomains,
    completedChallenges: [],
    badges: [],
    streak: 0,
    lastLoginDate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
};

const createInitialStats = (): Stats => {
  return {
    totalChallengesCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalXpEarned: 0,
    favoriteDomain: '',
    averageCompletionTime: 0,
    badgesUnlocked: 0
  };
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isOnboarded: false,
      dailyChallenges: [],
      stats: createInitialStats(),

      initializeUser: (username: string, email: string, selectedDomains: string[]) => {
        const user = createInitialUser(username, email, selectedDomains);
        set({ user, isOnboarded: true });
        get().generateDailyChallenges();
      },

      completeChallenge: (challengeId: string) => {
        const { user, dailyChallenges } = get();
        if (!user) return;

        // Mettre à jour le défi quotidien
        const updatedDailyChallenges = dailyChallenges.map(dc => {
          if (dc.challenge.id === challengeId) {
            return {
              ...dc,
              status: 'completed' as const,
              completedAt: new Date().toISOString()
            };
          }
          return dc;
        });

        // Trouver le défi pour obtenir les XP
        const completedChallenge = dailyChallenges.find(dc => dc.challenge.id === challengeId);
        if (completedChallenge) {
          get().addXp(completedChallenge.challenge.xpReward);
          
          // Ajouter aux défis complétés
          const updatedUser = {
            ...user,
            completedChallenges: [...user.completedChallenges, challengeId]
          };
          
          set({ 
            user: updatedUser, 
            dailyChallenges: updatedDailyChallenges 
          });
          
          get().updateStats();
        }
      },

      startChallenge: (challengeId: string) => {
        const { dailyChallenges } = get();
        const updatedDailyChallenges = dailyChallenges.map(dc => {
          if (dc.challenge.id === challengeId) {
            return {
              ...dc,
              status: 'in-progress' as const,
              startedAt: new Date().toISOString()
            };
          }
          return dc;
        });
        set({ dailyChallenges: updatedDailyChallenges });
      },

      failChallenge: (challengeId: string) => {
        const { dailyChallenges } = get();
        const updatedDailyChallenges = dailyChallenges.map(dc => {
          if (dc.challenge.id === challengeId) {
            return {
              ...dc,
              status: 'failed' as const
            };
          }
          return dc;
        });
        set({ dailyChallenges: updatedDailyChallenges });
      },

      generateDailyChallenges: () => {
        const { user } = get();
        if (!user) return;

        const challenges = getDailyChallenges(user.selectedDomains, 3);
        const dailyChallenges: DailyChallenge[] = challenges.map(challenge => ({
          id: `daily-${Date.now()}-${challenge.id}`,
          challenge,
          status: 'pending' as const
        }));

        set({ dailyChallenges });
      },

      addXp: (amount: number) => {
        const { user } = get();
        if (!user) return;

        const newXp = user.xp + amount;
        const newTotalXp = user.totalXp + amount;
        
        let newLevel = user.level;
        let newMaxXp = user.maxXp;
        
        // Vérifier si l'utilisateur monte de niveau
        if (newXp >= user.maxXp) {
          newLevel = user.level + 1;
          newMaxXp = calculateMaxXp(newLevel);
        }

        const updatedUser = {
          ...user,
          xp: newXp,
          maxXp: newMaxXp,
          totalXp: newTotalXp,
          level: newLevel
        };

        set({ user: updatedUser });
        
        // Si l'utilisateur a monté de niveau
        if (newLevel > user.level) {
          get().levelUp();
        }
      },

      levelUp: () => {
        const { user } = get();
        if (!user) return;

        // Mettre à jour l'avatar selon le niveau
        const avatarNames = [
          'Débutant', 'Apprenti', 'Aventurier', 'Héros', 'Légende',
          'Maître', 'Sage', 'Champion', 'Légende', 'Divin'
        ];
        
        const avatarEmojis = [
          '😊', '😎', '🤩', '😤', '😈',
          '👑', '🌟', '💫', '✨', '👼'
        ];

        const avatarIndex = Math.min(Math.floor(user.level / 10), avatarNames.length - 1);
        
        const updatedUser = {
          ...user,
          avatar: {
            ...user.avatar,
            name: avatarNames[avatarIndex],
            emoji: avatarEmojis[avatarIndex],
            level: user.level
          }
        };

        set({ user: updatedUser });
      },

      unlockBadge: (badge: Badge) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = {
          ...user,
          badges: [...user.badges, badge]
        };

        set({ user: updatedUser });
        get().updateStats();
      },

      updateStats: () => {
        const { user } = get();
        if (!user) return;

        const stats: Stats = {
          totalChallengesCompleted: user.completedChallenges.length,
          currentStreak: user.streak,
          longestStreak: user.streak, // À améliorer avec un historique
          totalXpEarned: user.totalXp,
          favoriteDomain: user.selectedDomains[0] || '',
          averageCompletionTime: 0, // À calculer avec un historique
          badgesUnlocked: user.badges.length
        };

        set({ stats });
      },

      resetUser: () => {
        set({
          user: null,
          isOnboarded: false,
          dailyChallenges: [],
          stats: createInitialStats()
        });
      }
    }),
    {
      name: 'levelup-user-storage',
      partialize: (state) => ({
        user: state.user,
        isOnboarded: state.isOnboarded,
        stats: state.stats
      })
    }
  )
); 