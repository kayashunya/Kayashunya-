import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  addDoc
} from 'firebase/firestore';
import { db, auth, OWNER_EMAIL } from '../firebase/config';
import { testConnection, handleFirestoreError, OperationType } from '../firebase/errors';
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
  AuditLogEntry
} from '../types/cms';
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
  DEFAULT_USERS
} from './seedData';

// Audit Logger Helper
export async function logAudit(
  actorEmail: string,
  action: AuditLogEntry['action'],
  entityType: string,
  entityId: string,
  details: string,
  entityTitle?: string
) {
  try {
    const logRef = collection(db, 'auditLogs');
    await addDoc(logRef, {
      actorEmail: actorEmail || 'system',
      actorUid: actorEmail === OWNER_EMAIL ? 'owner' : 'admin',
      action,
      entityType,
      entityId,
      entityTitle: entityTitle || '',
      details,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Audit logging failed (non-blocking):', err);
  }
}

/**
 * Seed Firestore with pristine Kayashunya data (requires authenticated owner)
 */
export async function seedFirestoreDatabase(actorEmail: string = OWNER_EMAIL) {
  try {
    console.log('🌱 Seeding initial Kayashunya CMS database to Firestore...');

    // 1. App Settings & Branding
    await setDoc(doc(db, 'appSettings', 'global'), DEFAULT_APP_SETTINGS);
    await setDoc(doc(db, 'branding', 'global'), DEFAULT_BRANDING);

    // 2. Home Sections
    for (const section of DEFAULT_HOME_SECTIONS) {
      await setDoc(doc(db, 'homeSections', section.id), section);
    }

    // 3. Navigation Menus
    for (const item of DEFAULT_DRAWER_MENU) {
      await setDoc(doc(db, 'navigation', item.id), item);
    }
    for (const item of DEFAULT_BOTTOM_NAV) {
      await setDoc(doc(db, 'navigation', `bottom_${item.id}`), item);
    }

    // 4. Wisdom Items
    for (const item of DEFAULT_WISDOM) {
      await setDoc(doc(db, 'wisdom', item.id), item);
    }

    // 5. Sadhna Routines
    for (const item of DEFAULT_SADHNA) {
      await setDoc(doc(db, 'sadhna', item.id), item);
    }

    // 6. Videos & Audio
    for (const item of DEFAULT_VIDEOS) {
      await setDoc(doc(db, 'videos', item.id), item);
    }
    for (const item of DEFAULT_AUDIO) {
      await setDoc(doc(db, 'audio', item.id), item);
    }

    // 7. Quotes
    for (const item of DEFAULT_QUOTES) {
      await setDoc(doc(db, 'quotes', item.id), item);
    }

    // 8. Courses & Sessions
    for (const item of DEFAULT_COURSES) {
      await setDoc(doc(db, 'courses', item.id), item);
    }
    for (const item of DEFAULT_SESSIONS) {
      await setDoc(doc(db, 'sessions', item.id), item);
    }

    // 9. Editable Pages
    for (const item of DEFAULT_EDITABLE_PAGES) {
      await setDoc(doc(db, 'pages', item.id), item);
    }

    // 10. Users
    for (const user of DEFAULT_USERS) {
      await setDoc(doc(db, 'users', user.uid), user);
    }

    await logAudit(
      actorEmail,
      'create',
      'system',
      'bootstrap',
      'Initial Kayashunya CMS database seeded successfully.'
    );
    console.log('✅ Firestore seeding completed successfully!');
  } catch (err) {
    console.warn('Seeding notice (requires authenticated owner):', err);
  }
}

/**
 * Checks Firestore status and seeds only when authenticated as Owner
 */
export async function initializeDatabaseIfEmpty() {
  try {
    // Validate Firestore connection on boot
    await testConnection();

    // Verify whether settings already exist
    const settingsDoc = await getDoc(doc(db, 'appSettings', 'global'));
    if (!settingsDoc.exists()) {
      // If the client is not authenticated with owner credentials, avoid unauthorized writes
      if (!auth.currentUser) {
        console.log('ℹ️ Seeding pending: User not authenticated in Firebase Auth. Local defaults active.');
        return;
      }

      await seedFirestoreDatabase(auth.currentUser.email || OWNER_EMAIL);
    }
  } catch (err) {
    console.warn('Database connection check note:', err);
  }
}

// ==========================================
// REAL-TIME SUBSCRIBERS
// ==========================================

export function subscribeAppSettings(callback: (settings: AppSettings) => void) {
  return onSnapshot(doc(db, 'appSettings', 'global'), (snap) => {
    if (snap.exists()) {
      callback(snap.data() as AppSettings);
    } else {
      callback(DEFAULT_APP_SETTINGS);
    }
  }, (err) => {
    console.warn('Fallback on appSettings error:', err);
    callback(DEFAULT_APP_SETTINGS);
  });
}

export function subscribeBranding(callback: (branding: AppBranding) => void) {
  return onSnapshot(doc(db, 'branding', 'global'), (snap) => {
    if (snap.exists()) {
      callback(snap.data() as AppBranding);
    } else {
      callback(DEFAULT_BRANDING);
    }
  }, (err) => {
    console.warn('Fallback on branding error:', err);
    callback(DEFAULT_BRANDING);
  });
}

export function subscribeHomeSections(callback: (sections: HomeSection[]) => void) {
  const q = query(collection(db, 'homeSections'), orderBy('order', 'asc'));
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => d.data() as HomeSection);
    callback(list.length > 0 ? list : DEFAULT_HOME_SECTIONS);
  }, () => callback(DEFAULT_HOME_SECTIONS));
}

