import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Send,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Star,
} from 'lucide-react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PillarCard } from '../components/PillarCard';
import { Particles } from '../components/Particles';
import { useCountUp } from '../hooks/useCountUp';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  slideVariants,
  SHIMMER_BTN_CLASS,
} from '../utils/animations';
import type { Pillar } from '../utils/pillarConfig';

/* ═══════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════ */

const STATS = [
  { label: 'Active Members', target: 5200, suffix: '+', icon: Users },
  { label: 'Expert-Led Courses', target: 48, suffix: '+', icon: BookOpen },
  { label: 'Live Masterclasses', target: 120, suffix: '+', icon: Award },
  { label: 'Portfolio Growth Avg.', target: 34, suffix: '%', icon: TrendingUp },
];

const PILLAR_DATA: {
  pillar: Pillar;
  title: string;
  description: string;
  image: string;
  large?: boolean;
}[] = [
  {
    pillar: 'Education',
    title: 'Financial Education',
    description:
      'Master foundational financial concepts — budgeting, compound interest, and cashflow management through structured modules.',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    large: true,
  },
  {
    pillar: 'Finance',
    title: 'Personal Finance',
    description:
      'Build a bulletproof financial plan with SIPs, emergency buffers, insurance optimization, and debt reduction strategies.',
    image:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=80',
    large: true,
  },
  {
    pillar: 'Career',
    title: 'Career Growth',
    description:
      'Negotiate equity comp, develop high-income skills, and build your professional brand for accelerated earnings.',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
  },
  {
    pillar: 'Wealth',
    title: 'Wealth Creation',
    description:
      'Master mutual funds, stock analysis, gold bonds, and portfolio allocation strategies for long-term compounding.',
    image:
      'https://images.unsplash.com/photo-1610374792793-f016b77ca51a?w=600&auto=format&fit=crop&q=80',
  },
  {
    pillar: 'Real Estate',
    title: 'Real Estate Investing',
    description:
      'Evaluate commercial properties, REIT yields, NOI calculations, and cap rate benchmarks for passive rental income.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
  },
  {
    pillar: 'Parenting',
    title: 'Financial Parenting',
    description:
      'Set up PPF/SSY accounts, trust structures, and education funds so your children inherit financial literacy and wealth.',
    image:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=80',
  },
];

const STORY_BLOCKS = [
  {
    tag: 'Our Mission',
    title: 'Democratising Wealth Literacy Across India',
    text: 'We believe every family deserves access to the wealth-building knowledge that was once reserved for the privileged few. Our expert-curated curriculum covers six foundational pillars — from budgeting basics to commercial real estate — distilled into actionable modules you can apply from day one.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&auto=format&fit=crop&q=80',
  },
  {
    tag: 'Community-Driven',
    title: 'Learn Alongside 5,000+ Vetted Members',
    text: 'Our private community circles connect you with like-minded investors, seasoned mentors, and industry specialists. Participate in live Q&A sessions, share portfolio strategies, and stay accountable with peer groups tracking the same wealth milestones.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80',
  },
  {
    tag: 'Results First',
    title: 'Measurable Outcomes, Not Just Theory',
    text: 'Every module ends with a practical exercise — set up a SIP, evaluate a REIT, negotiate your next offer letter. Our Financial Literacy Score tracks your progress across all six pillars, giving you a clear roadmap to financial independence.',
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=700&auto=format&fit=crop&q=80',
  },
];

const TESTIMONIALS = [
  {
    quote:
      `Gyan4Wealth transformed how I think about money. Within 6 months, I had set up an emergency fund, optimized my SIPs, and started evaluating REITs — things I never imagined doing.`,
    name: 'Priya Sharma',
    role: 'Marketing Manager, Bengaluru',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    quote:
      `The real estate pillar alone was worth the entire membership. I closed on my first commercial property with confidence using the NOI and cap rate frameworks taught here.`,
    name: 'Vikram Mehta',
    role: 'Software Engineer, Pune',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    quote:
      `Setting up a PPF account for my daughter's education was something I kept postponing. The parenting module made it so simple — step by step, with tax implications clearly explained.`,
    name: 'Anjali Nair',
    role: 'Chartered Accountant, Kochi',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
  },
];

