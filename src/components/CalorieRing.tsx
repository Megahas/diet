interface Props {
  consumed: number;
  target: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function CalorieRing({ consumed, target, protein, carbs, fat }: Props) {
  const percent = Math.min(100, (consumed / target) * 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const over = consumed > target;

  return (
    <div className="rounded-3xl bg-white shadow-xl shadow-pink-100/60 border border-pink-50 p-5">
      <h2 className="text-gray-800 font-bold text-lg mb-4">🍽️ Today's Nutrition</h2>
      <div className="flex items-center gap-5">
        {/* Ring */}
        <div className="relative flex-shrink-0">
          <svg width="130" height="130" className="-rotate-90">
            <circle cx="65" cy="65" r={radius} fill="none" stroke="#fce7f3" strokeWidth="12" />
            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke={over ? "#ef4444" : "#ec4899"}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`text-2xl font-extrabold ${over ? "text-red-500" : "text-pink-600"}`}>
              {consumed}
            </p>
            <p className="text-gray-400 text-xs">/ {target} kcal</p>
            {over && <p className="text-red-400 text-xs font-bold">+{consumed - target} over</p>}
          </div>
        </div>

        {/* Macros */}
        <div className="flex-1 space-y-3">
          <MacroBar label="🥩 Protein" value={protein} max={150} color="bg-violet-400" unit="g" />
          <MacroBar label="🌾 Carbs" value={carbs} max={220} color="bg-amber-400" unit="g" />
          <MacroBar label="🫒 Fat" value={fat} max={65} color="bg-emerald-400" unit="g" />
        </div>
      </div>
    </div>
  );
}

function MacroBar({ label, value, max, color, unit }: { label: string; value: number; max: number; color: string; unit: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="text-gray-800 font-bold">{Math.round(value)}{unit}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
