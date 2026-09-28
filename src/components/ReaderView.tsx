import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Type, Share2, Bookmark, BookmarkCheck, Check } from 'lucide-react';
import type { WisdomContent } from '../types/cms';
import { useCms } from '../context/CmsContext';

interface ReaderViewProps {
  article: WisdomContent;
  onBack: () => void;
  onShare: (article: WisdomContent) => void;
  onToggleBookmark: (id: string) => void;
}

export function ReaderView({ article, onBack, onShare, onToggleBookmark }: ReaderViewProps) {
  const { appSettings } = useCms();
  const [fontSize, setFontSize] = useState<number>(17);
  const [theme, setTheme] = useState<'sepia' | 'light' | 'dark'>('sepia');
  const [showSettings, setShowSettings] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const total = scrollHeight - clientHeight;
        if (total > 0) {
          setScrollProgress((scrollTop / total) * 100);
        }
      }
    };
    const el = contentRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Theme styling definitions
  const themeStyles = {
    sepia: {
      bg: 'bg-[#F5EDE0]',
      text: 'text-[#382E25]',
      muted: 'text-[#7A6C60]',
      border: 'border-[#E3D7C6]',
      card: 'bg-[#EFE5D5]',
      indicator: 'bg-amber-700',
    },
    light: {
      bg: 'bg-white',
      text: 'text-stone-900',
      muted: 'text-stone-500',
      border: 'border-stone-200',
      card: 'bg-stone-50',
      indicator: 'bg-amber-700',
    },
    dark: {
      bg: 'bg-[#18181B]',
      text: 'text-stone-100',
      muted: 'text-stone-400',
      border: 'border-stone-800',
      card: 'bg-stone-900',
      indicator: 'bg-amber-500',
    },
  }[theme];

  return (
    <div className={`flex flex-col h-full ${themeStyles.bg} ${themeStyles.text} transition-colors duration-200`}>
      {/* Top Header */}
      <header className={`sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b ${themeStyles.border} backdrop-blur-md bg-opacity-95`}>
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className={`p-1.5 rounded-full hover:bg-black/5 transition-colors`}
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span 
            style={{ fontFamily: "'Cinzel', serif" }}
            className="text-xs font-semibold uppercase tracking-wider"
          >
            {appSettings.appName} E-Reader
          </span>
        </div>

        <div className="flex items-center gap-1 relative">
          {/* Font & Appearance toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Reader Appearance"
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <Type className="w-5 h-5" />
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(article.id)}
            aria-label="Bookmark"
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            {article.isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-amber-700 fill-amber-700" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>

          {/* Share */}
          <button
            onClick={() => onShare(article)}
            aria-label="Share Quote"
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Appearance Settings Popover */}
          {showSettings && (
            <div className={`absolute right-0 top-12 w-64 p-4 rounded-xl border ${themeStyles.border} ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-stone-900'} shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100`}>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                Text Size
              </div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-bold hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
                >
                  A-
                </button>
                <span className="text-xs font-medium tabular-nums">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(26, fontSize + 1))}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-sm font-bold hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
                >
                  A+
                </button>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Color Mode
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sepia', label: 'Sepia', bg: 'bg-[#F5EDE0]', text: 'text-[#382E25]' },
                  { id: 'light', label: 'White', bg: 'bg-white', text: 'text-stone-900' },
                  { id: 'dark', label: 'Dark', bg: 'bg-[#18181B]', text: 'text-stone-100' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setTheme(m.id as 'sepia' | 'light' | 'dark')}
                    className={`py-2 px-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-1 ${m.bg} ${m.text} ${
                      theme === m.id ? 'border-amber-700 ring-2 ring-amber-700/20' : 'border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <span>{m.label}</span>
                    {theme === m.id && <Check className="w-3 h-3 text-amber-700" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Reading Progress Line */}
      <div className="h-0.5 w-full bg-stone-200/30 overflow-hidden">
        <div
          className={`h-full ${themeStyles.indicator} transition-all duration-150`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Scrollable Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <span>{article.category}</span>
            <span>·</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>

          {/* Title */}
          <h1
            style={{ 
              fontFamily: "'Cinzel', serif", 
              fontSize: `${fontSize + 8}px`,
              lineHeight: 1.25 
            }}
            className="mt-3 font-bold tracking-tight"
          >
            {article.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{ fontSize: `${fontSize - 1}px` }}
            className={`mt-2 ${themeStyles.muted} leading-relaxed`}
          >
            {article.subtitle}
          </p>

          <div className={`my-6 border-b ${themeStyles.border}`} />

          {/* Article / Book Body Text in Lora */}
          <div
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: `${fontSize}px`,
              lineHeight: 1.85,
            }}
            className="space-y-6"
          >
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {/* End of chapter ornament */}
          <div className="mt-14 pt-8 border-t border-dashed border-stone-300 dark:border-stone-800 flex flex-col items-center justify-center text-center">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-700 mb-3" />
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-800">
              End of Selection
            </p>
            <p className={`mt-1 text-xs ${themeStyles.muted}`}>
              — {article.author} · Kayasun Publications
            </p>

            <button
              onClick={() => onShare(article)}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Key Quote with Seekers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
