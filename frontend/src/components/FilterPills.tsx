import React from 'react';
import { motion } from 'framer-motion';

interface FilterPillsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  layoutId?: string;
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  layoutId = 'activeFilter',
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto snap-x scrollbar-none pb-2 -mx-5 px-5 md:mx-0 md:px-0">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`relative px-5 py-2.5 rounded-full font-sans text-sm font-semibold whitespace-nowrap snap-start transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-slate-500 hover:text-navy hover:bg-slate-100'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-navy rounded-full shadow-md"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{filter}</span>
          </button>
        );
      })}
    </div>
  );
};
