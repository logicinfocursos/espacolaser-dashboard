
import React, { useState } from 'react';
import { Search, Filter, ArrowUp, ArrowDown, ShieldCheck, Globe, ScanLine, MessageSquare, Info, Tag, AlertTriangle, TrendingDown, Eye, X } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, Input, Button, CardContent, CardHeader, CardTitle, Badge } from '../components/ui';
import { MOCK_PRICING } from '../constants';
import { CompetitorData } from '../types';

const Pricing: React.FC = () => {
  const [filterService, setFilterService] = useState('');
  const [selectedItem, setSelectedItem] = useState<CompetitorData | null>(null);

  const filteredData = MOCK_PRICING.filter(item => 
    item.service.toLowerCase().includes(filterService.toLowerCase()) ||
    item.region.toLowerCase().includes(filterService.toLowerCase())
  );

  const getSourceIcon = (type: string) => {
      switch(type) {
          case 'web_crawler': return <Globe className="w-3 h-3 text-blue-400" />;
          case 'ocr_instagram': return <ScanLine className="w-3 h-3 text-purple-400" />;
          case 'bot_chat': return <MessageSquare className="w-3 h-3 text-green-400" />;
          default: return <Info className="w-3 h-3 text-slate-400" />;
      }
  };

  const getSourceLabel = (type: string) => {
      switch(type) {
          case 'web_crawler': return 'Site Oficial';
          case 'ocr_instagram': return 'Instagram Story';
          case 'bot_chat': return 'ChatBot';
          default: return 'Manual';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div>
          <h2 className="text-2xl font-bold text-slate-100">Inteligência de Preços</h2>
          <p className="text-slate-400">Comparativo granular vs. Redes Concorrentes.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Itens Monitorados</div>
                        <div className="text-2xl font-bold text-white">{MOCK_PRICING.length}</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                        <Tag className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">SKUs ativos</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Mais Barato que Comp.</div>
                        <div className="text-2xl font-bold text-white">65%</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-green-400">
                        <TrendingDown className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-green-500 mt-1">Posicionamento Agressivo</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Alertas de Preço</div>
                        <div className="text-2xl font-bold text-white">2</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Últimas 24h</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Atualização Média</div>
                        <div className="text-2xl font-bold text-white">45min</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-brand">
                        <ScanLine className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Bot Farm Operacional</div>
            </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2 w-full">
           <div className="relative flex-1 md:w-64 md:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Filtrar por UF ou Serviço..." 
              className="pl-9"
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filtros
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-dark-border bg-dark-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
              <tr>
                <th className="px-6 py-4 font-medium">Rede Concorrente</th>
                <th className="px-6 py-4 font-medium">Serviço</th>
                <th className="px-6 py-4 font-medium text-brand">Preço EL</th>
                <th className="px-6 py-4 font-medium">Preço Concorrente</th>
                <th className="px-6 py-4 font-medium">Delta</th>
                <th className="px-6 py-4 font-medium">Fonte da Coleta</th>
                <th className="px-6 py-4 font-medium">Histórico</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {filteredData.map((item) => {
                const delta = item.ourPrice - item.competitorPrice;
                const deltaPercent = ((delta / item.competitorPrice) * 100).toFixed(1);
                const isExpensive = delta > 0;

                return (
                  <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.region} • {item.unitCount} unid.</div>
                    </td>
                    <td className="px-6 py-4">{item.service}</td>
                    <td className="px-6 py-4 font-bold text-brand">R$ {item.ourPrice.toFixed(2)}</td>
                    <td className="px-6 py-4">R$ {item.competitorPrice.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1 ${isExpensive ? 'text-red-400' : 'text-green-400'}`}>
                        {isExpensive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(Number(deltaPercent))}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs bg-slate-800 w-fit px-2 py-1 rounded border border-slate-700">
                            {getSourceIcon(item.sourceType)}
                            <span>{getSourceLabel(item.sourceType)}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 ml-1">{item.lastUpdate}</div>
                    </td>
                    <td className="px-6 py-2 w-32">
                      <div className="h-8 w-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={item.history.map((val, i) => ({ i, val }))}>
                            <Line 
                              type="monotone" 
                              dataKey="val" 
                              stroke={isExpensive ? '#ef4444' : '#10b981'} 
                              strokeWidth={2} 
                              dot={false} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)} className="hover:bg-slate-700">
                            <Eye className="w-4 h-4 text-slate-400 hover:text-brand" />
                        </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* --- DETAILS MODAL --- */}
      {selectedItem && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
              <Card className="w-full max-w-2xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
                  <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                              <Tag className="w-6 h-6 text-brand" />
                          </div>
                          <div>
                              <CardTitle>{selectedItem.service}</CardTitle>
                              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                  <ScanLine className="w-3 h-3" /> {selectedItem.name} ({selectedItem.region})
                              </p>
                          </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}><X className="w-5 h-5" /></Button>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                      
                      {/* Price Comparison Big Numbers */}
                      <div className="grid grid-cols-3 gap-4">
                          <div className="bg-brand/10 p-4 rounded-xl border border-brand/30 text-center">
                              <span className="text-xs text-brand uppercase font-bold block mb-1">Preço Espaço Laser</span>
                              <span className="text-2xl font-bold text-white">R$ {selectedItem.ourPrice.toFixed(2)}</span>
                          </div>
                          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center">
                              <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Preço Concorrente</span>
                              <span className="text-2xl font-bold text-slate-200">R$ {selectedItem.competitorPrice.toFixed(2)}</span>
                          </div>
                          <div className={`p-4 rounded-xl border text-center flex flex-col justify-center ${selectedItem.ourPrice > selectedItem.competitorPrice ? 'bg-red-900/20 border-red-900/50 text-red-400' : 'bg-green-900/20 border-green-900/50 text-green-400'}`}>
                              <span className="text-xs uppercase font-bold block mb-1">Diferença</span>
                              <span className="text-xl font-bold flex items-center justify-center gap-1">
                                  {selectedItem.ourPrice > selectedItem.competitorPrice ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                                  {Math.abs(((selectedItem.ourPrice - selectedItem.competitorPrice) / selectedItem.competitorPrice) * 100).toFixed(1)}%
                              </span>
                          </div>
                      </div>

                      {/* Historical Chart */}
                      <div className="h-64 bg-slate-900/50 rounded-xl border border-slate-800 p-4">
                          <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase">Histórico de Preços (Últimas 6 coletas)</h4>
                          <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={selectedItem.history.map((val, i) => ({ index: `T-${5-i}`, value: val }))}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                  <XAxis dataKey="index" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                  <YAxis domain={['auto', 'auto']} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit=" R$" />
                                  <Tooltip 
                                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Preço']}
                                  />
                                  <Line type="stepAfter" dataKey="value" stroke="#00d1b2" strokeWidth={3} dot={{r: 4, fill:'#00d1b2'}} activeDot={{r: 6}} />
                              </LineChart>
                          </ResponsiveContainer>
                      </div>

                      {/* Meta Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between p-3 bg-slate-900 rounded border border-slate-800">
                              <span className="text-slate-500">Fonte de Dados</span>
                              <div className="flex items-center gap-2 text-white">
                                  {getSourceIcon(selectedItem.sourceType)}
                                  {getSourceLabel(selectedItem.sourceType)}
                              </div>
                          </div>
                          <div className="flex justify-between p-3 bg-slate-900 rounded border border-slate-800">
                              <span className="text-slate-500">Última Atualização</span>
                              <span className="text-white">{selectedItem.lastUpdate}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-slate-900 rounded border border-slate-800">
                              <span className="text-slate-500">Tipo de Unidade</span>
                              <Badge variant="outline" className="text-xs">{selectedItem.isNetwork ? 'Rede / Franquia' : 'Unidade Individual'}</Badge>
                          </div>
                          <div className="flex justify-between p-3 bg-slate-900 rounded border border-slate-800">
                              <span className="text-slate-500">ID Interno</span>
                              <span className="font-mono text-xs text-slate-400">{selectedItem.id}</span>
                          </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" onClick={() => setSelectedItem(null)}>Fechar</Button>
                      </div>
                  </CardContent>
              </Card>
          </div>
      )}
    </div>
  );
};

export default Pricing;
