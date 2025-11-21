
import React, { useState, useEffect } from 'react';
import { 
    Activity, MessageSquare, Send, TrendingUp, Smartphone, 
    RefreshCw, Pause, Play, Square, List, Eye, 
    User, Bot, RotateCcw, Hand, CheckCircle, AlertCircle, X 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tooltip } from '../components/ui';
import { MOCK_INTERVENTION_CHAT } from '../constants'; // Reusing mock chat data

// --- Mock Data for this page ---
const MOCK_LIVE_KPIS = {
    activeJobs: 3,
    activeConversations: 42,
    messagesSentToday: 15890,
    responseRate: 12.4,
    blockedNumbers: 2
};

const MOCK_RUNNING_JOBS = [
    { 
        id: '1', name: 'Campanha Virilha Promo', channel: 'WhatsApp', status: 'running', 
        startTime: '09:00', endTime: '18:00', 
        total: 5000, contacted: 1250, notContacted: 3700, failed: 50 
    },
    { 
        id: '2', name: 'Retargeting Leads Frios', channel: 'SMS', status: 'running', 
        startTime: '10:30', endTime: '14:00', 
        total: 2000, contacted: 1800, notContacted: 100, failed: 100 
    },
    { 
        id: '3', name: 'Follow-up Clientes', channel: 'E-mail', status: 'paused', 
        startTime: '08:00', endTime: '20:00', 
        total: 1000, contacted: 200, notContacted: 800, failed: 0 
    }
];

const MOCK_ACTIVE_CHATS = [
    { id: '1', job: 'Campanha Virilha', prospect: 'Clínica Estética A', channel: 'WhatsApp', lastMessage: 'Qual o valor do pacote?', agent: 'Julia (Bot)', status: 'IA', startTime: '10:42' },
    { id: '2', job: 'Campanha Virilha', prospect: 'Salão Beleza Top', channel: 'WhatsApp', lastMessage: 'Não tenho interesse agora.', agent: 'Julia (Bot)', status: 'IA', startTime: '10:40' },
    { id: '3', job: 'Retargeting', prospect: 'Studio Zen', channel: 'SMS', lastMessage: 'SIM', agent: 'Auto-Response', status: 'IA', startTime: '10:38' },
    { id: '4', job: 'Campanha Virilha', prospect: 'Dra. Ana Dermato', channel: 'WhatsApp', lastMessage: 'Pode me ligar?', agent: 'Roberto (Humano)', status: 'Humano', startTime: '10:15' },
    { id: '5', job: 'Follow-up', prospect: 'Centro Estético Vida', channel: 'E-mail', lastMessage: 'Obrigado pelo contato.', agent: 'Bot Mailer', status: 'IA', startTime: '09:00' },
];

