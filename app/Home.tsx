import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { Zap, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAMES } from './data';

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

// Premium "Z-Portal" Loading Animation
const PortalLoader = () => (
  <div className="flex flex-col items-center justify-center py-20 w-full relative overflow-hidden min-h-[400px]">

    {/* Ambient Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />

    <div className="relative z-10 flex flex-col items-center gap-10">

      {/* Main Graphic Composition */}
      <div className="relative w-32 h-32">

         {/* Layer 1: Outer Dashed Ring - Slow Rotation */}
         <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 dark:border-white/10 w-full h-full"
         />

         {/* Layer 2: Gradient Arc - Medium Rotation */}
         <div className="absolute inset-0 p-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <defs>
                 <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#2563eb" /> {/* blue-600 */}
                   <stop offset="100%" stopColor="#9333ea" /> {/* purple-600 */}
                 </linearGradient>
               </defs>
               <motion.circle
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 0.75, opacity: 1, rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 cx="50" cy="50" r="42"
                 fill="none"
                 stroke="url(#loaderGradient)"
                 strokeWidth="4"
                 strokeLinecap="round"
                 className="origin-center"
               />
            </svg>
         </div>

         {/* Layer 3: Inner Reverse Hexagon */}
         <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center text-blue-500/50 dark:text-blue-400/50"
         >
            <Hexagon size={40} strokeWidth={1.5} />
         </motion.div>

         {/* Layer 4: Central Pulse Core */}
         <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            />
         </div>
      </div>

      {/* Text & Progress */}
      <div className="flex flex-col items-center gap-3">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-3"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase">
            System Sync
          </span>
        </motion.div>

        {/* Scifi Progress Bar */}
        <div className="h-1 w-32 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden relative">
           <motion.div
             animate={{ x: ["-100%", "100%"] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"
           />
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network latency for premium feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
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
        Trending Now
      </h2>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PortalLoader />
          </motion.div>
        ) : (
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;