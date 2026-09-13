import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      <div className="bg-[#111318] border border-slate-800/60 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors cursor-default">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-semibold text-slate-400">Eficiência da Oficina</h3>
          <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
            <TrendingUp size={16} />
          </div>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-3xl font-black text-slate-100 tracking-tight">88.2%</span>
          <span className="text-emerald-400 font-medium text-xs mb-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">+4.5% hoje</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-[88.2%] rounded-full relative">
            <div className="absolute inset-0 bg-white/20 w-1/3 animate-shimmer"></div>
          </div>
        </div>
      </div>

      <div className="bg-[#111318] border border-slate-800/60 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors cursor-default">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-semibold text-slate-400">Ocupação das Baias</h3>
          <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
            <TrendingDown size={16} />
          </div>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-3xl font-black text-slate-100 tracking-tight">3/8</span>
          <span className="text-slate-500 font-medium text-xs mb-1">Livres: 5</span>
        </div>
        <div className="w-full flex gap-1 h-2">
          <div className="h-full bg-blue-500 rounded-full flex-1"></div>
          <div className="h-full bg-blue-500 rounded-full flex-1"></div>
          <div className="h-full bg-blue-500 rounded-full flex-1"></div>
          <div className="h-full bg-slate-800 rounded-full flex-1"></div>
          <div className="h-full bg-slate-800 rounded-full flex-1"></div>
          <div className="h-full bg-slate-800 rounded-full flex-1"></div>
          <div className="h-full bg-slate-800 rounded-full flex-1"></div>
          <div className="h-full bg-slate-800 rounded-full flex-1"></div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1c140a] to-[#111318] border border-amber-900/30 rounded-2xl p-5 relative overflow-hidden shadow-sm group cursor-pointer">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
        <div className="relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-amber-500/80">Alerta de Estoque</h3>
            <AlertCircle size={16} className="text-amber-500" />
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-black text-white tracking-tight">12</span>
            <span className="text-slate-400 text-sm mb-1 font-medium">itens críticos</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">Lonas de freio FH e filtros secadores em baixa.</p>
          <button className="text-[11px] font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
            Ver Relatório <span className="text-lg leading-none">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
