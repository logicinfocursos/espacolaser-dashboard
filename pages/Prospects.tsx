
import React, { useState } from 'react';
import { UserPlus, Upload, Database, FileSpreadsheet, Search, Filter, Trash2, Edit2, Save, RotateCcw, CheckCircle, ArrowRight, Loader2, Users, UserCheck, MessageSquare, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui';
import { MOCK_PROSPECTS } from '../constants';
import { Prospect } from '../types';

const Prospects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'db' | 'file'>('manual');
  const [prospects, setProspects] = useState<Prospect[]>(MOCK_PROSPECTS);
  
  // DB Import States
  const [dbStep, setDbStep] = useState<1 | 2>(1);
  const [isConnectingDB, setIsConnectingDB] = useState(false);

  // File Import States
  const [fileStep, setFileStep] = useState<1 | 2>(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Filters
  const [filterName, setFilterName] = useState('');
  const [filterUF, setFilterUF] = useState('');
  const [filterChannel, setFilterChannel] = useState('');

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    companyName: '',
    address: '',
    city: '',
    uf: '',
    whatsapp: '',
    email: '',
    channel: 'WhatsApp'
  });

  const handleManualSubmit = () => {
    if (!manualForm.companyName) return alert("Nome da Empresa é obrigatório");
    
    const newProspect: Prospect = {
        id: Date.now().toString(),
        companyName: manualForm.companyName,
        address: manualForm.address,
        city: manualForm.city,
        uf: manualForm.uf,
        whatsapp: manualForm.whatsapp,
        email: manualForm.email,
        preferredChannel: manualForm.channel as any,
        status: 'Novo'
    };

    setProspects([newProspect, ...prospects]);
    setManualForm({ companyName: '', address: '', city: '', uf: '', whatsapp: '', email: '', channel: 'WhatsApp' });
    alert('Prospect cadastrado com sucesso!');
  };

  const handleDBConnect = () => {
    setIsConnectingDB(true);
    setTimeout(() => {
        setIsConnectingDB(false);
        setDbStep(2);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setUploadedFile(e.target.files[0]);
          setFileStep(2);
      }
  };

  const handleImport = (source: 'db' | 'file') => {
      alert(`${source === 'db' ? 'Dados do Banco' : 'Arquivo'} importados com sucesso! (Mock)`);
      if(source === 'db') setDbStep(1);
      if(source === 'file') { setFileStep(1); setUploadedFile(null); }
      // Add fake imported data
      setProspects([
          { id: Date.now().toString(), companyName: 'Importado Demo Ltda', address: 'Rua Teste, 123', city: 'São Paulo', uf: 'SP', whatsapp: '(11) 90000-0000', email: 'demo@import.com', preferredChannel: 'WhatsApp', status: 'Importado' },
          ...prospects
      ]);
  };

  const filteredProspects = prospects.filter(p => 
    p.companyName.toLowerCase().includes(filterName.toLowerCase()) &&
    (filterUF ? p.uf === filterUF : true) &&
    (filterChannel ? p.preferredChannel === filterChannel : true)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-brand" />
          Gestão de Prospects
        </h2>
        <p className="text-slate-400">Cadastre ou importe leads para monitoramento e prospecção.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Total de Prospects</div>
                        <div className="text-2xl font-bold text-white">{prospects.length}</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Base de contatos ativa</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Novos Leads</div>
                        <div className="text-2xl font-bold text-white">{prospects.filter(p => p.status === 'Novo').length}</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-green-400">
                        <UserCheck className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-green-500 mt-1">Cadastrados hoje</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Taxa Conversão</div>
                        <div className="text-2xl font-bold text-white">12.4%</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-brand">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Média últimos 30 dias</div>
            </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-dark-surface border-dark-border">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm text-slate-400">Canal Principal</div>
                        <div className="text-2xl font-bold text-white">WhatsApp</div>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg text-purple-400">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">65% da base</div>
            </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border w-full md:w-fit">
        <button 
            onClick={() => setActiveTab('manual')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'manual' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Edit2 className="w-4 h-4" /> Cadastrar Manualmente
        </button>
        <button 
            onClick={() => setActiveTab('db')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'db' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Database className="w-4 h-4" /> Importar de Banco
        </button>
        <button 
            onClick={() => setActiveTab('file')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${activeTab === 'file' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <FileSpreadsheet className="w-4 h-4" /> Importar de Arquivo
        </button>
      </div>

      {/* --- TAB: MANUAL --- */}
      {activeTab === 'manual' && (
          <Card className="bg-dark-surface border-dark-border animate-in slide-in-from-left-4 duration-300">
              <CardHeader>
                  <CardTitle>Cadastro Individual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="text-xs font-medium text-slate-400 mb-1 block">Nome da Empresa *</label>
                          <Input 
                            placeholder="Ex: Clínica Estética X" 
                            value={manualForm.companyName}
                            onChange={(e) => setManualForm({...manualForm, companyName: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="text-xs font-medium text-slate-400 mb-1 block">E-mail</label>
                          <Input 
                            placeholder="contato@empresa.com" 
                            value={manualForm.email}
                            onChange={(e) => setManualForm({...manualForm, email: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="text-xs font-medium text-slate-400 mb-1 block">WhatsApp</label>
                          <Input 
                            placeholder="(00) 00000-0000" 
                            value={manualForm.whatsapp}
                            onChange={(e) => {
                                // Simple mask logic
                                let v = e.target.value.replace(/\D/g, "");
                                v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
                                v = v.replace(/(\d)(\d{4})$/, "$1-$2");
                                setManualForm({...manualForm, whatsapp: v});
                            }}
                          />
                      </div>
                      <div>
                          <label className="text-xs font-medium text-slate-400 mb-1 block">Canal Preferido</label>
                          <select 
                             className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                             value={manualForm.channel}
                             onChange={(e) => setManualForm({...manualForm, channel: e.target.value})}
                          >
                              <option value="WhatsApp">WhatsApp</option>
                              <option value="E-mail">E-mail</option>
                              <option value="SMS">SMS</option>
                              <option value="Telefone">Telefone</option>
                          </select>
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Endereço</label>
                            <Input 
                                placeholder="Rua, Número, Bairro" 
                                value={manualForm.address}
                                onChange={(e) => setManualForm({...manualForm, address: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 block">Cidade</label>
                                <Input 
                                    placeholder="Cidade" 
                                    value={manualForm.city}
                                    onChange={(e) => setManualForm({...manualForm, city: e.target.value})}
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 block">UF</label>
                                <select 
                                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                    value={manualForm.uf}
                                    onChange={(e) => setManualForm({...manualForm, uf: e.target.value})}
                                >
                                    <option value="">UF</option>
                                    {['SP','RJ','MG','RS','PR','SC','BA','PE','CE'].map(uf => <option key={uf} value={uf}>{uf}</option>)}
                                </select>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4 border-t border-dark-border">
                      <Button variant="ghost" onClick={() => setManualForm({ companyName: '', address: '', city: '', uf: '', whatsapp: '', email: '', channel: 'WhatsApp' })}>
                        <RotateCcw className="w-4 h-4 mr-2" /> Limpar
                      </Button>
                      <Button onClick={handleManualSubmit}>
                        <Save className="w-4 h-4 mr-2" /> Salvar Prospect
                      </Button>
                  </div>
              </CardContent>
          </Card>
      )}

      {/* --- TAB: DATABASE IMPORT --- */}
      {activeTab === 'db' && (
          <Card className="bg-dark-surface border-dark-border animate-in slide-in-from-right-4 duration-300">
              <CardHeader>
                  <CardTitle>Importar de Banco de Dados Externo</CardTitle>
              </CardHeader>
              <CardContent>
                  {dbStep === 1 && (
                      <div className="space-y-4 max-w-2xl mx-auto">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="md:col-span-2">
                                 <label className="text-xs font-medium text-slate-400 mb-1 block">Nome da Conexão</label>
                                 <Input placeholder="Ex: ERP Principal (Leitura)" />
                             </div>
                             <div>
                                 <label className="text-xs font-medium text-slate-400 mb-1 block">Tipo de Banco</label>
                                 <select className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50">
                                     <option>MySQL</option>
                                     <option>PostgreSQL</option>
                                     <option>SQL Server</option>
                                     <option>Oracle</option>
                                 </select>
                             </div>
                             <div>
                                 <label className="text-xs font-medium text-slate-400 mb-1 block">Host</label>
                                 <Input placeholder="127.0.0.1" />
                             </div>
                             <div>
                                 <label className="text-xs font-medium text-slate-400 mb-1 block">Porta</label>
                                 <Input placeholder="3306" />
                             </div>
                             <div>
                                 <label className="text-xs font-medium text-slate-400 mb-1 block">Banco de Dados</label>
                                 <Input placeholder="nome_db" />
                             </div>
                             <div>
                                 <label className="text-xs font-medium text-slate-400 mb-1 block">Usuário</label>
                                 <Input placeholder="user_read" />
                             </div>
                             <div>
                                 <label className="text-xs font-medium text-slate-400 mb-1 block">Senha</label>
                                 <Input type="password" placeholder="******" />
                             </div>
                          </div>
                          <div className="pt-4 flex justify-end">
                              <Button onClick={handleDBConnect} disabled={isConnectingDB} className="w-full md:w-auto">
                                  {isConnectingDB ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Conectando...</> : 'Conectar ao Banco'}
                              </Button>
                          </div>
                      </div>
                  )}

                  {dbStep === 2 && (
                      <div className="space-y-6">
                          <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/20 p-3 rounded border border-green-900/50">
                              <CheckCircle className="w-4 h-4" /> Conexão estabelecida com sucesso!
                          </div>
                          
                          <div>
                              <label className="text-xs font-medium text-slate-400 mb-1 block">Selecione a Tabela de Origem</label>
                              <select className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50">
                                  <option>tb_clientes</option>
                                  <option>tb_leads_raw</option>
                                  <option>tb_contatos_site</option>
                              </select>
                          </div>

                          <div className="border border-dark-border rounded-lg overflow-hidden">
                              <div className="bg-slate-900 p-3 border-b border-dark-border font-bold text-sm text-slate-300">
                                  Mapeamento de Campos
                              </div>
                              <div className="p-4 grid grid-cols-1 gap-4">
                                  {['Nome da Empresa', 'WhatsApp / Telefone', 'E-mail', 'Cidade', 'UF'].map((field) => (
                                      <div key={field} className="flex items-center gap-4">
                                          <div className="w-1/3 text-sm text-slate-400 text-right">{field}</div>
                                          <ArrowRight className="w-4 h-4 text-slate-600" />
                                          <div className="flex-1">
                                              <select className="w-full h-9 bg-slate-800 border border-slate-700 rounded text-xs text-white px-2">
                                                  <option>Selecione coluna...</option>
                                                  <option>nm_cliente</option>
                                                  <option>ds_telefone</option>
                                                  <option>ds_email</option>
                                                  <option>nm_cidade</option>
                                                  <option>sg_uf</option>
                                              </select>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-4">
                               <Button variant="ghost" onClick={() => setDbStep(1)}>Voltar</Button>
                               <Button onClick={() => handleImport('db')}>Iniciar Importação</Button>
                          </div>
                      </div>
                  )}
              </CardContent>
          </Card>
      )}

      {/* --- TAB: FILE IMPORT --- */}
      {activeTab === 'file' && (
          <Card className="bg-dark-surface border-dark-border animate-in slide-in-from-right-4 duration-300">
              <CardHeader>
                  <CardTitle>Importar de Arquivo (CSV, Excel, JSON)</CardTitle>
              </CardHeader>
              <CardContent>
                  {fileStep === 1 && (
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl p-12 hover:bg-slate-900/50 transition-colors relative">
                          <input 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                            accept=".csv,.xlsx,.json,.md"
                          />
                          <div className="p-4 bg-slate-800 rounded-full mb-4">
                              <Upload className="w-8 h-8 text-brand" />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1">Clique ou arraste o arquivo aqui</h3>
                          <p className="text-sm text-slate-500">Suporta CSV, Excel (XLSX) ou JSON</p>
                      </div>
                  )}

                  {fileStep === 2 && uploadedFile && (
                      <div className="space-y-6">
                          <div className="flex justify-between items-center p-3 bg-slate-900 rounded border border-dark-border">
                              <div className="flex items-center gap-3">
                                  <FileSpreadsheet className="w-5 h-5 text-green-400" />
                                  <div>
                                      <div className="text-sm font-bold text-white">{uploadedFile.name}</div>
                                      <div className="text-xs text-slate-500">{(uploadedFile.size / 1024).toFixed(2)} KB</div>
                                  </div>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => { setUploadedFile(null); setFileStep(1); }}>Alterar</Button>
                          </div>

                          <div className="border border-dark-border rounded-lg overflow-hidden">
                              <div className="bg-slate-900 p-3 border-b border-dark-border font-bold text-sm text-slate-300">
                                  Pré-visualização & Mapeamento
                              </div>
                              {/* Mock Table Preview */}
                              <div className="overflow-x-auto">
                                  <table className="w-full text-left text-xs text-slate-400">
                                      <thead className="bg-slate-950">
                                          <tr>
                                              <th className="p-2 border-r border-slate-800">
                                                  <select className="bg-transparent font-bold text-brand focus:outline-none"><option>Nome (Coluna A)</option></select>
                                              </th>
                                              <th className="p-2 border-r border-slate-800">
                                                  <select className="bg-transparent font-bold text-brand focus:outline-none"><option>Telefone (Coluna B)</option></select>
                                              </th>
                                              <th className="p-2 border-r border-slate-800">
                                                  <select className="bg-transparent font-bold text-brand focus:outline-none"><option>Cidade (Coluna C)</option></select>
                                              </th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr className="border-b border-slate-800">
                                              <td className="p-2 border-r border-slate-800">Clínica Exemplo 1</td>
                                              <td className="p-2 border-r border-slate-800">11999999999</td>
                                              <td className="p-2 border-r border-slate-800">São Paulo</td>
                                          </tr>
                                          <tr className="border-b border-slate-800">
                                              <td className="p-2 border-r border-slate-800">Estética Top</td>
                                              <td className="p-2 border-r border-slate-800">21988887777</td>
                                              <td className="p-2 border-r border-slate-800">Rio de Janeiro</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-4">
                               <Button onClick={() => handleImport('file')}>Processar Importação</Button>
                          </div>
                      </div>
                  )}
              </CardContent>
          </Card>
      )}

      {/* --- LISTING & FILTERS --- */}
      <div className="pt-6 border-t border-dark-border">
          <h3 className="text-lg font-bold text-white mb-4">Prospects Cadastrados</h3>
          
          <Card className="mb-6 bg-dark-surface border-dark-border">
              <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                          <Input 
                            placeholder="Buscar por Nome..." 
                            className="pl-9" 
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                          />
                      </div>
                      <div>
                          <select 
                             className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                             value={filterUF}
                             onChange={(e) => setFilterUF(e.target.value)}
                          >
                              <option value="">Todas as UFs</option>
                              {['SP','RJ','MG','RS','PR','SC','BA','PE','CE'].map(uf => <option key={uf} value={uf}>{uf}</option>)}
                          </select>
                      </div>
                      <div>
                          <select 
                             className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                             value={filterChannel}
                             onChange={(e) => setFilterChannel(e.target.value)}
                          >
                              <option value="">Todos os Canais</option>
                              <option value="WhatsApp">WhatsApp</option>
                              <option value="E-mail">E-mail</option>
                              <option value="Telefone">Telefone</option>
                          </select>
                      </div>
                      <Button variant="outline" className="gap-2">
                          <Filter className="w-4 h-4" /> Filtros Avançados
                      </Button>
                  </div>
              </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-border">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Empresa / Prospect</th>
                    <th className="px-6 py-4 font-medium">Contato</th>
                    <th className="px-6 py-4 font-medium">Localização</th>
                    <th className="px-6 py-4 font-medium">Canal</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  {filteredProspects.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                          <div className="font-medium text-white">{item.companyName}</div>
                          <div className="text-xs text-slate-500">ID: {item.id}</div>
                      </td>
                      <td className="px-6 py-4">
                          <div className="text-slate-300">{item.whatsapp}</div>
                          <div className="text-xs text-slate-500">{item.email}</div>
                      </td>
                      <td className="px-6 py-4">
                          {item.city} - {item.uf}
                      </td>
                      <td className="px-6 py-4">
                         <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">{item.preferredChannel}</Badge>
                      </td>
                      <td className="px-6 py-4">
                          <Badge variant={item.status === 'Novo' ? 'success' : 'default'}>{item.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit2 className="w-4 h-4 text-slate-400 hover:text-white" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProspects.length === 0 && (
                  <div className="p-8 text-center text-slate-500">Nenhum prospect encontrado com os filtros atuais.</div>
              )}
            </div>
          </Card>
      </div>
    </div>
  );
};

export default Prospects;
