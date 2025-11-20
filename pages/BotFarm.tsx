import React from 'react';
import { Smartphone, ShieldAlert, Activity, DollarSign, Play, Pause, Globe, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../components/ui';
import { MOCK_SIM_CARDS, MOCK_TASKS } from '../constants';

const BotFarm: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Gestão de Agentes Investigadores</h2>
          <p className="text-slate-400">Controle de SIM Cards, Tokens LLM e Crawlers.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 border-red-900 text-red-400 hover:bg-red-900/20">
             <ShieldAlert className="w-4 h-4" /> Parada de Emergência
           </Button>
        </div>
      </div>

      {/* Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-brand">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 bg-brand/20 rounded-full text-brand">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Custo Operação (Hoje)</p>
              <p className="text-2xl font-bold text-white">R$ 148,50</p>
              <p className="text-xs text-slate-500">WhatsApp API + LLM Tokens</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-full text-blue-500">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Crawlers Web</p>
              <p className="text-2xl font-bold text-white">8 Ativos</p>
              <p className="text-xs text-slate-500">Monitorando sites/Instagram</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">SIM Cards em Risco</p>
              <p className="text-2xl font-bold text-white">{MOCK_SIM_CARDS.filter(s => s.status === 'risk').length}</p>
              <p className="text-xs text-slate-500">Rotação sugerida</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SIM Card Grid */}
        <Card>
            <CardHeader>
                <CardTitle>Farm de Cartões SIM (WhatsApp)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {MOCK_SIM_CARDS.map(sim => (
                        <div key={sim.id} className="p-3 bg-slate-900 rounded border border-dark-border flex flex-col gap-2 relative overflow-hidden">
                             {sim.status === 'active' && <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 -mr-8 -mt-8 rounded-full"></div>}
                             {sim.status === 'blocked' && <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 -mr-8 -mt-8 rounded-full"></div>}
                             
                            <div className="flex justify-between items-start">
                                <Smartphone className={`w-5 h-5 ${
                                    sim.status === 'active' ? 'text-green-500' : 
                                    sim.status === 'blocked' ? 'text-red-500' : 
                                    sim.status === 'risk' ? 'text-yellow-500' : 'text-slate-500'
                                }`} />
                                <Badge variant={
                                    sim.status === 'active' ? 'success' : 
                                    sim.status === 'blocked' ? 'destructive' : 'warning'
                                }>{sim.status.toUpperCase()}</Badge>
                            </div>
                            <div>
                                <div className="font-mono text-sm text-slate-200">{sim.phoneNumber}</div>
                                <div className="text-xs text-slate-500">{sim.carrier} • Score: {sim.healthScore}%</div>
                            </div>
                            <div className="w-full bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
                                <div className={`h-full ${sim.healthScore > 80 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${sim.healthScore}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Task Queue */}
        <Card>
            <CardHeader>
                <CardTitle>Fila de Investigações</CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden">
                <div className="space-y-3">
                    {MOCK_TASKS.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-dark-border">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-800 rounded">
                                    {task.channel === 'whatsapp' && <MessageCircle className="w-4 h-4 text-green-500" />}
                                    {task.channel === 'web_crawler' && <Globe className="w-4 h-4 text-blue-500" />}
                                    {task.channel === 'voice_call' && <Activity className="w-4 h-4 text-purple-500" />}
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-slate-200">{task.targetName}</div>
                                    <div className="text-xs text-slate-500 flex gap-2">
                                        <span>{task.objective.replace('_', ' ')}</span>
                                        <span>•</span>
                                        <span>R$ {task.cost.toFixed(2)}</span>
                                    </div>
                                </div>
                             </div>
                             <div className="flex items-center gap-2">
                                {task.status === 'running' && <span className="flex w-2 h-2 bg-brand rounded-full animate-pulse"></span>}
                                <span className="text-xs text-slate-400 uppercase font-bold">{task.status}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BotFarm;