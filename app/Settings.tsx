import React from 'react';
import { useThemeStore } from './store';
import { Bell, Volume2, Zap, Monitor, Moon, Sun, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const Toggle = ({ label, icon: Icon, value, onChange }: any) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl mb-3">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white dark:bg-white/10 rounded-xl text-gray-600 dark:text-gray-300 shadow-sm">
        <Icon size={20} />
      </div>
      <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
    </div>
    <button
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => onChange(!value)}
      className={`w-12 h-7 rounded-full relative transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 ${value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
      <motion.div
        initial={false}
        animate={{ x: value ? 20 : 2 }}
        className="w-5 h-5 bg-white rounded-full shadow-md absolute top-1"
      />
    </button>
  </div>
);

const Settings = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [notifications, setNotifications] = React.useState(true);
  const [sound, setSound] = React.useState(true);
  const [performance, setPerformance] = React.useState(false);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-3xl mx-auto pb-24">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="space-y-8">
        {/* Appearance Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 ml-1">Appearance</h2>
          <div className="bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 rounded-3xl p-2 shadow-lg">
             <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-white/10 rounded-xl text-gray-600 dark:text-gray-300 shadow-sm">
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">App Theme</span>
                </div>
                <button
                   onClick={toggleTheme}
                   className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-white/10 text-sm font-bold hover:bg-gray-300 dark:hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                >
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </button>
             </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 ml-1">Preferences</h2>
          <div className="bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 rounded-3xl p-2 shadow-lg">
             <Toggle
               label="Push Notifications"
               icon={Bell}
               value={notifications}
               onChange={setNotifications}
             />
             <Toggle
               label="Sound Effects"
               icon={sound ? Volume2 : VolumeX}
               value={sound}
               onChange={setSound}
             />
          </div>
        </section>

        {/* System Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 ml-1">System</h2>
          <div className="bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 rounded-3xl p-2 shadow-lg">
             <Toggle
               label="Performance Mode"
               icon={Zap}
               value={performance}
               onChange={setPerformance}
             />
             <div className="flex items-center justify-between p-4 rounded-2xl opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-white/10 rounded-xl text-gray-600 dark:text-gray-300 shadow-sm">
                    <Monitor size={20} />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Streamer Mode</span>
                </div>
                <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded">PRO</span>
             </div>
          </div>
        </section>

        <div className="text-center pt-8">
           <p className="text-xs text-gray-400">HP Z-Play v1.2.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;