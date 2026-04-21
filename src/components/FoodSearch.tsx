import { useState, useMemo } from "react";
import { FOOD_DATABASE, CATEGORIES, Food } from "../data/foods";
import { LoggedFood } from "../data/store";

interface Props {
  onAdd: (entry: Omit<LoggedFood, "id" | "timestamp">) => void;
  onClose: () => void;
}

const MEALS = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;

export default function FoodSearch({ onAdd, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Food | null>(null);
  const [servings, setServings] = useState(1);
  const [meal, setMeal] = useState<"Breakfast" | "Lunch" | "Dinner" | "Snack">("Lunch");

  const filtered = useMemo(() => {
    let foods = FOOD_DATABASE;
    if (category !== "All") foods = foods.filter((f) => f.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      foods = foods.filter((f) => f.name.toLowerCase().includes(q));
    }
    return foods.slice(0, 80);
  }, [query, category]);

  const handleAdd = () => {
    if (!selected) return;
    onAdd({
      foodId: selected.id,
      name: selected.name,
      calories: Math.round(selected.calories * servings),
      protein: Math.round(selected.protein * servings * 10) / 10,
      carbs: Math.round(selected.carbs * servings * 10) / 10,
      fat: Math.round(selected.fat * servings * 10) / 10,
      emoji: selected.emoji,
      servings,
      meal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-4 pt-12 pb-4 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onClose} className="text-white/80 p-1 active:scale-95 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white font-bold text-xl flex-1">Add Food 🍽️</h2>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search 500+ foods..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl bg-white pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 text-sm outline-none shadow-sm focus:ring-2 focus:ring-pink-300"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">✕</button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide bg-white border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              category === cat
                ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-2">🤷‍♀️</p>
            <p className="text-sm">No foods found. Try another search!</p>
          </div>
        )}
        {filtered.map((food) => (
          <button
            key={food.id}
            onClick={() => setSelected(selected?.id === food.id ? null : food)}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left ${
              selected?.id === food.id
                ? "border-pink-400 bg-pink-50 shadow-md shadow-pink-100"
                : "border-transparent bg-white shadow-sm hover:shadow-md"
            }`}
          >
            <span className="text-2xl w-8 text-center flex-shrink-0">{food.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 font-semibold text-sm truncate">{food.name}</p>
              <p className="text-gray-400 text-xs">{food.category}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-pink-600 font-bold text-sm">{food.calories}</p>
              <p className="text-gray-400 text-xs">kcal</p>
            </div>
            {selected?.id === food.id && (
              <span className="text-pink-500 text-lg">✓</span>
            )}
          </button>
        ))}
        <p className="text-center text-gray-300 text-xs py-2">Showing {filtered.length} of {FOOD_DATABASE.length} foods</p>
      </div>

      {/* Bottom panel - shows when food selected */}
      {selected && (
        <div className="bg-white border-t border-gray-100 shadow-2xl px-4 pt-4 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{selected.emoji}</span>
            <div className="flex-1">
              <p className="font-bold text-gray-800">{selected.name}</p>
              <div className="flex gap-2 text-xs text-gray-500 mt-0.5">
                <span>P: {Math.round(selected.protein * servings)}g</span>
                <span>C: {Math.round(selected.carbs * servings)}g</span>
                <span>F: {Math.round(selected.fat * servings)}g</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-pink-600 font-extrabold text-xl">{Math.round(selected.calories * servings)}</p>
              <p className="text-gray-400 text-xs">kcal</p>
            </div>
          </div>

          {/* Servings */}
          <div className="flex items-center gap-3 mb-3">
            <p className="text-sm font-semibold text-gray-700">Servings:</p>
            <div className="flex items-center gap-2 flex-1">
              <button onClick={() => setServings(s => Math.max(0.5, s - 0.5))} className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center active:scale-95">−</button>
              <span className="flex-1 text-center font-bold text-gray-800">{servings}x</span>
              <button onClick={() => setServings(s => Math.min(10, s + 0.5))} className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center active:scale-95">+</button>
            </div>
          </div>

          {/* Meal type */}
          <div className="flex gap-2 mb-4">
            {MEALS.map((m) => (
              <button
                key={m}
                onClick={() => setMeal(m)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  meal === m ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-base shadow-lg shadow-pink-300/50 active:scale-98 transition-transform"
          >
            Add to {meal} ✨
          </button>
        </div>
      )}
    </div>
  );
}
