import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { BlogCard } from '../components/BlogCard';
import type { BlogPost } from '../components/BlogCard';
import { fadeInUp, staggerContainer, SHIMMER_BTN_CLASS } from '../utils/animations';
import { Check, X, Shield, Lock, Award, Star, ChevronDown } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════ */

const PRICING_TIERS = [
  {
    name: 'Essential',
    monthly: 999,
    annual: 9990,
    description: 'Perfect for beginners starting their financial journey.',
    features: ['Access to 5 core courses', 'Community forum access', 'Monthly market newsletter', 'Basic calculators'],
    notIncluded: ['1-on-1 mentoring', 'Advanced masterclasses', 'Custom portfolio review'],
    cta: 'Start Free Trial',
  },
  {
    name: 'Pro',
    monthly: 2499,
    annual: 24990,
    description: 'Our most popular plan for serious wealth builders.',
    features: ['All Essential features', 'Access to ALL courses', 'Weekly live masterclasses', 'Advanced tax templates', 'Private Discord group'],
    notIncluded: ['1-on-1 mentoring', 'Custom portfolio review'],
    cta: 'Get Pro',
    popular: true,
  },
  {
    name: 'Elite',
    monthly: 4999,
    annual: 49990,
    description: 'The ultimate toolkit with personalized guidance.',
    features: ['All Pro features', 'Quarterly 1-on-1 mentoring', 'Custom portfolio review', 'VIP event access', 'Direct line to advisors'],
    notIncluded: [],
    cta: 'Apply for Elite',
  },
];

const COMPARISON_FEATURES = [
  { feature: 'Core Courses', essential: '5 courses', pro: 'All courses', elite: 'All courses' },
  { feature: 'Live Masterclasses', essential: false, pro: true, elite: true },
  { feature: 'Tax & Budgeting Templates', essential: 'Basic', pro: 'Advanced', elite: 'Advanced' },
  { feature: 'Private Community', essential: 'Forum', pro: 'Discord', elite: 'VIP Lounge' },
  { feature: '1-on-1 Mentoring', essential: false, pro: false, elite: 'Quarterly' },
  { feature: 'Portfolio Review', essential: false, pro: false, elite: 'Bi-annual' },
];

const FAQS = [
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Yes, you can cancel your subscription at any time from your account settings. If you cancel, you will retain access until the end of your current billing period.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a 14-day money-back guarantee for all new annual subscriptions. If you are not satisfied within the first two weeks, simply contact support for a full refund.',
  },
  {
    q: 'Is the Elite tier available to everyone?',
    a: 'To ensure our mentors can provide high-quality, personalized attention, the Elite tier has limited spots. You can apply, and if spots are full, you will be placed on a waitlist.',
  },
  {
    q: 'Are the payments secure?',
    a: 'Absolutely. We use bank-level encryption and partner with industry-leading payment gateways like Razorpay and Stripe to ensure your financial data is fully protected.',
  },
];

