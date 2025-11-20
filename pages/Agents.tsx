import React from 'react';
import { Phone, MessageSquare, Clock } from 'lucide-react';
import { Card, Badge } from '../components/ui';
import { MOCK_AGENTS } from '../constants';

const Agents: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Agentes Ativos</h2>
          <p className="text-slate-400">Monitoramento de performance da equipe de vendas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_AGENTS.map((agent) => (
          <Card key={agent.id} className="p-4 flex items-center gap-6 hover:border-brand/30 transition-all duration-300 group">
            {/* Persona */}
            <div className="relative">
              <img src={agent.avatarUrl} alt={agent.name} className="w-16 h-16 rounded-full object-cover border-2 border-dark-border group-hover:border-brand" />
              <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-dark-surface ${
                agent.status === 'livre' ? 'bg-green-500' : 
                agent.status === 'em_conversa' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </div>

            {/* Info */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <h3 className="font-bold text-white text-lg">{agent.name}, {agent.age}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                  <Phone className="w-3 h-3" /> {agent.phone}
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <Badge variant={
                  agent.status === 'livre' ? 'success' : 
                  agent.status === 'em_conversa' ? 'warning' : 'destructive'
                } className="text-sm px-3 py-1">
                  {agent.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>

              {/* Metrics */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-1">Conversas</div>
                  <div className="font-mono font-bold text-lg">{agent.conversationsToday}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-1">Sucesso</div>
                  <div className={`font-mono font-bold text-lg ${agent.successRate > 20 ? 'text-green-400' : 'text-white'}`}>
                    {agent.successRate}%
                  </div>
                </div>
              </div>

              {/* Last Activity */}
              <div className="text-right text-sm text-slate-500 flex items-center justify-end gap-2">
                <Clock className="w-4 h-4" />
                {agent.lastActivity}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Agents;