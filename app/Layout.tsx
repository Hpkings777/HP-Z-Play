import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Gamepad2, User, Settings, Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useThemeStore } from './store';

const NavItem = ({ to, icon: Icon, label, mobileOnly = false }: any) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col md:flex-row items-center md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all duration-200 group
      ${mobileOnly ? 'md:hidden' : ''}
      ${isActive
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 font-semibold'
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
      }`
    }
  >
    <Icon className="w-6 h-6 md:w-5 md:h-5 transition-transform group-active:scale-90 md:group-active:scale-100" />
    <span className="text-[10px] md:text-sm font-medium mt-1 md:mt-0">{label}</span>
  </NavLink>
);

const Layout = () => {
  const { theme } = useThemeStore();

  // Apply theme class to html/body
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 selection:bg-blue-500/30">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 fixed h-full border-r border-gray-200 dark:border-white/5 bg-white/70 dark:bg-[#09090b]/80 backdrop-blur-xl z-50 transition-colors duration-300">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none">HP Z-<span className="text-blue-500">Play</span></span>
            <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem to="/home" icon={Home} label="Home" />
          <NavItem to="/library" icon={Gamepad2} label="My Library" />
          <NavItem to="/profile" icon={User} label="Profile" />
          <div className="pt-4 pb-2">
             <div className="h-px bg-gray-200 dark:bg-white/5 mx-4" />
          </div>
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                    <div className="text-sm">
                        <p className="font-medium">Guest Player</p>
                        <p className="text-xs text-gray-500">Level 1</p>
                    </div>
                </div>
                <ThemeToggle />
            </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md z-40 flex items-center justify-between px-4 transition-colors duration-300">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-sm">
            <Gamepad2 className="text-white w-5 h-5" />
          </div>
           <span className="font-bold text-lg tracking-tight">HP Z-Play</span>
        </div>
        <div className="flex items-center gap-3">
            <button
              className="p-2 text-gray-500 dark:text-gray-400"
              aria-label="View notifications"
              title="View notifications"
            >
                <Bell size={20} />
            </button>
            <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 min-h-screen w-full">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-lg border-t border-gray-200 dark:border-white/5 flex justify-around items-center px-2 z-50 pb-[env(safe-area-inset-bottom)] pt-2 h-[calc(60px+env(safe-area-inset-bottom))] transition-colors duration-300">
         <NavItem to="/home" icon={Home} label="Home" />
         <NavItem to="/library" icon={Gamepad2} label="Library" />
         <NavItem to="/profile" icon={User} label="Profile" />
      </nav>
    </div>
  );
};

export default Layout;