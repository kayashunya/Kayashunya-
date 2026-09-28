import { useState } from 'react';
import { Video, Plus, Trash2, RotateCcw, Edit3, Play, X, ExternalLink } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { VideoContent } from '../../types/cms';

export function VideosAdmin() {
  const { videoList, saveVideoItem, sendToTrash, restoreItem, purgePermanently } = useCms();
  const [editingItem, setEditingItem] = useState<VideoContent | null>(null);

  const handleCreateNew = () => {
    setEditingItem({
      id: `video_${Date.now()}`,
      title: '',
      description: '',
      category: 'Discourses',
      tags: ['Video', 'Discourse'],
      videoUrl: '',
      thumbnailUrl: '',
      duration: '30:00',
      instructor: 'Acharya Kayashunya',
      status: 'published',
      publishedAt: new Date().toISOString(),
    });
  };

  const handleSave = async () => {
    if (!editingItem || !editingItem.title.trim()) return;
    await saveVideoItem(editingItem);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-500" />
            <span>Video Library CMS</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Manage hosted videos and YouTube discourses. Cloud URLs are stored as metadata.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {videoList.map((vid) => (
          <div
            key={vid.id}
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              vid.status === 'trash' ? 'bg-stone-950 border-red-500/20' : 'bg-stone-900 border-stone-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{vid.category}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] capitalize ${
                  vid.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-stone-800 text-stone-400'
                }`}>
                  {vid.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">{vid.title}</h4>
              <p className="text-xs text-stone-400 mt-1 line-clamp-2">{vid.description}</p>
              <div className="mt-2 text-[11px] text-stone-500 font-mono truncate">
                URL: {vid.videoUrl || 'No video link'}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400">{vid.duration}</span>
              <div className="flex items-center gap-2">
                {vid.status === 'trash' ? (
                  <>
                    <button
                      onClick={() => restoreItem('videos', vid.id, vid.title)}
                      className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => purgePermanently('videos', vid.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingItem(vid)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => sendToTrash('videos', vid.id, vid.title)}
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
              <h3 className="text-sm font-bold text-white">Edit Video Content</h3>
              <button onClick={() => setEditingItem(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Video Stream URL</label>
                <input
                  type="text"
                  value={editingItem.videoUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or .mp4 stream URL"
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingItem.duration}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                    placeholder="e.g. 45:10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded-xl bg-stone-800 text-xs text-stone-300">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white">
                Save Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
