import { useState } from 'react';
import { 
  LayoutDashboard, 
  Palette, 
  Layers, 
  BookOpen, 
  Compass, 
  Video, 
  Headphones, 
  Quote, 
  Image, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Menu, 
  Users, 
  Clock, 
  Smartphone, 
  ShieldCheck, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { AdminDashboard } from './AdminDashboard';
import { BrandingSettingsAdmin } from './BrandingSettingsAdmin';
import { HomeBuilderAdmin } from './HomeBuilderAdmin';
import { WisdomAdmin } from './WisdomAdmin';
import { SadhnaAdmin } from './SadhnaAdmin';
import { VideosAdmin } from './VideosAdmin';
import { AudioAdmin } from './AudioAdmin';
import { QuotesAdmin } from './QuotesAdmin';
import { MediaLibraryAdmin } from './MediaLibraryAdmin';
import { CoursesAdmin } from './CoursesAdmin';
import { SessionsAdmin } from './SessionsAdmin';
import { PagesAdmin } from './PagesAdmin';
import { NavigationAdmin } from './NavigationAdmin';
import { UsersAdmin } from './UsersAdmin';
import { AuditLogAdmin } from './AuditLogAdmin';

interface AdminLayoutProps {
  onSwitchToUserApp: () => void;
}

export function AdminLayout({ onSwitchToUserApp }: AdminLayoutProps) {
  const { appSettings, branding, currentUser, isOwnerOrAdmin, logout } = useCms();
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Core' },
    { id: 'branding', label: 'Branding & Settings', icon: Palette, category: 'Platform' },
    { id: 'home_builder', label: 'Home Page CMS', icon: Layers, category: 'Platform' },
    { id: 'navigation', label: 'Navigation & Menus', icon: Menu, category: 'Platform' },
    { id: 'wisdom', label: 'Wisdom & E-Books', icon: BookOpen, category: 'Content' },
    { id: 'sadhna', label: 'Sadhna & Practices', icon: Compass, category: 'Content' },
    { id: 'courses', label: 'Courses & Curriculum', icon: GraduationCap, category: 'Content' },
    { id: 'sessions', label: 'Live Online Sessions', icon: Calendar, category: 'Content' },
    { id: 'videos', label: 'Video Library', icon: Video, category: 'Media' },
    { id: 'audio', label: 'Audio & Podcasts', icon: Headphones, category: 'Media' },
    { id: 'quotes', label: 'Quotes & Reflections', icon: Quote, category: 'Media' },
    { id: 'media', label: 'Media Library (Files)', icon: Image, category: 'Media' },
    { id: 'pages', label: 'Editable Pages', icon: FileText, category: 'System' },
    { id: 'users', label: 'User Management', icon: Users, category: 'System' },
    { id: 'audit', label: 'Audit Trail', icon: Clock, category: 'System' },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stone-950 text-stone-200">
      {/* Left Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-18'
        } shrink-0 bg-stone-900 border-r border-stone-800 flex flex-col transition-all duration-200 z-30`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 border-b border-stone-800 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div 
                  style={{ fontFamily: "'Cinzel', serif" }}
                  className="font-bold text-white text-xs truncate"
                >
                  {appSettings.appName}
                </div>
                <div className="text-[10px] text-amber-400 font-semibold tracking-wide">
                  Owner Admin CMS
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto text-amber-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'text-stone-400 hover:text-white hover:bg-stone-850'
                } ${!isSidebarOpen ? 'justify-center px-0' : ''}`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* User / Exit Footer */}
        <div className="p-3 border-t border-stone-800 bg-stone-900/50">
          <button
            onClick={onSwitchToUserApp}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-600/15 border border-amber-500/30 text-amber-300 hover:bg-amber-600/25 text-xs font-semibold transition-colors"
          >
            <Smartphone className="w-4 h-4" />
            {isSidebarOpen && <span>View Public App</span>}
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 flex flex-col overflow-hidden bg-stone-950">
        {/* Top Header */}
        <header className="h-16 px-6 bg-stone-900/80 backdrop-blur-md border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
              Admin Workspace
            </span>
            <span className="text-stone-600">/</span>
            <span className="text-sm font-semibold text-white capitalize">
              {navItems.find((n) => n.id === activeSection)?.label || activeSection}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{currentUser?.displayName || 'Owner'}</div>
              <div className="text-[10px] text-emerald-400 font-mono">Super Admin / Owner</div>
            </div>

            <button
              onClick={onSwitchToUserApp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>📱 Live User App</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeSection === 'dashboard' && <AdminDashboard onNavigate={(sec) => setActiveSection(sec)} />}
          {activeSection === 'branding' && <BrandingSettingsAdmin />}
          {activeSection === 'home_builder' && <HomeBuilderAdmin />}
          {activeSection === 'navigation' && <NavigationAdmin />}
          {activeSection === 'wisdom' && <WisdomAdmin />}
          {activeSection === 'sadhna' && <SadhnaAdmin />}
          {activeSection === 'videos' && <VideosAdmin />}
          {activeSection === 'audio' && <AudioAdmin />}
          {activeSection === 'quotes' && <QuotesAdmin />}
          {activeSection === 'media' && <MediaLibraryAdmin />}
          {activeSection === 'courses' && <CoursesAdmin />}
          {activeSection === 'sessions' && <SessionsAdmin />}
          {activeSection === 'pages' && <PagesAdmin />}
          {activeSection === 'users' && <UsersAdmin />}
          {activeSection === 'audit' && <AuditLogAdmin />}
        </div>
      </main>
    </div>
  );
}
