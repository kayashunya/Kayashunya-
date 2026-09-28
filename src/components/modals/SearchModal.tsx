import { useState } from 'react';
import { Search, X, BookOpen, Compass, Video, Headphones, Quote, GraduationCap, Calendar, FileText, ArrowRight } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

interface SearchModalProps {
  onClose: () => void;
  onSelectWisdom: (id: string) => void;
  onSelectPage: (slug: string) => void;
}

export function SearchModal({ onClose, onSelectWisdom, onSelectPage }: SearchModalProps) {
  const { searchAll } = useCms();
  const [query, setQuery] = useState('');

  const results = searchAll(query);
  const totalResults =
    results.wisdom.length +
    results.sadhna.length +
    results.videos.length +
    results.audio.length +
    results.quotes.length +
    results.courses.length +
    results.sessions.length +
    results.pages.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-stone-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-700 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all wisdom, sadhna, courses, videos..."
            className="flex-1 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-stone-400 hover:text-stone-700">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-500 hover:bg-stone-100"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="text-center py-8 text-xs text-stone-400">
              Type keywords like "fear", "gita", "stillness", "meditation", or "breath"...
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-xs text-stone-500">
              No content found matching "{query}".
            </div>
          ) : (
            <>
              {/* Wisdom Results */}
              {results.wisdom.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Wisdom & Discourses ({results.wisdom.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.wisdom.map((w) => (
                      <div
                        key={w.id}
                        onClick={() => {
                          onClose();
                          onSelectWisdom(w.id);
                        }}
                        className="p-2.5 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-bold text-stone-900">{w.title}</div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{w.subtitle}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sadhna Results */}
              {results.sadhna.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Sadhna Practices ({results.sadhna.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.sadhna.map((s) => (
                      <div
                        key={s.id}
                        className="p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                      >
                        <div className="text-xs font-bold text-stone-900">{s.title}</div>
                        <div className="text-[11px] text-stone-500">{s.durationMinutes} mins · {s.difficulty}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results */}
              {results.courses.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Master Courses ({results.courses.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.courses.map((c) => (
                      <div key={c.id} className="p-2.5 rounded-xl border border-stone-200 bg-stone-50">
                        <div className="text-xs font-bold text-stone-900">{c.title}</div>
                        <div className="text-[11px] text-stone-500">{c.instructor}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages Results */}
              {results.pages.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Pages & Lineage ({results.pages.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.pages.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectPage(p.slug);
                        }}
                        className="p-2.5 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-stone-900">{p.title}</div>
                          <div className="text-[11px] text-stone-500">{p.metaDescription}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
