
import React, { useState } from 'react';
import { 
    History, Search, Filter, Eye, Calendar, MessageSquare, 
    CheckCircle, XCircle, User, Bot, X, FileText, Tag, Clock, 
    ChevronLeft, ChevronRight, Database, AlertTriangle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';

// --- Interfaces & Mock Data for History Page ---

interface HistoricalConversation {
    id: string;
    jobName: string;
    prospectName: string;
    channel: string;
    startDateTime: string;
    endDateTime: string;
    status: 'Finalizada' | 'Transferida' | 'Erro' | 'Em Andamento';
    finalAgent: 'IA' | 'Usuário (Humano)';
    summary: string;
}

const MOCK_HISTORY: HistoricalConversation[] = [
    { id: 'CV-8291', jobName: 'Campanha Virilha Promo', prospectName: 'Clínica Estética A', channel: 'WhatsApp', startDateTime: '10/03/2024 09:15', endDateTime: '10/03/2024 09:45', status: 'Finalizada', finalAgent: 'IA', summary: 'Cliente interessado, agendou visita.' },
    { id: 'CV-8292', jobName: 'Campanha Virilha Promo', prospectName: 'Salão Beleza Top', channel: 'WhatsApp', startDateTime: '10/03/2024 10:00', endDateTime: '10/03/2024 10:05', status: 'Erro', finalAgent: 'IA', summary: 'Falha no envio, número inválido.' },
    { id: 'CV-8293', jobName: 'Retargeting Leads', prospectName: 'Dra. Ana Dermato', channel: 'E-mail', startDateTime: '09/03/2024 14:00', endDateTime: '09/03/2024 16:20', status: 'Transferida', finalAgent: 'Usuário (Humano)', summary: 'Humano assumiu para negociação complexa.' },
    { id: 'CV-8294', jobName: 'Follow-up', prospectName: 'Studio Zen', channel: 'SMS', startDateTime: '08/03/2024 08:30', endDateTime: '08/03/2024 08:32', status: 'Finalizada', finalAgent: 'IA', summary: 'Cliente pediu para sair da lista.' },
    { id: 'CV-8295', jobName: 'Campanha Virilha Promo', prospectName: 'Centro Estético Vida', channel: 'WhatsApp', startDateTime: '08/03/2024 11:00', endDateTime: '08/03/2024 11:15', status: 'Finalizada', finalAgent: 'IA', summary: 'Coleta de preço realizada com sucesso.' },
];

// Mock for Timeline Messages
interface TimelineMessage {
    id: string;
    sender: 'system' | 'prospect' | 'agent_ai' | 'agent_human';
    text: string;
    timestamp: string;
}

const MOCK_TIMELINE: TimelineMessage[] = [
    { id: '1', sender: 'system', text: 'Job "Campanha Virilha Promo" iniciado. Template #2 enviado.', timestamp: '09:15' },
    { id: '2', sender: 'agent_ai', text: 'Olá! Tudo bem? Vi que você tem interesse em estética. Temos uma condição especial para virilha hoje. Gostaria de saber mais?', timestamp: '09:15' },
    { id: '3', sender: 'prospect', text: 'Olá, tudo bem. Como funciona essa promoção?', timestamp: '09:18' },
    { id: '4', sender: 'agent_ai', text: 'É um pacote de 10 sessões com 30% de desconto. De R$ 1.200 por R$ 840. Parcelamos em 10x.', timestamp: '09:18' },
    { id: '5', sender: 'prospect', text: 'Interessante. Vocês fazem axila também?', timestamp: '09:22' },
    { id: '6', sender: 'system', text: 'Detector de Intenção: Interesse em Cross-sell (Axila).', timestamp: '09:22' },
    { id: '7', sender: 'agent_ai', text: 'Sim! E se fechar junto com a virilha, a axila sai de graça na primeira sessão.', timestamp: '09:23' },
    { id: '8', sender: 'agent_human', text: '[Intervenção] Olá, sou a Carla, gerente aqui. Posso te dar um desconto extra de 5% se fechar agora no PIX.', timestamp: '09:35' },
    { id: '9', sender: 'prospect', text: 'Vou querer! Pode me mandar a chave?', timestamp: '09:40' },
    { id: '10', sender: 'system', text: 'Conversa finalizada. Status: Convertido.', timestamp: '09:45' },
];

const MOCK_EXTRACTED_DATA = {
    services: ['Depilação a Laser (Virilha)', 'Depilação a Laser (Axila)'],
    prices: 'Pacote Virilha: R$ 840,00 (10x)',
    hours: 'Seg-Sex 09:00 às 19:00',
    promos: '30% OFF Virilha + 1ª sessão Axila Grátis',
    sentiment: 'Positivo (Alta Intenção de Compra)',
    contact: 'Carla (Gerente)'
};

const ConversationHistory: React.FC = () => {
    const [history, setHistory] = useState<HistoricalConversation[]>(MOCK_HISTORY);
    const [selectedConversation, setSelectedConversation] = useState<HistoricalConversation | null>(null);
    
    // Filters
    const [filterJob, setFilterJob] = useState('');
    const [filterProspect, setFilterProspect] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');

    // Pagination (Visual Only)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredHistory = history.filter(item => 
        item.jobName.toLowerCase().includes(filterJob.toLowerCase()) &&
        item.prospectName.toLowerCase().includes(filterProspect.toLowerCase()) &&
        (filterStatus ? item.status === filterStatus : true) &&
        (filterDate ? item.startDateTime.includes(filterDate) : true)
    );

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'Finalizada': return <Badge variant="success">FINALIZADA</Badge>;
            case 'Transferida': return <Badge variant="warning" className="bg-yellow-900/20 text-yellow-400 border-yellow-900/50">HUMANO</Badge>;
            case 'Erro': return <Badge variant="destructive">ERRO</Badge>;
            default: return <Badge variant="outline">EM ANDAMENTO</Badge>;
        }
    };

    const getMessageStyle = (sender: TimelineMessage['sender']) => {
        switch(sender) {
            case 'system': return 'bg-blue-900/20 text-blue-300 border border-blue-900/50 text-xs font-mono text-center my-2 py-1';
            case 'prospect': return 'bg-slate-800 text-slate-200 border border-slate-700 self-start rounded-r-xl rounded-bl-xl';
            case 'agent_ai': return 'bg-indigo-900/40 text-indigo-200 border border-indigo-900/50 self-end rounded-l-xl rounded-br-xl';
            case 'agent_human': return 'bg-green-900/20 text-green-300 border border-green-900/50 self-end rounded-l-xl rounded-br-xl font-medium';
            default: return '';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <History className="w-6 h-6 text-brand" />
                    Histórico de Conversas
                </h2>
                <p className="text-slate-400">Auditoria completa e consulta de interações passadas.</p>
            </div>

            {/* Filters */}
            <Card className="bg-dark-surface border-dark-border">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Job / Campanha</label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                <Input 
                                    placeholder="Buscar Job..." 
                                    className="pl-9" 
                                    value={filterJob}
                                    onChange={(e) => setFilterJob(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Prospect</label>
                            <Input 
                                placeholder="Nome ou Telefone" 
                                value={filterProspect}
                                onChange={(e) => setFilterProspect(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Data</label>
                            <Input 
                                type="date" 
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)} // Simple string match for mock
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Status Final</label>
                            <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="Finalizada">Finalizada</option>
                                <option value="Transferida">Transferida (Humano)</option>
                                <option value="Erro">Erro</option>
                            </select>
                        </div>
                        <Button variant="outline" className="gap-2 text-slate-400 hover:text-white" onClick={() => { setFilterJob(''); setFilterProspect(''); setFilterStatus(''); setFilterDate(''); }}>
                            <X className="w-4 h-4" /> Limpar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card className="bg-dark-surface border-dark-border">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">ID / Job</th>
                                <th className="px-6 py-4 font-medium">Prospect</th>
                                <th className="px-6 py-4 font-medium">Canal</th>
                                <th className="px-6 py-4 font-medium">Início / Fim</th>
                                <th className="px-6 py-4 font-medium">Status Final</th>
                                <th className="px-6 py-4 font-medium">Agente Final</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {filteredHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-mono text-xs text-slate-500 mb-1">{item.id}</div>
                                        <div className="font-medium text-white">{item.jobName}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-200">{item.prospectName}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">{item.channel}</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-400">
                                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.startDateTime.split(' ')[0]}</div>
                                        <div className="flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {item.startDateTime.split(' ')[1]} - {item.endDateTime.split(' ')[1]}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="px-6 py-4 text-xs">
                                        <div className="flex items-center gap-2">
                                            {item.finalAgent === 'IA' ? <Bot className="w-3 h-3 text-brand" /> : <User className="w-3 h-3 text-yellow-500" />}
                                            {item.finalAgent}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button 
                                            variant="ghost" size="sm" 
                                            className="hover:bg-slate-700 text-brand hover:text-brand-light gap-2"
                                            onClick={() => setSelectedConversation(item)}
                                        >
                                            <Eye className="w-4 h-4" /> Detalhes
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredHistory.length === 0 && (
                        <div className="p-8 text-center text-slate-500">Nenhuma conversa encontrada.</div>
                    )}
                </div>
                
                {/* Pagination Mock */}
                <div className="p-4 border-t border-dark-border flex items-center justify-between">
                    <div className="text-xs text-slate-500">Mostrando 1-5 de 128 resultados</div>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
                        <Button variant="outline" size="sm" className="bg-brand text-slate-900 border-brand">1</Button>
                        <Button variant="outline" size="sm">2</Button>
                        <Button variant="outline" size="sm">3</Button>
                        <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
                    </div>
                </div>
            </Card>

            {/* Modal: Details */}
            {selectedConversation && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
                    <Card className="w-full max-w-5xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200 h-[85vh] flex flex-col">
                        <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center shrink-0">
                            <div>
                                <CardTitle className="flex items-center gap-3">
                                    Conversa com {selectedConversation.prospectName}
                                    <Badge variant="outline" className="text-xs font-normal">{selectedConversation.channel}</Badge>
                                </CardTitle>
                                <p className="text-xs text-slate-400 mt-1">
                                    ID: {selectedConversation.id} • {selectedConversation.startDateTime}
                                </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}><X className="w-5 h-5" /></Button>
                        </CardHeader>
                        
                        <CardContent className="flex-1 p-0 overflow-hidden flex flex-col md:flex-row">
                            
                            {/* Left: Timeline */}
                            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar border-r border-dark-border bg-slate-950/30">
                                <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> Linha do Tempo
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {MOCK_TIMELINE.map((msg) => (
                                        <div 
                                            key={msg.id} 
                                            className={`max-w-[85%] p-3 shadow-sm text-sm ${getMessageStyle(msg.sender)}`}
                                        >
                                            <div className="flex justify-between items-center mb-1 opacity-70 text-[10px] uppercase font-bold border-b border-white/10 pb-1">
                                                <span>
                                                    {msg.sender === 'system' ? 'SISTEMA' : 
                                                     msg.sender === 'prospect' ? 'PROSPECT' : 
                                                     msg.sender === 'agent_ai' ? 'AGENTE IA' : 'AGENTE HUMANO'}
                                                </span>
                                                <span>{msg.timestamp}</span>
                                            </div>
                                            {msg.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Extracted Data */}
                            <div className="w-full md:w-80 p-6 bg-dark-surface flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                                <div>
                                    <h3 className="text-xs font-bold text-brand uppercase mb-3 flex items-center gap-2">
                                        <Database className="w-3 h-3" /> Dados Extraídos
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="bg-slate-900 p-3 rounded border border-dark-border">
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Serviços Interesse</div>
                                            <div className="flex flex-wrap gap-1">
                                                {MOCK_EXTRACTED_DATA.services.map(s => (
                                                    <Badge key={s} variant="outline" className="text-[10px] bg-brand/10 text-brand border-brand/20">{s}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 p-3 rounded border border-dark-border">
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Preços Informados</div>
                                            <div className="text-sm text-slate-200">{MOCK_EXTRACTED_DATA.prices}</div>
                                        </div>

                                        <div className="bg-slate-900 p-3 rounded border border-dark-border">
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Horário Atendimento</div>
                                            <div className="text-sm text-slate-200">{MOCK_EXTRACTED_DATA.hours}</div>
                                        </div>

                                        <div className="bg-slate-900 p-3 rounded border border-dark-border">
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Promoções Ativas</div>
                                            <div className="text-sm text-yellow-400 flex items-start gap-2">
                                                <Tag className="w-3 h-3 mt-0.5 shrink-0" />
                                                {MOCK_EXTRACTED_DATA.promos}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-dark-border">
                                    <h3 className="text-xs font-bold text-blue-400 uppercase mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3" /> Análise IA
                                    </h3>
                                    <div className="bg-blue-900/10 p-3 rounded border border-blue-900/30 space-y-2">
                                        <div>
                                            <span className="text-[10px] text-slate-400 block">Sentimento</span>
                                            <span className="text-sm font-bold text-green-400">{MOCK_EXTRACTED_DATA.sentiment}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 block">Contato Identificado</span>
                                            <span className="text-sm text-slate-200">{MOCK_EXTRACTED_DATA.contact}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                        <div className="p-4 border-t border-dark-border flex justify-end">
                            <Button variant="outline" onClick={() => setSelectedConversation(null)}>Fechar Visualização</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ConversationHistory;
