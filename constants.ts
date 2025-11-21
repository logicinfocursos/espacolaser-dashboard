

import { BotTask, CompetitorData, Conversation, MapDataPoint, SimCard, StrategicGap, Agent, ScriptTemplate, CrawlerJob, SystemLog, ChatMessage, Report, UserProfile, Alert, AgentQueueItem, LLMConfig, AgentProfile, CostLog, JudgeConfig, JudgeIntervention, HumanInterventionLog, Prospect, ProspectionJob } from "./types";

export const CURRENT_USER: UserProfile = {
  name: 'Admin Silva',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
};

export const MOCK_SIM_CARDS: SimCard[] = [
  { id: '1', phoneNumber: '+55 11 99999-1001', carrier: 'Vivo', status: 'active', conversationsCount: 124, lastUsed: '2 min atrás', healthScore: 98, provider: 'physical' },
  { id: '2', phoneNumber: '+55 11 99999-1002', carrier: 'Tim', status: 'active', conversationsCount: 89, lastUsed: '5 min atrás', healthScore: 95, provider: 'physical' },
  { id: '3', phoneNumber: '+55 21 98888-2001', carrier: 'Claro', status: 'risk', conversationsCount: 450, lastUsed: '10 min atrás', healthScore: 45, provider: 'twilio' },
  { id: '4', phoneNumber: '+55 31 97777-3001', carrier: 'Vivo', status: 'blocked', conversationsCount: 12, lastUsed: '1 dia atrás', healthScore: 0, provider: 'z-api' },
  { id: '5', phoneNumber: '+55 41 96666-4001', carrier: 'Tim', status: 'cooldown', conversationsCount: 200, lastUsed: '4h atrás', healthScore: 70, provider: 'physical' },
  { id: '6', phoneNumber: '+55 11 99999-1005', carrier: 'Vivo', status: 'active', conversationsCount: 45, lastUsed: 'Agora', healthScore: 100, provider: 'physical' },
];

export const MOCK_SCRIPTS: ScriptTemplate[] = [
  { id: '1', title: 'Abordagem Inicial (Preço)', channel: 'whatsapp', content: 'Olá, tudo bem? Vi o anúncio de vocês no Instagram. Gostaria de saber o valor do pacote para axila e virilha.', tags: ['Preço', 'Entrada'], active: true },
  { id: '2', title: 'Sondagem de Promoções', channel: 'whatsapp', content: 'Oi! Vocês cobrem oferta da concorrência? Tenho um orçamento aqui mas prefiro a localização de vocês.', tags: ['Negociação', 'Promo'], active: true },
  { id: '3', title: 'Verificação Horário (Voz)', channel: 'voice', content: '(Script Falado) "Alô, bom dia. Eu trabalho aí perto, queria saber até que horas vocês atendem hoje pra eu passar aí."', tags: ['Horário', 'Voz'], active: false },
];

