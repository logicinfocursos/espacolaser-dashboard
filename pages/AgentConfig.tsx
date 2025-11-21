
import React, { useState } from 'react';
import { 
    Bot, Brain, Edit, Trash2, Plus, Save, X, 
    HelpCircle, Sparkles, Copy, Thermometer, Sliders, Terminal 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';
import { MOCK_AGENT_PROFILES, MOCK_LLMS } from '../constants';
import { AgentProfile } from '../types';

// --- Mock Data for Templates ---
const MOCK_PROMPT_TEMPLATES = [
    {
        id: 't1',
        title: 'Investigador de Preços (Padrão)',
        description: 'Foca em extrair valores de pacotes e formas de pagamento de forma sutil.',
        role: 'investigator_whatsapp',
        content: 'Você é um cliente interessado em depilação a laser. Seu objetivo é descobrir o preço do pacote de virilha e axila. Não aceite a primeira oferta. Pergunte sobre formas de parcelamento. Seja educado, mas insistente em saber o valor exato.'
    },
    {
        id: 't2',
        title: 'Crawler Analítico',
        description: 'Prompt técnico para estruturar dados desorganizados de HTML em JSON.',
        role: 'crawler_web',
        content: 'Você é um analisador de dados HTML. Sua tarefa é receber o código fonte de uma página de preços e retornar APENAS um JSON válido com a lista de serviços e seus respectivos valores. Ignore textos promocionais irrelevantes.'
    },
    {
        id: 't3',
        title: 'Analista de Sentimento',
        description: 'Classifica a intenção do cliente e o tom da conversa.',
        role: 'manager',
        content: 'Analise a seguinte transcrição de conversa. Classifique o sentimento do cliente como Positivo, Neutro ou Negativo. Identifique se houve intenção de compra explícita. Retorne o resultado em formato JSON: { "sentiment": "", "intent": boolean }.'
    },
    {
        id: 't4',
        title: 'Negociador Agressivo',
        description: 'Tenta obter o maior desconto possível mencionando concorrentes.',
        role: 'investigator_whatsapp',
        content: 'Você está pesquisando preços e quer o menor valor possível. Mencione que viu um preço menor na concorrência (Espaço Laser) e pergunte se eles cobrem a oferta. Se não cobrirem, agradeça e encerre.'
    }
];

const AgentConfig: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'edit' | 'templates'>('list');
    const [agents, setAgents] = useState<AgentProfile[]>(MOCK_AGENT_PROFILES);
    
    // Form State
    const [editingAgent, setEditingAgent] = useState<Partial<AgentProfile>>({
        temperature: 0.7,
        isActive: true
    });

    // Handlers
    const handleCreateNew = () => {
        setEditingAgent({
            temperature: 0.7,
            isActive: true,
            systemPrompt: ''
        });
        setActiveTab('edit');
    };

    const handleEdit = (agent: AgentProfile) => {
        setEditingAgent(agent);
        setActiveTab('edit');
    };

    const handleDelete = (id: string) => {
        if(confirm('Tem certeza que deseja excluir este agente?')) {
            setAgents(agents.filter(a => a.id !== id));
        }
    };

    const handleSave = () => {
        if (!editingAgent.name || !editingAgent.role || !editingAgent.llmId) {
            return alert('Por favor, preencha os campos obrigatórios.');
        }

        if (editingAgent.id) {
            setAgents(agents.map(a => a.id === editingAgent.id ? { ...a, ...editingAgent } as AgentProfile : a));
        } else {
            const newAgent: AgentProfile = {
                id: Date.now().toString(),
                name: editingAgent.name,
                role: editingAgent.role,
                llmId: editingAgent.llmId,
                systemPrompt: editingAgent.systemPrompt || '',
                isActive: editingAgent.isActive || false,
                temperature: editingAgent.temperature || 0.7
            };
            setAgents([newAgent, ...agents]);
        }
        setActiveTab('list');
        setEditingAgent({});
    };

    const applyTemplate = (templateContent: string) => {
        setEditingAgent({ ...editingAgent, systemPrompt: templateContent });
        if(activeTab === 'templates') setActiveTab('edit');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <Bot className="w-6 h-6 text-brand" />
                        Parametrizar Agentes
                    </h2>
                    <p className="text-slate-400">Configure as personalidades, prompts e modelos de inteligência artificial.</p>
                </div>
                
                {/* Tabs Navigation */}
                <div className="flex gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border w-full md:w-fit">
                    <button 
                        onClick={() => setActiveTab('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'list' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Bot className="w-4 h-4" /> Agentes Cadastrados
                    </button>
                    <button 
                        onClick={() => setActiveTab('edit')}
                        className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'edit' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Sliders className="w-4 h-4" /> {editingAgent.id && activeTab === 'edit' ? 'Editar Agente' : 'Criar Agente'}
                    </button>
                    <button 
                        onClick={() => setActiveTab('templates')}
                        className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'templates' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Sparkles className="w-4 h-4" /> Templates de Prompt
                    </button>
                </div>
            </div>

            {/* --- TAB: LIST --- */}
            {activeTab === 'list' && (
                <>
                    <Card className="bg-dark-surface border-dark-border">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-300">
                                <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">ID / Nome</th>
                                        <th className="px-6 py-4 font-medium">Função</th>
                                        <th className="px-6 py-4 font-medium">LLM Associado</th>
                                        <th className="px-6 py-4 font-medium">Prompt de Sistema (Preview)</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-border">
                                    {agents.map((agent) => {
                                        const llmName = MOCK_LLMS.find(l => l.id === agent.llmId)?.name || 'Desconhecido';
                                        return (
                                            <tr key={agent.id} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-white">{agent.name}</div>
                                                    <div className="text-xs text-slate-500 font-mono">ID: {agent.id}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">
                                                        {agent.role.replace('_', ' ').toUpperCase()}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-slate-300">
                                                    <div className="flex items-center gap-1">
                                                        <Brain className="w-3 h-3 text-brand" /> {llmName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs">
                                                    <div className="truncate text-slate-500 italic" title={agent.systemPrompt}>
                                                        "{agent.systemPrompt}"
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={agent.isActive ? 'success' : 'destructive'}>
                                                        {agent.isActive ? 'ATIVO' : 'INATIVO'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Tooltip content="Editar">
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => handleEdit(agent)}>
                                                                <Edit className="w-4 h-4 text-slate-400" />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip content="Excluir">
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-900/20" onClick={() => handleDelete(agent.id)}>
                                                                <Trash2 className="w-4 h-4 text-red-400" />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Floating Action Button */}
                    <button 
                        onClick={handleCreateNew}
                        className="fixed bottom-8 right-8 w-14 h-14 bg-brand hover:bg-brand-dark text-slate-900 rounded-full shadow-lg shadow-brand/30 flex items-center justify-center transition-transform hover:scale-105 z-40"
                    >
                        <Plus className="w-8 h-8" />
                    </button>
                </>
            )}

            {/* --- TAB: CREATE / EDIT --- */}
            {activeTab === 'edit' && (
                <Card className="bg-dark-surface border-dark-border animate-in slide-in-from-right-4 duration-300">
                    <CardHeader className="border-b border-dark-border">
                        <CardTitle>{editingAgent.id ? 'Editar Agente' : 'Criar Novo Agente'}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nome */}
                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                                    Nome do Agente <Tooltip content="Nome interno para identificação no sistema."><HelpCircle className="w-3 h-3 text-slate-600" /></Tooltip>
                                </label>
                                <Input 
                                    placeholder="Ex: Julia - Investigadora SP" 
                                    value={editingAgent.name || ''}
                                    onChange={(e) => setEditingAgent({...editingAgent, name: e.target.value})}
                                />
                            </div>

                            {/* Função */}
                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                                    Função <Tooltip content="Define as permissões e o tipo de tarefa que o agente executará."><HelpCircle className="w-3 h-3 text-slate-600" /></Tooltip>
                                </label>
                                <select 
                                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                    value={editingAgent.role || ''}
                                    onChange={(e) => setEditingAgent({...editingAgent, role: e.target.value as any})}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="investigator_whatsapp">Investigador WhatsApp</option>
                                    <option value="crawler_web">Crawler Web</option>
                                    <option value="analyst_price">Analista de Preço</option>
                                    <option value="manager">Supervisor (Manager)</option>
                                </select>
                            </div>

                            {/* LLM */}
                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                                    LLM Associado <Tooltip content="O modelo de inteligência artificial que processará as respostas."><HelpCircle className="w-3 h-3 text-slate-600" /></Tooltip>
                                </label>
                                <select 
                                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                    value={editingAgent.llmId || ''}
                                    onChange={(e) => setEditingAgent({...editingAgent, llmId: e.target.value})}
                                >
                                    <option value="">Selecione um Modelo...</option>
                                    {MOCK_LLMS.map(llm => (
                                        <option key={llm.id} value={llm.id}>{llm.name} ({llm.provider})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Parâmetros Avançados */}
                            <div className="bg-slate-900 p-4 rounded border border-dark-border">
                                <label className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-1">
                                    Parâmetros do Modelo <Thermometer className="w-3 h-3 text-brand" />
                                </label>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                                            <span>Temperatura (Criatividade)</span>
                                            <span>{editingAgent.temperature}</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" max="1" step="0.1" 
                                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand"
                                            value={editingAgent.temperature || 0.7}
                                            onChange={(e) => setEditingAgent({...editingAgent, temperature: parseFloat(e.target.value)})}
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                                            <span>Preciso (0.0)</span>
                                            <span>Criativo (1.0)</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-400">Status do Agente</span>
                                        <button 
                                            onClick={() => setEditingAgent({...editingAgent, isActive: !editingAgent.isActive})}
                                            className={`w-10 h-5 rounded-full transition-colors relative ${editingAgent.isActive ? 'bg-brand' : 'bg-slate-700'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${editingAgent.isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Prompt de Sistema */}
                        <div className="relative">
                            <label className="text-xs font-medium text-slate-400 mb-2 flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    Prompt de Sistema (System Prompt) 
                                    <Tooltip content="Instrução mestre que define a personalidade e as regras do agente."><HelpCircle className="w-3 h-3 text-slate-600" /></Tooltip>
                                </div>
                                <Button variant="ghost" size="sm" className="text-brand h-6 text-xs gap-1" onClick={() => setActiveTab('templates')}>
                                    <Sparkles className="w-3 h-3" /> Ver Templates
                                </Button>
                            </label>
                            <div className="relative">
                                <Terminal className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <textarea 
                                    className="w-full h-64 bg-[#0f172a] border border-dark-border rounded-md pl-10 pr-4 py-3 text-sm text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-brand/50 custom-scrollbar resize-y leading-relaxed"
                                    placeholder="Você é um agente especializado em..."
                                    value={editingAgent.systemPrompt || ''}
                                    onChange={(e) => setEditingAgent({...editingAgent, systemPrompt: e.target.value})}
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2">
                                Dica: Seja específico sobre o que o agente DEVE e NÃO DEVE fazer. Use exemplos de diálogo se possível.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
                            <Button variant="ghost" onClick={() => setActiveTab('list')}>Cancelar</Button>
                            <Button onClick={handleSave} className="gap-2">
                                <Save className="w-4 h-4" /> Salvar Agente
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            )}

            {/* --- TAB: TEMPLATES --- */}
            {activeTab === 'templates' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                    {MOCK_PROMPT_TEMPLATES.map((template) => (
                        <Card key={template.id} className="bg-dark-surface border-dark-border hover:border-brand/50 transition-all group">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-base text-white group-hover:text-brand transition-colors">
                                        {template.title}
                                    </CardTitle>
                                    <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">
                                        {template.role}
                                    </Badge>
                                </div>
                                <p className="text-xs text-slate-400">{template.description}</p>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-xs text-slate-300 font-mono h-32 overflow-y-auto custom-scrollbar mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {template.content}
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="w-full gap-2 border-slate-700 hover:bg-brand hover:text-slate-900 hover:border-brand transition-all"
                                    onClick={() => applyTemplate(template.content)}
                                >
                                    <Copy className="w-4 h-4" /> Usar este Template
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    
                    {/* Add Custom Template Placeholder */}
                    <Card className="bg-dark-surface border-dark-border border-dashed flex flex-col items-center justify-center p-8 text-slate-500 hover:text-slate-300 hover:border-slate-500 cursor-pointer transition-all">
                        <Plus className="w-12 h-12 mb-2 opacity-50" />
                        <span className="text-sm font-medium">Criar Novo Template</span>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AgentConfig;
