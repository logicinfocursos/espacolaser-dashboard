
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, User, Bot, Send, LogOut, Save, ArrowLeft, 
  Clock, AlertTriangle, CheckCircle, MoreVertical, Phone, 
  UserCheck, RotateCcw, ShieldAlert, Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui';

// --- Mock Types & Data ---

interface InterventionItem {
  id: string;
  prospectName: string;
  channel: 'WhatsApp' | 'Instagram' | 'Web Chat';
  lastMessage: string;
  status: 'Aguardando Humano' | 'IA Atuando' | 'Em Atendimento';
  currentAgent: string;
  waitTime: string;
  priority: 'Alta' | 'Média' | 'Baixa';
}

const MOCK_QUEUE: InterventionItem[] = [
  { id: '1', prospectName: 'Clínica Estética A', channel: 'WhatsApp', lastMessage: 'Quero falar com um atendente.', status: 'Aguardando Humano', currentAgent: 'Fila Geral', waitTime: '2m', priority: 'Alta' },
  { id: '2', prospectName: 'Maria Silva (Lead)', channel: 'Instagram', lastMessage: 'Qual o valor do pacote?', status: 'IA Atuando', currentAgent: 'Bot Julia', waitTime: '15s', priority: 'Baixa' },
  { id: '3', prospectName: 'Carlos Eduardo', channel: 'Web Chat', lastMessage: 'Meu pagamento não processou.', status: 'Aguardando Humano', currentAgent: 'Fila Financeiro', waitTime: '5m', priority: 'Alta' },
  { id: '4', prospectName: 'Salão Beleza Top', channel: 'WhatsApp', lastMessage: 'Pode me ligar?', status: 'Em Atendimento', currentAgent: 'Roberto (Você)', waitTime: '0s', priority: 'Média' },
];

interface ChatMsg {
  id: string;
  sender: 'me' | 'prospect' | 'bot' | 'system';
  text: string;
  time: string;
}

const MOCK_CHAT_DATA: ChatMsg[] = [
  { id: '1', sender: 'bot', text: 'Olá! Como posso ajudar com a sua dúvida sobre os pacotes?', time: '10:00' },
  { id: '2', sender: 'prospect', text: 'Estou tentando comprar o pacote de virilha mas o site da erro.', time: '10:01' },
  { id: '3', sender: 'bot', text: 'Entendi. Você está vendo alguma mensagem de erro específica?', time: '10:01' },
  { id: '4', sender: 'prospect', text: 'Diz erro 500. Quero falar com alguém.', time: '10:02' },
  { id: '5', sender: 'system', text: 'Cliente solicitou transbordo para humano. Prioridade Alta.', time: '10:02' },
];

