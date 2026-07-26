import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NewsletterBlock } from '../components/NewsletterBlock';
import { Button } from '../components/Button';
import { fadeInUp, slideInRight, SHIMMER_BTN_CLASS } from '../utils/animations';
import { Mail, MapPin, Clock, Phone, ChevronDown, CheckCircle } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [topicOpen, setTopicOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Select a topic');

  const TOPICS = [
    'General Inquiry',
    'Membership & Pricing',
    'Technical Support',
    'Partnership Opportunities',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* ── Left Column: Form ── */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-10">
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-navy leading-tight tracking-tight mb-4">
                Let's Start a <span className="text-gold">Conversation</span>
              </h1>
              <p className="font-sans text-lg text-slate-text">
                Whether you have a question about our memberships, courses, or need technical support, our team is ready to help.
              </p>
            </motion.div>

            <div className="relative min-h-[450px]">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-panel p-8 lg:p-10 border border-slate-100 shadow-resting flex flex-col gap-6 relative overflow-hidden"
                  >
                    {/* Glass glare effect */}
                    <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-sm font-bold text-navy">First Name</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-md border border-slate-200 font-sans text-slate-700 outline-none focus:border-gold transition-colors duration-150" placeholder="Rajesh" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-sm font-bold text-navy">Last Name</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-md border border-slate-200 font-sans text-slate-700 outline-none focus:border-gold transition-colors duration-150" placeholder="Gupta" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 relative z-10">
                      <label className="font-sans text-sm font-bold text-navy">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-md border border-slate-200 font-sans text-slate-700 outline-none focus:border-gold transition-colors duration-150" placeholder="rajesh@example.com" />
                    </div>

                    <div className="flex flex-col gap-2 relative z-10">
                      <label className="font-sans text-sm font-bold text-navy">Topic</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setTopicOpen(!topicOpen)}
                          className={`w-full px-4 py-3 rounded-md border text-left font-sans flex items-center justify-between outline-none transition-colors duration-150 ${topicOpen ? 'border-gold text-navy' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                        >
                          {selectedTopic}
                          <motion.div animate={{ rotate: topicOpen ? 180 : 0 }}>
                            <ChevronDown size={18} />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {topicOpen && (
                            <motion.ul
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-md shadow-xl overflow-hidden z-20"
                            >
                              {TOPICS.map(topic => (
                                <li key={topic}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedTopic(topic);
                                      setTopicOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 font-sans text-sm text-slate-600 hover:bg-slate-50 hover:text-navy transition-colors"
                                  >
                                    {topic}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 relative z-10">
                      <label className="font-sans text-sm font-bold text-navy">Message</label>
                      <textarea required rows={4} className="w-full px-4 py-3 rounded-md border border-slate-200 font-sans text-slate-700 outline-none focus:border-gold transition-colors duration-150 resize-none" placeholder="How can we help you?" />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`relative z-10 w-full py-4 rounded-md font-sans font-bold text-sm mt-2 transition-all ${isSubmitting ? 'bg-gold/70 text-navy cursor-not-allowed' : `${SHIMMER_BTN_CLASS} bg-gold hover:bg-gold/90 text-navy shadow-lg shadow-gold/20 hover:shadow-glow-gold`}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-panel p-12 lg:p-16 border border-slate-100 shadow-resting flex flex-col items-center justify-center text-center h-full"
                  >
                    {/* Animated Checkmark SVG */}
                    <svg viewBox="0 0 100 100" className="w-24 h-24 text-green mb-6">
                      <motion.circle
                        cx="50" cy="50" r="45"
                        fill="none" stroke="currentColor" strokeWidth="6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      <motion.path
                        d="M 30 50 L 45 65 L 70 35"
                        fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                      />
                    </svg>

                    <h3 className="font-heading font-bold text-2xl text-navy mb-3">Message Received!</h3>
                    <p className="font-sans text-slate-600 mb-8 max-w-sm mx-auto">
                      Thanks for reaching out. A member of our team will get back to you within 24 hours.
                    </p>

                    <Button to="/" variant="outline">Return to Home</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right Column: Illustration & Info Cards ── */}
          <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0 flex flex-col items-center justify-center">
            
            {/* Desktop floating layout / Tablet static list */}
            <div className="hidden lg:block w-full h-full relative min-h-[500px]">
              <motion.img 
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" 
                alt="Contact us" 
                className="w-3/4 max-w-md rounded-[40px] shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              />
              
              {/* Floating Card 1: Email */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 left-0 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email Us</p>
                  <p className="font-heading font-bold text-navy text-sm">support@gyan4wealth.in</p>
                </div>
              </motion.div>

              {/* Floating Card 2: Hours */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-20 -left-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Office Hours</p>
                  <p className="font-heading font-bold text-navy text-sm">Mon-Fri, 9am - 6pm</p>
                </div>
              </motion.div>

              {/* Floating Card 3: Location */}
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 7, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-32 -right-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Headquarters</p>
                  <p className="font-heading font-bold text-navy text-sm">Mumbai, Maharashtra</p>
                </div>
              </motion.div>
            </div>

            {/* Mobile / Tablet Static List */}
            <div className="lg:hidden w-full flex flex-col gap-6 bg-slate-50 p-8 rounded-panel">
              <h3 className="font-heading font-bold text-2xl text-navy mb-4">Other Ways to Connect</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue shadow-sm shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-sans font-bold text-navy mb-1">Email Support</p>
                  <p className="font-sans text-sm text-slate-500">support@gyan4wealth.in</p>
                  <p className="font-sans text-xs text-slate-400 mt-1">Usually responds within 24 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gold shadow-sm shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-sans font-bold text-navy mb-1">Office Hours</p>
                  <p className="font-sans text-sm text-slate-500">Monday - Friday</p>
                  <p className="font-sans text-sm text-slate-500">9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-green shadow-sm shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-sans font-bold text-navy mb-1">Headquarters</p>
                  <p className="font-sans text-sm text-slate-500">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Newsletter Block ── */}
      <NewsletterBlock />

      <Footer />
    </div>
  );
};
