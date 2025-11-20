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
  const { addRecent, addXp } = useThemeStore();
  const game = GAMES.find(g => g.id === id);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    if (id) {
      addRecent(id);
      setIframeSrc(loadGame(id));
      // Simulate game session XP gain
      const xpInterval = setInterval(() => {
        addXp(5);
      }, 10000); // 5 XP every 10 seconds of "play"

      return () => clearInterval(xpInterval);
    }
  }, [id, addRecent, addXp]);

  useEffect(() => {
    // Simulate Asset Loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15);
      });
    }, 200);
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
          className="pointer-events-auto p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-mono text-white/80 uppercase tracking-widest">Live Session</span>
        </div>
        <button className="pointer-events-auto p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10">
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Game Container */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center"
            >
               <div className="relative w-24 h-24 mb-8">
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
                 />
                 <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                    {game.icon}
                 </div>
               </div>
               <h2 className="text-2xl font-black text-white tracking-tight mb-2">{game.title}</h2>
               <p className="text-gray-500 text-sm mb-6 font-mono">INITIALIZING ENGINE v2.5...</p>

               <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                 <motion.div
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   className="h-full bg-blue-500"
                 />
               </div>
               <p className="mt-2 text-xs text-gray-600 font-mono">{progress}% loaded</p>
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
