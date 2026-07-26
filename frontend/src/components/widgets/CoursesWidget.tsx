import React from 'react';
import { motion } from 'framer-motion';
import type { Course } from '../../types/dashboard';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { getPillarStyle } from '../../utils/pillarConfig';
import { BookOpen, Clock } from 'lucide-react';

interface CoursesWidgetProps {
  courses: Course[];
}

export const CoursesWidget: React.FC<CoursesWidgetProps> = ({ courses }) => {
  // Use shared pillar config for consistent colors
  const getCategoryStyles = (category: Course['category']) => {
    const s = getPillarStyle(category);
    return {
      badge: s.badge,
      glow: `group-hover:${s.glow}`,
      bar: s.indicator,
    };
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="col-span-12 xl:col-span-4 bg-white rounded-card p-6 border border-slate-100 shadow-resting hover:shadow-glow-blue transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[12px] font-sans font-bold tracking-wider text-blue uppercase bg-blue/10 px-2.5 py-1 rounded-sm">
              My Learning
            </span>
            <h2 className="font-heading font-bold text-h3 text-navy mt-2">
              Courses in Progress
            </h2>
          </div>
          <div className="p-3 bg-blue/10 text-blue rounded-card">
            <BookOpen size={20} />
          </div>
        </div>

        {/* Scrollable Container */}
        <motion.div 
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 -mx-2 px-2 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course) => {
            const styles = getCategoryStyles(course.category);

            return (
              <motion.div
                key={course.id}
                variants={fadeInUp}
                className={`group flex-shrink-0 w-[240px] snap-start bg-slate-50 border border-slate-100 rounded-card p-3 flex flex-col justify-between shadow-sm transition-all duration-300 ${styles.glow}`}
              >
                {/* Image and Badge */}
                <div className="relative h-28 rounded-sm overflow-hidden mb-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${styles.badge}`}>
                    {course.category}
                  </span>
                </div>

                {/* Course Details */}
                <div>
                  <h3 className="font-sans font-bold text-xs text-navy line-clamp-2 h-9 leading-relaxed">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-text">
                    <Clock size={11} />
                    <span>{course.duration} total</span>
                  </div>
                </div>

                {/* Progress Bar & Label */}
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] font-bold text-navy mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      className={`h-full rounded-full ${styles.bar}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <button className="text-[13px] font-sans font-bold text-blue hover:text-navy transition-colors duration-200">
          View All Courses ({courses.length})
        </button>
      </div>
    </motion.div>
  );
};
