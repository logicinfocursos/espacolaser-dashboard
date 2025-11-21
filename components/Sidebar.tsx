import React from 'react';
import { LayoutDashboard, Tag, Radio, Map, ServerCog, FileText, LogOut, Settings, CircleDollarSign, Gavel, UserCog, UserPlus, Briefcase, Activity, Smartphone, Copy, History, Database, Bot } from 'lucide-react';
import { Page } from '../types';
import { cn } from './ui';
import { CURRENT_USER } from '../constants';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: Page.OVERVIEW, label: 'Visão Geral', icon: LayoutDashboard },
    { id: Page.STRATEGY, label: 'Estratégia & Gaps', icon: Map },
    { id: Page.PRICING, label: 'Intel. de Preços', icon: Tag },
    { id: Page.COMPETITIVE_DATA, label: 'Dados Competitivos', icon: Database },
    { id: Page.BOT_FARM, label: 'Gestão de Coleta', icon: ServerCog },
    { id: Page.SIM_MANAGEMENT, label: 'Gestão de SIMs', icon: Smartphone },
    { id: Page.PROSPECTION_JOBS, label: 'Gestão de Jobs', icon: Briefcase },
    { id: Page.JOB_MONITORING, label: 'Monitoramento', icon: Activity },
    { id: Page.HISTORY, label: 'Histórico Conversas', icon: History },
    { id: Page.PROSPECTS, label: 'Gestão de Prospects', icon: UserPlus },
    { id: Page.MESSAGE_TEMPLATES, label: 'Templates Mensagem', icon: Copy },
    { id: Page.LIVE_INVESTIGATION, label: 'Investigações ao Vivo', icon: Radio },
    { id: Page.AGENT_CONFIG, label: 'Parametrizar Agentes', icon: Bot },
    { id: Page.LLM_JUDGE, label: 'LLM Judge (Supervisor)', icon: Gavel },
    { id: Page.HUMAN_INTERVENTION, label: 'Monitoramento Humano', icon: UserCog },
    { id: Page.COST_CONTROL, label: 'Controle de Custos', icon: CircleDollarSign },
    { id: Page.REPORTS, label: 'Relatórios & Auditoria', icon: FileText },
    { id: Page.AI_SETTINGS, label: 'Configurações de IA', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-dark-surface border-r border-dark-border flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-dark-border/50">
        <div className="p-2 bg-brand/10 rounded-lg relative">
          <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <Radio className="w-6 h-6 text-brand" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-slate-100 tracking-tight">Olho Vivo</h1>
          <p className="text-xs text-slate-500">Intel. Competitiva</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-brand/10 text-brand border border-brand/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-brand" : "text-slate-500")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Profile & Access Control Simulator */}
      <div className="p-4 border-t border-dark-border/50">
        <div className="bg-slate-900/50 p-3 rounded-lg border border-dark-border flex items-center gap-3 mb-3">
            <img src={CURRENT_USER.avatar} alt="User" className="w-8 h-8 rounded-full border border-slate-600" />
            <div className="flex-1 overflow-hidden">
                <div className="text-xs font-bold text-slate-200 truncate">{CURRENT_USER.name}</div>
                <div className="text-[10px] text-brand uppercase tracking-wide">{CURRENT_USER.role}</div>
            </div>
            <LogOut className="w-4 h-4 text-slate-500 hover:text-red-400 cursor-pointer" />
        </div>

        <div className="bg-slate-900/50 p-3 rounded-lg border border-dark-border">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-500">Investigações Hoje</p>
            <span className="text-xs font-bold text-brand">1.240</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <div className="bg-brand h-1.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;