export function subscribeNavigation(callback: (items: NavigationMenuItem[]) => void) {
  const q = query(collection(db, 'navigation'), orderBy('order', 'asc'));
  return onSnapshot(q, (snap) => {
    const list = snap.docs
      .map((d) => d.data() as NavigationMenuItem)
      .filter((i) => !i.id.startsWith('bottom_'));
    callback(list.length > 0 ? list : DEFAULT_DRAWER_MENU);
  }, () => callback(DEFAULT_DRAWER_MENU));
}

export function subscribeBottomNav(callback: (items: BottomNavItem[]) => void) {
  const q = query(collection(db, 'navigation'), orderBy('order', 'asc'));
  return onSnapshot(q, (snap) => {
    const list = snap.docs
      .map((d) => d.data() as BottomNavItem)
      .filter((i) => i.id.startsWith('bottom_') || (i.key !== undefined));
    callback(list.length > 0 ? list : DEFAULT_BOTTOM_NAV);
  }, () => callback(DEFAULT_BOTTOM_NAV));
}

export function subscribeWisdom(callback: (items: WisdomContent[]) => void) {
  return onSnapshot(collection(db, 'wisdom'), (snap) => {
    const list = snap.docs.map((d) => d.data() as WisdomContent);
    callback(list.length > 0 ? list : DEFAULT_WISDOM);
  }, () => callback(DEFAULT_WISDOM));
}

export function subscribeSadhna(callback: (items: SadhnaContent[]) => void) {
  return onSnapshot(collection(db, 'sadhna'), (snap) => {
    const list = snap.docs.map((d) => d.data() as SadhnaContent);
    callback(list.length > 0 ? list : DEFAULT_SADHNA);
  }, () => callback(DEFAULT_SADHNA));
}

export function subscribeVideos(callback: (items: VideoContent[]) => void) {
  return onSnapshot(collection(db, 'videos'), (snap) => {
    const list = snap.docs.map((d) => d.data() as VideoContent);
    callback(list.length > 0 ? list : DEFAULT_VIDEOS);
  }, () => callback(DEFAULT_VIDEOS));
}

export function subscribeAudio(callback: (items: AudioContent[]) => void) {
  return onSnapshot(collection(db, 'audio'), (snap) => {
    const list = snap.docs.map((d) => d.data() as AudioContent);
    callback(list.length > 0 ? list : DEFAULT_AUDIO);
  }, () => callback(DEFAULT_AUDIO));
}

export function subscribeQuotes(callback: (items: QuoteContent[]) => void) {
  return onSnapshot(collection(db, 'quotes'), (snap) => {
    const list = snap.docs.map((d) => d.data() as QuoteContent);
    callback(list.length > 0 ? list : DEFAULT_QUOTES);
  }, () => callback(DEFAULT_QUOTES));
}

export function subscribeCourses(callback: (items: CourseContent[]) => void) {
  return onSnapshot(collection(db, 'courses'), (snap) => {
    const list = snap.docs.map((d) => d.data() as CourseContent);
    callback(list.length > 0 ? list : DEFAULT_COURSES);
  }, () => callback(DEFAULT_COURSES));
}

