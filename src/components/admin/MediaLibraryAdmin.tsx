import { useState, useRef } from 'react';
import { Image, Upload, Trash2, Search, Copy, Check, Folder, Plus, FileText } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { MediaItem } from '../../types/cms';

export function MediaLibraryAdmin() {
  const { mediaLibrary, uploadMedia, removeMedia } = useCms();
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual URL input form
  const [customName, setCustomName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customFolder, setCustomFolder] = useState('Photos');

  const folders = ['All', 'Photos', 'Discourses', 'Banners', 'Sadhna', 'Icons'];

  const filteredMedia = mediaLibrary.filter((m) => {
    if (selectedFolder !== 'All' && m.folder !== selectedFolder) return false;
    if (searchQuery.trim()) {
      return m.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const newMedia: MediaItem = {
        id: `media_${Date.now()}`,
        name: file.name.split('.')[0] || 'Uploaded Media',
        originalName: file.name,
        url: dataUrl,
        type: file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image',
        sizeBytes: file.size,
        folder: selectedFolder === 'All' ? 'Photos' : selectedFolder,
        createdAt: new Date().toISOString(),
      };
      await uploadMedia(newMedia);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAddCustomUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    const newMedia: MediaItem = {
      id: `media_${Date.now()}`,
      name: customName.trim() || 'External Media',
      originalName: customName.trim() || 'External Media',
      url: customUrl.trim(),
      type: 'image',
      sizeBytes: 1024 * 100,
      folder: customFolder,
      createdAt: new Date().toISOString(),
    };
    await uploadMedia(newMedia);
    setCustomName('');
    setCustomUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Image className="w-5 h-5 text-amber-500" />
            <span>WordPress-Style Media Library</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Upload images, banners, icons and audio. Copy public URLs to embed anywhere in the CMS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,audio/*,video/*"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs"
          >
            <Upload className="w-4 h-4" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {/* Manual URL Add / Fast Add Box */}
      <form onSubmit={handleAddCustomUrl} className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row items-center gap-3">
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Media Name (e.g. Himalayan Dawn)"
          className="flex-1 w-full px-3 py-1.5 rounded-lg bg-stone-850 border border-stone-700 text-xs text-white"
        />
        <input
          type="url"
          required
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="Media Asset URL (Cloud Storage / HTTPS)"
          className="flex-2 w-full px-3 py-1.5 rounded-lg bg-stone-850 border border-stone-700 text-xs text-white font-mono"
        />
        <select
          value={customFolder}
          onChange={(e) => setCustomFolder(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-stone-850 border border-stone-700 text-xs text-white"
        >
          <option value="Photos">Photos</option>
          <option value="Banners">Banners</option>
          <option value="Discourses">Discourses</option>
          <option value="Sadhna">Sadhna</option>
          <option value="Icons">Icons</option>
        </select>
        <button
          type="submit"
          className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold whitespace-nowrap"
        >
          Save to Library
        </button>
      </form>

      {/* Folder bar & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedFolder === f
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-850 border border-stone-700 text-xs text-white"
          />
        </div>
      </div>

      {/* Grid of Media Assets */}
      {filteredMedia.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-stone-900 border border-stone-800 p-6">
          <Image className="w-10 h-10 text-stone-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-stone-300">Media Library is Empty</p>
          <p className="text-xs text-stone-500 mt-1">
            Click "Upload File" or enter an external image URL above to start populating your media library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border border-stone-800 bg-stone-900 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all"
            >
              <div className="relative aspect-video bg-stone-950 flex items-center justify-center overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="text-stone-500 font-mono text-[10px] uppercase font-bold">
                    {item.type}
                  </div>
                )}
              </div>

              <div className="p-3">
                <div className="font-semibold text-xs text-white truncate" title={item.name}>
                  {item.name}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 flex items-center justify-between">
                  <span>{item.folder}</span>
                  <span className="font-mono">{(item.sizeBytes / 1024).toFixed(0)} KB</span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="text-[10px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? 'Copied URL!' : 'Copy URL'}</span>
                  </button>

                  <button
                    onClick={() => removeMedia(item.id)}
                    className="text-stone-500 hover:text-red-400"
                    title="Delete media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
