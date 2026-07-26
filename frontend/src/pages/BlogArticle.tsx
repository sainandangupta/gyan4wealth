import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BlogCard } from '../components/BlogCard';
import { NewsletterBlock } from '../components/NewsletterBlock';
import { BLOG_POSTS, ARTICLE_CONTENTS } from '../data/articlesData';
import { getPillarStyle } from '../utils/pillarConfig';
import type { Pillar } from '../utils/pillarConfig';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { ChevronRight, Clock, Link as LinkIcon, MessageCircle, Mail } from 'lucide-react';

export const BlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, [slug]);

  // Read scroll progress for the top gold bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const postMeta = BLOG_POSTS.find((p) => p.id === slug);
  const postContent = ARTICLE_CONTENTS[slug || ''];

  if (!postMeta || !postContent) {
    return <Navigate to="/blog" replace />;
  }

  const style = postMeta.category !== 'General' ? getPillarStyle(postMeta.category as Pillar) : null;

  // Get 3 related articles (exclude current)
  const relatedArticles = BLOG_POSTS.filter((p) => p.id !== slug)
    .sort(() => 0.5 - Math.random()) // naive shuffle for demo
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-off-white flex flex-col relative">
      <Header />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-left"
        style={{ scaleX }}
      />

      <main className="flex-1 pt-32 pb-20 lg:pt-40 lg:pb-28 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        {/* ── Hero Section ── */}
        <div className="max-w-3xl mx-auto mb-12">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate={isMounted ? 'visible' : 'hidden'}
          >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6 font-sans text-sm font-semibold">
              <Link to="/blog" className="text-slate-400 hover:text-navy transition-colors">Blog</Link>
              <ChevronRight size={14} className="text-slate-300" />
              {style && (
                <>
                  <span className={style.text}>{postMeta.category}</span>
                  <ChevronRight size={14} className="text-slate-300" />
                </>
              )}
              <span className="text-slate-600 truncate max-w-[200px]">{postMeta.title}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-navy leading-tight tracking-tight mb-6"
            >
              {postMeta.title}
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 border-b border-slate-200 pb-8 mb-8">
              <img
                src={postContent.authorImage}
                alt={postContent.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="font-sans font-bold text-navy text-sm">{postContent.author}</p>
                <p className="font-sans text-xs text-slate-500">{postContent.authorRole}</p>
              </div>
              <div className="ml-auto flex items-center gap-4 text-xs font-semibold text-slate-400 font-sans uppercase tracking-wide">
                <span>{postMeta.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {postMeta.readTime}</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="w-full aspect-video rounded-panel overflow-hidden shadow-2xl mb-16 relative"
          >
            <img src={postMeta.image} alt={postMeta.title} className="w-full h-full object-cover" />
            {style && (
              <div className={`absolute top-6 left-6 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-md border border-white/20 ${style.bgTint} ${style.text}`}>
                {postMeta.category}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Content & Sidebar ── */}
        <div className="flex flex-col xl:flex-row gap-12 relative max-w-5xl mx-auto">
          
          {/* Sticky Social Share (Desktop Left Margin) */}
          <div className="hidden xl:block w-16 shrink-0 relative">
            <div className="sticky top-32 flex flex-col gap-4">
              <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>Share</span>
              <div className="w-[1px] h-12 bg-slate-200 mx-auto my-2" />
              {[LinkIcon, MessageCircle, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-navy hover:border-navy transition-colors mx-auto"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Article Body */}
          <div className="flex-1 w-full max-w-[680px] mx-auto xl:mx-0">
            <div 
              className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy 
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:font-sans prose-p:text-slate-text prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-blue prose-a:no-underline hover:prose-a:underline
                prose-strong:text-navy
                prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-gold-tint/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:font-heading prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:text-navy prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm prose-blockquote:my-10"
              dangerouslySetInnerHTML={{ __html: postContent.content }}
            />
          </div>
        </div>

      </main>

      {/* Floating Share Bar (Mobile/Tablet) */}
      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl px-6 py-3 rounded-full z-40 flex items-center gap-6">
        <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest">Share</span>
        <div className="w-[1px] h-4 bg-slate-200" />
        <a href="#" className="text-slate-400 hover:text-navy"><LinkIcon size={18} /></a>
        <a href="#" className="text-slate-400 hover:text-navy"><MessageCircle size={18} /></a>
        <a href="#" className="text-slate-400 hover:text-navy"><Mail size={18} /></a>
      </div>

      {/* ── Related Articles ── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="font-heading font-bold text-3xl text-navy mb-10">Read Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {relatedArticles.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Block ── */}
      <NewsletterBlock />

      <Footer />
    </div>
  );
};
