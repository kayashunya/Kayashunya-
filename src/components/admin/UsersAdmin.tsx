import { useState } from 'react';
import { Users, Search, ShieldCheck, ShieldAlert, UserX, UserCheck } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { UserRecord } from '../../types/cms';

export function UsersAdmin() {
  const { userList, changeUserRole, setUserSuspension } = useCms();
  const [search, setSearch] = useState('');

  const filtered = userList.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return u.displayName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.includes(q);
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            <span>User & Access Control Management</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Manage roles (Super Admin / Owner, Admin, Moderator, User), verify active sadhakas, or suspend bad actors.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email, name..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
          />
        </div>
      </div>

      <div className="rounded-xl border border-stone-800 bg-stone-900 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-950 text-stone-400 border-b border-stone-800 uppercase tracking-wider font-semibold text-[10px]">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Sadhna Streak</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/60">
            {filtered.map((user) => (
              <tr key={user.uid} className="hover:bg-stone-850/50">
                <td className="py-3 px-4">
                  <div className="font-semibold text-white">{user.displayName}</div>
                  <div className="text-[11px] text-stone-400 font-mono">{user.email}</div>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => changeUserRole(user.uid, e.target.value as UserRecord['role'])}
                    className="px-2 py-1 rounded-md bg-stone-850 border border-stone-700 text-[11px] text-amber-300 font-semibold"
                  >
                    <option value="super_admin">Super Admin / Owner</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User / Sadhaka</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-stone-300 tabular-nums">
                  {user.streakDays || 0} days · {user.totalHoursRead || 0}h read
                </td>
                <td className="py-3 px-4">
                  {user.isSuspended ? (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 font-semibold">
                      Suspended
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      Active
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setUserSuspension(user.uid, !user.isSuspended)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                      user.isSuspended
                        ? 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                    }`}
                  >
                    {user.isSuspended ? 'Reactivate' : 'Suspend'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
