/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Smartphone, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Maximize2, 
  Minimize2, 
  SunMedium,
  Download,
  Share2
} from 'lucide-react';
import { CmsProvider, useCms } from './context/CmsContext';
import type { WisdomContent, EditablePage } from './types/cms';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeTab } from './components/tabs/HomeTab';
import { WisdomTab } from './components/tabs/WisdomTab';
import { SadhanaTab } from './components/tabs/SadhanaTab';
import { AccountTab } from './components/tabs/AccountTab';
import { ReaderView } from './components/ReaderView';
import { PageView } from './components/PageView';
import { ShareModal } from './components/modals/ShareModal';
import { CommunityModal } from './components/modals/CommunityModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { SearchModal } from './components/modals/SearchModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { AdminLayout } from './components/admin/AdminLayout';
import { FlutterStudio } from './components/FlutterStudio';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

function MainAppContent() {
  const { 
    appSettings, 
    branding, 
    wisdomList, 
    editablePages, 
    isOwnerOrAdmin,
    loginAsOwner
  } = useCms();

  // Master View: 'mobile_preview' | 'admin_panel' | 'flutter_studio' | 'docs'
  const [activeView, setActiveView] = useState<'mobile_preview' | 'admin_panel' | 'flutter_studio' | 'docs'>('mobile_preview');

  // Mobile Simulator Frame: 'phone' | 'full'
  const [frameMode, setFrameMode] = useState<'phone' | 'full'>('phone');

  // Mobile App Navigation
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeWisdomForReader, setActiveWisdomForReader] = useState<WisdomContent | null>(null);
  const [activePageForView, setActivePageForView] = useState<EditablePage | null>(null);

  // Modals & Drawers
  const [shareWisdomItem, setShareWisdomItem] = useState<WisdomContent | null>(null);
  const [customQuoteToShare, setCustomQuoteToShare] = useState<{ quote: string; author: string } | null>(null);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Bookmarks local toggle helper
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({
    wisdom_1: true,
    wisdom_3: true,
  });

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDrawerNavigate = (destination: string) => {
    if (destination.startsWith('page_')) {
      const slug = destination.replace('page_', '');
      const found = editablePages.find((p) => p.slug === slug || p.id === destination);
      if (found) {
        setActivePageForView(found);
        setActiveWisdomForReader(null);
        return;
      }
    }
    // Tab destinations
    if (destination === 'home' || destination === 'wisdom' || destination === 'sadhna' || destination === 'account') {
      setCurrentTab(destination);
      setActivePageForView(null);
      setActiveWisdomForReader(null);
    }
  };

  const bookmarkedArticles = wisdomList.filter((w) => bookmarkedIds[w.id]);

  // If viewing the Admin Panel
  if (activeView === 'admin_panel') {
    return (
      <AdminLayout
        onSwitchToUserApp={() => setActiveView('mobile_preview')}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-stone-900 text-stone-100 font-sans">
      {/* Top Workspace Header (Mode Switcher) */}
      <header className="h-14 bg-stone-950 border-b border-stone-800 px-4 md:px-6 flex items-center justify-between shrink-0 z-40">
        {/* Brand Lockup (reads dynamic appName from Firestore) */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-xs">
            <SunMedium className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span 
                style={{ fontFamily: "'Cinzel', serif" }}
                className="font-bold text-white tracking-wider text-base"
              >
                {appSettings.appName}
              </span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Firestore CMS Connected
              </span>
            </div>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-900 border border-stone-800">
          <button
            onClick={() => setActiveView('mobile_preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'mobile_preview'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>📱 User App</span>
          </button>

          <button
            onClick={() => {
              if (!isOwnerOrAdmin) loginAsOwner();
              setActiveView('admin_panel');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 hover:text-amber-300 hover:bg-stone-800 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>🛡️ Owner Admin Panel</span>
          </button>

          <button
            onClick={() => setActiveView('flutter_studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'flutter_studio'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Flutter Code</span>
          </button>

          <button
            onClick={() => setActiveView('docs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'docs'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Specs</span>
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          {activeView === 'mobile_preview' && (
            <button
              onClick={() => setFrameMode(frameMode === 'phone' ? 'full' : 'phone')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-xs font-medium hover:text-white hover:bg-stone-800 transition-colors"
              title={frameMode === 'phone' ? 'Switch to Full Screen View' : 'Switch to Smartphone Canvas'}
            >
              {frameMode === 'phone' ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Expanded</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Phone Frame</span>
                </>
              )}
            </button>
          )}

          <PWAInstallButton variant="header" />

          <button
            onClick={() => {
              if (!isOwnerOrAdmin) loginAsOwner();
              setActiveView('admin_panel');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-600/30 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Manage App</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-hidden relative">
        {/* VIEW: Mobile Preview */}
        {activeView === 'mobile_preview' && (
          <div className="h-full w-full flex items-center justify-center p-0 md:p-4 bg-stone-950 overflow-y-auto">
            <div
              className={`transition-all duration-200 flex flex-col overflow-hidden bg-[#FAF8F5] text-stone-900 ${
                frameMode === 'phone'
                  ? 'w-full max-w-[420px] h-[92vh] max-h-[860px] rounded-[36px] shadow-2xl border-[8px] border-stone-800 relative'
                  : 'w-full h-full'
              }`}
            >
              {/* Phone Speaker Notch */}
              {frameMode === 'phone' && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 pointer-events-none">
                  <div className="w-16 h-4 bg-stone-800 rounded-full" />
                </div>
              )}

              {/* Reader View */}
              {activeWisdomForReader ? (
                <ReaderView
                  article={activeWisdomForReader}
                  onBack={() => setActiveWisdomForReader(null)}
                  onShare={(wisdom) => setShareWisdomItem(wisdom)}
                  onToggleBookmark={handleToggleBookmark}
                />
              ) : activePageForView ? (
                /* Editable Page View (About, Method, Last Hour, Contact, etc.) */
                <PageView
                  page={activePageForView}
                  onBack={() => setActivePageForView(null)}
                />
              ) : (
                /* Main Application Scaffold */
                <div className="flex flex-col h-full overflow-hidden">
                  {/* Top App Bar with Hamburger Drawer & Search */}
                  <TopAppBar
                    onOpenDrawer={() => setIsDrawerOpen(true)}
                    onOpenSearch={() => setIsSearchOpen(true)}
                    onOpenCommunity={() => setIsCommunityOpen(true)}
                    onOpenProfile={() => setIsProfileOpen(true)}
                    onOpenSettings={() => setCurrentTab('account')}
                    onOpenAdmin={() => {
                      if (!isOwnerOrAdmin) loginAsOwner();
                      setActiveView('admin_panel');
                    }}
                  />

                  {/* Scrollable Tab Body */}
                  <div className="flex-1 overflow-y-auto">
                    {currentTab === 'home' && (
                      <HomeTab
                        streakDays={12}
                        onOpenWisdom={(w) => setActiveWisdomForReader(w)}
                        onShareWisdom={(w) => setShareWisdomItem(w)}
                        onShareQuote={(q, a) => setCustomQuoteToShare({ quote: q, author: a })}
                        onToggleBookmark={handleToggleBookmark}
                        onNavigateTab={(tab) => setCurrentTab(tab)}
                        onOpenPage={(slug) => {
                          const found = editablePages.find((p) => p.slug === slug);
                          if (found) setActivePageForView(found);
                        }}
                      />
                    )}

                    {currentTab === 'wisdom' && (
                      <WisdomTab
                        onOpenArticle={(w) => setActiveWisdomForReader(w)}
                        onShare={(w) => setShareWisdomItem(w)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    )}

                    {currentTab === 'sadhna' && (
                      <SadhanaTab streakDays={12} />
                    )}

                    {currentTab === 'account' && (
                      <AccountTab
                        onOpenAdmin={() => {
                          if (!isOwnerOrAdmin) loginAsOwner();
                          setActiveView('admin_panel');
                        }}
                      />
                    )}
                  </div>

                  {/* Strictly 4 Tabs Bottom Navigation Bar (Dynamic from CMS) */}
                  <BottomNavBar
                    currentTab={currentTab}
                    onTabChange={(tab) => {
                      setCurrentTab(tab);
                      setActivePageForView(null);
                      setActiveWisdomForReader(null);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: Flutter Studio */}
        {activeView === 'flutter_studio' && <FlutterStudio />}

        {/* VIEW: Specs */}
        {activeView === 'docs' && <ArchitectureDocs />}
      </main>

      {/* Overlays / Modals */}
      <ShareModal
        item={shareWisdomItem}
        customQuote={customQuoteToShare}
        onClose={() => {
          setShareWisdomItem(null);
          setCustomQuoteToShare(null);
        }}
      />
      {isCommunityOpen && <CommunityModal onClose={() => setIsCommunityOpen(false)} />}
      {isProfileOpen && (
        <ProfileModal
          bookmarkedArticles={bookmarkedArticles}
          onOpenArticle={(w) => {
            setIsProfileOpen(false);
            setActiveWisdomForReader(w);
          }}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectWisdom={(id) => {
            const found = wisdomList.find((w) => w.id === id);
            if (found) setActiveWisdomForReader(found);
          }}
          onSelectPage={(slug) => {
            const found = editablePages.find((p) => p.slug === slug);
            if (found) setActivePageForView(found);
          }}
        />
      )}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleDrawerNavigate}
        onOpenAdmin={() => {
          if (!isOwnerOrAdmin) loginAsOwner();
          setActiveView('admin_panel');
        }}
      />
      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainAppContent />
    </CmsProvider>
  );
}
