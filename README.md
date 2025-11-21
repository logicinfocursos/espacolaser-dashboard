# Projeto Olho Vivo
[github](https://github.com/logicinfocursos/espacolaser-dashboard.git)
<br/>
[vercel em execução](https://espacolaser-dashboard.vercel.app/)
<br/>
[projeto no google ai studio](https://aistudio.google.com/apps/drive/1s69XJnCSE9PhX-GH0FClSUHnraLaYL9X?showPreview=true&showAssistant=true)
## Descrição do Projeto
**essa é a versão do google ai studio**
**Olho Vivo** é uma plataforma avançada de inteligência competitiva e automação de vendas voltada para o setor de estética e laser. O sistema integra bots investigativos, análise de preços da concorrência, gestão de prospecção automatizada e monitoramento em tempo real de operações comerciais.

A plataforma utiliza tecnologias de IA (LLMs como Gemini, OpenAI) para conduzir conversas autônomas, coletar dados de mercado através de web crawlers e agentes em WhatsApp, e fornecer insights estratégicos para tomada de decisão.

## Funcionalidades por Página

### 📊 Overview (Visão Geral)
- **Dashboard principal** com métricas consolidadas do negócio
- **Mapa geográfico interativo** mostrando performance por região
- **Alertas em tempo real** de conversas, erros e oportunidades
- **Gráficos de tendências** (preços, interações, conversões)
- **Fila de agentes** com status e disponibilidade
- **Integração com Gemini AI** para geração de insights contextuais do dashboard
- Indicadores de performance: taxa de resposta, conversões, ROI

### 👥 Agents (Agentes Ativos)
- **Listagem de agentes humanos** com personas e status (livre, em conversa, ocupado)
- **Métricas individuais** por agente: conversas ativas, taxa de conversão, tempo médio
- **Avatares e dados pessoais** (nome, idade, telefone)
- Monitoramento visual do status com badges coloridos

### 💬 LiveChat (Investigações em Tempo Real)
- **Grid 3x3 de bots ativos** conduzindo investigações simultâneas
- **Visualização de conversas em andamento** com clientes/concorrentes
- **Análise de sentimento** em tempo real (positivo, negativo, promocional)
- **Detector de intenção** de compra e cross-sell
- **Histórico de mensagens** com timeline detalhada
- **Intervenção humana** - possibilidade de assumir conversas automatizadas
- Reprodução de TTS (Text-to-Speech) de mensagens

### 🎯 Prospects (Gestão de Prospectos)
- **Cadastro manual** de empresas e contatos
- **Importação via banco de dados** com configuração de conexões
- **Upload de arquivos** (CSV, Excel) para importação em massa
- **Filtros avançados** por nome, UF, canal preferencial
- **Tabela completa** com dados de prospects: empresa, endereço, cidade, telefone, email, status
- Gerenciamento de preferências de canal (WhatsApp, SMS, Email)

### 📋 ProspectionJobs (Jobs de Prospecção)
- **Criação e gerenciamento de campanhas** de prospecção automatizadas
- **Configuração de cadência** (intervalo entre mensagens)
- **Associação de templates** de mensagem aos jobs
- **Controle de status** (Ativo, Pausado, Finalizado)
- **Métricas de progresso**: total de prospects, progresso percentual
- **Definição de período** (data início/fim)
- Gestão de canais de comunicação por job

### 📜 ConversationHistory (Histórico de Conversas)
- **Busca e filtro** de conversas finalizadas
- **Status de conversas**: Finalizada, Transferida, Erro, Em Andamento
- **Visualização detalhada** com timeline de mensagens
- **Identificação de agentes**: IA vs. Humano
- **Resumo automático** de cada conversa
- **Detecção de eventos**: transferências, intervenções, falhas
- Sistema de paginação para grandes volumes de dados

### 📈 Reports (Relatórios & Auditoria)
- **Geração de relatórios consolidados** de operações
- **Exportação de dados** em formatos diversos
- **Métricas operacionais**: relatórios gerados, dados processados
- **Logs de sistema** e auditoria
- Relatórios de compliance e segurança (LGPD)
- Dashboard de KPIs relacionados a armazenamento e processamento

### 🎯 Strategy (Estratégia & Gaps de Mercado)
- **Identificação de gaps competitivos** por região
- **Análise de participação de mercado** (market share)
- **Comparativo de preços** vs. concorrência principal
- **Potencial de receita** em oportunidades não exploradas
- **Mapeamento estratégico** de onde não somos líderes
- Sugestões de ações para captura de mercado

### 🤖 BotFarm (Gestão Operacional & Coleta)
- **Gerenciamento de frota de SIM cards** (status, operadora, último uso)
- **Configuração de agentes automatizados** e scripts
- **Web crawlers** para coleta de dados de sites concorrentes
- **Console de logs operacionais** em tempo real
- **Controle de operações** (iniciar, pausar, parar)
- Monitoramento de infraestrutura de bots

### 📱 SimManagement (Gestão de SIM Cards)
- **Cadastro de chips** com DDD, número, operadora
- **Status de ativação**: ativo, bloqueado, pausado
- **Associação a canais** (WhatsApp, SMS)
- **Filtros por DDD, operadora e status**
- **Notas e observações** por chip
- Histórico de uso (último acesso)

### 🔍 CompetitiveData (Dados Competitivos)
- **Base de preços da concorrência** (serviço, valor, região)
- **Portfólio de serviços** dos concorrentes
- **Promoções ativas** (validade, canal, localização)
- **Horários de funcionamento** por unidade
- **Análise comparativa** Espaço Laser vs. Concorrente
- **Tag cloud** de serviços mais oferecidos no mercado
- Detecção de tendências de preço

### 📝 MessageTemplates (Templates de Mensagem)
- **Criação e edição** de templates para diferentes canais
- **Biblioteca de mensagens** reutilizáveis
- **Suporte multi-canal**: WhatsApp, SMS, Email, Instagram
- **Status ativo/inativo** por template
- **Variáveis dinâmicas** (ex: {{nome}}, {{empresa}})
- Histórico de última modificação

### 🙋 HumanIntervention (Intervenções Humanas)
- **Registro de todas as intervenções manuais** em conversas automatizadas
- **Auditoria completa**: quem interveio, quando, em qual conversa
- **Motivos da intervenção** (negociação complexa, cliente VIP, erro de bot)
- **Filtros por usuário** e agente original
- **Visualização da conversa** antes e depois da intervenção
- Estatísticas de frequência de intervenções

### 💰 CostControl (Controle de Custos)
- **Monitoramento de gastos** com APIs de LLMs (OpenAI, Gemini)
- **Limite mensal configurável** e alertas de threshold
- **Métricas detalhadas**: custo total, custo por token, custo por modelo
- **Histórico de consumo** com gráficos temporais
- **Logs de uso por agente/job**
- Sistema de alertas quando limite é atingido/excedido

### ⚙️ AISettings (Configurações de IA)
- **Cadastro de LLMs** disponíveis (OpenAI, Gemini, Anthropic)
- **Gerenciamento de API Keys**
- **Configuração de parâmetros**: temperature, max_tokens, top_p
- **Perfis de agentes**: propósito, prompt system, modelo atribuído
- **Vinculação Agente ↔ LLM**
- Ativação/desativação de modelos

### 🔧 AgentConfig (Configuração de Agentes)
- **Criação de perfis de agente** (Investigador, Vendedor, Analista)
- **Editor de prompts system** com templates pré-definidos
- **Ajuste fino de parâmetros** de IA (temperatura, criatividade)
- **Testes de prompt** com preview de respostas
- **Biblioteca de templates** categorizados por função
- Associação de agente a jobs específicos

### ⚖️ LLMJudge (LLM como Juiz)
- **Supervisão autônoma** de qualidade das conversas
- **Detecção de desvios** (respostas inadequadas, erros, fuga de contexto)
- **Intervenção automática** quando necessário
- **Logs de ações do Judge**: o que foi detectado, ação tomada
- **Configuração de sensibilidade** e regras de validação
- Métricas de eficácia do Judge

### 📊 JobMonitoring (Monitoramento de Jobs)
- **Dashboard de jobs ativos** em tempo real
- **Status de execução**: running, paused, completed
- **Progresso visual**: prospects contatados vs. total
- **Lista de conversas ativas** por job
- **Controle de operações**: pausar, retomar, encerrar jobs
- **Métricas de performance**: mensagens enviadas, taxa de resposta, bloqueios
- Atualização automática de dados

### 💵 Pricing (Inteligência de Preços)
- **Comparativo granular** de preços por serviço e região
- **Identificação de fontes**: web crawler, OCR Instagram, chatbot
- **Análise de competitividade**: onde estamos mais caros/baratos
- **Alertas de mudanças** de preço da concorrência
- **Mini gráficos de tendência** por item
- Filtros por serviço, região e concorrente

---

## Tecnologias Utilizadas

- **React 19** + **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS** (Estilização)
- **Recharts** (Gráficos e visualizações)
- **Leaflet / React-Leaflet** (Mapas interativos)
- **Lucide React** (Ícones)
- **Google Gemini AI** (Geração de insights)

## Estrutura do Projeto

```
├── components/          # Componentes reutilizáveis (UI, Sidebar, GlobalChat)
├── pages/              # Páginas da aplicação (19 páginas funcionais)
├── services/           # Integração com APIs externas (Gemini)
├── constants.ts        # Dados mock e configurações
├── types.ts           # Definições TypeScript
└── App.tsx            # Roteamento principal
```

## Como Executar

```bash
# Instalar dependências
yarn install

# Modo desenvolvimento
yarn dev

# Build para produção
yarn build

# Preview do build
yarn preview
```

## Roadmap

- [ ] Integração real com APIs de WhatsApp Business
- [ ] Backend completo para persistência de dados
- [ ] Sistema de autenticação e permissões
- [ ] Integração com CRM (Salesforce, HubSpot)
- [ ] Expansão de crawlers (Instagram, Facebook, Google My Business)
- [ ] Dashboard mobile responsivo
- [ ] Modo offline com sincronização

---

**Desenvolvido para revolucionar a inteligência de mercado no setor de estética e laser.**
