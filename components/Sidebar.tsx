
import React, { useState } from 'react';
import { 
  LayoutDashboard, Tag, Radio, Map, ServerCog, FileText, Settings, 
  CircleDollarSign, Gavel, UserCog, UserPlus, Briefcase, Activity, Smartphone, 
  Copy, History, Database, Bot, MessageCircle, ChevronDown, ChevronRight, 
  Globe, Sparkles, LayoutTemplate, Package, Users 
} from 'lucide-react';
import { Page } from '../types';
import { cn } from './ui';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isCollapsed }) => {
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
      title: "Controles",
      items: [
        { id: Page.COST_CONTROL, label: 'Controle de custos', icon: CircleDollarSign },
        { id: Page.REPORTS, label: 'Relatórios & Auditoria', icon: FileText },
        { id: Page.HISTORY, label: 'Histórico Conversas', icon: History },
      ]
    },
    {
      title: "Configuração",
      items: [
        { id: Page.PROSPECTS, label: 'Prospects', icon: UserPlus },
        { id: Page.PROSPECTION_JOBS, label: 'Jobs', icon: Briefcase },
        { id: Page.AI_SETTINGS, label: 'LLMs', icon: Settings },
        { id: Page.SIM_MANAGEMENT, label: 'Cartões SIMs', icon: Smartphone },
        { id: Page.USERS, label: 'Usuários', icon: Users },
        // Subgrupo Agentes (com ícone)
        {
          title: "Agentes",
          isSubgroup: true,
          icon: Bot,
          items: [
            { id: Page.AGENT_CONFIG, label: 'Configurar Agentes', icon: Bot },
            { id: Page.CRAWLER_CONFIG, label: 'Web Crawlers', icon: Globe },
            { id: Page.LLM_JUDGE, label: 'LLM Judge', icon: Gavel },
          ]
        },
        // Subgrupo Templates (com ícone)
        {
          title: "Templates",
          isSubgroup: true,
          icon: LayoutTemplate,
          items: [
            { id: Page.MESSAGE_TEMPLATES, label: 'Mensagens', icon: Copy },
            { id: Page.PROMPTS, label: 'Prompts de Sistema', icon: Sparkles },
          ]
        }
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
        "h-screen bg-dark-surface border-r border-dark-border flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out shadow-xl",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header Logo */}
      <div className={cn("flex items-center gap-3 border-b border-dark-border h-16 shrink-0 transition-all", isCollapsed ? "justify-center px-0" : "px-6")}>
        <div className="p-1.5 bg-brand/10 rounded-lg relative shrink-0">
          <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <Radio className="w-5 h-5 text-brand" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
            <h1 className="font-bold text-lg text-slate-100 tracking-tight">Olho Vivo</h1>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar overflow-x-hidden pb-20">
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
                                : "w-full justify-between px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200"
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
                                 <div className="flex items-center gap-3">
                                    <SubIcon className="w-4 h-4" />
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
    </aside>
  );
};

export default Sidebar;
