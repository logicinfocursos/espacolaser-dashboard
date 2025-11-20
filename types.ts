export interface CompetitorData {
  id: string;
  name: string;
  isNetwork: boolean; // To distinguish chains from individual practitioners
  unitCount: number;
  region: string;
  service: string;
  ourPrice: number;
  competitorPrice: number;
  lastUpdate: string;
  history: number[];
}

export interface SimCard {
  id: string;
  phoneNumber: string;
  carrier: string;
  status: 'active' | 'risk' | 'blocked' | 'cooldown';
  conversationsCount: number;
  lastUsed: string;
  healthScore: number; // 0-100
}

export interface BotTask {
  id: string;
  targetName: string;
  channel: 'whatsapp' | 'instagram' | 'web_crawler' | 'voice_call';
  status: 'queued' | 'running' | 'completed' | 'failed';
  objective: 'price_check' | 'promo_discovery' | 'hours_check';
  cost: number; // in BRL
  timestamp: string;
}

export interface StrategicGap {
  id: string;
  region: string;
  city: string;
  marketPotential: 'High' | 'Medium' | 'Low';
  currentShare: number;
  primaryCompetitor: string;
  lossReason: 'Price' | 'Service_Gap' | 'Brand_Presence' | 'Location';
  aiSuggestion: string;
}

export interface Conversation {
  id: string;
  competitorName: string;
  botPersona: string;
  lastMessage: string;
  timestamp: string;
  status: 'investigating' | 'completed' | 'human_intervention';
  channel: 'whatsapp' | 'instagram' | 'voice';
  hasAudio: boolean;
}

export interface MapDataPoint {
  id: string;
  city: string;
  lat: number;
  lng: number;
  dominance: number;
  competitorCount: number;
  opportunityLevel: 'High' | 'Medium' | 'Low';
}

export interface Agent {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
  phone: string;
  status: 'livre' | 'em_conversa' | 'indisponivel';
  conversationsToday: number;
  successRate: number;
  lastActivity: string;
}

export enum Page {
  OVERVIEW = 'overview',
  STRATEGY = 'strategy', // New
  BOT_FARM = 'bot_farm', // New (replaces simple Agents)
  PRICING = 'pricing',
  LIVE_INVESTIGATION = 'live_investigation'
}