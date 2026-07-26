import React from 'react';
import { motion } from 'framer-motion';

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineItemProps {
  milestone: Milestone;
  index: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ milestone, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-center justify-between lg:justify-normal lg:odd:flex-row-reverse group w-full mb-12 lg:mb-20">
      {/* Icon Marker */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="absolute left-0 lg:left-1/2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gold border-4 border-white shadow-md z-10 transform lg:-translate-x-1/2 flex items-center justify-center shrink-0 mt-2 lg:mt-0"
      >
        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-navy rounded-full" />
      </motion.div>

      {/* Empty space for alternating on desktop, hidden on mobile/tablet */}
      <div className="hidden lg:block w-5/12" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full pl-10 lg:pl-0 lg:w-5/12 flex flex-col`}
      >
        <div
          className={`bg-white p-6 rounded-card shadow-resting border border-slate-100 transition-shadow duration-300 group-hover:shadow-glow-navy ${
            isEven ? 'lg:text-right' : 'lg:text-left'
          }`}
        >
          <span className="inline-block px-3 py-1 bg-navy/10 text-navy font-bold text-xs rounded-full mb-3">
            {milestone.year}
          </span>
          <h3 className="font-heading font-bold text-lg text-navy mb-2">
            {milestone.title}
          </h3>
          <p className="font-sans text-sm text-slate-text leading-relaxed">
            {milestone.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
