
import React, { useState, useEffect } from 'react';
import { 
    Bot, Brain, Edit, Trash2, Plus, Save, X, 
    HelpCircle, Sparkles, Copy, Thermometer, Sliders, Terminal, 
    User, Camera, RefreshCw, Eye, Fingerprint, UserCheck 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';
import { MOCK_AGENT_PROFILES, MOCK_LLMS } from '../constants';
import { AgentProfile } from '../types';

// --- Extended Type for Local State to support Persona ---
interface ExtendedAgentProfile extends AgentProfile {
    avatarUrl?: string;
    age?: number;
    gender?: 'Feminino' | 'Masculino' | 'Neutro';
    bio?: string;
}

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
    }
];

// --- Mock Avatars for Generation ---
const AVATAR_LIBRARY = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', // Julia
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', // Roberto
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', // Carla
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', // Girl 2
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', // Guy 2
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', // Corporate Woman
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', // Corporate Man
];

const AgentConfig: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'edit' | 'templates'>('list');
    
    // Enriching initial mock data with random personas for demo
    const [agents, setAgents] = useState<ExtendedAgentProfile[]>(() => 
        MOCK_AGENT_PROFILES.map((a, i) => ({
            ...a,
            avatarUrl: AVATAR_LIBRARY[i % AVATAR_LIBRARY.length],
            age: 25 + (i * 3),
            gender: i % 2 === 0 ? 'Feminino' : 'Masculino'
        }))
    );
    
    // Form State
    const [editingAgent, setEditingAgent] = useState<Partial<ExtendedAgentProfile>>({
        temperature: 0.7,
        isActive: true,
        role: 'investigator_whatsapp'
    });

    // Modal State
    const [viewingAgent, setViewingAgent] = useState<ExtendedAgentProfile | null>(null);

    // --- Logic ---

    const handleCreateNew = () => {
        setEditingAgent({
            temperature: 0.7,
            isActive: true,
            systemPrompt: '',
            role: 'investigator_whatsapp',
            avatarUrl: '', 
            age: undefined,
            gender: undefined
        });
        setActiveTab('edit');
    };

    const handleEdit = (agent: ExtendedAgentProfile) => {
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

        // Validation for Investigator Persona
        if (editingAgent.role === 'investigator_whatsapp') {
            if (!editingAgent.avatarUrl || !editingAgent.age || !editingAgent.gender) {
                return alert('Agentes Investigadores WhatsApp precisam de uma Persona completa (Foto, Idade, Gênero).');
            }
        }

        if (editingAgent.id) {
            setAgents(agents.map(a => a.id === editingAgent.id ? { ...a, ...editingAgent } as ExtendedAgentProfile : a));
        } else {
            const newAgent: ExtendedAgentProfile = {
                id: Date.now().toString(),
                name: editingAgent.name,
                role: editingAgent.role,
                llmId: editingAgent.llmId,
                systemPrompt: editingAgent.systemPrompt || '',
                isActive: editingAgent.isActive || false,
                temperature: editingAgent.temperature || 0.7,
                avatarUrl: editingAgent.avatarUrl,
                age: editingAgent.age,
                gender: editingAgent.gender
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

    const generateRandomPersona = () => {
        const randomAvatar = AVATAR_LIBRARY[Math.floor(Math.random() * AVATAR_LIBRARY.length)];
        const randomAge = Math.floor(Math.random() * (45 - 22 + 1)) + 22;
        const randomGender = Math.random() > 0.5 ? 'Feminino' : 'Masculino';
        
        setEditingAgent(prev => ({
            ...prev,
            avatarUrl: randomAvatar,
            age: randomAge,
            gender: randomGender
        }));
    };

    const getBotStyle = (role: string) => {
        switch(role) {
            case 'crawler_web': return 'bg-blue-900/40 text-blue-400 border-blue-500/50';
            case 'analyst_price': return 'bg-emerald-900/40 text-emerald-400 border-emerald-500/50';
            case 'manager': return 'bg-purple-900/40 text-purple-400 border-purple-500/50';
            default: return 'bg-slate-800 text-slate-400 border-slate-700';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <UserCheck className="w-6 h-6 text-brand" />
                        Configurar Agentes & Personas
                    </h2>
                    <p className="text-slate-400">Defina a identidade e o comportamento da sua força de trabalho digital.</p>
                </div>
                
                {/* Tabs Navigation */}
                <div className="flex gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border w-full md:w-fit">
                    <button 
                        onClick={() => setActiveTab('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'list' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Bot className="w-4 h-4" /> Lista de Agentes
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
                        <Sparkles className="w-4 h-4" /> Templates
                    </button>
                </div>
            </div>

            {/* --- TAB: LIST (GRID VIEW) --- */}
            {activeTab === 'list' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {agents.map((agent) => {
                            const llmName = MOCK_LLMS.find(l => l.id === agent.llmId)?.name || 'Desconhecido';
                            const isInvestigator = agent.role === 'investigator_whatsapp';
                            const botStyle = getBotStyle(agent.role);

                            return (
                                <Card key={agent.id} className="group relative hover:border-brand/50 transition-all overflow-hidden">
                                    {agent.isActive && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-full -mr-8 -mt-8"></div>}
                                    
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col items-center mb-4">
                                            <div className="relative mb-3">
                                                {isInvestigator ? (
                                                    agent.avatarUrl ? (
                                                        <img src={agent.avatarUrl} alt={agent.name} className="w-24 h-24 rounded-full object-cover border-4 border-dark-surface shadow-lg" />
                                                    ) : (
                                                        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border-4 border-dark-surface shadow-lg">
                                                            <User className="w-10 h-10 text-slate-500" />
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 border-dark-surface shadow-lg ${botStyle}`}>
                                                        <Bot className="w-12 h-12" />
                                                    </div>
                                                )}
                                                <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-dark-surface ${agent.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            </div>
                                            
                                            <h3 className="font-bold text-lg text-white">{agent.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">
                                                    {agent.role.replace('_', ' ').toUpperCase()}
                                                </Badge>
                                                {isInvestigator && agent.age && (
                                                    <span className="text-xs text-slate-500">{agent.age} anos</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 bg-slate-900/50 p-3 rounded-lg mb-4">
                                            <div className="flex flex-col items-center p-1 border-r border-slate-800">
                                                <span className="text-[10px] uppercase font-bold opacity-70 mb-1">Modelo</span>
                                                <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> {llmName}</span>
                                            </div>
                                            <div className="flex flex-col items-center p-1">
                                                <span className="text-[10px] uppercase font-bold opacity-70 mb-1">Criatividade</span>
                                                <span className="flex items-center gap-1"><Thermometer className="w-3 h-3" /> {agent.temperature}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-auto">
                                            <Button variant="outline" className="flex-1 text-xs h-8 bg-slate-800 hover:bg-slate-700 border-transparent" onClick={() => setViewingAgent(agent)}>
                                                <Eye className="w-3 h-3 mr-2" /> Detalhes
                                            </Button>
                                            <Tooltip content="Editar Configurações">
                                                <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700 hover:border-brand text-slate-400 hover:text-brand" onClick={() => handleEdit(agent)}>
                                                    <Edit className="w-3 h-3" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Excluir Agente">
                                                <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700 hover:border-red-500 text-slate-400 hover:text-red-500" onClick={() => handleDelete(agent.id)}>
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                        
                        {/* Add Card */}
                        <button 
                            onClick={handleCreateNew}
                            className="border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center p-8 text-slate-500 hover:text-brand hover:border-brand/50 hover:bg-slate-900/30 transition-all min-h-[300px] group"
                        >
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                                <Plus className="w-8 h-8 text-slate-400 group-hover:text-brand" />
                            </div>
                            <span className="font-medium text-lg">Criar Novo Agente</span>
                            <span className="text-sm mt-1">Defina persona e função</span>
                        </button>
                    </div>
                </>
            )}

            {/* --- TAB: CREATE / EDIT --- */}
            {activeTab === 'edit' && (
                <Card className="bg-dark-surface border-dark-border animate-in slide-in-from-right-4 duration-300">
                    <CardHeader className="border-b border-dark-border flex flex-row justify-between items-center">
                        <CardTitle>{editingAgent.id ? 'Editar Agente' : 'Criar Novo Agente'}</CardTitle>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Status:</span>
                            <button 
                                onClick={() => setEditingAgent({...editingAgent, isActive: !editingAgent.isActive})}
                                className={`w-10 h-5 rounded-full transition-colors relative ${editingAgent.isActive ? 'bg-brand' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${editingAgent.isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-8">
                        
                        {/* 1. Configurações Básicas */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-l-2 border-blue-500 pl-2 mb-4">Configurações Técnicas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                                        Nome Interno <HelpCircle className="w-3 h-3 text-slate-600" />
                                    </label>
                                    <Input 
                                        placeholder="Ex: Julia - Investigadora SP" 
                                        value={editingAgent.name || ''}
                                        onChange={(e) => setEditingAgent({...editingAgent, name: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                                        Função do Agente <HelpCircle className="w-3 h-3 text-slate-600" />
                                    </label>
                                    <select 
                                        className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                        value={editingAgent.role || ''}
                                        onChange={(e) => setEditingAgent({...editingAgent, role: e.target.value as any})}
                                    >
                                        <option value="investigator_whatsapp">Investigador WhatsApp</option>
                                        <option value="crawler_web">Crawler Web</option>
                                        <option value="analyst_price">Analista de Preço</option>
                                        <option value="manager">Supervisor (Manager)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                                        Modelo de IA (LLM)
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

                                <div>
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>Temperatura (Criatividade): {editingAgent.temperature}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" max="1" step="0.1" 
                                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand"
                                        value={editingAgent.temperature || 0.7}
                                        onChange={(e) => setEditingAgent({...editingAgent, temperature: parseFloat(e.target.value)})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Identidade Virtual (CONDITIONAL) */}
                        {editingAgent.role === 'investigator_whatsapp' && (
                            <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-500">
                                <div className="flex items-center justify-between border-l-2 border-pink-500 pl-2 mb-4">
                                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Identidade Virtual (Persona)</h3>
                                    <Button size="sm" variant="outline" onClick={generateRandomPersona} className="text-brand border-brand/30 hover:bg-brand/10 gap-2 h-7 text-xs">
                                        <Sparkles className="w-3 h-3" /> Gerar Persona Aleatória
                                    </Button>
                                </div>
                                
                                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center">
                                    {/* Avatar Preview */}
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-32 h-32 rounded-full border-4 border-slate-700 overflow-hidden shadow-2xl bg-black relative group">
                                            {editingAgent.avatarUrl ? (
                                                <img src={editingAgent.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                                    <User className="w-12 h-12" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                <Camera className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500">Foto de Perfil</span>
                                    </div>

                                    {/* Persona Fields */}
                                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-slate-400 mb-1 block">URL da Foto</label>
                                            <Input 
                                                placeholder="https://..." 
                                                value={editingAgent.avatarUrl || ''}
                                                onChange={(e) => setEditingAgent({...editingAgent, avatarUrl: e.target.value})}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-medium text-slate-400 mb-1 block">Idade</label>
                                                <Input 
                                                    type="number"
                                                    placeholder="25" 
                                                    value={editingAgent.age || ''}
                                                    onChange={(e) => setEditingAgent({...editingAgent, age: parseInt(e.target.value)})}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-400 mb-1 block">Gênero</label>
                                                <select 
                                                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                                    value={editingAgent.gender || ''}
                                                    onChange={(e) => setEditingAgent({...editingAgent, gender: e.target.value as any})}
                                                >
                                                    <option value="">Selecione</option>
                                                    <option value="Feminino">Feminino</option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Neutro">Neutro</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="flex items-center gap-2 text-yellow-500 bg-yellow-900/10 p-2 rounded border border-yellow-900/30 text-xs">
                                                <Fingerprint className="w-4 h-4" />
                                                Agentes investigadores precisam de uma persona convincente para aumentar a taxa de resposta.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. Comportamento (Prompt) */}
                        <div className="relative">
                            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-l-2 border-brand pl-2 mb-4">Comportamento & Instruções</h3>
                            
                            <div className="relative">
                                <Terminal className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <textarea 
                                    className="w-full h-64 bg-[#0f172a] border border-dark-border rounded-md pl-10 pr-4 py-3 text-sm text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-brand/50 custom-scrollbar resize-y leading-relaxed"
                                    placeholder="Defina aqui o System Prompt (Instrução Mestre)..."
                                    value={editingAgent.systemPrompt || ''}
                                    onChange={(e) => setEditingAgent({...editingAgent, systemPrompt: e.target.value})}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-[10px] text-slate-500">
                                    Dica: Seja específico sobre o que o agente DEVE e NÃO DEVE fazer. Use exemplos.
                                </p>
                                <Button variant="ghost" size="sm" className="text-brand h-6 text-xs gap-1" onClick={() => setActiveTab('templates')}>
                                    <Sparkles className="w-3 h-3" /> Ver Templates Prontos
                                </Button>
                            </div>
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
                </div>
            )}

            {/* --- MODAL: VIEW DETAILS --- */}
            {viewingAgent && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
                    <Card className="w-full max-w-lg bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        
                        {/* Header Background Image */}
                        <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700"></div>
                        
                        {/* Avatar positioning */}
                        <div className="absolute top-16 left-8">
                            {viewingAgent.role === 'investigator_whatsapp' ? (
                                viewingAgent.avatarUrl ? (
                                    <img 
                                        src={viewingAgent.avatarUrl} 
                                        alt={viewingAgent.name} 
                                        className="w-28 h-28 rounded-full border-4 border-dark-surface object-cover shadow-xl bg-black"
                                    />
                                ) : (
                                    <div className="w-28 h-28 rounded-full border-4 border-dark-surface bg-slate-800 flex items-center justify-center shadow-xl">
                                        <User className="w-14 h-14 text-slate-500" />
                                    </div>
                                )
                            ) : (
                                <div className={`w-28 h-28 rounded-full border-4 border-dark-surface shadow-xl flex items-center justify-center ${getBotStyle(viewingAgent.role)}`}>
                                    <Bot className="w-14 h-14" />
                                </div>
                            )}
                        </div>

                        <Button variant="ghost" size="sm" onClick={() => setViewingAgent(null)} className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 h-auto">
                            <X className="w-5 h-5" />
                        </Button>

                        <CardContent className="pt-16 pb-8 px-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{viewingAgent.name}</h2>
                                    <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                                        {viewingAgent.role === 'investigator_whatsapp' ? 'Investigador(a) Virtual' : viewingAgent.role}
                                        <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                        {viewingAgent.age ? `${viewingAgent.age} anos` : 'Idade N/A'}
                                    </p>
                                </div>
                                <Badge variant={viewingAgent.isActive ? 'success' : 'destructive'} className="text-xs px-3 py-1">
                                    {viewingAgent.isActive ? 'ATIVO' : 'INATIVO'}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Modelo LLM</span>
                                    <span className="text-sm text-brand font-medium flex items-center gap-2">
                                        <Brain className="w-4 h-4" />
                                        {MOCK_LLMS.find(l => l.id === viewingAgent.llmId)?.name || 'N/A'}
                                    </span>
                                </div>
                                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Gênero</span>
                                    <span className="text-sm text-slate-200 font-medium flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        {viewingAgent.gender || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Bio do Sistema</h4>
                                    <div className="text-sm text-slate-300 italic leading-relaxed bg-slate-900/50 p-4 rounded border border-slate-800">
                                        "{viewingAgent.systemPrompt?.substring(0, 150)}..."
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 pt-4">
                                    <Button className="flex-1" onClick={() => { setEditingAgent(viewingAgent); setViewingAgent(null); setActiveTab('edit'); }}>
                                        <Edit className="w-4 h-4 mr-2" /> Editar Perfil
                                    </Button>
                                    <Button variant="outline" className="flex-1" onClick={() => setViewingAgent(null)}>
                                        Fechar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AgentConfig;
