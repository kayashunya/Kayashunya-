import { useState } from 'react';
import { Calendar, Plus, Trash2, Edit3, RotateCcw, X, Video, Users, Link } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { OnlineSession } from '../../types/cms';

export function SessionsAdmin() {
  const { sessionList, saveSessionItem, sendToTrash, restoreItem, purgePermanently } = useCms();
  const [editingItem, setEditingItem] = useState<OnlineSession | null>(null);

  const handleCreateNew = () => {
    setEditingItem({
      id: `session_${Date.now()}`,
      title: '',
      description: '',
      instructor: 'Acharya Kayashunya',
      scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      scheduledTime: '07:30 PM IST',
      durationMinutes: 90,
      meetingLink: 'https://meet.google.com/...',
      status: 'upcoming',
      registeredCount: 0,
      maxParticipants: 500,
    });
  };

  const handleSave = async () => {
    if (!editingItem || !editingItem.title.trim()) return;
    await saveSessionItem(editingItem);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <span>Online Sessions & Live Satsangs CMS</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Schedule live Zoom / Google Meet gatherings and publish recording archives.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Live Session</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sessionList.map((item) => (
          <div
            key={item.id}
            className="p-4.5 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                  {item.scheduledDate} · {item.scheduledTime}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] capitalize ${
                  item.status === 'upcoming' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-stone-800 text-stone-400'
                }`}>
                  {item.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">{item.title}</h4>
              <p className="text-xs text-stone-400 mt-1 line-clamp-2">{item.description}</p>
              <div className="mt-2.5 text-[11px] text-stone-400 flex items-center gap-3">
                <span>Instructor: {item.instructor}</span>
                <span>·</span>
                <span>{item.durationMinutes} mins</span>
                <span>·</span>
                <span>{item.registeredCount} Seekers</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <a
                href={item.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <Link className="w-3 h-3" />
                <span>Join Link</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => sendToTrash('sessions', item.id, item.title)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-sm font-bold text-white">Edit Session Details</h3>
              <button onClick={() => setEditingItem(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Session Title *</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={editingItem.scheduledDate}
                    onChange={(e) => setEditingItem({ ...editingItem, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Time</label>
                  <input
                    type="text"
                    value={editingItem.scheduledTime}
                    onChange={(e) => setEditingItem({ ...editingItem, scheduledTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                    placeholder="e.g. 07:30 PM IST"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Meeting Link (Zoom / Meet)</label>
                <input
                  type="url"
                  value={editingItem.meetingLink}
                  onChange={(e) => setEditingItem({ ...editingItem, meetingLink: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Instructor</label>
                  <input
                    type="text"
                    value={editingItem.instructor}
                    onChange={(e) => setEditingItem({ ...editingItem, instructor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Status</label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as OnlineSession['status'] })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live Now</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded-xl bg-stone-800 text-xs text-stone-300">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white">
                Save Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
