import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import type { WatchlistEntry } from '../../types/dashboard';
import { fadeInUp } from '../../utils/animations';
import { Eye, TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistChartProps {
  watchlist: WatchlistEntry[];
}

export const WatchlistChart: React.FC<WatchlistChartProps> = ({ watchlist }) => {
  const [selectedId, setSelectedId] = useState<string>(watchlist[0]?.id || '');

  const activeEntry = watchlist.find(item => item.id === selectedId) || watchlist[0];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy border border-white/10 rounded-sm p-3 shadow-resting">
          <p className="font-sans text-xs text-slate-300 font-medium">Value</p>
          <p className="font-heading font-bold text-sm text-white mt-0.5">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="col-span-12 bg-white rounded-card p-6 md:p-8 border border-slate-100 shadow-resting hover:shadow-glow-navy transition-all duration-300 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[12px] font-sans font-bold tracking-wider text-navy uppercase bg-slate-100 px-2.5 py-1 rounded-sm border border-slate-200">
            Market Monitoring
          </span>
          <h2 className="font-heading font-bold text-h3 text-navy mt-3">
            Investment & Real Estate Watchlist
          </h2>
        </div>
        <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-card self-start">
          <span className="p-1 bg-navy text-white rounded-sm">
            <Eye size={16} />
          </span>
          <span className="font-sans text-[11px] font-bold text-slate-text px-1">
            Tracking Active Funds
          </span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-6 items-stretch">
        {/* Ticker List Selector (col-span-12 on Mobile/Tablet, col-span-4 on Desktop) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          {watchlist.map((entry) => {
            const isActive = entry.id === selectedId;
            return (
              <button
                key={entry.id}
                onClick={() => setSelectedId(entry.id)}
                className={`w-full flex items-center justify-between p-4 rounded-card border transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-navy border-navy text-white shadow-resting'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-100 hover:border-slate-200 text-navy'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <h3 className={`font-sans font-bold text-xs truncate ${isActive ? 'text-white' : 'text-navy'}`}>
                    {entry.name}
                  </h3>
                  <span className={`font-heading font-bold text-sm block mt-1 ${isActive ? 'text-gold' : 'text-slate-700'}`}>
                    {entry.price}
                  </span>
                </div>

                {/* Ticker % Change Badge */}
                <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
                  entry.isPositive
                    ? 'bg-green-tint text-green border border-green/10'
                    : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}>
                  {entry.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{entry.isPositive ? '+' : ''}{entry.change}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recharts LineChart Visualizer (col-span-12 on Mobile/Tablet, col-span-8 on Desktop) */}
        <div className="col-span-12 lg:col-span-8 bg-slate-50/50 border border-slate-100 p-4 rounded-card h-72 lg:h-auto min-h-[260px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="font-sans text-[11px] font-bold text-slate-text uppercase tracking-wider">
              {activeEntry.name} — Weekly Trend
            </span>
            <span className={`font-sans text-[11px] font-semibold ${activeEntry.isPositive ? 'text-green' : 'text-rose-600'}`}>
              {activeEntry.isPositive ? 'Positive Trend' : 'Negative Adjustment'}
            </span>
          </div>

          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={activeEntry.history}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#94A3B8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#94A3B8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={['auto', 'auto']}
                  dx={-5}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }} />
                
                {/* Dynamic Line with left-to-right draw animation */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={activeEntry.isPositive ? '#17A65A' : '#EF4444'}
                  strokeWidth={3.5}
                  dot={{ r: 4, strokeWidth: 1.5, stroke: activeEntry.isPositive ? '#17A65A' : '#EF4444', fill: '#FFFFFF' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: activeEntry.isPositive ? '#17A65A' : '#EF4444' }}
                  isAnimationActive={true}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
