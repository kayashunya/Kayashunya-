import { ArrowLeft, Share2, Clock, Calendar } from 'lucide-react';
import type { EditablePage } from '../types/cms';

interface PageViewProps {
  page: EditablePage;
  onBack: () => void;
}

export function PageView({ page, onBack }: PageViewProps) {
  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] text-stone-900 overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span 
          style={{ fontFamily: "'Cinzel', serif" }}
          className="text-xs font-bold uppercase tracking-wider text-amber-800"
        >
          {page.title}
        </span>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: page.title, text: page.metaDescription, url: window.location.href });
            }
          }}
          className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </header>

      {/* Page Body */}
      <div className="flex-1 max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>Last Updated: {new Date(page.updatedAt).toLocaleDateString()}</span>
        </div>

        <h1 
          style={{ fontFamily: "'Cinzel', serif" }}
          className="text-2xl md:text-3xl font-bold text-stone-900 mt-2 tracking-tight"
        >
          {page.title}
        </h1>

        {page.metaDescription && (
          <p className="mt-2 text-sm text-stone-600 italic border-l-2 border-amber-600 pl-3 py-0.5">
            {page.metaDescription}
          </p>
        )}

        <div className="my-6 border-b border-stone-200" />

        {/* Prose Content */}
        <div 
          style={{ fontFamily: "'Lora', Georgia, serif" }}
          className="prose prose-stone max-w-none text-stone-800 leading-relaxed space-y-4 text-[15px]"
        >
          {page.content.split('\n\n').map((block, idx) => {
            if (block.startsWith('# ')) {
              return (
                <h1 key={idx} style={{ fontFamily: "'Cinzel', serif" }} className="text-xl font-bold text-stone-900 mt-6 mb-2">
                  {block.replace('# ', '')}
                </h1>
              );
            }
            if (block.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-base font-bold text-stone-900 mt-4 mb-1">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            if (block.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1 my-2">
                  {block.split('\n').map((line, i) => (
                    <li key={i}>{line.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>

        <div className="mt-12 pt-6 border-t border-stone-200 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 font-sans">
            Kayashunya Universal Teachings
          </span>
        </div>
      </div>
    </div>
  );
}
