import { X, Bookmark, BookOpen, Clock, Flame } from 'lucide-react';
import type { WisdomContent } from '../../types/cms';
import { useCms } from '../../context/CmsContext';

interface ProfileModalProps {
  bookmarkedArticles: WisdomContent[];
  onOpenArticle: (article: WisdomContent) => void;
  onClose: () => void;
}

export function ProfileModal({ bookmarkedArticles, onOpenArticle, onClose }: ProfileModalProps) {
  const { currentUser, appSettings } = useCms();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h3 
            style={{ fontFamily: "'Cinzel', serif" }}
            className="font-bold text-stone-900 text-sm"
          >
            Seeker Profile & Saved Reads
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 space-y-4">
          {/* User info */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold text-base">
              {currentUser ? currentUser.displayName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                {currentUser ? currentUser.displayName : 'Spiritual Seeker'}
              </h4>
              <p className="text-xs text-stone-500">
                {currentUser ? currentUser.email : 'seeker@kayashunya.org'}
              </p>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-amber-800 font-semibold font-mono">
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-700" />
                  <span>{currentUser ? currentUser.streakDays : 12}d streak</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-700" />
                  <span>{currentUser ? currentUser.totalHoursRead : 42}h read</span>
                </span>
              </div>
            </div>
          </div>

          {/* Saved Reading List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Saved Wisdom Reads ({bookmarkedArticles.length})
              </span>
            </div>

            {bookmarkedArticles.length === 0 ? (
              <div className="text-center py-8 rounded-xl bg-stone-50 border border-stone-200 p-4">
                <Bookmark className="w-6 h-6 text-stone-300 mx-auto mb-1.5" />
                <p className="text-xs text-stone-500">
                  No bookmarks saved yet. Tap the bookmark icon on any card to save it for quiet contemplation.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarkedArticles.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onOpenArticle(item);
                    }}
                    className="p-3 rounded-xl border border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="pr-3">
                      <span className="text-[10px] font-bold uppercase text-amber-800">
                        {item.category}
                      </span>
                      <h5 
                        style={{ fontFamily: "'Cinzel', serif" }}
                        className="text-xs font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1"
                      >
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-stone-400">
                        {item.readingTimeMinutes} min read · {item.author}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-amber-800 group-hover:text-white transition-colors shrink-0">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
