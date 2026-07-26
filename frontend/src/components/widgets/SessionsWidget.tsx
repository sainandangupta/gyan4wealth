import React from 'react';
import { motion } from 'framer-motion';
import type { Session } from '../../types/dashboard';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { Calendar, Video, Clock } from 'lucide-react';

interface SessionsWidgetProps {
  sessions: Session[];
}

export const SessionsWidget: React.FC<SessionsWidgetProps> = ({ sessions }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-card p-6 border border-slate-100 shadow-resting hover:shadow-glow-gold transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[12px] font-sans font-bold tracking-wider text-gold uppercase bg-gold-tint/50 px-2.5 py-1 rounded-sm">
              Live Webinars
            </span>
            <h2 className="font-heading font-bold text-h3 text-navy mt-2">
              Upcoming Sessions
            </h2>
          </div>
          <div className="p-3 bg-gold-tint text-gold rounded-card">
            <Calendar size={20} />
          </div>
        </div>

        {/* Sessions list */}
        <motion.div 
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              variants={fadeInUp}
              whileHover={{ y: -2 }}
              className="flex items-center gap-4 p-3 rounded-card bg-slate-50 hover:bg-gold-tint/20 border border-slate-100/50 hover:border-gold/20 transition-all duration-200 cursor-pointer"
            >
              {/* Date Badge */}
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-gold-tint text-gold rounded-card border border-gold/10 font-sans flex-shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {session.date.split(' ')[0]}
                </span>
                <span className="text-[18px] font-bold leading-none mt-0.5">
                  {session.date.split(' ')[1]}
                </span>
              </div>

              {/* Session Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-sans font-bold text-xs text-navy truncate">
                  {session.title}
                </h3>
                <p className="font-sans text-[11px] text-slate-text mt-0.5 truncate">
                  {session.host}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-400 font-medium">
                  <Clock size={11} className="text-slate-400" />
                  <span>{session.time} IST</span>
                </div>
              </div>

              {/* Action Link icon */}
              <div className="text-slate-300 hover:text-gold transition-colors duration-150">
                <Video size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <button className="text-[13px] font-sans font-bold text-blue hover:text-navy transition-colors duration-200">
          View Masterclass Calendar
        </button>
      </div>
    </motion.div>
  );
};
