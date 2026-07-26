import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { RecommendedItem } from '../../types/dashboard';
import { fadeInUp, staggerContainer, cardHoverVariants } from '../../utils/animations';
import { getPillarStyle } from '../../utils/pillarConfig';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface RecommendedCarouselProps {
  items: RecommendedItem[];
}

export const RecommendedCarousel: React.FC<RecommendedCarouselProps> = ({ items }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Use shared pillar config for consistent colors
  const getPillarStyles = (pillar: RecommendedItem['pillar']) => {
    const s = getPillarStyle(pillar);
    return {
      badge: s.badge,
      indicator: s.indicator,
      hoverKey: s.hoverKey,
    };
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = document.getElementById('recommended-carousel-track');
    if (el) {
      const scrollAmt = direction === 'left' ? -340 : 340;
      el.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="col-span-12 bg-[#F8FAFC] border border-slate-200/40 rounded-panel p-6 md:p-8 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue/10 text-blue rounded-card shadow-sm">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-sans font-bold tracking-wider text-blue uppercase">
              Curated Content
            </span>
            <h2 className="font-heading font-bold text-h3 text-navy mt-1">
              Recommended for You
            </h2>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scrollCarousel('left')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm text-navy"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scrollCarousel('right')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm text-navy"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <motion.div
        id="recommended-carousel-track"
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => {
          const styles = getPillarStyles(item.pillar);

          return (
            <motion.div
              key={item.id}
              variants={cardHoverVariants}
              initial="rest"
              whileHover={styles.hoverKey}
              onHoverStart={() => setHoveredCardId(item.id)}
              onHoverEnd={() => setHoveredCardId(null)}
              className="flex-shrink-0 w-[310px] md:w-[340px] snap-start bg-white border border-slate-100 rounded-card overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Image with 6% hover zoom */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  animate={{ scale: hoveredCardId === item.id ? 1.06 : 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />
                
                {/* Accent line & Badge */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${styles.indicator}`} />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${styles.badge}`}>
                  {item.pillar}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-navy line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-text mt-2.5 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-sans text-[11px] font-semibold text-slate-400">
                    Read time: ~6 mins
                  </span>
                  <span className="flex items-center gap-1 text-[12px] font-sans font-bold text-blue hover:text-navy transition-colors duration-200">
                    {item.ctaText}
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
