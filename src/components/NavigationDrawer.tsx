import { 
  X, 
  Home, 
  BookOpen, 
  Compass, 
  GraduationCap, 
  Calendar, 
  Video, 
  Headphones, 
  Quote, 
  Info, 
  Sparkles, 
  Waypoints, 
  Clock, 
  Mail, 
  ShieldCheck,
  ExternalLink 
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (destination: string) => void;
  onOpenAdmin: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Home,
  BookOpen,
  Compass,
  GraduationCap,
  Calendar,
  PlayCircle: Video,
  Video,
  Headphones,
  Quote,
  Info,
  Sparkles,
  Waypoints,
  Clock,
  Mail,
};

export function NavigationDrawer({ isOpen, onClose, onNavigate, onOpenAdmin }: NavigationDrawerProps) {
  const { appSettings, branding, navigationMenu, isOwnerOrAdmin } = useCms();

  if (!isOpen) return null;

  const enabledItems = navigationMenu
    .filter((item) => item.isEnabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in" 
      />

      {/* Drawer Panel */}
      <div className="relative w-72 max-w-[80vw] h-full bg-[#FAF8F5] border-r border-stone-200 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200/80 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            {branding.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                K
              </div>
            )}
            <span 
              style={{ fontFamily: "'Cinzel', serif" }}
              className="font-bold text-stone-900 text-sm tracking-wide"
            >
              {appSettings.appName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {enabledItems.map((item) => {
            const Icon = iconMap[item.iconName] || Compass;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onClose();
                  onNavigate(item.destination);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-stone-700 hover:text-amber-800 hover:bg-amber-50/70 transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Owner Admin Shortcut in Drawer */}
        {isOwnerOrAdmin && (
          <div className="p-3 border-t border-stone-200 bg-white">
            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-600 text-white text-xs font-semibold shadow-xs hover:bg-amber-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Owner Admin Panel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
