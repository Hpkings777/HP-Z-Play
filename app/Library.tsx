import React from 'react';
import { getAllGames } from '@core/loader';
import { useThemeStore } from './store';
import GameCard from './GameCard';
import { Heart, History, Ghost } from 'lucide-react';

const Library = () => {
  const { favorites, recent } = useThemeStore();

  const allGames = getAllGames();
  const favoriteGames = allGames.filter(g => favorites.includes(g.id));
  const recentGames = recent.map(id => allGames.find(g => g.id === id)).filter(Boolean);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto pb-24">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">My Library</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your collections and jump back in.</p>
      </header>

      {/* Favorites Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
           <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500">
             <Heart size={20} />
           </div>
           <h2 className="text-xl font-bold text-gray-900 dark:text-white">Favorites</h2>
           <span className="text-sm bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-gray-500">{favoriteGames.length}</span>
        </div>

        {favoriteGames.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {favoriteGames.map(game => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
             <Ghost size={40} className="text-gray-300 dark:text-white/20 mb-4" />
             <p className="text-gray-500 dark:text-gray-400 font-medium">No favorites yet</p>
             <p className="text-sm text-gray-400">Mark games with a star to see them here.</p>
          </div>
        )}
      </section>

      {/* Recent Section */}
      {recentGames.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
             <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
               <History size={20} />
             </div>
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently Played</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {recentGames.map((game: any) => (
              <GameCard key={`recent-${game.id}`} {...game} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Library;