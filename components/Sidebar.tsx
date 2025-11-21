
import React, { useState } from 'react';
import { 
  LayoutDashboard, Tag, Radio, Map, ServerCog, FileText, LogOut, Settings, 
  CircleDollarSign, Gavel, UserCog, UserPlus, Briefcase, Activity, Smartphone, 
  Copy, History, Database, Bot, MessageCircle, ChevronDown, ChevronRight, 
  Globe, Sparkles, LayoutTemplate, Package, PanelLeftClose, PanelLeftOpen 
} from 'lucide-react';
import { Page } from '../types';
import { cn } from './ui';
import { CURRENT_USER } from '../constants';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isCollapsed, toggleSidebar }) => {
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const [openSubgroups, setOpenSubgroups] = useState<Record<string, boolean>>({
    "Templates": false,
    "Agentes": false
  });

  const toggleSubgroup = (title: string) => {
    setOpenSubgroups(prev => ({ ...prev, [title]: !prev[title] }));
  };
  
  const navGroups = [
    {
      title: "Cockpit",
      items: [
        { id: Page.OVERVIEW, label: 'Dashboard', icon: LayoutDashboard },
        { id: Page.JOB_MONITORING, label: 'Monitoramento', icon: Activity },
        { id: Page.LIVE_CONVERSATIONS, label: 'Conversas ao vivo', icon: MessageCircle },
      ]
    },
    {
      title: "Info",
      items: [
        { id: Page.COMPETITIVE_DATA, label: 'Dados competitivos', icon: Database },
        { id: Page.PRICING, label: 'Inteligência de preços', icon: Tag },
      ]
    },
    {
      title: "Configuração",
      items: [
        { id: Page.SIM_MANAGEMENT, label: 'Cartões SIMs', icon: Smartphone },
        { id: Page.PROSPECTION_JOBS, label: 'Jobs', icon: Briefcase },
        { id: Page.PROSPECTS, label: 'Prospects', icon: UserPlus },
        { id: Page.AI_SETTINGS, label: 'LLMs', icon: Settings },
        // Subgrupo Templates (com ícone)
        {
          title: "Templates",
          isSubgroup: true,
          icon: LayoutTemplate,
          items: [
            { id: Page.MESSAGE_TEMPLATES, label: 'Mensagens', icon: Copy },
            { id: Page.PROMPTS, label: 'Prompts de Sistema', icon: Sparkles },
          ]
        },
        // Subgrupo Agentes (com ícone)
        {
          title: "Agentes",
          isSubgroup: true,
          icon: Bot,
          items: [
            { id: Page.AGENT_CONFIG, label: 'Configurar Agentes', icon: Bot },
            { id: Page.CRAWLER_CONFIG, label: 'Web Crawlers', icon: Globe },
            { id: Page.LLM_JUDGE, label: 'LLM Judge (Supervisor)', icon: Gavel },
          ]
        }
      ]
    },
    {
      title: "Controles",
      items: [
        { id: Page.COST_CONTROL, label: 'Controle de custos', icon: CircleDollarSign },
        { id: Page.REPORTS, label: 'Relatórios & Auditoria', icon: FileText },
        { id: Page.HISTORY, label: 'Histórico Conversas', icon: History },
      ]
    },
    {
      title: "Outros",
      collapsible: true,
      icon: Package,
      items: [
        { id: Page.STRATEGY, label: 'Estratégia & Gaps', icon: Map },
        { id: Page.BOT_FARM, label: 'Gestão de coleta', icon: ServerCog },
        { id: Page.LIVE_INVESTIGATION, label: 'Investigações ao vivo', icon: Radio },
        { id: Page.HUMAN_INTERVENTION, label: 'Monitoramento humano', icon: UserCog },
        { id: Page.HUMAN_CHAT_CONSOLE, label: 'Console de Intervenção', icon: UserCog },
      ]
    }
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-dark-surface border-r border-dark-border flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn("flex items-center gap-3 border-b border-dark-border/50 shrink-0 transition-all", isCollapsed ? "p-4 justify-center" : "p-6")}>
        <div className="p-2 bg-brand/10 rounded-lg relative shrink-0">
          <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <Radio className="w-6 h-6 text-brand" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
            <h1 className="font-bold text-lg text-slate-100 tracking-tight">Olho Vivo</h1>
            <p className="text-xs text-slate-500">Intel. Competitiva</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {navGroups.map((group, index) => {
          // Logic for collapsible group (Outros)
          const isCollapsible = group.collapsible;
          const isOpen = isCollapsible ? isOthersOpen : true;
          const GroupIcon = group.icon || Package;

          return (
            <div key={index} className={cn(isCollapsed && "flex flex-col items-center")}>
              {/* Group Title / Header */}
              {isCollapsible ? (
                <button 
                  onClick={() => setIsOthersOpen(!isOthersOpen)}
                  className={cn(
                    "flex items-center transition-colors mb-2",
                    isCollapsed 
                      ? "justify-center w-10 h-10 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white" 
                      : "w-full justify-between px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300"
                  )}
                  title={isCollapsed ? group.title : undefined}
                >
                  {isCollapsed ? (
                    <GroupIcon className="w-5 h-5" />
                  ) : (
                    <>
                      <span className="flex items-center gap-2">
                         {group.icon && <group.icon className="w-3 h-3" />} {group.title}
                      </span>
                      {isOthersOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </>
                  )}
                </button>
              ) : (
                !isCollapsed && (
                  <h3 className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider animate-in fade-in duration-300">
                    {group.title}
                  </h3>
                )
              )}
              
              {/* Group Items */}
              {(isOpen || isCollapsed) && (
                <div className={cn("space-y-1", isCollapsed && !isOpen && isCollapsible ? "hidden" : "block")}>
                  {group.items.map((item: any) => {
                    // --- Render Subgroup (Templates, Agentes) ---
                    if (item.isSubgroup) {
                      const isSubOpen = openSubgroups[item.title];
                      const SubIcon = item.icon;

                      return (
                        <div key={item.title} className={cn("mt-2 mb-2", isCollapsed && "w-full flex flex-col items-center")}>
                          <button 
                            onClick={() => toggleSubgroup(item.title)}
                            className={cn(
                              "flex items-center transition-colors group mb-1",
                              isCollapsed
                                ? "justify-center w-10 h-10 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white relative"
                                : "w-full justify-between px-4 text-[10px] font-bold text-slate-600 uppercase tracking-wider hover:text-slate-300"
                            )}
                            title={isCollapsed ? item.title : undefined}
                          >
                             {isCollapsed ? (
                               <>
                                 <SubIcon className="w-5 h-5" />
                                 {isSubOpen && <div className="absolute -right-1 -top-1 w-2 h-2 bg-brand rounded-full"></div>}
                               </>
                             ) : (
                               <>
                                 <div className="flex items-center gap-2">
                                    <SubIcon className="w-3 h-3" />
                                    {item.title}
                                 </div>
                                 {isSubOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                               </>
                             )}
                          </button>
                          
                          {isSubOpen && (
                            <div className={cn(
                              "duration-200 animate-in slide-in-from-top-1",
                              isCollapsed ? "space-y-2 mt-1 bg-slate-900/50 rounded-lg p-1" : "space-y-1 border-l border-slate-800 ml-6 pl-2"
                            )}>
                              {item.items.map((subItem: any) => {
                                 const isActive = activePage === subItem.id;
                                 return (
                                  <button
                                    key={subItem.id}
                                    onClick={() => onNavigate(subItem.id)}
                                    title={isCollapsed ? subItem.label : undefined}
                                    className={cn(
                                      "flex items-center transition-all duration-200",
                                      isCollapsed
                                        ? "w-8 h-8 justify-center rounded-md"
                                        : "w-full gap-3 px-3 py-1.5 rounded-lg text-sm font-medium",
                                      isActive 
                                        ? "text-brand bg-brand/5" 
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                    )}
                                  >
                                    <subItem.icon className={cn("shrink-0", isCollapsed ? "w-4 h-4" : "w-3.5 h-3.5", isActive ? "text-brand" : "text-slate-500")} />
                                    {!isCollapsed && <span>{subItem.label}</span>}
                                  </button>
                                 );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // --- Render Normal Item ---
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        title={isCollapsed ? item.label : undefined}
                        className={cn(
                          "flex items-center transition-all duration-200 group",
                          isCollapsed 
                            ? "w-10 h-10 justify-center rounded-lg mx-auto" 
                            : "w-full gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                          isActive 
                            ? "bg-brand/10 text-brand border border-brand/20 shadow-sm" 
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"
                        )}
                      >
                        <item.icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4", isActive ? "text-brand" : "text-slate-500 group-hover:text-slate-300")} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="border-t border-dark-border/50 bg-dark-surface shrink-0 flex flex-col">
        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full py-3 text-slate-500 hover:text-white hover:bg-slate-800 transition-colors border-b border-dark-border/50"
          title={isCollapsed ? "Expandir Menu" : "Recolher Menu"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>

        {/* User Profile & Access Control */}
        <div className={cn("p-4 transition-all", isCollapsed ? "px-2" : "px-4")}>
          <div className={cn(
            "bg-slate-900/50 rounded-lg border border-dark-border flex items-center transition-all mb-3",
            isCollapsed ? "p-2 justify-center" : "p-3 gap-3"
          )}>
              <img src={CURRENT_USER.avatar} alt="User" className="w-8 h-8 rounded-full border border-slate-600 shrink-0" />
              {!isCollapsed && (
                <div className="flex-1 overflow-hidden">
                    <div className="text-xs font-bold text-slate-200 truncate">{CURRENT_USER.name}</div>
                    <div className="text-[10px] text-brand uppercase tracking-wide">{CURRENT_USER.role}</div>
                </div>
              )}
              {!isCollapsed && <LogOut className="w-4 h-4 text-slate-500 hover:text-red-400 cursor-pointer ml-auto" />}
          </div>

          {!isCollapsed && (
            <div className="bg-slate-900/50 p-3 rounded-lg border border-dark-border animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-slate-500">Investigações Hoje</p>
                <span className="text-xs font-bold text-brand">1.240</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-brand h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
