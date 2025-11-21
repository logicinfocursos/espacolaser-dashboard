import React, { useState } from 'react';
import { Settings, Bot, Brain, Key, Edit, Trash2, Plus, Eye, EyeOff, Server, Save, X, Check, Briefcase, Cpu, Activity, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from '../components/ui';
import { MOCK_LLMS, MOCK_AGENT_PROFILES } from '../constants';
import { LLMConfig, AgentProfile } from '../types';

const AISettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'llms' | 'agents' | 'assignments'>('llms');
  
  // LLM State
  const [llms, setLlms] = useState<LLMConfig[]>(MOCK_LLMS);
  const [isLLMModalOpen, setIsLLMModalOpen] = useState(false);
  const [editingLLM, setEditingLLM] = useState<Partial<LLMConfig>>({});
  const [showApiKey, setShowApiKey] = useState(false);

  // Agent State
  const [agents, setAgents] = useState<AgentProfile[]>(MOCK_AGENT_PROFILES);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Partial<AgentProfile>>({});

  // Handlers LLM
  const handleSaveLLM = () => {
    if (editingLLM.id) {
      setLlms(llms.map(l => l.id === editingLLM.id ? { ...l, ...editingLLM } as LLMConfig : l));
    } else {
      setLlms([...llms, { ...editingLLM, id: Date.now().toString(), isActive: true } as LLMConfig]);
    }
    setIsLLMModalOpen(false);
  };

  const handleDeleteLLM = (id: string) => {
    setLlms(llms.filter(l => l.id !== id));
  };

  // Handlers Agent
  const handleSaveAgent = () => {
    if (editingAgent.id) {
      setAgents(agents.map(a => a.id === editingAgent.id ? { ...a, ...editingAgent } as AgentProfile : a));
    } else {
      setAgents([...agents, { ...editingAgent, id: Date.now().toString(), isActive: true } as AgentProfile]);
    }
    setIsAgentModalOpen(false);
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Settings className="w-6 h-6 text-brand" />
            Configurações de IA
          </h2>
          <p className="text-slate-400">Gerencie modelos LLM, personas de agentes e atribuições de tarefas.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Modelos Ativos</div>
                        <div className="text-2xl font-bold text-white">{llms.filter(l => l.isActive).length}</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-brand">
                        <Cpu className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">GPT-4, Gemini, Local</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Agentes Implantados</div>
                        <div className="text-2xl font-bold text-white">{agents.filter(a => a.isActive).length}</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                        <Bot className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Operando 24/7</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Latência Média</div>
                        <div className="text-2xl font-bold text-white">450ms</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-green-400">
                        <Activity className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-green-500 mt-1">Performance Otimizada</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Tokens (Mês)</div>
                        <div className="text-2xl font-bold text-white">1.2M</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-yellow-400">
                        <Zap className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">45% do Orçamento</div>
            </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border w-full md:w-fit">
        <button 
            onClick={() => setActiveTab('llms')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'llms' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Brain className="w-4 h-4" /> LLMs Cadastrados
        </button>
        <button 
            onClick={() => setActiveTab('agents')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'agents' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Bot className="w-4 h-4" /> Agentes
        </button>
        <button 
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'assignments' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Briefcase className="w-4 h-4" /> Atribuição de Agentes
        </button>
      </div>

      {/* --- TAB: LLMS --- */}
      {activeTab === 'llms' && (
        <Card className="bg-dark-surface border-dark-border">
          <CardHeader className="flex flex-row items-center justify-between border-b border-dark-border pb-4">
            <CardTitle className="text-base">Modelos de Linguagem Conectados</CardTitle>
            <Button onClick={() => { setEditingLLM({}); setIsLLMModalOpen(true); }} className="gap-2 text-xs">
              <Plus className="w-4 h-4" /> Novo LLM
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                <tr>
                  <th className="px-6 py-3 font-medium">Nome do LLM</th>
                  <th className="px-6 py-3 font-medium">Provedor</th>
                  <th className="px-6 py-3 font-medium">Modelo</th>
                  <th className="px-6 py-3 font-medium">Chave API</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {llms.map((llm) => (
                  <tr key={llm.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{llm.name}</td>
                    <td className="px-6 py-4 capitalize flex items-center gap-2">
                      {llm.provider === 'openai' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                      {llm.provider === 'google' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      {llm.provider === 'ollama' && <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>}
                      {llm.provider}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{llm.model}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      {llm.apiKey ? `${llm.apiKey.substring(0, 6)}...${llm.apiKey.substring(llm.apiKey.length - 4)}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={llm.isActive ? 'success' : 'destructive'} className="text-[10px]">
                        {llm.isActive ? 'ATIVO' : 'INATIVO'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditingLLM(llm); setIsLLMModalOpen(true); }}>
                          <Edit className="w-4 h-4 text-slate-400 hover:text-white" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteLLM(llm.id)}>
                          <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* --- TAB: AGENTS --- */}
      {activeTab === 'agents' && (
        <Card className="bg-dark-surface border-dark-border">
          <CardHeader className="flex flex-row items-center justify-between border-b border-dark-border pb-4">
            <CardTitle className="text-base">Personas e Agentes Definidos</CardTitle>
            <Button onClick={() => { setEditingAgent({}); setIsAgentModalOpen(true); }} className="gap-2 text-xs">
              <Plus className="w-4 h-4" /> Novo Agente
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                <tr>
                  <th className="px-6 py-3 font-medium">Nome do Agente</th>
                  <th className="px-6 py-3 font-medium">Função</th>
                  <th className="px-6 py-3 font-medium">LLM Associado</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {agents.map((agent) => {
                  const linkedLLM = llms.find(l => l.id === agent.llmId);
                  return (
                    <tr key={agent.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                        <Bot className="w-4 h-4 text-brand" />
                        {agent.name}
                      </td>
                      <td className="px-6 py-4 capitalize text-slate-400">{agent.role.replace('_', ' ')}</td>
                      <td className="px-6 py-4">
                        {linkedLLM ? (
                          <span className="px-2 py-1 rounded bg-slate-800 text-xs border border-slate-700">
                            {linkedLLM.name}
                          </span>
                        ) : <span className="text-red-500 text-xs">Não encontrado</span>}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={agent.isActive ? 'success' : 'destructive'} className="text-[10px]">
                          {agent.isActive ? 'ATIVO' : 'INATIVO'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditingAgent(agent); setIsAgentModalOpen(true); }}>
                            <Edit className="w-4 h-4 text-slate-400 hover:text-white" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteAgent(agent.id)}>
                            <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* --- TAB: ASSIGNMENTS --- */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle>Atribuição por Tarefa do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { id: 'task1', label: 'Investigação via WhatsApp', desc: 'Bot principal para iniciar conversas de sondagem de preço.' },
                { id: 'task2', label: 'Web Crawler / Scraping', desc: 'Agente responsável por limpar e estruturar dados de HTML.' },
                { id: 'task3', label: 'Análise de Sentimento (Auditoria)', desc: 'Verifica se o tom das conversas está adequado.' },
                { id: 'task4', label: 'Geração de Relatórios', desc: 'Resume dados semanais em insights executivos.' },
              ].map((task) => (
                <div key={task.id} className="flex items-start justify-between p-4 bg-slate-900/50 rounded-lg border border-dark-border">
                  <div className="flex-1 mr-4">
                    <h4 className="text-sm font-bold text-white">{task.label}</h4>
                    <p className="text-xs text-slate-500 mt-1">{task.desc}</p>
                  </div>
                  <div className="w-48">
                    <label className="text-[10px] text-slate-400 mb-1 block" title="Selecione o agente responsável por esta tarefa">Agente Responsável</label>
                    <select className="w-full h-8 bg-slate-800 border border-dark-border rounded text-xs text-white px-2 focus:outline-none focus:border-brand">
                      <option value="">Selecione...</option>
                      {agents.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2 mt-2">
                      <label className="text-[10px] text-slate-400">Prioridade:</label>
                      <div className="flex gap-1">
                        <button className="w-4 h-4 rounded-full bg-red-500 border border-white/20" title="Alta"></button>
                        <button className="w-4 h-4 rounded-full bg-yellow-500/30 border border-transparent hover:border-white/20" title="Média"></button>
                        <button className="w-4 h-4 rounded-full bg-green-500/30 border border-transparent hover:border-white/20" title="Baixa"></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" /> Salvar Atribuições
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand/5 border-brand/20 h-fit">
             <CardContent className="p-6">
                <h3 className="text-brand font-bold flex items-center gap-2 mb-2"><Brain className="w-5 h-5"/> Dica de Otimização</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Para tarefas de <strong>Raciocínio Complexo</strong> (como análise de sentimento ou negociação), utilize modelos mais robustos como GPT-4 ou Gemini Pro.
                  <br/><br/>
                  Para tarefas de <strong>Classificação Simples</strong> ou extração de dados (Crawler), modelos menores e mais rápidos (GPT-3.5, Mistral) são mais econômicos e eficientes.
                </p>
             </CardContent>
          </Card>
        </div>
      )}

      {/* --- MODAL: LLM --- */}
      {isLLMModalOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg">
          <Card className="w-full max-w-md bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="border-b border-dark-border pb-4">
              <CardTitle>{editingLLM.id ? 'Editar LLM' : 'Novo LLM'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Nome de Identificação</label>
                <Input 
                  placeholder="Ex: GPT-4 Principal" 
                  value={editingLLM.name || ''} 
                  onChange={e => setEditingLLM({...editingLLM, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1 block">Provedor</label>
                  <select 
                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                    value={editingLLM.provider || 'openai'}
                    onChange={e => setEditingLLM({...editingLLM, provider: e.target.value as any})}
                  >
                    <option value="openai">OpenAI</option>
                    <option value="google">Google Gemini</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="ollama">Ollama (Local)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1 block">Modelo</label>
                  <select 
                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                    value={editingLLM.model || ''}
                    onChange={e => setEditingLLM({...editingLLM, model: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    {editingLLM.provider === 'openai' && (
                      <>
                        <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      </>
                    )}
                    {editingLLM.provider === 'google' && (
                      <>
                         <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                         <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
                      </>
                    )}
                    {editingLLM.provider === 'ollama' && (
                      <>
                         <option value="mistral:latest">Mistral</option>
                         <option value="llama3:latest">Llama 3</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block" title="Chave de API para autenticação">Chave de API</label>
                <div className="relative">
                  <Input 
                    type={showApiKey ? "text" : "password"}
                    placeholder="sk-..." 
                    className="pr-10"
                    value={editingLLM.apiKey || ''} 
                    onChange={e => setEditingLLM({...editingLLM, apiKey: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {editingLLM.provider === 'ollama' && (
                <div>
                   <label className="text-xs font-medium text-slate-400 mb-1 block">URL Base (Opcional)</label>
                   <Input placeholder="http://localhost:11434" value={editingLLM.baseUrl || ''} onChange={e => setEditingLLM({...editingLLM, baseUrl: e.target.value})} />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsLLMModalOpen(false)}>Cancelar</Button>
                <Button onClick={handleSaveLLM}>Salvar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- MODAL: AGENT --- */}
      {isAgentModalOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg">
          <Card className="w-full max-w-lg bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="border-b border-dark-border pb-4">
              <CardTitle>{editingAgent.id ? 'Editar Agente' : 'Novo Agente'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Nome do Agente</label>
                <Input 
                  placeholder="Ex: Julia Investigadora" 
                  value={editingAgent.name || ''} 
                  onChange={e => setEditingAgent({...editingAgent, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1 block" title="A função define o comportamento base">Função</label>
                  <select 
                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                    value={editingAgent.role || ''}
                    onChange={e => setEditingAgent({...editingAgent, role: e.target.value as any})}
                  >
                    <option value="investigator_whatsapp">Investigador WhatsApp</option>
                    <option value="crawler_web">Crawler Web</option>
                    <option value="analyst_price">Analista de Preço</option>
                    <option value="manager">Supervisor / Auditor</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1 block">LLM Principal</label>
                  <select 
                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                    value={editingAgent.llmId || ''}
                    onChange={e => setEditingAgent({...editingAgent, llmId: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    {llms.map(l => (
                      <option key={l.id} value={l.id}>{l.name} ({l.provider})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block" title="Instruções de sistema que definem a personalidade">Prompt de Sistema (System Prompt)</label>
                <textarea 
                  className="w-full h-32 bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-slate-500"
                  placeholder="Você é um agente especializado em..."
                  value={editingAgent.systemPrompt || ''}
                  onChange={e => setEditingAgent({...editingAgent, systemPrompt: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsAgentModalOpen(false)}>Cancelar</Button>
                <Button onClick={handleSaveAgent}>Salvar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AISettings;