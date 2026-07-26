import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  GraduationCap, 
  LineChart, 
  Building, 
  Users, 
  BookOpen, 
  Settings, 
  User 
} from 'lucide-react';
import logoImg from '../assets/gyan4wealthlogo.jpeg';

export type Tab = 'Dashboard' | 'Courses' | 'Tracker' | 'Watchlist' | 'Community' | 'Resources' | 'Settings' | 'Profile';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ComponentType<any>;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [hoveredTooltip, setHoveredTooltip] = useState<Tab | null>(null);

  const navItems: NavItem[] = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Courses', label: 'My Courses', icon: GraduationCap },
    { id: 'Tracker', label: 'Financial Tracker', icon: LineChart },
    { id: 'Watchlist', label: 'Real Estate Watchlist', icon: Building },
    { id: 'Community', label: 'Community', icon: Users },
    { id: 'Resources', label: 'Resources', icon: BookOpen },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  // Mobile navigation tabs
  const mobileNavItems: NavItem[] = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Courses', label: 'Courses', icon: GraduationCap },
    { id: 'Tracker', label: 'Tracker', icon: LineChart },
    { id: 'Community', label: 'Community', icon: Users },
    { id: 'Profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR: >= 1280px */}
      <aside className="hidden xl:flex flex-col fixed top-0 left-0 h-screen w-[260px] bg-navy text-white z-40 border-r border-white/10 select-none">
        {/* Logo Container */}
        <div className="flex items-center gap-3 px-6 h-[72px] border-b border-white/10">
          <img 
            src={logoImg} 
            alt="Gyan4Wealth Logo" 
            className="w-10 h-10 rounded-full border border-gold/40 object-cover"
          />
          <span className="font-heading font-bold text-xl tracking-tight bg-gradient-to-r from-white via-gold-tint to-gold bg-clip-text text-transparent">
            Gyan4Wealth
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative group flex items-center gap-4 px-6 py-4 text-left transition-colors duration-200"
              >
                {/* Active Left Border & Tint */}
                {isActive && (
                  <>
                    <motion.div 
                      layoutId="activeBorder"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gold rounded-r-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                    <motion.div 
                      layoutId="activeTint"
                      className="absolute inset-0 bg-[#FFF6E5] opacity-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  </>
                )}

                {/* Icon with Idle Float Animation */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                  className={`z-10 transition-colors duration-200 ${isActive ? 'text-gold' : 'text-slate-400 group-hover:text-white'}`}
                >
                  <Icon size={20} />
                </motion.div>

                {/* Label */}
                <span className={`z-10 font-sans font-medium text-[15px] transition-colors duration-200 ${isActive ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* TABLET SIDEBAR (RAIL): 768px - 1279px */}
      <aside className="hidden md:flex xl:hidden flex-col fixed top-0 left-0 h-screen w-20 bg-navy text-white z-40 border-r border-white/10 items-center py-4 select-none">
        {/* Mini Logo */}
        <div className="mb-8 mt-2">
          <img 
            src={logoImg} 
            alt="Logo" 
            className="w-10 h-10 rounded-full border border-gold/40 object-cover"
          />
        </div>

        {/* Navigation Rail */}
        <nav className="flex-1 flex flex-col gap-2 items-center w-full">
          {navItems.map((item, index) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <div 
                key={item.id}
                className="relative flex items-center justify-center w-full py-3"
                onMouseEnter={() => setHoveredTooltip(item.id)}
                onMouseLeave={() => setHoveredTooltip(null)}
              >
                <button
                  onClick={() => setActiveTab(item.id)}
                  className="relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200"
                >
                  {/* Active background glow and tint */}
                  {isActive && (
                    <>
                      <motion.div 
                        layoutId="activeBorderTablet"
                        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gold rounded-r-md"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                      <motion.div 
                        layoutId="activeTintTablet"
                        className="absolute inset-0 bg-[#FFF6E5]/10 rounded-xl"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    </>
                  )}

                  {/* Icon with Idle Float Animation */}
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    className={`z-10 transition-colors duration-200 ${isActive ? 'text-gold' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Icon size={22} />
                  </motion.div>
                </button>

                {/* Tooltip on Hover */}
                <AnimatePresence>
                  {hoveredTooltip === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 20 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-14 z-50 bg-navy border border-white/10 shadow-resting text-white px-3 py-1.5 rounded-sm font-sans font-medium text-xs whitespace-nowrap pointer-events-none"
                    >
                      {item.label}
                      {/* Tooltip Arrow */}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-navy border-l border-b border-white/10 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE BOTTOM TAB BAR: < 768px */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 h-16 bg-navy border-t border-white/10 z-40 items-center justify-around px-2 select-none">
        {mobileNavItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center py-1 px-3 w-16 h-full transition-all duration-200"
            >
              {/* Active Tab Background indicator */}
              {isActive && (
                <motion.div 
                  layoutId="activeTintMobile"
                  className="absolute inset-x-2 inset-y-1 bg-[#FFF6E5]/10 rounded-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className={`z-10 transition-colors duration-200 ${isActive ? 'text-gold' : 'text-slate-400'}`}>
                <Icon size={20} />
              </div>

              {/* Label */}
              <span className={`z-10 mt-1 text-[10px] font-sans font-medium transition-colors duration-200 ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
