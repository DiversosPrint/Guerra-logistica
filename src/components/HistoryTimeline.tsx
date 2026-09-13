"use client";
import { useState, useEffect } from "react";
import { GitCommit, Wrench, Settings } from "lucide-react";

export default function HistoryTimeline() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchVehiclesAndServices();
  }, []);

  const fetchVehiclesAndServices = async () => {
    try {
      const resV = await fetch('/api/vehicles');
      const dataV = await resV.json();
      if (dataV && dataV.length > 0) {
        const resS = await fetch(`/api/services?vehicleId=${dataV[0].id}`);
        if(resS.ok) {
           const services = await resS.json();
           const formattedEvents = services.map((s: any) => ({
              title: s.description,
              date: new Date(s.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
              isRecent: new Date(s.date).toDateString() === new Date().toDateString()
           }));
           setEvents(formattedEvents);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="bg-[#111318] border border-slate-800/60 rounded-2xl p-6 h-full shadow-sm relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
         <Settings size={200} className="text-slate-500 -mr-10 -mb-10 animate-[spin_60s_linear_infinite]" />
      </div>

      <div className="mb-6 pb-4 border-b border-slate-800/50">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <GitCommit size={18} className="text-blue-500" /> Histórico do Veículo
        </h2>
        <p className="text-xs text-slate-500 mt-1">Timeline das últimas passagens pela oficina</p>
      </div>
      
      <div className="relative ml-2 pb-4">
        {/* Linha mestra da timeline */}
        <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-blue-500 via-slate-700 to-transparent"></div>

        <div className="space-y-6">
          {events.length === 0 ? (
            <div className="text-slate-500 text-sm ml-6 flex flex-col items-center py-10 opacity-70">
              <Wrench size={32} className="mb-3 text-slate-600" />
              Nenhum histórico registrado ainda.
            </div>
          ) : events.map((evt, i) => (
            <div key={i} className="relative pl-8 group">
              <div className={`absolute w-4 h-4 rounded-full -left-0 top-1 border-[3px] border-[#111318] transition-colors ${evt.isRecent ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-600 group-hover:bg-slate-400'}`}></div>
              <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-tight mb-1">{evt.title}</h3>
              <p className="text-[11px] font-medium text-slate-500 bg-slate-800/50 inline-block px-2 py-0.5 rounded-md border border-slate-800">{evt.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
