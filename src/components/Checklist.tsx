"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, CheckSquare, Square, X, ClipboardCheck, Settings2 } from "lucide-react";

export default function Checklist() {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'tires': true,
    'fluids': true,
    'lights': true,
    'engine': true,
    'torque': true
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    <div className="bg-[#111318] border border-slate-800/60 rounded-2xl p-6 h-full flex flex-col shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800/50">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ClipboardCheck size={18} className="text-emerald-500" /> Checklist Operacional
          </h2>
          <p className="text-xs text-slate-500 mt-1">Inspeção padrão de entrada e saída</p>
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors bg-slate-900 p-2 rounded-lg border border-slate-800">
          <Settings2 size={16} />
        </button>
      </div>

      <div className="flex text-sm border-b border-slate-800/80 mb-5 pb-px">
        <button className="px-5 py-2.5 border-b-2 border-blue-500 text-blue-400 font-semibold bg-blue-500/5 rounded-t-lg transition-colors">Pré-Serviço</button>
        <button className="px-5 py-2.5 text-slate-500 font-medium hover:text-slate-300 transition-colors">Qualidade (Saída)</button>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* Accordion Item 1 */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${openSection === 0 ? 'border-slate-700/80 bg-[#0a0c10]' : 'border-slate-800/60 bg-slate-900/30'}`}>
          <div onClick={() => setOpenSection(openSection === 0 ? null : 0)} className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/40 transition-colors">
            <div className={`flex items-center gap-3 text-sm font-bold ${openSection === 0 ? 'text-slate-200' : 'text-slate-400'}`}>
              <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${openSection === 0 ? 'bg-blue-600/20 border-blue-500/30 text-blue-500' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>1</div>
              Inspeção Estrutural
            </div>
            {openSection === 0 ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-500" />}
          </div>
          
          {openSection === 0 && (
            <div className="p-4 space-y-1 bg-slate-900/20 border-t border-slate-800/50">
              {[
                { id: 'tires', label: 'Desgaste e calibragem dos pneus' },
                { id: 'fluids', label: 'Vazamentos de fluidos (Motor/Freio)' },
                { id: 'lights', label: 'Faróis e lanternas' },
                { id: 'boards', label: 'Painel de luzes e avisos sonoros' }
              ].map(item => (
                <div key={item.id} onClick={() => toggleCheck(item.id)} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors group">
                  {checkedItems[item.id] ? 
                    <CheckSquare size={18} className="text-emerald-500" /> : 
                    <Square size={18} className="text-slate-600 group-hover:text-slate-400" />
                  }
                  <span className={`text-sm ${checkedItems[item.id] ? 'text-slate-300' : 'text-slate-500'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accordion Item 2 */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${openSection === 1 ? 'border-slate-700/80 bg-[#0a0c10]' : 'border-slate-800/60 bg-slate-900/30'}`}>
          <div onClick={() => setOpenSection(openSection === 1 ? null : 1)} className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/40 transition-colors">
            <div className={`flex items-center gap-3 text-sm font-bold ${openSection === 1 ? 'text-slate-200' : 'text-slate-400'}`}>
              <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${openSection === 1 ? 'bg-blue-600/20 border-blue-500/30 text-blue-500' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>2</div>
              Torque e Segurança
            </div>
            {openSection === 1 ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-500" />}
          </div>
          
          {openSection === 1 && (
            <div className="p-4 space-y-1 bg-slate-900/20 border-t border-slate-800/50">
              <div onClick={() => toggleCheck('engine')} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors group">
                {checkedItems['engine'] ? <CheckSquare size={18} className="text-emerald-500" /> : <Square size={18} className="text-slate-600" />}
                <span className={`text-sm ${checkedItems['engine'] ? 'text-slate-300' : 'text-slate-500'}`}>Coxins do Motor e Câmbio</span>
              </div>
              
              <div className="bg-[#111318] p-3.5 rounded-xl border border-slate-700/60 mt-2 flex flex-col gap-2 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                 <div className="flex justify-between items-start">
                   <div onClick={() => toggleCheck('torque')} className="flex items-center gap-2 text-sm font-bold text-slate-200 cursor-pointer">
                     {checkedItems['torque'] ? <CheckSquare size={16} className="text-emerald-500" /> : <Square size={16} className="text-slate-500" />} 
                     Reaperto de Porcas de Roda
                   </div>
                   <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Obrigatório</span>
                 </div>
                 {checkedItems['torque'] && (
                   <div className="pl-6 pt-1">
                     <p className="text-xs text-slate-500">
                       <span className="text-emerald-400 font-medium">✓ Aferido</span> por Fabiano S.<br/>
                       {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}
                     </p>
                   </div>
                 )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-5 border-t border-slate-800/80 mt-4">
        <p className="text-xs text-slate-500 font-medium">3/5 itens marcados</p>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 bg-transparent hover:bg-slate-800 rounded-lg transition-colors">
            Limpar
          </button>
          <button className="px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all shadow-md shadow-emerald-900/20">
            Assinar Ficha
          </button>
        </div>
      </div>
    </div>
  );
}
