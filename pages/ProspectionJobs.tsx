
import React, { useState } from 'react';
import { Briefcase, Plus, Play, Pause, Edit, Trash2, RotateCcw, Save, X, HelpCircle, Calendar, Clock, MessageSquare, Users, Smartphone, Activity, Send, DollarSign, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';
import { MOCK_JOBS } from '../constants';
import { ProspectionJob } from '../types';

const ProspectionJobs: React.FC = () => {
  const [jobs, setJobs] = useState<ProspectionJob[]>(MOCK_JOBS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<ProspectionJob>>({});

  const handleSave = () => {
    if (!editingJob.name) return alert("O nome do Job é obrigatório.");
    
    if (editingJob.id) {
        setJobs(jobs.map(j => j.id === editingJob.id ? { ...j, ...editingJob } as ProspectionJob : j));
    } else {
        const newJob: ProspectionJob = {
            id: Date.now().toString(),
            name: editingJob.name || 'Novo Job',
            description: editingJob.description || '',
            channel: editingJob.channel || 'WhatsApp',
            status: editingJob.status || 'Ativo',
            startDate: editingJob.startDate || new Date().toLocaleString(),
            endDate: editingJob.endDate,
            cadence: editingJob.cadence || '60-90s',
            prospectsCount: 0,
            progress: 0
        };
        setJobs([newJob, ...jobs]);
    }
    setIsFormOpen(false);
    setEditingJob({});
  };

  const handleEdit = (job: ProspectionJob) => {
      setEditingJob(job);
      setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
      if(confirm('Tem certeza que deseja excluir este job?')) {
          setJobs(jobs.filter(j => j.id !== id));
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-brand" />
            Gestão de Jobs
          </h2>
          <p className="text-slate-400">Configure campanhas e automatize a prospecção de novos leads.</p>
        </div>
        {!isFormOpen && (
            <Button className="gap-2 shadow-lg shadow-brand/20" onClick={() => { setEditingJob({}); setIsFormOpen(true); }}>
                <Plus className="w-4 h-4" /> Novo Job
            </Button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Jobs Ativos</div>
                        <div className="text-2xl font-bold text-white">{jobs.filter(j => j.status === 'Ativo').length}</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-brand">
                        <Activity className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Rodando agora</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Disparos/Dia</div>
                        <div className="text-2xl font-bold text-white">15.4k</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                        <Send className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Volume diário</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Custo Estimado</div>
                        <div className="text-2xl font-bold text-white">R$ 450</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-yellow-400">
                        <DollarSign className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Projeção mensal</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Leads Gerados</div>
                        <div className="text-2xl font-bold text-white">320</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-green-400">
                        <Target className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-green-500 mt-1">Últimos 7 dias</div>
            </CardContent>
        </Card>
      </div>

      {isFormOpen ? (
          <Card className="bg-dark-surface border-dark-border animate-in slide-in-from-bottom-4 duration-300">
              <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
                  <CardTitle>{editingJob.id ? 'Editar Job' : 'Novo Job de Prospecção'}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setIsFormOpen(false)}><X className="w-5 h-5" /></Button>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                  
                  {/* Section 1: Info Básica */}
                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-l-2 border-brand pl-2">Informações Gerais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Nome do Job *</label>
                              <Input 
                                placeholder="Ex: Campanha Retenção Jan/24" 
                                value={editingJob.name || ''}
                                onChange={(e) => setEditingJob({...editingJob, name: e.target.value})}
                              />
                          </div>
                          <div className="md:col-span-2">
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Descrição</label>
                              <Input 
                                placeholder="Objetivo da campanha..." 
                                value={editingJob.description || ''}
                                onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Canal de Envio</label>
                              <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={editingJob.channel || 'WhatsApp'}
                                onChange={(e) => setEditingJob({...editingJob, channel: e.target.value as any})}
                              >
                                  <option value="WhatsApp">WhatsApp</option>
                                  <option value="SMS">SMS</option>
                                  <option value="E-mail">E-mail</option>
                                  <option value="Telegram">Telegram</option>
                                  <option value="Instagram">Instagram Direct</option>
                                  <option value="Facebook">Facebook Messenger</option>
                                  <option value="TikTok">TikTok DM</option>
                              </select>
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Status Inicial</label>
                              <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={editingJob.status || 'Ativo'}
                                onChange={(e) => setEditingJob({...editingJob, status: e.target.value as any})}
                              >
                                  <option value="Ativo">Ativo</option>
                                  <option value="Pausado">Pausado</option>
                                  <option value="Rascunho">Rascunho</option>
                              </select>
                          </div>
                      </div>
                  </div>

                  {/* Section 2: Filtros (Targeting) */}
                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-l-2 border-blue-500 pl-2">Público Alvo</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">UFs (Região)</label>
                              <select multiple className="w-full h-24 bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50 custom-scrollbar">
                                  <option>SP - São Paulo</option>
                                  <option>RJ - Rio de Janeiro</option>
                                  <option>MG - Minas Gerais</option>
                                  <option>RS - Rio Grande do Sul</option>
                                  <option>PR - Paraná</option>
                              </select>
                              <p className="text-[10px] text-slate-500 mt-1">Segure Ctrl para selecionar múltiplos.</p>
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Filtro de Rede (Opcional)</label>
                              <select className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50">
                                  <option value="">Todas as Redes</option>
                                  <option>LaserFast</option>
                                  <option>Vialaser</option>
                                  <option>MaisLaser</option>
                              </select>
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Preferência de Canal</label>
                              <select className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50">
                                  <option value="">Indiferente</option>
                                  <option>Apenas WhatsApp</option>
                                  <option>Apenas E-mail</option>
                              </select>
                          </div>
                      </div>
                  </div>

                  {/* Section 3: Recursos */}
                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-l-2 border-yellow-500 pl-2">Recursos de Disparo</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block flex items-center gap-2">
                                  <Smartphone className="w-3 h-3" /> Chips / Remetentes
                              </label>
                              <div className="p-3 bg-slate-900 rounded border border-dark-border h-32 overflow-y-auto custom-scrollbar space-y-2">
                                  <div className="flex items-center gap-2"><input type="checkbox" checked className="accent-brand" /> <span className="text-sm text-slate-300">+55 11 99999-0001 (Vivo)</span></div>
                                  <div className="flex items-center gap-2"><input type="checkbox" checked className="accent-brand" /> <span className="text-sm text-slate-300">+55 11 99999-0002 (Tim)</span></div>
                                  <div className="flex items-center gap-2"><input type="checkbox" className="accent-brand" /> <span className="text-sm text-slate-300">+55 21 98888-5555 (Claro)</span></div>
                                  <div className="flex items-center gap-2"><input type="checkbox" className="accent-brand" /> <span className="text-sm text-slate-300">SMTP Marketing (email@...)</span></div>
                              </div>
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block flex items-center gap-2">
                                  <MessageSquare className="w-3 h-3" /> Templates de Mensagem
                              </label>
                              <div className="p-3 bg-slate-900 rounded border border-dark-border h-32 overflow-y-auto custom-scrollbar space-y-2">
                                  <div className="flex items-center gap-2"><input type="checkbox" checked className="accent-brand" /> <span className="text-sm text-slate-300">Abordagem Inicial (Vendas)</span></div>
                                  <div className="flex items-center gap-2"><input type="checkbox" className="accent-brand" /> <span className="text-sm text-slate-300">Follow-up 3 dias</span></div>
                                  <div className="flex items-center gap-2"><input type="checkbox" className="accent-brand" /> <span className="text-sm text-slate-300">Promoção Relâmpago</span></div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Section 4: Execução */}
                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-l-2 border-purple-500 pl-2">Regras de Execução</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Início</label>
                              <Input type="datetime-local" defaultValue="2024-03-15T09:00" className="text-xs" />
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Fim (Opcional)</label>
                              <Input type="datetime-local" className="text-xs" />
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block flex items-center gap-1" title="Intervalo de tempo aleatório entre envios para evitar bloqueios.">
                                  Cadência (seg) <HelpCircle className="w-3 h-3 text-slate-500 cursor-help" />
                              </label>
                              <Input 
                                placeholder="ex: 30-60" 
                                value={editingJob.cadence || ''}
                                onChange={(e) => setEditingJob({...editingJob, cadence: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block flex items-center gap-1" title="Quantas vezes tentar contatar o mesmo número em caso de falha.">
                                  Tentativas <HelpCircle className="w-3 h-3 text-slate-500 cursor-help" />
                              </label>
                              <Input type="number" placeholder="3" defaultValue="1" />
                          </div>
                      </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-6 border-t border-dark-border">
                      <Button variant="ghost" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
                      <Button onClick={handleSave} className="gap-2">
                          <Save className="w-4 h-4" /> Salvar Job
                      </Button>
                  </div>
              </CardContent>
          </Card>
      ) : (
          <Card className="bg-dark-surface border-dark-border">
              <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                      <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                          <tr>
                              <th className="px-6 py-4 font-medium">Job / Campanha</th>
                              <th className="px-6 py-4 font-medium">Canal</th>
                              <th className="px-6 py-4 font-medium">Status</th>
                              <th className="px-6 py-4 font-medium">Cronograma</th>
                              <th className="px-6 py-4 font-medium">Progresso</th>
                              <th className="px-6 py-4 font-medium text-right">Ações</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-border">
                          {jobs.map((job) => (
                              <tr key={job.id} className="hover:bg-slate-800/50 transition-colors">
                                  <td className="px-6 py-4">
                                      <div className="font-medium text-white">{job.name}</div>
                                      <div className="text-xs text-slate-500 truncate max-w-[200px]">{job.description}</div>
                                  </td>
                                  <td className="px-6 py-4">
                                      <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">{job.channel}</Badge>
                                  </td>
                                  <td className="px-6 py-4">
                                      <Badge variant={
                                          job.status === 'Ativo' ? 'success' : 
                                          job.status === 'Pausado' ? 'warning' : 
                                          job.status === 'Concluído' ? 'default' : 'destructive'
                                      }>
                                          {job.status}
                                      </Badge>
                                  </td>
                                  <td className="px-6 py-4 text-xs">
                                      <div className="flex items-center gap-1 text-slate-400"><Play className="w-3 h-3" /> {job.startDate}</div>
                                      {job.endDate && <div className="flex items-center gap-1 text-slate-500 mt-1"><X className="w-3 h-3" /> {job.endDate}</div>}
                                  </td>
                                  <td className="px-6 py-4">
                                      <div className="flex items-center justify-between text-xs mb-1 text-slate-400">
                                          <span>{job.progress}%</span>
                                          <span>{Math.floor(job.prospectsCount * (job.progress/100))} / {job.prospectsCount}</span>
                                      </div>
                                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                          <div className={`h-full ${job.status === 'Concluído' ? 'bg-green-500' : 'bg-brand'}`} style={{ width: `${job.progress}%` }}></div>
                                      </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-2">
                                          {job.status === 'Ativo' ? (
                                              <Tooltip content="Pausar Job">
                                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-900/20">
                                                      <Pause className="w-4 h-4" />
                                                  </Button>
                                              </Tooltip>
                                          ) : (
                                              <Tooltip content="Iniciar/Retomar Job">
                                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-green-900/20">
                                                      <Play className="w-4 h-4" />
                                                  </Button>
                                              </Tooltip>
                                          )}
                                          <Tooltip content="Editar Configurações">
                                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white" onClick={() => handleEdit(job)}>
                                                  <Edit className="w-4 h-4" />
                                              </Button>
                                          </Tooltip>
                                          <Tooltip content="Excluir Definitivamente">
                                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={() => handleDelete(job.id)}>
                                                  <Trash2 className="w-4 h-4" />
                                              </Button>
                                          </Tooltip>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </Card>
      )}
    </div>
  );
};

export default ProspectionJobs;
