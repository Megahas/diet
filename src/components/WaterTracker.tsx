interface Props {
  current: number;
  target: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function WaterTracker({ current, target, onAdd, onRemove }: Props) {
  const ml = current * 250;
  const percent = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 p-4 shadow-xl shadow-blue-300/40">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-white font-bold text-lg">💧 Water Intake</h2>
          <p className="text-blue-100 text-xs">{ml}ml / {target * 250}ml</p>
        </div>
        <div className="text-right">
          <p className="text-white text-2xl font-extrabold">{current}<span className="text-base font-medium text-blue-100">/{target}</span></p>
          <p className="text-blue-100 text-xs">glasses</p>
        </div>
      </div>

      {/* Glasses visual */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {Array.from({ length: target }).map((_, i) => (
          <div
            key={i}
            className={`h-8 w-8 rounded-xl flex items-center justify-center text-lg border-2 transition-all duration-300 ${
              i < current
                ? "bg-white/90 border-white scale-100"
                : "bg-white/20 border-white/30 scale-95"
            }`}
          >
            {i < current ? "💧" : "🫙"}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-white/25 mb-3">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onRemove}
          disabled={current <= 0}
          className="flex-1 py-2 rounded-2xl bg-white/20 text-white font-bold text-lg border border-white/30 active:scale-95 transition-transform disabled:opacity-40"
        >
          −
        </button>
        <button
          onClick={onAdd}
          disabled={current >= target * 2}
          className="flex-[2] py-2 rounded-2xl bg-white text-blue-600 font-bold text-sm active:scale-95 transition-transform shadow-sm"
        >
          + Add Glass (250ml)
        </button>
      </div>

      {percent >= 100 && (
        <p className="text-white text-center text-sm mt-2 font-semibold animate-bounce">
          🎉 Goal reached! You're glowing! ✨
        </p>
      )}
    </div>
  );
}
