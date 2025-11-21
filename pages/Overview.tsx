
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip, useMap } from 'react-leaflet';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Map as MapIcon, Clock, MessageSquare, CheckCircle, AlertTriangle, Smartphone, Zap, Users, ShieldAlert, ExternalLink, RefreshCw, GitBranch, Crosshair, Star, ShieldCheck, User, Lock, DollarSign, X, Store, Info, Unlock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '../components/ui';
import { MAP_DATA, MOCK_ALERTS, MOCK_AGENT_QUEUE, MOCK_PRICE_COMPARISON, MOCK_INTERACTION_TREND } from '../constants';
import { generateDashboardInsights } from '../services/gemini';
import { MapDataPoint, Page } from '../types';

interface OverviewProps {
  onNavigate: (page: Page) => void;
}

// Componente interno para controlar a interatividade do mapa via Hook
const MapController = ({ interactive }: { interactive: boolean }) => {
  const map = useMap();

  useEffect(() => {
    if (interactive) {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      if (map.tap) map.tap.enable();
      map.getContainer().style.cursor = 'grab';
    } else {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();
      map.getContainer().style.cursor = 'default';
    }
  }, [interactive, map]);

  return null;
};

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState<'price' | 'trend'>('price');
  const [selectedMapPoint, setSelectedMapPoint] = useState<MapDataPoint | null>(null);
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGenerateInsights = async () => {
    setLoadingInsights(true);
    const context = `Alertas Recentes: ${JSON.stringify(MOCK_ALERTS.slice(0,3))}. Tendência Interações: Estável acima da meta.`;
    const result = await generateDashboardInsights(context);
    setInsights(result);
    setLoadingInsights(false);
  };

  // Metric Card Component for Carousel
  const MetricCard = ({ icon: Icon, title, value, sub, trend, trendDir }: any) => (
    <div className="min-w-[220px] md:min-w-[260px] snap-start bg-slate-900 border border-dark-border rounded-xl p-4 flex flex-col justify-between hover:border-brand/30 transition-all shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700">
          <Icon className="w-5 h-5 text-slate-300" />
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-bold ${trendDir === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trendDir === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
        <div className="text-xs text-slate-400 font-medium">{title}</div>
        <div className="text-[10px] text-slate-500 mt-1">{sub}</div>
      </div>
    </div>
  );

  // --- Modal Content Generators ---
  const renderMapPointDetails = () => {
    if (!selectedMapPoint) return null;

    // Mock Data Generators based on Type
    const mockRevenueData = [
      { month: 'Jan', val: 4000 }, { month: 'Fev', val: 3000 }, { month: 'Mar', val: 5000 },
      { month: 'Abr', val: 4500 }, { month: 'Mai', val: 6000 }, { month: 'Jun', val: 5500 },
    ];

    const mockCompetitorPriceData = [
        { name: 'Virilha', us: 100, them: 85 },
        { name: 'Axila', us: 60, them: 45 },
        { name: 'Perna', us: 200, them: 190 },
    ];

    const mockOpportunityData = [
        { name: 'Atendido', value: 30 },
        { name: 'Gap', value: 70 },
    ];

    return (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedMapPoint(null)}>
            <Card className="w-full max-w-3xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200 relative" onClick={(e) => e.stopPropagation()}>
                <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedMapPoint(null)}><X className="w-5 h-5" /></Button>
                </div>
                
                <CardHeader className="border-b border-dark-border pb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${
                            selectedMapPoint.type === 'own_unit' ? 'bg-blue-500/20 text-blue-400' :
                            selectedMapPoint.type === 'competitor' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                        }`}>
                            {selectedMapPoint.type === 'own_unit' ? <Store className="w-6 h-6" /> :
                             selectedMapPoint.type === 'competitor' ? <ShieldAlert className="w-6 h-6" /> :
                             <Target className="w-6 h-6" />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <CardTitle>{selectedMapPoint.name}</CardTitle>
                                <Badge variant="outline" className="text-[10px] uppercase">
                                    {selectedMapPoint.city}
                                </Badge>
                            </div>
                            <p className="text-sm text-slate-400">{selectedMapPoint.details}</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    {/* --- TYPE: OWN UNIT --- */}
                    {selectedMapPoint.type === 'own_unit' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                                    <div className="text-xs text-slate-500">Faturamento (Mês)</div>
                                    <div className="text-xl font-bold text-white">R$ 145.200</div>
                                    <div className="text-xs text-green-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +12% meta</div>
                                </div>
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                                    <div className="text-xs text-slate-500">NPS</div>
                                    <div className="text-xl font-bold text-white">78</div>
                                    <div className="text-xs text-slate-400 mt-1">Zona de Excelência</div>
                                </div>
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                                    <div className="text-xs text-slate-500">Conversão</div>
                                    <div className="text-xl font-bold text-white">32%</div>
                                    <div className="text-xs text-yellow-400 mt-1">Abaixo da regional</div>
                                </div>
                            </div>
                            
                            <div className="h-64 w-full bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                                <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase">Tendência de Vendas (6 Meses)</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={mockRevenueData}>
                                        <defs>
                                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc'}} />
                                        <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVal)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-900/30 p-3 rounded-lg flex gap-3 items-start">
                                <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                                <div className="text-sm text-blue-200">
                                    <strong>Insight Operacional:</strong> Unidade com alta performance em virilha, mas baixa conversão em pacotes masculinos. Sugerimos treinamento da equipe local focado no público masculino.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TYPE: COMPETITOR --- */}
                    {selectedMapPoint.type === 'competitor' && (
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-1 bg-red-900/10 p-4 rounded-lg border border-red-900/30">
                                    <div className="text-xs text-red-400 font-bold uppercase mb-1">Nível de Ameaça</div>
                                    <div className="text-2xl font-bold text-white">ALTO</div>
                                    <div className="text-xs text-slate-400 mt-2">Campanha agressiva detectada há 2 dias.</div>
                                </div>
                                <div className="flex-1 bg-slate-900 p-4 rounded-lg border border-slate-800">
                                    <div className="text-xs text-slate-500 font-bold uppercase mb-1">Promoção Ativa</div>
                                    <div className="text-sm text-white font-medium">"50% OFF na primeira sessão"</div>
                                    <div className="text-xs text-brand mt-2 cursor-pointer hover:underline">Ver print do Instagram</div>
                                </div>
                            </div>

                            <div className="h-64 w-full bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                                <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase">Comparativo de Preços (R$)</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mockCompetitorPriceData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                        <XAxis type="number" stroke="#64748b" fontSize={12} hide />
                                        <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={60} />
                                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc'}} />
                                        <Legend />
                                        <Bar dataKey="us" name="Espaço Laser" fill="#00d1b2" barSize={20} radius={[0, 4, 4, 0]} />
                                        <Bar dataKey="them" name="Concorrente" fill="#ef4444" barSize={20} radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Histórico de Monitoramento</h4>
                                <ul className="space-y-2">
                                    <li className="text-xs text-slate-300 flex justify-between">
                                        <span>Alteração de preço detectada</span>
                                        <span className="text-slate-500">Ontem, 14:30</span>
                                    </li>
                                    <li className="text-xs text-slate-300 flex justify-between">
                                        <span>Novo post promocional (Instagram)</span>
                                        <span className="text-slate-500">10/03, 09:00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* --- TYPE: OPPORTUNITY --- */}
                    {selectedMapPoint.type === 'opportunity_zone' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-yellow-900/10 p-4 rounded-lg border border-yellow-900/30">
                                    <div className="text-xs text-yellow-500 font-bold uppercase mb-1">Potencial de Receita</div>
                                    <div className="text-2xl font-bold text-white">R$ 250k<span className="text-sm font-normal text-slate-400">/mês</span></div>
                                </div>
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                                    <div className="text-xs text-slate-500 font-bold uppercase mb-1">Público Alvo (Classe A/B)</div>
                                    <div className="text-2xl font-bold text-white">45.000</div>
                                    <div className="text-xs text-slate-400">Habitantes na área primária</div>
                                </div>
                            </div>

                            <div className="flex gap-6 h-64">
                                <div className="flex-1 bg-slate-900/50 rounded-xl p-4 border border-slate-800 relative">
                                    <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase text-center">Market Share Estimado</h4>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={mockOpportunityData}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                <Cell fill="#334155" /> {/* Atendido */}
                                                <Cell fill="#eab308" /> {/* Gap */}
                                            </Pie>
                                            <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc'}} />
                                            <Legend verticalAlign="bottom" height={36}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-2">
                                        <div className="text-2xl font-bold text-yellow-500">70%</div>
                                        <div className="text-[10px] text-slate-400">GAP</div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 flex flex-col justify-center space-y-4">
                                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                                        <div className="text-xs text-slate-500">Concorrência Local</div>
                                        <div className="text-sm text-white">Baixa (Apenas 2 clínicas pequenas)</div>
                                    </div>
                                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                                        <div className="text-xs text-slate-500">Shopping Centers</div>
                                        <div className="text-sm text-white">1 Shopping de Grande Porte s/ EL</div>
                                    </div>
                                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                                        Gerar Plano de Expansão
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                </CardContent>
            </Card>
        </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 relative">
      
      {/* Render Modal if selected */}
      {renderMapPointDetails()}

      {/* Header & Title */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Painel de Comando</h2>
          <p className="text-slate-400 text-sm">Visão Geral da Inteligência Competitiva</p>
        </div>
        <Button 
          variant="outline" 
          className="hidden md:flex gap-2 border-brand/30 hover:bg-brand/10 text-brand text-xs h-8"
          onClick={handleGenerateInsights}
          disabled={loadingInsights}
        >
          {loadingInsights ? <div className="w-3 h-3 animate-spin rounded-full border-2 border-brand border-t-transparent" /> : <Zap className="w-3 h-3" />}
          IA Insights
        </Button>
      </div>

      {/* --- SECTION 1: CAROUSEL METRICS --- */}
      <section className="w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory touch-pan-x no-scrollbar">
          <MetricCard icon={MapIcon} title="Concorrentes Mapeados" value="1.420" sub="Total Nacional" trend="+12" trendDir="up" />
          <MetricCard icon={Clock} title="Novos (7 dias)" value="85" sub="Detecção Recente" trend="+5%" trendDir="up" />
          <MetricCard icon={Users} title="Agentes Ativos" value="32" sub="Operação Bot Farm" />
          <MetricCard icon={MessageSquare} title="Interações Hoje" value="1.240" sub="Conversas Realizadas" trend="+15%" trendDir="up" />
          <MetricCard icon={CheckCircle} title="Taxa de Sucesso" value="28.5%" sub="Respostas Úteis" trend="-2%" trendDir="down" />
          <MetricCard icon={AlertTriangle} title="Status SIM Cards" value="92%" sub="3 Bloqueados / 45 Ativos" trendDir="down" trend="Alerta" />
        </div>
      </section>

      {insights && (
        <div className="bg-brand/5 border border-brand/20 rounded-lg p-4 flex gap-3 animate-in slide-in-from-top-2">
            <Zap className="w-5 h-5 text-brand mt-0.5 shrink-0" />
            <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: insights.replace(/\n/g, '<br/>').replace(/- /g, '• ') }} />
        </div>
      )}

      {/* --- SECTION 2: MAP & CHARTS (SPLIT 50/50) --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px] lg:h-[400px]">
        
        {/* Left: Map */}
        <Card className="h-full flex flex-col border-dark-border bg-dark-surface overflow-hidden">
          <div className="p-4 border-b border-dark-border flex justify-between items-center bg-slate-900/50">
             <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2"><MapIcon className="w-4 h-4 text-brand"/> Cobertura Competitiva</h3>
             <div className="flex items-center gap-4">
               <div className="flex gap-2 text-[10px]">
                 <span className="flex items-center gap-1 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Espaço Laser</span>
                 <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-full bg-red-500"></span> Concorrentes</span>
                 <span className="flex items-center gap-1 text-yellow-400"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Oportunidade</span>
               </div>
               
               {/* Toggle Map Interactivity Button */}
               <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setIsMapInteractive(!isMapInteractive)}
                  className={`text-xs gap-2 h-7 ${isMapInteractive ? 'text-brand bg-brand/10 hover:bg-brand/20' : 'text-slate-400 hover:text-slate-200'}`}
               >
                  {isMapInteractive ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  {isMapInteractive ? 'Navegação Ativa' : 'Mapa Bloqueado'}
               </Button>
             </div>
          </div>
          <div className="flex-1 bg-slate-900 relative z-0">
             {isMounted ? (
              <MapContainer 
                center={[-15.7801, -47.9292]} 
                zoom={4} 
                minZoom={4}
                maxBounds={[[-36, -76], [8, -32]]}
                dragging={isMapInteractive}
                scrollWheelZoom={isMapInteractive}
                doubleClickZoom={isMapInteractive}
                touchZoom={isMapInteractive}
                style={{ height: '100%', width: '100%', background: '#0f172a', cursor: isMapInteractive ? 'grab' : 'default' }}
              >
                <MapController interactive={isMapInteractive} />
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {MAP_DATA.map((point) => {
                   let color = '#3b82f6'; // Blue (Own)
                   if (point.type === 'competitor') color = '#ef4444'; // Red
                   if (point.type === 'opportunity_zone') color = '#eab308'; // Yellow
                   
                   return (
                    <CircleMarker
                      key={point.id}
                      center={[point.lat, point.lng]}
                      pathOptions={{ color: color, fillColor: color, fillOpacity: 0.7, weight: 1 }}
                      radius={point.type === 'opportunity_zone' ? 12 : 6}
                      eventHandlers={{
                        click: () => {
                            setSelectedMapPoint(point);
                        }
                      }}
                    >
                      <LeafletTooltip direction="top" offset={[0, -10]} opacity={1}>
                        <div className="text-center">
                          <div className="font-bold text-slate-900">{point.name}</div>
                          <div className="text-xs text-slate-600">{point.details}</div>
                          <div className="text-[9px] text-slate-500 mt-1 font-medium uppercase">Clique para detalhes</div>
                        </div>
                      </LeafletTooltip>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center"><RefreshCw className="animate-spin text-brand"/></div>
            )}
          </div>
        </Card>

        {/* Right: Charts with Tabs */}
        <Card className="h-full flex flex-col border-dark-border bg-dark-surface">
          <div className="p-3 border-b border-dark-border flex justify-between items-center">
             <div className="flex bg-slate-900 rounded p-1 border border-slate-700">
                <button 
                  onClick={() => setActiveChartTab('price')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${activeChartTab === 'price' ? 'bg-brand text-slate-900' : 'text-slate-400 hover:text-white'}`}
                >
                  Comparativo Preço
                </button>
                <button 
                  onClick={() => setActiveChartTab('trend')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${activeChartTab === 'trend' ? 'bg-brand text-slate-900' : 'text-slate-400 hover:text-white'}`}
                >
                  Tendência Interações
                </button>
             </div>
          </div>
          <div className="flex-1 p-4 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                {activeChartTab === 'price' ? (
                  <BarChart data={MOCK_PRICE_COMPARISON} layout="vertical" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                     <XAxis type="number" hide />
                     <YAxis dataKey="service" type="category" stroke="#94a3b8" fontSize={12} width={60} />
                     <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff'}} />
                     <Legend wrapperStyle={{fontSize: '12px'}} />
                     <Bar dataKey="elPrice" name="Espaço Laser" fill="#00d1b2" barSize={20} radius={[0, 4, 4, 0]} />
                     <Bar dataKey="compPrice" name="Concorrentes" fill="#ef4444" barSize={20} radius={[0, 4, 4, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={MOCK_INTERACTION_TREND}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                     <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                     <Tooltip contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff'}} />
                     <ReferenceLine y={1000} stroke="#eab308" strokeDasharray="3 3" label={{ value: 'Meta', fill: '#eab308', fontSize: 10 }} />
                     <Line type="monotone" dataKey="count" stroke="#00d1b2" strokeWidth={3} dot={{r: 4, fill:'#00d1b2'}} activeDot={{r: 6}} />
                  </LineChart>
                )}
             </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* --- SECTION 3: ALERTS & QUEUE (SPLIT 50/50) --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Alerts */}
        <Card className="h-80 flex flex-col">
          <div className="p-4 border-b border-dark-border bg-slate-900/50">
             <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-yellow-500"/> Alertas & Insights</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
             {MOCK_ALERTS.map((alert) => (
               <div key={alert.id} className="flex items-start gap-3 p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <div className={`mt-0.5 p-1.5 rounded-full shrink-0 ${
                    alert.type === 'critical' ? 'bg-red-900/30 text-red-400 border border-red-900/50' : 
                    alert.type === 'warning' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50' : 
                    'bg-blue-900/30 text-blue-400 border border-blue-900/50'
                  }`}>
                    {alert.type === 'critical' ? <AlertTriangle className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                     <p className="text-sm text-slate-200 leading-snug">{alert.message}</p>
                     <span className="text-[10px] text-slate-500 font-mono mt-1 block">{alert.time}</span>
                  </div>
               </div>
             ))}
          </div>
        </Card>

        {/* Right: Agent Queue */}
        <Card className="h-80 flex flex-col">
          <div className="p-4 border-b border-dark-border bg-slate-900/50 flex justify-between items-center">
             <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2"><RefreshCw className="w-4 h-4 text-brand"/> Fila de Processamento</h3>
             <Badge variant="default" className="text-[10px] bg-brand/20 text-brand border-brand/30">AO VIVO</Badge>
          </div>
          <div className="flex-1 overflow-hidden">
             <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-500 sticky top-0">
                   <tr>
                      <th className="px-4 py-2 font-medium">Agente</th>
                      <th className="px-4 py-2 font-medium">Canal</th>
                      <th className="px-4 py-2 font-medium">Status</th>
                      <th className="px-4 py-2 font-medium text-right">Tempo</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                   {MOCK_AGENT_QUEUE.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/50">
                         <td className="px-4 py-3 font-medium text-white">{item.agentName} <span className="text-slate-600 text-[10px]">{item.agentId}</span></td>
                         <td className="px-4 py-3">{item.channel}</td>
                         <td className="px-4 py-3">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] border ${
                               item.status === 'Enviando' ? 'bg-blue-900/20 text-blue-400 border-blue-900/30' :
                               item.status === 'Aguardando' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-900/30' :
                               'bg-purple-900/20 text-purple-400 border-purple-900/30'
                            }`}>
                               {item.status.toUpperCase()}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-0.5">{item.lastAction}</div>
                         </td>
                         <td className="px-4 py-3 text-right font-mono text-slate-500">{item.time}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </Card>
      </section>

      {/* --- SECTION 4: DETAILED METRIC GROUPS --- */}
      <section>
        <h3 className="font-bold text-slate-400 text-sm mb-3 uppercase tracking-wider">Análises Detalhadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
           
           {/* Group 1: Quick Actions (NEW LAYOUT) */}
           <Card className="bg-slate-950/50 border-dark-border">
              <div className="p-4">
                 <h4 className="font-bold text-white mb-4 text-sm">Ações Rápidas</h4>
                 <div className="space-y-3">
                    
                    {/* Jobs (Antes: Nova Trilha) */}
                    <div 
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-orange-500/50 transition-all cursor-pointer group"
                        onClick={() => onNavigate(Page.PROSPECTION_JOBS)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-orange-500/20 text-orange-500 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm shadow-orange-500/10">
                                <GitBranch className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-slate-200 text-sm">Jobs</span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium group-hover:text-orange-400 transition-colors">Abrir</span>
                    </div>

                    {/* Gerenciar Agentes */}
                    <div 
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-blue-500/50 transition-all cursor-pointer group"
                        onClick={() => onNavigate(Page.AGENT_CONFIG)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-500/20 text-blue-500 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm shadow-blue-500/10">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-slate-200 text-sm">Gerenciar Agentes</span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium group-hover:text-blue-400 transition-colors">Abrir</span>
                    </div>

                    {/* Ver Conversas */}
                    <div 
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-yellow-500/50 transition-all cursor-pointer group"
                        onClick={() => onNavigate(Page.LIVE_CONVERSATIONS)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-yellow-500/20 text-yellow-500 rounded-lg group-hover:bg-yellow-500 group-hover:text-white transition-colors shadow-sm shadow-yellow-500/10">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-slate-200 text-sm">Ver Conversas</span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium group-hover:text-yellow-400 transition-colors">Abrir</span>
                    </div>

                    {/* LLM's (Antes: Cockpit Leads) */}
                    <div 
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/50 transition-all cursor-pointer group"
                        onClick={() => onNavigate(Page.AI_SETTINGS)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-500/20 text-emerald-500 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-sm shadow-emerald-500/10">
                                <Crosshair className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-slate-200 text-sm">LLM's</span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium group-hover:text-emerald-400 transition-colors">Abrir</span>
                    </div>

                 </div>
              </div>
           </Card>

           {/* Group 2 & 3: Atividades Recentes (MERGED & NEW DESIGN) */}
           <Card className="bg-slate-950/50 border-dark-border lg:col-span-2">
              <div className="p-4">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-white text-sm">Atividades Recentes</h4>
                    <span className="text-xs text-slate-500">Atualizado há 2 min</span>
                 </div>
                 <div className="space-y-3">
                    
                    {/* Activity 1: Lead qualificado -> Prospects que responderão */}
                    <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900 transition-all cursor-default hover:border-slate-700">
                        <div className="p-2 rounded-lg bg-green-900/20 text-green-400 border border-green-900/30">
                           <Star className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-200">Prospects que responderão ao agente de investigação no whatsapp</div>
                           <div className="text-xs text-slate-500">Agente Vendas • há 12 minutos</div>
                        </div>
                    </div>

                    {/* Activity 2 */}
                    <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900 transition-all cursor-default hover:border-slate-700">
                        <div className="p-2 rounded-lg bg-yellow-900/20 text-yellow-400 border border-yellow-900/30">
                           <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-200">Judge ajustou resposta</div>
                           <div className="text-xs text-slate-500">Agente Suporte • há 18 minutos</div>
                        </div>
                    </div>

                    {/* Activity 3 */}
                    <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900 transition-all cursor-default hover:border-slate-700">
                        <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400 border border-blue-900/30">
                           <User className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-200">Conversa assumida por humano</div>
                           <div className="text-xs text-slate-500">João Silva • há 35 minutos</div>
                        </div>
                    </div>

                    {/* Activity 4: Trilha concluída -> Job concluído */}
                    <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900 transition-all cursor-default hover:border-slate-700">
                        <div className="p-2 rounded-lg bg-teal-900/20 text-teal-400 border border-teal-900/30">
                           <GitBranch className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-200">Job concluído com sucesso</div>
                           <div className="text-xs text-slate-500">Prospecção B2B • há 53 minutos</div>
                        </div>
                    </div>

                    {/* Activity 5 */}
                    <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900 transition-all cursor-default hover:border-slate-700">
                        <div className="p-2 rounded-lg bg-cyan-900/20 text-cyan-400 border border-cyan-900/30">
                           <Lock className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-200">Novo agente ativado</div>
                           <div className="text-xs text-slate-500">Sistema • há 1 hora</div>
                        </div>
                    </div>

                    {/* Activity 6: Lead convertido -> sucesso, informações obtidas... */}
                    <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900 transition-all cursor-default hover:border-slate-700">
                        <div className="p-2 rounded-lg bg-emerald-900/20 text-emerald-400 border border-emerald-900/30">
                           <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-200">sucesso, informações obtidas do prospect Linda Center</div>
                           <div className="text-xs text-slate-500">Comercial • há 1h 20</div>
                        </div>
                    </div>

                 </div>
              </div>
           </Card>

           {/* Group 4: Agent Performance */}
           <Card className="bg-slate-900/50 border-dark-border">
              <div className="p-4">
                 <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><CheckCircle className="w-5 h-5" /></div>
                 </div>
                 <h4 className="font-bold text-white text-sm">Performance Agentes</h4>
                 <div className="mt-3">
                     <div className="flex justify-between text-xs mb-1 text-slate-400">
                         <span>Conversão</span>
                         <span>32%</span>
                     </div>
                     <div className="w-full bg-slate-800 h-1.5 rounded-full">
                        <div className="bg-green-500 h-full w-[32%] rounded-full"></div>
                     </div>
                     <div className="mt-2 text-[10px] text-slate-500 text-right">Meta: 40%</div>
                 </div>
              </div>
           </Card>

        </div>
      </section>
    </div>
  );
};

export default Overview;
