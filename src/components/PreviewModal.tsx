import { useEffect, useRef, useState } from "react";
import { X, Download, RefreshCw, Copy, Check } from "lucide-react";
import { useSchoolStore } from "@/store/useSchoolStore";
import { downloadHTML } from "@/utils/htmlGenerator";
import { generateSchoolPrompt } from "@/utils/promptTemplate";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  const { school, content, generatedHTML, isGenerating, generateContent } =
    useSchoolStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (isOpen && iframeRef.current && generatedHTML) {
      iframeRef.current.srcdoc = generatedHTML;
    }
  }, [isOpen, generatedHTML]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    if (generatedHTML) {
      downloadHTML(generatedHTML, school.name || "学校宣传网页");
    }
  };

  const handleCopyPrompt = async () => {
    const prompt = generateSchoolPrompt(school.name);
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    generateContent();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-none h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              预览：{school.name}
            </h3>
            <p className="text-sm text-slate-500">
              {isGenerating ? "AI正在生成宣传文案..." : "宣传网页生成完成"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrompt(!showPrompt)}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              title="查看AI提示词"
            >
              {showPrompt ? <X className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
              title="重新生成"
            >
              <RefreshCw
                className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              <Download className="w-4 h-4" />
              下载 HTML
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showPrompt && (
          <div className="px-6 py-4 bg-amber-50 border-b border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-amber-900">AI 提示词模板</h4>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制提示词
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-amber-800 bg-white/60 p-3 rounded-lg max-h-40 overflow-auto whitespace-pre-wrap">
              {generateSchoolPrompt(school.name)}
            </pre>
          </div>
        )}

        <div className="flex-1 overflow-auto bg-slate-100 p-4">
          {isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin mb-4" />
              <p className="text-slate-600 font-medium">AI 正在生成宣传文案...</p>
              <p className="text-sm text-slate-500 mt-2">请稍候，这可能需要几秒钟</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
              <div className="bg-slate-800 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-3 py-1 bg-slate-700 rounded text-slate-400 text-xs max-w-xs truncate">
                    {school.name}
                  </div>
                </div>
              </div>
              <iframe
                ref={iframeRef}
                className="w-full border-0"
                style={{ height: "calc(100% - 40px)" }}
                title="预览"
              />
            </div>
          )}
        </div>

        {content && (
          <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">
                ✅ 已生成：{content.features.length} 个办学特色
              </span>
              <span className="text-slate-500">
                💡 提示：下载后可用浏览器打开，也可直接部署到服务器
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
