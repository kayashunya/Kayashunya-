import { Home, BookOpen, Compass, User, Video, Calendar, GraduationCap } from 'lucide-react';
import type { TabType } from '../types';
import { useCms } from '../context/CmsContext';

interface BottomNavBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const iconMapping: Record<string, React.ElementType> = {
  Home,
  BookOpen,
  Compass,
  User,
  Video,
  Calendar,
  GraduationCap,
};

export function BottomNavBar({ currentTab, onTabChange }: BottomNavBarProps) {
  const { bottomNavItems } = useCms();

  const enabledTabs = bottomNavItems
    .filter((t) => t.isEnabled)
    .sort((a, b) => a.order - b.order);

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 safe-area-pb">
      <div 
        className="grid items-center h-16"
        style={{ gridTemplateColumns: `repeat(${enabledTabs.length || 4}, minmax(0, 1fr))` }}
      >
        {enabledTabs.map((tab) => {
          const Icon = iconMapping[tab.iconName] || iconMapping[tab.key] || Compass;
          const isActive = currentTab === tab.destination || currentTab === tab.key;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.destination || tab.key)}
              className={`flex flex-col items-center justify-center h-full transition-colors ${
                isActive ? 'text-amber-800' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-700 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium uppercase tracking-wider ${isActive ? 'font-bold text-amber-800' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
