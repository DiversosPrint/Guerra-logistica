"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Plus, Clock, CheckCircle2, AlertTriangle, FileDown } from "lucide-react";
import Modal from "./Modal";

export default function ServicesLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ description: '', status: 'Concluído', mileage: '', technician: '', notes: '' });
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      if (data && data.length > 0) {
        setVehicleId(data[0].id);
        fetchLogs(data[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLogs = async (vId: string) => {
    try {
      const res = await fetch(`/api/services?vehicleId=${vId}`);
      if(res.ok) {
         setLogs(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!vehicleId) return alert('É necessário ter um veículo no box para registrar um serviço!');
    
    setIsSubmitting(true);
    setTimeout(async () => {
      try {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, vehicleId })
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchLogs(vehicleId);
          setFormData({ description: '', status: 'Concluído', mileage: '', technician: '', notes: '' });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsSubmitting(false);
      }
    }, 400);
  };

  // Helper to humanize the date
  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return 'Hoje';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Concluído':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 size={12}/> {status}</span>;
      case 'Em Andamento':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"><Clock size={12}/> {status}</span>;
      case 'Urgente':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-red-500/10 text-red-400 border border-red-500/20"><AlertTriangle size={12}/> {status}</span>;
      default:
        return <span className="text-slate-400">{status}</span>;
    }
  };

  return (
    <div className="bg-[#111318] border border-slate-800/60 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Diário de Bordo</h2>
          <p className="text-xs text-slate-500">Histórico de apontamentos do mecânico</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-1.5 text-sm border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all font-semibold print:hidden"><FileDown size={16} /> Gerar PDF</button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all font-semibold shadow-md shadow-blue-900/20">
            <Plus size={16} /> Apontar Serviço
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800/50">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-[11px] text-slate-400 uppercase bg-[#0a0c10] border-b border-slate-800/50 tracking-wider font-semibold">
            <tr>
              <th className="px-5 py-3.5 rounded-tl-xl w-32">Data / Hora</th>
              <th className="px-5 py-3.5">Descrição do Apontamento</th>
              <th className="px-5 py-3.5 w-28">KM</th>
              <th className="px-5 py-3.5 rounded-tr-xl w-36">Situação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 bg-[#111318]">
            {logs.length === 0 ? (
               <tr><td colSpan={4} className="px-5 py-12 text-center text-slate-500 bg-slate-900/20 text-sm">Sem apontamentos para o veículo atual no box.</td></tr>
            ) : logs.map((log, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-300">{formatDate(log.date)}</span>
                    <span className="text-xs text-slate-500 font-mono">{formatTime(log.date)}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{log.description}</td>
                <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{log.mileage ? `${Number(log.mileage).toLocaleString('pt-BR')}` : '-'}</td>
                <td className="px-5 py-3.5">{getStatusBadge(log.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apontamento de Serviço">
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-xs text-slate-400 -mt-2 mb-4">Descreva detalhadamente o serviço ou peça trocada nesta etapa.</p>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">O que foi feito?</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-3 text-slate-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600 resize-none h-24" placeholder="Ex: Substituição do filtro secador do sistema de ar (Knorr-Bremse)..."/>
            </div>
            
            <div className="space-y-1.5 w-1/2">
              <label className="block text-xs font-semibold text-slate-300">Situação atual</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all appearance-none cursor-pointer">
                 <option value="Concluído">✅ Concluído</option>
                 <option value="Em Andamento">⏳ Em Andamento (Pausado)</option>
                 <option value="Urgente">🚨 Requer Atenção/Peça</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><label className="block text-xs font-semibold text-slate-300">Quilometragem</label><input type="number" min="0" value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm" placeholder="Ex: 245000" /></div>
              <div className="space-y-1.5"><label className="block text-xs font-semibold text-slate-300">Mecânico</label><input value={formData.technician} onChange={e => setFormData({...formData, technician: e.target.value})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm" placeholder="Nome do responsável" /></div>
            </div>
            <div className="space-y-1.5"><label className="block text-xs font-semibold text-slate-300">Observações</label><textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm" placeholder="Peças, recomendações ou detalhes adicionais" /></div>
          </div>
          
          <div className="pt-6 flex justify-end gap-3 mt-4 border-t border-slate-800/80">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-transparent hover:bg-slate-800 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-md shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {isSubmitting ? (
                 <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Registrando...</>
              ) : 'Registrar Apontamento'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
