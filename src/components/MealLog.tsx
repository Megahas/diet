import { LoggedFood } from "../data/store";

interface Props {
  foods: LoggedFood[];
  onDelete: (id: string) => void;
}

const MEAL_ORDER = ["Breakfast", "Lunch", "Dinner", "Snack"];
const MEAL_ICONS: Record<string, string> = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
  Snack: "🍿",
};
const MEAL_COLORS: Record<string, string> = {
  Breakfast: "from-amber-400 to-orange-500",
  Lunch: "from-green-400 to-emerald-500",
  Dinner: "from-violet-400 to-purple-600",
  Snack: "from-pink-400 to-rose-500",
};

export default function MealLog({ foods, onDelete }: Props) {
  const grouped = MEAL_ORDER.reduce((acc, meal) => {
    acc[meal] = foods.filter((f) => f.meal === meal);
    return acc;
  }, {} as Record<string, LoggedFood[]>);

  const hasAny = foods.length > 0;

  return (
    <div className="space-y-3">
      <h2 className="text-gray-800 font-bold text-lg">📋 Today's Log</h2>
      {!hasAny && (
        <div className="rounded-3xl bg-white border-2 border-dashed border-pink-200 p-8 text-center">
          <p className="text-4xl mb-2">🌸</p>
          <p className="text-gray-500 font-medium">No food logged yet today</p>
          <p className="text-gray-400 text-sm mt-1">Tap + to add your meals!</p>
        </div>
      )}
      {MEAL_ORDER.map((meal) => {
        const items = grouped[meal];
        if (!items || items.length === 0) return null;
        const total = items.reduce((s, f) => s + f.calories, 0);
        return (
          <div key={meal} className="rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden">
            {/* Meal header */}
            <div className={`bg-gradient-to-r ${MEAL_COLORS[meal]} px-4 py-2 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{MEAL_ICONS[meal]}</span>
                <span className="text-white font-bold text-sm">{meal}</span>
              </div>
              <span className="text-white/90 text-xs font-semibold">{total} kcal</span>
            </div>
            {/* Items */}
            <div className="divide-y divide-gray-50">
              {items.map((food) => (
                <div key={food.id} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="text-xl w-7 text-center">{food.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-semibold text-sm truncate">{food.name}</p>
                    <p className="text-gray-400 text-xs">×{food.servings} · P:{food.protein}g C:{food.carbs}g F:{food.fat}g</p>
                  </div>
                  <div className="text-right mr-2">
                    <p className="text-pink-600 font-bold text-sm">{food.calories}</p>
                    <p className="text-gray-400 text-xs">kcal</p>
                  </div>
                  <button
                    onClick={() => onDelete(food.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors p-1 text-lg"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