const SAMPLE_COURSES: BlogPost[] = [
  {
    id: 'c1',
    title: 'Zero-Based Budgeting Masterclass',
    excerpt: 'Take absolute control of your cashflow in 30 days.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
    category: 'Education',
    date: 'Beginner',
    readTime: '3 Hours',
  },
  {
    id: 'c2',
    title: 'Commercial Real Estate Valuation',
    excerpt: 'Learn to calculate cap rates and identify undervalued assets.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    category: 'Real Estate',
    date: 'Advanced',
    readTime: '6 Hours',
  },
  {
    id: 'c3',
    title: 'The Passive Indexing Strategy',
    excerpt: 'Automate your wealth creation using low-cost index funds.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
    category: 'Wealth',
    date: 'Intermediate',
    readTime: '4 Hours',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FAQ COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 text-left group"
      >
        <h4 className="font-heading font-bold text-lg text-navy group-hover:text-blue transition-colors">
          {q}
        </h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-slate-400 group-hover:text-blue">
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 pb-2 font-sans text-slate-text leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* ── Header & Toggle ── */}
        <section className="max-w-4xl mx-auto px-5 lg:px-8 text-center mb-16 lg:mb-24">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] text-navy leading-tight mb-6"
          >
            Invest in Your <span className="text-gold">Financial Future</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="font-sans text-lg lg:text-xl text-slate-text max-w-2xl mx-auto mb-12"
          >
            Unlock the frameworks, templates, and community you need to build and protect generational wealth.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <span className={`font-sans font-bold text-sm ${!isAnnual ? 'text-navy' : 'text-slate-400'}`}>Monthly</span>
            
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-16 h-8 rounded-full bg-slate-200 relative flex items-center px-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <motion.div
                layout
                className={`w-6 h-6 rounded-full shadow-md ${isAnnual ? 'bg-gold' : 'bg-white'}`}
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            
            <span className={`font-sans font-bold text-sm flex items-center gap-2 ${isAnnual ? 'text-navy' : 'text-slate-400'}`}>
              Annually <span className="text-[10px] bg-green-tint text-green px-2 py-0.5 rounded-full font-bold tracking-wide uppercase">Save 20%</span>
            </span>
          </motion.div>
        </section>

        {/* ── Pricing Cards ── */}
        <section className="max-w-7xl mx-auto px-5 lg:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {PRICING_TIERS.map((tier, i) => {
              const price = isAnnual ? tier.annual : tier.monthly;
              
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative bg-white rounded-panel overflow-hidden border shadow-resting flex flex-col h-full 
                    ${tier.popular ? 'border-gold shadow-glow-gold lg:scale-105 z-10' : 'border-slate-100'}
                  `}
                >
                  {tier.popular && (
                    <div className="bg-gold text-navy font-bold font-sans text-xs uppercase tracking-widest py-2 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-8 lg:p-10 flex flex-col h-full">
                    <h3 className="font-heading font-bold text-2xl text-navy mb-2">{tier.name}</h3>
                    <p className="font-sans text-sm text-slate-500 mb-6 min-h-[40px]">{tier.description}</p>
                    
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="font-heading font-bold text-4xl text-navy">₹{price.toLocaleString('en-IN')}</span>
                      <span className="font-sans text-slate-400 font-medium">/{isAnnual ? 'year' : 'month'}</span>
                    </div>

                    <button
                      className={`w-full py-3.5 rounded-md font-sans font-bold text-sm mb-10 transition-colors
                        ${tier.popular ? `${SHIMMER_BTN_CLASS} bg-gold hover:bg-gold/90 text-navy shadow-lg shadow-gold/20` : 'bg-navy hover:bg-navy/90 text-white'}
                      `}
                    >
                      {tier.cta}
                    </button>

                    <ul className="flex flex-col gap-4 mt-auto">
                      {tier.features.map((f, j) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (i * 0.15) + (j * 0.1) }}
                          className="flex items-start gap-3 font-sans text-sm text-slate-700"
                        >
                          <Check size={18} className="text-green shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </motion.li>
                      ))}
                      {tier.notIncluded.map((f, j) => (
                        <li key={f} className="flex items-start gap-3 font-sans text-sm text-slate-400 line-through">
                          <X size={18} className="text-slate-300 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Trust Band ── */}
        <section className="bg-green-tint py-12 mb-24 border-y border-green/20">
          <div className="max-w-5xl mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Shield, label: 'Bank-Level Security' },
                { icon: Lock, label: 'Data Privacy' },
                { icon: Award, label: 'Vetted Experts' },
                { icon: Star, label: '14-Day Guarantee' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center group">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:shadow-glow-green transition-shadow text-green"
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <span className="font-sans font-bold text-sm text-navy">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison Table (Desktop/Tablet) ── */}
        <section className="max-w-5xl mx-auto px-5 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-navy">Compare Plans</h2>
          </div>
          
          <div className="overflow-x-auto rounded-panel border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-5 px-6 font-heading font-bold text-navy w-1/3">Features</th>
                  <th className="py-5 px-6 font-heading font-bold text-navy text-center w-[22%]">Essential</th>
                  <th className="py-5 px-6 font-heading font-bold text-navy text-center w-[22%] bg-gold/10 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />
                    Pro
                  </th>
                  <th className="py-5 px-6 font-heading font-bold text-navy text-center w-[22%]">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_FEATURES.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-sans font-semibold text-slate-700 text-sm">{row.feature}</td>
                    <td className="py-4 px-6 text-center font-sans text-sm text-slate-600">
                      {typeof row.essential === 'boolean' ? (row.essential ? <Check size={18} className="text-green mx-auto" /> : <X size={18} className="text-slate-300 mx-auto" />) : row.essential}
                    </td>
                    <td className="py-4 px-6 text-center font-sans text-sm font-bold text-navy bg-gold/5">
                      {typeof row.pro === 'boolean' ? (row.pro ? <Check size={18} className="text-green mx-auto" /> : <X size={18} className="text-slate-300 mx-auto" />) : row.pro}
                    </td>
                    <td className="py-4 px-6 text-center font-sans text-sm text-slate-600">
                      {typeof row.elite === 'boolean' ? (row.elite ? <Check size={18} className="text-green mx-auto" /> : <X size={18} className="text-slate-300 mx-auto" />) : row.elite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Sample Courses ── */}
        <section className="bg-slate-50 py-20 border-y border-slate-100 mb-24">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-heading font-bold text-3xl text-navy mb-3">Included in Pro & Elite</h2>
                <p className="font-sans text-slate-500 max-w-lg">Get unrestricted access to our entire premium catalog covering every pillar of wealth creation.</p>
              </div>
              <Button to="/courses" variant="outline" className="shrink-0">View All Courses</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_COURSES.map(course => (
                <BlogCard key={course.id} post={course} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white rounded-panel p-6 lg:p-10 border border-slate-100 shadow-resting">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
