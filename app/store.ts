import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toggleFav, getFavs } from '../core/localdb';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // User Data
  favorites: string[];
  toggleFavorite: (id: string) => void;

  recent: string[];
  addRecent: (id: string) => void;

  // Gamification
  xp: number;
  level: number;
  addXp: (amount: number) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      favorites: getFavs(),
      toggleFavorite: (id) => {
         // Use the core logic but also update state to trigger re-renders
         const newFavs = toggleFav(id);
         set({ favorites: newFavs });
      },

      recent: [],
      addRecent: (id) => set((state) => {
        const newRecent = [id, ...state.recent.filter(r => r !== id)].slice(0, 5); // Keep last 5 unique
        return { recent: newRecent };
      }),

      xp: 0,
      level: 1,
      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        // Simple level up logic: Level * 1000 XP required
        const nextLevelXp = state.level * 1000;
        if (newXp >= nextLevelXp) {
          return { xp: newXp - nextLevelXp, level: state.level + 1 };
        }
        return { xp: newXp };
      })
    }),
    {
      name: 'hp-zplay-storage',
      // We might want to partialise or filter what we persist if we are using external localdb for favs
      // But for now, since zustand persist syncs to localstorage too, we might have double storage or need to be careful.
      // The user wanted localdb.js to handle favs.
      // If I use localdb.js, I should probably rely on it for source of truth for favs.
    }
  )
);
