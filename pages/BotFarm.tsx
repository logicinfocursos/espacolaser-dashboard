
import React, { useState } from 'react';
import { 
  Smartphone, ShieldAlert, Activity, DollarSign, Play, Pause, 
  Globe, MessageCircle, FileText, Cpu, Terminal, AlertTriangle, 
  Wifi, WifiOff, ScanLine, Image as ImageIcon, Edit3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input } from '../components/ui';
import { MOCK_SIM_CARDS, MOCK_AGENTS, MOCK_SCRIPTS, MOCK_CRAWLER_JOBS, MOCK_LOGS } from '../constants';

const BotFarm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sims' | 'agents' | 'crawlers' | 'logs'>('sims');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Gestão Operacional & Coleta</h2>
          <p className="text-slate-400">Centro de comando para Bots, Crawlers e Infraestrutura.</p>
        </div>
        <div className="flex gap-2">
           <Button 
             variant="outline" 
             onClick={() => setActiveTab('logs')}
             className={`gap-2 ${activeTab === 'logs' ? 'bg-slate-800 border-slate-600' : 'border-slate-800'}`}
           >
             <Terminal className="w-4 h-4" /> Console de Logs
           </Button>
           <Button variant="outline" className="gap-2 border-red-900 text-red-400 hover:bg-red-900/20">
             <ShieldAlert className="w-4 h-4" /> Parar Toda Operação
           </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border w-full md:w-fit">
        <button 
            onClick={() => setActiveTab('sims')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'sims' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Smartphone className="w-4 h-4" /> Frota SIM
        </button>
        <button 
            onClick={() => setActiveTab('agents')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'agents' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Cpu className="w-4 h-4" /> Agentes & Scripts
        </button>
        <button 
            onClick={() => setActiveTab('crawlers')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'crawlers' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <ScanLine className="w-4 h-4" /> Crawlers & OCR
        </button>
      </div>

      {/* --- TAB: SIM CARDS --- */}
      {activeTab === 'sims' && (
        <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="text-sm text-slate-400">Disponibilidade</div>
                        <div className="text-2xl font-bold text-white">92.5%</div>
                        <div className="text-xs text-green-500 mt-1">4 Chips Livres</div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-brand">
                    <CardContent className="pt-6">
                        <div className="text-sm text-slate-400">Custo Est. Hoje</div>
                        <div className="text-2xl font-bold text-white">R$ 148,50</div>
                        <div className="text-xs text-slate-500 mt-1">WhatsApp API + Provedores</div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                        <div className="text-sm text-slate-400">Bloqueios (24h)</div>
                        <div className="text-2xl font-bold text-white">1</div>
                        <div className="text-xs text-red-500 mt-1">Rotação automática ativada</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Gerenciamento de Números</CardTitle>
                    <Button variant="outline" className="text-xs h-8">+ Adicionar Número Virtual</Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MOCK_SIM_CARDS.map(sim => (
                            <div key={sim.id} className="p-4 bg-slate-900 rounded-lg border border-dark-border relative overflow-hidden group hover:border-slate-600 transition-all">
                                {sim.status === 'blocked' && <div className="absolute inset-0 bg-red-900/10 z-0"></div>}
                                
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${sim.status === 'active' ? 'bg-green-900/30 text-green-400' : sim.status === 'blocked' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                                            <Smartphone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-mono font-bold text-slate-200">{sim.phoneNumber}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                {sim.provider === 'physical' ? <Wifi className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                                                {sim.carrier} • {sim.provider.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant={
                                        sim.status === 'active' ? 'success' : 
                                        sim.status === 'blocked' ? 'destructive' : 'warning'
                                    }>{sim.status}</Badge>
                                </div>

                                <div className="mt-4 relative z-10">
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>Saúde da Linha</span>
                                        <span>{sim.healthScore}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full transition-all duration-500 ${sim.healthScore > 80 ? 'bg-green-500' : sim.healthScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                            style={{ width: `${sim.healthScore}%`}}
                                        ></div>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center relative z-10">
                                    <div className="text-xs text-slate-500">Uso: {sim.conversationsCount} conv.</div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="outline" className="h-6 text-[10px] px-2">Reset</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      )}

      {/* --- TAB: AGENTS & SCRIPTS --- */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
            {/* Agents List */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Agentes Investigadores Ativos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {MOCK_AGENTS.map(agent => {
                            const currentScript = MOCK_SCRIPTS.find(s => s.id === agent.assignedScriptId);
                            return (
                                <div key={agent.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-dark-border">
                                    <div className="flex items-center gap-4">
                                        <img src={agent.avatarUrl} className="w-12 h-12 rounded-full border border-slate-700" alt={agent.name} />
                                        <div>
                                            <div className="font-bold text-white">{agent.name}</div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <MessageCircle className="w-3 h-3" />
                                                <span>Script: <span className="text-brand">{currentScript?.title}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right mr-2">
                                            <div className="text-xs text-slate-500">Performance</div>
                                            <div className="text-sm font-bold text-green-400">{agent.successRate}% Sucesso</div>
                                        </div>
                                        <Button variant="outline" className={`w-10 h-10 p-0 rounded-full ${agent.status === 'pausado' ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
                                            {agent.status === 'pausado' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>

            {/* Scripts Editor */}
            <div className="lg:col-span-1">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Configuração de Scripts</CardTitle>
                        <p className="text-xs text-slate-400">O que o robô deve perguntar?</p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                        {MOCK_SCRIPTS.map(script => (
                            <div key={script.id} className="p-3 rounded border border-dark-border bg-slate-900 hover:border-brand/50 cursor-pointer transition-colors group">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-sm text-slate-200">{script.title}</span>
                                    <Edit3 className="w-3 h-3 text-slate-500 group-hover:text-brand" />
                                </div>
                                <div className="text-xs text-slate-400 line-clamp-2 italic font-serif bg-black/20 p-2 rounded">
                                    "{script.content}"
                                </div>
                                <div className="flex gap-1 mt-2">
                                    {script.tags.map(t => (
                                        <span key={t} className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" className="mt-auto border-dashed border-slate-700 text-slate-400 hover:text-brand hover:border-brand">+ Novo Template</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}

      {/* --- TAB: CRAWLERS & OCR --- */}
      {activeTab === 'crawlers' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                      <CardHeader>
                          <CardTitle>Web Scraping (Sites)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {MOCK_CRAWLER_JOBS.filter(j => j.type === 'web_scraping').map(job => (
                             <div key={job.id} className="flex items-center justify-between p-3 border border-dark-border rounded bg-slate-900/30">
                                 <div className="flex items-center gap-3">
                                     <div className="p-2 bg-blue-500/10 text-blue-400 rounded">
                                         <Globe className="w-5 h-5" />
                                     </div>
                                     <div>
                                         <div className="font-medium text-sm">{job.targetName}</div>
                                         <div className="text-xs text-slate-500">{job.targetUrl}</div>
                                     </div>
                                 </div>
                                 <div className="text-right">
                                     <Badge variant={job.status === 'completed' ? 'success' : job.status === 'failed' ? 'destructive' : 'default'}>
                                         {job.status.toUpperCase()}
                                     </Badge>
                                     <div className="text-xs text-slate-500 mt-1">{job.itemsFound} preços extraídos</div>
                                 </div>
                             </div>
                        ))}
                      </CardContent>
                  </Card>

                  <Card>
                      <CardHeader>
                          <CardTitle>Instagram OCR (Stories & Posts)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {MOCK_CRAWLER_JOBS.filter(j => j.type.includes('ocr')).map(job => (
                             <div key={job.id} className="flex gap-3 p-3 border border-dark-border rounded bg-slate-900/30">
                                 <div className="w-16 h-24 bg-slate-800 rounded overflow-hidden relative flex-shrink-0 border border-slate-700">
                                     {job.thumbnailUrl && <img src={job.thumbnailUrl} className="w-full h-full object-cover opacity-50" alt="Story" />}
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         {job.status === 'processing' && <ScanLine className="w-6 h-6 text-brand animate-pulse" />}
                                     </div>
                                 </div>
                                 <div className="flex-1">
                                     <div className="flex justify-between">
                                        <div className="font-medium text-sm">{job.targetName}</div>
                                        <Badge variant="warning" className="text-[10px]">OCR PROCESSING</Badge>
                                     </div>
                                     <div className="text-xs text-slate-400 mt-1">Detectando texto em imagem...</div>
                                     <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                                         <div className="h-full bg-brand w-2/3 animate-pulse"></div>
                                     </div>
                                     <div className="text-[10px] text-slate-500 mt-1 text-right">65% concluído</div>
                                 </div>
                             </div>
                        ))}
                      </CardContent>
                  </Card>
              </div>
          </div>
      )}

      {/* --- TAB: LOGS --- */}
      {activeTab === 'logs' && (
          <Card className="bg-black border-slate-800 font-mono text-sm h-[600px] flex flex-col animate-in fade-in duration-200">
              <div className="p-2 border-b border-slate-800 bg-slate-900/50 text-xs text-slate-400 flex justify-between">
                  <span>SYSTEM LOGS (REAL-TIME)</span>
                  <span>STATUS: LISTENING</span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-2 custom-scrollbar">
                  {MOCK_LOGS.map(log => (
                      <div key={log.id} className="flex gap-3 border-b border-slate-900/50 pb-1">
                          <span className="text-slate-600">[{log.timestamp}]</span>
                          <span className={`font-bold ${
                              log.level === 'error' ? 'text-red-500' : 
                              log.level === 'warning' ? 'text-yellow-500' : 'text-blue-400'
                          }`}>{log.level.toUpperCase()}</span>
                          <span className="text-slate-500">[{log.module}]</span>
                          <span className="text-slate-300">{log.message}</span>
                      </div>
                  ))}
                  <div className="flex gap-3 animate-pulse opacity-50">
                          <span className="text-slate-600">[10:42:45]</span>
                          <span className="text-blue-400 font-bold">INFO</span>
                          <span className="text-slate-500">[SIM_MANAGER]</span>
                          <span className="text-slate-300">Heartbeat check: All systems operational...</span>
                  </div>
              </div>
          </Card>
      )}
    </div>
  );
};

export default BotFarm;
