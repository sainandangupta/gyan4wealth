import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';
import { Award, ArrowRight } from 'lucide-react';

interface ProgressRingCardProps {
  score: number;
}

export const ProgressRingCard: React.FC<ProgressRingCardProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const end = score;
    const duration = 1200; // ms
    const startTime = performance.now();

    let animationFrameId: number;


    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      setDisplayScore(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [score]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

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
              Core Metric
            </span>
            <h2 className="font-heading font-bold text-h3 text-navy mt-3">
              Financial Literacy Score
            </h2>
          </div>
          <div className="p-3 bg-green-tint text-green rounded-card">
            <Award size={20} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-4">
          {/* Custom SVG Circular Progress Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg viewBox="0 0 180 180" className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="goldToGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F2A71B" /> {/* Gold */}
                  <stop offset="100%" stopColor="#17A65A" /> {/* Green */}
                </linearGradient>
              </defs>
              {/* Underlay Circle */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="#F1F5F9"
                strokeWidth="12"
                fill="none"
              />
              {/* Fill Circle */}
              <motion.circle
                cx="90"
                cy="90"
                r={radius}
                stroke="url(#goldToGreenGrad)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - (circumference * score) / 100 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            
            {/* Center Text displaying synchronized score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading font-bold text-[38px] text-navy leading-none">
                {displayScore}%
              </span>
              <span className="font-sans text-[11px] font-semibold text-slate-text mt-1 uppercase tracking-wider">
                Expert Level
              </span>
            </div>
          </div>

          {/* Metric Details */}
          <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
            <div className="mb-4">
              <p className="font-heading font-bold text-lg text-navy">Excellent Standing</p>
              <p className="font-sans text-[14px] text-slate-text mt-1 leading-relaxed">
                You scored higher than 92% of users in estate planning and investment risk assessments this month.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-text">
                <span className="w-2.5 h-2.5 rounded-full bg-green inline-block" />
                Real Estate Valuation: 94/100
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-text">
                <span className="w-2.5 h-2.5 rounded-full bg-gold inline-block" />
                Tax Strategy & Planning: 76/100
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="font-sans text-xs text-slate-text">
          Last assessed: 3 days ago
        </span>
        <button className="flex items-center gap-1 text-[13px] font-sans font-bold text-blue hover:text-navy transition-colors duration-200 group">
          Improve Score
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </motion.div>
  );
};
