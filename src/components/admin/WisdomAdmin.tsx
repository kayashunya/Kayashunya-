import { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  RotateCcw, 
  Edit3, 
  Eye, 
  Clock, 
  History, 
  Check, 
  X,
  FileText
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { WisdomContent, ContentStatus } from '../../types/cms';

export function WisdomAdmin() {
  const { wisdomList, saveWisdomItem, sendToTrash, restoreItem, purgePermanently } = useCms();

  const [activeFilter, setActiveFilter] = useState<'all' | 'published' | 'draft' | 'trash'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<WisdomContent | null>(null);
  const [viewingVersionHistory, setViewingVersionHistory] = useState<WisdomContent | null>(null);

  const filtered = wisdomList.filter((item) => {
    if (activeFilter === 'trash') {
      if (item.status !== 'trash') return false;
    } else if (activeFilter !== 'all') {
      if (item.status !== activeFilter) return false;
    } else {
      if (item.status === 'trash') return false; // Hide trash in 'all' view
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateNew = () => {
    const newItem: WisdomContent = {
      id: `wisdom_${Date.now()}`,
      title: '',
      subtitle: '',
      slug: '',
      author: 'Acharya Kayashunya',
      category: 'Vedanta & Mind',
      tags: ['Advaita', 'Self-Inquiry'],
      type: 'article',
      content: '',
      excerpt: '',
      readingTimeMinutes: 5,
      status: 'draft',
      publishedAt: new Date().toISOString(),
      likesCount: 0,
      isFeatured: false,
    };
    setEditingItem(newItem);
  };

  const handleSaveItem = async () => {
    if (!editingItem || !editingItem.title.trim()) return;
    const finalSlug = editingItem.slug.trim() || editingItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await saveWisdomItem({
      ...editingItem,
      slug: finalSlug,
    });
    setEditingItem(null);
  };

  const handleRestoreVersion = (versionContent: string, versionTitle: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      title: versionTitle,
      content: versionContent,
    });
    setViewingVersionHistory(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Wisdom & Discourses CMS</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Create, edit, publish e-books, articles, sutras, and maintain full version revision history.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Wisdom Article</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800">
        <div className="flex items-center gap-1 w-full sm:w-auto">
          {(['all', 'published', 'draft', 'trash'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                activeFilter === tab
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discourses..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-850 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Table of Articles */}
      <div className="rounded-xl border border-stone-800 bg-stone-900 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-950 text-stone-400 border-b border-stone-800 uppercase tracking-wider font-semibold text-[10px]">
            <tr>
              <th className="py-3 px-4">Title & Details</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-stone-500">
                  No items found in this view.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-stone-850/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-[11px] text-stone-400 line-clamp-1">{item.subtitle}</div>
                  </td>
                  <td className="py-3 px-4 text-stone-300">{item.category}</td>
                  <td className="py-3 px-4">
                    <span className="capitalize px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800 text-stone-300">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                        item.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : item.status === 'draft'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-400">{item.author}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status === 'trash' ? (
                        <>
                          <button
                            onClick={() => restoreItem('wisdom', item.id, item.title)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                            title="Restore from Trash"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => purgePermanently('wisdom', item.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            title="Permanently Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => sendToTrash('wisdom', item.id, item.title)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            title="Move to Trash"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Modal with Versioning */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingItem.title ? `Edit: ${editingItem.title}` : 'Create New Wisdom Item'}
                </h3>
                <span className="text-[11px] text-stone-400">
                  Status: <strong className="capitalize text-amber-400">{editingItem.status}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {editingItem.versions && editingItem.versions.length > 0 && (
                  <button
                    onClick={() => setViewingVersionHistory(editingItem)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs"
                  >
                    <History className="w-3.5 h-3.5 text-amber-400" />
                    <span>Revisions ({editingItem.versions.length})</span>
                  </button>
                )}
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={editingItem.subtitle}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Type
                </label>
                <select
                  value={editingItem.type}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value as WisdomContent['type'] })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                >
                  <option value="article">Article</option>
                  <option value="book">E-Book Chapter</option>
                  <option value="sutra">Sutra</option>
                  <option value="discourse">Discourse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Publication Status
                </label>
                <select
                  value={editingItem.status}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as ContentStatus })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                >
                  <option value="published">Published (Live)</option>
                  <option value="draft">Draft (Private)</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Read Time (Mins)
                </label>
                <input
                  type="number"
                  value={editingItem.readingTimeMinutes}
                  onChange={(e) => setEditingItem({ ...editingItem, readingTimeMinutes: parseInt(e.target.value) || 5 })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Quote Highlight (for 1-Tap WhatsApp Sharing)
              </label>
              <input
                type="text"
                value={editingItem.quoteHighlight || ''}
                onChange={(e) => setEditingItem({ ...editingItem, quoteHighlight: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                placeholder="Key sentence highlighted on cards and share sheets..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Full Article Content
              </label>
              <textarea
                rows={8}
                value={editingItem.content}
                onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-mono leading-relaxed"
                placeholder="Full chapter or discourse text..."
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-800">
              <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isFeatured || false}
                  onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Feature on Home Screen Banner</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs hover:bg-stone-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveItem}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
                >
                  Save & Apply Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revision History Viewer Modal */}
      {viewingVersionHistory && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-amber-500" />
                <span>Revision History for: {viewingVersionHistory.title}</span>
              </h3>
              <button
                onClick={() => setViewingVersionHistory(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {viewingVersionHistory.versions?.map((ver) => (
                <div
                  key={ver.versionId}
                  className="p-3.5 rounded-xl bg-stone-850 border border-stone-700/60 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{ver.title}</span>
                    <span className="text-[10px] text-stone-400">
                      {new Date(ver.updatedAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-2 italic font-serif">
                    "{ver.content.slice(0, 140)}..."
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-stone-500">By: {ver.updatedBy}</span>
                    <button
                      onClick={() => handleRestoreVersion(ver.content, ver.title)}
                      className="px-2.5 py-1 rounded-md bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30 text-[10px] font-semibold"
                    >
                      Restore This Version
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
