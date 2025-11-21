import React from 'react';
import { FileText, Download, Calendar, Filter, BarChart3, Table, Database, Server, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '../components/ui';
import { MOCK_REPORTS } from '../constants';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Relatórios & Auditoria</h2>
          <p className="text-slate-400">Exportação de dados consolidados e logs operacionais.</p>
        </div>
        <Button className="gap-2">
            <BarChart3 className="w-4 h-4" /> Gerar Novo Relatório
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-purple-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Relatórios Gerados</div>
                        <div className="text-2xl font-bold text-white">42</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-purple-400">
                        <FileText className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Este mês</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Dados Processados</div>
                        <div className="text-2xl font-bold text-white">450 MB</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                        <Database className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Armazenamento Seguro</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Automação</div>
                        <div className="text-2xl font-bold text-white">85%</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-brand">
                        <Server className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Agendamentos ativos</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Auditoria</div>
                        <div className="text-2xl font-bold text-white">A+</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-green-400">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-green-500 mt-1">Compliance LGPD</div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Report Types */}
          <Card className="lg:col-span-3">
              <CardHeader>
                  <CardTitle>Relatórios Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-dark-border rounded-lg bg-slate-900 hover:border-brand/50 transition-colors cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                              <div className="p-2 bg-brand/10 rounded text-brand">
                                  <Table className="w-6 h-6" />
                              </div>
                              <Badge>SEMANAL</Badge>
                          </div>
                          <h3 className="font-bold text-white group-hover:text-brand transition-colors">Comparativo Regional de Preços</h3>
                          <p className="text-xs text-slate-400 mt-1">Matriz completa de preços por serviço e cidade. Ideal para ajuste de tabela.</p>
                      </div>

                      <div className="p-4 border border-dark-border rounded-lg bg-slate-900 hover:border-brand/50 transition-colors cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                              <div className="p-2 bg-red-900/20 rounded text-red-400">
                                  <Calendar className="w-6 h-6" />
                              </div>
                              <Badge variant="destructive">DIÁRIO</Badge>
                          </div>
                          <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">Alertas de Promoções Relâmpago</h3>
                          <p className="text-xs text-slate-400 mt-1">Consolidado de ofertas temporárias detectadas nas últimas 24h.</p>
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>

      {/* Generated Reports List */}
      <Card>
          <CardHeader>
              <CardTitle>Histórico de Downloads</CardTitle>
          </CardHeader>
          <CardContent>
              <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                      <tr>
                          <th className="px-4 py-3">Nome do Arquivo</th>
                          <th className="px-4 py-3">Tipo</th>
                          <th className="px-4 py-3">Data</th>
                          <th className="px-4 py-3">Formato</th>
                          <th className="px-4 py-3 text-right">Ação</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                      {MOCK_REPORTS.map((report) => (
                          <tr key={report.id} className="hover:bg-slate-800/50 transition-colors">
                              <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-slate-500" />
                                  {report.title}
                              </td>
                              <td className="px-4 py-3">
                                  {report.type === 'weekly_market' ? 'Mercado' : report.type === 'price_alert' ? 'Alerta' : 'Cobertura'}
                              </td>
                              <td className="px-4 py-3 text-slate-500">{report.date}</td>
                              <td className="px-4 py-3">
                                  <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">{report.format}</Badge>
                              </td>
                              <td className="px-4 py-3 text-right">
                                  <Button variant="ghost" className="h-8 w-8 p-0 text-brand hover:bg-brand/10">
                                      <Download className="w-4 h-4" />
                                  </Button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </CardContent>
      </Card>
    </div>
  );
};

export default Reports;