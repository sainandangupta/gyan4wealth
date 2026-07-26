import React from 'react';
import { Mail } from 'lucide-react';

export const NewsletterBlock: React.FC = () => {
  return (
    <section className="bg-navy py-20 px-5 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-panel p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="flex-1 relative z-10">
          <h3 className="font-heading font-bold text-3xl text-white mb-4">Never Miss an Insight</h3>
          <p className="font-sans text-white/70">Join 50,000+ readers getting our weekly newsletter packed with actionable wealth-building frameworks.</p>
        </div>
        
        <div className="w-full md:w-auto shrink-0 relative z-10 flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="bg-white/10 border border-white/20 rounded-md py-3.5 px-5 outline-none focus:border-gold/50 text-white placeholder-white/50 min-w-[260px]"
          />
          <button className="bg-gold hover:bg-gold/90 text-navy font-bold font-sans px-8 py-3.5 rounded-md transition-colors shadow-lg shadow-gold/20 flex items-center justify-center gap-2">
            <Mail size={18} /> Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};
