
import React, { useState } from 'react';
import { CircleDollarSign, TrendingUp, AlertTriangle, PieChart, Eye, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui';
import { MOCK_COST_HISTORY, MOCK_COST_LOGS } from '../constants';
import { CostLog } from '../types';

const CostControl: React.FC = () => {
  const [monthlyLimit, setMonthlyLimit] = useState(500);
  const [alertThreshold, setAlertThreshold] = useState(80);
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [selectedLog, setSelectedLog] = useState<CostLog | null>(null);

  const totalCost = MOCK_COST_HISTORY.reduce((acc, curr) => acc + curr.cost, 0);
  const remaining = monthlyLimit - totalCost;
  const percentUsed = (totalCost / monthlyLimit) * 100;
  const costPerToken = 0.00002; // Mock avg

  // Determine status color
  const statusColor = percentUsed >= 90 ? 'text-red-500' : percentUsed >= alertThreshold ? 'text-yellow-500' : 'text-green-500';
  const progressBarColor = percentUsed >= 90 ? 'bg-red-500' : percentUsed >= alertThreshold ? 'bg-yellow-500' : 'bg-brand';

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Alert Banner */}
      {percentUsed >= alertThreshold && (
        <div className={`w-full p-3 rounded-lg flex items-center gap-3 border ${percentUsed >= 100 ? 'bg-red-900/20 border-red-900 text-red-400' : 'bg-yellow-900/20 border-yellow-900 text-yellow-400'}`}>
          <AlertTriangle className="w-5 h-5" />
          <span className="font-bold text-sm">
            {percentUsed >= 100 ? 'LIMITE EXCEDIDO: As operações de IA podem ser interrompidas.' : `ALERTA DE GASTOS: Você atingiu ${percentUsed.toFixed(0)}% do orçamento mensal.`}
          </span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6 text-brand" />
            Controle de Custos - LLMs
          </h2>
          <p className="text-slate-400">Gestão financeira de consumo de API (OpenAI, Gemini, etc).</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-dark-border bg-dark-surface">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-slate-400">Custo Total (Mês)</div>
                <div className={`text-2xl font-bold ${statusColor}`}>R$ {totalCost.toFixed(2)}</div>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
               <div className={`h-full ${progressBarColor}`} style={{ width: `${Math.min(percentUsed, 100)}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dark-border bg-dark-surface">
          <CardContent className="pt-6">
             <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-slate-400">Limite Mensal</div>
                <div className="text-2xl font-bold text-slate-200">R$ {monthlyLimit.toFixed(2)}</div>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <PieChart className="w-5 h-5" />
              </div>
            </div>
             <div className="text-xs text-slate-500 mt-3">Configurado manualmente</div>
          </CardContent>
        </Card>

        <Card className="border-dark-border bg-dark-surface">
           <CardContent className="pt-6">
             <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-slate-400">Restante</div>
                <div className="text-2xl font-bold text-white">R$ {Math.max(remaining, 0).toFixed(2)}</div>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
             <div className="text-xs text-slate-500 mt-3">Suficiente para ~{(remaining / 0.5).toFixed(0)} conv.</div>
          </CardContent>
        </Card>

        <Card className="border-dark-border bg-dark-surface">
           <CardContent className="pt-6">
             <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-slate-400">Custo Médio / Token</div>
                <div className="text-2xl font-bold text-white">R$ {costPerToken}</div>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <CircleDollarSign className="w-5 h-5" />
              </div>
            </div>
             <div className="text-xs text-slate-500 mt-3">Baseado no mix de modelos</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart & Config Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 bg-dark-surface border-dark-border">
          <CardHeader>
            <CardTitle>Evolução de Custo Diário (30 Dias)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_COST_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit=" R$" />
                <Tooltip 
                    contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff'}}
                    itemStyle={{color: '#00d1b2'}}
                    formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Custo']}
                />
                <ReferenceLine y={monthlyLimit / 30} stroke="#eab308" strokeDasharray="3 3" label={{ value: 'Média/Dia', fill: '#eab308', fontSize: 10 }} />
                <Line type="monotone" dataKey="cost" stroke="#00d1b2" strokeWidth={3} dot={{r: 4, fill:'#00d1b2'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card className="bg-dark-surface border-dark-border">
          <CardHeader>
            <CardTitle>Configurar Limites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1 block">Limite Mensal (R$)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500">R$</span>
                <Input 
                  type="number" 
                  className="pl-8" 
                  value={monthlyLimit} 
                  onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-slate-800">
              <span className="text-sm text-white">Alertas por E-mail</span>
              <button 
                onClick={() => setAlertEnabled(!alertEnabled)}
                className={`w-10 h-5 rounded-full transition-colors relative ${alertEnabled ? 'bg-brand' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${alertEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
            </div>

            {alertEnabled && (
              <div>
                 <label className="text-xs font-medium text-slate-400 mb-1 block">Gatilho de Alerta (%)</label>
                 <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={alertThreshold} 
                      onChange={(e) => setAlertThreshold(Number(e.target.value))}
                    />
                    <span className="text-sm text-slate-500">%</span>
                 </div>
                 <p className="text-[10px] text-slate-500 mt-1">
                   Você será notificado quando o gasto atingir R$ {((monthlyLimit * alertThreshold) / 100).toFixed(2)}.
                 </p>
              </div>
            )}

            <Button className="w-full mt-4">Salvar Configurações</Button>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle>Registro Detalhado de Consumo</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
              <tr>
                <th className="px-6 py-3 font-medium">Horário</th>
                <th className="px-6 py-3 font-medium">Agente</th>
                <th className="px-6 py-3 font-medium">Modelo LLM</th>
                <th className="px-6 py-3 font-medium">Tokens (In/Out)</th>
                <th className="px-6 py-3 font-medium">Custo (R$)</th>
                <th className="px-6 py-3 font-medium text-right">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {MOCK_COST_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{log.timestamp}</td>
                  <td className="px-6 py-4 text-white">{log.agentName}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">{log.llmModel}</Badge>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    <span className="text-green-400">{log.inputTokens}</span> / <span className="text-blue-400">{log.outputTokens}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-200">R$ {log.cost.toFixed(4)}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedLog(log)}>
                      <Eye className="w-4 h-4 text-brand hover:text-white" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Details Modal */}
      {selectedLog && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
          <Card className="w-full max-w-2xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
              <div>
                <CardTitle>Detalhes da Transação</CardTitle>
                <p className="text-xs text-slate-400 font-mono mt-1">{selectedLog.id} • {selectedLog.timestamp}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedLog(null)}>X</Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                 <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="text-xs text-slate-500">Custo</div>
                    <div className="font-bold text-brand">R$ {selectedLog.cost.toFixed(5)}</div>
                 </div>
                 <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="text-xs text-slate-500">Modelo</div>
                    <div className="font-bold text-white">{selectedLog.llmModel}</div>
                 </div>
                 <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="text-xs text-slate-500">Total Tokens</div>
                    <div className="font-bold text-white">{selectedLog.inputTokens + selectedLog.outputTokens}</div>
                 </div>
              </div>

              <div>
                <label className="text-xs font-bold text-green-400 mb-1 block uppercase">Prompt (Entrada)</label>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-sm text-slate-300 font-mono whitespace-pre-wrap">
                   {selectedLog.promptPreview}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-blue-400 mb-1 block uppercase">Response (Saída)</label>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-sm text-slate-300 font-mono whitespace-pre-wrap">
                   {selectedLog.responsePreview}
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CostControl;
