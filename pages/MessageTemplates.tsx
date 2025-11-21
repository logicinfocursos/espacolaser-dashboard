
import React, { useState } from 'react';
import { Copy, Plus, Search, Edit, Trash2, Save, X, MessageSquare, Smartphone, Mail, Instagram, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';
import { MessageTemplate } from '../types';

// Mock Data
const MOCK_TEMPLATES: MessageTemplate[] = [
  { id: '1', name: 'Abordagem Inicial - Promoção', channel: 'WhatsApp', content: 'Olá, tudo bem? Vi que você tem interesse em estética. Temos uma condição especial para virilha hoje. Gostaria de saber mais?', status: 'active', lastModified: '10/03/2024' },
  { id: '2', name: 'Cobrança Suave', channel: 'SMS', content: 'Olho Vivo: Ola, notamos que voce nao finalizou seu agendamento. Responda SIM para continuar.', status: 'active', lastModified: '08/03/2024' },
  { id: '3', name: 'Newsletter Mensal', channel: 'E-mail', subject: 'Novidades do Mês na Espaço Laser', content: 'Olá {{nome}},\n\nConfira as novidades deste mês...\n\nAtt, Equipe.', status: 'inactive', lastModified: '01/02/2024' },
  { id: '4', name: 'Resposta Direct Instagram', channel: 'Instagram', content: 'Obrigado pelo contato! Um de nossos consultores vai te chamar em instantes.', status: 'active', lastModified: '12/03/2024' },
];

const MessageTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>(MOCK_TEMPLATES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Partial<MessageTemplate>>({});
  const [searchTerm, setSearchTerm] = useState('');

  // CRUD Operations
  const handleSave = () => {
    if (!editingTemplate.name || !editingTemplate.content) return alert("Nome e Conteúdo são obrigatórios.");
    
    if (editingTemplate.id) {
        setTemplates(templates.map(t => t.id === editingTemplate.id ? { ...t, ...editingTemplate, lastModified: new Date().toLocaleDateString() } as MessageTemplate : t));
    } else {
        const newTemplate: MessageTemplate = {
            id: Date.now().toString(),
            name: editingTemplate.name,
            channel: editingTemplate.channel || 'WhatsApp',
            subject: editingTemplate.subject,
            content: editingTemplate.content,
            status: editingTemplate.status || 'active',
            lastModified: new Date().toLocaleDateString()
        };
        setTemplates([newTemplate, ...templates]);
    }
    setIsModalOpen(false);
    setEditingTemplate({});
  };

  const handleDelete = (id: string) => {
    if(confirm('Excluir este template permanentemente?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleToggleStatus = (template: MessageTemplate) => {
    const newStatus = template.status === 'active' ? 'inactive' : 'active';
    setTemplates(templates.map(t => t.id === template.id ? { ...t, status: newStatus } : t));
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChannelIcon = (channel: string) => {
    switch(channel) {
        case 'WhatsApp': return <MessageSquare className="w-4 h-4 text-green-400" />;
        case 'SMS': return <Smartphone className="w-4 h-4 text-blue-400" />;
        case 'E-mail': return <Mail className="w-4 h-4 text-yellow-400" />;
        case 'Instagram': return <Instagram className="w-4 h-4 text-pink-400" />;
        default: return <Copy className="w-4 h-4" />;
    }
  };

  // Render Preview Component based on Channel
  const renderPreview = () => {
      const content = editingTemplate.content || 'O conteúdo da mensagem aparecerá aqui...';
      const channel = editingTemplate.channel || 'WhatsApp';
      const subject = editingTemplate.subject || 'Assunto do E-mail';

      if (channel === 'WhatsApp') {
          return (
              <div className="bg-[#0b141a] p-4 rounded-lg h-full flex flex-col border border-slate-800">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800 mb-4">
                      <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                      <div className="text-sm text-white font-medium">Espaço Laser</div>
                  </div>
                  <div className="bg-[#005c4b] p-2 rounded-lg rounded-tr-none self-end max-w-[90%] relative shadow-sm">
                      <p className="text-sm text-[#e9edef] whitespace-pre-wrap">{content}</p>
                      <div className="text-[10px] text-[#8696a0] text-right mt-1 flex justify-end gap-1 items-end">
                          10:42 <span className="text-blue-400">✓✓</span>
                      </div>
                  </div>
              </div>
          );
      }

      if (channel === 'SMS') {
          return (
              <div className="bg-slate-100 p-4 rounded-lg h-full flex flex-col text-slate-900 border border-slate-300">
                   <div className="flex justify-center mb-4 text-xs text-slate-500">Hoje 10:42</div>
                   <div className="bg-slate-300 p-3 rounded-xl rounded-bl-none self-start max-w-[85%]">
                       <p className="text-sm">{content}</p>
                   </div>
              </div>
          );
      }

      if (channel === 'Instagram') {
          return (
              <div className="bg-black p-4 rounded-lg h-full flex flex-col border border-slate-800">
                  <div className="flex items-center justify-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-pink-600 p-[2px]">
                          <div className="w-full h-full bg-black rounded-full border-2 border-black"></div>
                      </div>
                  </div>
                  <div className="bg-[#262626] p-3 rounded-2xl rounded-br-none self-end max-w-[85%]">
                       <p className="text-sm text-white">{content}</p>
                  </div>
              </div>
          );
      }

      if (channel === 'E-mail') {
          return (
              <div className="bg-white p-0 rounded-lg h-full flex flex-col text-slate-800 overflow-hidden border border-slate-300">
                  <div className="bg-slate-100 p-3 border-b border-slate-200">
                      <div className="text-xs text-slate-500 mb-1">Assunto:</div>
                      <div className="font-bold text-sm truncate">{subject}</div>
                  </div>
                  <div className="p-4 text-sm whitespace-pre-wrap font-serif">
                      {content}
                  </div>
              </div>
          );
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Copy className="w-6 h-6 text-brand" />
            Templates de Mensagem
          </h2>
          <p className="text-slate-400">Padronize a comunicação dos seus agentes e campanhas.</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-brand/20" onClick={() => { setEditingTemplate({ status: 'active', channel: 'WhatsApp' }); setIsModalOpen(true); }}>
            <Plus className="w-4 h-4" /> Novo Template
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="bg-dark-surface border-dark-border">
          <CardContent className="pt-6">
              <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input 
                    placeholder="Buscar templates por nome ou conteúdo..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-dark-surface border-dark-border">
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                      <tr>
                          <th className="px-6 py-4 font-medium">Nome</th>
                          <th className="px-6 py-4 font-medium">Canal</th>
                          <th className="px-6 py-4 font-medium">Conteúdo (Preview)</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium text-right">Ações</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                      {filteredTemplates.map((template) => (
                          <tr key={template.id} className="hover:bg-slate-800/50 transition-colors">
                              <td className="px-6 py-4">
                                  <div className="font-medium text-white">{template.name}</div>
                                  <div className="text-xs text-slate-500">ID: {template.id} • {template.lastModified}</div>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                      {getChannelIcon(template.channel)}
                                      <span>{template.channel}</span>
                                  </div>
                              </td>
                              <td className="px-6 py-4 max-w-md">
                                  <div className="text-slate-400 truncate italic">
                                      {template.channel === 'E-mail' && <span className="font-bold not-italic text-slate-300 mr-1">[{template.subject}]</span>}
                                      "{template.content}"
                                  </div>
                              </td>
                              <td className="px-6 py-4">
                                  <Badge variant={template.status === 'active' ? 'success' : 'destructive'} className="text-[10px]">
                                      {template.status === 'active' ? 'ATIVO' : 'INATIVO'}
                                  </Badge>
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-2">
                                      <Tooltip content={template.status === 'active' ? 'Desativar' : 'Ativar'}>
                                          <Button 
                                            variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700"
                                            onClick={() => handleToggleStatus(template)}
                                          >
                                              {template.status === 'active' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-slate-500" />}
                                          </Button>
                                      </Tooltip>
                                      <Tooltip content="Editar">
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => { setEditingTemplate(template); setIsModalOpen(true); }}>
                                              <Edit className="w-4 h-4 text-slate-400" />
                                          </Button>
                                      </Tooltip>
                                      <Tooltip content="Excluir">
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-900/20" onClick={() => handleDelete(template.id)}>
                                              <Trash2 className="w-4 h-4 text-red-400" />
                                          </Button>
                                      </Tooltip>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {filteredTemplates.length === 0 && (
                  <div className="p-8 text-center text-slate-500">Nenhum template encontrado.</div>
              )}
          </div>
      </Card>

      {/* Modal: Edit/Create */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
            <Card className="w-full max-w-4xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200 h-[80vh] flex flex-col">
                <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center shrink-0">
                    <CardTitle>{editingTemplate.id ? 'Editar Template' : 'Novo Template'}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></Button>
                </CardHeader>
                <CardContent className="pt-6 flex-1 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                        
                        {/* Form Section */}
                        <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 block">Nome do Template *</label>
                                <Input 
                                    placeholder="Ex: Promoção de Natal" 
                                    value={editingTemplate.name || ''}
                                    onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 block">Canal</label>
                                <select 
                                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                    value={editingTemplate.channel || 'WhatsApp'}
                                    onChange={(e) => setEditingTemplate({...editingTemplate, channel: e.target.value as any})}
                                >
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="SMS">SMS</option>
                                    <option value="E-mail">E-mail</option>
                                    <option value="Instagram">Instagram</option>
                                </select>
                            </div>

                            {editingTemplate.channel === 'E-mail' && (
                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1 block">Assunto do E-mail</label>
                                    <Input 
                                        placeholder="Assunto..." 
                                        value={editingTemplate.subject || ''}
                                        onChange={(e) => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 block flex justify-between">
                                    <span>Conteúdo da Mensagem *</span>
                                    <span>{(editingTemplate.content || '').length} chars</span>
                                </label>
                                <textarea 
                                    className="w-full h-48 bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none custom-scrollbar"
                                    placeholder="Digite sua mensagem aqui..."
                                    value={editingTemplate.content || ''}
                                    onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})}
                                />
                                <p className="text-[10px] text-slate-500 mt-1">
                                    Use {'{{nome}}'} para inserir o nome do cliente dinamicamente.
                                </p>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1 block">Status</label>
                                <select 
                                    className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                    value={editingTemplate.status || 'active'}
                                    onChange={(e) => setEditingTemplate({...editingTemplate, status: e.target.value as any})}
                                >
                                    <option value="active">Ativo</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                            </div>
                        </div>

                        {/* Preview Section */}
                        <div className="h-full flex flex-col">
                            <label className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-2">
                                <Eye className="w-3 h-3" /> Live Preview ({editingTemplate.channel})
                            </label>
                            <div className="flex-1 bg-slate-900/50 border border-dark-border rounded-xl p-4 overflow-hidden flex items-center justify-center shadow-inner">
                                <div className="w-[300px] h-[500px] shadow-2xl rounded-lg overflow-hidden">
                                    {renderPreview()}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="p-4 border-t border-dark-border flex justify-end gap-2 shrink-0">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave} className="gap-2">
                        <Save className="w-4 h-4" /> Salvar Template
                    </Button>
                </div>
            </Card>
        </div>
      )}

    </div>
  );
};

export default MessageTemplates;
