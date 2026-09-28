import { useState } from 'react';
import { 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Save, 
  Sparkles,
  Link,
  SlidersHorizontal
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { HomeSection } from '../../types/cms';

export function HomeBuilderAdmin() {
  const { homeSections, saveHomeSectionItem, removeHomeSectionItem } = useCms();
  const [editingSection, setEditingSection] = useState<HomeSection | null>(null);
  const [isNewSectionModal, setIsNewSectionModal] = useState(false);
  const [newSection, setNewSection] = useState<Partial<HomeSection>>({
    title: 'New Content Section',
    subtitle: 'Curated teachings and practices',
    type: 'featured',
    isEnabled: true,
    order: homeSections.length + 1,
    displayLimit: 3,
    buttonLabel: 'Explore All',
    buttonDestination: '/wisdom',
  });

  const sortedSections = [...homeSections].sort((a, b) => a.order - b.order);

  const handleToggleEnabled = async (section: HomeSection) => {
    await saveHomeSectionItem({
      ...section,
      isEnabled: !section.isEnabled,
    });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedSections.length) return;

    const current = sortedSections[index];
    const target = sortedSections[targetIndex];

    const currentOrder = current.order;
    const targetOrder = target.order;

    await saveHomeSectionItem({ ...current, order: targetOrder });
    await saveHomeSectionItem({ ...target, order: currentOrder });
  };

  const handleSaveEdit = async () => {
    if (!editingSection) return;
    await saveHomeSectionItem(editingSection);
    setEditingSection(null);
  };

  const handleCreateNewSection = async () => {
    if (!newSection.title) return;
    const id = `sec_${Date.now()}`;
    await saveHomeSectionItem({
      id,
      title: newSection.title || 'Custom Section',
      subtitle: newSection.subtitle || '',
      type: newSection.type as HomeSection['type'] || 'custom',
      isEnabled: true,
      order: sortedSections.length + 1,
      buttonLabel: newSection.buttonLabel,
      buttonDestination: newSection.buttonDestination,
      displayLimit: newSection.displayLimit || 3,
    });
    setIsNewSectionModal(false);
    setNewSection({
      title: '',
      subtitle: '',
      type: 'featured',
      displayLimit: 3,
      buttonLabel: '',
      buttonDestination: '',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <span>Home Page Builder (CMS)</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Reorder, customize, enable or disable sections on the Home feed. The user app updates dynamically.
          </p>
        </div>

        <button
          onClick={() => setIsNewSectionModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Home Section</span>
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sortedSections.map((section, idx) => (
          <div
            key={section.id}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
              section.isEnabled
                ? 'bg-stone-900 border-stone-800'
                : 'bg-stone-950 border-stone-850 opacity-60'
            }`}
          >
            {/* Left: Reorder Arrows & Info */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="w-6 h-6 rounded flex items-center justify-center bg-stone-850 hover:bg-stone-700 text-stone-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={idx === sortedSections.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="w-6 h-6 rounded flex items-center justify-center bg-stone-850 hover:bg-stone-700 text-stone-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-800 text-[10px] font-mono text-stone-400 flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">{section.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {section.type}
                  </span>
                </div>
                {section.subtitle && (
                  <p className="text-xs text-stone-400 mt-0.5 ml-7">{section.subtitle}</p>
                )}
                {section.buttonLabel && (
                  <div className="mt-1 ml-7 flex items-center gap-1.5 text-[11px] text-stone-500 font-mono">
                    <Link className="w-3 h-3 text-stone-600" />
                    <span>Button: "{section.buttonLabel}" → {section.buttonDestination}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleEnabled(section)}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                  section.isEnabled
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : 'border-stone-700 bg-stone-800 text-stone-400'
                }`}
                title={section.isEnabled ? 'Disable Section' : 'Enable Section'}
              >
                {section.isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden sm:inline">{section.isEnabled ? 'Visible' : 'Hidden'}</span>
              </button>

              <button
                onClick={() => setEditingSection(section)}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
                title="Edit Section Settings"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => removeHomeSectionItem(section.id)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                title="Delete Section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                <span>Edit Home Section: {editingSection.title}</span>
              </h3>
              <button
                onClick={() => setEditingSection(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Subtitle / Description
                </label>
                <input
                  type="text"
                  value={editingSection.subtitle || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Display Limit
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={editingSection.displayLimit || 3}
                    onChange={(e) => setEditingSection({ ...editingSection, displayLimit: parseInt(e.target.value) || 3 })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Action Button Label
                  </label>
                  <input
                    type="text"
                    value={editingSection.buttonLabel || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, buttonLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                    placeholder="e.g. View All"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Button Destination Route
                </label>
                <input
                  type="text"
                  value={editingSection.buttonDestination || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, buttonDestination: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-mono"
                  placeholder="e.g. /wisdom or /sadhna"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs hover:bg-stone-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
              >
                Save Section Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Modal */}
      {isNewSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-500" />
                <span>Create New Home Section</span>
              </h3>
              <button
                onClick={() => setIsNewSectionModal(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  required
                  value={newSection.title}
                  onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  placeholder="e.g. Recommended Inquiries"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Section Type
                </label>
                <select
                  value={newSection.type}
                  onChange={(e) => setNewSection({ ...newSection, type: e.target.value as HomeSection['type'] })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                >
                  <option value="featured">Featured Banner</option>
                  <option value="todays_wisdom">Today's Wisdom / Discourses</option>
                  <option value="todays_sadhna">Today's Sadhna / Routines</option>
                  <option value="upcoming_sessions">Upcoming Live Sessions</option>
                  <option value="courses">Master Courses</option>
                  <option value="videos">Video Library</option>
                  <option value="audio">Audio & Podcasts</option>
                  <option value="quotes">Daily Quotes Carousel</option>
                  <option value="continue">Continue Learning Tracker</option>
                  <option value="custom">Custom Banner Callout</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={newSection.subtitle}
                  onChange={(e) => setNewSection({ ...newSection, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                  placeholder="Brief context for users"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={newSection.buttonLabel}
                    onChange={(e) => setNewSection({ ...newSection, buttonLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                    placeholder="e.g. View All"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={newSection.buttonDestination}
                    onChange={(e) => setNewSection({ ...newSection, buttonDestination: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                    placeholder="e.g. /wisdom"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => setIsNewSectionModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs hover:bg-stone-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewSection}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
              >
                Create Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
