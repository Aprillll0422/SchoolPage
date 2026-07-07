import { useState } from "react";
import { useSchoolStore } from "@/store/useSchoolStore";
import ImageUpload from "./ImageUpload";
import AISettings from "./AISettings";
import { Wand2, Sparkles, School, Settings, AlertCircle } from "lucide-react";

interface UploadFormProps {
  onGenerate: () => void;
}

export default function UploadForm({ onGenerate }: UploadFormProps) {
  const { school, setSchool, isGenerating, error, aiConfig } = useSchoolStore();
  const [schoolName, setSchoolName] = useState(school.name);
  const [showSettings, setShowSettings] = useState(false);

  const canGenerate =
    schoolName.trim() && school.logo && school.horizontalImage && school.verticalImage;

  const handleGenerate = () => {
    setSchool({ name: schoolName.trim() });
    onGenerate();
  };

  return (
    <section id="upload-section" className="py-24 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-amber-600 font-semibold text-sm tracking-widest uppercase mb-4">
            开始制作
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            创建您的学校宣传网页
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            上传以下素材并填写学校名称，AI 将自动为您生成精美的宣传网页
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  aiConfig.useMock
                    ? "bg-slate-100 text-slate-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    aiConfig.useMock ? "bg-slate-400" : "bg-green-500"
                  }`}
                />
                {aiConfig.useMock ? "模拟模式" : "真实 AI 模式"}
              </span>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">AI 设置</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">生成失败</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-amber-500" />
                学校名称
                <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="请输入学校名称，例如：明德华文中学"
              className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all text-lg"
            />
            <p className="text-xs text-slate-500 mt-2">
              AI 将根据学校名称检索相关资料并生成宣传文案</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <ImageUpload
              label="校徽"
              description="学校logo"
              value={school.logo}
              onChange={(base64) => setSchool({ logo: base64 })}
              aspectRatio="square"
            />
            <ImageUpload
              label="横版学校图片"
              description="用于banner展示图"
              value={school.horizontalImage}
              onChange={(base64) => setSchool({ horizontalImage: base64 })}
              aspectRatio="horizontal"
            />
            <ImageUpload
              label="竖版学校图片"
              description="用于内容展示"
              value={school.verticalImage}
              onChange={(base64) => setSchool({ verticalImage: base64 })}
              aspectRatio="vertical"
            />
          </div>

          <div className="border-t border-slate-200 pt-8">
            <div className="flex flex-col items-center">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className={`relative px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-3 ${
                  canGenerate && !isGenerating
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                    AI 生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    一键生成宣传网页
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
              {!canGenerate && (
                <p className="text-sm text-slate-500 mt-3">
                  请上传所有图片并填写学校名称后再生成
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <AISettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </section>
  );
}
