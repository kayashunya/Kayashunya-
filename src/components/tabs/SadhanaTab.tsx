import { useState, useEffect } from 'react';
import { Flame, Clock, Play, Pause, RotateCcw, Check, Sparkles, Volume2 } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { playMeditationBell } from '../../utils/audioChime';

interface SadhanaTabProps {
  streakDays: number;
}

export function SadhanaTab({ streakDays }: SadhanaTabProps) {
  const { sadhnaList } = useCms();
  const publishedSadhna = sadhnaList.filter((s) => s.status === 'published');

  // Completed items tracked locally for today
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({
    sadhna_1: true,
    sadhna_2: true,
  });

  // Timer State
  const [selectedMinutes, setSelectedMinutes] = useState<number>(15);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const completedCount = Object.values(completedIds).filter(Boolean).length;
  const completedMinutes = publishedSadhna
    .filter((s) => completedIds[s.id])
    .reduce((sum, s) => sum + s.durationMinutes, 0);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      if (soundEnabled) {
        playMeditationBell();
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, soundEnabled]);

  const handleStartTimer = () => {
    if (soundEnabled) {
      playMeditationBell();
    }
    setIsRunning(true);
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = (minutes: number) => {
    setIsRunning(false);
    setSelectedMinutes(minutes);
    setSecondsRemaining(minutes * 60);
  };

  const handleToggleActivity = (id: string) => {
    setCompletedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalSeconds = selectedMinutes * 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsRemaining) / totalSeconds) * 100 : 0;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="px-4 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
          Discipline of the Soul
        </span>
        <h2 
          style={{ fontFamily: "'Cinzel', serif" }}
          className="text-xl font-bold text-stone-900"
        >
          Sadhana & Practice
        </h2>
      </div>

      {/* Top Metric Cards: Streak & Minutes */}
      <div className="px-4 grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <Flame className="w-5 h-5 text-amber-700 fill-amber-700" />
            <span className="text-[11px] text-stone-400">Consistency</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-stone-900 tabular-nums">
            {streakDays} <span className="text-sm font-normal text-stone-500">Days</span>
          </div>
          <p className="mt-0.5 text-[11px] text-stone-500">
            Active Sadhaka Streak
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-amber-700" />
            <span className="text-[11px] text-stone-400">Today</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-stone-900 tabular-nums">
            {completedMinutes} <span className="text-sm font-normal text-stone-500">Mins</span>
          </div>
          <p className="mt-0.5 text-[11px] text-stone-500">
            {completedCount} of {publishedSadhna.length} routines done
          </p>
        </div>
      </div>

      {/* Interactive Silent Dhyana Meditation Timer */}
      <div className="px-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <h3 
                style={{ fontFamily: "'Cinzel', serif" }}
                className="text-sm font-bold text-stone-900"
              >
                Silent Dhyana Timer
              </h3>
            </div>

            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playMeditationBell();
              }}
              className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-colors ${
                soundEnabled
                  ? 'border-amber-200 bg-amber-50 text-amber-800'
                  : 'border-stone-200 text-stone-400'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{soundEnabled ? 'Bell Chime On' : 'Muted'}</span>
            </button>
          </div>

          {/* Dial Graphic */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-stone-100"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-amber-700 transition-all duration-300"
                strokeWidth="6"
                strokeDasharray={276.46}
                strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span 
                style={{ fontFamily: "'Cinzel', serif" }}
                className="text-3xl font-bold text-stone-900 tabular-nums tracking-tight"
              >
                {formatTimer(secondsRemaining)}
              </span>
              <span className="text-[11px] text-stone-500 mt-0.5">
                {isRunning ? 'Breathing in silence' : 'Ready to sit'}
              </span>
            </div>
          </div>

          {/* Duration Selector Buttons */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {[5, 10, 15, 20].map((mins) => (
              <button
                key={mins}
                onClick={() => handleResetTimer(mins)}
                disabled={isRunning}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedMinutes === mins
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {mins}m
              </button>
            ))}
          </div>

          {/* Action Trigger Buttons */}
          <div className="mt-5 flex items-center justify-center gap-3">
            {isRunning ? (
              <button
                onClick={handlePauseTimer}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Pause Sitting</span>
              </button>
            ) : (
              <button
                onClick={handleStartTimer}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Begin Sitting</span>
              </button>
            )}

            <button
              onClick={() => handleResetTimer(selectedMinutes)}
              className="p-2.5 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors"
              aria-label="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Daily Sadhana Routines Checklist from CMS */}
      <div className="px-4 space-y-2.5">
        <div className="flex items-center justify-between pt-2">
          <h3 
            style={{ fontFamily: "'Cinzel', serif" }}
            className="text-sm font-bold text-stone-900 uppercase tracking-wider"
          >
            Daily Sadhana Routines
          </h3>
          <span className="text-xs text-stone-400">
            {completedCount}/{publishedSadhna.length} Complete
          </span>
        </div>

        {publishedSadhna.map((act) => {
          const isDone = !!completedIds[act.id];
          return (
            <div
              key={act.id}
              onClick={() => handleToggleActivity(act.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                isDone
                  ? 'bg-amber-50/50 border-amber-200 text-stone-700'
                  : 'bg-white border-stone-200 text-stone-900 hover:border-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                  isDone
                    ? 'bg-amber-700 text-white shadow-2xs'
                    : 'border border-stone-300 bg-stone-50'
                }`}
              >
                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs font-bold ${
                      isDone ? 'line-through text-stone-400' : 'text-stone-900'
                    }`}
                  >
                    {act.title}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-medium font-mono">
                    {act.timeOfDay || 'Morning'}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                  {act.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-stone-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>{act.durationMinutes} mins</span>
                  </span>
                  <span>·</span>
                  <span>{act.difficulty}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
