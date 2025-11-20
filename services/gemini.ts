import { GoogleGenAI } from "@google/genai";

// Helper to safely get the key
const getApiKey = () => process.env.API_KEY;

export async function generateDashboardInsights(contextData: string): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "API Key não encontrada. Por favor, configure a variável de ambiente API_KEY para obter insights de IA.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é um analista de inteligência competitiva sênior da 'Projeto Olho Vivo' (Espaço Laser).
      Analise os seguintes dados do dashboard e forneça um resumo executivo de 3 pontos curtos e acionáveis para a diretoria.
      Foque em oportunidades de preço e performance de agentes.
      
      Dados:
      ${contextData}
      
      Responda em português, com formatação Markdown simples (bullet points).`,
    });

    return response.text || "Não foi possível gerar insights no momento.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Erro ao conectar com o serviço de Inteligência Artificial.";
  }
}