import { useState } from 'react';
import { Quote, Plus, Trash2, Edit3, RotateCcw, X, Share2 } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { QuoteContent } from '../../types/cms';

export function QuotesAdmin() {
  const { quoteList, saveQuoteItem, sendToTrash, restoreItem, purgePermanently } = useCms();
  const [editingItem, setEditingItem] = useState<QuoteContent | null>(null);

  const handleCreateNew = () => {
    setEditingItem({
      id: `quote_${Date.now()}`,
      quote: '',
      author: 'Acharya Kayashunya',
      category: 'Silence',
      status: 'published',
      sharesCount: 0,
    });
  };

  const handleSave = async () => {
    if (!editingItem || !editingItem.quote.trim()) return;
    await saveQuoteItem(editingItem);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Quote className="w-5 h-5 text-amber-500" />
            <span>Quotes & Reflections CMS</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Manage pearls of wisdom ready for 1-tap WhatsApp sharing in the user app.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Quote</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {quoteList.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              item.status === 'trash' ? 'bg-stone-950 border-red-500/20' : 'bg-stone-900 border-stone-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">{item.category}</span>
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <Share2 className="w-3 h-3 text-emerald-400" />
                  <span>{item.sharesCount} shares</span>
                </span>
              </div>
              <p className="text-sm font-serif italic text-stone-100 mt-2.5 leading-relaxed">
                “{item.quote}”
              </p>
              <div className="mt-2 text-xs font-semibold text-amber-400">
                — {item.author}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded text-[10px] capitalize ${
                item.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-stone-800 text-stone-400'
              }`}>
                {item.status}
              </span>
              <div className="flex items-center gap-2">
                {item.status === 'trash' ? (
                  <>
                    <button
                      onClick={() => restoreItem('quotes', item.id, item.quote)}
                      className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => purgePermanently('quotes', item.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => sendToTrash('quotes', item.id, item.quote)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-sm font-bold text-white">Edit Quote Content</h3>
              <button onClick={() => setEditingItem(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Quote Text *</label>
                <textarea
                  rows={3}
                  value={editingItem.quote}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-serif"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Author</label>
                  <input
                    type="text"
                    value={editingItem.author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded-xl bg-stone-800 text-xs text-stone-300">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white">
                Save Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
