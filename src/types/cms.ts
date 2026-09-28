export type ContentStatus = 'draft' | 'published' | 'scheduled' | 'archived' | 'trash';

export type UserRole = 'super_admin' | 'admin' | 'moderator' | 'user';

export interface AppSettings {
  id?: string;
  appName: string;
  appDescription: string;
  tagline: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    youtube?: string;
    instagram?: string;
    telegram?: string;
    twitter?: string;
    whatsapp?: string;
  };
  copyrightText: string;
}

export interface AppBranding {
  id?: string;
  logoUrl: string;
  appIconUrl: string;
  faviconUrl: string;
  splashImageUrl: string;
  primaryColor: string; // e.g. #C25E00
  secondaryColor: string; // e.g. #D97706
  accentColor: string;
  canvasBgLight: string; // e.g. #FAF8F5
  canvasBgDark: string; // e.g. #121212
  fontHeading: string;
  fontBody: string;
}

export interface HomeSection {
  id: string;
  title: string;
  subtitle?: string;
  type: 
    | 'continue'
    | 'featured'
    | 'todays_wisdom'
    | 'todays_sadhna'
    | 'upcoming_sessions'
    | 'courses'
    | 'quotes'
    | 'videos'
    | 'audio'
    | 'recommended'
    | 'banner'
    | 'custom';
  isEnabled: boolean;
  order: number;
  contentIds?: string[];
  buttonLabel?: string;
  buttonDestination?: string;
  backgroundImageUrl?: string;
  displayLimit?: number;
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  iconName: string;
  destination: string; // internal route or external URL
  order: number;
  isEnabled: boolean;
  isSubmenu?: boolean;
  parentId?: string | null;
  target?: '_self' | '_blank';
}

export interface BottomNavItem {
  id: string;
  key: 'home' | 'wisdom' | 'sadhna' | 'account' | 'courses' | 'sessions' | 'videos';
  label: string;
  iconName: string;
  destination: string;
  isEnabled: boolean;
  order: number;
}

export interface ContentVersion {
  versionId: string;
  title: string;
  content: string;
  updatedAt: string;
  updatedBy: string;
  summary?: string;
}

export interface WisdomContent {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  author: string;
  category: string;
  tags: string[];
  type: 'article' | 'book' | 'sutra' | 'discourse';
  content: string;
  excerpt: string;
  readingTimeMinutes: number;
  coverImageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  quoteHighlight?: string;
  status: ContentStatus;
  publishedAt: string;
  isFeatured?: boolean;
  likesCount: number;
  viewsCount?: number;
  isBookmarked?: boolean;
  versions?: ContentVersion[];
  deletedAt?: string | null;
}

export interface SadhnaContent {
  id: string;
  title: string;
  subtitle: string;
  category: 
    | 'daily'
    | 'yoga'
    | 'strength'
    | 'mobility'
    | 'meditation'
    | 'breath'
    | 'awareness'
    | 'swadhyaya'
    | 'kayashunya_8_path'
    | 'universal_training'
    | 'program';
  description: string;
  instructions: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  coverImageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  tags: string[];
  status: ContentStatus;
  order: number;
  isFeatured?: boolean;
  streakContributionDays?: number;
  timeOfDay?: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';
  deletedAt?: string | null;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  videoUrl: string; // YouTube, Cloud Storage, or MP4
  thumbnailUrl: string;
  duration: string;
  instructor?: string;
  status: ContentStatus;
  publishedAt: string;
  isFeatured?: boolean;
  deletedAt?: string | null;
}

export interface AudioContent {
  id: string;
  title: string;
  description: string;
  category: string;
  audioUrl: string;
  thumbnailUrl?: string;
  duration: string;
  narrator?: string;
  status: ContentStatus;
  publishedAt: string;
  deletedAt?: string | null;
}

export interface QuoteContent {
  id: string;
  quote: string;
  author: string;
  category: string;
  backgroundImageUrl?: string;
  status: ContentStatus;
  sharesCount: number;
  deletedAt?: string | null;
}

export interface MediaItem {
  id: string;
  name: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'pdf';
  sizeBytes: number;
  folder: string;
  createdAt: string;
  altText?: string;
  status?: ContentStatus;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'audio' | 'text' | 'pdf';
  contentUrl?: string;
  textContent?: string;
  description?: string;
  order: number;
  isFreePreview?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  instructor: string;
  coverImageUrl: string;
  durationHours: number;
  modulesCount: number;
  lessonsCount: number;
  status: ContentStatus;
  modules: CourseModule[];
  downloadableResources?: Array<{ name: string; url: string }>;
  isFeatured?: boolean;
  deletedAt?: string | null;
}

export interface OnlineSession {
  id: string;
  title: string;
  description: string;
  instructor: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:MM AM/PM
  durationMinutes: number;
  meetingLink: string;
  recordingLink?: string;
  coverImageUrl?: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  maxParticipants?: number;
  registeredCount: number;
  deletedAt?: string | null;
}

export interface EditablePage {
  id: string;
  slug: string;
  title: string;
  content: string; // Rich markdown or HTML prose
  metaDescription: string;
  status: ContentStatus;
  updatedAt: string;
  lastUpdatedBy: string;
  versions?: ContentVersion[];
  deletedAt?: string | null;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorRole: UserRole;
  circle: string;
  content: string;
  likes: number;
  responsesCount: number;
  isHidden: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface UserRecord {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  isSuspended: boolean;
  streakDays: number;
  totalHoursRead: number;
  booksCompleted: number;
  bookmarkedIds?: string[];
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuditLogEntry {
  id: string;
  actorEmail: string;
  actorUid: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'restore' | 'login' | 'logout' | 'settings_change';
  entityType: string;
  entityId?: string;
  entityTitle?: string;
  details: string;
  timestamp: string;
}
