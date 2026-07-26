import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/gyan4wealthlogo.jpeg';
import { SHIMMER_BTN_CLASS } from '../utils/animations';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Pillars', path: '/pillars' },
  { label: 'Courses', path: '/courses' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-resting border-b border-slate-200/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[72px] px-5 lg:px-8">
          {/* Logo — left */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={logoImg}
              alt="Gyan4Wealth"
              className="w-9 h-9 rounded-full border border-gold/30 object-cover"
            />
            <span
              className={`font-heading font-bold text-lg tracking-tight transition-colors duration-200 ${
                scrolled
                  ? 'text-navy'
                  : 'text-white'
              }`}
            >
              Gyan4Wealth
            </span>
          </Link>

          {/* Nav — centered (desktop only) */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3.5 py-2 rounded-sm text-[13px] font-sans font-semibold transition-colors duration-200 ${
                  isActive(item.path)
                    ? scrolled
                      ? 'text-blue'
                      : 'text-gold'
                    : scrolled
                      ? 'text-slate-text hover:text-navy'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="header-active-underline"
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${
                      scrolled ? 'bg-blue' : 'bg-gold'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTAs — right (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/dashboard"
              className={`font-sans font-semibold text-[13px] px-4 py-2 rounded-sm transition-colors duration-200 ${
                scrolled
                  ? 'text-navy hover:text-blue'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Log In
            </Link>
            <Link
              to="/contact"
              className={`${SHIMMER_BTN_CLASS} inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-sans font-bold text-[13px] px-5 py-2.5 rounded-sm transition-all duration-200 shadow-sm hover:shadow-glow-gold`}
            >
              Get Started
            </Link>
          </div>

          {/* Hamburger — tablet + mobile */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="lg:hidden p-2 rounded-sm transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {drawerOpen ? (
              <X size={24} className={scrolled ? 'text-navy' : 'text-white'} />
            ) : (
              <Menu
                size={24}
                className={scrolled ? 'text-navy' : 'text-white'}
              />
            )}
          </button>
        </div>
      </header>

      {/* Mobile / Tablet Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[51] lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-[52] shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between h-[72px] px-5 border-b border-slate-100">
                <Link
                  to="/"
                  className="flex items-center gap-2.5"
                  onClick={() => setDrawerOpen(false)}
                >
                  <img
                    src={logoImg}
                    alt="Gyan4Wealth"
                    className="w-8 h-8 rounded-full border border-gold/30 object-cover"
                  />
                  <span className="font-heading font-bold text-base text-navy">
                    Gyan4Wealth
                  </span>
                </Link>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-sm hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-navy" />
                </button>
              </div>

              {/* Drawer Nav Items */}
              <nav className="flex-1 py-4 px-4 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setDrawerOpen(false)}
                      className={`block px-4 py-3 rounded-sm font-sans font-semibold text-sm transition-colors duration-150 ${
                        isActive(item.path)
                          ? 'bg-blue/8 text-blue border-l-[3px] border-blue'
                          : 'text-slate-text hover:bg-slate-50 hover:text-navy'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer CTAs */}
              <div className="border-t border-slate-100 p-5 space-y-3">
                <Link
                  to="/dashboard"
                  onClick={() => setDrawerOpen(false)}
                  className="block w-full text-center bg-navy text-white font-sans font-bold text-sm py-3 rounded-sm hover:bg-navy-dark transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setDrawerOpen(false)}
                  className={`${SHIMMER_BTN_CLASS} block w-full text-center bg-gold text-navy font-sans font-bold text-sm py-3 rounded-sm hover:bg-gold/90 transition-colors`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
