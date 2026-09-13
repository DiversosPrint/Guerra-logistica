"use client";
import { useState, useEffect } from "react";
import { Wrench, CarFront, AlertCircle } from "lucide-react";
import Modal from "./Modal";

export default function VehicleInService() {
  const [vehicle, setVehicle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ plate: '', vin: '', make: '', model: '', color: '', status: 'Na Oficina', owner: 'Guerra Logística' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      if (data && data.length > 0) {
        setVehicle(data[0]);
      }
    } catch (e) {
      console.error("Putz, falhou ao buscar os veículos:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Pequeno delay pra simular o tempo de resposta e não parecer robótico/instantâneo demais
    setTimeout(async () => {
      try {
        const res = await fetch('/api/vehicles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchVehicles();
          // Resetar os dados pro próximo
          setFormData({ plate: '', vin: '', make: '', model: '', color: '', status: 'Na Oficina', owner: 'Guerra Logística' });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="bg-[#111318] border border-slate-800/60 rounded-2xl p-6 mb-6 shadow-sm relative overflow-hidden">
      {/* Detalhe visual de layout "feito a mão" */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -z-10 rounded-full"></div>

      <div className="flex justify-between items-end mb-6 border-b border-slate-800/50 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Wrench size={20} className="text-amber-500" /> Veículo no Box
          </h2>
          <p className="text-xs text-slate-500 mt-1">Ficha técnica do equipamento em atendimento atual</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg transition-all font-medium shadow-sm flex items-center gap-2">
          <CarFront size={16} /> Recepcionar Veículo
        </button>
      </div>

      <div className="flex gap-8">
        <div className="w-1/3">
          {vehicle ? (
            <div className="space-y-4 text-sm bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Identificação</span>
                <span className="font-bold text-lg text-white font-mono tracking-wide">{vehicle.plate}</span>
              </div>
              
              <div className="h-px w-full bg-slate-800/50"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Marca/Modelo</span>
                  <span className="font-medium text-slate-200">{vehicle.make} {vehicle.model}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    {vehicle.status}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Cor</span>
                  <span className="font-medium text-slate-200">{vehicle.color}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Chassi (VIN)</span>
                  <span className="font-mono text-slate-400 text-xs truncate" title={vehicle.vin}>{vehicle.vin || 'Não informado'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center p-6 bg-slate-900/30 rounded-xl border-2 border-dashed border-slate-800">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3">
                <CarFront size={24} className="text-slate-500" />
              </div>
              <h3 className="text-slate-300 font-medium mb-1">Box Vazio</h3>
              <p className="text-xs text-slate-500">Nenhum caminhão recebido para manutenção no momento.</p>
            </div>
          )}
        </div>

        <div className="w-2/3 rounded-xl overflow-hidden relative bg-[#0a0c10] border border-slate-800/60 flex items-center justify-center min-h-[260px] shadow-inner group">
          {vehicle ? (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent flex items-center justify-center transition-opacity duration-700">
                <div className="text-center transform transition-transform duration-500 group-hover:scale-105">
                  <div className="text-7xl mb-3 drop-shadow-2xl opacity-90">🚛</div>
                  <div className="bg-black/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5 inline-block">
                    <p className="text-slate-300 font-medium text-sm tracking-wide">{vehicle.make} {vehicle.model} <span className="text-slate-500 mx-1">|</span> <span className="text-amber-400/90 text-xs uppercase">{vehicle.color}</span></p>
                  </div>
                </div>
              </div>
              <div className="absolute top-5 right-5 space-y-2">
                <div className="bg-[#111318]/90 backdrop-blur-md border border-slate-700/50 p-3.5 rounded-lg shadow-xl">
                   <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-2">
                      <AlertCircle size={14} className="text-emerald-500" /> Scan Eletrônico
                   </div>
                   <div className="space-y-2">
                     <div>
                       <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>Módulo Injeção</span><span>80%</span></div>
                       <div className="w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="w-[80%] h-full bg-emerald-500 rounded-full relative"><div className="absolute inset-0 bg-white/20 w-1/2 animate-shimmer"></div></div></div>
                     </div>
                     <div>
                       <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>Freios ABS</span><span>40%</span></div>
                       <div className="w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="w-[40%] h-full bg-amber-500 rounded-full"></div></div>
                     </div>
                   </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-slate-600/50 text-center flex flex-col items-center">
              <div className="text-6xl mb-4 opacity-50 grayscale">🚚</div>
              <p className="text-sm tracking-wider uppercase">Aguardando entrada...</p>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Recepcionar Novo Caminhão">
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-xs text-slate-400 -mt-2 mb-4">Preencha os dados da triagem para abrir a O.S. (Ordem de Serviço).</p>
          
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Placa (Mercosul/Antiga)</label>
              <input required value={formData.plate} onChange={e => setFormData({...formData, plate: e.target.value.toUpperCase()})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-mono" placeholder="ABC1D23" maxLength={7}/>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Chassi / VIN <span className="text-slate-500 font-normal">(Opcional)</span></label>
              <input value={formData.vin} onChange={e => setFormData({...formData, vin: e.target.value.toUpperCase()})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-mono text-xs" placeholder="9BW..."/>
            </div>
            
            <div className="col-span-2 h-px bg-slate-800/50 my-1"></div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Marca</label>
              <select required value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all appearance-none">
                <option value="" disabled>Selecione a montadora...</option>
                <option value="Volvo">Volvo</option>
                <option value="Scania">Scania</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Volkswagen">Volkswagen Caminhões</option>
                <option value="DAF">DAF</option>
                <option value="Iveco">Iveco</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Modelo Exato</label>
              <input required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600" placeholder="Ex: FH 540 6x4"/>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Cor Predominante</label>
              <input required value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full bg-[#0a0c10] border border-slate-700/80 rounded-lg p-2.5 text-slate-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600" placeholder="Ex: Branco Polar"/>
            </div>
          </div>
          
          <div className="pt-6 flex justify-end gap-3 mt-4 border-t border-slate-800/80">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-transparent hover:bg-slate-800 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-md shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {isSubmitting ? (
                 <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Salvando...</>
              ) : 'Confirmar Entrada'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
