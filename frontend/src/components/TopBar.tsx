import React, { useState, useRef, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { dropdownAnimation } from '../utils/animations';
import { dashboardData } from '../data/dashboardData';

interface TopBarProps {
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { user } = dashboardData;

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <header className="sticky top-0 right-0 left-0 h-[72px] z-30 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 flex items-center justify-between px-6 lg:px-8">
      {/* LEFT: Greeting / Brand */}
      <div className="flex flex-col">
        <h1 className="font-heading font-bold text-lg md:text-xl text-navy">
          Hi, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="hidden md:block font-sans text-xs text-slate-text">
          Let's review your wealth goals and learning paths today.
        </p>
      </div>

      {/* CENTER: Search Bar (Desktop/Tablet Only) */}
      <div className="hidden md:flex flex-1 justify-center max-w-md mx-4">
        <div className="relative flex items-center w-full justify-center">
          <m.div
            animate={{ width: isSearchFocused ? '100%' : '80%' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="relative flex items-center"
          >
            <Search className="absolute left-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search courses, assets, trackers..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-navy placeholder-slate-400 font-sans text-sm rounded-sm border border-transparent focus:border-blue focus:outline-none transition-colors duration-200 shadow-sm focus:shadow-resting"
            />
          </m.div>
        </div>
      </div>

      {/* RIGHT: Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 group">
          <Bell className="text-navy group-hover:text-blue transition-colors duration-200" size={22} />
          
          {user.unreadNotifications > 0 && (
            <m.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut'
              }}
              className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white"
            >
              {user.unreadNotifications}
            </m.span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-sm hover:bg-slate-100 transition-colors duration-200 focus:outline-none"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-blue/20 object-cover"
            />
            <span className="hidden sm:block font-sans font-medium text-sm text-navy">
              {user.name}
            </span>
            <ChevronDown className={`hidden sm:block text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} size={16} />
          </button>

          {/* Animated Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <m.div
                variants={dropdownAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-2 w-52 bg-white rounded-card shadow-resting border border-slate-200/50 p-2 z-50 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="font-sans font-semibold text-sm text-navy">{user.name}</p>
                  <p className="font-sans text-[11px] text-slate-text truncate">member@gyan4wealth.com</p>
                </div>
                
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left font-sans text-sm text-slate-700 hover:bg-slate-50 hover:text-navy rounded-sm transition-colors duration-150"
                >
                  <User size={16} className="text-slate-400" />
                  My Profile
                </button>
                
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left font-sans text-sm text-slate-700 hover:bg-slate-50 hover:text-navy rounded-sm transition-colors duration-150"
                >
                  <Settings size={16} className="text-slate-400" />
                  Settings
                </button>
                
                <hr className="my-1 border-slate-100" />
                
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left font-sans text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-sm transition-colors duration-150"
                >
                  <LogOut size={16} className="text-red-400" />
                  Sign Out
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
