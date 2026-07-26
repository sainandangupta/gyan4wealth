import type { BlogPost } from '../components/BlogCard';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Blueprint to Buying Your First Commercial Real Estate Property',
    excerpt: 'Commercial real estate isn\'t just for institutional investors. Here is a step-by-step guide to calculating cap rates and securing financing for your first deal.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    category: 'Real Estate',
    date: 'Oct 12, 2026',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: '2',
    title: 'Zero-Based Budgeting: The Ultimate Cashflow Hack',
    excerpt: 'Stop wondering where your money went. Zero-based budgeting gives every rupee a job before the month even begins.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
    category: 'Education',
    date: 'Oct 10, 2026',
    readTime: '5 min read',
  },
  {
    id: '3',
    title: 'Index Funds vs. Active Mutual Funds in 2026',
    excerpt: 'With most active funds failing to beat their benchmarks over a 10-year period, is it time to switch entirely to passive indexing?',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
    category: 'Wealth',
    date: 'Oct 05, 2026',
    readTime: '6 min read',
  },
  {
    id: '4',
    title: 'How to Negotiate Your Salary Like a Product Manager',
    excerpt: 'Frameworks and exact scripts you can use in your next performance review to secure a 20%+ hike and better equity terms.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
    category: 'Career',
    date: 'Sep 28, 2026',
    readTime: '7 min read',
  },
  {
    id: '5',
    title: 'The Hidden Costs of Endowment Life Insurance Policies',
    excerpt: 'Why your insurance agent is pushing endowment plans, and how term insurance + mutual funds mathematically beat them every time.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    category: 'Finance',
    date: 'Sep 21, 2026',
    readTime: '9 min read',
  },
  {
    id: '6',
    title: 'Sukanya Samriddhi Yojana (SSY): A Complete Guide',
    excerpt: 'Maximize the tax-free compounding benefits of the SSY scheme for your daughters higher education and future security.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80',
    category: 'Parenting',
    date: 'Sep 15, 2026',
    readTime: '6 min read',
  },
  {
    id: '7',
    title: 'Understanding REITs in the Indian Context',
    excerpt: 'How Real Estate Investment Trusts work, their taxation implications, and whether they belong in your portfolio.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    category: 'Real Estate',
    date: 'Sep 10, 2026',
    readTime: '5 min read',
  },
  {
    id: '8',
    title: 'Emergency Funds: Where to Park Them for Maximum Liquidity',
    excerpt: 'Don\'t just leave your safety net in a savings account. Explore liquid mutual funds and arbitrage funds for better tax efficiency.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
    category: 'Finance',
    date: 'Sep 02, 2026',
    readTime: '4 min read',
  },
  {
    id: '9',
    title: 'Building a Secondary Income Stream in 2026',
    excerpt: 'Transitioning from a single point of failure to multiple uncorrelated income streams to accelerate wealth creation.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    category: 'Career',
    date: 'Aug 25, 2026',
    readTime: '8 min read',
  },
];

export interface ArticleContent {
  id: string;
  author: string;
  authorImage: string;
  authorRole: string;
  content: string; // HTML string
}

export const ARTICLE_CONTENTS: Record<string, ArticleContent> = {
  '1': {
    id: '1',
    author: 'Rajesh Gupta',
    authorImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=150&q=80',
    authorRole: 'Founder, Gyan4Wealth',
    content: `
      <p>Commercial real estate (CRE) has traditionally been viewed as an asset class reserved for institutional investors, ultra-high-net-worth individuals, and large corporations. However, the landscape is shifting. With the advent of better financing options and a deeper understanding of valuation metrics, retail investors are increasingly participating in the CRE boom.</p>
      
      <h2>1. The Mathematics of Cap Rates</h2>
      <p>Before looking at any property, you must understand the Capitalization Rate (Cap Rate). It is the fundamental metric used to evaluate the profitability and return potential of a commercial asset.</p>
      
      <blockquote>
        "An emotional real estate purchase is a liability. A mathematically sound real estate purchase is a generational asset."
      </blockquote>
      
      <p>The formula is simple: <strong>Cap Rate = Net Operating Income (NOI) / Current Market Value</strong>.</p>
      <p>If a property generates ₹12,00,000 in NOI annually and costs ₹1.5 Crores, the Cap Rate is exactly 8%. In major Indian metros like Bengaluru or Mumbai, prime commercial office spaces typically trade at Cap Rates between 6.5% and 8.5%.</p>
      
      <h2>2. Securing the Right Financing</h2>
      <p>Unlike residential mortgages, Lease Rental Discounting (LRD) is a powerful tool in commercial real estate. LRD allows you to secure a loan based on the discounted value of future rent receivables. The bank considers the strength of the tenant and the lease agreement rather than just your personal income.</p>
      
      <h2>3. The Importance of the Anchor Tenant</h2>
      <p>A building is only as valuable as the cash flow it generates. Securing a blue-chip anchor tenant—such as a multinational tech company, a national bank branch, or a recognized retail chain—drastically reduces vacancy risk and instantly increases the valuation of the property if you ever decide to sell.</p>
      
      <p>Start small, focus on the math, and remember that commercial real estate is a long-term play for wealth preservation and cashflow generation.</p>
    `
  },
};
