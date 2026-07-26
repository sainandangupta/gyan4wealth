import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PillarCard } from '../components/PillarCard';
import { fadeInUp, staggerContainer } from '../utils/animations';
import type { Pillar } from '../utils/pillarConfig';
import { getPillarStyle } from '../utils/pillarConfig';
import { BookOpen, TrendingUp, Gem, Briefcase, Building, Heart } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════ */

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
    description: 'Master foundational concepts — budgeting, compound interest, and cashflow.',
    image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=600&auto=format&fit=crop&q=80',
    large: true,
  },
  {
    pillar: 'Finance',
    title: 'Personal Finance',
    description: 'Build a bulletproof plan with SIPs, emergency buffers, and debt reduction.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    large: true,
  },
  {
    pillar: 'Career',
    title: 'Career Growth',
    description: 'Negotiate equity comp and build high-income skills.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  },
  {
    pillar: 'Wealth',
    title: 'Wealth Creation',
    description: 'Master mutual funds, stock analysis, and portfolio allocation.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
  },
  {
    pillar: 'Real Estate',
    title: 'Real Estate Investing',
    description: 'Evaluate properties, REIT yields, and cap rate benchmarks.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80',
  },
  {
    pillar: 'Parenting',
    title: 'Financial Parenting',
    description: 'Set up PPF/SSY accounts and education funds for your children.',
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&auto=format&fit=crop&q=80',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   CONNECTION DIAGRAM
   ═══════════════════════════════════════════════════════════════════════ */

const NODES = [
  { id: 'Education', x: 15, y: 50, icon: BookOpen },
  { id: 'Career', x: 35, y: 25, icon: Briefcase },
  { id: 'Finance', x: 50, y: 50, icon: TrendingUp },
  { id: 'Real Estate', x: 65, y: 25, icon: Building },
  { id: 'Parenting', x: 65, y: 75, icon: Heart },
  { id: 'Wealth', x: 85, y: 50, icon: Gem },
];

const EDGES = [
  { from: 'Education', to: 'Career' },
  { from: 'Education', to: 'Finance' },
  { from: 'Career', to: 'Finance' },
  { from: 'Career', to: 'Real Estate' },
  { from: 'Finance', to: 'Real Estate' },
  { from: 'Finance', to: 'Parenting' },
  { from: 'Finance', to: 'Wealth' },
  { from: 'Real Estate', to: 'Wealth' },
  { from: 'Parenting', to: 'Wealth' },
];

const ConnectionDiagram: React.FC = () => {
  return (
    <div className="w-full">
      {/* Desktop View (lg and up) */}
      <div className="hidden lg:block relative w-full aspect-[2.2/1] max-w-5xl mx-auto rounded-card bg-white shadow-resting border border-slate-100 p-10 overflow-hidden">
        {/* SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {EDGES.map((edge, i) => {
            const n1 = NODES.find((n) => n.id === edge.from)!;
            const n2 = NODES.find((n) => n.id === edge.to)!;
            return (
              <motion.line
                key={i}
                x1={`${n1.x}%`}
                y1={`${n1.y}%`}
                x2={`${n2.x}%`}
                y2={`${n2.y}%`}
                stroke="#E2E8F0"
                strokeWidth="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: i * 0.15 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const style = getPillarStyle(node.id as Pillar);
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10 group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center bg-white border-2 ${style.border} shadow-sm group-hover:${style.glow} transition-shadow duration-300`}
              >
                <div className={`w-12 h-12 rounded-full ${style.bgTint} flex items-center justify-center`}>
                  <Icon size={24} className={style.text} />
                </div>
              </div>
              <span className="font-heading font-bold text-sm text-navy bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                {node.id}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile/Tablet View */}
      <div className="lg:hidden relative bg-white rounded-card shadow-resting border border-slate-100 p-8">
        {/* Vertical animated line */}
        <div className="absolute left-[39px] md:left-[43px] top-12 bottom-12 w-[2px] bg-slate-100 overflow-hidden">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="w-full bg-slate-300"
          />
        </div>

        <div className="flex flex-col gap-8 relative z-10">
          {NODES.map((node, i) => {
            const style = getPillarStyle(node.id as Pillar);
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex items-center gap-5 md:gap-6 group"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full flex items-center justify-center bg-white border ${style.border} shadow-sm group-hover:${style.glow} transition-shadow duration-300`}
                >
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full ${style.bgTint} flex items-center justify-center`}>
                    <Icon size={18} className={style.text} />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base md:text-lg text-navy">
                    {node.id}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-slate-text mt-0.5">
                    Forms the foundation for subsequent pillars.
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════ */

export const PillarsOverview: React.FC = () => {
  return (
    <div className="min-h-screen bg-off-white">
      <Header />

      <main className="pt-32 pb-20 lg:pt-40 lg:pb-28 max-w-7xl mx-auto px-5 lg:px-8">
        
        {/* Intro */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 lg:mb-24"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-blue/10 text-blue font-sans font-bold text-[11px] tracking-wider uppercase px-4 py-1.5 rounded-full border border-blue/20 mb-5"
          >
            The Ecosystem
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[52px] text-navy leading-tight tracking-tight mb-6"
          >
            A Holistic Approach to <br className="hidden sm:block" />
            <span className="text-gold">Wealth Creation</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-sans text-base lg:text-lg text-slate-text max-w-2xl mx-auto leading-relaxed"
          >
            True financial freedom doesn't come from a single investment. It requires a balanced mastery of six interconnected pillars.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <section className="mb-24 lg:mb-32">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
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

        {/* How They Connect Diagram */}
        <section>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-h2 lg:text-[36px] text-navy mb-4"
            >
              How They Connect
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-base text-slate-text max-w-xl mx-auto leading-relaxed"
            >
              The pillars are not isolated. Success in one accelerates your progress in the others.
            </motion.p>
          </motion.div>

          <ConnectionDiagram />
        </section>

      </main>

      <Footer />
    </div>
  );
};
