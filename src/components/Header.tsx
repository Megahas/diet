
import { UserProfile, get7MonthProgress } from "../data/store";

interface Props {
  profile: UserProfile;
  todayCalories: number;
  onOpenProfile: () => void;
}

export default function Header({ profile, todayCalories, onOpenProfile }: Props) {
  const progress = get7MonthProgress(profile.startDate);
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Bonjour" : now.getHours() < 17 ? "Bonsoir" : "Bonne nuit";
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 p-5 shadow-xl shadow-pink-300/40">
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10" />
      <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute right-10 bottom-2 h-16 w-16 rounded-full bg-white/10" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-pink-100 text-sm font-medium">{dayName}, {dateStr}</p>
            <h1 className="text-white text-2xl font-bold mt-0.5">
              {greeting}, {profile.name.split(" ")[0]}! 💕
            </h1>
          </div>
          <button
            onClick={onOpenProfile}
            className="h-11 w-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl border border-white/30 active:scale-95 transition-transform"
          >
            👩
          </button>
        </div>

        {/* 7-Month Journey Bar */}
        <div className="mt-4 rounded-2xl bg-white/15 backdrop-blur-sm p-3 border border-white/20">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-white text-xs font-semibold">🌸 7-Month Journey</span>
            <span className="text-pink-100 text-xs">Day {progress.day} · {progress.daysLeft} days left</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white transition-all duration-700"
              style={{ width: `${Math.max(2, progress.percent)}%` }}
            />
          </div>
          <p className="text-pink-100 text-xs mt-1 text-right">{progress.percent}% complete ✨</p>
        </div>

        {/* Quick calorie peek */}
        <div className="mt-3 flex gap-2">
          <div className="flex-1 rounded-2xl bg-white/15 backdrop-blur-sm p-2.5 border border-white/20 text-center">
            <p className="text-white text-lg font-bold">{todayCalories}</p>
            <p className="text-pink-100 text-xs">kcal today</p>
          </div>
          <div className="flex-1 rounded-2xl bg-white/15 backdrop-blur-sm p-2.5 border border-white/20 text-center">
            <p className="text-white text-lg font-bold">{profile.targetCalories}</p>
            <p className="text-pink-100 text-xs">daily goal</p>
          </div>
          <div className="flex-1 rounded-2xl bg-white/15 backdrop-blur-sm p-2.5 border border-white/20 text-center">
            <p className="text-white text-lg font-bold">{Math.max(0, profile.targetCalories - todayCalories)}</p>
            <p className="text-pink-100 text-xs">remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