export function subscribeSessions(callback: (items: OnlineSession[]) => void) {
  return onSnapshot(collection(db, 'sessions'), (snap) => {
    const list = snap.docs.map((d) => d.data() as OnlineSession);
    callback(list.length > 0 ? list : DEFAULT_SESSIONS);
  }, () => callback(DEFAULT_SESSIONS));
}

export function subscribePages(callback: (items: EditablePage[]) => void) {
  return onSnapshot(collection(db, 'pages'), (snap) => {
    const list = snap.docs.map((d) => d.data() as EditablePage);
    callback(list.length > 0 ? list : DEFAULT_EDITABLE_PAGES);
  }, () => callback(DEFAULT_EDITABLE_PAGES));
}

export function subscribeMedia(callback: (items: MediaItem[]) => void) {
  return onSnapshot(collection(db, 'media'), (snap) => {
    const list = snap.docs.map((d) => d.data() as MediaItem);
    callback(list);
  }, () => callback([]));
}

export function subscribeUsers(callback: (items: UserRecord[]) => void) {
  return onSnapshot(collection(db, 'users'), (snap) => {
    const list = snap.docs.map((d) => d.data() as UserRecord);
    callback(list.length > 0 ? list : DEFAULT_USERS);
  }, () => callback(DEFAULT_USERS));
}

export function subscribeAuditLogs(callback: (items: AuditLogEntry[]) => void) {
  const q = query(collection(db, 'auditLogs'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as AuditLogEntry);
    callback(list);
  }, () => callback([]));
}

// ==========================================
// CRUD OPERATIONS
// ==========================================

export async function updateAppSettings(data: Partial<AppSettings>, actor: string) {
  await setDoc(doc(db, 'appSettings', 'global'), data, { merge: true });
  await logAudit(actor, 'settings_change', 'appSettings', 'global', `Updated app settings: ${Object.keys(data).join(', ')}`);
}

export async function updateAppBranding(data: Partial<AppBranding>, actor: string) {
  await setDoc(doc(db, 'branding', 'global'), data, { merge: true });
  await logAudit(actor, 'settings_change', 'branding', 'global', `Updated branding settings: ${Object.keys(data).join(', ')}`);
}

// Home Sections
export async function saveHomeSection(section: HomeSection, actor: string) {
  await setDoc(doc(db, 'homeSections', section.id), section, { merge: true });
  await logAudit(actor, 'update', 'homeSections', section.id, `Saved home section "${section.title}"`, section.title);
}

export async function deleteHomeSection(id: string, actor: string) {
  await deleteDoc(doc(db, 'homeSections', id));
  await logAudit(actor, 'delete', 'homeSections', id, `Deleted home section`);
}

// Navigation
export async function saveNavigationItem(item: NavigationMenuItem, actor: string) {
  await setDoc(doc(db, 'navigation', item.id), item, { merge: true });
  await logAudit(actor, 'update', 'navigation', item.id, `Saved menu item "${item.label}"`, item.label);
}

export async function deleteNavigationItem(id: string, actor: string) {
  await deleteDoc(doc(db, 'navigation', id));
  await logAudit(actor, 'delete', 'navigation', id, `Deleted menu item`);
}

export async function saveBottomNavItem(item: BottomNavItem, actor: string) {
  await setDoc(doc(db, 'navigation', `bottom_${item.id}`), item, { merge: true });
  await logAudit(actor, 'update', 'bottomNav', item.id, `Saved bottom nav item "${item.label}"`);
}

// Wisdom CRUD & Versioning
export async function saveWisdom(item: WisdomContent, actor: string) {
  // Capture version history before update
  const existingDoc = await getDoc(doc(db, 'wisdom', item.id));
  let versions = item.versions || [];
  if (existingDoc.exists()) {
    const existing = existingDoc.data() as WisdomContent;
    if (existing.content !== item.content || existing.title !== item.title) {
      versions = [
        {
          versionId: `v_${Date.now()}`,
          title: existing.title,
          content: existing.content,
          updatedAt: new Date().toISOString(),
          updatedBy: actor,
          summary: `Prior revision before edit by ${actor}`
        },
        ...versions
      ].slice(0, 10); // keep last 10 revisions
    }
  }

  const payload = { ...item, versions };
  await setDoc(doc(db, 'wisdom', item.id), payload, { merge: true });
  await logAudit(actor, existingDoc.exists() ? 'update' : 'create', 'wisdom', item.id, `Saved wisdom item "${item.title}"`, item.title);
}

