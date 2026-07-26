import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BlogCard } from '../components/BlogCard';
import { FilterPills } from '../components/FilterPills';
import { NewsletterBlock } from '../components/NewsletterBlock';
import { BLOG_POSTS } from '../data/articlesData';
import { fadeInUp, staggerContainer, SHIMMER_BTN_CLASS } from '../utils/animations';
import { Search, ChevronRight, BookOpen, Star, PlayCircle } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

const FILTERS = ['All', 'Wealth', 'Real Estate', 'Career', 'Finance', 'Education', 'Parenting'];

export const Courses: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  // We are reusing the BLOG_POSTS data here as mock course data
  // In a real app, this would be a dedicated COURSES_DATA array
  const filteredCourses = useMemo(() => {
    return BLOG_POSTS.filter((course) => {
      const matchesFilter = activeFilter === 'All' || course.category === activeFilter;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const visibleCourses = filteredCourses.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 lg:pt-40 lg:pb-28 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        
        {/* ── Hero & Search ── */}
        <section className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16 lg:mb-24">
          <div className="w-full lg:w-2/3">
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] text-navy leading-tight tracking-tight mb-6"
            >
              Master the Art of <span className="text-gold">Wealth Creation</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="font-sans text-lg lg:text-xl text-slate-text max-w-2xl"
            >
              Actionable frameworks, step-by-step masterclasses, and deep-dives into every pillar of financial independence.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/3 relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-gold transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-slate-200 shadow-sm focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all font-sans text-slate-700 placeholder-slate-400"
            />
          </motion.div>
        </section>

        {/* ── Stats / Trust Banner ── */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-navy rounded-panel p-8 lg:p-10 mb-16 lg:mb-24 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
              <PlayCircle size={32} className="text-gold" />
            </div>
            <div>
              <p className="font-heading font-bold text-3xl text-white">120+</p>
              <p className="font-sans text-sm font-bold text-white/70 uppercase tracking-widest">Hours of Content</p>
            </div>
          </div>
          
          <div className="w-full md:w-[1px] h-[1px] md:h-16 bg-white/20 relative z-10 shrink-0" />

          <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="w-16 h-16 rounded-full bg-blue/20 flex items-center justify-center shrink-0">
              <BookOpen size={32} className="text-blue" />
            </div>
            <div>
              <p className="font-heading font-bold text-3xl text-white">45+</p>
              <p className="font-sans text-sm font-bold text-white/70 uppercase tracking-widest">Masterclasses</p>
            </div>
          </div>

          <div className="w-full md:w-[1px] h-[1px] md:h-16 bg-white/20 relative z-10 shrink-0" />

          <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center shrink-0">
              <Star size={32} className="text-green" />
            </div>
            <div>
              <p className="font-heading font-bold text-3xl text-white">4.9/5</p>
              <p className="font-sans text-sm font-bold text-white/70 uppercase tracking-widest">Average Rating</p>
            </div>
          </div>
        </motion.section>

        {/* ── Filters ── */}
        <div className="mb-12">
          <FilterPills
            filters={FILTERS}
            activeFilter={activeFilter}
            onFilterChange={(filter) => {
              setActiveFilter(filter);
              setVisibleCount(9);
            }}
            layoutId="activeCourseFilter"
          />
        </div>

        {/* ── Course Grid ── */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-panel border border-slate-100 shadow-sm mb-20">
            <Search className="mx-auto text-slate-300 mb-6" size={56} />
            <h3 className="font-heading font-bold text-2xl text-navy mb-3">No courses found</h3>
            <p className="font-sans text-lg text-slate-500">We couldn't find any courses matching "{searchQuery}".</p>
          </div>
        ) : (
          <>
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              <AnimatePresence mode="popLayout">
                {visibleCourses.map((course) => (
                  <BlogCard key={course.id} post={course} layout={true} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            {visibleCount < filteredCourses.length && (
              <div className="text-center mb-24">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className={`${SHIMMER_BTN_CLASS} inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-sans font-bold text-sm px-8 py-4 rounded-md transition-all shadow-lg shadow-gold/20 hover:shadow-glow-gold`}
                >
                  Load More Courses
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}

      </main>

      <NewsletterBlock />
      <Footer />
    </div>
  );
};
