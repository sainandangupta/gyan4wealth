import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';
import { Target, TrendingUp, ArrowRight } from 'lucide-react';

interface ProgressBarCardProps {
  progress: number;
  current: number;
  target: number;
}

export const ProgressBarCard: React.FC<ProgressBarCardProps> = ({ progress, current, target }) => {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const end = progress;
    const duration = 1200; // ms
    const startTime = performance.now();

    let animationFrameId: number;


    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easeProgress = progressRatio * (2 - progressRatio);
      setDisplayPercent(Math.floor(easeProgress * end));

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [progress]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="col-span-12 lg:col-span-6 bg-white rounded-card p-6 md:p-8 border border-slate-100 shadow-resting hover:shadow-glow-green transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[12px] font-sans font-bold tracking-wider text-green uppercase bg-green-tint px-2.5 py-1 rounded-sm">
              Financial Goal
            </span>
            <h2 className="font-heading font-bold text-h3 text-navy mt-3">
              Wealth Goal Progress
            </h2>
          </div>
          <div className="p-3 bg-green-tint text-green rounded-card">
            <Target size={20} />
          </div>
        </div>

        <div className="space-y-6 my-4">
          {/* Label + Percentage Count-up */}
          <div className="flex items-end justify-between">
            <div>
              <p className="font-sans text-xs text-slate-text">Primary Portfolio Goal</p>
              <p className="font-heading font-bold text-[22px] text-navy mt-1">
                Generational Fund I
              </p>
            </div>
            <div className="text-right">
              <span className="font-heading font-bold text-[28px] text-green leading-none">
                {displayPercent}%
              </span>
              <span className="font-sans text-xs text-slate-text block">achieved</span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            {/* Animated Progress Bar Fill */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-gold via-green/80 to-green rounded-full"
            />
          </div>

          {/* Values Row */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-3 rounded-sm border border-slate-100">
              <span className="font-sans text-[11px] text-slate-text uppercase font-semibold">Current Balance</span>
              <p className="font-heading font-bold text-base text-navy mt-1">
                {formatCurrency(current)}
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-sm border border-slate-100">
              <span className="font-sans text-[11px] text-slate-text uppercase font-semibold">Target Amount</span>
              <p className="font-heading font-bold text-base text-slate-700 mt-1">
                {formatCurrency(target)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-text">
          <TrendingUp size={14} className="text-green" />
          <span>On track to reach by Dec 2027</span>
        </div>
        <button className="flex items-center gap-1 text-[13px] font-sans font-bold text-blue hover:text-navy transition-colors duration-200 group">
          Adjust Goals
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </motion.div>
  );
};
