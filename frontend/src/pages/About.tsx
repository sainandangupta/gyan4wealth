import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TimelineItem } from '../components/TimelineItem';
import type { Milestone } from '../components/TimelineItem';
import { Button } from '../components/Button';
import { fadeInUp, staggerContainer, cardHover } from '../utils/animations';
import { Shield, Zap, Users, Award } from 'lucide-react';

const MILESTONES: Milestone[] = [
  {
    year: '2015',
    title: 'The Spark',
    description:
      'Gyan4Wealth was founded with a simple vision: to demystify complex financial concepts for everyday professionals.',
  },
  {
    year: '2018',
    title: '1,000 Members',
    description:
      'We reached our first major milestone, building a vibrant community of proactive wealth builders.',
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description:
      'Launched our mobile app and live masterclass platform, making financial education accessible anywhere.',
  },
  {
    year: '2023',
    title: 'Six Pillars Framework',
    description:
      'Introduced our comprehensive Six Pillars curriculum, standardizing the path to financial independence.',
  },
];

const VALUES = [
  {
    title: 'Transparency',
    description:
      'No hidden fees, no kickbacks. We provide unbiased financial education you can trust.',
    icon: Shield,
  },
  {
    title: 'Empowerment',
    description:
      "We don't manage your money; we teach you how to manage it yourself with absolute confidence.",
    icon: Zap,
  },
  {
    title: 'Community',
    description:
      "Wealth building shouldn't be solitary. Learn and grow alongside peers with shared goals.",
    icon: Users,
  },
  {
    title: 'Excellence',
    description:
      'Our curriculum is continuously updated to reflect the latest market realities and tax codes.',
    icon: Award,
  },
];

const PRESS_LOGOS = [
  { id: '1', name: 'Forbes', url: 'https://placehold.co/200x80/e2e8f0/475569?text=Forbes' },
  { id: '2', name: 'Economic Times', url: 'https://placehold.co/200x80/e2e8f0/475569?text=Economic+Times' },
  { id: '3', name: 'Mint', url: 'https://placehold.co/200x80/e2e8f0/475569?text=Mint' },
  { id: '4', name: 'Moneycontrol', url: 'https://placehold.co/200x80/e2e8f0/475569?text=Moneycontrol' },
];

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-off-white">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden pt-18">
        {/* Full-bleed founder photo background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=1600&auto=format&fit=crop&q=80"
            alt="Founder presentation"
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Navy gradient overlay (left-aligned fade) */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent z-[1]" />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full mt-10">
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.15] tracking-tight mb-6"
            >
              Building India's Most Trusted Wealth Community
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-base lg:text-lg text-white/80 leading-relaxed max-w-xl"
            >
              We believe financial literacy is a fundamental right, not a privilege. Our mission is to equip you with the knowledge to build, protect, and multiply your wealth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — PRESS / MEDIA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="text-center font-sans font-semibold text-sm text-slate-400 uppercase tracking-wider mb-8">
            Featured In
          </p>
          <div className="flex items-center gap-8 md:justify-center overflow-x-auto scrollbar-none pb-4 md:pb-0 px-2 snap-x">
            {PRESS_LOGOS.map((logo) => (
              <img
                key={logo.id}
                src={logo.url}
                alt={`${logo.name} logo`}
                className="h-12 md:h-14 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 snap-center shrink-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — TIMELINE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 max-w-5xl mx-auto px-5 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-gold-tint text-gold text-[11px] font-sans font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-gold/15 mb-4"
          >
            Our Journey
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-heading font-bold text-h2 lg:text-[36px] text-navy"
          >
            A Decade of Impact
          </motion.h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line: left aligned on mobile/tablet, centered on desktop */}
          <div className="absolute left-[9px] lg:left-1/2 top-2 bottom-2 w-[2px] bg-navy/10 transform lg:-translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col">
            {MILESTONES.map((milestone, i) => (
              <TimelineItem key={i} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — VALUES GRID
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
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
              Our Core Values
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-base text-slate-text max-w-2xl mx-auto leading-relaxed"
            >
              These principles guide everything we do, from curriculum design to how we engage with our community.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VALUES.map((value, i) => {
              const isEven = i % 2 === 0;
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="h-full"
                >
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className={`h-full p-8 rounded-card border border-slate-100/50 flex flex-col ${
                      isEven ? 'bg-green-tint/50' : 'bg-gold-tint/50'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm bg-white`}
                    >
                      <Icon size={24} className={isEven ? 'text-green' : 'text-gold'} />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-navy mb-3">
                      {value.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-text leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — CTA BAND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-navy py-20 lg:py-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue/20 via-navy to-navy pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-h2 lg:text-[40px] text-white leading-tight mb-6"
            >
              Ready to take control of your financial future?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-white/70 mb-10 max-w-2xl mx-auto"
            >
              Explore our curriculum and see how the Six Pillars framework can transform your wealth building journey.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button to="/pillars" variant="primary">
                Explore The Pillars
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
