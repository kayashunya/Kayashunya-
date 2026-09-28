import { CheckCircle2, Shield, Layers, Smartphone, BookOpen, Compass, Palette } from 'lucide-react';

export function ArchitectureDocs() {
  return (
    <div className="h-full overflow-y-auto bg-stone-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Shield className="w-4 h-4 text-amber-700" />
            <span>Architectural Blueprint</span>
          </div>
          <h1 
            style={{ fontFamily: "'Cinzel', serif" }}
            className="text-2xl md:text-3xl font-bold text-stone-900 mt-2"
          >
            Kayasun: Minimalist Spiritual App Architecture
          </h1>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Engineered to closely mirror the minimalist, peaceful, and content-focused design of the <strong>Acharya Prashant</strong> app (<code className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-mono text-xs">org.acharyaprashant.apbooks</code>).
          </p>
        </div>

        {/* 1. App Layout & Navigation Specifications */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-2xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h2 
              style={{ fontFamily: "'Cinzel', serif" }}
              className="text-lg font-bold text-stone-900"
            >
              App Layout & Navigation Specifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-700" />
                <span>1. Top App Bar (Header)</span>
              </h3>
              <ul className="space-y-1.5 text-stone-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Brand Title:</strong> "Kayasun" with warm sun-lotus emblem and Cinzel display serif typography.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Three-Dot Overflow Menu:</strong> Right-aligned popup menu with Community Satsang, Profile & Bookmarks, and Settings / Ashram Helpdesk.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <h3 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-700" />
                <span>2. Strictly 4-Tab Bottom Navigation</span>
              </h3>
              <ul className="space-y-1.5 text-stone-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tab 1: Home:</strong> Daily wisdom sutra cards, audio discourses, highlights, 1-tap WhatsApp sharing.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tab 2: Wisdom:</strong> E-Books catalog, articles, quotes, search & topic filters.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tab 3: Sadhana:</strong> Practice tracker, interactive Dhyana timer, daily routine checklist.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tab 4: Account:</strong> Seeker authentication, Wisdom Circle subscription, and settings.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Visual Design & Theme */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-2xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h2 
              style={{ fontFamily: "'Cinzel', serif" }}
              className="text-lg font-bold text-stone-900"
            >
              Visual Design & Palette Palette Harmony
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-stone-200 bg-[#FAF8F5]">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-stone-300 mb-2" />
              <div className="font-bold text-xs text-stone-900">Warm Off-White Canvas</div>
              <div className="text-[11px] font-mono text-stone-500">#FAF8F5 & #FFFFFF</div>
              <p className="mt-1 text-[11px] text-stone-600">Peaceful background preventing harsh screen glare.</p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-white">
              <div className="w-8 h-8 rounded-lg bg-[#1F2937] mb-2" />
              <div className="font-bold text-xs text-stone-900">Soft Charcoal Typography</div>
              <div className="text-[11px] font-mono text-stone-500">#1F2937 (WCAG AAA)</div>
              <p className="mt-1 text-[11px] text-stone-600">Deep, gentle contrast for hours of fatigue-free reading.</p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-amber-50/50">
              <div className="w-8 h-8 rounded-lg bg-[#C25E00] mb-2" />
              <div className="font-bold text-xs text-stone-900">Spiritual Saffron Accent</div>
              <div className="text-[11px] font-mono text-stone-500">#C25E00 & #D97706</div>
              <p className="mt-1 text-[11px] text-stone-600">Sacred ochre for active tabs, CTAs, and prayer highlights.</p>
            </div>
          </div>
        </div>

        {/* 3. Distraction-Free Reader & Sadhana Engine */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h2 
              style={{ fontFamily: "'Cinzel', serif" }}
              className="text-lg font-bold text-stone-900"
            >
              Reader & Sadhana Engine Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 font-bold text-stone-900 mb-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Distraction-Free E-Reader View</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Full-screen reading environment with dynamic font scaling (14px–26px), authentic 3-color mode engine (Sepia Parchment <code className="font-mono text-amber-800">#F5EDE0</code>, Pure White, Midnight Charcoal <code className="font-mono text-amber-800">#18181B</code>), top reading progress bar, and instant quote clipping.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 font-bold text-stone-900 mb-2">
                <Compass className="w-4 h-4 text-amber-700" />
                <span>Sadhana Tracker & Dhyana Bell</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Features customizable silent sitting durations (5, 10, 15, 20 mins) with resonant singing bowl chimes (synthesized at 528 Hz via Web Audio API in preview and native audio in Flutter), streak tracking, and daily routine checklists (Dhyana, Swadhyaya, Pranayama, Atma-Vichara).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
