import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Target, BrainCircuit, AlertTriangle, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '../components/ui';
import { MAP_DATA, MARKET_SHARE_DATA, MOCK_TASKS, MOCK_SIM_CARDS } from '../constants';
import { generateDashboardInsights } from '../services/gemini';

const Overview: React.FC = () => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGenerateInsights = async () => {
    setLoadingInsights(true);
    const context = `
      Opportunity Zones (High Potential, Low Share): ${JSON.stringify(MAP_DATA.filter(d => d.opportunityLevel === 'High').map(d => d.city))}
      Active Sim Cards: ${MOCK_SIM_CARDS.filter(s => s.status === 'active').length}
      Blocked Sim Cards: ${MOCK_SIM_CARDS.filter(s => s.status === 'blocked').length}
      Recent Tasks: ${JSON.stringify(MOCK_TASKS)}
    `;
    const result = await generateDashboardInsights(context);
    setInsights(result);
    setLoadingInsights(false);
  };

  const blockedSims = MOCK_SIM_CARDS.filter(s => s.status === 'blocked').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Visão Geral da Operação</h2>
          <p className="text-slate-400">Monitoramento estratégico e status da rede de bots.</p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2 border-brand/30 hover:bg-brand/10 hover:text-brand text-brand"
          onClick={handleGenerateInsights}
          disabled={loadingInsights}
        >
          {loadingInsights ? <div className="w-4 h-4 animate-spin rounded-full border-2 border-brand border-t-transparent" /> : <BrainCircuit className="w-4 h-4" />}
          {loadingInsights ? 'Processando...' : 'Insights Operacionais IA'}
        </Button>
      </div>

      {insights && (
        <Card className="border-brand/20 bg-brand/5">
          <CardContent className="pt-6">
             <div className="flex gap-3">
               <BrainCircuit className="w-6 h-6 text-brand shrink-0 mt-1" />
               <div className="prose prose-invert prose-sm max-w-none">
                 <h4 className="text-brand font-semibold mb-2">Análise Estratégica & Operacional</h4>
                 <div dangerouslySetInnerHTML={{ __html: insights.replace(/\n/g, '<br/>').replace(/- /g, '• ') }} />
               </div>
             </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Redes Concorrentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">12</div>
              <Target className="w-5 h-5 text-brand" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Monitorando 1.400+ unidades</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Investigações Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">1,240</div>
              <Server className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs text-green-400 mt-1">Custo médio R$ 0.12 / consulta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Saúde da Farm de Chips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">92%</div>
              {blockedSims > 0 ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <Target className="w-5 h-5 text-green-500" />}
            </div>
            <p className={`text-xs mt-1 ${blockedSims > 0 ? 'text-red-400' : 'text-slate-500'}`}>
              {blockedSims} cartões bloqueados hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Oportunidades Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">3 Cidades</div>
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Alta demanda, baixo share EL</p>
          </CardContent>
        </Card>
      </div>

      {/* Map & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Map */}
        <Card className="lg:col-span-2 h-full overflow-hidden relative border-dark-border bg-dark-surface">
          <div className="absolute top-4 right-4 z-[400] bg-slate-900/90 p-3 rounded border border-slate-700 text-xs space-y-1">
            <div className="font-bold text-slate-300 mb-1">Potencial de Mercado</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500"></span> Crítico (Perdendo Share)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500"></span> Oportunidade Média</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500"></span> Domínio Espaço Laser</div>
          </div>
          <div className="h-full w-full bg-slate-900">
            {isMounted ? (
              <MapContainer 
                center={[-14.2350, -51.9253]} // Centro Geográfico do Brasil
                zoom={4}
                minZoom={3}
                // Limites ampliados para evitar travamento em telas grandes (América do Sul aprox)
                maxBounds={[
                    [-58, -100], // Sudoeste extremo
                    [15, -20]    // Nordeste extremo
                ]}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%', background: '#0f172a' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {MAP_DATA.map((point) => {
                   let color = '#10b981'; // Green (Dominance)
                   if (point.opportunityLevel === 'High') color = '#ef4444'; // Red (High Opportunity/Low Share)
                   else if (point.opportunityLevel === 'Medium') color = '#eab308'; // Yellow
                   
                   return (
                    <CircleMarker
                      key={point.id}
                      center={[point.lat, point.lng]}
                      pathOptions={{
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.6,
                      }}
                      radius={Math.max(6, point.competitorCount / 3)}
                    >
                      <Popup className="bg-slate-900 text-slate-900">
                        <div className="text-slate-800">
                          <strong className="text-base">{point.city}</strong><br />
                          <span className="text-xs uppercase font-bold text-slate-600">{point.opportunityLevel === 'High' ? 'Atenção Necessária' : 'Estável'}</span>
                          <hr className="my-1 border-slate-300"/>
                          Concorrentes (Redes): {point.competitorCount}<br />
                          Share EL: {(point.dominance * 100).toFixed(0)}%
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-500">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Carregando Mapa Tático...</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Market Share Chart */}
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Share: EL vs Concorrentes</CardTitle>
            <p className="text-xs text-slate-400">Média Nacional - Redes Organizadas</p>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MARKET_SHARE_DATA}>
                <defs>
                  <linearGradient id="colorShare" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d1b2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d1b2" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                />
                <Area name="Espaço Laser" type="monotone" dataKey="share" stroke="#00d1b2" strokeWidth={3} fillOpacity={1} fill="url(#colorShare)" />
                <Area name="Média Concorrentes" type="monotone" dataKey="competitorAvg" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorComp)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;