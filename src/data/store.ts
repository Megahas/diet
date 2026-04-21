export interface LoggedFood {
  id: string;
  foodId: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  emoji: string;
  servings: number;
  meal: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  timestamp: number;
}

export interface DayLog {
  date: string;
  foods: LoggedFood[];
  water: number; // glasses (250ml each)
  targetCalories: number;
  targetWater: number; // glasses
  weight?: number;
}

export interface UserProfile {
  name: string;
  startDate: string;
  targetCalories: number;
  targetWater: number;
  height?: number;
  weight?: number;
  targetWeight?: number;
}

const STORAGE_KEYS = {
  LOGS: "diet_logs",
  PROFILE: "diet_profile",
};

export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function loadProfile(): UserProfile {
  const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (raw) return JSON.parse(raw);
  return {
    name: "Ma Chérie",
    startDate: getTodayKey(),
    targetCalories: 1600,
    targetWater: 8,
  };
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

export function loadLogs(): Record<string, DayLog> {
  const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
  if (raw) return JSON.parse(raw);
  return {};
}

export function saveLogs(logs: Record<string, DayLog>) {
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
}

export function getTodayLog(logs: Record<string, DayLog>, profile: UserProfile): DayLog {
  const key = getTodayKey();
  if (logs[key]) return logs[key];
  return {
    date: key,
    foods: [],
    water: 0,
    targetCalories: profile.targetCalories,
    targetWater: profile.targetWater,
  };
}

export function getWeekProgress(logs: Record<string, DayLog>): { date: string; calories: number; target: number }[] {
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const log = logs[key];
    const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
    result.push({
      date: dayLabel,
      calories: log ? log.foods.reduce((s, f) => s + f.calories * f.servings, 0) : 0,
      target: log?.targetCalories || 1600,
    });
  }
  return result;
}

export function get7MonthProgress(startDate: string): { day: number; totalDays: number; percent: number; daysLeft: number } {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 7);
  const now = new Date();
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.max(0, Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const percent = Math.min(100, Math.round((daysPassed / totalDays) * 100));
  const daysLeft = Math.max(0, totalDays - daysPassed);
  return { day: daysPassed, totalDays, percent, daysLeft };
}
