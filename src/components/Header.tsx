"use client";
import { Bell, Grid, Search, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [greeting, setGreeting] = useState("Bom dia");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18) setGreeting("Boa noite");
    else if (hour >= 12) setGreeting("Boa tarde");
  }, []);

  return (
    <header className="h-20 bg-[#0a0c10]/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-white lg:hidden">
          <Menu size={24} />
        </button>
        
        {/* Search bar simulada (Toque humano) */}
        <div className="hidden md:flex items-center bg-[#111318] border border-slate-800 rounded-full px-4 py-2 w-64 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
          <Search size={16} className="text-slate-500 mr-2" />
          <input type="text" placeholder="Buscar O.S. ou Placa..." className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-600 w-full" />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-slate-500 hover:text-slate-300 transition-colors hidden sm:block">
          <Grid size={22} />
        </button>
        
        <button className="text-slate-500 hover:text-slate-300 transition-colors relative">
          <Bell size={22} />
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 border-2 border-[#0a0c10] rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          </span>
        </button>
        
        <div className="h-8 w-px bg-slate-800/80 mx-2 hidden sm:block"></div>
        
        {/* Perfil do Usuário mais humano */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">{greeting},</p>
            <h2 className="font-bold text-slate-200 leading-none text-sm group-hover:text-blue-400 transition-colors">Fabiano Silva</h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 border border-slate-700 overflow-hidden flex items-center justify-center font-bold text-white shadow-inner relative">
            FS
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-blue-900"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
