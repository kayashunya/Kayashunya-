import { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, 
  Menu, 
  Search, 
  Users, 
  User, 
  Settings, 
  HelpCircle, 
  SunMedium, 
  ShieldCheck,
  Shield
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface TopAppBarProps {
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onOpenCommunity: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
}

export function TopAppBar({ 
  onOpenDrawer,
  onOpenSearch,
  onOpenCommunity, 
  onOpenProfile, 
  onOpenSettings,
  onOpenAdmin,
}: TopAppBarProps) {
  const { appSettings, branding, isOwnerOrAdmin, loginAsOwner } = useCms();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-3.5 py-3 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Left: Hamburger Drawer Trigger + Brand Logo & Title */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenDrawer}
          className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {branding.logoUrl ? (
            <img 
              src={branding.logoUrl} 
              alt={appSettings.appName} 
              className="w-7 h-7 object-contain rounded-md" 
            />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 shadow-2xs">
              <SunMedium className="w-4 h-4" />
            </div>
          )}
          <span 
            style={{ fontFamily: "'Cinzel', serif" }}
            className="text-base font-bold tracking-wide text-stone-900 truncate max-w-[170px] sm:max-w-[240px]"
          >
            {appSettings.appName}
          </span>
        </div>
      </div>

      {/* Right-side Actions: Search & Three-Dot Overflow Menu */}
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenSearch}
          aria-label="Global Search"
          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Overflow Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="App Menu"
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-56 rounded-xl bg-white border border-stone-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCommunity();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium text-stone-700 hover:bg-amber-50/70 hover:text-amber-800 transition-colors"
              >
                <Users className="w-4 h-4 text-amber-700" />
                <span>Community & Circles</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium text-stone-700 hover:bg-amber-50/70 hover:text-amber-800 transition-colors"
              >
                <User className="w-4 h-4 text-amber-700" />
                <span>Profile & Bookmarks</span>
              </button>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Settings className="w-4 h-4 text-stone-400" />
                <span>Account & Settings</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-stone-400" />
                <span>Ashram Helpdesk</span>
              </button>

              {/* Owner Admin Shortcut */}
              <div className="my-1 border-t border-stone-100" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (!isOwnerOrAdmin) loginAsOwner();
                  onOpenAdmin();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-amber-800 bg-amber-50/60 hover:bg-amber-100/70 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Owner Admin Panel</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
