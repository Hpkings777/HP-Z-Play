import React from 'react';
import { useThemeStore } from './store';
import { Trophy, Shield, Zap, Clock, Target, Medal, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Achievement } from '../core/localdb';

const Profile = () => {
  const { level, xp, stats, achievements } = useThemeStore();
  const nextLevelXp = level * 1000;
  const progress = (xp / nextLevelXp) * 100;

  const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      if (h > 0) return `${h}h ${m}m`;
      return `${m}m`;
  };

  const ACHIEVEMENT_DEFINITIONS = [
    { id: 'first-blood', title: 'First Blood', desc: 'Play your first game', icon: <Target size={18} />, color: 'text-red-500 bg-red-500/10' },
    { id: 'night-owl', title: 'Night Owl', desc: 'Play between 12AM - 4AM', icon: <Clock size={18} />, color: 'text-blue-500 bg-blue-500/10' },
    { id: 'collector', title: 'Collector', desc: 'Favorite 10 games', icon: <Shield size={18} />, color: 'text-purple-500 bg-purple-500/10' },
    { id: 'champion', title: 'Champion', desc: 'Reach Level 10', icon: <Trophy size={18} />, color: 'text-yellow-500 bg-yellow-500/10' },
    { id: 'dedicated', title: 'Dedicated', desc: 'Play for 10 hours', icon: <Zap size={18} />, color: 'text-orange-500 bg-orange-500/10' },
  ];

  const isUnlocked = (id: string) => achievements.some(a => a.id === id && a.unlocked);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto pb-24">
      {/* Local Data Warning */}
      <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start gap-3 text-yellow-700 dark:text-yellow-400">
          <AlertTriangle className="shrink-0 mt-0.5" size={20} />
          <div>
              <h4 className="font-bold text-sm">Local Data Only</h4>
              <p className="text-xs opacity-90 mt-1">Your progress, stats, and favorites are currently saved to this device only. Sign in (Coming Soon) to sync your data across devices.</p>
          </div>
      </div>

      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-blue-900 dark:to-gray-900 text-white p-8 md:p-12 mb-8 shadow-2xl">
         <div className="absolute top-0 right-0 p-12 opacity-10">
            <Shield size={200} />
         </div>

         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
               <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 p-1">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="Avatar"
                    className="w-full h-full rounded-full bg-gray-900"
                  />
               </div>
               <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg">
                 {level}
               </div>
            </div>

            <div className="text-center md:text-left flex-1">
               <h1 className="text-3xl font-bold mb-2">Guest Player</h1>
               <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-300 mb-6">
                  <span className="flex items-center gap-1"><Trophy size={14} /> Rank: {level > 10 ? 'Pro' : 'Novice'}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> Joined: 2025</span>
               </div>

               {/* XP Bar */}
               <div className="w-full max-w-md">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-blue-200">
                     <span>Level {level}</span>
                     <span>{xp} / {nextLevelXp} XP</span>
                  </div>
                  <div className="h-3 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                     <motion.div
                       initial={{ width: 0 }}
                       animate={{ width: `${progress}%` }}
                       transition={{ duration: 1, ease: "easeOut" }}
                       className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Stats Column */}
         <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-lg">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="text-yellow-500" size={20} /> Quick Stats
               </h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-gray-500 text-sm">Games Played</span>
                     <span className="font-bold text-gray-900 dark:text-white">{stats.gamesPlayed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-gray-500 text-sm">Time Played</span>
                     <span className="font-bold text-gray-900 dark:text-white">{formatTime(stats.timePlayedSeconds)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-gray-500 text-sm">Achievements</span>
                     <span className="font-bold text-gray-900 dark:text-white">{achievements.length} / {ACHIEVEMENT_DEFINITIONS.length}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Achievements Column */}
         <div className="md:col-span-2">
            <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-lg h-full">
               <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Medal className="text-purple-500" size={20} /> Achievements
               </h3>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ACHIEVEMENT_DEFINITIONS.map(ach => {
                     const unlocked = isUnlocked(ach.id);
                     return (
                        <div key={ach.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${unlocked ? 'border-green-500/20 bg-green-500/5' : 'border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 opacity-60'}`}>
                            <div className={`p-3 rounded-xl ${unlocked ? ach.color : 'bg-gray-200 dark:bg-white/10 text-gray-400'}`}>
                            {ach.icon}
                            </div>
                            <div>
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{ach.title}</h4>
                            <p className="text-xs text-gray-500">{ach.desc}</p>
                            </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;
