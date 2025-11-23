import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toggleFav, getFavs, getStats, saveStats, getAchievements, saveAchievements, UserStats, Achievement } from '../core/localdb';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // User Data
  favorites: string[];
  toggleFavorite: (id: string) => void;

  recent: string[];
  addRecent: (id: string) => void;

  // Stats
  stats: UserStats;
  incrementTimePlayed: (seconds: number) => void;

  // Gamification
  xp: number;
  level: number;
  addXp: (amount: number) => void;

  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      favorites: getFavs(),
      toggleFavorite: (id) => {
         const newFavs = toggleFav(id);
         set({ favorites: newFavs });

         // Check Achievement: Collector (10 favorites)
         if (newFavs.length >= 10) {
             get().unlockAchievement('collector');
         }
      },

      recent: [],
      addRecent: (id) => set((state) => {
        const newRecent = [id, ...state.recent.filter(r => r !== id)].slice(0, 5);

        // Update Stats: Games Played
        const newStats = { ...state.stats, gamesPlayed: state.stats.gamesPlayed + 1 };
        saveStats(newStats); // Sync with localdb

        // Check Achievement: First Blood (1st game)
        if (newStats.gamesPlayed >= 1) {
            get().unlockAchievement('first-blood');
        }

        return { recent: newRecent, stats: newStats };
      }),

      stats: getStats(),
      incrementTimePlayed: (seconds) => set((state) => {
        const newStats = { ...state.stats, timePlayedSeconds: state.stats.timePlayedSeconds + seconds };
        saveStats(newStats);

        // Check Achievement: Night Owl (Time check is done at playtime, but total time achievement could be here)
        // Let's check for "Dedicated" (e.g., 10 hours)
        if (newStats.timePlayedSeconds >= 36000) { // 10 hours
             get().unlockAchievement('dedicated');
        }

        return { stats: newStats };
      }),

      xp: 0,
      level: 1,
      addXp: (amount) => set((state) => {
        let currentXp = state.xp + amount;
        let currentLevel = state.level;
        let nextLevelXp = currentLevel * 1000;

        while (currentXp >= nextLevelXp) {
          currentXp -= nextLevelXp;
          currentLevel++;
          nextLevelXp = currentLevel * 1000;
        }

        // Check Achievement: Champion (Level 10)
        if (currentLevel >= 10) {
             get().unlockAchievement('champion');
        }

        return { xp: currentXp, level: currentLevel };
      }),

      achievements: getAchievements(),
      unlockAchievement: (id) => set((state) => {
          if (state.achievements.some(a => a.id === id && a.unlocked)) return {}; // Already unlocked

          const newAchievement: Achievement = { id, unlocked: true, unlockedAt: Date.now() };
          const newList = [...state.achievements, newAchievement];
          saveAchievements(newList);
          return { achievements: newList };
      })
    }),
    {
      name: 'hp-zplay-storage',
      partialize: (state) => ({
          theme: state.theme,
          xp: state.xp,
          level: state.level,
          // We rely on localdb.ts for the source of truth for complex objects,
          // but Zustand persist is useful for caching them in memory/init.
          // To avoid conflicts, we might want to NOT persist stats/achievements here if we load them from getStats() on init.
          // However, getStats() is only called once on create.
          // Let's allow Zustand to persist everything to keep it simple,
          // knowing that saveStats/saveAchievements are also called for redundancy/future-proofing.
      })
    }
  )
);
