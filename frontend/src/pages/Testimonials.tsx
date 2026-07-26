import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { FilterPills } from '../components/FilterPills';
import { useCountUp } from '../hooks/useCountUp';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { Play, MapPin, Star, Quote } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════════════ */

const STATS = [
  { label: 'Active Students', value: 50000, suffix: '+' },
  { label: 'Wealth Optimized', value: 100, suffix: 'Cr+' },
  { label: 'Average Rating', value: 4.9, suffix: '/5' },
];

const FILTERS = ['All', 'Students', 'Parents', 'Professionals', 'Investors'];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Anjali Sharma',
    role: 'IT Professional, Bengaluru',
    category: 'Professionals',
    text: "Before Gyan4Wealth, I was just leaving my salary in a savings account. The courses on asset allocation and direct mutual funds completely transformed how I see money. I've now automated my investments and feel secure about my financial future.",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
  },
  {
    id: 2,
    name: 'Rahul Desai',
    role: 'Business Owner, Mumbai',
    category: 'Investors',
    text: 'The commercial real estate masterclass is worth its weight in gold. Understanding cap rates and lease rental discounting helped me secure a property that yields 8% annually. The community here is unmatched.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&q=80',
  },
  {
    id: 3,
    name: 'Sneha & Rohan',
    role: 'New Parents, Pune',
    category: 'Parents',
    text: 'As new parents, we were overwhelmed by education inflation. The modules on Sukanya Samriddhi Yojana and child education planning gave us a clear, mathematical path to secure our daughter\'s future without sacrificing our lifestyle today.',
    image: 'https://images.unsplash.com/photo-1544252890-50280eb4c219?w=150&q=80',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'College Student, Delhi',
    category: 'Students',
    text: 'Learning the 50/30/20 rule and zero-based budgeting in college was a game changer. I graduated without debt and already have an emergency fund built up. Every student needs to learn this!',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80',
  },
  {
    id: 5,
    name: 'Priya Patel',
    role: 'Marketing Lead, Hyderabad',
    category: 'Professionals',
    text: 'The salary negotiation frameworks taught here helped me secure a 30% hike. The ROI on this membership is unbelievable. It\'s not just about saving; it\'s about increasing your earning capacity.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
  },
  {
    id: 6,
    name: 'Amit Verma',
    role: 'Retail Investor, Chennai',
    category: 'Investors',
    text: 'I used to fall for ULIPs and regular mutual funds pushed by agents. Gyan4Wealth opened my eyes to the hidden costs. Moving to direct passive index funds has saved me lakhs in commissions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

const StatCounter: React.FC<{ target: number; suffix: string; label: string }> = ({ target, suffix, label }) => {
  const count = useCountUp({ target, suffix, duration: 1500 });
  return (
    <motion.div className="flex flex-col items-center" onViewportEnter={() => count.start()}>
      <span className="font-heading font-extrabold text-4xl lg:text-5xl text-navy mb-2">{count.display}</span>
      <span className="font-sans text-slate-500 font-semibold text-sm uppercase tracking-wider">{label}</span>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export const Testimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const filteredTestimonials = TESTIMONIALS.filter(t => activeFilter === 'All' || t.category === activeFilter);

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 lg:pt-40 lg:pb-28 w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* ── Hero & Stats ── */}
        <section className="text-center mb-20 lg:mb-32">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] text-navy leading-tight tracking-tight mb-6"
          >
            Don't Just Take <span className="text-gold">Our Word For It</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="font-sans text-lg lg:text-xl text-slate-text max-w-2xl mx-auto mb-16"
          >
            Join a community of thousands who are actively building, protecting, and multiplying generational wealth.
          </motion.p>

          <motion.div
            variants={staggerContainer(0.2)}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24"
          >
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={fadeInUp}>
                <StatCounter target={stat.value} suffix={stat.suffix} label={stat.label} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Featured Video Testimonial ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy rounded-panel overflow-hidden shadow-2xl flex flex-col lg:flex-row relative"
          >
            {/* Left Content */}
            <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="flex items-center gap-1 text-gold mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <h2 className="font-heading font-bold text-2xl lg:text-4xl text-white leading-snug mb-6">
                "The community support and expert frameworks helped me scale my portfolio by 40% in just two years."
              </h2>
              <div className="flex items-center gap-4 mt-auto">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80" alt="Rajiv" className="w-12 h-12 rounded-full border-2 border-white/20" />
                <div>
                  <p className="font-sans font-bold text-white text-sm">Rajiv Malhotra</p>
                  <p className="font-sans text-white/60 text-xs">Entrepreneur, Delhi</p>
                </div>
              </div>
            </div>

            {/* Right Video Thumbnail */}
            <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full relative bg-slate-900 flex items-center justify-center">
              {!isVideoPlaying ? (
                <>
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=800&q=80" alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="relative z-10 w-20 h-20 bg-gold rounded-full flex items-center justify-center text-navy hover:scale-110 transition-transform duration-300"
                  >
                    <Play size={32} className="ml-2" />
                    {/* Pulsing ring */}
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border-2 border-gold"
                    />
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
                  <span className="text-white font-sans opacity-50">Video Player Placeholder</span>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* ── Masonry Grid ── */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h2 className="font-heading font-bold text-3xl text-navy">Member Stories</h2>
            <FilterPills
              filters={FILTERS}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              layoutId="testimonialsFilter"
            />
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredTestimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 3) * 0.15 }}
                className="break-inside-avoid bg-white p-8 rounded-card border border-slate-100 shadow-resting relative overflow-hidden group"
              >
                {/* Watermark quote */}
                <Quote size={80} className="absolute -top-4 -left-4 text-gold/10 -rotate-12 pointer-events-none" />
                
                <p className="font-sans text-slate-700 leading-relaxed mb-8 relative z-10 text-[15px]">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                  <div>
                    <h4 className="font-heading font-bold text-navy text-sm">{t.name}</h4>
                    <p className="font-sans text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Community Map ── */}
        <section className="py-20 border-t border-slate-200">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl text-navy mb-4">A Thriving National Community</h2>
            <p className="font-sans text-slate-500">Connecting ambitious wealth builders across India.</p>
          </div>
          
          <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] bg-slate-50 rounded-panel border border-slate-100 flex items-center justify-center overflow-hidden">
            {/* Placeholder SVG Map of India (simplified) */}
            <svg viewBox="0 0 400 400" className="w-full h-full opacity-10 text-navy" fill="currentColor">
              <path d="M 200 20 Q 250 100 300 200 Q 250 350 200 380 Q 150 350 100 200 Q 150 100 200 20 Z" />
            </svg>

            {/* Dots */}
            {[
              { top: '35%', left: '48%', delay: 0 },
              { top: '65%', left: '42%', delay: 0.2 },
              { top: '75%', left: '55%', delay: 0.4 },
              { top: '45%', left: '35%', delay: 0.6 },
              { top: '55%', left: '60%', delay: 0.8 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: pos.delay, duration: 0.5, type: 'spring' }}
                className="absolute text-gold flex flex-col items-center justify-center"
                style={{ top: pos.top, left: pos.left }}
              >
                <div className="relative">
                  <MapPin size={24} fill="currentColor" />
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: pos.delay }}
                    className="absolute inset-0 bg-gold rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA Card ── */}
        <section className="mt-12">
          <div className="bg-navy rounded-panel p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6 relative z-10">
              Ready to write your own success story?
            </h2>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto mb-10 relative z-10">
              Join Gyan4Wealth today and get instant access to the frameworks, tools, and community that will accelerate your financial journey.
            </p>
            <Button to="/pricing" variant="primary" className="relative z-10 !px-10 !py-4 text-lg">
              Start Your Journey
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
