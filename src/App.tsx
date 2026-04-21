import { useState, useEffect, useCallback } from "react";
import {
  loadProfile,
  saveProfile,
  loadLogs,
  saveLogs,
  getTodayKey,
  getTodayLog,
  getWeekProgress,
  UserProfile,
  LoggedFood,
  DayLog,
} from "./data/store";
import Header from "./components/Header";
import WaterTracker from "./components/WaterTracker";
import CalorieRing from "./components/CalorieRing";
import MealLog from "./components/MealLog";
import FoodSearch from "./components/FoodSearch";
import WeekChart from "./components/WeekChart";
import HistoryTab from "./components/HistoryTab";
import TipsTab from "./components/TipsTab";
import ProfileModal from "./components/ProfileModal";

type Tab = "home" | "history" | "tips";

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [logs, setLogs] = useState<Record<string, DayLog>>(loadLogs);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Check if first time
  useEffect(() => {
    const seen = localStorage.getItem("diet_seen");
    if (!seen) {
      setShowWelcome(true);
      localStorage.setItem("diet_seen", "1");
    }
  }, []);

  const todayLog = getTodayLog(logs, profile);
  const weekData = getWeekProgress(logs);

  const todayCalories = todayLog.foods.reduce((s, f) => s + f.calories, 0);
  const todayProtein = todayLog.foods.reduce((s, f) => s + f.protein, 0);
  const todayCarbs = todayLog.foods.reduce((s, f) => s + f.carbs, 0);
  const todayFat = todayLog.foods.reduce((s, f) => s + f.fat, 0);

  const updateTodayLog = useCallback((newLog: DayLog) => {
    const key = getTodayKey();
    const updated = { ...logs, [key]: newLog };
    setLogs(updated);
    saveLogs(updated);
  }, [logs]);

  const handleAddFood = (entry: Omit<LoggedFood, "id" | "timestamp">) => {
    const id = Date.now().toString();
    const newFood: LoggedFood = { ...entry, id, timestamp: Date.now() };
    const newLog = { ...todayLog, foods: [...todayLog.foods, newFood] };
    updateTodayLog(newLog);
  };

  const handleDeleteFood = (foodId: string) => {
    const newLog = { ...todayLog, foods: todayLog.foods.filter((f) => f.id !== foodId) };
    updateTodayLog(newLog);
  };

  const handleWaterAdd = () => {
    const newLog = { ...todayLog, water: todayLog.water + 1 };
    updateTodayLog(newLog);
  };

  const handleWaterRemove = () => {
    const newLog = { ...todayLog, water: Math.max(0, todayLog.water - 1) };
    updateTodayLog(newLog);
  };

  const handleSaveProfile = (p: UserProfile) => {
    setProfile(p);
    saveProfile(p);
  };

  // Calorie feedback message
  const getCalorieMessage = () => {
    const remaining = profile.targetCalories - todayCalories;
    if (todayCalories === 0) return { msg: "Start logging your meals! 🌸", color: "text-gray-500" };
    if (remaining > 600) return { msg: "You have plenty of room left! Eat well 🍽️", color: "text-emerald-600" };
    if (remaining > 200) return { msg: "Looking great! Almost at goal 💪", color: "text-amber-600" };
    if (remaining > 0) return { msg: "Almost there! Just a little more 🎯", color: "text-orange-500" };
    if (remaining === 0) return { msg: "Perfect! Goal reached! 🎉", color: "text-pink-600" };
    return { msg: `${Math.abs(remaining)} kcal over today 😅`, color: "text-red-500" };
  };

  const feedback = getCalorieMessage();

  return (
    <div
      className="min-h-screen bg-gray-50 flex justify-center"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* iPhone frame wrapper */}
      <div className="w-full max-w-sm min-h-screen flex flex-col relative bg-gray-50">

        {/* Welcome splash */}
        {showWelcome && (
          <div className="fixed inset-0 z-[100] bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-7xl mb-4 animate-bounce">🌸</div>
            <h1 className="text-white text-3xl font-extrabold leading-tight">Bonjour,<br />Ma Chérie! 💕</h1>
            <p className="text-pink-100 mt-4 text-base">Your 7-month wellness journey starts now. Track calories, water, and build healthy habits every day!</p>
            <div className="mt-6 space-y-2 text-white/80 text-sm">
              <p>🍛 500+ French, Asian & Everyday Foods</p>
              <p>💧 Water tracking</p>
              <p>📊 Weekly progress charts</p>
              <p>💡 Health tips & motivation</p>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="mt-8 w-full py-4 rounded-2xl bg-white text-pink-600 font-extrabold text-lg shadow-xl active:scale-95 transition-transform"
            >
              Let's Start! 🚀
            </button>
          </div>
        )}

        {/* Food Search overlay */}
        {showFoodSearch && (
          <FoodSearch onAdd={handleAddFood} onClose={() => setShowFoodSearch(false)} />
        )}

        {/* Profile overlay */}
        {showProfile && (
          <ProfileModal profile={profile} onSave={handleSaveProfile} onClose={() => setShowProfile(false)} />
        )}

        {/* Status bar spacer (iPhone notch) */}
        <div className="h-12 bg-gray-50 flex-shrink-0" />

        {/* Main scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-4">
          {/* HOME TAB */}
          {activeTab === "home" && (
            <>
              <Header
                profile={profile}
                todayCalories={todayCalories}
                onOpenProfile={() => setShowProfile(true)}
              />

              {/* Feedback message */}
              <p className={`text-center text-sm font-semibold ${feedback.color}`}>
                {feedback.msg}
              </p>

              <CalorieRing
                consumed={todayCalories}
                target={profile.targetCalories}
                protein={todayProtein}
                carbs={todayCarbs}
                fat={todayFat}
              />

              <WaterTracker
                current={todayLog.water}
                target={profile.targetWater}
                onAdd={handleWaterAdd}
                onRemove={handleWaterRemove}
              />

              <WeekChart data={weekData} />

              <MealLog foods={todayLog.foods} onDelete={handleDeleteFood} />

              {/* Spacer */}
              <div className="h-4" />
            </>
          )}

          {/* HISTORY TAB */}
          {activeTab === "history" && (
            <>
              <div className="h-2" />
              <HistoryTab logs={logs} targetCalories={profile.targetCalories} />
            </>
          )}

          {/* TIPS TAB */}
          {activeTab === "tips" && (
            <>
              <div className="h-2" />
              <TipsTab />
            </>
          )}
        </div>

        {/* FAB - Add Food */}
        {activeTab === "home" && (
          <button
            onClick={() => setShowFoodSearch(true)}
            className="fixed bottom-24 right-5 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-pink-400/50 active:scale-90 transition-transform border-4 border-white"
          >
            <span className="text-white text-2xl font-bold leading-none">+</span>
          </button>
        )}

        {/* Bottom nav bar */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 flex safe-area-pb shadow-2xl shadow-black/10">
          <NavBtn icon="🏠" label="Home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <NavBtn icon="📊" label="History" active={activeTab === "history"} onClick={() => setActiveTab("history")} />
          <NavBtn icon="💡" label="Tips" active={activeTab === "tips"} onClick={() => setActiveTab("tips")} />
        </div>
      </div>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 pb-5 flex flex-col items-center gap-0.5 transition-colors ${
        active ? "text-pink-600" : "text-gray-400"
      }`}
    >
      <span className={`text-xl transition-transform ${active ? "scale-110" : "scale-100"}`}>{icon}</span>
      <span className={`text-xs font-semibold ${active ? "text-pink-600" : "text-gray-400"}`}>{label}</span>
      {active && <div className="h-0.5 w-5 rounded-full bg-pink-500 mt-0.5" />}
    </button>
  );
}
