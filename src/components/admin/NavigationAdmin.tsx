import { useState } from 'react';
import { 
  Menu, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Edit3, 
  Smartphone, 
  Layers, 
  Check, 
  X 
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { NavigationMenuItem, BottomNavItem } from '../../types/cms';

export function NavigationAdmin() {
  const { 
    navigationMenu, 
    bottomNavItems, 
    saveMenuItem, 
    removeMenuItem, 
    saveBottomNavConfig 
  } = useCms();

  const [activeTab, setActiveTab] = useState<'drawer' | 'bottom'>('drawer');

  // Edit states
  const [editingMenuItem, setEditingMenuItem] = useState<NavigationMenuItem | null>(null);
  const [editingBottomItem, setEditingBottomItem] = useState<BottomNavItem | null>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newMenuDest, setNewMenuDest] = useState('');

  const sortedDrawer = [...navigationMenu].sort((a, b) => a.order - b.order);
  const sortedBottom = [...bottomNavItems].sort((a, b) => a.order - b.order);

  const handleMoveDrawer = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedDrawer.length) return;

    const current = sortedDrawer[index];
    const target = sortedDrawer[targetIndex];

    await saveMenuItem({ ...current, order: target.order });
    await saveMenuItem({ ...target, order: current.order });
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuLabel.trim()) return;
    const newItem: NavigationMenuItem = {
      id: `menu_${Date.now()}`,
      label: newMenuLabel.trim(),
      destination: newMenuDest.trim() || 'home',
      iconName: 'Compass',
      order: sortedDrawer.length + 1,
      isEnabled: true,
    };
    await saveMenuItem(newItem);
    setNewMenuLabel('');
    setNewMenuDest('');
    setIsAddMenuOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Menu className="w-5 h-5 text-amber-500" />
            <span>Navigation & Menu CMS (WordPress-Style)</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Control drawer menu items, custom links, and bottom navigation bar tabs dynamically.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-xl">
          <button
            onClick={() => setActiveTab('drawer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'drawer' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            Hamburger Drawer Menu ({navigationMenu.length})
          </button>
          <button
            onClick={() => setActiveTab('bottom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'bottom' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            Bottom Bar ({bottomNavItems.length} Tabs)
          </button>
        </div>
      </div>

      {activeTab === 'drawer' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">
              Order and configure the side navigation drawer:
            </span>
            <button
              onClick={() => setIsAddMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Menu Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {sortedDrawer.map((item, idx) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  item.isEnabled ? 'bg-stone-900 border-stone-800' : 'bg-stone-950 border-stone-900 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveDrawer(idx, 'up')}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 disabled:opacity-20"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      disabled={idx === sortedDrawer.length - 1}
                      onClick={() => handleMoveDrawer(idx, 'down')}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 disabled:opacity-20"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{item.label}</span>
                      <span className="text-[10px] text-amber-400 font-mono">→ {item.destination}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveMenuItem({ ...item, isEnabled: !item.isEnabled })}
                    className={`p-1.5 rounded-lg border text-xs ${
                      item.isEnabled ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-stone-800 text-stone-500 border-stone-700'
                    }`}
                  >
                    {item.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setEditingMenuItem(item)}
                    className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => removeMenuItem(item.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Bottom Nav CMS */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            <strong>Mobile Bottom Navigation:</strong> Mobile UX standards recommend strictly 4 tabs (HOME, WISDOM, SADHNA, ACCOUNT). You can rename labels, change destinations, and toggle visibility.
          </div>

          <div className="space-y-2.5">
            {sortedBottom.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white uppercase tracking-wider">{item.label}</span>
                    <span className="text-[10px] text-amber-400 font-mono">[{item.key}]</span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Target View: <code className="text-stone-300">{item.destination}</code>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveBottomNavConfig({ ...item, isEnabled: !item.isEnabled })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      item.isEnabled
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : 'border-stone-700 bg-stone-800 text-stone-500'
                    }`}
                  >
                    {item.isEnabled ? 'Enabled' : 'Disabled'}
                  </button>

                  <button
                    onClick={() => setEditingBottomItem(item)}
                    className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Drawer Modal */}
      {editingMenuItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Edit Menu Item</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Menu Label</label>
                <input
                  type="text"
                  value={editingMenuItem.label}
                  onChange={(e) => setEditingMenuItem({ ...editingMenuItem, label: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Destination Route</label>
                <input
                  type="text"
                  value={editingMenuItem.destination}
                  onChange={(e) => setEditingMenuItem({ ...editingMenuItem, destination: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button onClick={() => setEditingMenuItem(null)} className="px-4 py-2 rounded-xl bg-stone-800 text-xs text-stone-300">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await saveMenuItem(editingMenuItem);
                  setEditingMenuItem(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bottom Nav Tab Modal */}
      {editingBottomItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Edit Bottom Bar Tab Label</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Tab Label</label>
                <input
                  type="text"
                  value={editingBottomItem.label}
                  onChange={(e) => setEditingBottomItem({ ...editingBottomItem, label: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white uppercase font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Destination Key</label>
                <input
                  type="text"
                  value={editingBottomItem.destination}
                  onChange={(e) => setEditingBottomItem({ ...editingBottomItem, destination: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button onClick={() => setEditingBottomItem(null)} className="px-4 py-2 rounded-xl bg-stone-800 text-xs text-stone-300">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await saveBottomNavConfig(editingBottomItem);
                  setEditingBottomItem(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white"
              >
                Save Tab
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Drawer Modal */}
      {isAddMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <form onSubmit={handleAddMenuItem} className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Add Drawer Menu Item</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Label</label>
                <input
                  type="text"
                  required
                  value={newMenuLabel}
                  onChange={(e) => setNewMenuLabel(e.target.value)}
                  placeholder="e.g. Masterclass Retreats"
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Target Route or Page</label>
                <input
                  type="text"
                  value={newMenuDest}
                  onChange={(e) => setNewMenuDest(e.target.value)}
                  placeholder="e.g. page_the-last-hour or courses"
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button type="button" onClick={() => setIsAddMenuOpen(false)} className="px-4 py-2 rounded-xl bg-stone-800 text-xs text-stone-300">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white">
                Add Menu Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
