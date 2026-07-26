export interface UserProgress {
  literacyScore: number;
  wealthGoalProgress: number;
  wealthGoalTarget: number;
  wealthGoalCurrent: number;
}

export interface Course {
  id: string;
  title: string;
  category: 'Education' | 'Finance/Wealth' | 'Career' | 'Real Estate' | 'Parenting';
  thumbnail: string;
  progress: number; // 0 to 100
  duration: string;
}

export interface Session {
  id: string;
  title: string;
  date: string; // e.g., "Jul 25"
  time: string; // e.g., "4:00 PM"
  host: string;
}

export interface Achievement {
  id: string;
  title: string;
  iconName: string; // Map to a Lucide icon
  description: string;
}

export interface WatchlistEntry {
  id: string;
  name: string;
  price: string;
  change: number; // e.g., 4.2 (represented as percentage)
  isPositive: boolean;
  history: { day: string; value: number }[];
}

export interface RecommendedItem {
  id: string;
  title: string;
  pillar: 'Education' | 'Finance/Wealth' | 'Career' | 'Real Estate' | 'Parenting';
  image: string;
  description: string;
  ctaText: string;
}

export interface DashboardData {
  user: {
    name: string;
    avatar: string;
    unreadNotifications: number;
  };
  progress: UserProgress;
  courses: Course[];
  sessions: Session[];
  achievements: Achievement[];
  watchlist: WatchlistEntry[];
  recommended: RecommendedItem[];
}
