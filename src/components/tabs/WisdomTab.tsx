import { useState, useMemo } from 'react';
import { Search, BookOpen, Bookmark, BookmarkCheck, Share2, Sparkles } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { WisdomContent } from '../../types/cms';

interface WisdomTabProps {
  onOpenArticle: (article: WisdomContent) => void;
  onShare: (article: WisdomContent) => void;
  onToggleBookmark: (id: string) => void;
}

export function WisdomTab({
  onOpenArticle,
  onShare,
  onToggleBookmark,
}: WisdomTabProps) {
  const { wisdomList } = useCms();
  const [selectedSubTab, setSelectedSubTab] = useState<'books' | 'articles' | 'quotes'>('books');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const published = wisdomList.filter((w) => w.status === 'published');

  // Extract dynamic categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    published.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [published]);

  const filteredItems = useMemo(() => {
    return published.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubTab =
        selectedSubTab === 'books'
          ? item.type === 'book'
          : selectedSubTab === 'articles'
          ? item.type === 'article' || item.type === 'discourse'
          : item.type === 'sutra';

      return matchesCategory && matchesSearch && matchesSubTab;
    });
  }, [published, selectedCategory, searchQuery, selectedSubTab]);

  const booksCount = published.filter((i) => i.type === 'book').length;
  const articlesCount = published.filter((i) => i.type === 'article' || i.type === 'discourse').length;
  const quotesCount = published.filter((i) => i.type === 'sutra').length;

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="px-4 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
          The Library of Truth
        </span>
        <h2 
          style={{ fontFamily: "'Cinzel', serif" }}
          className="text-xl font-bold text-stone-900"
        >
          Wisdom Catalog
        </h2>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, discourses, Upanishads..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700/50 focus:border-amber-700 shadow-2xs"
          />
        </div>

        {/* Category Horizontal Filter Buttons */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-colors ${
                  isSelected
                    ? 'bg-amber-800 text-white font-semibold shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Segmented Sub Tabs */}
        <div className="mt-4 grid grid-cols-3 gap-1 p-1 bg-stone-200/60 rounded-xl">
          <button
            onClick={() => setSelectedSubTab('books')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedSubTab === 'books'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            E-Books ({booksCount})
          </button>
          <button
            onClick={() => setSelectedSubTab('articles')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedSubTab === 'articles'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Articles ({articlesCount})
          </button>
          <button
            onClick={() => setSelectedSubTab('quotes')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedSubTab === 'quotes'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sutras ({quotesCount})
          </button>
        </div>
      </div>

      {/* Content Feed */}
      <div className="px-4 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6">
            <Sparkles className="w-8 h-8 text-amber-700/40 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">No wisdom entries found</p>
            <p className="text-xs text-stone-500 mt-1">
              Try adjusting your search query or selecting "All" categories.
            </p>
          </div>
        ) : selectedSubTab === 'books' ? (
          filteredItems.map((book, idx) => (
            <div
              key={book.id}
              className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-200 transition-all flex gap-3.5"
            >
              <div 
                className={`w-20 h-28 shrink-0 rounded-lg shadow-sm p-2.5 flex flex-col justify-between text-white ${
                  idx === 0 
                    ? 'bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950' 
                    : 'bg-gradient-to-br from-stone-800 via-stone-900 to-black'
                }`}
              >
                <div className="flex items-center justify-between opacity-80">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-bold tracking-widest uppercase">Kayashunya</span>
                </div>
                <div 
                  style={{ fontFamily: "'Cinzel', serif" }}
                  className="text-[10px] font-bold leading-tight line-clamp-3"
                >
                  {book.title}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold uppercase tracking-wider text-amber-800">
                      {book.category}
                    </span>
                    <button
                      onClick={() => onToggleBookmark(book.id)}
                      className="text-stone-400 hover:text-amber-700 transition-colors"
                      aria-label="Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <h3
                    style={{ fontFamily: "'Cinzel', serif" }}
                    onClick={() => onOpenArticle(book)}
                    className="mt-1 text-sm font-bold text-stone-900 hover:text-amber-800 cursor-pointer transition-colors leading-snug line-clamp-2"
                  >
                    {book.title}
                  </h3>

                  <p className="mt-1 text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {book.subtitle}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-[11px] text-stone-400">
                    {book.readingTimeMinutes} min read
                  </span>

                  <button
                    onClick={() => onOpenArticle(book)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-2xs transition-colors"
                  >
                    Read E-Book
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-200 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[11px] uppercase tracking-wider text-amber-800">
                  {item.category} · {item.readingTimeMinutes} min read
                </span>
                <button
                  onClick={() => onToggleBookmark(item.id)}
                  className="text-stone-400 hover:text-amber-700 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div onClick={() => onOpenArticle(item)} className="cursor-pointer group mt-2">
                <h3 
                  style={{ fontFamily: "'Cinzel', serif" }}
                  className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug"
                >
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              {item.quoteHighlight && (
                <div className="mt-2.5 p-3 rounded-xl bg-amber-50/70 border-l-2 border-amber-600">
                  <p 
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                    className="text-xs italic text-amber-950 leading-relaxed"
                  >
                    “{item.quoteHighlight}”
                  </p>
                </div>
              )}

              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400">{item.author}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShare(item)}
                    className="flex items-center gap-1 text-amber-800 hover:text-amber-900 font-semibold px-2 py-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => onOpenArticle(item)}
                    className="px-3 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium"
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
