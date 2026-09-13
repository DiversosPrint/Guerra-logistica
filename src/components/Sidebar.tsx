"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Truck, Box, Users, FileText, Settings, MapPin, Activity } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: Activity, label: "Painel Geral", href: "/" },
    { icon: Calendar, label: "Agenda & O.S.", href: "/agenda" },
    { icon: Truck, label: "Frota", href: "/veiculos" },
    { icon: Box, label: "Peças e Estoque", href: "/estoque" },
    { icon: Users, label: "Motoristas", href: "/clientes" },
    { icon: FileText, label: "Relatórios", href: "/relatorios" },
  ];

  return (
    <aside className="w-64 bg-[#0a0c10] border-r border-slate-800/60 flex flex-col h-screen shrink-0 shadow-2xl relative z-50">
      <div className="p-7 mb-2">
        <Image src="/logo-guerra.png" alt="Guerra Logística" width={190} height={72} className="h-auto w-full max-w-[190px]" priority />
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider ml-3 mb-3 mt-4">Menu Principal</p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Icon size={18} className={isActive ? "text-blue-500" : "text-slate-500"} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}

        <div className="mt-8">
           <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider ml-3 mb-3">Sistema</p>
           <Link href="/config" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent transition-all text-sm font-medium">
             <Settings size={18} className="text-slate-500"/> Configurações
           </Link>
        </div>
      </nav>

      <div className="p-5 border-t border-slate-800/60 bg-gradient-to-t from-black/20 to-transparent">
        <div className="bg-[#111318] p-4 rounded-xl border border-slate-800/80 shadow-inner group cursor-pointer hover:border-slate-700 transition-colors">
          <h3 className="text-xs text-slate-300 font-semibold mb-2.5 flex items-center gap-2">
            <MapPin size={14} className="text-amber-500" /> Rastreio da Frota
          </h3>
          <div className="h-28 bg-[#0a0c10] rounded-lg flex items-center justify-center overflow-hidden relative border border-slate-800">
             <div className="absolute inset-0 opacity-40 bg-[url('https://maps.wikimedia.org/osm-intl/12/1209/1539.png')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
             <div className="relative w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-pulse" />
             <div className="relative w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.9)] ml-6 mt-8" />
             <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] text-slate-300 backdrop-blur-sm border border-white/10">Ao vivo</div>
          </div>
        </div>
        <div className="text-center mt-4">
           <p className="text-[10px] text-slate-600 font-medium">v1.2.4-beta • Desenvolvido com 💙</p>
        </div>
      </div>
    </aside>
  );
}
