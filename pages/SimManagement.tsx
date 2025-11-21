
import React, { useState } from 'react';
import { Smartphone, Signal, Lock, Trash2, Edit2, Plus, Filter, Search, X, Save, CheckCircle, AlertTriangle, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';

interface SimCardData {
  id: string;
  ddd: string;
  phoneNumber: string;
  carrier: 'Vivo' | 'Claro' | 'TIM' | 'Oi' | 'Outra';
  status: 'active' | 'blocked' | 'paused';
  channel: 'WhatsApp' | 'SMS';
  lastUsed: string;
  notes?: string;
}

// Mock Data
const MOCK_SIM_DATA: SimCardData[] = [
  { id: '1', ddd: '11', phoneNumber: '99999-1001', carrier: 'Vivo', status: 'active', channel: 'WhatsApp', lastUsed: '2 min atrás' },
  { id: '2', ddd: '21', phoneNumber: '98888-2002', carrier: 'Claro', status: 'active', channel: 'SMS', lastUsed: '1 hora atrás' },
  { id: '3', ddd: '31', phoneNumber: '97777-3003', carrier: 'TIM', status: 'blocked', channel: 'WhatsApp', lastUsed: '2 dias atrás', notes: 'Bloqueado por spam' },
  { id: '4', ddd: '11', phoneNumber: '96666-4004', carrier: 'Vivo', status: 'paused', channel: 'WhatsApp', lastUsed: '5 horas atrás' },
  { id: '5', ddd: '41', phoneNumber: '95555-5005', carrier: 'Oi', status: 'active', channel: 'SMS', lastUsed: '10 min atrás' },
];

const SimManagement: React.FC = () => {
  const [sims, setSims] = useState<SimCardData[]>(MOCK_SIM_DATA);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSim, setEditingSim] = useState<Partial<SimCardData>>({});
  
  // Filters
  const [filterDDD, setFilterDDD] = useState('');
  const [filterCarrier, setFilterCarrier] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleSave = () => {
    if (!editingSim.phoneNumber || !editingSim.ddd) return alert("Número e DDD são obrigatórios.");
    
    if (editingSim.id) {
        setSims(sims.map(s => s.id === editingSim.id ? { ...s, ...editingSim } as SimCardData : s));
    } else {
        const newSim: SimCardData = {
            id: Date.now().toString(),
            ddd: editingSim.ddd || '11',
            phoneNumber: editingSim.phoneNumber || '',
            carrier: editingSim.carrier || 'Vivo',
            status: editingSim.status || 'active',
            channel: editingSim.channel || 'WhatsApp',
            lastUsed: 'Nunca',
            notes: editingSim.notes
        };
        setSims([newSim, ...sims]);
    }
    setIsFormOpen(false);
    setEditingSim({});
  };

  const handleEdit = (sim: SimCardData) => {
    setEditingSim(sim);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if(confirm('Tem certeza que deseja excluir este número?')) {
      setSims(sims.filter(s => s.id !== id));
    }
  };

  const handleToggleStatus = (sim: SimCardData) => {
      const newStatus = sim.status === 'active' ? 'paused' : 'active';
      setSims(sims.map(s => s.id === sim.id ? { ...s, status: newStatus } : s));
  };

  const filteredSims = sims.filter(s => 
    (filterDDD ? s.ddd === filterDDD : true) &&
    (filterCarrier ? s.carrier === filterCarrier : true) &&
    (filterStatus ? s.status === filterStatus : true)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-brand" />
            Gestão de Cartões SIM
          </h2>
          <p className="text-slate-400">Cadastre e monitore os números utilizados nas operações de bot.</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-brand/20" onClick={() => { setEditingSim({}); setIsFormOpen(true); }}>
            <Plus className="w-4 h-4" /> Novo Número
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
            <CardContent className="pt-6 p-4 flex items-center justify-between">
                <div>
                    <div className="text-sm text-slate-400">SIMs Ativos</div>
                    <div className="text-2xl font-bold text-white">{sims.filter(s => s.status === 'active').length}</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-full text-brand">
                    <Signal className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6 p-4 flex items-center justify-between">
                <div>
                    <div className="text-sm text-slate-400">Bloqueados</div>
                    <div className="text-2xl font-bold text-white">{sims.filter(s => s.status === 'blocked').length}</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-full text-red-500">
                    <Lock className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6 p-4 flex items-center justify-between">
                <div>
                    <div className="text-sm text-slate-400">Total Cadastrado</div>
                    <div className="text-2xl font-bold text-white">{sims.length}</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-full text-blue-500">
                    <Smartphone className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-dark-surface border-dark-border">
          <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Filtrar por DDD</label>
                      <select 
                          className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                          value={filterDDD}
                          onChange={(e) => setFilterDDD(e.target.value)}
                      >
                          <option value="">Todos</option>
                          <option value="11">11 (SP)</option>
                          <option value="21">21 (RJ)</option>
                          <option value="31">31 (MG)</option>
                          <option value="41">41 (PR)</option>
                      </select>
                  </div>
                  <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Operadora</label>
                      <select 
                          className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                          value={filterCarrier}
                          onChange={(e) => setFilterCarrier(e.target.value)}
                      >
                          <option value="">Todas</option>
                          <option value="Vivo">Vivo</option>
                          <option value="Claro">Claro</option>
                          <option value="TIM">TIM</option>
                          <option value="Oi">Oi</option>
                      </select>
                  </div>
                  <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Status</label>
                      <select 
                          className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                      >
                          <option value="">Todos</option>
                          <option value="active">Ativo</option>
                          <option value="blocked">Bloqueado</option>
                          <option value="paused">Em Pausa</option>
                      </select>
                  </div>
                  <Button variant="ghost" onClick={() => { setFilterDDD(''); setFilterCarrier(''); setFilterStatus(''); }} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4 mr-2" /> Limpar
                  </Button>
              </div>
          </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-dark-surface border-dark-border">
          <CardHeader>
            <CardTitle>Lista de Números</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                      <tr>
                          <th className="px-6 py-4 font-medium">Número</th>
                          <th className="px-6 py-4 font-medium">DDD</th>
                          <th className="px-6 py-4 font-medium">Operadora</th>
                          <th className="px-6 py-4 font-medium">Canal</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium">Último Uso</th>
                          <th className="px-6 py-4 font-medium text-right">Ações</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                      {filteredSims.map((sim) => (
                          <tr key={sim.id} className={`hover:bg-slate-800/50 transition-colors ${sim.status === 'blocked' ? 'bg-red-900/5 hover:bg-red-900/10' : ''}`}>
                              <td className="px-6 py-4 font-mono text-white font-medium">
                                  {sim.phoneNumber}
                                  {sim.notes && <div className="text-[10px] text-slate-500 mt-1 italic max-w-[150px] truncate">{sim.notes}</div>}
                              </td>
                              <td className="px-6 py-4">{sim.ddd}</td>
                              <td className="px-6 py-4 flex items-center gap-2">
                                  <Wifi className="w-4 h-4 text-slate-500" />
                                  {sim.carrier}
                              </td>
                              <td className="px-6 py-4">
                                  <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">{sim.channel}</Badge>
                              </td>
                              <td className="px-6 py-4">
                                  <Badge variant={
                                      sim.status === 'active' ? 'success' : 
                                      sim.status === 'blocked' ? 'destructive' : 'warning'
                                  }>
                                      {sim.status === 'active' ? 'ATIVO' : sim.status === 'blocked' ? 'BLOQUEADO' : 'EM PAUSA'}
                                  </Badge>
                              </td>
                              <td className="px-6 py-4 text-xs text-slate-400">{sim.lastUsed}</td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-2">
                                      <Tooltip content={sim.status === 'active' ? 'Pausar' : 'Ativar'}>
                                          <Button 
                                            variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700"
                                            onClick={() => handleToggleStatus(sim)}
                                            disabled={sim.status === 'blocked'}
                                          >
                                              {sim.status === 'active' ? <AlertTriangle className="w-4 h-4 text-yellow-500" /> : <CheckCircle className="w-4 h-4 text-green-500" />}
                                          </Button>
                                      </Tooltip>
                                      <Tooltip content="Editar">
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => handleEdit(sim)}>
                                              <Edit2 className="w-4 h-4 text-slate-400" />
                                          </Button>
                                      </Tooltip>
                                      <Tooltip content="Excluir">
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-900/20" onClick={() => handleDelete(sim.id)}>
                                              <Trash2 className="w-4 h-4 text-red-400" />
                                          </Button>
                                      </Tooltip>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {filteredSims.length === 0 && (
                  <div className="p-8 text-center text-slate-500">Nenhum SIM encontrado com os filtros atuais.</div>
              )}
          </div>
      </Card>

      {/* Modal: Form */}
      {isFormOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
            <Card className="w-full max-w-lg bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200">
                <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center">
                    <CardTitle>{editingSim.id ? 'Editar Cartão SIM' : 'Cadastrar Novo SIM'}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsFormOpen(false)}><X className="w-5 h-5" /></Button>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">DDD *</label>
                            <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={editingSim.ddd || '11'}
                                onChange={(e) => setEditingSim({...editingSim, ddd: e.target.value})}
                            >
                                <option value="11">11</option>
                                <option value="21">21</option>
                                <option value="31">31</option>
                                <option value="41">41</option>
                                <option value="51">51</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Número (com 9) *</label>
                            <Input 
                                placeholder="99999-9999" 
                                value={editingSim.phoneNumber || ''}
                                onChange={(e) => {
                                    // Simple mask
                                    let v = e.target.value.replace(/\D/g, "");
                                    if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, "$1-$2");
                                    setEditingSim({...editingSim, phoneNumber: v});
                                }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Operadora</label>
                            <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={editingSim.carrier || 'Vivo'}
                                onChange={(e) => setEditingSim({...editingSim, carrier: e.target.value as any})}
                            >
                                <option value="Vivo">Vivo</option>
                                <option value="Claro">Claro</option>
                                <option value="TIM">TIM</option>
                                <option value="Oi">Oi</option>
                                <option value="Outra">Outra</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Canal Associado</label>
                            <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={editingSim.channel || 'WhatsApp'}
                                onChange={(e) => setEditingSim({...editingSim, channel: e.target.value as any})}
                            >
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="SMS">SMS</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-1 block">Status Inicial</label>
                        <select 
                            className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                            value={editingSim.status || 'active'}
                            onChange={(e) => setEditingSim({...editingSim, status: e.target.value as any})}
                        >
                            <option value="active">Ativo</option>
                            <option value="paused">Em Pausa</option>
                            <option value="blocked">Bloqueado</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-1 block">Observações (Opcional)</label>
                        <Input 
                            placeholder="Ex: Chip físico slot 1" 
                            value={editingSim.notes || ''}
                            onChange={(e) => setEditingSim({...editingSim, notes: e.target.value})}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-dark-border">
                        <Button variant="ghost" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave} className="gap-2">
                            <Save className="w-4 h-4" /> Salvar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}

    </div>
  );
};

export default SimManagement;
