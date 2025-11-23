import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllGames } from '@core/loader';
import { Game } from './data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const allGames = getAllGames();
    // The type assertion is needed because the loader returns a generic object
    setGames(allGames as unknown as Game[]);
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto pb-24 md:pb-8 min-h-screen">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          HP Z-Play
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-md">
          Dive into a universe of web-based experiences. Optimized for performance and designed for you.
        </p>
      </header>

      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Zap className="text-amber-500" size={20} />
        All Games
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key="grid"
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {games.map((game) => (
            <motion.div key={game.id} variants={item}>
              <GameCard {...game} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
