
import React, { useState } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Mic, Send, Check, CheckCheck, Phone, Video, Info, Bot, User, ShieldAlert, Gavel, Ban, UserCog, StopCircle, UserCheck, MessageSquare, Filter, PauseCircle, AlertCircle, HelpCircle, Inbox, Radio, Clock, CheckCircle, Activity } from 'lucide-react';
import { Button, Input, Badge, Card } from '../components/ui';

// Interfaces Mockadas para esta página
interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'typing';
  phone: string;
  interventionMode: 'bot' | 'human';
  isJudgeActive: boolean;
}

interface Message {
  id: string;
  senderId: string; // 'me' or contact.id
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  isSystem?: boolean;
}

// Dados Mockados
const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Clínica Estética A', lastMessage: 'Vou verificar a agenda, só um momento.', time: '10:42', unreadCount: 2, status: 'typing', phone: '+55 11 99999-1111', interventionMode: 'bot', isJudgeActive: false },
  { id: '2', name: 'Salão Beleza Top', lastMessage: 'Obrigado pelo interesse!', time: '10:15', unreadCount: 0, status: 'online', phone: '+55 11 98888-2222', interventionMode: 'bot', isJudgeActive: true },
  { id: '3', name: 'Dra. Ana Dermato', lastMessage: 'Qual o valor para 10 sessões?', time: 'Ontem', unreadCount: 5, status: 'offline', phone: '+55 21 97777-3333', interventionMode: 'human', isJudgeActive: false },
  { id: '4', name: 'Studio Zen', lastMessage: 'Não temos horário hoje.', time: 'Ontem', unreadCount: 0, status: 'offline', phone: '+55 41 96666-4444', interventionMode: 'bot', isJudgeActive: true },
  { id: '5', name: 'Centro Estético Vida', lastMessage: 'Promoção válida até sexta.', time: 'Segunda', unreadCount: 0, status: 'offline', phone: '+55 31 95555-5555', interventionMode: 'bot', isJudgeActive: false },
  { id: '6', name: 'Laser Prime', lastMessage: 'Ok, combinado.', time: 'Segunda', unreadCount: 0, status: 'offline', phone: '+55 51 94444-6666', interventionMode: 'bot', isJudgeActive: false },
  { id: '7', name: 'Beleza Pura', lastMessage: 'Áudio (0:14)', time: 'Domingo', unreadCount: 1, status: 'offline', phone: '+55 71 93333-7777', interventionMode: 'human', isJudgeActive: true },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: '1', senderId: 'me', text: 'Olá, bom dia! Gostaria de saber o preço da depilação a laser na virilha.', time: '10:30', status: 'read' },
    { id: '2', senderId: '1', text: 'Bom dia! Tudo bem? Para virilha completa o valor da sessão avulsa é R$ 120,00.', time: '10:32', status: 'read' },
    { id: '3', senderId: 'me', text: 'Entendi. Vocês têm algum pacote promocional com axila junto?', time: '10:33', status: 'read' },
    { id: '4', senderId: '1', text: 'Temos sim! O pacote com 10 sessões de virilha + axila sai por 10x de R$ 89,90.', time: '10:35', status: 'read' },
    { id: '5', senderId: 'me', text: 'Interessante. Consigo agendar uma avaliação para hoje?', time: '10:40', status: 'delivered' },
    { id: '6', senderId: '1', text: 'Vou verificar a agenda, só um momento.', time: '10:42', status: 'delivered' },
  ],
  '2': [
    { id: '1', senderId: 'me', text: 'Oi, vocês cobrem orçamento da Espaço Laser?', time: '10:10', status: 'read' },
    { id: '2', senderId: '2', text: 'Olá! Depende da região. Qual unidade você cotou?', time: '10:12', status: 'read' },
    { id: '3', senderId: 'me', text: 'Shopping Eldorado.', time: '10:14', status: 'read' },
    { id: '4', senderId: '2', text: 'Obrigado pelo interesse!', time: '10:15', status: 'read' },
  ],
  '3': [
    { id: '1', senderId: 'me', text: 'Olá, vi o anúncio no Instagram.', time: 'Ontem', status: 'read' },
    { id: '2', senderId: '3', text: 'Oi! Que bom. Gostou de qual oferta?', time: 'Ontem', status: 'read' },
    { id: '3', senderId: '3', text: 'Qual o valor para 10 sessões?', time: 'Ontem', status: 'delivered' },
  ]
};

