import type { DashboardData } from '../types/dashboard';


export const dashboardData: DashboardData = {
  user: {
    name: 'Rajesh Gupta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    unreadNotifications: 3
  },
  progress: {
    literacyScore: 82, // percentage out of 100
    wealthGoalProgress: 68, // percentage out of 100
    wealthGoalCurrent: 680000,
    wealthGoalTarget: 1000000
  },
  courses: [
    {
      id: 'c1',
      title: 'Mutual Funds & Systematic Investment Planning (SIP)',
      category: 'Finance/Wealth',
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format&fit=crop&q=80',
      progress: 75,
      duration: '4h 15m'
    },
    {
      id: 'c2',
      title: 'Commercial Real Estate Investment Strategies',
      category: 'Real Estate',
      thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&auto=format&fit=crop&q=80',
      progress: 40,
      duration: '6h 30m'
    },
    {
      id: 'c3',
      title: 'Tax Optimization & Wealth Preservation for Families',
      category: 'Parenting',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
      progress: 90,
      duration: '3h 45m'
    },
    {
      id: 'c4',
      title: 'Strategic Career Growth & High-Income Skills',
      category: 'Career',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
      progress: 15,
      duration: '5h 10m'
    }
  ],
  sessions: [
    {
      id: 's1',
      title: 'Q3 Real Estate Watchlist & Market Outlook',
      date: 'Jul 26',
      time: '4:00 PM',
      host: 'Vikram Mehta (RE Specialist)'
    },
    {
      id: 's2',
      title: 'Tax Savings & Huf Creation Workshop',
      date: 'Jul 29',
      time: '6:30 PM',
      host: 'CA Anjali Sharma'
    },
    {
      id: 's3',
      title: 'Creating Generational Wealth & Kids Trust Funds',
      date: 'Aug 02',
      time: '11:00 AM',
      host: 'Rajesh Gupta & Panel'
    }
  ],
  achievements: [
    {
      id: 'a1',
      title: 'Smart Saver',
      iconName: 'piggy-bank',
      description: 'Completed SIP Setup module'
    },
    {
      id: 'a2',
      title: 'Market Reader',
      iconName: 'trending-up',
      description: 'Read first REIT analysis'
    },
    {
      id: 'a3',
      title: 'Pillar Graduate',
      iconName: 'graduation-cap',
      description: 'Passed Education Pillar test'
    },
    {
      id: 'a4',
      title: 'Wealth Planner',
      iconName: 'target',
      description: 'Defined primary retirement goal'
    }
  ],
  watchlist: [
    {
      id: 'w1',
      name: 'Nifty 50 Index Fund (Direct/Growth)',
      price: '₹24,320.50',
      change: 1.45,
      isPositive: true,
      history: [
        { day: 'Mon', value: 23800 },
        { day: 'Tue', value: 23950 },
        { day: 'Wed', value: 24100 },
        { day: 'Thu', value: 24050 },
        { day: 'Fri', value: 24320 }
      ]
    },
    {
      id: 'w2',
      name: 'Embassy Office Parks REIT',
      price: '₹378.20',
      change: -0.82,
      isPositive: false,
      history: [
        { day: 'Mon', value: 382 },
        { day: 'Tue', value: 380 },
        { day: 'Wed', value: 381 },
        { day: 'Thu', value: 379 },
        { day: 'Fri', value: 378 }
      ]
    },
    {
      id: 'w3',
      name: 'Gyan4Wealth Core Equity Portfolio',
      price: '₹145.60',
      change: 3.12,
      isPositive: true,
      history: [
        { day: 'Mon', value: 138 },
        { day: 'Tue', value: 140 },
        { day: 'Wed', value: 142 },
        { day: 'Thu', value: 141 },
        { day: 'Fri', value: 145.6 }
      ]
    }
  ],
  recommended: [
    {
      id: 'r1',
      title: 'The Fundamentals of Financial Planning',
      pillar: 'Education',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80',
      description: 'Master the core pillars of cashflow management, budgeting, and compound interest basics.',
      ctaText: 'Start Learning'
    },
    {
      id: 'r2',
      title: 'Gold Mutual Funds vs. Sovereign Gold Bonds (SGB)',
      pillar: 'Finance/Wealth',
      image: 'https://images.unsplash.com/photo-1610374792793-f016b77ca51a?w=500&auto=format&fit=crop&q=80',
      description: 'Analyze which gold investment yields better returns and tax advantages for your portfolio.',
      ctaText: 'Compare SGBs'
    },
    {
      id: 'r3',
      title: 'Evaluating Commercial Properties for Passive Rental Yields',
      pillar: 'Real Estate',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80',
      description: 'Learn to calculate Net Operating Income (NOI), Cap Rates, and evaluate tenant profiles.',
      ctaText: 'Review Guide'
    },
    {
      id: 'r4',
      title: 'Negotiating Equity Compensation in Tech Roles',
      pillar: 'Career',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=80',
      description: 'Understanding RSUs, stock options, vesting schedules, and how to negotiate them.',
      ctaText: 'Read Blueprint'
    },
    {
      id: 'r5',
      title: 'Setting Up a PPF Account for Your Child\'s Future Education',
      pillar: 'Parenting',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=80',
      description: 'A step-by-step guide to locking in tax-free compounded returns for your child’s higher education.',
      ctaText: 'Setup PPF'
    }
  ]
};
