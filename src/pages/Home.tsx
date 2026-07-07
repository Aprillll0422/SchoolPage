import { useState } from "react";
import DemoSection from "@/components/DemoSection";
import FeaturesSection from "@/components/FeaturesSection";
import UploadForm from "@/components/UploadForm";
import PreviewModal from "@/components/PreviewModal";
import { useSchoolStore } from "@/store/useSchoolStore";

export default function Home() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { generateContent, isGenerating } = useSchoolStore();

  const handleGenerate = async () => {
    await generateContent();
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <DemoSection />
      <FeaturesSection />
      <UploadForm onGenerate={handleGenerate} />

      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-slate-900 font-bold text-lg">
              校
            </div>
            <span className="text-xl font-bold">学校宣传网页生成器</span>
          </div>
          <p className="text-slate-400 text-sm mb-6">
            快速生成专业级学校宣传网页，助力学校品牌建设
          </p>
          <div className="border-t border-slate-800 pt-6">
            <p className="text-slate-500 text-xs">
              © 2024 学校宣传网页生成器. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
