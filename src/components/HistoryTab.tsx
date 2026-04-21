import { DayLog } from "../data/store";

interface Props {
  logs: Record<string, DayLog>;
  targetCalories: number;
}

export default function HistoryTab({ logs, targetCalories }: Props) {
  const entries = Object.values(logs).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  };

  const totalDays = entries.length;
  const avgCalories = totalDays > 0
    ? Math.round(entries.reduce((s, e) => s + e.foods.reduce((fs, f) => fs + f.calories, 0), 0) / totalDays)
    : 0;
  const goodDays = entries.filter(e => {
    const cal = e.foods.reduce((s, f) => s + f.calories, 0);
    return cal > 0 && cal <= targetCalories;
  }).length;

  return (
    <div className="space-y-4 pb-8">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Days Logged" value={totalDays} emoji="📅" color="from-violet-400 to-purple-600" />
        <StatCard label="Avg Calories" value={avgCalories} emoji="🔥" color="from-rose-400 to-pink-600" />
        <StatCard label="Goal Days" value={goodDays} emoji="✅" color="from-emerald-400 to-green-600" />
      </div>

      <h2 className="text-gray-800 font-bold text-lg">📜 History (Last 30 days)</h2>

      {entries.length === 0 && (
        <div className="rounded-3xl bg-white border-2 border-dashed border-pink-200 p-10 text-center">
          <p className="text-4xl mb-2">🌱</p>
          <p className="text-gray-500 font-medium">No history yet!</p>
          <p className="text-gray-400 text-sm mt-1">Start logging today to see your progress 💕</p>
        </div>
      )}

      {entries.map((entry) => {
        const cal = entry.foods.reduce((s, f) => s + f.calories, 0);
        const pct = Math.min(100, (cal / (entry.targetCalories || targetCalories)) * 100);
        const isOver = cal > (entry.targetCalories || targetCalories);
        const water = entry.water;
        const foodCount = entry.foods.length;

        return (
          <div key={entry.date} className="rounded-3xl bg-white shadow-sm border border-gray-100 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-800 font-bold text-sm">{formatDate(entry.date)}</p>
                <p className="text-gray-400 text-xs mt-0.5">{foodCount} items · {water} 💧 glasses</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-extrabold ${isOver ? "text-red-500" : "text-pink-600"}`}>{cal}</p>
                <p className="text-gray-400 text-xs">kcal</p>
              </div>
            </div>

            <div className="h-2 rounded-full bg-gray-100 mb-2">
              <div
                className={`h-full rounded-full transition-all ${isOver ? "bg-red-400" : "bg-gradient-to-r from-rose-400 to-pink-500"}`}
                style={{ width: `${Math.max(2, pct)}%` }}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {entry.foods.slice(0, 5).map((f) => (
                <span key={f.id} className="text-xs bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full border border-pink-100">
                  {f.emoji} {f.name}
                </span>
              ))}
              {entry.foods.length > 5 && (
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  +{entry.foods.length - 5} more
                </span>
              )}
            </div>

            {isOver && (
              <p className="text-red-400 text-xs mt-2 font-medium">⚠️ {cal - (entry.targetCalories || targetCalories)} kcal over goal</p>
            )}
            {!isOver && cal > 0 && (
              <p className="text-emerald-500 text-xs mt-2 font-medium">✅ Within goal! Amazing! 💪</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ label, value, emoji, color }: { label: string; value: number; emoji: string; color: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${color} p-3 text-center shadow-sm`}>
      <p className="text-2xl">{emoji}</p>
      <p className="text-white font-extrabold text-xl leading-tight">{value}</p>
      <p className="text-white/80 text-xs mt-0.5">{label}</p>
    </div>
  );
}
