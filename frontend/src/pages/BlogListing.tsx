import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { BlogCard } from '../components/BlogCard';
import { FilterPills } from '../components/FilterPills';
import { BLOG_POSTS } from '../data/articlesData';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { Search, ChevronRight, Clock, Mail, TrendingUp } from 'lucide-react';

const FILTERS = ['All', 'Wealth', 'Real Estate', 'Career', 'Finance', 'Education', 'Parenting'];

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export const BlogListing: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter Data
  const featuredPost = useMemo(() => BLOG_POSTS.find((p) => p.featured), []);
  
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((p) => !p.featured)
      .filter((p) => (activeFilter === 'All' ? true : p.category === activeFilter))
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeFilter, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 lg:pt-40 lg:pb-28 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        {/* ── Page Header & Search ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={fadeInUp} className="font-heading font-extrabold text-4xl lg:text-[48px] text-navy mb-4 tracking-tight">
              Insights & <span className="text-gold">Strategies</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-sans text-lg text-slate-text max-w-lg">
              Expert analysis, actionable guides, and wealth-building frameworks delivered weekly.
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full md:w-auto"
          >
            <div className="group relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors z-10" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 focus:md:w-80 transition-all duration-300 pl-12 pr-4 py-3.5 rounded-full bg-white/50 backdrop-blur-md border border-slate-200 focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none text-navy font-sans shadow-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* ── Filter Pills ── */}
        <div className="mb-12">
          <FilterPills
            filters={FILTERS}
            activeFilter={activeFilter}
            onFilterChange={(filter) => {
              setActiveFilter(filter);
              setVisibleCount(6); // Reset pagination on filter change
            }}
            layoutId="activeBlogFilter"
          />
        </div>

        {/* ── Featured Article ── */}
        {(activeFilter === 'All' && searchQuery === '' && featuredPost) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-24 group cursor-pointer"
          >
            <div className="bg-white rounded-panel overflow-hidden border border-slate-100 shadow-resting group-hover:shadow-glow-navy transition-shadow duration-500 flex flex-col lg:flex-row h-full lg:h-[480px]">
              {/* Image side */}
              <div className="w-full lg:w-3/5 h-64 lg:h-full relative overflow-hidden">
                <motion.img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute top-6 left-6 flex gap-3">
                  <motion.span
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-gold text-navy font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-navy mr-1" />
                    Featured
                  </motion.span>
                  <span className={`font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md bg-white text-navy`}>
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              
              {/* Text side */}
              <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center relative">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-navy/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 font-sans mb-4 uppercase tracking-wide relative z-10">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>
                
                <h2 className="font-heading font-bold text-2xl lg:text-3xl text-navy leading-tight mb-5 group-hover:text-gold transition-colors relative z-10">
                  {featuredPost.title}
                </h2>
                
                <p className="font-sans text-base lg:text-lg text-slate-text leading-relaxed mb-8 relative z-10">
                  {featuredPost.excerpt}
                </p>
                
                <div className="mt-auto relative z-10 flex items-center text-navy font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                  Read Article <ChevronRight size={16} className="text-gold" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Main Content Grid & Sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 relative">
          
          {/* Main Grid */}
          <div className="flex-1 w-full min-w-0">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-panel border border-slate-100 shadow-sm">
                <Search className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="font-heading font-bold text-xl text-navy mb-2">No articles found</h3>
                <p className="font-sans text-slate-500">We couldn't find any articles matching your search criteria.</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {visiblePosts.map((post) => (
                    <BlogCard key={post.id} post={post} layout={true} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <Button onClick={handleLoadMore} variant="outline" className="!border-gold/50 !text-gold hover:!bg-gold hover:!text-navy">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col gap-8 order-last lg:order-none">
            {/* Newsletter Mini-card */}
            <div className="bg-navy rounded-panel p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent pointer-events-none" />
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-5 backdrop-blur-sm">
                <Mail size={24} className="text-gold" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Weekly Wealth Insights</h3>
              <p className="font-sans text-sm text-white/70 mb-6 leading-relaxed">
                Join 50,000+ readers getting exclusive market analysis and actionable frameworks every Sunday.
              </p>
              <div className="flex flex-col gap-3 relative z-10">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white/10 border border-white/20 rounded-md py-3 px-4 text-sm outline-none focus:border-gold/50 focus:bg-white/15 transition-all text-white placeholder-white/50"
                />
                <button className="w-full bg-gold hover:bg-gold/90 text-navy font-bold font-sans text-sm py-3 rounded-md transition-colors shadow-lg shadow-gold/20">
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white rounded-panel p-8 border border-slate-100 shadow-resting">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-gold" />
                <h3 className="font-heading font-bold text-lg text-navy">Trending Topics</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  { title: 'Understanding Cap Rates', count: 24, cat: 'Real Estate' },
                  { title: 'Salary Negotiation Scripts', count: 18, cat: 'Career' },
                  { title: 'Term Insurance vs ULIPs', count: 15, cat: 'Finance' },
                  { title: 'Power of Compounding', count: 42, cat: 'Education' },
                  { title: 'Direct vs Regular Mutual Funds', count: 31, cat: 'Wealth' },
                ].map((item, idx) => (
                  <li key={idx} className="group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <span className="font-sans font-bold text-slate-300 group-hover:text-gold transition-colors pt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-sans font-semibold text-sm text-navy group-hover:text-blue transition-colors leading-tight mb-1">
                          {item.title}
                        </h4>
                        <span className="font-sans text-[11px] text-slate-400 font-medium">
                          {item.cat} • {item.count} articles
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};
