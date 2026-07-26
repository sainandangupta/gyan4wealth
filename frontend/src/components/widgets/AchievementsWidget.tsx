import React from 'react';
import { motion } from 'framer-motion';
import type { Achievement } from '../../types/dashboard';
import { fadeInUp, staggerContainer, itemPopIn } from '../../utils/animations';
import { 
  Trophy, 
  PiggyBank, 
  TrendingUp, 
  GraduationCap, 
  Target, 
  Award 
} from 'lucide-react';

interface AchievementsWidgetProps {
  achievements: Achievement[];
}

export const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({ achievements }) => {
  // Map icon name to Lucide component
  const getIcon = (name: string) => {
    switch (name) {
      case 'piggy-bank':
        return <PiggyBank size={24} />;
      case 'trending-up':
        return <TrendingUp size={24} />;
      case 'graduation-cap':
        return <GraduationCap size={24} />;
      case 'target':
        return <Target size={24} />;
      default:
        return <Award size={24} />;
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-card p-6 border border-slate-100 shadow-resting hover:shadow-glow-gold transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[12px] font-sans font-bold tracking-wider text-gold uppercase bg-gold-tint/50 px-2.5 py-1 rounded-sm">
              Badges & Rewards
            </span>
            <h2 className="font-heading font-bold text-h3 text-navy mt-2">
              Recent Achievements
            </h2>
          </div>
          <div className="p-3 bg-gold-tint text-gold rounded-card">
            <Trophy size={20} />
          </div>
        </div>

        {/* Badges Container */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-row md:grid md:grid-cols-2 gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={itemPopIn}
              className="flex-shrink-0 w-32 md:w-auto snap-start flex flex-col items-center text-center p-3 bg-slate-50 border border-slate-100/50 hover:border-gold/30 hover:bg-gold-tint/10 rounded-card transition-all duration-200"
            >
              {/* Badge Circular Glow */}
              <div className="relative w-14 h-14 bg-gradient-to-br from-gold/20 via-gold-tint to-white rounded-full flex items-center justify-center text-gold border border-gold/15 mb-3 shadow-sm">
                <div className="absolute inset-0 bg-gold/5 rounded-full blur-xs" />
                {getIcon(achievement.iconName)}
              </div>

              {/* Title & Desc */}
              <h3 className="font-heading font-bold text-xs text-navy truncate w-full">
                {achievement.title}
              </h3>
              <p className="font-sans text-[10px] text-slate-text mt-1 line-clamp-2 h-6 leading-tight">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <button className="text-[13px] font-sans font-bold text-blue hover:text-navy transition-colors duration-200">
          View Achievements Gallery
        </button>
      </div>
    </motion.div>
  );
};
