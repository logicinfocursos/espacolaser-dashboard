import React from 'react';
import { MapPin, TrendingUp, AlertCircle, Zap, Target, PieChart, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '../components/ui';
import { MOCK_STRATEGIC_GAPS } from '../constants';

const Strategy: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Estratégia & Gaps de Mercado</h2>
        <p className="text-slate-400">Onde não somos líderes e o que fazer para mudar.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Gaps Identificados</div>
                        <div className="text-2xl font-bold text-white">{MOCK_STRATEGIC_GAPS.length}</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-red-400">
                        <Target className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-red-500 mt-1">Oportunidades críticas</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Potencial Receita</div>
                        <div className="text-2xl font-bold text-white">R$ 2.4M</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-brand">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-green-500 mt-1">+12% vs Mês Anterior</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Share Médio (Gaps)</div>
                        <div className="text-2xl font-bold text-white">33%</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-yellow-400">
                        <PieChart className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Meta: Atingir 50%</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Regiões Alvo</div>
                        <div className="text-2xl font-bold text-white">3</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                        <Globe className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Sul, Nordeste, Sudeste</div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_STRATEGIC_GAPS.map((gap) => (
            <Card key={gap.id} className="border-l-4 border-l-red-500 hover:border-l-brand transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                    {/* Region Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider">{gap.region}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{gap.city}</h3>
                        <div className="flex items-center gap-2">
                            <Badge variant={gap.marketPotential === 'High' ? 'destructive' : 'warning'}>
                                Potencial: {gap.marketPotential}
                            </Badge>
                            <span className="text-sm text-slate-500">Share atual: {(gap.currentShare * 100).toFixed(0)}%</span>
                        </div>
                    </div>

                    {/* Competitor Info */}
                    <div className="lg:col-span-1 border-l border-dark-border pl-0 lg:pl-6 flex flex-col justify-center">
                         <div className="text-xs text-slate-500 mb-1">Principal Concorrente</div>
                         <div className="font-bold text-lg text-slate-200">{gap.primaryCompetitor}</div>
                         <div className="mt-2 text-xs flex items-center gap-1 text-red-400">
                            <AlertCircle className="w-3 h-3" />
                            Motivo Perda: {gap.lossReason.replace('_', ' ')}
                         </div>
                    </div>

                    {/* AI Suggestion */}
                    <div className="lg:col-span-2 bg-slate-900/50 rounded-lg p-4 border border-dark-border">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-brand" />
                            <span className="font-bold text-sm text-brand">Sugestão IA Olho Vivo</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {gap.aiSuggestion}
                        </p>
                        <div className="mt-4 flex gap-2">
                             <Button className="h-8 text-xs" variant="primary">Gerar Campanha</Button>
                             <Button className="h-8 text-xs" variant="outline">Ver Detalhes Preço</Button>
                        </div>
                    </div>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default Strategy;