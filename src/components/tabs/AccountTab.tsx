import { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Bell, 
  Globe, 
  HelpCircle, 
  LogOut, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { OWNER_EMAIL } from '../../firebase/config';

interface AccountTabProps {
  onOpenAdmin: () => void;
}

export function AccountTab({ onOpenAdmin }: AccountTabProps) {
  const { 
    currentUser, 
    isOwnerOrAdmin, 
    loginAsOwner, 
    loginAsUser, 
    signInWithGoogle,
    logout, 
    appSettings 
  } = useCms();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const finalName = name.trim() ? name.trim() : email.split('@')[0];
    loginAsUser(email, finalName);
    setStatusMessage(isSignUp ? 'Account created successfully!' : 'Signed in successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="px-4 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
          Membership & Path
        </span>
        <h2 
          style={{ fontFamily: "'Cinzel', serif" }}
          className="text-xl font-bold text-stone-900"
        >
          Account & Profile
        </h2>
      </div>

      {statusMessage && (
        <div className="mx-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Owner Admin Quick Access Banner */}
      <div className="mx-4 p-4 rounded-2xl bg-gradient-to-r from-amber-900 to-stone-900 text-white shadow-xs border border-amber-800/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Owner CMS</span>
          </div>
          <h4 className="text-xs font-bold text-white mt-1">
            Owner Content Administration
          </h4>
          <p className="text-[11px] text-stone-300">
            Manage branding, home layout, discourses, practices & users.
          </p>
        </div>

        <button
          onClick={() => {
            if (!isOwnerOrAdmin) loginAsOwner();
            onOpenAdmin();
          }}
          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shrink-0 shadow-xs transition-colors flex items-center gap-1"
        >
          <span>Open CMS</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* If Not Logged In: Sign In / Sign Up Card */}
      {!currentUser ? (
        <div className="px-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <h3 
              style={{ fontFamily: "'Cinzel', serif" }}
              className="text-base font-bold text-stone-900"
            >
              {isSignUp ? `Join the ${appSettings.appName} Circle` : 'Welcome Back, Seeker'}
            </h3>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              {isSignUp
                ? 'Create an account to synchronize your reading progress, notes, and sadhana streaks across all devices.'
                : 'Enter your credentials to continue your journey of inner inquiry.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              {isSignUp && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seeker@kayashunya.org"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                {isSignUp ? `Create ${appSettings.appName} Account` : 'Sign In'}
              </button>
            </form>

            <div className="mt-3">
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-amber-800 font-semibold hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Create Free Account'}
              </button>

              <button
                type="button"
                onClick={loginAsOwner}
                className="text-stone-500 hover:text-amber-800 font-mono text-[11px]"
              >
                Sign in as Owner
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* If Logged In: Profile Card & Settings */
        <div className="space-y-4 px-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-bold text-lg shadow-2xs">
                {currentUser.displayName.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-sm text-stone-900">{currentUser.displayName}</h3>
                <p className="text-xs text-stone-500">{currentUser.email}</p>
                <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="capitalize">{currentUser.role === 'super_admin' ? 'Owner / Super Admin' : 'Wisdom Circle Member'}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-stone-100 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-base font-bold text-stone-900 tabular-nums">
                  {currentUser.totalHoursRead}h
                </div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                  Read Time
                </div>
              </div>
              <div>
                <div className="text-base font-bold text-stone-900 tabular-nums">
                  {currentUser.streakDays}d
                </div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                  Streak
                </div>
              </div>
              <div>
                <div className="text-base font-bold text-stone-900 tabular-nums">
                  {currentUser.booksCompleted}
                </div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                  Books Done
                </div>
              </div>
            </div>
          </div>

          {/* Membership Tier Banner */}
          <div className="p-4.5 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border border-amber-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 
                style={{ fontFamily: "'Cinzel', serif" }}
                className="text-xs font-bold text-amber-950"
              >
                {appSettings.appName} Circle Member
              </h4>
              <p className="text-[11px] text-amber-900/80 mt-0.5">
                Full access to all commentaries, e-books & guided satsangs.
              </p>
            </div>
          </div>

          {/* Settings & Preferences List */}
          <div className="rounded-2xl bg-white border border-stone-200 shadow-2xs divide-y divide-stone-100 overflow-hidden">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-stone-500" />
                <div>
                  <div className="text-xs font-semibold text-stone-800">
                    Daily Sadhana Reminder
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Gentle chime at 6:00 AM for dawn contemplation
                  </div>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  notifications ? 'bg-amber-800' : 'bg-stone-200'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-stone-500" />
                <div>
                  <div className="text-xs font-semibold text-stone-800">
                    Scripture Language
                  </div>
                  <div className="text-[11px] text-stone-400">
                    English translation with original Sanskrit
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-amber-800">English + Devanagari</span>
            </div>

            <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-stone-500" />
                <div>
                  <div className="text-xs font-semibold text-stone-800">
                    Ashram Helpdesk: {appSettings.contactEmail}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Guidance for questions on verses and teachings
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full p-3.5 flex items-center gap-3 text-red-600 hover:bg-red-50/50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-xs font-semibold">Sign Out from Device</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
