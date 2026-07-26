import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { getPillarStyle } from '../utils/pillarConfig';
import type { Pillar } from '../utils/pillarConfig';
import { cardHover } from '../utils/animations';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: Pillar | 'General';
  date: string;
  readTime: string;
  featured?: boolean;
}

export const BlogCard: React.FC<{ post: BlogPost; layout?: boolean }> = ({ post, layout }) => {
  const style =
    post.category !== 'General'
      ? getPillarStyle(post.category as Pillar)
      : { bgTint: 'bg-slate-100', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700' };

  return (
    <Link to={`/blog/${post.id}`} className="block h-full w-full">
      <motion.div
        layout={layout}
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-resting h-full flex flex-col group cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <span
            className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md shadow-sm ${style.bgTint} ${style.text}`}
          >
            {post.category}
          </span>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 font-sans mb-3">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-navy leading-tight mb-3 group-hover:text-blue transition-colors line-clamp-3">
            {post.title}
          </h3>
          <p className="font-sans text-sm text-slate-text leading-relaxed line-clamp-3 mb-6">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-sm font-bold text-navy group-hover:text-gold transition-colors flex items-center gap-1">
              Read more{' '}
              <ChevronRight
                size={14}
                className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
              />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
