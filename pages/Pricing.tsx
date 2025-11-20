import React, { useState } from 'react';
import { Search, Filter, ArrowUp, ArrowDown, ShieldCheck } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card, Input, Button } from '../components/ui';
import { MOCK_PRICING } from '../constants';

const Pricing: React.FC = () => {
  const [filterService, setFilterService] = useState('');

  const filteredData = MOCK_PRICING.filter(item => 
    item.service.toLowerCase().includes(filterService.toLowerCase()) ||
    item.region.toLowerCase().includes(filterService.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Inteligência de Preços</h2>
          <p className="text-slate-400">Comparativo granular vs. Redes Concorrentes.</p>
        </div>
        <div className="flex gap-2">
           <div className="relative w-64">
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
                <th className="px-6 py-4 font-medium">Histórico (Coletado por Bot)</th>
                <th className="px-6 py-4 font-medium">Fonte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {filteredData.map((item) => {
                const delta = item.ourPrice - item.competitorPrice;
                const deltaPercent = ((delta / item.competitorPrice) * 100).toFixed(1);
                const isExpensive = delta > 0;

                if (!item.isNetwork) return null; // Skip small individual competitors

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
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <ShieldCheck className="w-3 h-3 text-blue-400" />
                            {item.lastUpdate}
                        </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Pricing;