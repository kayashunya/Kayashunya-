import { useState } from 'react';
import { FileText, Edit3, Plus, X, History, Check, Save } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { EditablePage } from '../../types/cms';

export function PagesAdmin() {
  const { editablePages, savePageItem } = useCms();
  const [editingPage, setEditingPage] = useState<EditablePage | null>(null);
  const [viewingHistory, setViewingHistory] = useState<EditablePage | null>(null);

  const handleSave = async () => {
    if (!editingPage) return;
    await savePageItem(editingPage);
    setEditingPage(null);
  };

  const handleCreateNew = () => {
    setEditingPage({
      id: `page_${Date.now()}`,
      slug: 'new-page',
      title: 'New Page Title',
      metaDescription: 'Description for search engines and seekers.',
      content: '# New Page\n\nEnter your markdown content here...',
      status: 'published',
      updatedAt: new Date().toISOString(),
      lastUpdatedBy: 'Admin',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>Editable Content Pages CMS</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Edit all platform informational pages, legal declarations, and methods without editing code.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Page</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-3.5">
        {editablePages.map((page) => (
          <div
            key={page.id}
            className="p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-amber-400">/{page.slug}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold capitalize">
                  {page.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1.5">{page.title}</h4>
              <p className="text-xs text-stone-400 mt-1 line-clamp-2">{page.metaDescription}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[10px]">
                Updated: {new Date(page.updatedAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => setEditingPage(page)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-medium"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Page Copy</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Edit: {editingPage.title}</h3>
                <span className="text-xs text-stone-400 font-mono">Slug: /{editingPage.slug}</span>
              </div>
              <div className="flex items-center gap-2">
                {editingPage.versions && editingPage.versions.length > 0 && (
                  <button
                    onClick={() => setViewingHistory(editingPage)}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:underline px-2"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>Revisions ({editingPage.versions.length})</span>
                  </button>
                )}
                <button onClick={() => setEditingPage(null)} className="text-stone-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Page Title *</label>
                <input
                  type="text"
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Meta Description</label>
                <input
                  type="text"
                  value={editingPage.metaDescription}
                  onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Full Page Markdown Content *
                </label>
                <textarea
                  rows={12}
                  value={editingPage.content}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-mono leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button onClick={() => setEditingPage(null)} className="px-4 py-2 rounded-xl bg-stone-800 text-xs text-stone-300">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white">
                Save Page
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingHistory && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-sm font-bold text-white">Revision History for {viewingHistory.title}</h3>
              <button onClick={() => setViewingHistory(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {viewingHistory.versions?.map((v) => (
                <div key={v.versionId} className="p-3 rounded-xl bg-stone-850 border border-stone-700 text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span className="font-semibold">{v.title}</span>
                    <span className="text-[10px] text-stone-500">{new Date(v.updatedAt).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (editingPage) {
                        setEditingPage({ ...editingPage, content: v.content, title: v.title });
                      }
                      setViewingHistory(null);
                    }}
                    className="mt-2 px-3 py-1 rounded bg-amber-600/20 text-amber-300 border border-amber-500/30 text-[10px] font-semibold"
                  >
                    Restore This Revision
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
