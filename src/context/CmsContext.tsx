import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initializeDatabaseIfEmpty,
  seedFirestoreDatabase,
  subscribeAppSettings,
  subscribeBranding,
  subscribeHomeSections,
  subscribeNavigation,
  subscribeBottomNav,
  subscribeWisdom,
  subscribeSadhna,
  subscribeVideos,
  subscribeAudio,
  subscribeQuotes,
  subscribeCourses,
  subscribeSessions,
  subscribePages,
  subscribeMedia,
  subscribeUsers,
  subscribeAuditLogs,
  updateAppSettings,
  updateAppBranding,
  saveHomeSection,
  deleteHomeSection,
  saveNavigationItem,
  deleteNavigationItem,
  saveBottomNavItem,
  saveWisdom,
  moveToTrash,
  restoreFromTrash,
  permanentDelete,
  saveSadhna,
  saveVideo,
  saveAudio,
  saveQuote,
  saveCourse,
  saveSession,
  savePage,
  saveMediaItem,
  deleteMediaItem,
  updateUserRole,
  toggleUserSuspension,
  logAudit,
} from '../services/cmsService';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, OWNER_EMAIL } from '../firebase/config';
import {
  DEFAULT_APP_SETTINGS,
  DEFAULT_BRANDING,
  DEFAULT_HOME_SECTIONS,
  DEFAULT_DRAWER_MENU,
  DEFAULT_BOTTOM_NAV,
  DEFAULT_WISDOM,
  DEFAULT_SADHNA,
  DEFAULT_VIDEOS,
  DEFAULT_AUDIO,
  DEFAULT_QUOTES,
  DEFAULT_COURSES,
  DEFAULT_SESSIONS,
  DEFAULT_EDITABLE_PAGES,
  DEFAULT_USERS,
} from '../services/seedData';
import type {
  AppSettings,
  AppBranding,
  HomeSection,
  NavigationMenuItem,
  BottomNavItem,
  WisdomContent,
  SadhnaContent,
  VideoContent,
  AudioContent,
  QuoteContent,
  MediaItem,
  CourseContent,
  OnlineSession,
  EditablePage,
  UserRecord,
  AuditLogEntry,
  ContentStatus,
} from '../types/cms';

interface CmsContextType {
  // State
  isLoading: boolean;
  appSettings: AppSettings;
  branding: AppBranding;
  homeSections: HomeSection[];
  navigationMenu: NavigationMenuItem[];
  bottomNavItems: BottomNavItem[];
  wisdomList: WisdomContent[];
  sadhnaList: SadhnaContent[];
  videoList: VideoContent[];
  audioList: AudioContent[];
  quoteList: QuoteContent[];
  courseList: CourseContent[];
  sessionList: OnlineSession[];
  editablePages: EditablePage[];
  mediaLibrary: MediaItem[];
  userList: UserRecord[];
  auditLogs: AuditLogEntry[];

  // Auth & Roles
  currentUser: UserRecord | null;
  isOwnerOrAdmin: boolean;
  isSuperAdmin: boolean;
  loginAsOwner: () => void;
  loginAsUser: (email: string, name: string) => void;
  signInWithGoogle: () => Promise<void>;
  seedDatabase: () => Promise<void>;
  logout: () => void;

  // Actions
  updateSettings: (data: Partial<AppSettings>) => Promise<void>;
  updateBrandingConfig: (data: Partial<AppBranding>) => Promise<void>;
  
  // Content Savers
  saveHomeSectionItem: (section: HomeSection) => Promise<void>;
  removeHomeSectionItem: (id: string) => Promise<void>;
  saveMenuItem: (item: NavigationMenuItem) => Promise<void>;
  removeMenuItem: (id: string) => Promise<void>;
  saveBottomNavConfig: (item: BottomNavItem) => Promise<void>;

  saveWisdomItem: (item: WisdomContent) => Promise<void>;
  saveSadhnaItem: (item: SadhnaContent) => Promise<void>;
  saveVideoItem: (item: VideoContent) => Promise<void>;
  saveAudioItem: (item: AudioContent) => Promise<void>;
  saveQuoteItem: (item: QuoteContent) => Promise<void>;
  saveCourseItem: (item: CourseContent) => Promise<void>;
  saveSessionItem: (item: OnlineSession) => Promise<void>;
  savePageItem: (page: EditablePage) => Promise<void>;

