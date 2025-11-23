import React from 'react';
import { Crosshair, Car, Cpu, Rocket, Flame, Sword, Snowflake, Ghost, Gamepad2, Hexagon, Zap } from 'lucide-react';
import { getAllGames } from '@core/loader';

export interface Game {
  id: string;
  title: string;
  category: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  rating: number;
  players: string;
}

const iconMap: Record<string, React.ReactNode> = {
  'crosshair': <Crosshair size={20} />,
  'car': <Car size={20} />,
  'cpu': <Cpu size={20} />,
  'rocket': <Rocket size={20} />,
  'flame': <Flame size={20} />,
  'sword': <Sword size={20} />,
  'snowflake': <Snowflake size={20} />,
  'ghost': <Ghost size={20} />,
  'dino': <Gamepad2 size={20} />,
  'hexagon': <Hexagon size={20} />,
  'zap': <Zap size={20} />,
  'gamepad2': <Gamepad2 size={20} />
};

export const GAMES: Game[] = getAllGames().map(game => {
  let icon: React.ReactNode;

  // Check if the icon looks like a file path (starts with / or ./ or has extension)
  // The sync script produces /games/... paths.
  if (game.icon.startsWith('/') || game.icon.includes('.')) {
     icon = <img src={game.icon} alt={game.name} className="w-full h-full object-cover rounded-md" />;
  } else {
     icon = iconMap[game.icon.toLowerCase()] || <Gamepad2 size={20} />;
  }

  return {
    id: game.id,
    title: game.name,
    category: game.category,
    description: game.description,
    color: game.color,
    icon: icon,
    rating: game.rating,
    players: game.players
  };
});
