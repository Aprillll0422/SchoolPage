import { useEffect, useRef, useState } from "react";
import { generatePromotionHTML } from "@/utils/htmlGenerator";
import { generateMockContent } from "@/utils/promptTemplate";
import { ChevronDown, Sparkles } from "lucide-react";

const demoSchool = {
  name: "明德华文中学",
  logo: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classic%20school%20emblem%20badge%20logo%20gold%20and%20blue%20with%20book%20and%20torch%20design%20circular%20shape&image_size=square_hd",
  horizontalImage: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20campus%20building%20landscape%20sunny%20day%20modern%20school%20architecture%20green%20trees%20wide%20angle&image_size=landscape_16_9",
  verticalImage: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=school%20campus%20vertical%20view%20students%20walking%20modern%20architecture%20trees%20blue%20sky%20education%20building&image_size=portrait_4_3",
};

export default function DemoSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const content = generateMockContent(demoSchool.name);
    const html = generatePromotionHTML(demoSchool, content);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  }, []);

  const scrollToUpload = () => {
    const uploadSection = document.getElementById("upload-section");
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="relative z-10 text-center mb-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-amber-300 text-sm font-medium tracking-wider">
            AI 智能生成 · 一键导出
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          学校宣传网页
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
            自定义生成工具
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          上传校徽和学校图片，输入学校名称，AI 自动生成精美宣传文案，
          <br className="hidden md:block" />
          几分钟内打造专业级学校宣传网站，支持一键导出 HTML
        </p>
        <button
          onClick={scrollToUpload}
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold rounded-full hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
        >
          立即开始制作
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-t-2xl border border-slate-700/50 p-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-slate-700/50 rounded-lg text-slate-400 text-sm max-w-md truncate">
              www.mingde-school.edu.cn
            </div>
          </div>
          <div className="text-slate-500 text-xs">Demo 预览</div>
        </div>

        <div
          className="relative bg-white rounded-b-2xl overflow-hidden border-x border-b border-slate-700/50 shadow-2xl"
          style={{ height: "520px" }}
        >
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
                <span className="text-slate-500 text-sm">加载Demo预览中...</span>
              </div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            onLoad={() => setIsLoaded(true)}
            title="学校宣传网页Demo"
          />
        </div>
      </div>

      <div className="relative z-10 mt-10 flex flex-col items-center">
        <span className="text-slate-400 text-sm mb-2">向下滚动查看更多功能</span>
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
