
import React, { useState } from 'react';
import { Gavel, AlertOctagon, CheckCircle, Search, Filter, Save, Eye, Plus, Activity, Edit, Trash2, Bot, ShieldCheck, Users, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';
import { MOCK_LLMS, MOCK_JUDGE_LOGS, MOCK_AGENTS } from '../constants';
import { JudgeIntervention } from '../types';

// Interface local para o Judge Profile (já que é específico desta página por enquanto)
interface JudgeProfile {
  id: string;
  name: string;
  specialization: string; // Ex: Preço, Tom de Voz, Compliance
  llmId: string;
  systemPrompt: string;
  isActive: boolean;
  linkedAgentIds: string[]; // IDs dos agentes que este Judge supervisiona
}

// Mock inicial de Judges
const MOCK_JUDGES: JudgeProfile[] = [
  {
    id: '1',
    name: 'Supervisor de Preços (Guardian)',
    specialization: 'Proteção de Margem',
    llmId: '1',
    systemPrompt: 'Você é um auditor de preços. Sua função é garantir que o agente não ofereça descontos maiores que 20% sem autorização. Se detectar um valor abaixo do permitido, intervenha sugerindo o parcelamento.',
    isActive: true,
    linkedAgentIds: ['1', '3'] // Julia e Carla
  },
  {
    id: '2',
    name: 'Auditor de Tom de Voz',
    specialization: 'Qualidade de Atendimento',
    llmId: '2',
    systemPrompt: 'Monitore a polidez e empatia. O agente não pode ser rude, seco ou impaciente. Se o tom ficar agressivo, reescreva a resposta para ser mais acolhedora.',
    isActive: false,
    linkedAgentIds: ['2'] // Roberto
  }
];

const LLMJudge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'judges' | 'logs' | 'editor'>('judges');
  const [judges, setJudges] = useState<JudgeProfile[]>(MOCK_JUDGES);
  const [editingJudge, setEditingJudge] = useState<Partial<JudgeProfile>>({});
  
  // States for Logs
  const [logs, setLogs] = useState<JudgeIntervention[]>(MOCK_JUDGE_LOGS);
  const [filterText, setFilterText] = useState('');
  const [selectedLog, setSelectedLog] = useState<JudgeIntervention | null>(null);

  const filteredLogs = logs.filter(log => 
    log.agentName.toLowerCase().includes(filterText.toLowerCase()) || 
    log.competitorName.toLowerCase().includes(filterText.toLowerCase()) ||
    log.reason.toLowerCase().includes(filterText.toLowerCase())
  );

  // --- Handlers ---

  const handleCreateNew = () => {
      setEditingJudge({
          isActive: true,
          linkedAgentIds: [],
          systemPrompt: ''
      });
      setActiveTab('editor');
  };

  const handleEdit = (judge: JudgeProfile) => {
      setEditingJudge(judge);
      setActiveTab('editor');
  };

  const handleDelete = (id: string) => {
      if(confirm('Tem certeza que deseja excluir este Supervisor?')) {
          setJudges(judges.filter(j => j.id !== id));
      }
  };

  const handleToggleStatus = (id: string) => {
      setJudges(judges.map(j => j.id === id ? { ...j, isActive: !j.isActive } : j));
  };

  const handleSaveJudge = () => {
      if (!editingJudge.name || !editingJudge.llmId) return alert("Nome e LLM são obrigatórios.");

      if (editingJudge.id) {
          setJudges(judges.map(j => j.id === editingJudge.id ? { ...j, ...editingJudge } as JudgeProfile : j));
      } else {
          const newJudge: JudgeProfile = {
              id: Date.now().toString(),
              name: editingJudge.name,
              specialization: editingJudge.specialization || 'Geral',
              llmId: editingJudge.llmId,
              systemPrompt: editingJudge.systemPrompt || '',
              isActive: editingJudge.isActive || false,
              linkedAgentIds: editingJudge.linkedAgentIds || []
          };
          setJudges([...judges, newJudge]);
      }
      setActiveTab('judges');
      setEditingJudge({});
  };

  const toggleAgentLink = (agentId: string) => {
      const currentLinks = editingJudge.linkedAgentIds || [];
      if (currentLinks.includes(agentId)) {
          setEditingJudge({ ...editingJudge, linkedAgentIds: currentLinks.filter(id => id !== agentId) });
      } else {
          setEditingJudge({ ...editingJudge, linkedAgentIds: [...currentLinks, agentId] });
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Gavel className="w-6 h-6 text-brand" />
            LLM Judges (Supervisores)
          </h2>
          <p className="text-slate-400">Crie camadas de supervisão autônoma especializadas por agente.</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border w-full md:w-fit">
        <button 
            onClick={() => setActiveTab('judges')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'judges' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <ShieldCheck className="w-4 h-4" /> Meus Judges
        </button>
        <button 
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'logs' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Activity className="w-4 h-4" /> Logs de Intervenção
        </button>
      </div>

      {/* --- TAB: JUDGES LIST --- */}
      {activeTab === 'judges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-left-4 duration-300">
              {judges.map(judge => {
                  const linkedLLM = MOCK_LLMS.find(l => l.id === judge.llmId);
                  return (
                      <Card key={judge.id} className={`border-l-4 ${judge.isActive ? 'border-l-brand' : 'border-l-slate-600'} bg-dark-surface border-dark-border group hover:border-brand/30 transition-all`}>
                          <CardContent className="pt-6 space-y-4">
                              <div className="flex justify-between items-start">
                                  <div>
                                      <h3 className="font-bold text-white text-lg">{judge.name}</h3>
                                      <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{judge.specialization}</span>
                                  </div>
                                  <Tooltip content={judge.isActive ? "Desativar Judge" : "Ativar Judge"}>
                                      <button 
                                          onClick={() => handleToggleStatus(judge.id)}
                                          className={`w-10 h-5 rounded-full transition-colors relative ${judge.isActive ? 'bg-brand' : 'bg-slate-700'}`}
                                      >
                                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${judge.isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                      </button>
                                  </Tooltip>
                              </div>

                              <div className="bg-slate-900/50 p-3 rounded border border-slate-800/50">
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 flex items-center gap-1">
                                      <Users className="w-3 h-3" /> Agentes Supervisionados
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                      {judge.linkedAgentIds.length > 0 ? (
                                          judge.linkedAgentIds.map(agentId => {
                                              const agent = MOCK_AGENTS.find(a => a.id === agentId);
                                              return (
                                                  <Badge key={agentId} variant="outline" className="text-[10px] border-slate-600 text-slate-300">
                                                      {agent ? agent.name.split(' ')[0] : agentId}
                                                  </Badge>
                                              );
                                          })
                                      ) : (
                                          <span className="text-xs text-slate-600 italic">Nenhum agente vinculado</span>
                                      )}
                                  </div>
                              </div>

                              <div className="text-xs text-slate-500 flex items-center gap-1">
                                  <Bot className="w-3 h-3" /> LLM: <span className="text-slate-300">{linkedLLM?.name || 'N/A'}</span>
                              </div>

                              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                                  <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-slate-700" onClick={() => handleEdit(judge)}>
                                      <Edit className="w-3 h-3 mr-1" /> Editar
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-red-900/20 text-red-400 hover:text-red-300" onClick={() => handleDelete(judge.id)}>
                                      <Trash2 className="w-3 h-3" />
                                  </Button>
                              </div>
                          </CardContent>
                      </Card>
                  );
              })}

              {/* Add New Card */}
              <button 
                  onClick={handleCreateNew}
                  className="border border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center p-8 text-slate-500 hover:text-brand hover:border-brand/50 hover:bg-slate-900/30 transition-all min-h-[250px]"
              >
                  <div className="p-4 bg-slate-800 rounded-full mb-3 group-hover:bg-brand/20 transition-colors">
                      <Plus className="w-8 h-8" />
                  </div>
                  <span className="font-medium">Adicionar Novo Judge</span>
                  <span className="text-xs mt-1">Especialize a supervisão</span>
              </button>
          </div>
      )}

      {/* --- TAB: EDITOR --- */}
      {activeTab === 'editor' && (
          <Card className="bg-dark-surface border-dark-border max-w-4xl animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="border-b border-dark-border flex flex-row justify-between items-center">
                  <CardTitle>{editingJudge.id ? 'Editar Supervisor' : 'Novo Supervisor (Judge)'}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('judges')}><X className="w-5 h-5" /></Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Nome do Judge</label>
                              <Input 
                                  placeholder="Ex: Auditor de Preços" 
                                  value={editingJudge.name || ''} 
                                  onChange={e => setEditingJudge({...editingJudge, name: e.target.value})} 
                              />
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Especialização (Tag)</label>
                              <Input 
                                  placeholder="Ex: Compliance" 
                                  value={editingJudge.specialization || ''} 
                                  onChange={e => setEditingJudge({...editingJudge, specialization: e.target.value})} 
                              />
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">LLM Responsável</label>
                              <select 
                                  className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                  value={editingJudge.llmId || ''}
                                  onChange={(e) => setEditingJudge({...editingJudge, llmId: e.target.value})}
                              >
                                  <option value="">Selecione...</option>
                                  {MOCK_LLMS.map(llm => (
                                      <option key={llm.id} value={llm.id}>{llm.name} ({llm.provider})</option>
                                  ))}
                              </select>
                          </div>
                      </div>

                      <div>
                          <label className="text-xs font-medium text-slate-400 mb-2 block flex items-center gap-2">
                              <Users className="w-3 h-3" /> Vincular aos Agentes
                          </label>
                          <div className="bg-slate-900 rounded-lg border border-dark-border p-3 h-48 overflow-y-auto custom-scrollbar">
                              {MOCK_AGENTS.map(agent => {
                                  const isSelected = editingJudge.linkedAgentIds?.includes(agent.id);
                                  return (
                                      <div 
                                          key={agent.id} 
                                          onClick={() => toggleAgentLink(agent.id)}
                                          className={`flex items-center justify-between p-2 rounded mb-1 cursor-pointer transition-colors ${isSelected ? 'bg-brand/20 border border-brand/30' : 'hover:bg-slate-800 border border-transparent'}`}
                                      >
                                          <div className="flex items-center gap-3">
                                              <img src={agent.avatarUrl} className="w-6 h-6 rounded-full" alt={agent.name} />
                                              <span className={`text-sm ${isSelected ? 'text-white font-medium' : 'text-slate-400'}`}>{agent.name}</span>
                                          </div>
                                          {isSelected && <CheckCircle className="w-4 h-4 text-brand" />}
                                      </div>
                                  );
                              })}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-2">Este Judge irá monitorar todas as conversas dos agentes selecionados.</p>
                      </div>
                  </div>

                  <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Prompt de Julgamento (Regras de Intervenção)</label>
                      <textarea 
                          className="w-full h-40 bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-slate-500 custom-scrollbar"
                          value={editingJudge.systemPrompt || ''}
                          onChange={(e) => setEditingJudge({...editingJudge, systemPrompt: e.target.value})}
                          placeholder="Defina aqui as regras. Ex: Se o agente falar X, intervenha com Y..."
                      />
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-dark-border">
                      <Button variant="ghost" onClick={() => setActiveTab('judges')}>Cancelar</Button>
                      <Button onClick={handleSaveJudge} className="gap-2">
                          <Save className="w-4 h-4" /> Salvar Judge
                      </Button>
                  </div>
              </CardContent>
          </Card>
      )}

      {/* --- TAB: LOGS --- */}
      {activeTab === 'logs' && (
          <Card className="flex-1 flex flex-col bg-dark-surface border-dark-border animate-in slide-in-from-bottom-4 duration-300">
              <CardHeader className="flex flex-row items-center justify-between border-b border-dark-border pb-4">
                  <CardTitle>Histórico de Intervenções</CardTitle>
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
              <CardContent className="p-0 flex-1">
                  <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-300">
                          <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                              <tr>
                                  <th className="px-4 py-3 font-medium">Hora</th>
                                  <th className="px-4 py-3 font-medium">Agente</th>
                                  <th className="px-4 py-3 font-medium">Alvo</th>
                                  <th className="px-4 py-3 font-medium">Motivo</th>
                                  <th className="px-4 py-3 font-medium">Ação</th>
                                  <th className="px-4 py-3 font-medium text-right">Detalhes</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-dark-border">
                              {filteredLogs.map((log) => (
                                  <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{log.timestamp}</td>
                                      <td className="px-4 py-3 text-white font-medium">{log.agentName}</td>
                                      <td className="px-4 py-3 text-xs text-slate-400">{log.competitorName}</td>
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
      )}

      {/* Details Modal */}
      {selectedLog && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
          <Card className="w-full max-w-2xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
              <div>
                <CardTitle>Análise de Intervenção #{selectedLog.id}</CardTitle>
                <p className="text-xs text-slate-400 mt-1">{selectedLog.timestamp} • {selectedLog.competitorName}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedLog(null)}><X className="w-5 h-5" /></Button>
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
