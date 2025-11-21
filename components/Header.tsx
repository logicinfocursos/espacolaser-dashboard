
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, Menu, User, MessageSquare, LogOut, CreditCard, Shield, Globe, Layout, Users, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { CURRENT_USER } from '../constants';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarCollapsed, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 right-0 h-16 bg-dark-surface border-b border-dark-border z-40 flex items-center justify-between px-4 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'left-20' : 'left-64'
      }`}
    >
      {/* Left Section: Toggle & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-3xl">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Buscar conversas, leads, agentes..."
            className="w-full h-9 bg-dark-bg border border-slate-700 rounded-md pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
          />
        </div>
      </div>

      {/* Right Section: Metrics, Icons, Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Metric Context (Combustível/Créditos) */}
        <div className="hidden md:flex flex-col items-end mr-2">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Créditos IA</span>
          <span className="text-sm font-mono font-bold text-slate-200">20.000</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-r border-slate-700 pr-6 mr-2">
          
          {/* Messages Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleMenu('messages')}
              className={`p-2 rounded-full hover:bg-slate-800 transition-colors ${activeMenu === 'messages' ? 'text-brand bg-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            {activeMenu === 'messages' && (
              <div className="absolute right-0 top-12 w-80 bg-dark-surface border border-dark-border rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 z-50 overflow-hidden">
                <div className="p-3 border-b border-dark-border bg-slate-900/50">
                  <h4 className="font-bold text-slate-200 text-sm">Mensagens Recebidas</h4>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 hover:bg-slate-800 cursor-pointer border-b border-dark-border last:border-0 flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs">
                        {i === 1 ? 'LF' : i === 2 ? 'SZ' : 'DA'}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-white">
                            {i === 1 ? 'LaserFast' : i === 2 ? 'Studio Zen' : 'Dra. Ana'}
                          </span>
                          <span className="text-[10px] text-slate-500">10:4{i}</span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {i === 1 ? 'Qual o valor para pacote de 10 sessões?' : 'Obrigado pelo retorno!'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t border-dark-border bg-slate-900/30">
                  <button className="text-xs text-brand hover:underline">Ver todas as mensagens</button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleMenu('notifications')}
              className={`p-2 rounded-full transition-colors relative ${activeMenu === 'notifications' ? 'text-brand bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-dark-surface"></span>
            </button>
            {activeMenu === 'notifications' && (
              <div className="absolute right-0 top-12 w-80 bg-dark-surface border border-dark-border rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 z-50 overflow-hidden">
                <div className="p-3 border-b border-dark-border bg-slate-900/50 flex justify-between items-center">
                  <h4 className="font-bold text-slate-200 text-sm">Notificações</h4>
                  <span className="text-[10px] text-slate-500 cursor-pointer hover:text-brand">Marcar lidas</span>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                   {/* Notification 1 */}
                   <div className="p-3 border-b border-dark-border hover:bg-slate-800/50 transition-colors flex gap-3">
                      <div className="mt-1 text-yellow-500"><AlertTriangle className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-slate-200 font-medium">Bloqueio de SIM Card</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">O número +55 11 999... foi sinalizado como spam.</p>
                        <span className="text-[9px] text-slate-600 mt-1 block">Há 10 min</span>
                      </div>
                   </div>
                   {/* Notification 2 */}
                   <div className="p-3 border-b border-dark-border hover:bg-slate-800/50 transition-colors flex gap-3">
                      <div className="mt-1 text-green-500"><CheckCircle className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-slate-200 font-medium">Job Concluído</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Campanha "Verão 2024" finalizada com sucesso.</p>
                        <span className="text-[9px] text-slate-600 mt-1 block">Há 1 hora</span>
                      </div>
                   </div>
                   {/* Notification 3 */}
                   <div className="p-3 hover:bg-slate-800/50 transition-colors flex gap-3">
                      <div className="mt-1 text-blue-500"><Info className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-slate-200 font-medium">Novo Relatório Disponível</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Análise semanal de preços gerada pelo sistema.</p>
                        <span className="text-[9px] text-slate-600 mt-1 block">Há 2 horas</span>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleMenu('settings')}
              className={`p-2 rounded-full hover:bg-slate-800 transition-colors ${activeMenu === 'settings' ? 'text-brand bg-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              <Settings className="w-5 h-5" />
            </button>
            {activeMenu === 'settings' && (
              <div className="absolute right-0 top-12 w-64 bg-dark-surface border border-dark-border rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 z-50 overflow-hidden">
                <div className="p-3 border-b border-dark-border bg-slate-900/50">
                  <h4 className="font-bold text-slate-200 text-sm">Configuração do Projeto</h4>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                    <Layout className="w-4 h-4" /> Configurações Gerais
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                    <Globe className="w-4 h-4" /> Integrações & API
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                    <Shield className="w-4 h-4" /> Segurança & Acesso
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                    <CreditCard className="w-4 h-4" /> Cobrança e Planos
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div 
            onClick={() => toggleMenu('user')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="hidden md:block text-right">
              <div className="text-sm font-bold text-slate-200 group-hover:text-brand transition-colors">{CURRENT_USER.name}</div>
              <div className="text-[10px] text-slate-500 uppercase">{CURRENT_USER.role}</div>
            </div>
            <div className="relative">
              <img 
                src={CURRENT_USER.avatar} 
                alt="User" 
                className={`w-9 h-9 rounded-full border transition-all object-cover ${activeMenu === 'user' ? 'border-brand shadow-[0_0_10px_#00d1b2]' : 'border-slate-600 group-hover:border-brand'}`} 
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-dark-surface"></div>
            </div>
          </div>

          {activeMenu === 'user' && (
            <div className="absolute right-0 top-12 w-56 bg-dark-surface border border-dark-border rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 z-50 overflow-hidden">
               <div className="p-4 border-b border-dark-border bg-slate-900/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-600">
                    <img src={CURRENT_USER.avatar} className="w-full h-full object-cover" alt="User" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{CURRENT_USER.name}</div>
                    <div className="text-xs text-slate-500">{CURRENT_USER.role}</div>
                  </div>
               </div>
               <div className="p-2">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                    <User className="w-4 h-4" /> Meu Perfil
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                    <Users className="w-4 h-4" /> Gerenciar Equipe
                  </button>
                  <div className="h-px bg-slate-800 my-1"></div>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-red-900/20 flex items-center gap-3 text-sm text-red-400 hover:text-red-300 transition-colors">
                    <LogOut className="w-4 h-4" /> Sair do Sistema
                  </button>
               </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
