import config from './config.json';

export interface GameConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  color: string;
  icon: string;
  rating: number;
  players: string;
  path: string;
}

export function getGameConfig(gameId: string): GameConfig | undefined {
  return config.games.find(g => g.id === gameId);
}

export function getAllGames(): GameConfig[] {
  return config.games;
}

export function loadGame(gameId: string): string {
  const game = getGameConfig(gameId);
  if (!game) return 'about:blank';
  return game.path;
}
