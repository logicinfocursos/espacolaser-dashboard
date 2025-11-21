
import React, { useState } from 'react';
import { 
    Database, Filter, Download, Tag, Clock, DollarSign, 
    TrendingUp, TrendingDown, MapPin, List, Calendar, Store, Eye, X, AlertCircle, CheckCircle 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui';

// --- MOCK DATA ---

const MOCK_COMPETITIVE_PRICES = [
    { id: 1, competitor: 'LaserFast', unit: 'Shopping Tatuapé', city: 'São Paulo', uf: 'SP', service: 'Virilha Completa', price: 89.90, elPrice: 100.00, date: '10/03/2024' },
    { id: 2, competitor: 'Vialaser', unit: 'Centro', city: 'Campinas', uf: 'SP', service: 'Virilha Completa', price: 95.00, elPrice: 100.00, date: '09/03/2024' },
    { id: 3, competitor: 'MaisLaser', unit: 'Barra', city: 'Rio de Janeiro', uf: 'RJ', service: 'Axila', price: 45.00, elPrice: 60.00, date: '10/03/2024' },
    { id: 4, competitor: 'LaserFast', unit: 'Savassi', city: 'Belo Horizonte', uf: 'MG', service: 'Barba Completa', price: 110.00, elPrice: 120.00, date: '08/03/2024' },
    { id: 5, competitor: 'Clínica Local', unit: 'Matriz', city: 'Curitiba', uf: 'PR', service: 'Meia Perna', price: 150.00, elPrice: 140.00, date: '07/03/2024' },
    { id: 6, competitor: 'Vialaser', unit: 'Shopping Recife', city: 'Recife', uf: 'PE', service: 'Buço', price: 25.00, elPrice: 30.00, date: '10/03/2024' },
];

const MOCK_COMPETITIVE_SERVICES = [
    { id: 1, competitor: 'LaserFast', unit: 'Geral', services: ['Depilação a Laser', 'Rejuvenescimento', 'Tratamento de Manchas'] },
    { id: 2, competitor: 'Vialaser', unit: 'Geral', services: ['Depilação a Laser', 'Botox', 'Preenchimento'] },
    { id: 3, competitor: 'MaisLaser', unit: 'Geral', services: ['Depilação a Laser', 'Criolipólise', 'Massagem Modeladora'] },
    { id: 4, competitor: 'Estética Ana', unit: 'Porto Alegre', services: ['Depilação a Laser', 'Peeling', 'Limpeza de Pele', 'Drenagem'] },
];

const MOCK_COMPETITIVE_PROMOS = [
    { id: 1, competitor: 'LaserFast', promo: '50% OFF na 1ª Sessão', validity: '31/03/2024', channel: 'Instagram Story', active: true, isRecent: true, location: 'Nacional' },
    { id: 2, competitor: 'Vialaser', promo: 'Compre Axila ganhe Buço', validity: '15/03/2024', channel: 'WhatsApp', active: true, isRecent: true, location: 'SP/RJ' },
    { id: 3, competitor: 'MaisLaser', promo: 'Pacote 10 sessões por R$ 599', validity: 'Indeterminada', channel: 'Site', active: true, isRecent: false, location: 'MG' },
    { id: 4, competitor: 'Clínica Local', promo: 'Botox Day - R$ 800 a região', validity: '12/03/2024', channel: 'Fachada (OCR)', active: false, isRecent: true, location: 'Curitiba' },
];

const MOCK_COMPETITIVE_HOURS = [
    { id: 1, competitor: 'LaserFast', unit: 'Shopping Eldorado', hoursMF: '10:00 - 22:00', hoursWE: '10:00 - 20:00', date: '10/03/2024' },
    { id: 2, competitor: 'Vialaser', unit: 'Centro Campinas', hoursMF: '09:00 - 18:00', hoursWE: '09:00 - 13:00', date: '09/03/2024' },
    { id: 3, competitor: 'MaisLaser', unit: 'Barra Shopping', hoursMF: '10:00 - 22:00', hoursWE: '12:00 - 20:00', date: '10/03/2024' },
];

// Helper for Tag Cloud
const SERVICE_TAGS = [
    { name: 'Depilação a Laser', count: 15 },
    { name: 'Botox', count: 8 },
    { name: 'Peeling', count: 6 },
    { name: 'Drenagem', count: 5 },
    { name: 'Limpeza de Pele', count: 4 },
    { name: 'Massagem', count: 3 },
];

const CompetitiveData: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'prices' | 'services' | 'promos' | 'hours'>('prices');
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
    const [filters, setFilters] = useState({
        uf: [] as string[],
        city: '',
        service: '',
        dateStart: '',
        dateEnd: '',
        network: ''
    });

    const handleExport = () => {
        alert("Exportando dados para Excel (Mock)...");
    };

    // Helper to generate mock history data for charts
    const generateMockHistory = (currentPrice: number) => {
        return [
            { month: 'Jan', price: currentPrice * 1.1 },
            { month: 'Fev', price: currentPrice * 1.05 },
            { month: 'Mar', price: currentPrice * 1.02 },
            { month: 'Abr', price: currentPrice * 0.98 },
            { month: 'Mai', price: currentPrice },
        ];
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <Database className="w-6 h-6 text-brand" />
                        Dados Competitivos
                    </h2>
                    <p className="text-slate-400">Análise granular de informações extraídas do mercado.</p>
                </div>
                <Button className="gap-2 shadow-lg shadow-brand/20" onClick={handleExport}>
                    <Download className="w-4 h-4" /> Exportar Relatório
                </Button>
            </div>

            {/* --- FILTERS --- */}
            <Card className="bg-dark-surface border-dark-border">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Região (UF)</label>
                            <select className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50">
                                <option value="">Todas</option>
                                <option value="SP">SP</option>
                                <option value="RJ">RJ</option>
                                <option value="MG">MG</option>
                                <option value="RS">RS</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Município</label>
                            <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={filters.city}
                                onChange={(e) => setFilters({...filters, city: e.target.value})}
                            >
                                <option value="">Todos</option>
                                <option value="São Paulo">São Paulo</option>
                                <option value="Rio de Janeiro">Rio de Janeiro</option>
                                <option value="Belo Horizonte">Belo Horizonte</option>
                                <option value="Curitiba">Curitiba</option>
                                <option value="Campinas">Campinas</option>
                                <option value="Recife">Recife</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Serviço</label>
                            <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={filters.service}
                                onChange={(e) => setFilters({...filters, service: e.target.value})}
                            >
                                <option value="">Todos</option>
                                <option value="Virilha">Virilha</option>
                                <option value="Axila">Axila</option>
                                <option value="Barba">Barba</option>
                                <option value="Perna">Perna</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Rede Concorrente</label>
                            <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={filters.network}
                                onChange={(e) => setFilters({...filters, network: e.target.value})}
                            >
                                <option value="">Todas</option>
                                <option value="LaserFast">LaserFast</option>
                                <option value="Vialaser">Vialaser</option>
                                <option value="MaisLaser">MaisLaser</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Período Coleta</label>
                            <Input type="date" className="text-xs" />
                        </div>
                        <Button variant="outline" className="gap-2 text-slate-400 hover:text-white">
                            <Filter className="w-4 h-4" /> Filtrar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* --- TABS NAVIGATION --- */}
            <div className="flex gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border w-full md:w-fit overflow-x-auto">
                <button 
                    onClick={() => setActiveTab('prices')}
                    className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'prices' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                    <DollarSign className="w-4 h-4" /> Comparativo Preços
                </button>
                <button 
                    onClick={() => setActiveTab('services')}
                    className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'services' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                    <List className="w-4 h-4" /> Serviços Oferecidos
                </button>
                <button 
                    onClick={() => setActiveTab('promos')}
                    className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'promos' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                    <Tag className="w-4 h-4" /> Promoções Ativas
                </button>
                <button 
                    onClick={() => setActiveTab('hours')}
                    className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'hours' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                    <Clock className="w-4 h-4" /> Horários de Atendimento
                </button>
            </div>

            {/* --- CONTENT: PRICES --- */}
            {activeTab === 'prices' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                    {/* Chart */}
                    <Card className="bg-dark-surface border-dark-border">
                        <CardHeader>
                            <CardTitle>Variação de Preço por Concorrente (Média)</CardTitle>
                        </CardHeader>
                        <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart 
                                    data={MOCK_COMPETITIVE_PRICES} 
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                                    <XAxis type="number" stroke="#94a3b8" fontSize={12} unit=" R$" />
                                    <YAxis dataKey="competitor" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="elPrice" name="Espaço Laser" fill="#00d1b2" barSize={20} radius={[0, 4, 4, 0]} />
                                    <Bar dataKey="price" name="Concorrente" fill="#ef4444" barSize={20} radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Table */}
                    <Card className="bg-dark-surface border-dark-border">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-300">
                                <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Serviço</th>
                                        <th className="px-6 py-4 font-medium">Concorrente</th>
                                        <th className="px-6 py-4 font-medium">Localização</th>
                                        <th className="px-6 py-4 font-medium">Preço Encontrado</th>
                                        <th className="px-6 py-4 font-medium">Diferença (vs EL)</th>
                                        <th className="px-6 py-4 font-medium">Data Coleta</th>
                                        <th className="px-6 py-4 font-medium text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-border">
                                    {MOCK_COMPETITIVE_PRICES.map((item) => {
                                        const delta = item.price - item.elPrice;
                                        const deltaPercent = (delta / item.elPrice) * 100;
                                        const isCheaper = delta < 0;

                                        return (
                                            <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-white">{item.service}</td>
                                                <td className="px-6 py-4">{item.competitor}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                                        <MapPin className="w-3 h-3" /> {item.city} - {item.uf}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-bold">R$ {item.price.toFixed(2)}</td>
                                                <td className="px-6 py-4">
                                                    <div className={`flex items-center gap-1 font-medium ${isCheaper ? 'text-green-400' : 'text-red-400'}`}>
                                                        {isCheaper ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                                        {Math.abs(deltaPercent).toFixed(1)}%
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-slate-500">{item.date}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-8 w-8 p-0 hover:bg-slate-700"
                                                        onClick={() => setSelectedRecord({ type: 'price', ...item })}
                                                    >
                                                        <Eye className="w-4 h-4 text-brand" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}

            {/* --- CONTENT: SERVICES --- */}
            {activeTab === 'services' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                    {/* Tag Cloud */}
                    <Card className="bg-dark-surface border-dark-border">
                        <CardHeader>
                            <CardTitle>Nuvem de Serviços Mais Comuns</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                {SERVICE_TAGS.map((tag, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
                                            idx === 0 ? 'bg-brand/20 border-brand text-brand text-lg' : 
                                            idx < 3 ? 'bg-slate-800 border-slate-600 text-slate-200 text-base' : 
                                            'bg-slate-900 border-slate-800 text-slate-400 text-sm'
                                        }`}
                                    >
                                        {tag.name}
                                        <span className="bg-black/30 px-1.5 rounded text-xs">{tag.count}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Table */}
                    <Card className="bg-dark-surface border-dark-border">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-300">
                                <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Concorrente</th>
                                        <th className="px-6 py-4 font-medium">Unidade/Região</th>
                                        <th className="px-6 py-4 font-medium">Mix de Serviços</th>
                                        <th className="px-6 py-4 font-medium text-right">Qtd. Serviços</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-border">
                                    {MOCK_COMPETITIVE_SERVICES.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">{item.competitor}</td>
                                            <td className="px-6 py-4 text-slate-400">{item.unit}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {item.services.map(svc => (
                                                        <span key={svc} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                                                            {svc}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono text-brand">{item.services.length}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}

            {/* --- CONTENT: PROMOS --- */}
            {activeTab === 'promos' && (
                <Card className="bg-dark-surface border-dark-border animate-in slide-in-from-bottom-4 duration-300">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Concorrente</th>
                                    <th className="px-6 py-4 font-medium">Localização</th>
                                    <th className="px-6 py-4 font-medium">Oferta / Promoção</th>
                                    <th className="px-6 py-4 font-medium">Vigência</th>
                                    <th className="px-6 py-4 font-medium">Canal Coleta</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border">
                                {MOCK_COMPETITIVE_PROMOS.map((item) => (
                                    <tr key={item.id} className={`hover:bg-slate-800/50 transition-colors ${item.isRecent ? 'bg-brand/5' : ''}`}>
                                        <td className="px-6 py-4 font-medium text-white">{item.competitor}</td>
                                        <td className="px-6 py-4 text-slate-400">{item.location}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-brand-light">{item.promo}</div>
                                            {item.isRecent && <div className="text-[10px] text-brand flex items-center gap-1 mt-1"><Tag className="w-3 h-3" /> Nova (7 dias)</div>}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-300">{item.validity}</td>
                                        <td className="px-6 py-4 text-xs text-slate-500">{item.channel}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={item.active ? 'success' : 'outline'} className="text-[10px]">
                                                {item.active ? 'VIGENTE' : 'ENCERRADA'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 hover:bg-slate-700"
                                                onClick={() => setSelectedRecord({ type: 'promo', ...item })}
                                            >
                                                <Eye className="w-4 h-4 text-brand" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* --- CONTENT: HOURS --- */}
            {activeTab === 'hours' && (
                <Card className="bg-dark-surface border-dark-border animate-in slide-in-from-bottom-4 duration-300">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Concorrente</th>
                                    <th className="px-6 py-4 font-medium">Unidade</th>
                                    <th className="px-6 py-4 font-medium">Segunda a Sexta</th>
                                    <th className="px-6 py-4 font-medium">Sábado / Domingo</th>
                                    <th className="px-6 py-4 font-medium">Última Verificação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border">
                                {MOCK_COMPETITIVE_HOURS.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{item.competitor}</td>
                                        <td className="px-6 py-4 flex items-center gap-2 text-slate-300">
                                            <Store className="w-4 h-4 text-slate-500" />
                                            {item.unit}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">{item.hoursMF}</td>
                                        <td className="px-6 py-4 font-mono text-xs">{item.hoursWE}</td>
                                        <td className="px-6 py-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* --- DETAILS MODAL --- */}
            {selectedRecord && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" onClick={() => setSelectedRecord(null)}>
                    <Card className="w-full max-w-2xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                                    {selectedRecord.type === 'price' ? <DollarSign className="w-6 h-6 text-brand" /> : <Tag className="w-6 h-6 text-yellow-400" />}
                                </div>
                                <div>
                                    <CardTitle>
                                        {selectedRecord.type === 'price' ? selectedRecord.service : 'Detalhes da Promoção'}
                                    </CardTitle>
                                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                        <Store className="w-3 h-3" /> {selectedRecord.competitor} ({selectedRecord.city || selectedRecord.location})
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(null)}><X className="w-5 h-5" /></Button>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            
                            {selectedRecord.type === 'price' && (
                                <>
                                    {/* Price Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                            <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Preço Concorrente</span>
                                            <span className="text-2xl font-bold text-white">R$ {selectedRecord.price.toFixed(2)}</span>
                                        </div>
                                        <div className="bg-brand/10 p-4 rounded-xl border border-brand/30">
                                            <span className="text-xs text-brand uppercase font-bold block mb-1">Nosso Preço</span>
                                            <span className="text-2xl font-bold text-white">R$ {selectedRecord.elPrice.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Historical Chart */}
                                    <div className="h-64 bg-slate-900/50 rounded-xl border border-slate-800 p-4">
                                        <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase">Histórico de Variação (Simulado)</h4>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={generateMockHistory(selectedRecord.price)}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis domain={['auto', 'auto']} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit=" R$" />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                                    formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Preço']}
                                                />
                                                <Line type="monotone" dataKey="price" stroke="#ef4444" strokeWidth={3} dot={{r: 4, fill:'#ef4444'}} activeDot={{r: 6}} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </>
                            )}

                            {selectedRecord.type === 'promo' && (
                                <>
                                    <div className="p-4 bg-yellow-900/10 border border-yellow-900/30 rounded-lg">
                                        <h4 className="text-sm font-bold text-yellow-400 mb-2 uppercase flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" /> Oferta Identificada
                                        </h4>
                                        <p className="text-lg text-white font-medium">"{selectedRecord.promo}"</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-900 p-3 rounded border border-slate-800">
                                            <span className="text-xs text-slate-500 block">Canal de Coleta</span>
                                            <span className="text-sm text-white font-mono">{selectedRecord.channel}</span>
                                        </div>
                                        <div className="bg-slate-900 p-3 rounded border border-slate-800">
                                            <span className="text-xs text-slate-500 block">Validade Estimada</span>
                                            <span className="text-sm text-white">{selectedRecord.validity}</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Footer */}
                            <div className="flex justify-end gap-2 pt-2 border-t border-dark-border">
                                <Button variant="outline" onClick={() => setSelectedRecord(null)}>Fechar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CompetitiveData;