const LiveConversations: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const activeContact = contacts.find(c => c.id === selectedContactId);
  const activeMessages = MOCK_MESSAGES[selectedContactId] || [];

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    // In a real app, we would add the message to the list and send to backend
    alert(`Mensagem enviada: ${messageInput}`);
    setMessageInput('');
  };

  const toggleIntervention = () => {
    setContacts(prev => prev.map(c => {
      if (c.id === selectedContactId) {
        return {
          ...c,
          interventionMode: c.interventionMode === 'bot' ? 'human' : 'bot'
        };
      }
      return c;
    }));
  };

  const handleMenuAction = (action: string) => {
    console.log(`Action triggered: ${action} for contact ${selectedContactId}`);
    
    if (action === 'activate_judge') {
        setContacts(prev => prev.map(c => 
            c.id === selectedContactId ? { ...c, isJudgeActive: !c.isJudgeActive } : c
        ));
    }

    setIsMenuOpen(false);
  };

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter);
    setIsFilterMenuOpen(false);
    // Em uma implementação real, isso filtraria a lista 'filteredContacts'
  };

  // Determine bubble color based on state
  const getMessageBubbleColor = (senderId: string) => {
    if (senderId !== 'me') return 'bg-slate-800 text-slate-100 rounded-tl-none';
    
    if (activeContact?.interventionMode === 'human') {
        return 'bg-red-900/80 text-white rounded-tr-none border border-red-700/50';
    }
    
    if (activeContact?.isJudgeActive) {
        return 'bg-orange-700/80 text-white rounded-tr-none border border-orange-600/50';
    }

    // Default Bot
    return 'bg-[#005c4b] text-slate-100 rounded-tr-none';
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] -m-4 bg-dark-bg overflow-hidden animate-in fade-in duration-500" onClick={() => {
        if(isMenuOpen) setIsMenuOpen(false);
        if(isFilterMenuOpen) setIsFilterMenuOpen(false);
    }}>
      
      {/* LEFT SIDEBAR (CONTACT LIST) */}
      <div className="w-[30%] md:w-[350px] border-r border-dark-border flex flex-col bg-dark-surface shrink-0">
        {/* Header */}
        <div className="h-16 bg-slate-900 border-b border-dark-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-sm">
               <MessageSquare className="w-5 h-5 text-brand" />
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold text-slate-100 text-sm">Conversas ao Vivo</h2>
                <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-[10px] h-4 px-1.5 bg-slate-800 border-slate-700 text-slate-300">
                        {contacts.length}
                    </Badge>
                    <Badge variant="success" className="text-[10px] h-4 px-1.5">
                        ativo
                    </Badge>
                </div>
            </div>
          </div>
          <div className="relative">
             <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-slate-800 text-slate-400"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFilterMenuOpen(!isFilterMenuOpen);
                    setIsMenuOpen(false); // Close other menu if open
                }}
             >
                 <MoreVertical className="w-5 h-5" />
             </Button>
             
             {/* Filter Menu Drawer */}
             {isFilterMenuOpen && (
                 <div className="absolute left-0 top-10 w-56 bg-slate-800 border border-slate-700 rounded-md shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                     <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700/50 mb-1">
                         Filtrar Conversas
                     </div>
                     <button onClick={() => handleFilterSelect('responding')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                         <Inbox className="w-3.5 h-3.5 text-blue-400" /> Prospect respondendo
                     </button>
                     <button onClick={() => handleFilterSelect('live')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                         <MessageSquare className="w-3.5 h-3.5 text-green-400" /> Conversas ao vivo
                     </button>
                     <button onClick={() => handleFilterSelect('paused')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                         <PauseCircle className="w-3.5 h-3.5 text-yellow-400" /> Conversas pausadas
                     </button>
                     <button onClick={() => handleFilterSelect('info_obtained')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                         <CheckCheck className="w-3.5 h-3.5 text-brand" /> Informações obtidas
                     </button>
                     <button onClick={() => handleFilterSelect('no_response')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                         <AlertCircle className="w-3.5 h-3.5 text-red-400" /> Sem resposta do prospect
                     </button>
                 </div>
             )}
          </div>
        </div>

        {/* Search */}
        <div className="p-2 bg-dark-surface border-b border-dark-border">
           <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input 
                 type="text" 
                 className="block w-full pl-10 pr-3 py-1.5 border border-dark-border rounded-lg leading-5 bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand sm:text-sm" 
                 placeholder="Pesquisar ou começar nova conversa"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           {filteredContacts.map(contact => (
             <div 
               key={contact.id} 
               onClick={() => setSelectedContactId(contact.id)}
               className={`flex items-center px-3 py-3 cursor-pointer border-b border-dark-border/50 hover:bg-slate-800 transition-colors ${selectedContactId === contact.id ? 'bg-slate-800' : ''}`}
             >
               <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-lg font-bold text-slate-300">
                     {contact.name.substring(0, 1)}
                  </div>
                  {contact.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-surface"></div>}
               </div>
               
               <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                     <h3 className="text-sm font-medium text-slate-100 truncate flex items-center gap-2">
                         {contact.name}
                         {contact.interventionMode === 'human' && <UserCheck className="w-3 h-3 text-red-500" />}
                         {contact.isJudgeActive && <Gavel className="w-3 h-3 text-orange-500" />}
                     </h3>
                     <span className={`text-[10px] ${contact.unreadCount > 0 ? 'text-green-500 font-bold' : 'text-slate-500'}`}>{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <div className="text-xs text-slate-400 truncate flex items-center gap-1">
                        {contact.status === 'typing' ? <span className="text-green-400 font-bold">Digitando...</span> : contact.lastMessage}
                     </div>
                     {contact.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center px-1.5 py-0.5 ml-2 text-[10px] font-bold leading-none text-black bg-green-500 rounded-full">
                           {contact.unreadCount}
                        </span>
                     )}
                  </div>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* CENTER PANEL (CHAT AREA) */}
      <div className="flex-1 flex flex-col bg-[#0b141a] relative min-w-0 border-r border-dark-border">
        
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="h-16 bg-slate-900 border-b border-dark-border flex items-center justify-between px-4 shrink-0 z-10">
               <div className="flex items-center cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold mr-3">
                     {activeContact.name.substring(0, 1)}
                  </div>
                  <div>
                     <div className="text-sm font-medium text-slate-100">{activeContact.name}</div>
                     <div className="text-xs text-slate-500">
                        {activeContact.status === 'typing' ? 'digitando...' : activeContact.status === 'online' ? 'online' : `visto por último hoje às ${activeContact.time}`}
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-slate-400">
                   
                   {/* Status Badges */}
                   <div className="flex gap-2">
                       {activeContact.interventionMode === 'bot' ? (
                           <Badge variant="outline" className="text-[10px] bg-brand/10 text-brand border-brand/30 flex items-center gap-1">
                               <Bot className="w-3 h-3" /> Bot Ativo
                           </Badge>
                       ) : (
                           <Badge variant="outline" className="text-[10px] bg-red-900/20 text-red-400 border-red-500/30 flex items-center gap-1 animate-pulse">
                               <UserCog className="w-3 h-3" /> Intervenção Humana Ativa
                           </Badge>
                       )}

                       {activeContact.isJudgeActive && (
                           <Badge variant="outline" className="text-[10px] bg-orange-900/20 text-orange-400 border-orange-500/30 flex items-center gap-1">
                               <Gavel className="w-3 h-3" /> Judge Ativo
                           </Badge>
                       )}
                   </div>

                   <Button 
                     size="sm" 
                     className={`text-xs h-8 ${activeContact.interventionMode === 'bot' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-brand text-slate-900 hover:bg-brand-dark'}`}
                     onClick={toggleIntervention}
                   >
                       {activeContact.interventionMode === 'bot' ? 'Assumir conversa' : 'Retornar conversa para bot'}
                   </Button>

                   <div className="border-l border-slate-700 h-6 mx-1"></div>
                   <Search className="w-5 h-5 cursor-pointer hover:text-white" />
                   
                   {/* Dropdown Menu (Right Side) */}
                   <div className="relative">
                       <MoreVertical 
                            className="w-5 h-5 cursor-pointer hover:text-white" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                                setIsFilterMenuOpen(false);
                            }}
                       />
                       {isMenuOpen && (
                           <div className="absolute right-0 top-8 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
                               <button onClick={() => handleMenuAction('stop_chat')} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                                   <StopCircle className="w-4 h-4" /> Interromper conversa
                               </button>
                               <button onClick={() => handleMenuAction('ban_prospect')} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 flex items-center gap-2">
                                   <Ban className="w-4 h-4" /> Banir prospect
                               </button>
                               <button onClick={() => handleMenuAction('change_agent')} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                                   <UserCog className="w-4 h-4" /> Trocar de agente
                               </button>
                               <button onClick={() => handleMenuAction('activate_judge')} className="w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-slate-700 hover:text-orange-300 flex items-center gap-2">
                                   <Gavel className="w-4 h-4" /> {activeContact.isJudgeActive ? 'Desativar Judge' : 'Ativar Judge'}
                               </button>
                           </div>
                       )}
                   </div>
               </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-5 relative">
               <div className="absolute inset-0 bg-black/90 pointer-events-none z-0"></div>
               
               <div className="relative z-10 flex flex-col space-y-2">
                   <div className="flex justify-center my-4">
                       <span className="bg-slate-800 text-slate-400 text-[10px] py-1 px-3 rounded-lg shadow uppercase font-medium">
                           HOJE
                       </span>
                   </div>

                   {activeMessages.map((msg) => (
                       <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                           <div className={`
                               relative max-w-[65%] rounded-lg px-3 py-1.5 text-sm shadow-sm 
                               ${getMessageBubbleColor(msg.senderId)}
                           `}>
                               <div className="break-words">{msg.text}</div>
                               <div className="flex justify-end items-center gap-1 mt-1">
                                   <span className={`text-[10px] ${msg.senderId === 'me' ? 'text-white/70' : 'text-slate-400/80'}`}>{msg.time}</span>
                                   {msg.senderId === 'me' && (
                                       msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-blue-200" /> : <Check className="w-3 h-3 text-white/70" />
                                   )}
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
            </div>

            {/* Input Area - Only Visible if Human Intervention is Active */}
            {activeContact.interventionMode === 'human' ? (
                <div className="h-16 bg-slate-900 px-4 py-2 flex items-center gap-3 shrink-0 z-10 border-t-4 border-red-900">
                   <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-transparent">
                       <Smile className="w-6 h-6" />
                   </Button>
                   <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-transparent">
                       <Paperclip className="w-6 h-6" />
                   </Button>
                   
                   <form onSubmit={handleSendMessage} className="flex-1">
                      <input 
                          type="text" 
                          className="w-full h-10 rounded-lg bg-slate-800 text-slate-200 px-4 focus:outline-none placeholder-slate-500 border border-transparent focus:border-red-900"
                          placeholder="Digite uma mensagem manual..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          autoFocus
                      />
                   </form>

                   {messageInput.trim() ? (
                       <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-transparent" onClick={handleSendMessage}>
                           <Send className="w-6 h-6" />
                       </Button>
                   ) : (
                       <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-transparent">
                           <Mic className="w-6 h-6" />
                       </Button>
                   )}
                </div>
            ) : (
                <div className="bg-slate-900 px-4 py-3 flex items-center justify-center gap-2 shrink-0 z-10 border-t border-dark-border">
                    <Bot className="w-4 h-4 text-brand animate-pulse" />
                    <span className="text-xs text-slate-400 italic">O Bot está respondendo automaticamente. Clique em "Assumir conversa" para intervir.</span>
                </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 border-b-8 border-brand">
              <div className="text-center text-slate-400">
                  <h1 className="text-3xl font-light text-slate-200 mb-4">Olho Vivo Web</h1>
                  <p className="text-sm">Selecione uma conversa para começar a monitorar ou intervir.</p>
                  <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Bot className="w-4 h-4" /> Protegido por Criptografia de Ponta-a-Ponta
                  </div>
              </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR (STATS) - New Column */}
      <div className="w-72 bg-dark-surface border-l border-dark-border flex-col hidden xl:flex shrink-0">
          <div className="p-4 border-b border-dark-border">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand" />
                  Performance Ao Vivo
              </h3>
          </div>
          
          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              {/* Card 1: Chats Ativos */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-brand/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-slate-400 font-medium">Chats Ativos</span>
                      <div className="p-1.5 bg-brand/10 rounded-lg text-brand">
                          <Radio className="w-4 h-4 animate-pulse" />
                      </div>
                  </div>
                  <div className="text-2xl font-bold text-white">2</div>
                  <div className="text-[10px] text-green-500 mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Coletando dados agora
                  </div>
              </div>

              {/* Card 2: Fila */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-yellow-500/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-slate-400 font-medium">Fila de Process.</span>
                      <div className="p-1.5 bg-yellow-900/20 rounded-lg text-yellow-500">
                          <Clock className="w-4 h-4" />
                      </div>
                  </div>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                      Tempo estimado: 45s
                  </div>
              </div>

              {/* Card 3: Sucesso */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-slate-400 font-medium">Taxa de Sucesso</span>
                      <div className="p-1.5 bg-green-900/20 rounded-lg text-green-500">
                          <CheckCircle className="w-4 h-4" />
                      </div>
                  </div>
                  <div className="text-2xl font-bold text-white">88%</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                      Respostas válidas hoje
                  </div>
              </div>

              {/* Card 4: Sentimento */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-slate-400 font-medium">Sentimento Médio</span>
                      <div className="p-1.5 bg-purple-900/20 rounded-lg text-purple-500">
                          <Smile className="w-4 h-4" />
                      </div>
                  </div>
                  <div className="text-xl font-bold text-white">Positivo</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                      Baseado em 340 chats
                  </div>
              </div>

              {/* Extra: Trends/Activity Feed */}
              <div className="mt-6 border-t border-dark-border pt-4">
                   <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-wider">Log de Alertas (Recentes)</h4>
                   <div className="space-y-3">
                       <div className="flex gap-2 items-start">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse"></div>
                           <div>
                               <p className="text-xs text-slate-300 leading-snug">Intervenção Humana iniciada em <span className="font-mono text-red-400">#8291</span></p>
                               <span className="text-[10px] text-slate-500">há 2 min</span>
                           </div>
                       </div>
                       <div className="flex gap-2 items-start">
                           <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0"></div>
                           <div>
                               <p className="text-xs text-slate-300 leading-snug">Judge bloqueou resposta inadequada</p>
                               <span className="text-[10px] text-slate-500">há 15 min</span>
                           </div>
                       </div>
                        <div className="flex gap-2 items-start">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                           <div>
                               <p className="text-xs text-slate-300 leading-snug">Bot solicitou ajuda (Humano)</p>
                               <span className="text-[10px] text-slate-500">há 32 min</span>
                           </div>
                       </div>
                   </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default LiveConversations;
