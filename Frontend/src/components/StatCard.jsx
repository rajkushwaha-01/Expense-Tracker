export default function StatCard({
  label,
  value,
  sub,
  subTone = "neutral",
  icon: Icon,
  iconTone = "brand",
}) {
  const toneClasses = {
    neutral: "text-zinc-500",
    up: "text-emerald-400",
    down: "text-red-400",
  };

  const iconToneClasses = {
    brand: "bg-brand/15 text-brand-light",
    emerald: "bg-emerald-500/15 text-emerald-400",
    red: "bg-red-500/15 text-red-400",
    amber: "bg-amber-500/15 text-amber-400",
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-zinc-400">{label}</p>
        {Icon && (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconToneClasses[iconTone]}`}
          >
            <Icon size={16} />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">
        {value}
      </p>
      {sub && (
        <p className={`text-xs mt-1.5 ${toneClasses[subTone]}`}>{sub}</p>
      )}
    </div>
  );
}
