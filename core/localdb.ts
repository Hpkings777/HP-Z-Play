
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

export interface Profile {
  name: string;
  avatar: string;
  prefs: Record<string, any>;
}

export function getProfile(): Profile {
  const defaultProfile: Profile = {
    name: "Guest",
    avatar: "default.png",
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
