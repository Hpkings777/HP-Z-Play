import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Maximize2, AlertTriangle, Terminal } from 'lucide-react';
import { GAMES } from './data';
import { useThemeStore } from './store';
import { loadGame } from '../core/loader';

const GamePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addRecent, addXp, incrementTimePlayed } = useThemeStore();
  const game = GAMES.find(g => g.id === id);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('INITIALIZING');
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    if (id) {
      addRecent(id);
      setIframeSrc(loadGame(id));
      // Simulate game session XP gain
      const xpInterval = setInterval(() => {
        addXp(5);
        incrementTimePlayed(10);
      }, 10000); // 5 XP every 10 seconds of "play"

      return () => clearInterval(xpInterval);
    }
  }, [id, addRecent, addXp, incrementTimePlayed]);

  useEffect(() => {
    // Extended Loading Simulation (4-6 seconds)
    // Total steps approx 100. To get ~5000ms, each step should be around 50ms avg, incrementing by ~1.
    // We'll use a variable increment to make it look organic but ensuring it takes time.

    let currentProgress = 0;
    const duration = 4000 + Math.random() * 2000; // 4-6 seconds
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    const incrementPerStep = 100 / totalSteps;

    const interval = setInterval(() => {
      currentProgress += incrementPerStep + (Math.random() * 0.5 - 0.25); // Add some jitter

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setLoadingStage('READY');
        setTimeout(() => setLoading(false), 800); // Fade out delay
      }

      setProgress(Math.min(currentProgress, 100));

      // Update stage text based on progress
      if (currentProgress < 30) setLoadingStage('INITIALIZING ENGINE');
      else if (currentProgress < 60) setLoadingStage('LOADING ASSETS');
      else if (currentProgress < 85) setLoadingStage('CONNECTING TO SERVER');
      else if (currentProgress < 100) setLoadingStage('FINALIZING');

    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  if (!game) return (
    <div className="flex items-center justify-center h-screen text-white">
       <div className="text-center">
         <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
         <h2 className="text-xl font-bold">Game Not Found</h2>
         <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-white text-black rounded-full font-bold">Return Home</button>
       </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Immersive Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          title="Go back"
          className="pointer-events-auto p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-mono text-white/80 uppercase tracking-widest">Live Session</span>
        </div>
        <button
          aria-label="Maximize game"
          title="Maximize game"
          className="pointer-events-auto p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Game Container */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center z-50"
            >
               <div className="relative w-32 h-32 mb-10">
                 {/* Outer Ring */}
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 border-2 border-blue-500/20 border-t-blue-500 rounded-full"
                 />
                 {/* Inner Ring */}
                 <motion.div
                   animate={{ rotate: -180 }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-2 border-2 border-purple-500/20 border-b-purple-500 rounded-full"
                 />
                 {/* Pulse Effect */}
                 <div className="absolute inset-0 bg-blue-500/5 rounded-full animate-pulse" />

                 {/* Icon */}
                 <div className="absolute inset-0 flex items-center justify-center text-white/90 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {React.isValidElement(game.icon) ? React.cloneElement(game.icon as React.ReactElement, { size: 40 }) : game.icon}
                 </div>
               </div>

               <motion.h2
                  key={game.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-black text-white tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
                >
                  {game.title}
               </motion.h2>

               <motion.p
                 key={loadingStage}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-blue-400/80 text-xs mb-8 font-mono tracking-[0.2em] uppercase"
               >
                 {loadingStage}...
               </motion.p>

               {/* Progress Bar Container */}
               <div className="w-72 h-1.5 bg-white/5 rounded-full overflow-hidden relative backdrop-blur-sm ring-1 ring-white/10">
                 {/* Glowing Progress Bar */}
                 <motion.div
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   transition={{ type: "spring", stiffness: 20, damping: 10 }} // Smooth springy progress
                   className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 relative"
                 >
                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                 </motion.div>
               </div>

               <div className="mt-3 flex justify-between w-72 text-[10px] font-mono text-gray-600">
                  <span>SYSTEM_READY</span>
                  <span>{Math.round(progress)}%</span>
               </div>
            </motion.div>
          ) : (
            <motion.div
              key="game-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full bg-gray-900 flex items-center justify-center relative"
            >
              {/* Real Game Iframe */}
              <iframe
                src={iframeSrc}
                title={game.title}
                className="w-full h-full border-none"
                allowFullScreen
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamePlayer;
