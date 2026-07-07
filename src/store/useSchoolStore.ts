import { create } from "zustand";
import type { SchoolData, PromotionContent } from "@/types";
import { generatePromotionHTML } from "@/utils/htmlGenerator";
import { callAI, loadAIConfig, saveAIConfig, type AIConfig } from "@/utils/aiService";

interface SchoolState {
  school: SchoolData;
  content: PromotionContent | null;
  generatedHTML: string;
  isGenerating: boolean;
  error: string | null;
  aiConfig: AIConfig;
  setSchool: (data: Partial<SchoolData>) => void;
  setAIConfig: (config: Partial<AIConfig>) => void;
  generateContent: () => Promise<void>;
  generateHTML: () => string;
  reset: () => void;
}

const initialSchool: SchoolData = {
  name: "",
  logo: "",
  horizontalImage: "",
  verticalImage: "",
};

export const useSchoolStore = create<SchoolState>((set, get) => ({
  school: initialSchool,
  content: null,
  generatedHTML: "",
  isGenerating: false,
  error: null,
  aiConfig: loadAIConfig(),

  setSchool: (data) =>
    set((state) => ({
      school: { ...state.school, ...data },
    })),

  setAIConfig: (config) =>
    set((state) => {
      const newConfig = { ...state.aiConfig, ...config };
      saveAIConfig(newConfig);
      return { aiConfig: newConfig };
    }),

  generateContent: async () => {
    set({ isGenerating: true, error: null });
    try {
      const { school, aiConfig } = get();
      const content = await callAI(school.name, aiConfig);
      const html = generatePromotionHTML(school, content);
      set({ content, generatedHTML: html, isGenerating: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "生成失败",
        isGenerating: false,
      });
    }
  },

  generateHTML: () => {
    const { school, content } = get();
    if (!content) return "";
    return generatePromotionHTML(school, content);
  },

  reset: () =>
    set({
      school: initialSchool,
      content: null,
      generatedHTML: "",
      isGenerating: false,
      error: null,
    }),
}));
