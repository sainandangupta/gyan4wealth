/**
 * PILLAR CONSTANTS — Single source of truth for pillar color mapping.
 * Import this everywhere pillars are rendered (Homepage bento, Pillars page,
 * Pillar Detail breadcrumbs, Dashboard RecommendedCarousel, CoursesWidget, PillarCard, etc.)
 */

export type Pillar =
  | 'Education'
  | 'Career'
  | 'Parenting'
  | 'Finance'
  | 'Wealth'
  | 'Real Estate';

/** Backwards-compat alias used in Dashboard data where "Finance/Wealth" was a single category */
export type LegacyPillar = 'Finance/Wealth';

export type AnyPillar = Pillar | LegacyPillar;

export interface PillarStyle {
  /** Display label */
  label: string;
  /** Hex color for custom inline use */
  hex: string;
  /** Tailwind class for text color */
  text: string;
  /** Tailwind class for background color */
  bg: string;
  /** Tailwind class for tinted/light background */
  bgTint: string;
  /** Tailwind class for text on tinted background */
  textOnTint: string;
  /** Tailwind class for border color */
  border: string;
  /** Tailwind badge class combo */
  badge: string;
  /** Tailwind indicator/bar class */
  indicator: string;
  /** Tailwind hover shadow glow class */
  glow: string;
  /** Framer Motion cardHoverVariants key */
  hoverKey: string;
  /** Lucide icon name suggestion */
  icon: string;
}

const PILLAR_STYLES: Record<Pillar, PillarStyle> = {
  Education: {
    label: 'Education',
    hex: '#1450C4',
    text: 'text-blue',
    bg: 'bg-blue',
    bgTint: 'bg-blue/10',
    textOnTint: 'text-blue',
    border: 'border-blue/20',
    badge: 'bg-blue/10 text-blue border-blue/20',
    indicator: 'bg-blue',
    glow: 'shadow-glow-blue',
    hoverKey: 'hoverEducation',
    icon: 'BookOpen',
  },
  Career: {
    label: 'Career',
    hex: '#F2A71B',
    text: 'text-gold',
    bg: 'bg-gold',
    bgTint: 'bg-gold-tint',
    textOnTint: 'text-gold',
    border: 'border-gold/20',
    badge: 'bg-gold-tint text-gold border-gold/20',
    indicator: 'bg-gold',
    glow: 'shadow-glow-gold',
    hoverKey: 'hoverCareer',
    icon: 'Briefcase',
  },
  Parenting: {
    label: 'Parenting',
    hex: '#22C55E',
    text: 'text-emerald-600',
    bg: 'bg-emerald-500',
    bgTint: 'bg-emerald-50',
    textOnTint: 'text-emerald-700',
    border: 'border-emerald-200',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    indicator: 'bg-emerald-500',
    glow: 'shadow-glow-warm-green',
    hoverKey: 'hoverParenting',
    icon: 'Heart',
  },
  Finance: {
    label: 'Finance',
    hex: '#17A65A',
    text: 'text-green',
    bg: 'bg-green',
    bgTint: 'bg-green-tint',
    textOnTint: 'text-green',
    border: 'border-green/20',
    badge: 'bg-green-tint text-green border-green/20',
    indicator: 'bg-green',
    glow: 'shadow-glow-green',
    hoverKey: 'hoverFinance',
    icon: 'TrendingUp',
  },
  Wealth: {
    label: 'Wealth',
    hex: '#17A65A',
    text: 'text-green',
    bg: 'bg-green',
    bgTint: 'bg-green-tint',
    textOnTint: 'text-green',
    border: 'border-green/20',
    badge: 'bg-green-tint text-green border-green/20',
    indicator: 'bg-gradient-to-r from-green to-gold',
    glow: 'shadow-glow-green',
    hoverKey: 'hoverFinance',
    icon: 'Gem',
  },
  'Real Estate': {
    label: 'Real Estate',
    hex: '#0F2A5C',
    text: 'text-navy',
    bg: 'bg-navy',
    bgTint: 'bg-navy/10',
    textOnTint: 'text-navy',
    border: 'border-navy/20',
    badge: 'bg-navy/10 text-navy border-navy/20',
    indicator: 'bg-navy',
    glow: 'shadow-glow-navy',
    hoverKey: 'hoverRealEstate',
    icon: 'Building',
  },
};

/**
 * Get style config for a pillar. Handles the legacy "Finance/Wealth" value
 * by mapping it to "Finance".
 */
export function getPillarStyle(pillar: AnyPillar): PillarStyle {
  if (pillar === 'Finance/Wealth') {
    return PILLAR_STYLES.Finance;
  }
  return PILLAR_STYLES[pillar] ?? PILLAR_STYLES.Education;
}

/** All six pillars in display order */
export const PILLARS: Pillar[] = [
  'Education',
  'Finance',
  'Wealth',
  'Career',
  'Real Estate',
  'Parenting',
];

export default PILLAR_STYLES;
