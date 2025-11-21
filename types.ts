

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
  sourceType: 'bot_chat' | 'web_crawler' | 'ocr_instagram' | 'manual';
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
  provider: 'physical' | 'twilio' | 'z-api';
}

export interface ScriptTemplate {
  id: string;
  title: string;
  channel: 'whatsapp' | 'instagram' | 'voice';
  content: string;
  tags: string[]; // e.g. "Price", "Hours", "Promo"
  active: boolean;
}

export interface CrawlerJob {
  id: string;
  targetUrl: string;
  targetName: string;
  type: 'web_scraping' | 'instagram_story_ocr' | 'feed_post';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  itemsFound: number;
  lastRun: string;
  thumbnailUrl?: string; // For OCR visualization
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  module: 'SIM_MANAGER' | 'AGENT_CORE' | 'CRAWLER' | 'AUTH';
  timestamp: string;
  user?: string;
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

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'competitor' | 'human_agent';
  type: 'text' | 'audio' | 'intervention_marker';
  content: string;
  timestamp: string;
  // AI Features
  transcription?: string; // STT result
  sentiment?: 'positive' | 'negative' | 'neutral' | 'promotional';
  entities?: string[]; // Extracted NER (e.g., "R$ 79,90", "Axila")
  audioUrl?: string; // Mock URL
}

export interface Report {
  id: string;
  title: string;
  type: 'weekly_market' | 'price_alert' | 'coverage';
  date: string;
  status: 'ready' | 'generating';
  format: 'PDF' | 'XLSX';
  size: string;
}

export interface MapDataPoint {
  id: string;
  city: string;
  lat: number;
  lng: number;
  type: 'own_unit' | 'competitor' | 'opportunity_zone';
  name: string; // Name of the unit or competitor
  details: string;
}

export interface Agent {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
  phone: string;
  status: 'livre' | 'em_conversa' | 'indisponivel' | 'pausado';
  conversationsToday: number;
  successRate: number;
  lastActivity: string;
  assignedScriptId: string;
}

export interface UserProfile {
  name: string;
  role: 'admin' | 'analyst' | 'viewer';
  avatar: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  time: string;
}

export interface AgentQueueItem {
  id: string;
  agentId: string;
  agentName: string;
  channel: 'WhatsApp' | 'Instagram' | 'Web';
  status: 'Enviando' | 'Aguardando' | 'Analisando';
  lastAction: string;
  time: string;
}

export interface LLMConfig {
  id: string;
  name: string;
  provider: 'openai' | 'google' | 'ollama' | 'anthropic' | 'custom';
  model: string;
  apiKey: string;
  baseUrl?: string;
  isActive: boolean;
}

export interface AgentProfile {
  id: string;
  name: string;
  role: 'investigator_whatsapp' | 'crawler_web' | 'analyst_price' | 'manager';
  llmId: string;
  systemPrompt: string;
  isActive: boolean;
  temperature?: number;
}

export interface CostLog {
  id: string;
  timestamp: string;
  agentName: string;
  llmModel: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  promptPreview: string;
  responsePreview: string;
}

export interface CostConfig {
  monthlyLimit: number;
  alertThreshold: number;
  emailAlerts: boolean;
}

export interface JudgeConfig {
  isActive: boolean;
  llmId: string;
  systemPrompt: string;
}

export interface JudgeIntervention {
  id: string;
  timestamp: string;
  agentName: string;
  competitorName: string;
  reason: string;
  actionTaken: 'Intervenção' | 'Bloqueio' | 'Reescrita' | 'Alerta';
  judgeAnalysis: string;
  originalResponse: string;
  modifiedResponse?: string;
}

export interface HumanInterventionLog {
  id: string;
  timestamp: string;
  date: string;
  originalAgentName: string;
  competitorName: string;
  intervenerName: string;
  actionTaken: 'Assumiu Chat' | 'Pausou Bot' | 'Corrigiu Info' | 'Encerrou Conversa';
  reason?: string;
  chatHistoryId: string; // Mock ID to fetch history
}

export interface Prospect {
  id: string;
  companyName: string;
  address: string;
  city: string;
  uf: string;
  whatsapp: string;
  email: string;
  preferredChannel: 'WhatsApp' | 'E-mail' | 'SMS' | 'Telefone';
  status: 'Novo' | 'Importado' | 'Qualificado';
}

export interface ProspectionJob {
  id: string;
  name: string;
  description: string;
  channel: 'WhatsApp' | 'SMS' | 'E-mail' | 'Telegram' | 'Instagram' | 'Facebook' | 'TikTok';
  status: 'Ativo' | 'Pausado' | 'Concluído' | 'Rascunho';
  startDate: string;
  endDate?: string;
  prospectsCount: number;
  progress: number;
  cadence: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  channel: 'WhatsApp' | 'SMS' | 'E-mail' | 'Instagram';
  subject?: string; // Only for Email
  content: string;
  status: 'active' | 'inactive';
  lastModified: string;
}

export enum Page {
  OVERVIEW = 'overview',
  STRATEGY = 'strategy',
  BOT_FARM = 'bot_farm',
  PRICING = 'pricing',
  LIVE_INVESTIGATION = 'live_investigation',
  LIVE_CONVERSATIONS = 'live_conversations', 
  REPORTS = 'reports',
  AI_SETTINGS = 'ai_settings',
  AGENT_CONFIG = 'agent_config',
  CRAWLER_CONFIG = 'crawler_config',
  COST_CONTROL = 'cost_control',
  LLM_JUDGE = 'llm_judge',
  HUMAN_INTERVENTION = 'human_intervention',
  PROSPECTS = 'prospects',
  PROSPECTION_JOBS = 'prospection_jobs',
  JOB_MONITORING = 'job_monitoring',
  SIM_MANAGEMENT = 'sim_management',
  MESSAGE_TEMPLATES = 'message_templates',
  PROMPTS = 'prompts', // New Page
  HISTORY = 'history',
  COMPETITIVE_DATA = 'competitive_data',
  HUMAN_CHAT_CONSOLE = 'human_chat_console'
}