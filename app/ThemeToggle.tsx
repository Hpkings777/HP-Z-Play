import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from './store';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50"
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-blue-400" strokeWidth={2.5} />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" strokeWidth={2.5} />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;