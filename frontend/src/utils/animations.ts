import type { Variants } from 'framer-motion';

// ─── Entrance Variants ──────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const slideInRight: Variants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ─── Stagger / Container ─────────────────────────────────────────────

export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// ─── Item / Pop-in ───────────────────────────────────────────────────

export const itemPopIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

// ─── Dropdown ────────────────────────────────────────────────────────

export const dropdownAnimation: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.95,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

// ─── Card Hover (unified) ────────────────────────────────────────────

export const cardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 20px rgba(15, 42, 92, 0.08)',
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow:
      '0 12px 28px -4px rgba(15, 42, 92, 0.18), 0 4px 12px -2px rgba(15, 42, 92, 0.10)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

// Per-pillar hover variants used by RecommendedCarousel & PillarCard
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 20px rgba(15, 42, 92, 0.08)',
  },
  hoverEducation: {
    y: -8,
    scale: 1.02,
    boxShadow:
      '0 12px 24px -4px rgba(20, 80, 196, 0.25), 0 4px 12px -2px rgba(20, 80, 196, 0.15)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  hoverFinance: {
    y: -8,
    scale: 1.02,
    boxShadow:
      '0 12px 24px -4px rgba(23, 166, 90, 0.25), 0 4px 12px -2px rgba(23, 166, 90, 0.15)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  hoverCareer: {
    y: -8,
    scale: 1.02,
    boxShadow:
      '0 12px 24px -4px rgba(242, 167, 27, 0.25), 0 4px 12px -2px rgba(242, 167, 27, 0.15)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  hoverRealEstate: {
    y: -8,
    scale: 1.02,
    boxShadow:
      '0 12px 24px -4px rgba(15, 42, 92, 0.25), 0 4px 12px -2px rgba(15, 42, 92, 0.15)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  hoverParenting: {
    y: -8,
    scale: 1.02,
    boxShadow:
      '0 12px 24px -4px rgba(34, 197, 94, 0.25), 0 4px 12px -2px rgba(34, 197, 94, 0.15)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

// ─── Slide Transitions (testimonial carousel) ────────────────────────

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  }),
};

// ─── Count-Up Helper ─────────────────────────────────────────────────

/**
 * Imperatively counts from 0 → target over `duration` ms, calling `onUpdate`
 * each frame. Returns a cleanup fn to cancel the animation.
 *
 * Usage inside a whileInView callback or useEffect:
 *   const cancel = countUp(5000, 1200, (v) => setCount(v));
 *   return cancel;
 */
export function countUp(
  target: number,
  duration: number,
  onUpdate: (value: number) => void,
): () => void {
  const start = performance.now();
  let rafId: number;

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out quad
    const eased = progress * (2 - progress);
    onUpdate(Math.round(eased * target));
    if (progress < 1) {
      rafId = requestAnimationFrame(tick);
    }
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}

// ─── Shimmer Button CSS class ────────────────────────────────────────
// The actual keyframe is defined in index.css.  Apply the class `shimmer-btn`
// to any element to get the sweeping gradient highlight every 4s.
// This constant is exported so components can reference the class name.
export const SHIMMER_BTN_CLASS = 'shimmer-btn';
