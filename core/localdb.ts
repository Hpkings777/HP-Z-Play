
// Data Access Layer (Mocking a future Database)

// --- Favorites ---
export function getFavs(): string[] {
  try {
    return JSON.parse(localStorage.getItem("favs") || "[]");
  } catch (e) {
    console.error("Failed to parse favorites", e);
    return [];
  }
}

export function toggleFav(id: string): string[] {
  let favs = getFavs();
  if (favs.includes(id)) {
    favs = favs.filter(x => x !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem("favs", JSON.stringify(favs));
  return favs;
}

// --- Profile & Settings ---
export interface Profile {
  name: string;
  avatar: string;
  prefs: Record<string, any>;
}

export function getProfile(): Profile {
  const defaultProfile: Profile = {
    name: "Guest Player",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    prefs: {}
  };
  try {
    const stored = localStorage.getItem("profile");
    return stored ? JSON.parse(stored) : defaultProfile;
  } catch (e) {
    return defaultProfile;
  }
}

export function saveProfile(profile: Profile) {
  localStorage.setItem("profile", JSON.stringify(profile));
}

// --- Stats ---
export interface UserStats {
  gamesPlayed: number;
  timePlayedSeconds: number;
  wins: number; // Placeholder, hard to track generically
}

export function getStats(): UserStats {
  const defaultStats: UserStats = { gamesPlayed: 0, timePlayedSeconds: 0, wins: 0 };
  try {
    const stored = localStorage.getItem("user_stats");
    return stored ? JSON.parse(stored) : defaultStats;
  } catch (e) {
    return defaultStats;
  }
}

export function saveStats(stats: UserStats) {
  localStorage.setItem("user_stats", JSON.stringify(stats));
}

// --- Achievements ---
export interface Achievement {
  id: string;
  unlocked: boolean;
  unlockedAt?: number; // Timestamp
}

export function getAchievements(): Achievement[] {
  try {
    return JSON.parse(localStorage.getItem("user_achievements") || "[]");
  } catch (e) {
    return [];
  }
}

export function saveAchievements(achievements: Achievement[]) {
  localStorage.setItem("user_achievements", JSON.stringify(achievements));
}
