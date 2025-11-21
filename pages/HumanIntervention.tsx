
import React, { useState } from 'react';
import { UserCog, Filter, Search, Eye, MessageSquare, Hand, User, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui';
import { MOCK_HUMAN_INTERVENTIONS, MOCK_INTERVENTION_CHAT, MOCK_AGENTS } from '../constants';
import { HumanInterventionLog } from '../types';

const HumanIntervention: React.FC = () => {
  const [filters, setFilters] = useState({
    dateStart: '',
    dateEnd: '',
    user: '',
    agent: '',
  });
  const [selectedIntervention, setSelectedIntervention] = useState<HumanInterventionLog | null>(null);

  // Mock filter logic
  const filteredInterventions = MOCK_HUMAN_INTERVENTIONS.filter(log => {
    const matchesUser = filters.user ? log.intervenerName.toLowerCase().includes(filters.user.toLowerCase()) : true;
    const matchesAgent = filters.agent ? log.originalAgentName.toLowerCase().includes(filters.agent.toLowerCase()) : true;
    return matchesUser && matchesAgent;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <UserCog className="w-6 h-6 text-brand" />
            Monitoramento de Intervenções Humanas
          </h2>
          <p className="text-slate-400">Registro e auditoria de ações manuais em conversas automatizadas.</p>
        </div>
      </div>

      {/* KPI Quick Stat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-dark-border bg-dark-surface">
             <CardContent className="pt-6 flex items-center gap-4">
                 <div className="p-3 bg-brand/10 rounded-lg text-brand">
                     <Hand className="w-6 h-6" />
                 </div>
                 <div>
                     <div className="text-xs text-slate-400">Intervenções (Período)</div>
                     <div className="text-2xl font-bold text-white">{filteredInterventions.length}</div>
                 </div>
             </CardContent>
          </Card>
      </div>

      {/* Filters */}
      <Card className="border-dark-border bg-dark-surface">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Data Inicial</label>
                <Input type="date" className="w-full" onChange={(e) => setFilters({...filters, dateStart: e.target.value})} />
            </div>
            <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Data Final</label>
                <Input type="date" className="w-full" onChange={(e) => setFilters({...filters, dateEnd: e.target.value})} />
            </div>
            <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Usuário (Analista)</label>
                <Input placeholder="Ex: Admin Silva" onChange={(e) => setFilters({...filters, user: e.target.value})} />
            </div>
            <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Agente Afetado</label>
                <select 
                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                    onChange={(e) => setFilters({...filters, agent: e.target.value})}
                >
                    <option value="">Todos</option>
                    {MOCK_AGENTS.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle>Registros de Intervenções Manuais</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                    <tr>
                        <th className="px-6 py-3 font-medium">Data/Hora</th>
                        <th className="px-6 py-3 font-medium">Agente Original</th>
                        <th className="px-6 py-3 font-medium">Concorrente</th>
                        <th className="px-6 py-3 font-medium">Analista</th>
                        <th className="px-6 py-3 font-medium">Ação</th>
                        <th className="px-6 py-3 font-medium">Motivo</th>
                        <th className="px-6 py-3 font-medium text-right">Conversa</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                    {filteredInterventions.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs">
                                <div className="text-white">{log.date}</div>
                                <div className="text-slate-500">{log.timestamp}</div>
                            </td>
                            <td className="px-6 py-4">{log.originalAgentName}</td>
                            <td className="px-6 py-4">{log.competitorName}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <User className="w-3 h-3 text-slate-400" />
                                    {log.intervenerName}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Badge variant={log.actionTaken === 'Assumiu Chat' ? 'warning' : log.actionTaken === 'Pausou Bot' ? 'destructive' : 'default'}>
                                    {log.actionTaken}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-400">{log.reason || '-'}</td>
                            <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="sm" className="gap-2 hover:text-brand" onClick={() => setSelectedIntervention(log)}>
                                    <Eye className="w-4 h-4" /> Ver Chat
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CardContent>
      </Card>

      {/* Chat Modal */}
      {selectedIntervention && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
          <Card className="w-full max-w-lg bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
            <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center shrink-0">
              <div>
                <CardTitle>Histórico da Intervenção</CardTitle>
                <p className="text-xs text-slate-400 mt-1">{selectedIntervention.competitorName} • {selectedIntervention.timestamp}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedIntervention(null)}>X</Button>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto custom-scrollbar bg-slate-950/50 flex-1">
                <div className="space-y-4">
                    {MOCK_INTERVENTION_CHAT.map((msg) => {
                        if (msg.type === 'intervention_marker') {
                            return (
                                <div key={msg.id} className="flex items-center gap-2 py-2">
                                    <div className="h-px bg-red-900/50 flex-1"></div>
                                    <span className="text-[10px] font-bold text-red-500 border border-red-900/50 bg-red-900/10 px-2 py-1 rounded flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        {msg.content}
                                    </span>
                                    <div className="h-px bg-red-900/50 flex-1"></div>
                                </div>
                            );
                        }

                        const isBot = msg.sender === 'bot';
                        const isHuman = msg.sender === 'human_agent';
                        const isCompetitor = msg.sender === 'competitor';

                        return (
                            <div key={msg.id} className={`flex flex-col ${isCompetitor ? 'items-start' : 'items-end'}`}>
                                <div className={`
                                    relative max-w-[85%] p-3 text-sm shadow-md border 
                                    ${isCompetitor 
                                        ? 'bg-slate-800 text-white rounded-r-lg rounded-bl-lg border-slate-700' 
                                        : isHuman 
                                            ? 'bg-red-900/20 text-red-100 rounded-l-lg rounded-br-lg border-red-900/30'
                                            : 'bg-brand/20 text-slate-200 rounded-l-lg rounded-br-lg border-brand/20'
                                    }
                                `}>
                                    <div className="text-xs font-bold mb-1 opacity-70 flex items-center gap-1">
                                        {isHuman && <UserCog className="w-3 h-3" />}
                                        {isBot && <MessageSquare className="w-3 h-3" />}
                                        {isHuman ? 'HUMANO (Você)' : isBot ? 'BOT' : 'CONCORRENTE'}
                                    </div>
                                    {msg.content}
                                    <div className="text-[10px] text-right mt-1 opacity-50">{msg.timestamp}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
            <div className="p-4 border-t border-dark-border bg-dark-surface shrink-0">
                <div className="text-xs text-slate-400 text-center">Fim do histórico disponível para esta sessão.</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HumanIntervention;
