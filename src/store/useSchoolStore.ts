import { create } from "zustand";
import type { SchoolData, PromotionContent } from "@/types";
import { generateMockContent } from "@/utils/promptTemplate";
import { generatePromotionHTML } from "@/utils/htmlGenerator";

interface SchoolState {
  school: SchoolData;
  content: PromotionContent | null;
  generatedHTML: string;
  isGenerating: boolean;
  setSchool: (data: Partial<SchoolData>) => void;
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

  setSchool: (data) =>
    set((state) => ({
      school: { ...state.school, ...data },
    })),

  generateContent: async () => {
    set({ isGenerating: true });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const { school } = get();
    const content = generateMockContent(school.name);
    const html = generatePromotionHTML(school, content);
    set({ content, generatedHTML: html, isGenerating: false });
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
    }),
}));
