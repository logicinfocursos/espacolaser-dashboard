import React, { useState } from 'react';
import { Gavel, AlertOctagon, CheckCircle, Search, Filter, Save, Eye, ArrowRight, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui';
import { MOCK_LLMS, MOCK_JUDGE_CONFIG, MOCK_JUDGE_LOGS } from '../constants';
import { JudgeConfig, JudgeIntervention } from '../types';

const LLMJudge: React.FC = () => {
  const [config, setConfig] = useState<JudgeConfig>(MOCK_JUDGE_CONFIG);
  const [logs, setLogs] = useState<JudgeIntervention[]>(MOCK_JUDGE_LOGS);
  const [filterText, setFilterText] = useState('');
  const [selectedLog, setSelectedLog] = useState<JudgeIntervention | null>(null);

  const filteredLogs = logs.filter(log => 
    log.agentName.toLowerCase().includes(filterText.toLowerCase()) || 
    log.competitorName.toLowerCase().includes(filterText.toLowerCase()) ||
    log.reason.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleSaveConfig = () => {
    // In a real app, this would make an API call
    alert('Configurações do Judge salvas com sucesso!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Gavel className="w-6 h-6 text-brand" />
            LLM como Juiz (Judge)
          </h2>
          <p className="text-slate-400">Supervisão autônoma de qualidade e segurança das interações.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Controls & Config */}
        <div className="space-y-6 lg:col-span-1">
            {/* Status Control */}
            <Card className={`border-l-4 ${config.isActive ? 'border-l-brand' : 'border-l-slate-600'} bg-dark-surface border-dark-border`}>
                <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 font-bold text-white">
                            <Activity className={`w-5 h-5 ${config.isActive ? 'text-brand' : 'text-slate-500'}`} />
                            Status do Judge
                        </div>
                        <button 
                            onClick={() => setConfig({...config, isActive: !config.isActive})}
                            className={`w-12 h-6 rounded-full transition-colors relative ${config.isActive ? 'bg-brand' : 'bg-slate-700'}`}
                        >
                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${config.isActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        {config.isActive 
                            ? "O LLM Judge está ativo e monitorando todas as conversas em tempo real. Intervenções ocorrerão conforme configurado."
                            : "O recurso está desativado. Os agentes estão operando sem supervisão automática de segunda camada."
                        }
                    </p>
                </CardContent>
            </Card>

            {/* Configuration Form */}
            <Card className="bg-dark-surface border-dark-border h-full">
                <CardHeader>
                    <CardTitle>Configuração do Juiz</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-1 block">LLM Responsável</label>
                        <select 
                            className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                            value={config.llmId}
                            onChange={(e) => setConfig({...config, llmId: e.target.value})}
                        >
                            {MOCK_LLMS.map(llm => (
                                <option key={llm.id} value={llm.id}>{llm.name} ({llm.provider})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-1 block">Prompt de Julgamento</label>
                        <textarea 
                            className="w-full h-48 bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-slate-500 custom-scrollbar"
                            value={config.systemPrompt}
                            onChange={(e) => setConfig({...config, systemPrompt: e.target.value})}
                            placeholder="Defina os critérios de intervenção..."
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                            Instrua o LLM sobre o que constitui uma violação (ex: alucinação, rudeza, fugir do script).
                        </p>
                    </div>

                    <Button className="w-full gap-2" onClick={handleSaveConfig}>
                        <Save className="w-4 h-4" /> Salvar Configurações
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Intervention Logs */}
        <div className="lg:col-span-2 h-full flex flex-col">
            <Card className="flex-1 flex flex-col bg-dark-surface border-dark-border">
                <CardHeader className="flex flex-row items-center justify-between border-b border-dark-border pb-4">
                    <CardTitle>Intervenções Realizadas</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="Filtrar por agente, motivo..." 
                            className="pl-9 h-9 text-xs"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-hidden">
                    <div className="overflow-y-auto h-[600px] custom-scrollbar">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Hora</th>
                                    <th className="px-4 py-3 font-medium">Agente / Alvo</th>
                                    <th className="px-4 py-3 font-medium">Motivo</th>
                                    <th className="px-4 py-3 font-medium">Ação</th>
                                    <th className="px-4 py-3 font-medium text-right">Detalhes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border">
                                {filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{log.timestamp}</td>
                                        <td className="px-4 py-3">
                                            <div className="text-white font-medium">{log.agentName}</div>
                                            <div className="text-xs text-slate-500">{log.competitorName}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="flex items-center gap-2 text-yellow-400 text-xs font-bold border border-yellow-900/30 bg-yellow-900/10 px-2 py-1 rounded w-fit">
                                                <AlertOctagon className="w-3 h-3" /> {log.reason}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={log.actionTaken === 'Bloqueio' ? 'destructive' : 'warning'} className="text-[10px]">
                                                {log.actionTaken.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedLog(log)}>
                                                <Eye className="w-4 h-4 text-brand hover:text-white" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

      {/* Details Modal */}
      {selectedLog && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
          <Card className="w-full max-w-2xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
              <div>
                <CardTitle>Análise de Intervenção #{selectedLog.id}</CardTitle>
                <p className="text-xs text-slate-400 mt-1">{selectedLog.timestamp} • {selectedLog.competitorName}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedLog(null)}>X</Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Original Response (Bad) */}
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-red-400 uppercase flex items-center gap-2">
                          <AlertOctagon className="w-3 h-3" /> Resposta Original (Agente)
                      </label>
                      <div className="p-3 bg-red-900/10 border border-red-900/30 rounded-lg text-sm text-slate-300 italic">
                          "{selectedLog.originalResponse}"
                      </div>
                  </div>

                  {/* Modified Response (Good) */}
                  {selectedLog.modifiedResponse && (
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-green-400 uppercase flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" /> Resposta Aplicada (Judge)
                        </label>
                        <div className="p-3 bg-green-900/10 border border-green-900/30 rounded-lg text-sm text-white font-medium">
                            "{selectedLog.modifiedResponse}"
                        </div>
                    </div>
                  )}
              </div>

              {/* Analysis */}
              <div className="space-y-2">
                   <label className="text-xs font-bold text-brand uppercase flex items-center gap-2">
                       <Gavel className="w-3 h-3" /> Análise do Juiz
                   </label>
                   <div className="p-4 bg-slate-900 rounded border border-slate-800 text-sm text-slate-300 leading-relaxed">
                       {selectedLog.judgeAnalysis}
                   </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-dark-border">
                  <Button variant="outline" onClick={() => setSelectedLog(null)}>Fechar</Button>
              </div>

            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LLMJudge;