const JobMonitoring: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [runningJobs, setRunningJobs] = useState(MOCK_RUNNING_JOBS);
    const [activeChats, setActiveChats] = useState(MOCK_ACTIVE_CHATS);
    
    // Modal States
    const [queueModalOpen, setQueueModalOpen] = useState<string | null>(null);
    const [chatModalOpen, setChatModalOpen] = useState<string | null>(null);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulating data fetch
        setTimeout(() => {
            setIsRefreshing(false);
            // Randomize slightly for visual effect
            setActiveChats(prev => prev.map(c => ({ ...c, startTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) })));
        }, 1000);
    };

    const toggleJobStatus = (id: string) => {
        setRunningJobs(jobs => jobs.map(j => 
            j.id === id ? { ...j, status: j.status === 'running' ? 'paused' : 'running' } : j
        ));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-brand" />
                        Monitoramento de Jobs
                    </h2>
                    <p className="text-slate-400">Acompanhamento em tempo real da execução e interações.</p>
                </div>
                <Button 
                    variant="outline" 
                    className="gap-2" 
                    onClick={handleRefresh} 
                    disabled={isRefreshing}
                >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Atualizando...' : 'Atualizar Tela'}
                </Button>
            </div>

            {/* 1. KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
                    <CardContent className="pt-6 p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs text-slate-400 uppercase font-bold">Jobs Ativos</div>
                                <div className="text-2xl font-bold text-white mt-1">{MOCK_LIVE_KPIS.activeJobs}</div>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-lg text-brand"><Activity className="w-5 h-5" /></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500 bg-dark-surface border-dark-border">
                    <CardContent className="pt-6 p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs text-slate-400 uppercase font-bold">Conversas</div>
                                <div className="text-2xl font-bold text-white mt-1">{MOCK_LIVE_KPIS.activeConversations}</div>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-lg text-blue-500"><MessageSquare className="w-5 h-5" /></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500 bg-dark-surface border-dark-border">
                    <CardContent className="pt-6 p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs text-slate-400 uppercase font-bold">Msg Enviadas</div>
                                <div className="text-2xl font-bold text-white mt-1">{(MOCK_LIVE_KPIS.messagesSentToday / 1000).toFixed(1)}k</div>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-lg text-green-500"><Send className="w-5 h-5" /></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500 bg-dark-surface border-dark-border">
                    <CardContent className="pt-6 p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs text-slate-400 uppercase font-bold">Taxa Resp.</div>
                                <div className="text-2xl font-bold text-white mt-1">{MOCK_LIVE_KPIS.responseRate}%</div>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-lg text-yellow-500"><TrendingUp className="w-5 h-5" /></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500 bg-dark-surface border-dark-border">
                    <CardContent className="pt-6 p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs text-slate-400 uppercase font-bold">Bloqueios</div>
                                <div className="text-2xl font-bold text-white mt-1">{MOCK_LIVE_KPIS.blockedNumbers}</div>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-lg text-red-500"><Smartphone className="w-5 h-5" /></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. Tabela de Jobs em Execução */}
            <Card className="bg-dark-surface border-dark-border">
                <CardHeader>
                    <CardTitle>Fila de Execução de Jobs</CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">Nome do Job</th>
                                <th className="px-6 py-4 font-medium">Canal</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Janela de Execução</th>
                                <th className="px-6 py-4 font-medium">Progresso de Contato</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {runningJobs.map((job) => {
                                const progress = (job.contacted / job.total) * 100;
                                return (
                                    <tr key={job.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{job.name}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px]">{job.channel}</Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={job.status === 'running' ? 'success' : 'warning'} className="animate-pulse">
                                                {job.status === 'running' ? 'EM EXECUÇÃO' : 'PAUSADO'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                            {job.startTime} - {job.endTime}
                                        </td>
                                        <td className="px-6 py-4 w-64">
                                            <div className="flex justify-between text-[10px] mb-1 text-slate-400">
                                                <span>{job.contacted} OK</span>
                                                <span>{job.failed} Erro</span>
                                                <span>{job.total} Total</span>
                                            </div>
                                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                                                <div className="bg-green-500 h-full" style={{ width: `${(job.contacted/job.total)*100}%` }}></div>
                                                <div className="bg-red-500 h-full" style={{ width: `${(job.failed/job.total)*100}%` }}></div>
                                            </div>
                                            <div className="text-xs text-brand text-right mt-1 font-bold">{progress.toFixed(1)}%</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Tooltip content={job.status === 'running' ? "Pausar Disparos" : "Retomar Disparos"}>
                                                    <Button 
                                                        variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700"
                                                        onClick={() => toggleJobStatus(job.id)}
                                                    >
                                                        {job.status === 'running' ? <Pause className="w-4 h-4 text-yellow-500" /> : <Play className="w-4 h-4 text-green-500" />}
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Parar Definitivamente">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-900/20">
                                                        <Square className="w-4 h-4 text-red-500 fill-current" />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Ver Fila de Prospects">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => setQueueModalOpen(job.id)}>
                                                        <List className="w-4 h-4 text-brand" />
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

            {/* 3. Tabela de Conversas Ativas */}
            <Card className="bg-dark-surface border-dark-border">
                <CardHeader>
                    <CardTitle>Conversas em Andamento</CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">Prospect / Job</th>
                                <th className="px-6 py-4 font-medium">Canal</th>
                                <th className="px-6 py-4 font-medium">Última Mensagem</th>
                                <th className="px-6 py-4 font-medium">Agente / Status</th>
                                <th className="px-6 py-4 font-medium">Início</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {activeChats.map((chat) => (
                                <tr key={chat.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{chat.prospect}</div>
                                        <div className="text-xs text-slate-500">{chat.job}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">{chat.channel}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-300 truncate max-w-[180px] italic">"{chat.lastMessage}"</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {chat.status === 'IA' ? <Bot className="w-4 h-4 text-brand" /> : <User className="w-4 h-4 text-yellow-500" />}
                                            <div>
                                                <div className="text-xs text-slate-300">{chat.agent}</div>
                                                <Badge variant={chat.status === 'IA' ? 'default' : 'warning'} className="text-[10px] h-5 px-1.5">
                                                    {chat.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{chat.startTime}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {chat.status === 'IA' ? (
                                                <Tooltip content="Assumir Conversa (Humano)">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-yellow-900/20">
                                                        <Hand className="w-4 h-4 text-yellow-500" />
                                                    </Button>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip content="Devolver para IA">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-brand/20">
                                                        <RotateCcw className="w-4 h-4 text-brand" />
                                                    </Button>
                                                </Tooltip>
                                            )}
                                            <Tooltip content="Ver Histórico Completo">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => setChatModalOpen(chat.id)}>
                                                    <Eye className="w-4 h-4 text-slate-400" />
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

            {/* --- Modal: View Queue --- */}
            {queueModalOpen && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
                    <Card className="w-full max-w-md bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
                        <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
                            <CardTitle className="text-base">Fila de Disparos Pendentes</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => setQueueModalOpen(null)}><X className="w-5 h-5" /></Button>
                        </CardHeader>
                        <CardContent className="p-0 h-96 overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left text-xs text-slate-300">
                                <thead className="bg-slate-900 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2">Prospect</th>
                                        <th className="px-4 py-2">Número</th>
                                        <th className="px-4 py-2">Prioridade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {Array.from({ length: 15 }).map((_, i) => (
                                        <tr key={i} className="hover:bg-slate-800/50">
                                            <td className="px-4 py-2">Lead Exemplo {i+1}</td>
                                            <td className="px-4 py-2 font-mono text-slate-500">(11) 99999-{1000+i}</td>
                                            <td className="px-4 py-2"><Badge variant="outline" className="text-[10px]">Alta</Badge></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* --- Modal: Chat History --- */}
            {chatModalOpen && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
                    <Card className="w-full max-w-lg bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
                        <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center shrink-0">
                            <div>
                                <CardTitle>Histórico da Conversa</CardTitle>
                                <p className="text-xs text-slate-400 mt-1">Prospect ID: {chatModalOpen}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setChatModalOpen(null)}><X className="w-5 h-5" /></Button>
                        </CardHeader>
                        <CardContent className="p-4 overflow-y-auto custom-scrollbar bg-slate-950/50 flex-1 space-y-4">
                             {MOCK_INTERVENTION_CHAT.filter(m => m.type !== 'intervention_marker').map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === 'competitor' ? 'items-start' : 'items-end'}`}>
                                    <div className={`
                                        relative max-w-[85%] p-3 text-sm shadow-md border rounded-lg
                                        ${msg.sender === 'competitor' 
                                            ? 'bg-slate-800 text-white border-slate-700 rounded-tl-none' 
                                            : 'bg-brand/20 text-slate-200 border-brand/20 rounded-tr-none'
                                        }
                                    `}>
                                        <div className="text-xs font-bold mb-1 opacity-70 flex items-center gap-1">
                                            {msg.sender === 'competitor' ? 'PROSPECT' : 'BOT / AGENTE'}
                                        </div>
                                        {msg.content}
                                        <div className="text-[10px] text-right mt-1 opacity-50">{msg.timestamp}</div>
                                    </div>
                                </div>
                            ))}
                            {/* Fake Typing Indicator */}
                            <div className="flex items-center gap-2 text-xs text-slate-500 ml-2 animate-pulse">
                                <Bot className="w-3 h-3" /> IA gerando resposta...
                            </div>
                        </CardContent>
                        <div className="p-4 border-t border-dark-border bg-dark-surface shrink-0 flex gap-2">
                            <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                                <Hand className="w-4 h-4 mr-2" /> Assumir Chat
                            </Button>
                            <Button variant="outline" className="w-full">Fechar</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default JobMonitoring;
