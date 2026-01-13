import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { useThemeStore } from './store';
import { useNavigate } from 'react-router-dom';
import { Game } from './data';

interface GameCardProps extends Game {
  featured?: boolean;
}

// Haptic Feedback Helper
const triggerHaptic = (type: 'light' | 'heavy') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    // Light: Short sharp tick (15ms)
    // Heavy: Solid button press (40ms)
    navigator.vibrate(type === 'light' ? 15 : 40);
  } else {
    console.log(`📳 Haptic [${type}]`);
  }
};

const GameCard: React.FC<GameCardProps> = ({ id, title, category, color, icon, description }) => {
  const { favorites, toggleFavorite } = useThemeStore();
  const navigate = useNavigate();

  const isFav = favorites.includes(id);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic('heavy');
    navigate(`/play/${id}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic('light');
    toggleFavorite(id);
  };

  return (
    <motion.div
      layoutId={`card-${id}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/play/${id}`)}
      className="group relative overflow-hidden rounded-3xl aspect-[3/4] cursor-pointer isolate shadow-xl ring-1 ring-black/5 dark:ring-white/5 flex flex-col justify-between"
    >
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />

      {/* Premium Glass Texture Overlay */}
      <div className="absolute inset-0 bg-black/10 dark:bg-white/5 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between z-20">

        {/* Header: Category Icon & Favorite Toggle */}
        <div className="flex justify-between items-start">
           {/* Category Icon */}
           <div className="bg-black/20 backdrop-blur-md p-2.5 rounded-2xl text-white/90 shadow-sm ring-1 ring-white/10">
               {icon}
           </div>

           {/* Favorite Button */}
           <motion.button
             whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
             whileTap={{ scale: 0.8 }}
             onClick={handleFavorite}
             aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
             title={isFav ? "Remove from favorites" : "Add to favorites"}
             aria-pressed={isFav}
             className={`p-2.5 rounded-full backdrop-blur-md shadow-sm ring-1 ring-white/10 transition-all duration-300 ${
               isFav
                 ? 'bg-yellow-400/20 text-yellow-300 ring-yellow-400/50'
                 : 'bg-black/20 text-white/70 hover:text-white'
             }`}
           >
             <Star
               size={18}
               fill={isFav ? "currentColor" : "none"}
               className={`transition-all duration-300 ${isFav ? 'drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]' : ''}`}
             />
           </motion.button>
        </div>

        {/* Bottom Section: Info & Play */}
        <div className="space-y-3 relative">
          {/* Card Info Box */}
          <div className="bg-white/95 dark:bg-[#09090b]/90 backdrop-blur-xl p-4 rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-out will-change-transform">

            <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight tracking-tight truncate">{title}</h3>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-1">{category}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-500/10 dark:shadow-white/10"
            >
              <Play size={14} fill="currentColor" />
              <span className="tracking-wide">PLAY</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hover Effects: Shine & Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/20 dark:group-hover:border-white/20 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default GameCard;