export const MOCK_CRAWLER_JOBS: CrawlerJob[] = [
  { id: '1', targetName: 'LaserFast Oficial', targetUrl: 'instagram.com/laserfast', type: 'instagram_story_ocr', status: 'processing', itemsFound: 3, lastRun: 'Rodando...', thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80' },
  { id: '2', targetName: 'MaisLaser Site', targetUrl: 'maislaser.com.br/precos', type: 'web_scraping', status: 'completed', itemsFound: 15, lastRun: '10 min atrás' },
  { id: '3', targetName: 'Vialaser Promo', targetUrl: 'vialaser.com.br', type: 'web_scraping', status: 'failed', itemsFound: 0, lastRun: '1h atrás' },
];

export const MOCK_LOGS: SystemLog[] = [
  { id: '1', level: 'error', message: 'SIM Card +55 31 97777-3001 detectado como BLOQUEADO pelo WhatsApp Business API.', module: 'SIM_MANAGER', timestamp: '10:42:15' },
  { id: '2', level: 'info', message: 'Crawler iniciou extração em "instagram.com/laserfast".', module: 'CRAWLER', timestamp: '10:40:00' },
  { id: '3', level: 'warning', message: 'Agente "Julia" recebeu áudio longo não transcrito. Intervenção humana sugerida.', module: 'AGENT_CORE', timestamp: '10:38:22' },
  { id: '4', level: 'info', message: 'Usuário "Analista_01" exportou relatório de preços (Regional SP).', module: 'AUTH', timestamp: '10:35:00' },
];

export const MOCK_TASKS: BotTask[] = [
  { id: '1', targetName: 'LaserFast - Jardins', channel: 'whatsapp', status: 'running', objective: 'price_check', cost: 0.05, timestamp: 'Agora' },
  { id: '2', targetName: 'MaisLaser - Copacabana', channel: 'whatsapp', status: 'running', objective: 'promo_discovery', cost: 0.08, timestamp: 'Agora' },
  { id: '3', targetName: 'Vialaser - Site Oficial', channel: 'web_crawler', status: 'completed', objective: 'price_check', cost: 0.00, timestamp: '5 min atrás' },
  { id: '4', targetName: 'GiOlaser - BH', channel: 'voice_call', status: 'failed', objective: 'hours_check', cost: 0.15, timestamp: '10 min atrás' },
];

export const MOCK_STRATEGIC_GAPS: StrategicGap[] = [
  { id: '1', region: 'Sul', city: 'Porto Alegre', marketPotential: 'High', currentShare: 0.35, primaryCompetitor: 'Vialaser', lossReason: 'Price', aiSuggestion: 'Concorrente com preço 15% menor em pacotes de 10 sessões. Sugerimos campanha relâmpago regional.' },
  { id: '2', region: 'Nordeste', city: 'Fortaleza', marketPotential: 'High', currentShare: 0.20, primaryCompetitor: 'Rede Local X', lossReason: 'Service_Gap', aiSuggestion: 'Concorrente oferece "Pós-Laser Hidratante" gratuito. Avaliar inclusão de serviço similar.' },
  { id: '3', region: 'Sudeste', city: 'Campinas', marketPotential: 'Medium', currentShare: 0.45, primaryCompetitor: 'LaserFast', lossReason: 'Brand_Presence', aiSuggestion: 'Alta saturação de ads do concorrente no Instagram. Aumentar bid em keywords locais.' },
];

export const MOCK_PRICING: CompetitorData[] = [
  { id: '1', name: 'LaserFast', isNetwork: true, unitCount: 150, region: 'SP - Capital', service: 'Axila + Virilha', ourPrice: 89.90, competitorPrice: 79.90, lastUpdate: '10 min atrás', sourceType: 'bot_chat', history: [85, 85, 80, 80, 79.90, 79.90] },
  { id: '2', name: 'MaisLaser', isNetwork: true, unitCount: 200, region: 'RJ - Capital', service: 'Pernas Completas', ourPrice: 150.00, competitorPrice: 145.00, lastUpdate: '1h atrás', sourceType: 'web_crawler', history: [145, 145, 145, 145, 145, 145] },
  { id: '3', name: 'Vialaser', isNetwork: true, unitCount: 120, region: 'MG - Belo Horizonte', service: 'Barba Completa', ourPrice: 110.00, competitorPrice: 95.00, lastUpdate: '20 min atrás', sourceType: 'bot_chat', history: [100, 100, 95, 95, 95, 95, 95] },
  { id: '4', name: 'Estética da Ana (Individual)', isNetwork: false, unitCount: 1, region: 'RS - Porto Alegre', service: 'Buço', ourPrice: 35.00, competitorPrice: 25.00, lastUpdate: 'Ontem', sourceType: 'ocr_instagram', history: [] },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: '1', competitorName: 'LaserFast - Unidade Moema', botPersona: 'Julia (Interessada em Axila)', lastMessage: 'Vocês cobrem orçamento?', timestamp: '10:42', status: 'investigating', channel: 'whatsapp', hasAudio: false },
  { id: '2', competitorName: 'MaisLaser - Barra', botPersona: 'Pedro (Interessado em Barba)', lastMessage: 'Áudio recebido (Transcrevendo...)', timestamp: '10:40', status: 'investigating', channel: 'voice', hasAudio: true },
  { id: '3', competitorName: 'GiOlaser - Centro', botPersona: 'Mariana (Noiva)', lastMessage: 'Obrigada, vou pensar.', timestamp: '10:38', status: 'completed', channel: 'instagram', hasAudio: false },
];

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
  { 
    id: '1', sender: 'bot', type: 'text', timestamp: '09:41', 
    content: 'Olá, tudo bem? Vi no instagram de vocês uma promoção de depilação a laser. Poderiam me passar a tabela de preços?',
    sentiment: 'neutral'
  },
  { 
    id: '2', sender: 'competitor', type: 'text', timestamp: '09:42', 
    content: 'Bom dia! Tudo ótimo. A promoção é válida para pacotes fechados. Qual região você tem interesse?',
    sentiment: 'positive',
    entities: ['pacotes fechados']
  },
  { 
    id: '3', sender: 'bot', type: 'text', timestamp: '09:42', 
    content: 'Seria axila e virilha completa.',
    sentiment: 'neutral'
  },
  { 
    id: '4', sender: 'competitor', type: 'audio', timestamp: '09:44', 
    content: '(Áudio)',
    audioUrl: 'mock-audio.mp3',
    transcription: 'Então, para virilha e axila no pacote com 10 sessões a gente consegue fazer por 12x de 79,90. Se fechar hoje ganha o buço de brinde.',
    sentiment: 'promotional',
    entities: ['10 sessões', 'R$ 79,90', 'buço (brinde)']
  },
  { 
    id: '5', sender: 'competitor', type: 'text', timestamp: '09:45', 
    content: 'O que acha desse valor? Conseguimos segurar só até as 14h.',
    sentiment: 'promotional',
    entities: ['14h']
  }
];

