import type { Pillar } from '../utils/pillarConfig';

export interface LearningObjective {
  title: string;
  text: string;
  icon: string;
}

export interface ChartData {
  title: string;
  labels: string[];
  values: number[];
  max: number;
  suffix: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'Course' | 'Masterclass' | 'PDF';
  image: string;
}

export interface PillarData {
  slug: string;
  pillarId: Pillar;
  heroHeadline: string;
  heroIntro: string;
  heroImage: string;
  whyMattersHeadline: string;
  whyMattersText: string;
  whyMattersImage: string;
  learnings: LearningObjective[];
  chart: ChartData;
  resources: ResourceItem[];
  testimonial: {
    quote: string;
    author: string;
  };
}

const COMMON_RESOURCES: ResourceItem[] = [
  { id: '1', title: 'Budgeting 101 Masterclass', type: 'Course', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80' },
  { id: '2', title: 'Asset Allocation Strategies', type: 'Masterclass', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80' },
  { id: '3', title: 'Tax Planning Guide FY24-25', type: 'PDF', image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&q=80' },
  { id: '4', title: 'Understanding Mutual Funds', type: 'Course', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80' },
];

export const PILLARS_DATA: Record<string, PillarData> = {
  education: {
    slug: 'education',
    pillarId: 'Education',
    heroHeadline: 'Master the Foundations of Finance',
    heroIntro: 'Before you can build wealth, you need a strong foundation. The Financial Education pillar covers the critical concepts of budgeting, compounding, and cashflow management.',
    heroImage: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=800&q=80',
    whyMattersHeadline: 'Why Financial Education Matters',
    whyMattersText: 'Without a clear understanding of cashflow, even high earners can find themselves living paycheck to paycheck. Financial education transforms your relationship with money from reactive anxiety to proactive control. By mastering the basics, you ensure every rupee is deployed with intention.',
    whyMattersImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    learnings: [
      { title: 'Budgeting Systems', text: 'Learn to use the 50/30/20 rule and zero-based budgeting to take control of cashflow.', icon: 'PieChart' },
      { title: 'The Power of Compounding', text: 'Understand how time and consistency mathematically multiply your investments.', icon: 'TrendingUp' },
      { title: 'Debt Management', text: 'Distinguish between good debt and bad debt, and formulate strategies to eliminate high-interest liabilities.', icon: 'Shield' },
    ],
    chart: {
      title: 'Wealth Growth via Compounding Over Time',
      labels: ['Year 5', 'Year 10', 'Year 15', 'Year 20', 'Year 25'],
      values: [15, 38, 75, 140, 250],
      max: 250,
      suffix: 'L',
    },
    resources: COMMON_RESOURCES,
    testimonial: {
      quote: "The budgeting module completely changed my perspective. I found an extra ₹15,000 a month I didn't even know I was wasting.",
      author: 'Rajesh K., Software Engineer'
    }
  },
  finance: {
    slug: 'finance',
    pillarId: 'Finance',
    heroHeadline: 'Build a Bulletproof Personal Plan',
    heroIntro: 'Protect your downside while optimizing your upside. Personal finance is about executing the strategies that secure your financial present.',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    whyMattersHeadline: 'Securing the Present',
    whyMattersText: 'A great investment strategy means nothing if an emergency wipes out your capital. Personal finance establishes the defensive moat around your wealth — emergency funds, optimal insurance coverage, and tax-efficient structures.',
    whyMattersImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    learnings: [
      { title: 'Emergency Buffers', text: 'Calculate and park your 6-month safety net in highly liquid, inflation-beating instruments.', icon: 'ShieldCheck' },
      { title: 'Insurance Optimization', text: 'Determine exact term and health cover requirements without falling for costly endowment traps.', icon: 'Heart' },
      { title: 'Tax Planning', text: 'Legally minimize your tax burden using Section 80C, 80D, and structured HRA/LTA components.', icon: 'FileText' },
    ],
    chart: {
      title: 'Impact of Tax Optimization on Annual Savings',
      labels: ['Base', 'Sec 80C', 'Sec 80D', 'NPS', 'Total'],
      values: [0, 46, 70, 85, 120],
      max: 120,
      suffix: 'K',
    },
    resources: COMMON_RESOURCES,
    testimonial: {
      quote: "Restructuring my insurance portfolio based on the Finance pillar saved me ₹40,000 a year in useless premiums.",
      author: 'Neha S., Marketing Director'
    }
  },
  career: {
    slug: 'career',
    pillarId: 'Career',
    heroHeadline: 'Accelerate Your Primary Income',
    heroIntro: 'Your career is your most powerful wealth-generating asset. Learn how to negotiate better, upskill strategically, and build a professional moat.',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    whyMattersHeadline: 'Income Dictates Investment Capacity',
    whyMattersText: 'You can only cut expenses so much, but your earning potential is virtually limitless. Maximizing your career growth provides the fuel (capital) required to accelerate all other wealth-building pillars.',
    whyMattersImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    learnings: [
      { title: 'Salary Negotiation', text: 'Master the frameworks for negotiating base pay, equity, and performance bonuses.', icon: 'Briefcase' },
      { title: 'High-Income Skills', text: 'Identify and acquire the meta-skills that are disproportionately rewarded in the modern economy.', icon: 'Zap' },
      { title: 'Personal Branding', text: 'Build a professional reputation that attracts inbound opportunities and higher compensation.', icon: 'Award' },
    ],
    chart: {
      title: 'Trajectory: Passive Growth vs Proactive Career Moves',
      labels: ['Year 1', 'Year 3', 'Year 5', 'Year 7', 'Year 10'],
      values: [10, 18, 35, 60, 100],
      max: 100,
      suffix: '%',
    },
    resources: COMMON_RESOURCES,
    testimonial: {
      quote: "The negotiation frameworks gave me the confidence to ask for a 35% hike and equity. And I got it.",
      author: 'Vikram M., Product Manager'
    }
  },
  wealth: {
    slug: 'wealth',
    pillarId: 'Wealth',
    heroHeadline: 'Multiply Your Capital',
    heroIntro: 'Transition from earning money to making your money earn. Discover the strategies for long-term equity compounding and portfolio management.',
    heroImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    whyMattersHeadline: 'Beating Inflation and Generating Freedom',
    whyMattersText: 'To achieve true financial independence, your passive income must eventually exceed your living expenses. The Wealth pillar provides the exact blueprints for asset allocation, risk management, and market participation.',
    whyMattersImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    learnings: [
      { title: 'Mutual Funds & ETFs', text: 'Select the right passive and active funds while minimizing expense ratios.', icon: 'BarChart' },
      { title: 'Direct Equity Analysis', text: 'Learn fundamental analysis to identify high-quality businesses for long-term holding.', icon: 'Activity' },
      { title: 'Asset Allocation', text: 'Balance risk and reward across equity, debt, and gold based on your specific life stage.', icon: 'PieChart' },
    ],
    chart: {
      title: 'Portfolio Value Over Time (SIP vs Lump Sum)',
      labels: ['5 Yrs', '10 Yrs', '15 Yrs', '20 Yrs', '25 Yrs'],
      values: [20, 55, 110, 220, 450],
      max: 450,
      suffix: 'L',
    },
    resources: COMMON_RESOURCES,
    testimonial: {
      quote: "I finally understand my mutual fund portfolio. I weeded out the underperformers and consolidated my investments.",
      author: 'Arjun P., Doctor'
    }
  },
  'real-estate': {
    slug: 'real-estate',
    pillarId: 'Real Estate',
    heroHeadline: 'Tangible Assets, Passive Yields',
    heroIntro: 'Real estate offers a unique combination of capital appreciation, passive rental yield, and leverage. Learn to evaluate properties like a pro.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    whyMattersHeadline: 'The Power of Leverage and Cashflow',
    whyMattersText: 'Real estate is one of the few asset classes where you can safely use the banks money to generate cashflow. Understanding how to calculate Net Operating Income (NOI) and Cap Rates protects you from emotional, over-priced purchases.',
    whyMattersImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    learnings: [
      { title: 'Property Evaluation', text: 'Calculate Cap Rates, NOI, and cash-on-cash returns to objectively judge a deal.', icon: 'Building' },
      { title: 'REITs & Fractional', text: 'Participate in commercial real estate without the massive capital requirements via REITs.', icon: 'PieChart' },
      { title: 'Financing Strategies', text: 'Optimize home loans, understand tax benefits, and structure debt efficiently.', icon: 'Landmark' },
    ],
    chart: {
      title: 'Rental Yield vs Capital Appreciation (10 Yrs)',
      labels: ['Year 2', 'Year 4', 'Year 6', 'Year 8', 'Year 10'],
      values: [12, 28, 45, 68, 95],
      max: 100,
      suffix: '%',
    },
    resources: COMMON_RESOURCES,
    testimonial: {
      quote: "The Cap Rate calculator saved me from making a disastrous investment in a pre-launch commercial property.",
      author: 'Smita D., Entrepreneur'
    }
  },
  parenting: {
    slug: 'parenting',
    pillarId: 'Parenting',
    heroHeadline: 'Secure the Next Generation',
    heroIntro: 'Generational wealth requires generational planning. Ensure your childrens education is funded and their financial habits are formed early.',
    heroImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
    whyMattersHeadline: 'Passing on More Than Just Money',
    whyMattersText: 'Education inflation is currently outpacing standard inflation. Structuring dedicated funds for your children ensures their future isn\'t compromised, while teaching them financial literacy ensures the wealth you leave behind is preserved.',
    whyMattersImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    learnings: [
      { title: 'Education Funding', text: 'Calculate future education costs and set up dedicated SIPs to meet the exact target.', icon: 'GraduationCap' },
      { title: 'Govt Schemes', text: 'Maximize tax-free returns using Sukanya Samriddhi Yojana (SSY) and PPF accounts for minors.', icon: 'Shield' },
      { title: 'Financial Habits', text: 'Frameworks for teaching children about saving, delayed gratification, and compounding.', icon: 'Heart' },
    ],
    chart: {
      title: 'Cost of Higher Education Over Time (Inflation Adjusted)',
      labels: ['Today', 'In 5 Yrs', 'In 10 Yrs', 'In 15 Yrs', 'In 20 Yrs'],
      values: [15, 22, 34, 50, 75],
      max: 80,
      suffix: 'L',
    },
    resources: COMMON_RESOURCES,
    testimonial: {
      quote: "Mapping out the exact SIP required for my daughters college fund gave me incredible peace of mind.",
      author: 'Karthik & Priya, Parents'
    }
  }
};
