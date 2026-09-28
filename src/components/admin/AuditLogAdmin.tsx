import { useState } from 'react';
import { Clock, ShieldAlert, Filter, Search } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export function AuditLogAdmin() {
  const { auditLogs } = useCms();
  const [filterAction, setFilterAction] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = auditLogs.filter((log) => {
    if (filterAction !== 'all' && log.action !== filterAction) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        log.details.toLowerCase().includes(q) ||
        log.actorEmail.toLowerCase().includes(q) ||
        log.entityType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <span>Immutable Admin Audit Trail</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Real-time record of all administrative operations, settings changes, publications, and logins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
          >
            <option value="all">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="restore">Restore</option>
            <option value="settings_change">Settings Change</option>
            <option value="login">Login</option>
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search details..."
            className="px-3 py-1.5 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
          />
        </div>
      </div>

      <div className="rounded-xl border border-stone-800 bg-stone-900 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-950 text-stone-400 border-b border-stone-800 uppercase tracking-wider font-semibold text-[10px]">
            <tr>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Entity</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4">Actor</th>
              <th className="py-3 px-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/60 font-mono text-[11px]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-stone-500 font-sans">
                  No audit entries matching filter.
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr key={log.id} className="hover:bg-stone-850/50">
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded uppercase font-bold text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-300 font-sans font-semibold">
                    {log.entityType}
                  </td>
                  <td className="py-3 px-4 text-stone-200 font-sans font-normal">
                    {log.details}
                  </td>
                  <td className="py-3 px-4 text-stone-400 text-[10px]">
                    {log.actorEmail}
                  </td>
                  <td className="py-3 px-4 text-right text-stone-500 text-[10px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
