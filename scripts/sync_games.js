
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAMES_DIR = path.join(__dirname, '../games');
const CONFIG_PATH = path.join(__dirname, '../core/config.json');

// Helper to convert string to Title Case
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function scanGames() {
  if (!fs.existsSync(GAMES_DIR)) {
    console.error("Games directory not found!");
    process.exit(1);
  }

  const gameDirs = fs.readdirSync(GAMES_DIR).filter(file => {
    return fs.statSync(path.join(GAMES_DIR, file)).isDirectory();
  });

  const games = gameDirs.map(dir => {
    const gamePath = path.join(GAMES_DIR, dir);
    const indexExists = fs.existsSync(path.join(gamePath, 'index.html'));

    if (!indexExists) {
        // Maybe check for other variations if needed, but user said index.html exists
        console.warn(`Skipping ${dir}: index.html not found`);
        return null;
    }

    // Check for icons
    const iconExtensions = ['png', 'jpg', 'jpeg', 'ico', 'svg', 'webp'];
    let iconPath = null;

    // Check for specific filenames first
    const possibleNames = ['icon', 'favicon', 'logo', 'cover'];

    for (const name of possibleNames) {
        for (const ext of iconExtensions) {
             if (fs.existsSync(path.join(gamePath, `${name}.${ext}`))) {
                 iconPath = `/games/${dir}/${name}.${ext}`;
                 break;
             }
        }
        if (iconPath) break;
    }

    // Fallback: check for favicon.ico specifically at root of game dir if not found above
    if (!iconPath && fs.existsSync(path.join(gamePath, 'favicon.ico'))) {
        iconPath = `/games/${dir}/favicon.ico`;
    }

    // Default fallback metadata
    return {
      id: dir,
      name: toTitleCase(dir.replace(/-/g, ' ')),
      category: "Arcade", // Default category
      description: `Play ${toTitleCase(dir.replace(/-/g, ' '))} now!`,
      color: "from-blue-500 to-cyan-500",
      icon: iconPath || "Gamepad2", // Use found path or default lucide icon name
      rating: 4.5, // Default rating
      players: "1k+", // Default players
      path: `/games/${dir}/index.html`
    };
  }).filter(g => g !== null);

  // Read existing config to preserve manually edited metadata if possible?
  // For now, we'll just overwrite/merge.
  // Ideally we should keep existing metadata (desc, category, color) if the ID matches.

  let existingConfig = { games: [] };
  if (fs.existsSync(CONFIG_PATH)) {
      try {
          existingConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      } catch (e) {
          console.error("Failed to parse existing config", e);
      }
  }

  const mergedGames = games.map(newGame => {
      const existing = existingConfig.games.find(g => g.id === newGame.id);
      if (existing) {
          // Preserve manually set fields, but ensure path and icon (if found) are up to date
          // If we found a dynamic icon, verify if we should override the existing one.
          // The user said: "prioritizing this over default icons".
          // If existing icon is a simple string (lucide name) and we found a file, we use the file.
          // If existing icon is already a path, we assume it's correct or update it.

          let icon = existing.icon;
          if (newGame.icon.startsWith('/games/')) {
              icon = newGame.icon;
          }

          return {
              ...existing,
              path: newGame.path, // Ensure path is correct
              icon: icon
          };
      }
      return newGame;
  });

  // Also keep games that are in config but maybe not on disk?
  // The user implies we should load from games folder.
  // If it's not in games folder, it probably shouldn't be in config (unless it's an external link).
  // The current config seems to have all games in /games/... so we should rely on disk scan.

  const finalConfig = { games: mergedGames };

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(finalConfig, null, 2));
  console.log(`Updated config with ${mergedGames.length} games.`);
}

scanGames();
