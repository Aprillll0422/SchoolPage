import type { PromotionContent } from "@/types";
import { generateSchoolPrompt, parseAiResponse, generateMockContent } from "./promptTemplate";

export interface AIConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  useMock: boolean;
}

const DEFAULT_CONFIG: AIConfig = {
  apiKey: "",
  baseUrl: "https://api.openai.com/v1",
  model: "gpt-3.5-turbo",
  useMock: true,
};

const CONFIG_KEY = "school-ai-config";

export function saveAIConfig(config: AIConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function loadAIConfig(): AIConfig {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_CONFIG;
}

export async function callAI(
  schoolName: string,
  config: AIConfig
): Promise<PromotionContent> {
  if (config.useMock || !config.apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return generateMockContent(schoolName);
  }

  const prompt = generateSchoolPrompt(schoolName);

  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: "system",
            content: "你是一位专业的学校宣传文案撰写专家，擅长撰写高质量的学校宣传文案。",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API请求失败: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("API返回内容为空");
    }

    const parsed = parseAiResponse(content);
    if (!parsed) {
      throw new Error("无法解析AI返回的内容");
    }

    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("AI调用失败，请检查网络连接和API配置");
  }
}
