import { BotTask, CompetitorData, Conversation, MapDataPoint, SimCard, StrategicGap, Agent } from "./types";

export const MOCK_SIM_CARDS: SimCard[] = [
  { id: '1', phoneNumber: '+55 11 99999-1001', carrier: 'Vivo', status: 'active', conversationsCount: 124, lastUsed: '2 min atrás', healthScore: 98 },
  { id: '2', phoneNumber: '+55 11 99999-1002', carrier: 'Tim', status: 'active', conversationsCount: 89, lastUsed: '5 min atrás', healthScore: 95 },
  { id: '3', phoneNumber: '+55 21 98888-2001', carrier: 'Claro', status: 'risk', conversationsCount: 450, lastUsed: '10 min atrás', healthScore: 45 },
  { id: '4', phoneNumber: '+55 31 97777-3001', carrier: 'Vivo', status: 'blocked', conversationsCount: 12, lastUsed: '1 dia atrás', healthScore: 0 },
  { id: '5', phoneNumber: '+55 41 96666-4001', carrier: 'Tim', status: 'cooldown', conversationsCount: 200, lastUsed: '4h atrás', healthScore: 70 },
  { id: '6', phoneNumber: '+55 11 99999-1005', carrier: 'Vivo', status: 'active', conversationsCount: 45, lastUsed: 'Agora', healthScore: 100 },
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
  { id: '1', name: 'LaserFast', isNetwork: true, unitCount: 150, region: 'SP - Capital', service: 'Axila + Virilha', ourPrice: 89.90, competitorPrice: 79.90, lastUpdate: 'Bot WhatsApp - 10 min atrás', history: [85, 85, 80, 80, 79.90, 79.90] },
  { id: '2', name: 'MaisLaser', isNetwork: true, unitCount: 200, region: 'RJ - Capital', service: 'Pernas Completas', ourPrice: 150.00, competitorPrice: 145.00, lastUpdate: 'Web Crawler - 1h atrás', history: [145, 145, 145, 145, 145, 145] },
  { id: '3', name: 'Vialaser', isNetwork: true, unitCount: 120, region: 'MG - Belo Horizonte', service: 'Barba Completa', ourPrice: 110.00, competitorPrice: 95.00, lastUpdate: 'Bot Voice - 20 min atrás', history: [100, 100, 95, 95, 95, 95] },
  { id: '4', name: 'Estética da Ana (Individual)', isNetwork: false, unitCount: 1, region: 'RS - Porto Alegre', service: 'Buço', ourPrice: 35.00, competitorPrice: 25.00, lastUpdate: 'Descartado', history: [] },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: '1', competitorName: 'LaserFast - Unidade Moema', botPersona: 'Julia (Interessada em Axila)', lastMessage: 'Vocês cobrem orçamento?', timestamp: '10:42', status: 'investigating', channel: 'whatsapp', hasAudio: false },
  { id: '2', competitorName: 'MaisLaser - Barra', botPersona: 'Pedro (Interessado em Barba)', lastMessage: 'Áudio recebido (Transcrevendo...)', timestamp: '10:40', status: 'investigating', channel: 'voice', hasAudio: true },
  { id: '3', competitorName: 'GiOlaser - Centro', botPersona: 'Mariana (Noiva)', lastMessage: 'Obrigada, vou pensar.', timestamp: '10:38', status: 'completed', channel: 'instagram', hasAudio: false },
];

export const MOCK_AGENTS: Agent[] = [
  { id: '1', name: 'Julia Martins', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', age: 26, phone: '+55 11 99999-0001', status: 'livre', conversationsToday: 34, successRate: 28, lastActivity: '2 min atrás' },
  { id: '2', name: 'Roberto Alencar', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', age: 31, phone: '+55 11 99999-0002', status: 'em_conversa', conversationsToday: 42, successRate: 35, lastActivity: 'Agora' },
  { id: '3', name: 'Carla Diaz', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', age: 24, phone: '+55 11 99999-0003', status: 'indisponivel', conversationsToday: 15, successRate: 12, lastActivity: '1h atrás' },
];

export const MAP_DATA: MapDataPoint[] = [
  { id: '1', city: 'São Paulo', lat: -23.5505, lng: -46.6333, dominance: 0.9, competitorCount: 15, opportunityLevel: 'Low' },
  { id: '2', city: 'Porto Alegre', lat: -30.0346, lng: -51.2177, dominance: 0.3, competitorCount: 8, opportunityLevel: 'High' },
  { id: '3', city: 'Fortaleza', lat: -3.7172, lng: -38.5434, dominance: 0.2, competitorCount: 12, opportunityLevel: 'High' },
  { id: '4', city: 'Curitiba', lat: -25.4284, lng: -49.2733, dominance: 0.6, competitorCount: 10, opportunityLevel: 'Medium' },
  { id: '5', city: 'Salvador', lat: -12.9777, lng: -38.5016, dominance: 0.5, competitorCount: 9, opportunityLevel: 'Medium' },
];

export const MARKET_SHARE_DATA = [
  { month: 'Jan', share: 35, competitorAvg: 30 },
  { month: 'Fev', share: 38, competitorAvg: 29 },
  { month: 'Mar', share: 37, competitorAvg: 31 },
  { month: 'Abr', share: 42, competitorAvg: 28 },
  { month: 'Mai', share: 45, competitorAvg: 27 },
  { month: 'Jun', share: 48, competitorAvg: 26 },
];