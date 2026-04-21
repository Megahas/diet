interface Props {
  data: { date: string; calories: number; target: number }[];
}

export default function WeekChart({ data }: Props) {
  const maxVal = Math.max(...data.map((d) => Math.max(d.calories, d.target)), 1);

  return (
    <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-5">
      <h2 className="text-gray-800 font-bold text-lg mb-4">📊 This Week</h2>
      <div className="flex items-end gap-2 h-28">
        {data.map((d, i) => {
          const calH = Math.max(4, (d.calories / maxVal) * 100);
          const isToday = i === data.length - 1;
          const over = d.calories > d.target;
          return (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
              <p className="text-xs text-gray-500 font-medium" style={{ fontSize: "10px" }}>
                {d.calories > 0 ? d.calories : ""}
              </p>
              <div className="w-full flex flex-col justify-end" style={{ height: "80px" }}>
                <div
                  className={`w-full rounded-t-xl transition-all duration-700 ${
                    over ? "bg-red-400" : isToday ? "bg-gradient-to-t from-rose-500 to-pink-400" : "bg-pink-200"
                  }`}
                  style={{ height: `${calH}%` }}
                />
              </div>
              <p className={`text-xs font-semibold ${isToday ? "text-pink-600" : "text-gray-400"}`}>{d.date}</p>
            </div>
          );
        })}
      </div>
      {/* Target line indicator */}
      <div className="flex items-center gap-2 mt-3">
        <div className="h-1 w-4 rounded-full bg-pink-200" />
        <span className="text-xs text-gray-400">Below goal</span>
        <div className="h-1 w-4 rounded-full bg-pink-500 ml-2" />
        <span className="text-xs text-gray-400">Today</span>
        <div className="h-1 w-4 rounded-full bg-red-400 ml-2" />
        <span className="text-xs text-gray-400">Over goal</span>
      </div>
    </div>
  );
}
