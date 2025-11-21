
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Pricing from './pages/Pricing';
import BotFarm from './pages/BotFarm';
import Strategy from './pages/Strategy';
import LiveChat from './pages/LiveChat';
import Reports from './pages/Reports';
import AISettings from './pages/AISettings';
import AgentConfig from './pages/AgentConfig';
import CostControl from './pages/CostControl';
import LLMJudge from './pages/LLMJudge';
import HumanIntervention from './pages/HumanIntervention';
import Prospects from './pages/Prospects';
import ProspectionJobs from './pages/ProspectionJobs';
import JobMonitoring from './pages/JobMonitoring';
import SimManagement from './pages/SimManagement';
import MessageTemplates from './pages/MessageTemplates';
import ConversationHistory from './pages/ConversationHistory';
import CompetitiveData from './pages/CompetitiveData';
import GlobalChat from './components/GlobalChat';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.OVERVIEW);

  const renderPage = () => {
    switch (activePage) {
      case Page.OVERVIEW:
        return <Overview />;
      case Page.PRICING:
        return <Pricing />;
      case Page.COMPETITIVE_DATA:
        return <CompetitiveData />;
      case Page.BOT_FARM:
        return <BotFarm />;
      case Page.STRATEGY:
        return <Strategy />;
      case Page.LIVE_INVESTIGATION:
        return <LiveChat />;
      case Page.REPORTS:
        return <Reports />;
      case Page.AI_SETTINGS:
        return <AISettings />;
      case Page.AGENT_CONFIG:
        return <AgentConfig />;
      case Page.COST_CONTROL:
        return <CostControl />;
      case Page.LLM_JUDGE:
        return <LLMJudge />;
      case Page.HUMAN_INTERVENTION:
        return <HumanIntervention />;
      case Page.PROSPECTS:
        return <Prospects />;
      case Page.PROSPECTION_JOBS:
        return <ProspectionJobs />;
      case Page.JOB_MONITORING:
        return <JobMonitoring />;
      case Page.SIM_MANAGEMENT:
        return <SimManagement />;
      case Page.MESSAGE_TEMPLATES:
        return <MessageTemplates />;
      case Page.HISTORY:
        return <ConversationHistory />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans flex">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 ml-64 p-8 h-screen overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto pb-10">
          {renderPage()}
        </div>
      </main>
      <GlobalChat />
    </div>
  );
};

export default App;