export const MOCK_REPORTS: Report[] = [
  { id: '1', title: 'Relatório Semanal de Preços (Brasil)', type: 'weekly_market', date: '02/03/2024', status: 'ready', format: 'PDF', size: '2.4 MB' },
  { id: '2', title: 'Alerta de Queda de Preço - Sul', type: 'price_alert', date: '01/03/2024', status: 'ready', format: 'XLSX', size: '450 KB' },
  { id: '3', title: 'Cobertura de Rede - Novas Unidades', type: 'coverage', date: '28/02/2024', status: 'ready', format: 'PDF', size: '1.8 MB' },
];

export const MOCK_AGENTS: Agent[] = [
  { id: '1', name: 'Julia Martins', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', age: 26, phone: '+55 11 99999-0001', status: 'livre', conversationsToday: 34, successRate: 28, lastActivity: '2 min atrás', assignedScriptId: '1' },
  { id: '2', name: 'Roberto Alencar', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', age: 31, phone: '+55 11 99999-0002', status: 'em_conversa', conversationsToday: 42, successRate: 35, lastActivity: 'Agora', assignedScriptId: '1' },
  { id: '3', name: 'Carla Diaz', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', age: 24, phone: '+55 11 99999-0003', status: 'pausado', conversationsToday: 15, successRate: 12, lastActivity: '1h atrás', assignedScriptId: '2' },
];

export const MAP_DATA: MapDataPoint[] = [
  // Espaço Laser Units (Blue)
  { id: '1', city: 'São Paulo', lat: -23.5505, lng: -46.6333, type: 'own_unit', name: 'Espaço Laser - Paulista', details: 'Unidade Principal' },
  { id: '2', city: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, type: 'own_unit', name: 'Espaço Laser - Leblon', details: 'Alta Performance' },
  { id: '3', city: 'Brasília', lat: -15.7801, lng: -47.9292, type: 'own_unit', name: 'Espaço Laser - Asa Norte', details: 'Flagship' },
  
  // Competitors (Red)
  { id: '4', city: 'Campinas', lat: -22.9099, lng: -47.0626, type: 'competitor', name: 'LaserFast', details: 'Preço Agressivo' },
  { id: '5', city: 'Curitiba', lat: -25.4284, lng: -49.2733, type: 'competitor', name: 'Vialaser', details: 'Promoção Vigente' },
  { id: '6', city: 'Salvador', lat: -12.9777, lng: -38.5016, type: 'competitor', name: 'MaisLaser', details: 'Expansão Recente' },

  // Opportunities (Yellow Zones - Generic center points)
  { id: '7', city: 'Porto Alegre', lat: -30.0346, lng: -51.2177, type: 'opportunity_zone', name: 'Zona Sul POA', details: 'Baixa Cobertura EL' },
  { id: '8', city: 'Fortaleza', lat: -3.7172, lng: -38.5434, type: 'opportunity_zone', name: 'Região Aldeota', details: 'Alta Demanda' },
];

export const MARKET_SHARE_DATA = [
  { month: 'Jan', share: 35, competitorAvg: 30 },
  { month: 'Fev', share: 38, competitorAvg: 29 },
  { month: 'Mar', share: 37, competitorAvg: 31 },
  { month: 'Abr', share: 42, competitorAvg: 28 },
  { month: 'Mai', share: 45, competitorAvg: 27 },
  { month: 'Jun', share: 48, competitorAvg: 26 },
];

export const MOCK_ALERTS: Alert[] = [
  { id: '1', type: 'critical', message: '3 SIMs bloqueados nas últimas 2h (WhatsApp API)', time: '10:42' },
  { id: '2', type: 'warning', message: 'LaserFast reduziu preço em 25% em Curitiba (Campanha Relâmpago)', time: '10:15' },
  { id: '3', type: 'info', message: 'Nova rede "SkinBeauty" identificada em Goiânia com 2 unidades.', time: '09:30' },
  { id: '4', type: 'warning', message: 'Crawler falhou em extrair preços do site MaisLaser (Mudaça de Layout).', time: '09:00' },
  { id: '5', type: 'info', message: 'Meta de interações diária atingida (1.200 conversas).', time: 'Ontem' },
];

export const MOCK_AGENT_QUEUE: AgentQueueItem[] = [
  { id: '1', agentId: '#829', agentName: 'Julia (Bot)', channel: 'WhatsApp', status: 'Enviando', lastAction: 'Pergunta Preço', time: 'Agora' },
  { id: '2', agentId: '#102', agentName: 'Pedro (Bot)', channel: 'WhatsApp', status: 'Aguardando', lastAction: 'Áudio Recebido', time: '2s' },
  { id: '3', agentId: '#334', agentName: 'Mariana (Bot)', channel: 'Instagram', status: 'Analisando', lastAction: 'OCR Story', time: '15s' },
  { id: '4', agentId: '#991', agentName: 'Roberto (Bot)', channel: 'Web', status: 'Enviando', lastAction: 'Crawler Form', time: '45s' },
  { id: '5', agentId: '#772', agentName: 'Ana (Bot)', channel: 'WhatsApp', status: 'Enviando', lastAction: 'Negociação', time: '1m' },
];

export const MOCK_PRICE_COMPARISON = [
  { service: 'Axila', elPrice: 89, compPrice: 79 },
  { service: 'Virilha', elPrice: 120, compPrice: 110 },
  { service: 'Perna', elPrice: 250, compPrice: 260 },
  { service: 'Buço', elPrice: 45, compPrice: 35 },
  { service: 'Barba', elPrice: 110, compPrice: 95 },
];

export const MOCK_INTERACTION_TREND = [
  { day: 'Seg', count: 1100, goal: 1000 },
  { day: 'Ter', count: 1250, goal: 1000 },
  { day: 'Qua', count: 980, goal: 1000 },
  { day: 'Qui', count: 1300, goal: 1000 },
  { day: 'Sex', count: 1240, goal: 1000 },
  { day: 'Sáb', count: 800, goal: 800 },
  { day: 'Dom', count: 400, goal: 400 },
];

export const MOCK_LLMS: LLMConfig[] = [
  { id: '1', name: 'GPT-4 Turbo Central', provider: 'openai', model: 'gpt-4-turbo-preview', apiKey: 'sk-proj-...1829', isActive: true },
  { id: '2', name: 'Gemini Pro 1.5', provider: 'google', model: 'gemini-1.5-pro', apiKey: 'AIzaSy...9121', isActive: true },
  { id: '3', name: 'Ollama Local (Mistral)', provider: 'ollama', model: 'mistral:latest', apiKey: '', baseUrl: 'http://localhost:11434', isActive: false },
];

export const MOCK_AGENT_PROFILES: AgentProfile[] = [
  { id: '1', name: 'Investigador WhatsApp (Julia)', role: 'investigator_whatsapp', llmId: '1', systemPrompt: 'Você é Julia, uma cliente interessada em depilação...', isActive: true },
  { id: '2', name: 'Crawler Web Analyzer', role: 'crawler_web', llmId: '2', systemPrompt: 'Extraia nomes de serviços e preços do HTML fornecido...', isActive: true },
  { id: '3', name: 'Analista de Sentimento', role: 'manager', llmId: '1', systemPrompt: 'Analise o tom da conversa e classifique como Positivo/Negativo...', isActive: true },
];

export const MOCK_COST_HISTORY = [
  { date: '01/03', cost: 12.50 },
  { date: '02/03', cost: 15.80 },
  { date: '03/03', cost: 11.20 },
  { date: '04/03', cost: 18.90 },
  { date: '05/03', cost: 22.40 },
  { date: '06/03', cost: 14.60 },
  { date: '07/03', cost: 16.10 },
  { date: '08/03', cost: 9.50 },
  { date: '09/03', cost: 8.20 },
  { date: '10/03', cost: 19.80 },
];

export const MOCK_COST_LOGS: CostLog[] = [
  { id: '1', timestamp: '10:42:05', agentName: 'Julia (WhatsApp)', llmModel: 'gpt-4-turbo', inputTokens: 1240, outputTokens: 250, cost: 0.04, promptPreview: 'Você é Julia. Responda ao cliente que perguntou...', responsePreview: 'Claro! Para virilha completa temos uma promoção...' },
  { id: '2', timestamp: '10:41:12', agentName: 'Crawler Web', llmModel: 'gemini-1.5-pro', inputTokens: 5400, outputTokens: 120, cost: 0.01, promptPreview: 'Analise este HTML e extraia a tabela de preços...', responsePreview: 'JSON: { "service": "Axila", "price": 89.90 }' },
  { id: '3', timestamp: '10:39:55', agentName: 'Roberto (Auditoria)', llmModel: 'gpt-3.5-turbo', inputTokens: 800, outputTokens: 50, cost: 0.002, promptPreview: 'Classifique o sentimento desta conversa: ...', responsePreview: 'Sentimento: Positivo.' },
  { id: '4', timestamp: '10:38:10', agentName: 'Julia (WhatsApp)', llmModel: 'gpt-4-turbo', inputTokens: 1100, outputTokens: 180, cost: 0.035, promptPreview: 'O cliente recusou o preço. Negocie um desconto...', responsePreview: 'Entendo. E se conseguirmos 10% off no pix?' },
];

export const MOCK_JUDGE_CONFIG: JudgeConfig = {
  isActive: true,
  llmId: '1',
  systemPrompt: 'Você é um supervisor sênior de inteligência competitiva. Sua função é monitorar as conversas dos bots investigadores e garantir que eles não alucinem preços, não sejam rudes e sigam o script de negociação. Se detectar anomalia, intervenha imediatamente reescrevendo a resposta.'
};

export const MOCK_JUDGE_LOGS: JudgeIntervention[] = [
  {
    id: '1',
    timestamp: '10:45:12',
    agentName: 'Julia (WhatsApp)',
    competitorName: 'LaserFast - Jardins',
    reason: 'Alucinação de Preço',
    actionTaken: 'Reescrita',
    judgeAnalysis: 'O bot tentou inventar um preço da concorrência que não foi informado no contexto anterior ("R$ 50,00").',
    originalResponse: 'Entendi, então vocês fazem por R$ 50,00 a sessão?',
    modifiedResponse: 'Entendi, qual seria o valor da sessão avulsa nesse caso?'
  },
  {
    id: '2',
    timestamp: '10:30:05',
    agentName: 'Pedro (Instagram)',
    competitorName: 'MaisLaser - Barra',
    reason: 'Tom Agressivo',
    actionTaken: 'Intervenção',
    judgeAnalysis: 'O bot respondeu de forma seca e impaciente ao atendente humano.',
    originalResponse: 'Fala logo o preço.',
    modifiedResponse: 'Poderia me informar o preço, por gentileza? Estou com um pouco de pressa.'
  },
  {
    id: '3',
    timestamp: '09:15:00',
    agentName: 'Mariana (Crawler)',
    competitorName: 'Vialaser Site',
    reason: 'Loop Infinito',
    actionTaken: 'Bloqueio',
    judgeAnalysis: 'O bot entrou em loop perguntando a mesma coisa 3 vezes seguidas.',
    originalResponse: 'Qual o valor da axila?',
    modifiedResponse: 'N/A (Bot Pausado)'
  }
];

export const MOCK_HUMAN_INTERVENTIONS: HumanInterventionLog[] = [
  {
    id: '1',
    timestamp: '10:48:22',
    date: '2024-03-10',
    originalAgentName: 'Julia (WhatsApp)',
    competitorName: 'LaserFast - Moema',
    intervenerName: 'Admin Silva',
    actionTaken: 'Assumiu Chat',
    reason: 'Negociação Complexa',
    chatHistoryId: '1'
  },
  {
    id: '2',
    timestamp: '09:30:15',
    date: '2024-03-10',
    originalAgentName: 'Pedro (Bot)',
    competitorName: 'MaisLaser - Tatuapé',
    intervenerName: 'Analista Roberto',
    actionTaken: 'Pausou Bot',
    reason: 'Solicitação de CPF',
    chatHistoryId: '2'
  },
  {
    id: '3',
    timestamp: '14:15:00',
    date: '2024-03-09',
    originalAgentName: 'Mariana (Instagram)',
    competitorName: 'Vialaser - Recife',
    intervenerName: 'Admin Silva',
    actionTaken: 'Corrigiu Info',
    reason: 'Bot não entendeu áudio',
    chatHistoryId: '3'
  }
];

// Mock Intervention Conversation Detail
export const MOCK_INTERVENTION_CHAT: ChatMessage[] = [
  { 
    id: '1', sender: 'bot', type: 'text', timestamp: '10:45:00', 
    content: 'Olá, gostaria de saber o preço da depilação a laser na virilha.',
    sentiment: 'neutral'
  },
  { 
    id: '2', sender: 'competitor', type: 'text', timestamp: '10:45:30', 
    content: 'Olá! Temos um pacote promocional. Você já é cliente?',
    sentiment: 'positive'
  },
  { 
    id: '3', sender: 'bot', type: 'text', timestamp: '10:46:00', 
    content: 'Não sou cliente ainda. Qual o valor?',
    sentiment: 'neutral'
  },
  { 
    id: '4', sender: 'competitor', type: 'text', timestamp: '10:47:00', 
    content: 'Para novos clientes precisamos de um CPF para consultar a disponibilidade de desconto. Pode me passar?',
    sentiment: 'neutral'
  },
  // Intervention Marker
  {
    id: '5', sender: 'human_agent', type: 'intervention_marker', timestamp: '10:48:22',
    content: 'INTERVENÇÃO INICIADA POR ADMIN SILVA',
    sentiment: 'neutral'
  },
  { 
    id: '6', sender: 'human_agent', type: 'text', timestamp: '10:48:45', 
    content: 'Prefiro não passar meu CPF por enquanto, estou apenas pesquisando preços. Poderia me passar a tabela balcão mesmo?',
    sentiment: 'neutral'
  },
  { 
    id: '7', sender: 'competitor', type: 'text', timestamp: '10:49:30', 
    content: 'Entendo. Sem o CPF o valor é R$ 120,00 a sessão.',
    sentiment: 'negative'
  }
];

export const MOCK_PROSPECTS: Prospect[] = [
  { id: '1', companyName: 'Estética Bela Vista', address: 'Av. Paulista, 1000', city: 'São Paulo', uf: 'SP', whatsapp: '(11) 98888-1111', email: 'contato@belavista.com', preferredChannel: 'WhatsApp', status: 'Novo' },
  { id: '2', companyName: 'Laser Prime', address: 'Rua das Flores, 200', city: 'Campinas', uf: 'SP', whatsapp: '(19) 97777-2222', email: 'admin@laserprime.com', preferredChannel: 'E-mail', status: 'Qualificado' },
  { id: '3', companyName: 'Clínica Dermato', address: 'Av. Beira Mar, 500', city: 'Fortaleza', uf: 'CE', whatsapp: '(85) 99999-3333', email: 'atendimento@dermato.com', preferredChannel: 'WhatsApp', status: 'Importado' },
  { id: '4', companyName: 'Studio Zen', address: 'Rua XV de Novembro, 50', city: 'Curitiba', uf: 'PR', whatsapp: '(41) 98888-4444', email: 'contato@studiozen.com.br', preferredChannel: 'Telefone', status: 'Novo' },
  { id: '5', companyName: 'Corpo Dourado', address: 'Av. Boa Viagem, 1500', city: 'Recife', uf: 'PE', whatsapp: '(81) 97777-5555', email: 'gerencia@corpodourado.com', preferredChannel: 'WhatsApp', status: 'Novo' },
];

export const MOCK_JOBS: ProspectionJob[] = [
  { id: '1', name: 'Campanha Promoção de Verão', description: 'Disparo para base fria em SP com oferta de virilha.', channel: 'WhatsApp', status: 'Ativo', startDate: '10/03/2024 09:00', prospectsCount: 500, progress: 35, cadence: '60-120s' },
  { id: '2', name: 'Retargeting Leads Antigos', description: 'Tentar reativar leads de 2023 via SMS.', channel: 'SMS', status: 'Concluído', startDate: '05/03/2024 14:00', endDate: '05/03/2024 18:00', prospectsCount: 1200, progress: 100, cadence: '10s' },
  { id: '3', name: 'Pesquisa de Satisfação', description: 'Coleta de feedback pós-atendimento.', channel: 'E-mail', status: 'Pausado', startDate: '01/03/2024 08:00', prospectsCount: 300, progress: 12, cadence: '300s' },
];