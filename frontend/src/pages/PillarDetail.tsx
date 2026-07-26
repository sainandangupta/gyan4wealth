import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { PILLARS_DATA } from '../data/pillarsData';
import type { ResourceItem } from '../data/pillarsData';
import { getPillarStyle } from '../utils/pillarConfig';
import { fadeInUp, staggerContainer, slideVariants, cardHover, SHIMMER_BTN_CLASS } from '../utils/animations';
import {
  ChevronRight,
  ChevronLeft,
  PieChart,
  TrendingUp,
  Shield,
  ShieldCheck,
  Heart,
  FileText,
  Briefcase,
  Zap,
  Award,
  BarChart,
  Activity,
  Building,
  Landmark,
  GraduationCap,
  PlayCircle,
  FileDown
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  PieChart, TrendingUp, Shield, ShieldCheck, Heart, FileText,
  Briefcase, Zap, Award, BarChart, Activity, Building, Landmark,
  GraduationCap
};

export const PillarDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? PILLARS_DATA[slug] : null;

  // ── Window Resize Logic for Carousel ──
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) setItemsPerSlide(3);
      else if (window.innerWidth >= 768) setItemsPerSlide(2);
      else setItemsPerSlide(1);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // ── Carousel State ──
  const [[currentSlide, slideDirection], setSlide] = useState([0, 0]);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const totalSlides = data ? Math.ceil(data.resources.length / itemsPerSlide) : 1;

  const paginate = useCallback(
    (dir: number) => {
      setSlide(([prev]) => {
        const next = (prev + dir + totalSlides) % totalSlides;
        return [next, dir];
      });
    },
    [totalSlides]
  );

  // Auto-advance
  useEffect(() => {
    if (autoAdvance && totalSlides > 1) {
      intervalRef.current = setInterval(() => paginate(1), 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoAdvance, paginate, totalSlides]);

  // Reset slide when navigating to a new pillar
  useEffect(() => {
    setSlide([0, 0]);
  }, [slug]);

  if (!data) {
    return <Navigate to="/pillars" replace />;
  }

  const style = getPillarStyle(data.pillarId);

  // ── Render Helpers ──
  const visibleResources = data.resources.slice(
    currentSlide * itemsPerSlide,
    currentSlide * itemsPerSlide + itemsPerSlide
  );

  return (
    <div className="min-h-screen bg-off-white">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/2"
          >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6 font-sans text-sm font-semibold">
              <Link to="/" className="text-slate-400 hover:text-navy transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <Link to="/pillars" className="text-slate-400 hover:text-navy transition-colors">Pillars</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className={style.text}>{data.pillarId}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] text-navy leading-tight tracking-tight mb-6"
            >
              {data.heroHeadline}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-sans text-base lg:text-lg text-slate-text leading-relaxed mb-8 max-w-xl"
            >
              {data.heroIntro}
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Button to="/dashboard" variant="primary">
                Start Learning
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <img
                src={data.heroImage}
                alt={data.pillarId}
                className="w-full max-w-md lg:max-w-lg rounded-panel shadow-2xl relative z-10 border border-white/50"
              />
              {/* Soft glow matching pillar color */}
              <div
                className={`absolute inset-0 -z-10 blur-3xl scale-110 rounded-full opacity-30 ${style.bg}`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — WHY THIS MATTERS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="w-full lg:w-1/2 order-2 lg:order-1"
          >
            <motion.span
              variants={fadeInUp}
              className={`inline-block ${style.badge} text-[11px] font-sans font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4`}
            >
              The Core Concept
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-h2 lg:text-[36px] text-navy mb-6 leading-snug"
            >
              {data.whyMattersHeadline}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-base lg:text-[17px] text-slate-text leading-relaxed max-w-xl"
            >
              {data.whyMattersText}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <img
              src={data.whyMattersImage}
              alt="Why it matters"
              className="w-full rounded-panel shadow-resting border border-slate-100 object-cover h-64 md:h-80 lg:h-96"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — WHAT YOU'LL LEARN
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-heading font-bold text-h2 lg:text-[36px] text-navy mb-4"
          >
            What You'll Learn
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-base text-slate-text max-w-2xl mx-auto leading-relaxed"
          >
            Our curriculum breaks down complex financial concepts into actionable steps. Here is a preview of the modules within this pillar.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.learnings.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? PieChart;
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-card border border-slate-100 shadow-resting hover:shadow-glow-navy transition-shadow duration-300"
              >
                <div className={`w-12 h-12 rounded-card ${style.bgTint} flex items-center justify-center mb-6`}>
                  <Icon size={24} className={style.text} />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-slate-text leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — ANIMATED INFOGRAPHIC
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28 border-y border-slate-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className={`inline-block ${style.badge} text-[11px] font-sans font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4`}
            >
              The Data
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-h2 lg:text-[32px] text-navy"
            >
              {data.chart.title}
            </motion.h2>
          </motion.div>

          <div className="relative h-72 md:h-80 flex items-end justify-between md:justify-around gap-2 px-2 md:px-10 border-b-2 border-slate-200 pb-2">
            {data.chart.values.map((val, i) => {
              const heightPercent = (val / data.chart.max) * 100;
              return (
                <div key={i} className="flex flex-col items-center justify-end h-full w-12 md:w-20 group">
                  {/* Floating value tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="font-sans font-bold text-sm md:text-base text-navy mb-2 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity"
                  >
                    {val}{data.chart.suffix}
                  </motion.div>

                  {/* Animated Bar */}
                  <div className={`w-full flex-1 bg-slate-100 rounded-t-md relative overflow-hidden flex items-end ${style.bgTint}`}>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPercent}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                      className={`w-full rounded-t-md ${style.bg} ${style.glow}`}
                    />
                  </div>

                  {/* Label below axis */}
                  <div className="absolute -bottom-8 font-sans font-semibold text-xs md:text-sm text-slate-500 whitespace-nowrap">
                    {data.chart.labels[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — RELATED RESOURCES CAROUSEL
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-heading font-bold text-h2 lg:text-[32px] text-navy">
            Related Resources
          </h2>
          {totalSlides > 1 && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-navy hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-navy hover:bg-slate-50 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div
          className="relative min-h-[300px] overflow-hidden rounded-xl"
          onMouseEnter={() => setAutoAdvance(false)}
          onMouseLeave={() => setAutoAdvance(true)}
        >
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-grab active:cursor-grabbing w-full absolute inset-0"
            >
              {visibleResources.map((res) => (
                <div key={res.id} className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-resting group h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={res.image}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      {res.type === 'Course' || res.type === 'Masterclass' ? (
                        <PlayCircle size={40} className="text-white opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                      ) : (
                        <FileDown size={40} className="text-white opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                      )}
                    </div>
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-white/90 text-navy border-white/50`}>
                      {res.type}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="font-heading font-bold text-base text-navy line-clamp-2">
                      {res.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="font-sans font-semibold text-slate-400">Members Only</span>
                      <span className={`font-sans font-bold ${style.text}`}>View →</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Mobile controls */}
        {totalSlides > 1 && (
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide([i, i > currentSlide ? 1 : -1])}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === currentSlide ? 'bg-gold w-6' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — TESTIMONIAL
          ═══════════════════════════════════════════════════════════════ */}
      <section className={`${style.bgTint} py-20 lg:py-28 relative overflow-hidden`}>
        {/* Decor */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${style.bg} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
        
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-heading font-bold text-2xl md:text-3xl lg:text-[40px] text-navy leading-tight italic mb-8">
              "{data.testimonial.quote}"
            </p>
            <div className="flex items-center justify-center gap-2 text-sm font-sans">
              <span className="w-8 h-[2px] bg-gold" />
              <span className="font-bold text-slate-600">{data.testimonial.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — DUAL CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-navy py-20 lg:py-24 text-center px-5 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="font-heading font-bold text-h2 lg:text-[40px] text-white leading-tight mb-6">
            Master the {data.pillarId} Pillar
          </motion.h2>
          <motion.p variants={fadeInUp} className="font-sans text-lg text-white/70 mb-10">
            Join the community and get immediate access to all courses, masterclasses, and templates within this pillar.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/dashboard" variant="primary">
              Start Learning
            </Button>
            <Button to="/contact" variant="outline">
              Talk to us
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};
