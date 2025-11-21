import React, { useState } from 'react';
import { Globe, Instagram, Facebook, Search, Plus, Play, Pause, RotateCcw, Settings, Zap, Clock, Hash, Image as ImageIcon, BarChart2, CheckCircle, AlertCircle, X, Save, ExternalLink, MousePointerClick, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';

// --- Types & Mock Data ---

type Platform = 'website' | 'instagram' | 'facebook' | 'tiktok' | 'linkedin';

interface CrawlerAgent {
  id: string;
  name: string;
  competitorName: string;
  platform: Platform;
  targetUrl: string;
  status: 'active' | 'paused' | 'error' | 'running';
  frequency: '1h' | '6h' | '12h' | '24h';
  lastRun: string;
  stats: {
    itemsFound: number;
    pricePoints: number;
    followers?: number;
    engagementRate?: string;
    lastPostDate?: string;
  };
  config: {
    trackPrices: boolean;
    trackPromos: boolean;
    trackFollowers: boolean;
    trackEngagement: boolean;
    extractImages: boolean;
  };
}

const MOCK_CRAWLERS: CrawlerAgent[] = [
  {
    id: '1',
    name: 'LaserFast - Site Oficial',
    competitorName: 'LaserFast',
    platform: 'website',
    targetUrl: 'https://laserfast.com.br/precos',
    status: 'active',
    frequency: '6h',
    lastRun: '10 min atrás',
    stats: { itemsFound: 45, pricePoints: 12 },
    config: { trackPrices: true, trackPromos: true, trackFollowers: false, trackEngagement: false, extractImages: true }
  },
  {
    id: '2',
    name: 'LaserFast - Instagram',
    competitorName: 'LaserFast',
    platform: 'instagram',
    targetUrl: 'https://instagram.com/laserfast.oficial',
    status: 'running',
    frequency: '1h',
    lastRun: 'Rodando agora...',
    stats: { itemsFound: 120, pricePoints: 5, followers: 1250000, engagementRate: '2.4%', lastPostDate: 'Hoje 09:00' },
    config: { trackPrices: true, trackPromos: true, trackFollowers: true, trackEngagement: true, extractImages: true }
  },
  {
    id: '3',
    name: 'Vialaser - Site',
    competitorName: 'Vialaser',
    platform: 'website',
    targetUrl: 'https://vialaser.com.br',
    status: 'error',
    frequency: '12h',
    lastRun: 'Ontem 14:00',
    stats: { itemsFound: 0, pricePoints: 0 },
    config: { trackPrices: true, trackPromos: true, trackFollowers: false, trackEngagement: false, extractImages: false }
  },
  {
    id: '4',
    name: 'Vialaser - Facebook',
    competitorName: 'Vialaser',
    platform: 'facebook',
    targetUrl: 'https://facebook.com/vialaserdepilacao',
    status: 'paused',
    frequency: '24h',
    lastRun: '2 dias atrás',
    stats: { itemsFound: 200, pricePoints: 0, followers: 85000 },
    config: { trackPrices: false, trackPromos: true, trackFollowers: true, trackEngagement: true, extractImages: false }
  },
];

const CrawlerConfig: React.FC = () => {
  const [crawlers, setCrawlers] = useState<CrawlerAgent[]>(MOCK_CRAWLERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrawler, setEditingCrawler] = useState<Partial<CrawlerAgent>>({});

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'tiktok': return <span className="text-xl font-bold leading-none">♪</span>; // Simple placeholder
      case 'website': return <Globe className="w-5 h-5 text-blue-400" />;
      default: return <Globe className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleSave = () => {
    if (!editingCrawler.name || !editingCrawler.targetUrl) return alert("Nome e URL são obrigatórios");

    if (editingCrawler.id) {
        setCrawlers(crawlers.map(c => c.id === editingCrawler.id ? { ...c, ...editingCrawler } as CrawlerAgent : c));
    } else {
        const newCrawler: CrawlerAgent = {
            id: Date.now().toString(),
            name: editingCrawler.name,
            competitorName: editingCrawler.competitorName || 'Novo Concorrente',
            platform: editingCrawler.platform || 'website',
            targetUrl: editingCrawler.targetUrl,
            status: 'active',
            frequency: editingCrawler.frequency || '24h',
            lastRun: 'Nunca',
            stats: { itemsFound: 0, pricePoints: 0 },
            config: editingCrawler.config || { trackPrices: true, trackPromos: false, trackFollowers: false, trackEngagement: false, extractImages: false }
        };
        setCrawlers([...crawlers, newCrawler]);
    }
    setIsModalOpen(false);
    setEditingCrawler({});
  };

  const handleToggleStatus = (id: string) => {
      setCrawlers(crawlers.map(c => {
          if (c.id === id) {
              return { ...c, status: c.status === 'paused' ? 'active' : 'paused' };
          }
          return c;
      }));
  };

  const handleDelete = (id: string) => {
      if(confirm("Excluir este agente crawler?")) {
          setCrawlers(crawlers.filter(c => c.id !== id));
      }
  };

  // Group by Competitor
  const groupedCrawlers = crawlers.reduce((acc, crawler) => {
      if (!acc[crawler.competitorName]) acc[crawler.competitorName] = [];
      acc[crawler.competitorName].push(crawler);
      return acc;
  }, {} as Record<string, CrawlerAgent[]>);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Globe className="w-6 h-6 text-brand" />
            Agentes Web Crawlers
          </h2>
          <p className="text-slate-400">Configure bots especialistas para monitorar sites e redes sociais dos concorrentes.</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-brand/20" onClick={() => { setEditingCrawler({ config: { trackPrices: true, trackPromos: true, trackFollowers: false, trackEngagement: false, extractImages: false } }); setIsModalOpen(true); }}>
            <Plus className="w-4 h-4" /> Novo Crawler
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-dark-surface border-dark-border border-l-4 border-l-brand">
              <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                      <div>
                          <div className="text-sm text-slate-400">URLs Monitoradas</div>
                          <div className="text-2xl font-bold text-white">{crawlers.length}</div>
                      </div>
                      <div className="p-2 bg-slate-800 rounded text-brand"><Globe className="w-5 h-5"/></div>
                  </div>
              </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border border-l-4 border-l-pink-500">
              <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                      <div>
                          <div className="text-sm text-slate-400">Redes Sociais</div>
                          <div className="text-2xl font-bold text-white">{crawlers.filter(c => c.platform !== 'website').length}</div>
                      </div>
                      <div className="p-2 bg-slate-800 rounded text-pink-500"><Instagram className="w-5 h-5"/></div>
                  </div>
              </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                      <div>
                          <div className="text-sm text-slate-400">Preços Extraídos</div>
                          <div className="text-2xl font-bold text-white">{crawlers.reduce((acc, c) => acc + c.stats.pricePoints, 0)}</div>
                      </div>
                      <div className="p-2 bg-slate-800 rounded text-blue-500"><Zap className="w-5 h-5"/></div>
                  </div>
              </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                      <div>
                          <div className="text-sm text-slate-400">Status da Rede</div>
                          <div className="text-2xl font-bold text-white">98%</div>
                      </div>
                      <div className="p-2 bg-slate-800 rounded text-green-500"><Activity className="w-5 h-5"/></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Uptime dos agentes</div>
              </CardContent>
          </Card>
      </div>

      {/* Main Content - Grouped by Competitor */}
      <div className="space-y-8">
          {(Object.entries(groupedCrawlers) as [string, CrawlerAgent[]][]).map(([competitor, agents]) => (
              <div key={competitor} className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider border-b border-slate-800 pb-2">
                      <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                      {competitor}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {agents.map(agent => (
                          <Card key={agent.id} className="bg-dark-surface border-dark-border hover:border-brand/30 transition-all group relative overflow-hidden">
                              {agent.status === 'running' && (
                                  <div className="absolute top-0 left-0 w-full h-0.5 bg-brand animate-pulse shadow-[0_0_10px_#00d1b2]"></div>
                              )}
                              
                              <CardHeader className="pb-2 flex flex-row items-start justify-between">
                                  <div className="flex gap-3">
                                      <div className={`p-2.5 rounded-lg border ${
                                          agent.platform === 'instagram' ? 'bg-pink-900/20 border-pink-900/50' :
                                          agent.platform === 'facebook' ? 'bg-blue-900/20 border-blue-900/50' :
                                          'bg-slate-800 border-slate-700'
                                      }`}>
                                          {getPlatformIcon(agent.platform)}
                                      </div>
                                      <div>
                                          <CardTitle className="text-base text-white">{agent.name}</CardTitle>
                                          <a href={agent.targetUrl} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-brand flex items-center gap-1 mt-1 truncate max-w-[150px]">
                                              {agent.targetUrl} <ExternalLink className="w-3 h-3" />
                                          </a>
                                      </div>
                                  </div>
                                  <Badge variant={
                                      agent.status === 'active' ? 'success' : 
                                      agent.status === 'running' ? 'default' : 
                                      agent.status === 'error' ? 'destructive' : 'outline'
                                  } className={`text-[10px] ${agent.status === 'running' ? 'animate-pulse' : ''}`}>
                                      {agent.status.toUpperCase()}
                                  </Badge>
                              </CardHeader>

                              <CardContent>
                                  {/* Config Badges */}
                                  <div className="flex flex-wrap gap-1 mb-4">
                                      {agent.config.trackPrices && <Badge variant="outline" className="text-[9px] border-slate-700 text-slate-400">Preço</Badge>}
                                      {agent.config.trackPromos && <Badge variant="outline" className="text-[9px] border-slate-700 text-slate-400">Promoções</Badge>}
                                      {agent.config.trackFollowers && <Badge variant="outline" className="text-[9px] border-slate-700 text-slate-400">Seguidores</Badge>}
                                      {agent.config.extractImages && <Badge variant="outline" className="text-[9px] border-slate-700 text-slate-400">OCR Imagens</Badge>}
                                  </div>

                                  {/* Stats Grid */}
                                  <div className="grid grid-cols-2 gap-2 bg-slate-900/50 rounded p-3 border border-slate-800 mb-4">
                                      <div>
                                          <div className="text-[10px] text-slate-500">Última Execução</div>
                                          <div className="text-xs font-medium text-white">{agent.lastRun}</div>
                                      </div>
                                      <div>
                                          <div className="text-[10px] text-slate-500">Dados Coletados</div>
                                          <div className="text-xs font-medium text-brand">{agent.stats.itemsFound} itens</div>
                                      </div>
                                      {agent.stats.followers && (
                                          <div>
                                              <div className="text-[10px] text-slate-500">Seguidores</div>
                                              <div className="text-xs font-medium text-white">{(agent.stats.followers / 1000000).toFixed(1)}M</div>
                                          </div>
                                      )}
                                      {agent.stats.engagementRate && (
                                          <div>
                                              <div className="text-[10px] text-slate-500">Engajamento</div>
                                              <div className="text-xs font-medium text-white">{agent.stats.engagementRate}</div>
                                          </div>
                                      )}
                                  </div>

                                  {/* Actions */}
                                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                                      <div className="text-xs text-slate-500 flex items-center gap-1">
                                          <Clock className="w-3 h-3" /> Frequência: {agent.frequency}
                                      </div>
                                      <div className="flex gap-2">
                                          <Tooltip content={agent.status === 'paused' ? 'Retomar' : 'Pausar'}>
                                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => handleToggleStatus(agent.id)}>
                                                  {agent.status === 'paused' ? <Play className="w-4 h-4 text-green-500" /> : <Pause className="w-4 h-4 text-yellow-500" />}
                                              </Button>
                                          </Tooltip>
                                          <Tooltip content="Configurar">
                                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => { setEditingCrawler(agent); setIsModalOpen(true); }}>
                                                  <Settings className="w-4 h-4 text-slate-400" />
                                              </Button>
                                          </Tooltip>
                                          <Tooltip content="Forçar Execução Agora">
                                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-brand/20">
                                                  <RotateCcw className="w-4 h-4 text-brand" />
                                              </Button>
                                          </Tooltip>
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                      ))}
                      
                      {/* Add New Card Placeholder */}
                      <button 
                          onClick={() => { setEditingCrawler({ competitorName: competitor, config: { trackPrices: true, trackPromos: true, trackFollowers: false, trackEngagement: false, extractImages: false } }); setIsModalOpen(true); }}
                          className="border border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 hover:border-brand/50 hover:bg-slate-900/50 transition-all min-h-[200px]"
                      >
                          <Plus className="w-8 h-8 mb-2 opacity-50" />
                          <span className="text-sm font-medium">Adicionar Agente para {competitor}</span>
                      </button>
                  </div>
              </div>
          ))}
      </div>

      {/* Modal: Create/Edit Crawler */}
      {isModalOpen && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
              <Card className="w-full max-w-2xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
                  <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
                      <CardTitle>{editingCrawler.id ? 'Editar Agente Crawler' : 'Novo Agente Especialista'}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></Button>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Nome do Agente *</label>
                              <Input 
                                  placeholder="Ex: Monitor Instagram LaserFast" 
                                  value={editingCrawler.name || ''}
                                  onChange={(e) => setEditingCrawler({...editingCrawler, name: e.target.value})}
                              />
                          </div>
                          
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Concorrente Alvo</label>
                              <select 
                                  className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                  value={editingCrawler.competitorName || ''}
                                  onChange={(e) => setEditingCrawler({...editingCrawler, competitorName: e.target.value})}
                              >
                                  <option value="LaserFast">LaserFast</option>
                                  <option value="Vialaser">Vialaser</option>
                                  <option value="MaisLaser">MaisLaser</option>
                                  <option value="Outro">Outro...</option>
                              </select>
                          </div>

                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Plataforma</label>
                              <select 
                                  className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                  value={editingCrawler.platform || 'website'}
                                  onChange={(e) => setEditingCrawler({...editingCrawler, platform: e.target.value as any})}
                              >
                                  <option value="website">Website Oficial</option>
                                  <option value="instagram">Instagram</option>
                                  <option value="facebook">Facebook</option>
                                  <option value="tiktok">TikTok</option>
                              </select>
                          </div>

                          <div className="md:col-span-2">
                              <label className="text-xs font-medium text-slate-400 mb-1 block">URL do Alvo *</label>
                              <Input 
                                  placeholder="https://..." 
                                  value={editingCrawler.targetUrl || ''}
                                  onChange={(e) => setEditingCrawler({...editingCrawler, targetUrl: e.target.value})}
                              />
                          </div>
                      </div>

                      <div className="bg-slate-900/50 p-4 rounded border border-dark-border">
                          <label className="text-xs font-bold text-slate-300 mb-3 block uppercase tracking-wider flex items-center gap-2">
                              <MousePointerClick className="w-3 h-3 text-brand" /> O que coletar?
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                  <input 
                                      type="checkbox" 
                                      checked={editingCrawler.config?.trackPrices} 
                                      onChange={(e) => setEditingCrawler({...editingCrawler, config: {...editingCrawler.config!, trackPrices: e.target.checked}})}
                                      className="accent-brand w-4 h-4"
                                  />
                                  Preços e Promoções
                              </label>
                              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                  <input 
                                      type="checkbox" 
                                      checked={editingCrawler.config?.trackFollowers} 
                                      onChange={(e) => setEditingCrawler({...editingCrawler, config: {...editingCrawler.config!, trackFollowers: e.target.checked}})}
                                      className="accent-brand w-4 h-4"
                                  />
                                  Seguidores / Inscritos
                              </label>
                              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                  <input 
                                      type="checkbox" 
                                      checked={editingCrawler.config?.trackEngagement} 
                                      onChange={(e) => setEditingCrawler({...editingCrawler, config: {...editingCrawler.config!, trackEngagement: e.target.checked}})}
                                      className="accent-brand w-4 h-4"
                                  />
                                  Taxa de Engajamento
                              </label>
                              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                  <input 
                                      type="checkbox" 
                                      checked={editingCrawler.config?.trackPromos} 
                                      onChange={(e) => setEditingCrawler({...editingCrawler, config: {...editingCrawler.config!, trackPromos: e.target.checked}})}
                                      className="accent-brand w-4 h-4"
                                  />
                                  Banners Promocionais
                              </label>
                              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                  <input 
                                      type="checkbox" 
                                      checked={editingCrawler.config?.extractImages} 
                                      onChange={(e) => setEditingCrawler({...editingCrawler, config: {...editingCrawler.config!, extractImages: e.target.checked}})}
                                      className="accent-brand w-4 h-4"
                                  />
                                  OCR em Imagens (Stories/Posts)
                              </label>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="text-xs font-medium text-slate-400 mb-1 block">Frequência de Execução</label>
                               <select 
                                  className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                  value={editingCrawler.frequency || '24h'}
                                  onChange={(e) => setEditingCrawler({...editingCrawler, frequency: e.target.value as any})}
                               >
                                  <option value="1h">A cada 1 hora (Alta Prioridade)</option>
                                  <option value="6h">A cada 6 horas</option>
                                  <option value="12h">A cada 12 horas</option>
                                  <option value="24h">Diariamente</option>
                               </select>
                           </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-dark-border">
                          {editingCrawler.id && (
                              <Button variant="ghost" className="text-red-400 hover:bg-red-900/20 hover:text-red-300 gap-2" onClick={() => handleDelete(editingCrawler.id!)}>
                                  <X className="w-4 h-4" /> Excluir Agente
                              </Button>
                          )}
                          <div className="flex gap-2 ml-auto">
                              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                              <Button onClick={handleSave} className="gap-2">
                                  <Save className="w-4 h-4" /> Salvar Configuração
                              </Button>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      )}
    </div>
  );
};

export default CrawlerConfig;