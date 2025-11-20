import React, { useState } from 'react';
import { MessageSquare, Phone, Video, MoreVertical, Mic, ArrowLeft, Bot } from 'lucide-react';
import { Card, Input, Button, Badge } from '../components/ui';
import { MOCK_CONVERSATIONS } from '../constants';
import { Conversation } from '../types';

const LiveChat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);

  // Main View: Grid 3x3 of active investigation bots
  if (!selectedChat) {
    return (
      <div className="space-y-6 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Investigações em Tempo Real</h2>
            <p className="text-slate-400">
                Monitorando bots ativos. <span className="text-brand font-bold">{MOCK_CONVERSATIONS.filter(c => c.status !== 'completed').length}</span> conversas simultâneas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_CONVERSATIONS.map((chat) => (
            <Card key={chat.id} className={`flex flex-col h-64 border-l-4 hover:bg-slate-800/50 transition-all cursor-pointer relative ${chat.status === 'investigating' ? 'border-l-green-500' : 'border-l-slate-500'}`} onClick={() => setSelectedChat(chat)}>
              <div className="p-4 flex justify-between items-start border-b border-dark-border/50">
                <div>
                  <h3 className="font-bold text-white">{chat.competitorName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default" className="text-[10px] bg-slate-800">Bot: {chat.botPersona}</Badge>
                    {chat.hasAudio && <Mic className="w-3 h-3 text-yellow-400 animate-pulse" />}
                  </div>
                </div>
                <span className="text-xs text-slate-500 uppercase font-mono">{chat.channel}</span>
              </div>
              <div className="flex-1 p-4 bg-slate-950/30 overflow-hidden flex flex-col justify-end">
                <div className="text-xs text-slate-500 mb-1">Última interação ({chat.timestamp}):</div>
                <div className="text-sm text-slate-300 italic border-l-2 border-brand pl-2">
                    "{chat.lastMessage}"
                </div>
              </div>
              <div className="p-3 bg-dark-surface border-t border-dark-border">
                 <Button className="w-full text-xs h-8" variant={chat.status === 'investigating' ? "outline" : "ghost"}>
                    {chat.status === 'investigating' ? "MONITORAR AGORA" : "VER HISTÓRICO"}
                 </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Detail View: WhatsApp Investigation Style
  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4 animate-in slide-in-from-right duration-300">
      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden border-dark-border bg-slate-950 relative">
        {/* Chat Header */}
        <div className="p-4 bg-slate-900 border-b border-dark-border flex justify-between items-center">
          <div className="flex items-center gap-3">
             <Button variant="ghost" className="p-0 mr-2" onClick={() => setSelectedChat(null)}>
                <ArrowLeft className="w-5 h-5" /> Voltar
             </Button>
             <div className="w-10 h-10 rounded-full bg-red-900/50 flex items-center justify-center text-red-200 font-bold border border-red-800">
               {selectedChat.competitorName.substring(0, 2)}
             </div>
             <div>
               <h3 className="font-bold text-white">{selectedChat.competitorName}</h3>
               <p className="text-xs text-slate-400">Alvo da Investigação</p>
             </div>
          </div>
          <div className="flex items-center gap-4 px-4 py-1 bg-brand/10 rounded-full border border-brand/20">
            <Bot className="w-4 h-4 text-brand" />
            <div className="flex flex-col">
                <span className="text-[10px] text-brand font-bold uppercase">Persona Ativa</span>
                <span className="text-xs text-slate-200">{selectedChat.botPersona}</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5">
          
          <div className="flex justify-center mb-4">
            <span className="bg-slate-800 text-slate-400 text-xs py-1 px-3 rounded-full shadow">Início da Coleta de Dados</span>
          </div>
          
          {/* Bot Message (Right) */}
          <div className="flex justify-end">
            <div className="bg-brand/20 text-slate-200 p-3 rounded-l-lg rounded-br-lg max-w-[70%] text-sm shadow-md border border-brand/20">
              Olá, tudo bem? Vi no instagram de vocês uma promoção de depilação a laser. Poderiam me passar a tabela de preços?
              <span className="text-[10px] text-slate-400 block text-right mt-1">Bot • 09:41</span>
            </div>
          </div>

          {/* Competitor Message (Left) */}
          <div className="flex justify-start">
            <div className="bg-slate-800 text-white p-3 rounded-r-lg rounded-bl-lg max-w-[70%] text-sm shadow-md border border-slate-700">
              Bom dia! Tudo ótimo. A promoção é válida para pacotes fechados. Qual região você tem interesse?
              <span className="text-[10px] text-slate-500 block text-right mt-1">Atendente Concorrente • 09:42</span>
            </div>
          </div>

           {/* Bot Message (Right) */}
           <div className="flex justify-end">
            <div className="bg-brand/20 text-slate-200 p-3 rounded-l-lg rounded-br-lg max-w-[70%] text-sm shadow-md border border-brand/20">
              Seria axila e virilha completa.
              <span className="text-[10px] text-slate-400 block text-right mt-1">Bot • 09:42</span>
            </div>
          </div>

          {/* Competitor Audio (Left) */}
           <div className="flex justify-start">
            <div className="bg-slate-800 text-white p-3 rounded-r-lg rounded-bl-lg max-w-[70%] text-sm shadow-md border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-yellow-500 font-bold">Áudio Transcrito (IA)</span>
              </div>
              "Então, para virilha e axila no pacote com 10 sessões a gente consegue fazer por 12x de 79,90. Se fechar hoje ganha o buço."
              <span className="text-[10px] text-slate-500 block text-right mt-1">Atendente Concorrente • 09:44</span>
            </div>
          </div>

        </div>

        {/* Input - Intervention */}
        <div className="p-4 bg-slate-900 border-t border-dark-border">
            <div className="bg-red-900/20 border border-red-900/50 rounded p-2 mb-2 flex items-center gap-2">
                <MoreVertical className="w-4 h-4 text-red-400" />
                <span className="text-xs text-red-300">Modo Automático Ativo. Digite apenas para assumir o controle (Intervenção Humana).</span>
            </div>
          <div className="flex gap-2">
            <Input placeholder="Enviar mensagem manual..." className="bg-slate-800 border-slate-700 text-white" />
            <Button className="w-24 px-0 rounded-lg bg-red-900 hover:bg-red-800 text-red-100 border border-red-700">
              Intervir
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveChat;