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
  'Hexagon': <Hexagon size={20} />,
  'Zap': <Zap size={20} />
};


