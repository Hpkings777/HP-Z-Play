import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAMES } from './data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  }
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay to show the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-light-bg dark:bg-dark-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-600 rounded-full shadow-lg shadow-blue-500/20"
        />
      </div>
    );
  }

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
          {GAMES.map((game) => (
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
