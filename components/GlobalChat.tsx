
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { Button, Input, Card } from './ui';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const GlobalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente virtual do Olho Vivo. Como posso ajudar na sua análise competitiva hoje?',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simular resposta do bot
    setTimeout(() => {
      const botResponses = [
        "Estou analisando os dados de preços da região...",
        "Entendido. Vou pedir para os agentes investigarem isso.",
        "Interessante. Detectei uma variação de 15% nesse serviço no concorrente LaserFast.",
        "Posso gerar um relatório detalhado sobre isso, se desejar.",
        "Verifiquei no banco de dados e temos 3 oportunidades nessa cidade."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      
      {/* Janela do Chat */}
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-dark-surface border border-dark-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto">
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-dark-border flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-brand/20 rounded-lg">
                <Bot className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Assistente Olho Vivo</h3>
                <div className="flex items-center gap-1 text-[10px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Corpo das Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-brand text-slate-900 rounded-tr-sm' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-800/70' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-in fade-in">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm p-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-900 border-t border-dark-border shrink-0">
             <form onSubmit={handleSendMessage} className="relative">
                <input 
                  className="w-full bg-slate-800 text-white text-sm rounded-full pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-slate-500 border border-slate-700"
                  placeholder="Pergunte sobre preços, dados..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 top-1.5 p-1.5 bg-brand hover:bg-brand-dark text-slate-900 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
             </form>
             <div className="text-[10px] text-center text-slate-600 mt-2 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> Powered by Gemini 2.5 Flash
             </div>
          </div>
        </div>
      )}

      {/* Botão Flutuante (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 pointer-events-auto ${
          isOpen ? 'bg-slate-700 text-slate-300 rotate-90' : 'bg-brand text-slate-900 hover:bg-brand-dark'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        
        {/* Notification Dot (Fake) */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white font-bold items-center justify-center">1</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default GlobalChat;
