import { Wand2, Image, FileText, Download, Zap, Palette } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI智能生成",
    description: "输入学校名称，AI自动检索资料生成专业宣传文案，省时省力",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Image,
    title: "图片自由上传",
    description: "支持上传校徽、横版和竖版学校图片，完美适配网页展示",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "精美设计模板",
    description: "专业设计师打造的学院风模板，庄重典雅又不失现代感",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "一键生成",
    description: "简单三步操作，几分钟内生成完整宣传网页，即刻可用",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FileText,
    title: "内容完整",
    description: "包含学校简介、办学特色、历史沿革、联系方式等完整板块",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Download,
    title: "导出HTML",
    description: "一键下载完整HTML文件，单文件可直接部署使用，无依赖",
    color: "from-indigo-500 to-violet-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-amber-600 font-semibold text-sm tracking-widest uppercase mb-4">
            核心功能
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            为什么选择我们的工具
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            专为学校宣传设计，让每一所学校都能拥有自己的精美宣传网页
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