export async function moveToTrash(collectionName: string, id: string, actor: string, title?: string) {
  await updateDoc(doc(db, collectionName, id), {
    status: 'trash',
    deletedAt: new Date().toISOString()
  });
  await logAudit(actor, 'delete', collectionName, id, `Moved "${title || id}" to trash`, title);
}

export async function restoreFromTrash(collectionName: string, id: string, actor: string, title?: string) {
  await updateDoc(doc(db, collectionName, id), {
    status: 'published',
    deletedAt: null
  });
  await logAudit(actor, 'restore', collectionName, id, `Restored "${title || id}" from trash`, title);
}

export async function permanentDelete(collectionName: string, id: string, actor: string) {
  await deleteDoc(doc(db, collectionName, id));
  await logAudit(actor, 'delete', collectionName, id, `Permanently purged ${collectionName} item`);
}

// Generic Content Savers
export async function saveSadhna(item: SadhnaContent, actor: string) {
  await setDoc(doc(db, 'sadhna', item.id), item, { merge: true });
  await logAudit(actor, 'update', 'sadhna', item.id, `Saved Sadhna routine "${item.title}"`, item.title);
}

export async function saveVideo(item: VideoContent, actor: string) {
  await setDoc(doc(db, 'videos', item.id), item, { merge: true });
  await logAudit(actor, 'update', 'videos', item.id, `Saved Video "${item.title}"`, item.title);
}

export async function saveAudio(item: AudioContent, actor: string) {
  await setDoc(doc(db, 'audio', item.id), item, { merge: true });
  await logAudit(actor, 'update', 'audio', item.id, `Saved Audio track "${item.title}"`, item.title);
}

export async function saveQuote(item: QuoteContent, actor: string) {
  await setDoc(doc(db, 'quotes', item.id), item, { merge: true });
  await logAudit(actor, 'update', 'quotes', item.id, `Saved quote by ${item.author}`);
}

export async function saveCourse(item: CourseContent, actor: string) {
  await setDoc(doc(db, 'courses', item.id), item, { merge: true });
  await logAudit(actor, 'update', 'courses', item.id, `Saved course "${item.title}"`, item.title);
}

export async function saveSession(item: OnlineSession, actor: string) {
  await setDoc(doc(db, 'sessions', item.id), item, { merge: true });
  await logAudit(actor, 'update', 'sessions', item.id, `Saved online session "${item.title}"`, item.title);
}

export async function savePage(page: EditablePage, actor: string) {
  const existingDoc = await getDoc(doc(db, 'pages', page.id));
  let versions = page.versions || [];
  if (existingDoc.exists()) {
    const existing = existingDoc.data() as EditablePage;
    if (existing.content !== page.content) {
      versions = [
        {
          versionId: `v_${Date.now()}`,
          title: existing.title,
          content: existing.content,
          updatedAt: new Date().toISOString(),
          updatedBy: actor,
          summary: `Revision before edit`
        },
        ...versions
      ].slice(0, 10);
    }
  }

  const payload = {
    ...page,
    updatedAt: new Date().toISOString(),
    lastUpdatedBy: actor,
    versions
  };
  await setDoc(doc(db, 'pages', page.id), payload, { merge: true });
  await logAudit(actor, 'update', 'pages', page.id, `Saved page "${page.title}"`, page.title);
}

// Media Library
export async function saveMediaItem(item: MediaItem, actor: string) {
  await setDoc(doc(db, 'media', item.id), item, { merge: true });
  await logAudit(actor, 'create', 'media', item.id, `Uploaded media "${item.name}"`, item.name);
}

export async function deleteMediaItem(id: string, actor: string) {
  await deleteDoc(doc(db, 'media', id));
  await logAudit(actor, 'delete', 'media', id, `Deleted media item`);
}

// User Management
export async function updateUserRole(uid: string, newRole: UserRecord['role'], actor: string) {
  await updateDoc(doc(db, 'users', uid), { role: newRole });
  await logAudit(actor, 'update', 'users', uid, `Changed user role to ${newRole}`);
}

export async function toggleUserSuspension(uid: string, isSuspended: boolean, actor: string) {
  await updateDoc(doc(db, 'users', uid), { isSuspended });
  await logAudit(actor, 'update', 'users', uid, `${isSuspended ? 'Suspended' : 'Reactivated'} user`);
}
