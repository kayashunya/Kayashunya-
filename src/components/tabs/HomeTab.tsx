import { 
  Flame, 
  BookOpen, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Play, 
  ArrowRight, 
  Calendar, 
  GraduationCap, 
  Video, 
  Clock, 
  Quote 
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { WisdomContent } from '../../types/cms';
import { PWAInstallButton } from '../PWAInstallButton';

interface HomeTabProps {
  streakDays: number;
  onOpenWisdom: (wisdom: WisdomContent) => void;
  onShareWisdom: (wisdom: WisdomContent) => void;
  onShareQuote: (quote: string, author: string) => void;
  onToggleBookmark: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenPage: (slug: string) => void;
}

export function HomeTab({
  streakDays,
  onOpenWisdom,
  onShareWisdom,
  onShareQuote,
  onToggleBookmark,
  onNavigateTab,
  onOpenPage,
}: HomeTabProps) {
  const { 
    appSettings, 
    homeSections, 
    wisdomList, 
    sadhnaList, 
    sessionList, 
    courseList, 
    videoList, 
    quoteList 
  } = useCms();

  const enabledSections = [...homeSections]
    .filter((s) => s.isEnabled)
    .sort((a, b) => a.order - b.order);

  const publishedWisdom = wisdomList.filter((w) => w.status === 'published');
  const publishedSadhna = sadhnaList.filter((s) => s.status === 'published');
  const upcomingSessions = sessionList.filter((s) => s.status === 'upcoming');
  const publishedCourses = courseList.filter((c) => c.status === 'published');
  const publishedVideos = videoList.filter((v) => v.status === 'published');
  const publishedQuotes = quoteList.filter((q) => q.status === 'published');

  const featuredWisdom = publishedWisdom.find((w) => w.isFeatured) || publishedWisdom[0];

  return (
    <div className="space-y-4 pb-12">
      {/* Dynamic Greeting Bar */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
            {appSettings.tagline || 'Pranam & Peace'}
          </span>
          <h2 
            style={{ fontFamily: "'Cinzel', serif" }}
            className="text-xl font-bold text-stone-900"
          >
            Today's Awakening
          </h2>
        </div>

        <button
          onClick={() => onNavigateTab('sadhna')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors shadow-2xs"
        >
          <Flame className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
          <span>{streakDays} Day Streak</span>
        </button>
      </div>

      {/* In-App PWA Install Banner */}
      <PWAInstallButton variant="banner" />

      {/* Render CMS Sections In Configured Order */}
      {enabledSections.map((section) => {
        // SECTION TYPE: BANNER / FEATURED SUTRA
        if (section.type === 'banner' || section.type === 'featured') {
          return (
            <div key={section.id} className="px-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white p-5 shadow-sm border border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    {section.title}
                  </span>
                </div>

                <p 
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
                  className="mt-3 text-stone-100 text-base leading-relaxed italic"
                >
                  “{featuredWisdom?.quoteHighlight || featuredWisdom?.subtitle || 'Silence is not an absence, it is the full presence of Truth.'}”
                </p>

                <p className="mt-2 text-xs text-stone-400">
                  — {featuredWisdom?.author || 'Acharya Kayashunya'} · {featuredWisdom?.title || 'Contemplation'}
                </p>

                <div className="mt-4 flex items-center gap-2.5 pt-2 border-t border-stone-800">
                  {featuredWisdom && (
                    <button
                      onClick={() => onOpenWisdom(featuredWisdom)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{section.buttonLabel || 'Read Discourse'}</span>
                    </button>
                  )}

                  {featuredWisdom && (
                    <button
                      onClick={() => onShareWisdom(featuredWisdom)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-medium transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>1-Tap WhatsApp Share</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }

        // SECTION TYPE: CONTINUE READING / SADHNA
        if (section.type === 'continue') {
          return (
            <div key={section.id} className="px-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onNavigateTab('sadhna')}
                    className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center hover:bg-amber-800 transition-transform active:scale-95 shadow-xs"
                  >
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </button>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      {section.title}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {section.subtitle || '15 min Morning Dhyana meditation sitting'}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigateTab('sadhna')}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-0.5"
                >
                  <span>Begin</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        }

        // SECTION TYPE: TODAY'S WISDOM
        if (section.type === 'todays_wisdom') {
          const itemsToShow = publishedWisdom.slice(0, section.displayLimit || 3);
          return (
            <div key={section.id} className="px-4 space-y-3">
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 
                    style={{ fontFamily: "'Cinzel', serif" }}
                    className="text-sm font-bold text-stone-900 uppercase tracking-wider"
                  >
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-[11px] text-stone-500">{section.subtitle}</p>
                  )}
                </div>
                <button
                  onClick={() => onNavigateTab('wisdom')}
                  className="text-xs font-medium text-amber-800 hover:underline"
                >
                  {section.buttonLabel || 'View All'}
                </button>
              </div>

              {itemsToShow.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-stone-200 shadow-2xs p-4 hover:border-amber-200 transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-amber-800">
                      {item.category} · {item.readingTimeMinutes} min read
                    </span>
                    <button
                      onClick={() => onToggleBookmark(item.id)}
                      className="text-stone-400 hover:text-amber-700 transition-colors p-1"
                    >
                      {item.isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-700 fill-amber-700" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div 
                    onClick={() => onOpenWisdom(item)}
                    className="mt-2 cursor-pointer group"
                  >
                    <h4 
                      style={{ fontFamily: "'Cinzel', serif" }}
                      className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug"
                    >
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {item.quoteHighlight && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50/70 border-l-2 border-amber-600">
                      <p 
                        style={{ fontFamily: "'Lora', Georgia, serif" }}
                        className="text-xs italic text-amber-950 leading-relaxed"
                      >
                        “{item.quoteHighlight}”
                      </p>
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400">{item.author}</span>
                    <button
                      onClick={() => onShareWisdom(item)}
                      className="flex items-center gap-1 text-amber-800 hover:text-amber-900 font-semibold px-2 py-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        // SECTION TYPE: TODAY'S SADHNA
        if (section.type === 'todays_sadhna') {
          const itemsToShow = publishedSadhna.slice(0, section.displayLimit || 3);
          return (
            <div key={section.id} className="px-4 space-y-2.5">
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 
                    style={{ fontFamily: "'Cinzel', serif" }}
                    className="text-sm font-bold text-stone-900 uppercase tracking-wider"
                  >
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-[11px] text-stone-500">{section.subtitle}</p>
                  )}
                </div>
                <button
                  onClick={() => onNavigateTab('sadhna')}
                  className="text-xs font-medium text-amber-800 hover:underline"
                >
                  {section.buttonLabel || 'Sadhna Hub'}
                </button>
              </div>

              {itemsToShow.map((act) => (
                <div
                  key={act.id}
                  onClick={() => onNavigateTab('sadhna')}
                  className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs hover:border-amber-200 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-800 font-mono">
                      {act.category} · {act.timeOfDay}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 mt-0.5">{act.title}</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{act.description}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-xs font-bold text-amber-800 tabular-nums">
                      {act.durationMinutes}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        // SECTION TYPE: UPCOMING SESSIONS
        if (section.type === 'upcoming_sessions') {
          const itemsToShow = upcomingSessions.slice(0, section.displayLimit || 2);
          if (itemsToShow.length === 0) return null;
          return (
            <div key={section.id} className="px-4 space-y-2.5">
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 
                    style={{ fontFamily: "'Cinzel', serif" }}
                    className="text-sm font-bold text-stone-900 uppercase tracking-wider"
                  >
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-[11px] text-stone-500">{section.subtitle}</p>
                  )}
                </div>
              </div>

              {itemsToShow.map((sess) => (
                <div
                  key={sess.id}
                  className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs text-amber-800 font-semibold font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{sess.scheduledDate} · {sess.scheduledTime}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-[10px]">
                      Live Satsang
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mt-2">{sess.title}</h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">{sess.description}</p>
                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">{sess.instructor}</span>
                    <a
                      href={sess.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold"
                    >
                      Join Session
                    </a>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        // SECTION TYPE: COURSES
        if (section.type === 'courses') {
          const itemsToShow = publishedCourses.slice(0, section.displayLimit || 2);
          if (itemsToShow.length === 0) return null;
          return (
            <div key={section.id} className="px-4 space-y-2.5">
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 
                    style={{ fontFamily: "'Cinzel', serif" }}
                    className="text-sm font-bold text-stone-900 uppercase tracking-wider"
                  >
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-[11px] text-stone-500">{section.subtitle}</p>
                  )}
                </div>
              </div>

              {itemsToShow.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-800 font-mono">
                      {c.category} · {c.durationHours} Hours
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 mt-0.5">{c.title}</h4>
                    <p className="text-xs text-stone-500 line-clamp-1">{c.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-800 shrink-0 ml-3">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        // SECTION TYPE: QUOTES
        if (section.type === 'quotes') {
          const itemsToShow = publishedQuotes.slice(0, section.displayLimit || 2);
          if (itemsToShow.length === 0) return null;
          return (
            <div key={section.id} className="px-4 space-y-2.5">
              <h3 
                style={{ fontFamily: "'Cinzel', serif" }}
                className="text-sm font-bold text-stone-900 uppercase tracking-wider"
              >
                {section.title}
              </h3>
              {itemsToShow.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-stone-900"
                >
                  <p 
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                    className="text-xs italic leading-relaxed text-amber-950"
                  >
                    “{q.quote}”
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-amber-200/50 flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-900">— {q.author}</span>
                    <button
                      onClick={() => onShareQuote(q.quote, q.author)}
                      className="flex items-center gap-1 text-amber-800 font-semibold text-xs hover:underline"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
