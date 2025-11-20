import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Pricing from './pages/Pricing';
import BotFarm from './pages/BotFarm';
import Strategy from './pages/Strategy';
import LiveChat from './pages/LiveChat';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.OVERVIEW);

  const renderPage = () => {
    switch (activePage) {
      case Page.OVERVIEW:
        return <Overview />;
      case Page.PRICING:
        return <Pricing />;
      case Page.BOT_FARM:
        return <BotFarm />;
      case Page.STRATEGY:
        return <Strategy />;
      case Page.LIVE_INVESTIGATION:
        return <LiveChat />;
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
    </div>
  );
};

export default App;