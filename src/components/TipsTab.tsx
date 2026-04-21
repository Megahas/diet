const TIPS = [
  { emoji: "💧", title: "Stay Hydrated", text: "Drink 2L of water daily. Sometimes thirst feels like hunger. Try water first!", color: "from-sky-400 to-blue-500" },
  { emoji: "🌙", title: "Sleep Matters", text: "Poor sleep increases hunger hormones. Aim for 7-8 hours of quality sleep.", color: "from-violet-400 to-purple-500" },
  { emoji: "🥗", title: "Eat Colours", text: "Fill half your plate with colourful veggies for nutrients and fullness.", color: "from-emerald-400 to-green-500" },
  { emoji: "🍽️", title: "Mindful Eating", text: "Eat slowly and without screens. It takes 20 min to feel full!", color: "from-amber-400 to-orange-500" },
  { emoji: "🏃‍♀️", title: "Move Daily", text: "Even a 30-min walk burns calories and boosts mood. You've got this!", color: "from-rose-400 to-pink-500" },
  { emoji: "🍳", title: "Cook at Home", text: "Home cooking is healthier and lower in hidden calories than eating out.", color: "from-yellow-400 to-amber-500" },
  { emoji: "⏰", title: "Regular Meals", text: "Eat at consistent times to regulate your hunger hormones and metabolism.", color: "from-teal-400 to-cyan-500" },
  { emoji: "🧘", title: "Stress Less", text: "Stress triggers cortisol which increases cravings. Try deep breathing!", color: "from-fuchsia-400 to-pink-500" },
  { emoji: "🥦", title: "High-Fibre Foods", text: "Lentils, chickpeas, oats and veggies keep you full longer. Eat more!", color: "from-lime-400 to-green-500" },
  { emoji: "🏆", title: "Celebrate Progress", text: "Every good day counts! Progress, not perfection. You're doing amazing! 💕", color: "from-rose-500 to-fuchsia-500" },
];

const MOTIVATIONS = [
  "You are stronger than your cravings! 💪",
  "Every healthy choice is an act of self-love 💕",
  "Progress is progress, no matter how small 🌱",
  "Your body is a temple — nourish it with love ✨",
  "Small steps every day lead to big changes 🏆",
  "You've got this, ma chérie! 🌸",
  "Be patient with yourself — you're doing amazing! 🦋",
  "Healthy is not a goal, it's a way of living 💫",
];

export default function TipsTab() {
  const today = new Date().getDay();
  const motivation = MOTIVATIONS[today % MOTIVATIONS.length];

  return (
    <div className="space-y-4 pb-8">
      {/* Daily Motivation */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-500 p-5 shadow-xl shadow-pink-300/40 text-center">
        <p className="text-white/70 text-xs mb-1">✨ Daily Motivation</p>
        <p className="text-white font-bold text-lg leading-snug">"{motivation}"</p>
      </div>

      <h2 className="text-gray-800 font-bold text-lg">💡 Health Tips</h2>

      {TIPS.map((tip, i) => (
        <div key={i} className={`rounded-3xl bg-gradient-to-br ${tip.color} p-4 shadow-md`}>
          <div className="flex gap-3 items-start">
            <span className="text-3xl">{tip.emoji}</span>
            <div>
              <h3 className="text-white font-bold text-base">{tip.title}</h3>
              <p className="text-white/80 text-sm mt-0.5 leading-relaxed">{tip.text}</p>
            </div>
          </div>
        </div>
      ))}

      {/* French & Lankan fusion tips */}
      <div className="rounded-3xl bg-white border border-pink-100 shadow-sm p-4">
        <h3 className="text-pink-700 font-bold text-base mb-3">🇫🇷 🇱🇰 French × Asian Fusion Tips</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>🥗 Try a French-style salad with Sri Lankan pol sambol dressing</p>
          <p>🍵 Swap heavy cream sauces for coconut milk — equally rich, lower guilt!</p>
          <p>🫓 Roti or chapati are great alternatives to baguette</p>
          <p>🌿 Use turmeric, cinnamon and cardamom — anti-inflammatory superstars</p>
          <p>🍛 Dhal is high protein, low fat — eat it often!</p>
          <p>☕ Swap sugary drinks for Ceylon tea or herbal infusions</p>
        </div>
      </div>

      {/* Calorie equivalents fun card */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-4">
        <h3 className="text-amber-700 font-bold text-base mb-3">🔥 Fun Calorie Facts</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>🚶‍♀️ 30min walk burns ~150 kcal</p>
          <p>💃 30min dancing burns ~200 kcal</p>
          <p>🏊 30min swimming burns ~250 kcal</p>
          <p>🧹 1hr cleaning burns ~170 kcal</p>
          <p>😴 8hr sleep burns ~500 kcal (just existing!)</p>
        </div>
      </div>
    </div>
  );
}
