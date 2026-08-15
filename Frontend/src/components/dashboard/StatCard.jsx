import { TrendingUp, TrendingDown } from 'lucide-react';
export default function StatCard({ title, amount, subtext, icon: Icon, iconBg, trend, isLoading }) {
  if (isLoading) return <div className="card-panel p-5 animate-pulse"><div className="flex justify-between items-start mb-4"><div className="h-4 bg-zinc-800/50 rounded w-24"></div><div className="w-8 h-8 rounded-lg bg-zinc-800/50"></div></div><div className="h-8 bg-zinc-800/50 rounded w-32 mb-2"></div><div className="h-3 bg-zinc-800/50 rounded w-20"></div></div>;
  return (
    <div className="card-panel p-5">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-zinc-400">{title}</span>
        {Icon && <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg || 'bg-zinc-800 text-zinc-400'}`}><Icon size={16} /></div>}
      </div>
      <div className="text-2xl font-bold text-white mb-1 truncate" title={amount}>{amount}</div>
      <div className="flex items-center gap-2">
        {trend === 'up' && <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs flex items-center gap-1"><TrendingUp size={12}/></span>}
        {trend === 'down' && <span className="text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded text-xs flex items-center gap-1"><TrendingDown size={12}/></span>}
        {subtext && <div className={`text-xs truncate ${trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-zinc-500'}`}>{subtext}</div>}
      </div>
    </div>
  );
}
