import { useState } from "react";
import { UserProfile } from "../data/store";

interface Props {
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
  onClose: () => void;
}

export default function ProfileModal({ profile, onSave, onClose }: Props) {
  const [form, setForm] = useState({ ...profile });

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-fuchsia-500 to-pink-600 px-4 pt-12 pb-5 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-white/80 p-1 active:scale-95 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white font-bold text-xl">My Profile 👩</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Avatar */}
        <div className="text-center py-4">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-5xl shadow-xl">
            👩
          </div>
          <p className="text-gray-400 text-sm mt-2">Your Profile 🌸</p>
        </div>

        <Field label="Your Name 💕" icon="👤">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="e.g. Ma Chérie"
          />
        </Field>

        <Field label="Journey Start Date 🌸" icon="📅">
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-pink-300"
          />
        </Field>

        <Field label="Daily Calorie Goal 🔥" icon="⚡">
          <input
            type="number"
            value={form.targetCalories}
            onChange={(e) => setForm({ ...form, targetCalories: parseInt(e.target.value) || 1600 })}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            min={500} max={4000}
          />
          <div className="mt-2 flex gap-2">
            {[1200, 1400, 1600, 1800, 2000].map(v => (
              <button key={v} onClick={() => setForm({ ...form, targetCalories: v })}
                className={`flex-1 py-1 rounded-xl text-xs font-semibold ${form.targetCalories === v ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                {v}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Daily Water Goal 💧" icon="🌊">
          <input
            type="number"
            value={form.targetWater}
            onChange={(e) => setForm({ ...form, targetWater: parseInt(e.target.value) || 8 })}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            min={4} max={20}
          />
          <p className="text-gray-400 text-xs mt-1 ml-1">= {(form.targetWater * 250) / 1000}L per day</p>
        </Field>

        <Field label="Current Weight (kg) ⚖️" icon="📏">
          <input
            type="number"
            value={form.weight || ""}
            onChange={(e) => setForm({ ...form, weight: parseFloat(e.target.value) || undefined })}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="e.g. 65"
          />
        </Field>

        <Field label="Target Weight (kg) 🎯" icon="🏆">
          <input
            type="number"
            value={form.targetWeight || ""}
            onChange={(e) => setForm({ ...form, targetWeight: parseFloat(e.target.value) || undefined })}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="e.g. 58"
          />
        </Field>

        {/* Tips section */}
        <div className="rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 border border-pink-100 p-4">
          <h3 className="text-pink-700 font-bold text-sm mb-2">💡 Calorie Guide</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <p>🌱 Light weight loss: ~1200-1400 kcal/day</p>
            <p>💪 Moderate loss: ~1400-1600 kcal/day</p>
            <p>🍽️ Balanced: ~1600-1800 kcal/day</p>
            <p>🏃 Active lifestyle: ~1800-2200 kcal/day</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-base shadow-lg shadow-pink-300/50 active:scale-98 transition-transform"
        >
          Save Profile 💕
        </button>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{icon} {label}</label>
      {children}
    </div>
  );
}
