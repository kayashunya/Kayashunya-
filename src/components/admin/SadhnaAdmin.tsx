import { useState } from 'react';
import { 
  Compass, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Edit3, 
  Clock, 
  X,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { SadhnaContent, ContentStatus } from '../../types/cms';

export function SadhnaAdmin() {
  const { sadhnaList, saveSadhnaItem, sendToTrash, restoreItem, purgePermanently } = useCms();
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all');
  const [editingItem, setEditingItem] = useState<SadhnaContent | null>(null);

  const categories = [
    { id: 'daily', label: 'Daily Sadhna' },
    { id: 'yoga', label: 'Yoga & Asana' },
    { id: 'strength', label: 'Strength' },
    { id: 'mobility', label: 'Mobility' },
    { id: 'meditation', label: 'Meditation (Dhyana)' },
    { id: 'breath', label: 'Breath (Pranayama)' },
    { id: 'awareness', label: 'Awareness Practices' },
    { id: 'kayashunya_8_path', label: 'Kayashunya 8 Path' },
    { id: 'universal_training', label: 'Kayashunya Universal Training' },
    { id: 'program', label: 'Programs' },
  ];

  const filtered = sadhnaList.filter((item) => {
    if (activeTab === 'trash') return item.status === 'trash';
    if (item.status === 'trash') return false;
    if (activeTab === 'published') return item.status === 'published';
    if (activeTab === 'draft') return item.status === 'draft';
    return true;
  });

  const handleCreateNew = () => {
    setEditingItem({
      id: `sadhna_${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'daily',
      description: '',
      instructions: '',
      durationMinutes: 15,
      difficulty: 'All Levels',
      tags: ['Sadhna', 'Practice'],
      status: 'published',
      order: sadhnaList.length + 1,
      timeOfDay: 'Morning',
    });
  };

  const handleSave = async () => {
    if (!editingItem || !editingItem.title.trim()) return;
    await saveSadhnaItem(editingItem);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span>Sadhna, Yoga & Universal Training CMS</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Manage daily routines, Dhyana timers, Kayashunya 8 Path, and physical alignment practices.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Sadhna Practice</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-xl w-fit">
        {(['all', 'published', 'draft', 'trash'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              activeTab === t ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid of Sadhna Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-mono">
                  {categories.find((c) => c.id === item.category)?.label || item.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                    item.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : item.status === 'draft'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mt-1.5">{item.title}</h4>
              <p className="text-xs text-stone-400 mt-1 line-clamp-2">{item.description}</p>

              <div className="mt-3 flex items-center gap-3 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.durationMinutes} mins</span>
                </span>
                <span>·</span>
                <span>{item.difficulty}</span>
                <span>·</span>
                <span>{item.timeOfDay}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[11px] font-mono">Order: #{item.order}</span>

              <div className="flex items-center gap-1.5">
                {item.status === 'trash' ? (
                  <>
                    <button
                      onClick={() => restoreItem('sadhna', item.id, item.title)}
                      className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      title="Restore"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => purgePermanently('sadhna', item.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      title="Purge"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => sendToTrash('sadhna', item.id, item.title)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      title="Trash"
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

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingItem.title ? `Edit Sadhna: ${editingItem.title}` : 'Create Sadhna Practice'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
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
                  Category
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as SadhnaContent['category'] })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Duration (Mins)
                </label>
                <input
                  type="number"
                  value={editingItem.durationMinutes}
                  onChange={(e) => setEditingItem({ ...editingItem, durationMinutes: parseInt(e.target.value) || 15 })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={editingItem.difficulty}
                  onChange={(e) => setEditingItem({ ...editingItem, difficulty: e.target.value as SadhnaContent['difficulty'] })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                >
                  <option value="All Levels">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Time of Day
                </label>
                <select
                  value={editingItem.timeOfDay || 'Morning'}
                  onChange={(e) => setEditingItem({ ...editingItem, timeOfDay: e.target.value as SadhnaContent['timeOfDay'] })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Step-by-Step Instructions & Technique
              </label>
              <textarea
                rows={4}
                value={editingItem.instructions}
                onChange={(e) => setEditingItem({ ...editingItem, instructions: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                placeholder="Posture setup, breathing cues, and inner inquiry directions..."
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-800">
              <label className="flex items-center gap-2 text-xs text-stone-300">
                <input
                  type="checkbox"
                  checked={editingItem.status === 'published'}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.checked ? 'published' : 'draft' })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Published (Live for seekers)</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs hover:bg-stone-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
                >
                  Save Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