const HumanChatConsole: React.FC = () => {
  const [view, setView] = useState<'list' | 'chat'>('list');
  const [selectedChat, setSelectedChat] = useState<InterventionItem | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleTakeOver = (item: InterventionItem) => {
    setSelectedChat(item);
    setMessages(MOCK_CHAT_DATA); // Load mock history
    setView('chat');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg: ChatMsg = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newMsg]);
    setInputText('');
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleReturnToAI = () => {
    if(confirm('Devolver controle para o Bot?')) {
       setView('list');
       setSelectedChat(null);
    }
  };

  const handleCloseChat = () => {
     if(confirm('Encerrar atendimento?')) {
        setView('list');
        setSelectedChat(null);
     }
  };

  const filteredQueue = MOCK_QUEUE.filter(item => {
      if (activeFilter === 'Todos') return true;
      if (activeFilter === 'Minhas') return item.currentAgent.includes('(Você)');
      if (activeFilter === 'Pendentes') return item.status === 'Aguardando Humano';
      return true;
  });

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-brand" />
            Console de Intervenção
          </h2>
          <p className="text-slate-400">Gerenciamento manual de conversas e transbordo.</p>
        </div>
        {view === 'chat' && (
            <Button variant="outline" onClick={() => setView('list')} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar para Lista
            </Button>
        )}
      </div>

      {/* VIEW: LIST */}
      {view === 'list' && (
        <div className="flex-1 flex flex-col gap-4">
            {/* Filters */}
            <div className="flex gap-2">
                {['Todos', 'Pendentes', 'Minhas'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                            activeFilter === filter 
                            ? 'bg-brand text-slate-900 border-brand' 
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-brand/50'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
                <div className="ml-auto relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Buscar prospect..." 
                        className="h-10 bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand"
                    />
                </div>
            </div>

            {/* Table */}
            <Card className="bg-dark-surface border-dark-border flex-1 overflow-hidden flex flex-col">
                <div className="overflow-auto custom-scrollbar flex-1">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 font-medium">Prospect</th>
                                <th className="px-6 py-4 font-medium">Canal</th>
                                <th className="px-6 py-4 font-medium">Última Mensagem</th>
                                <th className="px-6 py-4 font-medium">Status / Agente</th>
                                <th className="px-6 py-4 font-medium">Espera</th>
                                <th className="px-6 py-4 font-medium text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {filteredQueue.map((item) => (
                                <tr key={item.id} className={`hover:bg-slate-800/50 transition-colors ${item.status === 'Aguardando Humano' ? 'bg-red-900/5' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{item.prospectName}</div>
                                        <div className="text-xs text-slate-500">ID: {item.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">{item.channel}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-300 truncate max-w-[200px] italic">"{item.lastMessage}"</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <Badge variant={
                                                item.status === 'Aguardando Humano' ? 'destructive' :
                                                item.status === 'IA Atuando' ? 'default' : 'warning'
                                            } className="w-fit">
                                                {item.status}
                                            </Badge>
                                            <span className="text-xs text-slate-500">{item.currentAgent}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                        <div className={`flex items-center gap-1 ${item.priority === 'Alta' ? 'text-red-400' : ''}`}>
                                            <Clock className="w-3 h-3" /> {item.waitTime}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.status === 'Em Atendimento' ? (
                                            <Button size="sm" variant="primary" onClick={() => handleTakeOver(item)}>
                                                Continuar
                                            </Button>
                                        ) : (
                                            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white" onClick={() => handleTakeOver(item)}>
                                                Assumir
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
      )}

      {/* VIEW: CHAT */}
      {view === 'chat' && selectedChat && (
          <div className="flex-1 flex gap-4 overflow-hidden">
              {/* Chat Area */}
              <Card className="flex-1 flex flex-col bg-[#0b141a] border-dark-border relative">
                  <CardHeader className="bg-slate-900 border-b border-dark-border py-3">
                      <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                                  {selectedChat.prospectName.substring(0, 1)}
                              </div>
                              <div>
                                  <div className="font-bold text-white">{selectedChat.prospectName}</div>
                                  <div className="text-xs text-slate-400 flex items-center gap-1">
                                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Online • {selectedChat.channel}
                                  </div>
                              </div>
                          </div>
                          <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white"><Phone className="w-4 h-4"/></Button>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white"><MoreVertical className="w-4 h-4"/></Button>
                          </div>
                      </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-5 relative">
                      <div className="absolute inset-0 bg-black/90 pointer-events-none z-0"></div>
                      
                      <div className="relative z-10 space-y-3">
                          {messages.map((msg) => (
                              <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : msg.sender === 'system' ? 'items-center' : 'items-start'}`}>
                                  {msg.sender === 'system' ? (
                                      <span className="bg-slate-800/80 text-yellow-400 text-[10px] px-2 py-1 rounded-full border border-yellow-900/30 flex items-center gap-1 mb-2">
                                          <AlertTriangle className="w-3 h-3" /> {msg.text}
                                      </span>
                                  ) : (
                                      <div className={`max-w-[70%] px-3 py-2 rounded-lg text-sm shadow-md ${
                                          msg.sender === 'me' ? 'bg-[#005c4b] text-white rounded-tr-none' :
                                          msg.sender === 'bot' ? 'bg-slate-800 text-slate-300 border border-slate-700 rounded-tl-none' :
                                          'bg-slate-700 text-white rounded-tl-none'
                                      }`}>
                                          {msg.sender === 'bot' && <div className="text-[10px] text-brand font-bold mb-1 flex items-center gap-1"><Bot className="w-3 h-3"/> BOT</div>}
                                          <div>{msg.text}</div>
                                          <div className="text-[10px] text-right opacity-60 mt-1">{msg.time}</div>
                                      </div>
                                  )}
                              </div>
                          ))}
                          <div ref={messagesEndRef} />
                      </div>
                  </CardContent>

                  {/* Input */}
                  <div className="p-3 bg-slate-900 border-t border-dark-border shrink-0">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                          <Input 
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                              placeholder="Digite sua mensagem..."
                              className="bg-slate-800 border-slate-700 text-white"
                          />
                          <Button type="submit" className="bg-brand text-slate-900 hover:bg-brand-dark">
                              <Send className="w-4 h-4" />
                          </Button>
                      </form>
                  </div>
              </Card>

              {/* Side Panel */}
              <div className="w-80 flex flex-col gap-4">
                  <Card className="bg-dark-surface border-dark-border">
                      <CardHeader className="pb-2">
                          <CardTitle className="text-sm uppercase text-slate-500">Ações de Controle</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                          <Button variant="outline" className="w-full justify-start gap-2 text-slate-300 hover:text-brand hover:border-brand" onClick={handleReturnToAI}>
                              <RotateCcw className="w-4 h-4" /> Devolver para IA
                          </Button>
                          <Button variant="outline" className="w-full justify-start gap-2 text-slate-300 hover:text-green-400 hover:border-green-400">
                              <CheckCircle className="w-4 h-4" /> Marcar Resolvido
                          </Button>
                          <Button variant="outline" className="w-full justify-start gap-2 text-red-400 border-red-900/30 hover:bg-red-900/10" onClick={handleCloseChat}>
                              <LogOut className="w-4 h-4" /> Encerrar Conversa
                          </Button>
                      </CardContent>
                  </Card>

                  <Card className="bg-dark-surface border-dark-border flex-1">
                      <CardHeader className="pb-2">
                          <CardTitle className="text-sm uppercase text-slate-500">Dados do Prospect</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div>
                              <label className="text-xs text-slate-500 block mb-1">Nome</label>
                              <Input value={selectedChat.prospectName} className="h-8 text-xs bg-slate-900" readOnly />
                          </div>
                          <div>
                              <label className="text-xs text-slate-500 block mb-1">Telefone</label>
                              <Input value="+55 11 99999-9999" className="h-8 text-xs bg-slate-900" readOnly />
                          </div>
                          <div>
                              <label className="text-xs text-slate-500 block mb-1">Interesse Identificado</label>
                              <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline" className="text-[10px]">Pacote Virilha</Badge>
                                  <Badge variant="outline" className="text-[10px]">Promoção</Badge>
                              </div>
                          </div>
                          <div className="pt-4 border-t border-slate-800">
                              <label className="text-xs text-slate-500 block mb-2">Anotações</label>
                              <textarea className="w-full h-24 bg-slate-900 border border-slate-700 rounded-md p-2 text-xs text-slate-300 resize-none" placeholder="Adicione notas internas..." />
                              <Button size="sm" variant="secondary" className="w-full mt-2 h-7 text-xs">Salvar Nota</Button>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
      )}
    </div>
  );
};

export default HumanChatConsole;
