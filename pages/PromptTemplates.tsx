
import React, { useState } from 'react';
import { Sparkles, Plus, Search, Copy, Edit, Trash2, Save, X, Tag, Terminal, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';

interface PromptTemplate {
  id: string;
  title: string;
  role: 'Investigador' | 'Crawler' | 'Analista' | 'Supervisor';
  description: string;
  content: string;
  tags: string[];
  lastModified: string;
}

// Mock Initial Data
const INITIAL_PROMPTS: PromptTemplate[] = [
  {
    id: '1',
    title: 'Negociador Agressivo',
    role: 'Investigador',
    description: 'Foca em obter o menor preço possível insistindo em descontos à vista.',
    content: 'Você é um cliente que busca o menor preço a qualquer custo. Reclame do valor inicial e mencione que a concorrência (cite uma marca aleatória) fez mais barato. Pergunte: "Qual o desconto máximo para fechar agora no PIX?".',
    tags: ['Negociação', 'Preço Baixo', 'WhatsApp'],
    lastModified: '10/03/2024'
  },
  {
    id: '2',
    title: 'Extrator JSON Estrito',
    role: 'Crawler',
    description: 'Prompt técnico para garantir saída JSON válida sem markdown.',
    content: 'Aja como um parser HTML. Analise o texto de entrada e extraia: Nome do Serviço, Preço (float) e Unidade. Saída OBRIGATÓRIA: Array de objetos JSON puros. NÃO inclua ```json ou explicações. Se não encontrar dados, retorne [].',
    tags: ['Técnico', 'JSON', 'Web'],
    lastModified: '08/03/2024'
  },
  {
    id: '3',
    title: 'Auditor de Compliance',
    role: 'Supervisor',
    description: 'Verifica se o agente cometeu infrações ou alucinações.',
    content: 'Analise a resposta do agente. Verifique: 1. Se inventou preços (Alucinação). 2. Se foi rude. 3. Se prometeu brindes não autorizados. Se detectar qualquer infração, classifique como CRÍTICO e explique o motivo.',
    tags: ['Auditoria', 'Segurança', 'Judge'],
    lastModified: '05/03/2024'
  },
  {
    id: '4',
    title: 'Cliente Curioso (Soft)',
    role: 'Investigador',
    description: 'Faz perguntas abertas para mapear serviços, sem focar só em preço.',
    content: 'Você é um cliente indeciso. Pergunte sobre: Dor do procedimento, tipos de laser (Alexandrite/Diodo), tempo da sessão e cuidados pós. Só pergunte o preço no final da conversa.',
    tags: ['Exploração', 'Qualidade', 'WhatsApp'],
    lastModified: '12/03/2024'
  }
];

const PromptTemplates: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptTemplate[]>(INITIAL_PROMPTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Partial<PromptTemplate>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('Todos');

  // Handlers
  const handleSave = () => {
    if (!editingPrompt.title || !editingPrompt.content || !editingPrompt.role) {
        return alert("Título, Função e Conteúdo são obrigatórios.");
    }

    if (editingPrompt.id) {
        setPrompts(prompts.map(p => p.id === editingPrompt.id ? { ...p, ...editingPrompt, lastModified: new Date().toLocaleDateString() } as PromptTemplate : p));
    } else {
        const newPrompt: PromptTemplate = {
            id: Date.now().toString(),
            title: editingPrompt.title,
            role: editingPrompt.role,
            description: editingPrompt.description || '',
            content: editingPrompt.content,
            tags: editingPrompt.tags || [],
            lastModified: new Date().toLocaleDateString()
        };
        setPrompts([newPrompt, ...prompts]);
    }
    setIsModalOpen(false);
    setEditingPrompt({});
  };

  const handleDelete = (id: string) => {
      if(confirm("Tem certeza que deseja excluir este prompt?")) {
          setPrompts(prompts.filter(p => p.id !== id));
      }
  };

  const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      alert("Prompt copiado para a área de transferência!");
  };

  const filteredPrompts = prompts.filter(p => 
      (selectedRole === 'Todos' || p.role === selectedRole) &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const getRoleColor = (role: string) => {
      switch(role) {
          case 'Investigador': return 'text-green-400 border-green-900/50 bg-green-900/10';
          case 'Crawler': return 'text-blue-400 border-blue-900/50 bg-blue-900/10';
          case 'Analista': return 'text-purple-400 border-purple-900/50 bg-purple-900/10';
          case 'Supervisor': return 'text-orange-400 border-orange-900/50 bg-orange-900/10';
          default: return 'text-slate-400';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand" />
            Biblioteca de Prompts
          </h2>
          <p className="text-slate-400">Modelos de instruções de sistema pré-definidos para seus agentes.</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-brand/20" onClick={() => { setEditingPrompt({}); setIsModalOpen(true); }}>
            <Plus className="w-4 h-4" /> Novo Prompt
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-dark-surface border-dark-border">
          <CardContent className="pt-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input 
                    placeholder="Buscar por título ou tag..." 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
                  {['Todos', 'Investigador', 'Crawler', 'Analista', 'Supervisor'].map(role => (
                      <button
                          key={role}
                          onClick={() => setSelectedRole(role)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border whitespace-nowrap ${
                              selectedRole === role 
                              ? 'bg-slate-700 text-white border-slate-600' 
                              : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200'
                          }`}
                      >
                          {role}
                      </button>
                  ))}
              </div>
          </CardContent>
      </Card>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrompts.map(prompt => (
              <Card key={prompt.id} className="bg-dark-surface border-dark-border flex flex-col group hover:border-brand/30 transition-all">
                  <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                          <div className="space-y-1">
                              <CardTitle className="text-lg text-white group-hover:text-brand transition-colors">
                                  {prompt.title}
                              </CardTitle>
                              <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${getRoleColor(prompt.role)}`}>
                                  {prompt.role}
                              </span>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-800" onClick={() => { setEditingPrompt(prompt); setIsModalOpen(true); }}>
                                  <Edit className="w-4 h-4 text-slate-400" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-900/20" onClick={() => handleDelete(prompt.id)}>
                                  <Trash2 className="w-4 h-4 text-red-400" />
                              </Button>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-4">
                      <p className="text-xs text-slate-400 line-clamp-2">{prompt.description}</p>
                      
                      <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 relative group/code flex-1">
                          <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-800 text-slate-400" onClick={() => copyToClipboard(prompt.content)}>
                                  <Copy className="w-3 h-3" />
                              </Button>
                          </div>
                          <p className="text-xs font-mono text-slate-300 whitespace-pre-wrap line-clamp-6 leading-relaxed">
                              {prompt.content}
                          </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800/50">
                          <div className="flex gap-2 flex-wrap">
                              {prompt.tags.map(tag => (
                                  <span key={tag} className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded">
                                      <Tag className="w-3 h-3" /> {tag}
                                  </span>
                              ))}
                          </div>
                          <span className="text-[10px] text-slate-600">Modificado: {prompt.lastModified}</span>
                      </div>
                  </CardContent>
              </Card>
          ))}
          
          {/* Add New Card (Inline) */}
          <button 
              onClick={() => { setEditingPrompt({}); setIsModalOpen(true); }}
              className="border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-8 text-slate-600 hover:text-brand hover:border-brand/50 hover:bg-slate-900/20 transition-all min-h-[300px]"
          >
              <div className="p-4 bg-slate-900 rounded-full mb-3">
                  <Plus className="w-8 h-8" />
              </div>
              <span className="font-medium">Criar Novo Modelo</span>
          </button>
      </div>

      {/* Modal: Edit/Create */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
            <Card className="w-full max-w-3xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center shrink-0">
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-brand" />
                        {editingPrompt.id ? 'Editar Prompt' : 'Novo Prompt'}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></Button>
                </CardHeader>
                <CardContent className="pt-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Título do Prompt *</label>
                            <Input 
                                placeholder="Ex: Negociador Implacável" 
                                value={editingPrompt.title || ''}
                                onChange={(e) => setEditingPrompt({...editingPrompt, title: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-400 mb-1 block">Função Aplicável *</label>
                            <select 
                                className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50"
                                value={editingPrompt.role || ''}
                                onChange={(e) => setEditingPrompt({...editingPrompt, role: e.target.value as any})}
                            >
                                <option value="">Selecione...</option>
                                <option value="Investigador">Investigador</option>
                                <option value="Crawler">Crawler</option>
                                <option value="Analista">Analista</option>
                                <option value="Supervisor">Supervisor</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-1 block">Descrição Curta</label>
                        <Input 
                            placeholder="Para que serve este prompt? (Ex: Foca em extração de preços...)" 
                            value={editingPrompt.description || ''}
                            onChange={(e) => setEditingPrompt({...editingPrompt, description: e.target.value})}
                        />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> Conteúdo do System Prompt *
                        </label>
                        <div className="flex-1 relative">
                            <textarea 
                                className="w-full h-64 bg-slate-950 border border-dark-border rounded-md p-4 text-sm text-slate-200 font-mono focus:outline-none focus:border-brand resize-none custom-scrollbar leading-relaxed"
                                placeholder="Digite as instruções detalhadas aqui..."
                                value={editingPrompt.content || ''}
                                onChange={(e) => setEditingPrompt({...editingPrompt, content: e.target.value})}
                            />
                            <div className="absolute bottom-3 right-3 text-[10px] text-slate-600">
                                {(editingPrompt.content || '').length} chars
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                            <Code className="w-3 h-3" /> Dica: Use marcadores claros e exemplos (few-shot prompting) para melhores resultados.
                        </p>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-400 mb-1 block">Tags (Separadas por vírgula)</label>
                        <Input 
                            placeholder="Ex: Vendas, Técnico, JSON" 
                            value={editingPrompt.tags ? editingPrompt.tags.join(', ') : ''}
                            onChange={(e) => setEditingPrompt({...editingPrompt, tags: e.target.value.split(',').map(t => t.trim())})}
                        />
                    </div>

                </CardContent>
                <div className="p-4 border-t border-dark-border flex justify-end gap-2 shrink-0 bg-dark-surface">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave} className="gap-2">
                        <Save className="w-4 h-4" /> Salvar Prompt
                    </Button>
                </div>
            </Card>
        </div>
      )}
    </div>
  );
};

export default PromptTemplates;
