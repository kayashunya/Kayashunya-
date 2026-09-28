import { useState } from 'react';
import { 
  BookOpen, 
  Compass, 
  GraduationCap, 
  Video, 
  Headphones, 
  Quote, 
  Calendar, 
  Users, 
  FileText, 
  Sparkles,
  TrendingUp,
  Clock,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  Database,
  RefreshCw
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const {
    appSettings,
    wisdomList,
    sadhnaList,
    courseList,
    videoList,
    audioList,
    quoteList,
    sessionList,
    userList,
    auditLogs,
    editablePages,
    seedDatabase,
    currentUser,
  } = useCms();

  const [isSeeding, setIsSeeding] = useState(false);
  const [seedDone, setSeedDone] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      setSeedDone(true);
      setTimeout(() => setSeedDone(false), 3500);
    } catch (err) {
      console.warn('Manual seed status:', err);
    } finally {
      setIsSeeding(false);
    }
  };

  const publishedWisdom = wisdomList.filter((w) => w.status === 'published').length;
  const draftWisdom = wisdomList.filter((w) => w.status === 'draft').length;
  const trashCount = [
    ...wisdomList,
    ...sadhnaList,
    ...videoList,
    ...audioList,
    ...quoteList,
    ...courseList,
  ].filter((item) => item.status === 'trash').length;

  const upcomingSessions = sessionList.filter((s) => s.status === 'upcoming').length;

  const statCards = [
    { label: 'Total Users', value: userList.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', target: 'users' },
    { label: 'Wisdom Discourses', value: wisdomList.length, icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-500/10', sub: `${publishedWisdom} live · ${draftWisdom} drafts`, target: 'wisdom' },
    { label: 'Sadhna Routines', value: sadhnaList.length, icon: Compass, color: 'text-emerald-500', bg: 'bg-emerald-500/10', target: 'sadhna' },
    { label: 'Master Courses', value: courseList.length, icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-500/10', target: 'courses' },
    { label: 'Videos', value: videoList.length, icon: Video, color: 'text-rose-500', bg: 'bg-rose-500/10', target: 'videos' },
    { label: 'Audio Tracks', value: audioList.length, icon: Headphones, color: 'text-cyan-500', bg: 'bg-cyan-500/10', target: 'audio' },
    { label: 'Quotes', value: quoteList.length, icon: Quote, color: 'text-orange-500', bg: 'bg-orange-500/10', target: 'quotes' },
    { label: 'Live Sessions', value: upcomingSessions, icon: Calendar, color: 'text-indigo-500', bg: 'bg-indigo-500/10', sub: 'Upcoming', target: 'sessions' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Owner & Super Admin Command Center</span>
          </div>
          <h1 
            style={{ fontFamily: "'Cinzel', serif" }}
            className="text-2xl font-bold mt-1 text-white tracking-wide"
          >
            {appSettings.appName} Content Management System
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Complete WordPress-like control over application branding, home page layout, discourses, practices, video libraries, and users.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
              seedDone
                ? 'bg-emerald-900/60 border-emerald-500/50 text-emerald-300'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
            }`}
          >
            {isSeeding ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : seedDone ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Database className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>{isSeeding ? 'Syncing...' : seedDone ? 'Firestore Seeded!' : 'Sync Firestore'}</span>
          </button>
          <button
            onClick={() => onNavigate('branding')}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-medium border border-stone-700 transition-colors"
          >
            Edit Branding
          </button>
          <button
            onClick={() => onNavigate('home_builder')}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Home Builder
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              onClick={() => onNavigate(card.target)}
              className="p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 hover:bg-stone-850 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-medium">{card.label}</span>
                <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mt-2 tabular-nums">
                {card.value}
              </div>
              {card.sub && (
                <div className="text-[11px] text-stone-500 mt-1">
                  {card.sub}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Quick Actions & Recent Audit Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Content Creation Hub */}
        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-amber-500" />
              <span>Quick Create & Publish</span>
            </h3>
            <span className="text-[11px] text-stone-400">Zero Code Required</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => onNavigate('wisdom')}
              className="p-3 rounded-xl bg-stone-850 border border-stone-700/60 hover:border-amber-500/50 hover:bg-stone-800 text-left transition-all"
            >
              <div className="font-semibold text-stone-200">New Wisdom Article</div>
              <p className="text-[11px] text-stone-400 mt-0.5">Publish article or book chapter</p>
            </button>

            <button
              onClick={() => onNavigate('sadhna')}
              className="p-3 rounded-xl bg-stone-850 border border-stone-700/60 hover:border-amber-500/50 hover:bg-stone-800 text-left transition-all"
            >
              <div className="font-semibold text-stone-200">New Sadhna Routine</div>
              <p className="text-[11px] text-stone-400 mt-0.5">Yoga, Dhyana or Kayashunya 8</p>
            </button>

            <button
              onClick={() => onNavigate('sessions')}
              className="p-3 rounded-xl bg-stone-850 border border-stone-700/60 hover:border-amber-500/50 hover:bg-stone-800 text-left transition-all"
            >
              <div className="font-semibold text-stone-200">Schedule Live Session</div>
              <p className="text-[11px] text-stone-400 mt-0.5">Zoom / Meet satsang</p>
            </button>

            <button
              onClick={() => onNavigate('media')}
              className="p-3 rounded-xl bg-stone-850 border border-stone-700/60 hover:border-amber-500/50 hover:bg-stone-800 text-left transition-all"
            >
              <div className="font-semibold text-stone-200">Upload Media Asset</div>
              <p className="text-[11px] text-stone-400 mt-0.5">Photos, banners & audio</p>
            </button>
          </div>

          {trashCount > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
              <span className="text-amber-300">
                You have <strong>{trashCount}</strong> items in the Trash bin.
              </span>
              <button
                onClick={() => onNavigate('wisdom')}
                className="font-semibold text-amber-400 hover:underline"
              >
                View & Restore
              </button>
            </div>
          )}
        </div>

        {/* Real-time Audit Activity Feed */}
        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Admin Audit Activity Log</span>
            </h3>
            <button
              onClick={() => onNavigate('audit')}
              className="text-xs text-amber-400 hover:underline font-medium"
            >
              View Full Log
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 max-h-64 pr-1">
            {auditLogs.length === 0 ? (
              <div className="text-center py-8 text-xs text-stone-500">
                No recent admin activity recorded yet.
              </div>
            ) : (
              auditLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-lg bg-stone-850 border border-stone-800 text-xs flex items-start gap-2.5"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-200 truncate">
                        {log.details}
                      </span>
                      <span className="text-[10px] text-stone-500 shrink-0 ml-2">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5 flex items-center gap-2">
                      <span>{log.actorEmail}</span>
                      <span>·</span>
                      <span className="uppercase text-amber-400/80 font-mono text-[9px]">
                        {log.action}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
