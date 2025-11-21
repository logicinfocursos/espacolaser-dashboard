import React, { useState } from 'react';
import { MessageSquare, Phone, Video, MoreVertical, Mic, ArrowLeft, Bot, Smile, Frown, Meh, Tag, Volume2, Pause, Zap, Clock, Radio, CheckCircle } from 'lucide-react';
import { Card, Input, Button, Badge, CardContent } from '../components/ui';
import { MOCK_CONVERSATIONS, MOCK_CHAT_HISTORY } from '../constants';
import { Conversation, ChatMessage } from '../types';

const LiveChat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);

  // Helper to render sentiment icon
  const renderSentiment = (sentiment?: string) => {
      if (!sentiment) return null;
      switch(sentiment) {
          case 'positive': return <Smile className="w-3 h-3 text-green-400" />;
          case 'negative': return <Frown className="w-3 h-3 text-red-400" />;
          case 'promotional': return <Tag className="w-3 h-3 text-yellow-400" />;
          default: return <Meh className="w-3 h-3 text-slate-400" />;
      }
  };

  // Helper to render sentiment badge color
  const getSentimentColor = (sentiment?: string) => {
      if (!sentiment) return 'border-slate-700';
      switch(sentiment) {
          case 'positive': return 'border-green-900/50 shadow-[0_0_10px_rgba(74,222,128,0.1)]';
          case 'negative': return 'border-red-900/50';
          case 'promotional': return 'border-yellow-900/50 bg-yellow-900/10';
          default: return 'border-slate-700';
      }
  };

  // Main View: Grid 3x3 of active investigation bots
  if (!selectedChat) {
    return (
      <div className="space-y-6 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Investigações em Tempo Real</h2>
            <p className="text-slate-400">Monitorando bots ativos e interações em andamento.</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-green-500 bg-dark-surface border-dark-border">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm text-slate-400">Chats Ativos</div>
                            <div className="text-2xl font-bold text-white">{MOCK_CONVERSATIONS.filter(c => c.status === 'investigating').length}</div>
                        </div>
                        <div className="p-2 bg-slate-800 rounded-lg text-green-400">
                            <Radio className="w-5 h-5 animate-pulse" />
                        </div>
                    </div>
                    <div className="text-xs text-green-500 mt-1">Coletando dados agora</div>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 bg-dark-surface border-dark-border">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm text-slate-400">Fila de Process.</div>
                            <div className="text-2xl font-bold text-white">12</div>
                        </div>
                        <div className="p-2 bg-slate-800 rounded-lg text-yellow-400">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Tempo estimado: 45s</div>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-brand bg-dark-surface border-dark-border">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm text-slate-400">Taxa de Sucesso</div>
                            <div className="text-2xl font-bold text-white">88%</div>
                        </div>
                        <div className="p-2 bg-slate-800 rounded-lg text-brand">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Respostas válidas hoje</div>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 bg-dark-surface border-dark-border">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm text-slate-400">Sentimento Médio</div>
                            <div className="text-2xl font-bold text-white">Positivo</div>
                        </div>
                        <div className="p-2 bg-slate-800 rounded-lg text-purple-400">
                            <Smile className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Baseado em 340 chats</div>
                </CardContent>
            </Card>
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
               <div className="flex items-center gap-2">
                   <p className="text-xs text-slate-400">Alvo da Investigação</p>
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               </div>
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
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5">
          
          <div className="flex justify-center mb-4">
            <span className="bg-slate-800 text-slate-400 text-xs py-1 px-3 rounded-full shadow border border-slate-700">
                Início da Coleta de Dados • Protocolo #88291
            </span>
          </div>
          
          {MOCK_CHAT_HISTORY.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'bot' ? 'items-end' : 'items-start'}`}>
                  
                  {/* Message Bubble */}
                  <div className={`
                    relative max-w-[75%] p-3 text-sm shadow-md border 
                    ${msg.sender === 'bot' 
                        ? 'bg-brand/20 text-slate-200 rounded-l-lg rounded-br-lg border-brand/20' 
                        : `bg-slate-800 text-white rounded-r-lg rounded-bl-lg ${getSentimentColor(msg.sentiment)}`
                    }
                  `}>
                      
                      {/* Audio Player Mock */}
                      {msg.type === 'audio' && (
                          <div className="flex items-center gap-3 mb-3 bg-slate-900/50 p-2 rounded border border-slate-700">
                              <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full bg-slate-700 p-0">
                                  <PlayIcon className="w-4 h-4 fill-current" />
                              </Button>
                              <div className="h-1 w-32 bg-slate-600 rounded-full overflow-hidden">
                                  <div className="h-full w-1/3 bg-slate-400"></div>
                              </div>
                              <span className="text-xs text-slate-400">0:14</span>
                          </div>
                      )}

                      {/* Text Content */}
                      <div className={msg.type === 'audio' && 'text-slate-400 italic text-xs'}>
                          {msg.type === 'audio' && <div className="flex items-center gap-1 mb-1 text-yellow-500 font-bold"><Mic className="w-3 h-3" /> Transcrição (IA)</div>}
                          {msg.content}
                          {msg.transcription && (
                              <span className="block mt-1 text-white not-italic border-l-2 border-yellow-500 pl-2">
                                  "{msg.transcription}"
                              </span>
                          )}
                      </div>

                      {/* NER Entities */}
                      {msg.entities && msg.entities.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-white/10">
                              {msg.entities.map((entity, idx) => (
                                  <span key={idx} className="text-[10px] bg-slate-950/50 text-brand px-1.5 py-0.5 rounded border border-brand/20">
                                      {entity}
                                  </span>
                              ))}
                          </div>
                      )}

                      {/* Footer: Time & Sentiment */}
                      <div className="flex justify-between items-center mt-1 gap-4">
                        <span className={`flex items-center gap-1 text-[10px] uppercase font-bold ${
                            msg.sentiment === 'positive' ? 'text-green-400' :
                            msg.sentiment === 'negative' ? 'text-red-400' :
                            msg.sentiment === 'promotional' ? 'text-yellow-400' : 'text-slate-500'
                        }`}>
                           {renderSentiment(msg.sentiment)} {msg.sentiment}
                        </span>
                        <span className="text-[10px] text-slate-500">{msg.sender === 'bot' ? 'Bot' : 'Atendente'} • {msg.timestamp}</span>
                      </div>
                  </div>
              </div>
          ))}

        </div>

        {/* Input - Intervention & TTS */}
        <div className="p-4 bg-slate-900 border-t border-dark-border">
            <div className="bg-red-900/20 border border-red-900/50 rounded p-2 mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MoreVertical className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-red-300">Modo Automático Ativo.</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">RESPOSTA POR VOZ (TTS)</span>
                    <button onClick={() => setIsPlayingTTS(!isPlayingTTS)} className={`w-8 h-4 rounded-full transition-colors relative ${isPlayingTTS ? 'bg-brand' : 'bg-slate-700'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${isPlayingTTS ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
                <Input placeholder={isPlayingTTS ? "Digite o texto para o bot falar..." : "Enviar mensagem de texto manual..."} className="bg-slate-800 border-slate-700 text-white pr-10" />
                {isPlayingTTS && <Volume2 className="absolute right-3 top-2.5 w-5 h-5 text-brand animate-pulse" />}
            </div>
            <Button className="w-32 px-0 rounded-lg bg-red-900 hover:bg-red-800 text-red-100 border border-red-700">
              {isPlayingTTS ? 'Falar (TTS)' : 'Intervir'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const PlayIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8 5v14l11-7z" />
    </svg>
);

export default LiveChat;