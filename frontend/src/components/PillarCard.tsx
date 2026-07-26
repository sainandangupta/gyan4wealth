import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  TrendingUp,
  Gem,
  Briefcase,
  Building,
  Heart,
} from 'lucide-react';
import type { AnyPillar } from '../utils/pillarConfig';
import { getPillarStyle } from '../utils/pillarConfig';
import { cardHover, fadeInUp } from '../utils/animations';

interface PillarCardProps {
  pillar: AnyPillar;
  title?: string;
  description?: string;
  /** Optional link path — defaults to /pillars/:slug */
  href?: string;
  /** When true, spans col-span-6 on desktop (the "large" variant in the bento grid) */
  large?: boolean;
  /** Optional image URL for the card background */
  image?: string;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  TrendingUp,
  Gem,
  Briefcase,
  Building,
  Heart,
};

export const PillarCard: React.FC<PillarCardProps> = ({
  pillar,
  title,
  description,
  href,
  large = false,
  image,
  className = '',
}) => {
  const style = getPillarStyle(pillar);
  const Icon = ICON_MAP[style.icon] ?? BookOpen;
  const slug = pillar.toLowerCase().replace(/\s+/g, '-').replace('/', '-');
  const linkTo = href ?? `/pillars/${slug}`;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`
        ${large ? 'col-span-12 md:col-span-6' : 'col-span-12 md:col-span-6 lg:col-span-3'}
        ${className}
      `}
    >
      <Link to={linkTo} className="block h-full">
        <motion.div
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          className={`
            relative group h-full bg-white rounded-card overflow-hidden border border-slate-100
            shadow-resting transition-shadow duration-300 flex flex-col
            ${large ? 'min-h-[320px] lg:min-h-[360px]' : 'min-h-[260px]'}
          `}
        >
          {/* Optional cover image */}
          {image && (
            <div className="relative h-36 lg:h-44 overflow-hidden">
              <motion.img
                src={image}
                alt={title ?? style.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              {/* Accent bar bottom */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${style.indicator}`} />
            </div>
          )}

          {/* Card body */}
          <div className="p-5 lg:p-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Icon + badge */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-11 h-11 rounded-card flex items-center justify-center ${style.bgTint} transition-colors duration-200`}
                >
                  <Icon size={20} className={style.text} />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${style.badge}`}
                >
                  {style.label}
                </span>
              </div>

              {/* Title */}
              <h3
                className={`font-heading font-bold text-navy leading-snug mb-2 ${
                  large ? 'text-xl lg:text-h3' : 'text-base'
                }`}
              >
                {title ?? style.label}
              </h3>

              {/* Description */}
              {description && (
                <p
                  className={`font-sans text-slate-text leading-relaxed ${
                    large ? 'text-sm' : 'text-xs'
                  } line-clamp-3`}
                >
                  {description}
                </p>
              )}
            </div>

            {/* Bottom accent line + CTA hint */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className={`h-1 w-10 rounded-full ${style.indicator}`} />
              <span
                className={`text-[12px] font-sans font-bold ${style.text} group-hover:underline transition-all duration-200`}
              >
                Explore →
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};
