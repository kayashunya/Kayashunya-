export type TabType = 'home' | 'wisdom' | 'sadhana' | 'account';

export interface WisdomArticle {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  type: 'book' | 'article' | 'quote' | 'sutra';
  readingTimeMinutes: number;
  content: string;
  quoteHighlight?: string;
  likesCount: number;
  isBookmarked: boolean;
  publishedDate: string;
}

export interface SadhanaItem {
  id: string;
  title: string;
  description: string;
  category: 'meditation' | 'swadhyaya' | 'mindfulness' | 'contemplation';
  targetMinutes: number;
  isCompleted: boolean;
  streakDays: number;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
}

export interface UserState {
  name: string;
  email: string;
  tier: 'Free Seeker' | 'Wisdom Circle Member' | 'Lifetime Sadhaka';
  streakDays: number;
  totalHoursRead: number;
  booksCompleted: number;
  notificationsEnabled: boolean;
  preferredTheme: 'sepia' | 'light' | 'dark';
}
