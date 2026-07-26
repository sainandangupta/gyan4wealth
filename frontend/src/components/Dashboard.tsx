import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import type { Tab } from './Sidebar';
import { TopBar } from './TopBar';
import { ProgressRingCard } from './widgets/ProgressRingCard';
import { ProgressBarCard } from './widgets/ProgressBarCard';
import { CoursesWidget } from './widgets/CoursesWidget';
import { SessionsWidget } from './widgets/SessionsWidget';
import { AchievementsWidget } from './widgets/AchievementsWidget';
import { WatchlistChart } from './widgets/WatchlistChart';
import { RecommendedCarousel } from './widgets/RecommendedCarousel';
import { dashboardData } from '../data/dashboardData';
import { fadeInUp } from '../utils/animations';


export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');

  const { progress, courses, sessions, achievements, watchlist, recommended } = dashboardData;

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="grid grid-cols-12 gap-6 pb-20">
            {/* Row 1: Core Metrics (12 cols on mobile, 6 cols on tablet/desktop) */}
            <ProgressRingCard score={progress.literacyScore} />
            <ProgressBarCard 
              progress={progress.wealthGoalProgress} 
              current={progress.wealthGoalCurrent} 
              target={progress.wealthGoalTarget} 
            />

            {/* Row 2: Courses, Sessions, Achievements */}
            <CoursesWidget courses={courses} />
            <SessionsWidget sessions={sessions} />
            <AchievementsWidget achievements={achievements} />

            {/* Row 3: Watchlist Chart */}
            <WatchlistChart watchlist={watchlist} />

            {/* Row 4: Recommended Carousel */}
            <RecommendedCarousel items={recommended} />
          </div>
        );

      case 'Courses':
        return (
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            animate="visible"
            className="bg-white rounded-panel p-6 border border-slate-100 shadow-resting min-h-[500px]"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="font-heading font-bold text-h2 text-navy">My Courses</h2>
                <p className="font-sans text-xs text-slate-text mt-1">Manage and track your learning progress across all pillars.</p>
              </div>
              <span className="bg-blue/15 text-blue text-xs font-bold px-3 py-1 rounded-full border border-blue/20">
                {courses.length} Active Courses
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map(course => (
                <div key={course.id} className="flex gap-4 p-4 bg-slate-50 border border-slate-100 rounded-card hover:shadow-resting transition-all duration-200">
                  <img src={course.thumbnail} alt={course.title} className="w-28 h-28 object-cover rounded-sm border border-slate-200" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue uppercase tracking-wider">{course.category}</span>
                      <h3 className="font-sans font-bold text-sm text-navy mt-1 line-clamp-2">{course.title}</h3>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-text mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'Tracker':
        return (
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            animate="visible"
            className="bg-white rounded-panel p-6 border border-slate-100 shadow-resting min-h-[500px] flex flex-col gap-6"
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading font-bold text-h2 text-navy">Financial Tracker</h2>
              <p className="font-sans text-xs text-slate-text mt-1">Review net worth allocations, budget constraints, and active savings pipelines.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-tint/50 border border-green/10 p-5 rounded-card text-center">
                <span className="text-[11px] font-bold text-green uppercase tracking-wider">SIP Portfolio</span>
                <p className="font-heading font-bold text-2xl text-navy mt-2">₹12,500/mo</p>
                <p className="text-xs text-slate-text mt-1">Active monthly contributions</p>
              </div>
              <div className="bg-gold-tint/50 border border-gold/15 p-5 rounded-card text-center">
                <span className="text-[11px] font-bold text-gold uppercase tracking-wider">Emergency Buffer</span>
                <p className="font-heading font-bold text-2xl text-navy mt-2">₹3,50,000</p>
                <p className="text-xs text-slate-text mt-1">Liquid fund allocations (5 months)</p>
              </div>
              <div className="bg-blue/5 border border-blue/10 p-5 rounded-card text-center">
                <span className="text-[11px] font-bold text-blue uppercase tracking-wider">Asset Distribution</span>
                <p className="font-heading font-bold text-2xl text-navy mt-2">65% Equity | 35% Debt</p>
                <p className="text-xs text-slate-text mt-1">Based on moderate risk profile</p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-card border border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm text-navy">Goal Tracking Planner</h3>
                <p className="text-xs text-slate-text mt-1">Integrate external Demat & Mutual Fund portfolios to sync tracking calculations automatically.</p>
              </div>
              <button className="bg-navy hover:bg-navy-dark text-white font-sans font-bold text-xs px-4 py-2.5 rounded-sm transition-colors shadow-sm">
                Connect External Accounts
              </button>
            </div>
          </motion.div>
        );

      case 'Watchlist':
        return (
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            animate="visible"
            className="bg-white rounded-panel p-6 border border-slate-100 shadow-resting min-h-[500px]"
          >
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="font-heading font-bold text-h2 text-navy">Real Estate & REIT Watchlist</h2>
              <p className="font-sans text-xs text-slate-text mt-1">Consolidated tracking for monitored land assets, housing indices, and commercial REIT securities.</p>
            </div>
            <WatchlistChart watchlist={watchlist} />
          </motion.div>
        );

      case 'Community':
        return (
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            animate="visible"
            className="bg-white rounded-panel p-6 border border-slate-100 shadow-resting min-h-[500px]"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="font-heading font-bold text-h2 text-navy">Community Circles</h2>
                <p className="font-sans text-xs text-slate-text mt-1">Discuss market conditions, share success metrics, and network with vetted members.</p>
              </div>
              <button className="bg-blue hover:bg-blue-dark text-white text-xs font-bold px-4 py-2.5 rounded-sm transition-all shadow-sm">
                Start New Thread
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sans font-bold text-xs text-navy">Amit Sharma</span>
                  <span className="text-[10px] text-slate-400">2 hours ago</span>
                  <span className="ml-auto bg-green-tint text-green text-[9px] font-bold px-2 py-0.5 rounded-full border border-green/10">Real Estate</span>
                </div>
                <h3 className="font-sans font-bold text-xs text-navy">Are retail commercial REIT yields adjusting to interest rate revisions?</h3>
                <p className="font-sans text-xs text-slate-text mt-1.5 leading-relaxed">
                  With central bank comments indicating a potential rate drop next quarter, REIT yields are showing minor compression. Embassy & Brookfield might see capital appreciation...
                </p>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-bold">
                  <span>14 Replies</span>
                  <span>32 Likes</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sans font-bold text-xs text-navy">Meera Nair</span>
                  <span className="text-[10px] text-slate-400">1 day ago</span>
                  <span className="ml-auto bg-gold-tint text-gold text-[9px] font-bold px-2 py-0.5 rounded-full border border-gold/15">Tax & Estate</span>
                </div>
                <h3 className="font-sans font-bold text-xs text-navy">Creating HUF accounts for tax optimizations - Lessons learned</h3>
                <p className="font-sans text-xs text-slate-text mt-1.5 leading-relaxed">
                  I recently finalized setting up a Hindu Undivided Family (HUF) pan card to split rental incomes. Highly recommend CA Anjali's masterclass deck...
                </p>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-bold">
                  <span>28 Replies</span>
                  <span>56 Likes</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'Resources':
        return (
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            animate="visible"
            className="bg-white rounded-panel p-6 border border-slate-100 shadow-resting min-h-[500px]"
          >
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="font-heading font-bold text-h2 text-navy">Resource Vault</h2>
              <p className="font-sans text-xs text-slate-text mt-1">Downloadable calculators, legal guides, and webinar slides compiled by Gyan4Wealth experts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-card flex justify-between items-center">
                <div>
                  <h3 className="font-sans font-bold text-xs text-navy">Commercial Property Yield Calculator</h3>
                  <p className="text-[11px] text-slate-text mt-0.5">Excel spreadsheet (.xlsx) - 2.4 MB</p>
                </div>
                <button className="text-[12px] font-bold text-blue hover:text-navy transition-colors">Download</button>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-card flex justify-between items-center">
                <div>
                  <h3 className="font-sans font-bold text-xs text-navy">HUF Creation & Legal Structure Templates</h3>
                  <p className="text-[11px] text-slate-text mt-0.5">Acrobat PDF (.pdf) - 4.8 MB</p>
                </div>
                <button className="text-[12px] font-bold text-blue hover:text-navy transition-colors">Download</button>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-card flex justify-between items-center">
                <div>
                  <h3 className="font-sans font-bold text-xs text-navy">SIP compounding & Tax-Exempt calculations</h3>
                  <p className="text-[11px] text-slate-text mt-0.5">Google Sheets link - Web App</p>
                </div>
                <button className="text-[12px] font-bold text-blue hover:text-navy transition-colors">Open</button>
              </div>
            </div>
          </motion.div>
        );

      case 'Settings':
      case 'Profile':
        return (
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            animate="visible"
            className="bg-white rounded-panel p-6 border border-slate-100 shadow-resting min-h-[500px]"
          >
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="font-heading font-bold text-h2 text-navy">Account Settings</h2>
              <p className="font-sans text-xs text-slate-text mt-1">Review contact information, security preferences, and subscription tier settings.</p>
            </div>
            <div className="max-w-xl space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-card">
                <img src={dashboardData.user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full border border-blue/20 object-cover" />
                <div>
                  <h3 className="font-sans font-bold text-sm text-navy">{dashboardData.user.name}</h3>
                  <p className="text-xs text-slate-text mt-0.5">Vetted Premium Member since January 2026</p>
                </div>
              </div>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">Email Address</label>
                  <input type="email" defaultValue="member@gyan4wealth.com" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-sm font-sans text-sm focus:outline-none focus:border-blue" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">Risk Profile</label>
                  <select defaultValue="Moderate" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-sm font-sans text-sm focus:outline-none focus:border-blue">
                    <option>Conservative</option>
                    <option>Moderate</option>
                    <option>Aggressive</option>
                  </select>
                </div>
                <button className="bg-navy hover:bg-navy-dark text-white font-sans font-bold text-xs px-6 py-3 rounded-sm transition-colors shadow-sm">
                  Save Changes
                </button>
              </form>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex">
      {/* SIDEBAR: responsive sidebar component (desktop: fixed sidebar, tablet: icon-rail, mobile: bottom navigation) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col xl:pl-[260px] md:pl-20 min-w-0 transition-all duration-300">
        {/* Glassmorphic sticky TopBar */}
        <TopBar />

        {/* MAIN BODY AREA */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* Max-width container inside main content area */}
          <div className="max-w-[1280px] mx-auto">
            {/* Tab Transition wrapper */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {renderActiveTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