  // Trash & Restore
  sendToTrash: (collection: string, id: string, title?: string) => Promise<void>;
  restoreItem: (collection: string, id: string, title?: string) => Promise<void>;
  purgePermanently: (collection: string, id: string) => Promise<void>;

  // Media
  uploadMedia: (item: MediaItem) => Promise<void>;
  removeMedia: (id: string) => Promise<void>;

  // User Administration
  changeUserRole: (uid: string, role: UserRecord['role']) => Promise<void>;
  setUserSuspension: (uid: string, suspended: boolean) => Promise<void>;

  // Search
  searchAll: (query: string) => {
    wisdom: WisdomContent[];
    sadhna: SadhnaContent[];
    videos: VideoContent[];
    audio: AudioContent[];
    quotes: QuoteContent[];
    courses: CourseContent[];
    sessions: OnlineSession[];
    pages: EditablePage[];
  };
}

const CmsContext = createContext<CmsContextType | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [appSettings, setAppSettings] = useState<AppSettings>(DEFAULT_APP_SETTINGS);
  const [branding, setBranding] = useState<AppBranding>(DEFAULT_BRANDING);
  const [homeSections, setHomeSections] = useState<HomeSection[]>(DEFAULT_HOME_SECTIONS);
  const [navigationMenu, setNavigationMenu] = useState<NavigationMenuItem[]>(DEFAULT_DRAWER_MENU);
  const [bottomNavItems, setBottomNavItems] = useState<BottomNavItem[]>(DEFAULT_BOTTOM_NAV);
  const [wisdomList, setWisdomList] = useState<WisdomContent[]>(DEFAULT_WISDOM);
  const [sadhnaList, setSadhnaList] = useState<SadhnaContent[]>(DEFAULT_SADHNA);
  const [videoList, setVideoList] = useState<VideoContent[]>(DEFAULT_VIDEOS);
  const [audioList, setAudioList] = useState<AudioContent[]>(DEFAULT_AUDIO);
  const [quoteList, setQuoteList] = useState<QuoteContent[]>(DEFAULT_QUOTES);
  const [courseList, setCourseList] = useState<CourseContent[]>(DEFAULT_COURSES);
  const [sessionList, setSessionList] = useState<OnlineSession[]>(DEFAULT_SESSIONS);
  const [editablePages, setEditablePages] = useState<EditablePage[]>(DEFAULT_EDITABLE_PAGES);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [userList, setUserList] = useState<UserRecord[]>(DEFAULT_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Current Logged in User (Default initialized to Super Admin / Owner)
  const [currentUser, setCurrentUser] = useState<UserRecord | null>({
    uid: 'owner_kayashunya_1',
    email: OWNER_EMAIL,
    displayName: 'Owner / Super Admin',
    role: 'super_admin',
    isSuspended: false,
    streakDays: 45,
    totalHoursRead: 128,
    booksCompleted: 12,
    createdAt: new Date().toISOString(),
  });

  const isOwnerOrAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'admin' || currentUser?.email === OWNER_EMAIL;
  const isSuperAdmin = currentUser?.role === 'super_admin' || currentUser?.email === OWNER_EMAIL;

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const isOwner = fbUser.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();
        setCurrentUser({
          uid: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || (isOwner ? 'Owner / Super Admin' : 'Seeker'),
          role: isOwner ? 'super_admin' : 'user',
          isSuspended: false,
          streakDays: 45,
          totalHoursRead: 128,
          booksCompleted: 12,
          createdAt: new Date().toISOString(),
        });

        if (isOwner) {
          await initializeDatabaseIfEmpty();
        }
      }
    });

    return () => unsubAuth();
  }, []);

  // Initialize and subscribe to Firestore
  useEffect(() => {
    let unsubs: Array<() => void> = [];

    async function bootstrap() {
      try {
        await initializeDatabaseIfEmpty();

        unsubs.push(subscribeAppSettings(setAppSettings));
        unsubs.push(subscribeBranding((b) => {
          setBranding(b);
          // Dynamically update document title & CSS theme variables
          if (b.primaryColor) {
            document.documentElement.style.setProperty('--color-primary', b.primaryColor);
          }
          if (b.secondaryColor) {
            document.documentElement.style.setProperty('--color-secondary', b.secondaryColor);
          }
        }));
        unsubs.push(subscribeHomeSections(setHomeSections));
        unsubs.push(subscribeNavigation(setNavigationMenu));
        unsubs.push(subscribeBottomNav(setBottomNavItems));
        unsubs.push(subscribeWisdom(setWisdomList));
        unsubs.push(subscribeSadhna(setSadhnaList));
        unsubs.push(subscribeVideos(setVideoList));
        unsubs.push(subscribeAudio(setAudioList));
        unsubs.push(subscribeQuotes(setQuoteList));
        unsubs.push(subscribeCourses(setCourseList));
        unsubs.push(subscribeSessions(setSessionList));
        unsubs.push(subscribePages(setEditablePages));
        unsubs.push(subscribeMedia(setMediaLibrary));
        unsubs.push(subscribeUsers(setUserList));
        unsubs.push(subscribeAuditLogs(setAuditLogs));
      } catch (err) {
        console.warn('Firestore bootstrap notification:', err);
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, []);

  // Sync document title with dynamic appName from Firestore
  useEffect(() => {
    if (appSettings.appName) {
      document.title = `${appSettings.appName} - ${appSettings.tagline || 'Spiritual Wisdom & Sadhana'}`;
    }
  }, [appSettings.appName, appSettings.tagline]);

  const actorEmail = currentUser?.email || OWNER_EMAIL;

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const res = await signInWithPopup(auth, provider);
      if (res.user) {
        const isOwner = res.user.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();
        setCurrentUser({
          uid: res.user.uid,
          email: res.user.email || '',
          displayName: res.user.displayName || (isOwner ? 'Owner / Super Admin' : 'Seeker'),
          role: isOwner ? 'super_admin' : 'user',
          isSuspended: false,
          streakDays: 1,
          totalHoursRead: 0,
          booksCompleted: 0,
          createdAt: new Date().toISOString(),
        });
        if (isOwner) {
          await initializeDatabaseIfEmpty();
        }
      }
    } catch (err) {
      console.warn('Google sign-in popup closed or cancelled:', err);
    }
  };

  const seedDatabase = async () => {
    await seedFirestoreDatabase(actorEmail);
  };

  const loginAsOwner = async () => {
    setCurrentUser({
      uid: auth.currentUser?.uid || 'owner_kayashunya_1',
      email: OWNER_EMAIL,
      displayName: 'Owner / Super Admin',
      role: 'super_admin',
      isSuspended: false,
      streakDays: 45,
      totalHoursRead: 128,
      booksCompleted: 12,
      createdAt: new Date().toISOString(),
    });
    logAudit(OWNER_EMAIL, 'login', 'auth', 'owner', 'Owner logged into Admin Panel');
  };

  const loginAsUser = (email: string, name: string) => {
    const isOwner = email.toLowerCase() === OWNER_EMAIL.toLowerCase();
    setCurrentUser({
      uid: isOwner ? 'owner_kayashunya_1' : `user_${Date.now()}`,
      email,
      displayName: name,
      role: isOwner ? 'super_admin' : 'user',
      isSuspended: false,
      streakDays: 1,
      totalHoursRead: 0,
      booksCompleted: 0,
      createdAt: new Date().toISOString(),
    });
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Sign out note:', err);
    }
    setCurrentUser(null);
  };

  // Actions
  const updateSettings = async (data: Partial<AppSettings>) => {
    await updateAppSettings(data, actorEmail);
  };

  const updateBrandingConfig = async (data: Partial<AppBranding>) => {
    await updateAppBranding(data, actorEmail);
  };

  const saveHomeSectionItem = async (section: HomeSection) => {
    await saveHomeSection(section, actorEmail);
  };

  const removeHomeSectionItem = async (id: string) => {
    await deleteHomeSection(id, actorEmail);
  };

  const saveMenuItem = async (item: NavigationMenuItem) => {
    await saveNavigationItem(item, actorEmail);
  };

  const removeMenuItem = async (id: string) => {
    await deleteNavigationItem(id, actorEmail);
  };

  const saveBottomNavConfig = async (item: BottomNavItem) => {
    await saveBottomNavItem(item, actorEmail);
  };

  const saveWisdomItem = async (item: WisdomContent) => {
    await saveWisdom(item, actorEmail);
  };

  const saveSadhnaItem = async (item: SadhnaContent) => {
    await saveSadhna(item, actorEmail);
  };

  const saveVideoItem = async (item: VideoContent) => {
    await saveVideo(item, actorEmail);
  };

  const saveAudioItem = async (item: AudioContent) => {
    await saveAudio(item, actorEmail);
  };

  const saveQuoteItem = async (item: QuoteContent) => {
    await saveQuote(item, actorEmail);
  };

  const saveCourseItem = async (item: CourseContent) => {
    await saveCourse(item, actorEmail);
  };

  const saveSessionItem = async (item: OnlineSession) => {
    await saveSession(item, actorEmail);
  };

  const savePageItem = async (page: EditablePage) => {
    await savePage(page, actorEmail);
  };

  const sendToTrash = async (collectionName: string, id: string, title?: string) => {
    await moveToTrash(collectionName, id, actorEmail, title);
  };

  const restoreItem = async (collectionName: string, id: string, title?: string) => {
    await restoreFromTrash(collectionName, id, actorEmail, title);
  };

  const purgePermanently = async (collectionName: string, id: string) => {
    await permanentDelete(collectionName, id, actorEmail);
  };

  const uploadMedia = async (item: MediaItem) => {
    await saveMediaItem(item, actorEmail);
  };

  const removeMedia = async (id: string) => {
    await deleteMediaItem(id, actorEmail);
  };

  const changeUserRole = async (uid: string, role: UserRecord['role']) => {
    await updateUserRole(uid, role, actorEmail);
  };

  const setUserSuspension = async (uid: string, suspended: boolean) => {
    await toggleUserSuspension(uid, suspended, actorEmail);
  };

  // Global search across all content
  const searchAll = (queryStr: string) => {
    const q = queryStr.toLowerCase().trim();
    if (!q) {
      return {
        wisdom: [],
        sadhna: [],
        videos: [],
        audio: [],
        quotes: [],
        courses: [],
        sessions: [],
        pages: [],
      };
    }

    const matches = (text?: string) => text?.toLowerCase().includes(q) ?? false;

    return {
      wisdom: wisdomList.filter(
        (w) => w.status === 'published' && (matches(w.title) || matches(w.subtitle) || matches(w.content) || w.tags?.some(matches))
      ),
      sadhna: sadhnaList.filter(
        (s) => s.status === 'published' && (matches(s.title) || matches(s.subtitle) || matches(s.description) || s.tags?.some(matches))
      ),
      videos: videoList.filter(
        (v) => v.status === 'published' && (matches(v.title) || matches(v.description) || v.tags?.some(matches))
      ),
      audio: audioList.filter(
        (a) => a.status === 'published' && (matches(a.title) || matches(a.description) || matches(a.category))
      ),
      quotes: quoteList.filter(
        (qt) => qt.status === 'published' && (matches(qt.quote) || matches(qt.author) || matches(qt.category))
      ),
      courses: courseList.filter(
        (c) => c.status === 'published' && (matches(c.title) || matches(c.subtitle) || matches(c.description))
      ),
      sessions: sessionList.filter(
        (s) => s.status === 'upcoming' && (matches(s.title) || matches(s.description) || matches(s.instructor))
      ),
      pages: editablePages.filter(
        (p) => p.status === 'published' && (matches(p.title) || matches(p.content))
      ),
    };
  };

  return (
    <CmsContext.Provider
      value={{
        isLoading,
        appSettings,
        branding,
        homeSections,
        navigationMenu,
        bottomNavItems,
        wisdomList,
        sadhnaList,
        videoList,
        audioList,
        quoteList,
        courseList,
        sessionList,
        editablePages,
        mediaLibrary,
        userList,
        auditLogs,
        currentUser,
        isOwnerOrAdmin,
        isSuperAdmin,
        loginAsOwner,
        loginAsUser,
        signInWithGoogle,
        seedDatabase,
        logout,
        updateSettings,
        updateBrandingConfig,
        saveHomeSectionItem,
        removeHomeSectionItem,
        saveMenuItem,
        removeMenuItem,
        saveBottomNavConfig,
        saveWisdomItem,
        saveSadhnaItem,
        saveVideoItem,
        saveAudioItem,
        saveQuoteItem,
        saveCourseItem,
        saveSessionItem,
        savePageItem,
        sendToTrash,
        restoreItem,
        purgePermanently,
        uploadMedia,
        removeMedia,
        changeUserRole,
        setUserSuspension,
        searchAll,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