const FAQ_DATA = [
  {
    q: 'Who is Gyan4Wealth designed for?',
    a: 'Anyone looking to build long-term wealth — salaried professionals, entrepreneurs, families, and new investors. Our content spans beginner to advanced levels across six financial pillars.',
  },
  {
    q: 'How is this different from free YouTube content?',
    a: 'Our curriculum is structured, sequenced, and actionable. Each module has practical exercises, expert mentorship, and a community for accountability. We track your Financial Literacy Score so you can measure progress.',
  },
  {
    q: 'What are the six pillars?',
    a: 'Education, Personal Finance, Career Growth, Wealth Creation, Real Estate Investing, and Financial Parenting. Each pillar has dedicated courses, masterclasses, and community circles.',
  },
  {
    q: 'Do you offer live sessions?',
    a: 'Yes — weekly masterclasses with industry experts, monthly portfolio review sessions, and quarterly goal-setting workshops. All sessions are recorded for members who can\'t attend live.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Absolutely. We offer a 14-day full refund guarantee. If the platform doesn\'t meet your expectations, email us and we\'ll process your refund — no questions asked.',
  },
  {
    q: 'How do I track my progress?',
    a: 'Your member dashboard includes a Financial Literacy Score, wealth goal tracker, course completion status, and achievement badges. You\'ll see exactly where you stand and what to focus on next.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

/** Single stat card with count-up on whileInView */
const StatCard: React.FC<{
  label: string;
  target: number;
  suffix: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}> = ({ label, target, suffix, icon: Icon }) => {
  const counter = useCountUp({ target, suffix, duration: 1200 });

  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-card px-5 py-4 shadow-resting"
      onViewportEnter={() => counter.start()}
    >
      <div className="w-11 h-11 rounded-card bg-gold-tint flex items-center justify-center shrink-0">
        <Icon size={20} className="text-gold" />
      </div>
      <div>
        <p className="font-heading font-bold text-xl lg:text-2xl text-navy leading-none">
          {counter.display}
        </p>
        <p className="font-sans text-[11px] text-slate-text mt-0.5 font-medium">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

/** FAQ accordion item with measured-height animation */
const FAQItem: React.FC<{
  q: string;
  a: string;
  open: boolean;
  toggle: () => void;
}> = ({ q, a, open, toggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [measuredH, setMeasuredH] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMeasuredH(contentRef.current.scrollHeight);
    }
  }, [a, open]);

  return (
    <div className="border border-slate-200/60 rounded-card overflow-hidden bg-white shadow-sm">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <span className="font-sans font-bold text-sm text-navy pr-4 group-hover:text-blue transition-colors">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={18} className="text-slate-400" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? measuredH : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-5 pb-4">
          <p className="font-sans text-[13px] text-slate-text leading-relaxed">
            {a}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════════════════ */

export const Homepage: React.FC = () => {
  const shouldReduce = useReducedMotion();

  // ── Parallax blobs (desktop only) ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blobX1 = useTransform(mouseX, [0, 1], [-20, 20]);
  const blobY1 = useTransform(mouseY, [0, 1], [-15, 15]);
  const blobX2 = useTransform(mouseX, [0, 1], [15, -15]);
  const blobY2 = useTransform(mouseY, [0, 1], [10, -10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduce) return;
      const { clientX, clientY } = e;
      mouseX.set(clientX / window.innerWidth);
      mouseY.set(clientY / window.innerHeight);
    },
    [mouseX, mouseY, shouldReduce],
  );

  // ── Testimonial carousel state ──
  const [[currentSlide, slideDirection], setSlide] = useState([0, 0]);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const paginate = useCallback(
    (dir: number) => {
      setSlide(([prev]) => {
        const next =
          (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length;
        return [next, dir];
      });
    },
    [],
  );

  useEffect(() => {
    if (autoAdvance) {
      intervalRef.current = setInterval(() => paginate(1), 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoAdvance, paginate]);

  // ── FAQ state ──
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const midFAQ = Math.ceil(FAQ_DATA.length / 2);

  return (
    <div className="min-h-screen bg-off-white">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden hero-mesh"
        onMouseMove={handleMouseMove}
      >
        {/* Particles */}
        <Particles count={18} />

        {/* Blurred blobs — desktop only */}
        <motion.div
          style={{ x: blobX1, y: blobY1 }}
          className="hidden lg:block absolute top-[15%] left-[10%] w-[420px] h-[420px] bg-gold/10 rounded-full blur-3xl pointer-events-none z-[1]"
        />
        <motion.div
          style={{ x: blobX2, y: blobY2 }}
          className="hidden lg:block absolute bottom-[10%] right-[5%] w-[380px] h-[380px] bg-green/10 rounded-full blur-3xl pointer-events-none z-[1]"
        />
        <motion.div
          style={{ x: blobX1, y: blobY2 }}
          className="hidden lg:block absolute top-[50%] right-[30%] w-[280px] h-[280px] bg-blue/8 rounded-full blur-3xl pointer-events-none z-[1]"
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full pt-28 pb-20 lg:pt-0 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-72px)]">
            {/* Left — copy */}
            <motion.div
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-[11px] font-sans font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6"
              >
                India's Premier Wealth Literacy Platform
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.15] tracking-tight"
              >
                Master the{' '}
                <span className="bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
                  Six Pillars
                </span>{' '}
                of Financial Freedom
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="font-sans text-base lg:text-lg text-white/70 mt-6 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Expert-led courses, live masterclasses, and a vetted community
                — everything you need to build, protect, and multiply
                generational wealth.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start"
              >
                <Link
                  to="/contact"
                  className={`${SHIMMER_BTN_CLASS} inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-sans font-bold text-sm px-7 py-3.5 rounded-sm transition-all duration-200 shadow-lg shadow-gold/20 hover:shadow-glow-gold`}
                >
                  Start Your Journey
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-sans font-bold text-sm px-7 py-3 rounded-sm transition-all duration-200 hover:bg-white/5"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — floating illustration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="relative flex justify-center lg:justify-end"
            >
              <motion.div
                animate={shouldReduce ? {} : { y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80"
                  alt="Wealth growth illustration"
                  className="w-full max-w-md lg:max-w-lg rounded-panel shadow-2xl shadow-navy/40 border border-white/10"
                />
                {/* Glow behind image */}
                <div className="absolute inset-0 -z-10 bg-gold/15 blur-3xl rounded-full scale-110" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — TRUST STAT BAR
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-5 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STATS.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              target={s.target}
              suffix={s.suffix}
              icon={s.icon}
            />
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — SIX PILLARS BENTO GRID
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-blue/8 text-blue text-[11px] font-sans font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4"
          >
            Our Framework
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-heading font-bold text-h2 lg:text-[36px] text-navy"
          >
            The Six Pillars of Financial Freedom
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-base text-slate-text max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            A structured curriculum designed to take you from financial
            awareness to generational wealth — one pillar at a time.
          </motion.p>
        </motion.div>

        {/* Bento Grid: 2 large col-span-6 + 4 standard col-span-3 */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-12 gap-6"
        >
          {PILLAR_DATA.map((p) => (
            <PillarCard
              key={p.pillar}
              pillar={p.pillar}
              title={p.title}
              description={p.description}
              image={p.image}
              large={p.large}
            />
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — STORYTELLING BLOCKS (3x alternating)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 space-y-20 lg:space-y-28">
          {STORY_BLOCKS.map((block, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div
                key={idx}
                className={`flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-10 lg:gap-16 items-center`}
              >
                {/* Image */}
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="w-full lg:w-1/2"
                >
                  <div className="overflow-hidden rounded-panel shadow-resting">
                    <motion.img
                      src={block.image}
                      alt={block.title}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  variants={staggerContainer(0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="w-full lg:w-1/2"
                >
                  <motion.span
                    variants={fadeInUp}
                    className="inline-block bg-green-tint text-green text-[11px] font-sans font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-green/15 mb-4"
                  >
                    {block.tag}
                  </motion.span>
                  <motion.h2
                    variants={fadeInUp}
                    className="font-heading font-bold text-h2 lg:text-[32px] text-navy leading-snug"
                  >
                    {block.title}
                  </motion.h2>
                  <motion.p
                    variants={fadeInUp}
                    className="font-sans text-[15px] text-slate-text mt-5 leading-relaxed"
                  >
                    {block.text}
                  </motion.p>
                  <motion.div variants={fadeInUp} className="mt-6">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2 text-blue font-sans font-bold text-sm hover:text-navy transition-colors group"
                    >
                      Learn More
                      <ArrowRight
                        size={15}
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — TESTIMONIAL CAROUSEL
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-off-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-gold-tint text-gold text-[11px] font-sans font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-gold/15 mb-4"
            >
              Member Stories
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-h2 lg:text-[36px] text-navy"
            >
              What Our Members Say
            </motion.h2>
          </motion.div>

          {/* Carousel */}
          <div
            className="relative"
            onMouseEnter={() => setAutoAdvance(false)}
            onMouseLeave={() => setAutoAdvance(true)}
          >
            <div className="overflow-hidden rounded-panel min-h-[280px] lg:min-h-[240px]">
              <AnimatePresence custom={slideDirection} mode="wait">
                <motion.div
                  key={currentSlide}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) paginate(1);
                    else if (info.offset.x > 60) paginate(-1);
                  }}
                  className="bg-white rounded-panel p-8 lg:p-10 shadow-resting border border-slate-100 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-gold fill-gold"
                        />
                      ))}
                    </div>
                    <p className="font-sans text-[15px] lg:text-base text-slate-text leading-relaxed max-w-2xl italic">
                      "{TESTIMONIALS[currentSlide].quote}"
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <img
                        src={TESTIMONIALS[currentSlide].avatar}
                        alt={TESTIMONIALS[currentSlide].name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div className="text-left">
                        <p className="font-sans font-bold text-sm text-navy">
                          {TESTIMONIALS[currentSlide].name}
                        </p>
                        <p className="font-sans text-[11px] text-slate-text">
                          {TESTIMONIALS[currentSlide].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-navy hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide([i, i > currentSlide ? 1 : -1])}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === currentSlide
                        ? 'bg-gold w-6'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-navy hover:bg-slate-50 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — FAQ
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-navy/8 text-navy text-[11px] font-sans font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-navy/10 mb-4"
            >
              Common Questions
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-h2 lg:text-[36px] text-navy"
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          {/* Two-column desktop, single-column mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              {FAQ_DATA.slice(0, midFAQ).map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  open={openFAQ === i}
                  toggle={() =>
                    setOpenFAQ((prev) => (prev === i ? null : i))
                  }
                />
              ))}
            </div>
            <div className="space-y-4">
              {FAQ_DATA.slice(midFAQ).map((faq, i) => {
                const realIdx = i + midFAQ;
                return (
                  <FAQItem
                    key={realIdx}
                    q={faq.q}
                    a={faq.a}
                    open={openFAQ === realIdx}
                    toggle={() =>
                      setOpenFAQ((prev) =>
                        prev === realIdx ? null : realIdx,
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — NEWSLETTER BAND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="newsletter-sheen bg-navy py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-h2 lg:text-[32px] text-white"
            >
              Get Weekly Wealth Insights
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-sm text-white/60 mt-3 leading-relaxed max-w-lg mx-auto"
            >
              Join 5,000+ members receiving curated market analysis, tax-saving
              strategies, and investment opportunities — straight to your inbox
              every Monday.
            </motion.p>

            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/15 rounded-sm text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="submit"
                className={`${SHIMMER_BTN_CLASS} inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-navy font-sans font-bold text-sm px-6 py-3 rounded-sm transition-all duration-200 shadow-sm hover:shadow-glow-gold shrink-0`}
              >
                <Send size={14} />
                Subscribe
              </button>
            </motion.form>

            <motion.p
              variants={fadeInUp}
              className="font-sans text-[11px] text-white/30 mt-4"
            >
              No spam. Unsubscribe anytime. We respect your privacy.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
