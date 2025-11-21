<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Projeto Olho Vivo - Dashboard de Inteligência Competitiva

Sistema completo de inteligência competitiva e automação de conversas com WhatsApp, utilizando IA para prospecção, análise de concorrência e gerenciamento de atendimentos.

## 🚀 Como Executar o Projeto

**Pré-requisitos:** Node.js 16+ e Yarn (ou npm)

### Instalação

1. Clone o repositório e entre no diretório:
   ```bash
   cd espacolaser-dashboard
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Configure a chave da API do Gemini (opcional):
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione: `GEMINI_API_KEY=sua_chave_aqui`

4. Execute o projeto em modo desenvolvimento:
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

5. Acesse no navegador: `http://localhost:3867`

### Build para Produção

```bash
yarn build
# ou
npm run build
```

## 📋 Funcionalidades das Páginas

### 🏠 Overview
Painel principal com visão geral do sistema, incluindo:
- Estatísticas de conversas ativas e leads gerados
- Métricas de performance dos bots
- Resumo de custos e ROI
- Gráficos de tendências e análises

### 💰 Pricing
Gerenciamento de planos e precificação:
- Configuração de pacotes de serviços
- Tabelas de preços para diferentes regiões
- Comparativo de planos
- Calculadora de custos

### 📊 Competitive Data
Análise de dados da concorrência:
- Monitoramento de preços competidores
- Análise de estratégias de marketing
- Comparativos de ofertas e promoções
- Dashboard de inteligência de mercado

### 🤖 Bot Farm
Gerenciamento da fazenda de bots WhatsApp:
- Status e monitoramento de múltiplos números
- Distribuição de carga entre bots
- Saúde e disponibilidade dos dispositivos
- Configuração de turnos e disponibilidade

### 🎯 Strategy
Configuração de estratégias de abordagem:
- Definição de personas e segmentos
- Fluxos de conversação personalizados
- Regras de negócio e triggers
- A/B testing de mensagens

### 💬 Live Investigation
Monitoramento em tempo real de conversas:
- Visualização de chats ativos
- Análise de sentimento das conversas
- Detecção de oportunidades de venda
- Alertas de intervenção necessária

### 👥 Live Conversations
Console de conversas ao vivo:
- Lista de todas as conversas ativas
- Filtros por status, agente, bot
- Métricas de tempo de resposta
- Histórico de interações

### 📈 Reports
Relatórios e análises:
- Relatórios de performance
- Análise de conversão
- Métricas de engajamento
- Exportação de dados

### ⚙️ AI Settings
Configurações gerais de IA:
- Parâmetros do modelo de linguagem
- Temperatura e criatividade
- Limites de tokens
- Configurações de segurança

### 🔧 Agent Config
Configuração de agentes de IA:
- Personalidades e comportamentos
- Conhecimento base de cada agente
- Limitações e regras específicas
- Treinamento e fine-tuning

### 🕷️ Crawler Config
Configuração de crawlers para coleta de dados:
- Sites monitorados
- Frequência de scraping
- Dados a serem extraídos
- Alertas de mudanças

### 💳 Cost Control
Controle de custos da operação:
- Gastos com APIs (Gemini, WhatsApp)
- Custos por conversa
- Orçamento e alertas
- Projeções de gastos

### ⚖️ LLM Judge
Sistema de avaliação de qualidade:
- Análise de qualidade das respostas
- Scoring automático de conversas
- Identificação de melhorias
- Feedback loop para IA

### 🙋 Human Intervention
Gerenciamento de intervenções humanas:
- Filas de solicitações
- Transferência de conversas
- Casos que precisam de suporte
- SLA de atendimento

### 💻 Human Chat Console
Console para operadores humanos:
- Interface de atendimento manual
- Sugestões de respostas da IA
- Histórico do cliente
- Ferramentas de produtividade

### 👤 Prospects
Gerenciamento de prospects:
- Base de leads
- Segmentação e tags
- Score de oportunidade
- Funil de vendas

### 📋 Prospection Jobs
Campanhas de prospecção:
- Criação de jobs de prospecção
- Agendamento de envios
- Listas de contatos
- Performance de campanhas

### 📊 Job Monitoring
Monitoramento de jobs em execução:
- Status de campanhas ativas
- Progresso de envios
- Taxa de sucesso/erro
- Logs detalhados

### 📱 SIM Management
Gerenciamento de chips/números:
- Cadastro de SIM cards
- Vínculo com dispositivos
- Status de operadoras
- Controle de validade

### 💬 Message Templates
Templates de mensagens:
- Biblioteca de mensagens pré-aprovadas
- Variáveis dinâmicas
- Templates por segmento
- Histórico de versões

### 📝 Prompt Templates
Templates de prompts para IA:
- Biblioteca de prompts testados
- Prompts por contexto/objetivo
- Versionamento de prompts
- Testes A/B de efetividade

### 📜 Conversation History
Histórico completo de conversas:
- Busca e filtros avançados
- Replay de conversas
- Análise de padrões
- Exportação de dados

### 👥 Users
Gerenciamento de usuários do sistema:
- Cadastro de operadores
- Permissões e roles
- Atividade e logs
- Configurações de conta

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Recharts** - Gráficos e visualizações
- **Leaflet** - Mapas interativos
- **Google Gemini AI** - Inteligência artificial
- **React Leaflet** - Componentes de mapa

## 📁 Estrutura do Projeto

```
espacolaser-dashboard/
├── components/       # Componentes reutilizáveis
├── pages/           # Páginas da aplicação
├── services/        # Serviços e integrações
├── App.tsx          # Componente principal
├── types.ts         # Definições de tipos
├── constants.ts     # Constantes da aplicação
└── index.tsx        # Entry point
```

## 📝 Notas

- O sistema utiliza a API do Google Gemini para funcionalidades de IA
- Todas as páginas são renderizadas em um SPA (Single Page Application)
- O design é responsivo e otimizado para dark mode
- A aplicação mantém estado local, sem backend conectado nesta versão

---

View your app in AI Studio: https://ai.studio/apps/drive/1s69XJnCSE9PhX-GH0FClSUHnraLaYL9X
