import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '../assets/gyan4wealthlogo.jpeg';

interface FooterSection {
  title: string;
  links: { label: string; path: string }[];
}

const SECTIONS: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Six Pillars', path: '/pillars' },
      { label: 'All Courses', path: '/courses' },
      { label: 'Community', path: '/community' },
      { label: 'Pricing', path: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog & Insights', path: '/blog' },
      { label: 'Webinar Calendar', path: '/webinars' },
      { label: 'Financial Calculators', path: '/calculators' },
      { label: 'Guides & PDFs', path: '/resources' },
      { label: 'Testimonials', path: '/testimonials' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Careers', path: '/careers' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Refund Policy', path: '/refund' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
];

export const Footer: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) =>
    setOpenAccordion((prev) => (prev === title ? null : title));

  return (
    <footer className="bg-navy text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-10">
        {/* Desktop: 4 columns | Tablet: 2 columns | Mobile: stacked accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand + Contact */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img
                src={logoImg}
                alt="Gyan4Wealth"
                className="w-9 h-9 rounded-full border border-gold/30 object-cover"
              />
              <span className="font-heading font-bold text-lg tracking-tight text-white">
                Gyan4Wealth
              </span>
            </Link>
            <p className="font-sans text-[13px] text-white/60 leading-relaxed mb-6 max-w-xs">
              India's premium wealth literacy platform. Master the six pillars
              of financial freedom through expert-led courses, live masterclasses,
              and a vetted community.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@gyan4wealth.com"
                className="flex items-center gap-2.5 text-white/60 hover:text-gold transition-colors duration-200 text-[13px] font-sans"
              >
                <Mail size={14} className="shrink-0" />
                hello@gyan4wealth.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 text-white/60 hover:text-gold transition-colors duration-200 text-[13px] font-sans"
              >
                <Phone size={14} className="shrink-0" />
                +91 98765 43210
              </a>
              <span className="flex items-center gap-2.5 text-white/60 text-[13px] font-sans">
                <MapPin size={14} className="shrink-0" />
                Mumbai, Maharashtra, India
              </span>
            </div>
          </div>

          {/* Cols 2-4: Link groups */}
          {SECTIONS.map((section) => (
            <div key={section.title}>
              {/* Desktop / Tablet heading */}
              <h3 className="hidden md:block font-heading font-bold text-sm text-white uppercase tracking-wider mb-5">
                {section.title}
              </h3>
              {/* Desktop / Tablet links */}
              <ul className="hidden md:flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="font-sans text-[13px] text-white/60 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile accordion */}
              <div className="md:hidden border-b border-white/10">
                <button
                  onClick={() => toggleAccordion(section.title)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                    {section.title}
                  </span>
                  <motion.div
                    animate={{ rotate: openAccordion === section.title ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className="text-white/50" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === section.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-4 space-y-2.5 pl-1">
                        {section.links.map((link) => (
                          <li key={link.path}>
                            <Link
                              to={link.path}
                              className="font-sans text-[13px] text-white/60 hover:text-gold transition-colors duration-200"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[12px] text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Gyan4Wealth. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="font-sans text-[12px] text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="font-sans text-[12px] text-white/40 hover:text-white/70 transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/refund"
              className="font-sans text-[12px] text-white/40 hover:text-white/70 transition-colors"
            >
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
