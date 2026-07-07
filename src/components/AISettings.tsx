import { useState } from "react";
import { useSchoolStore } from "@/store/useSchoolStore";
import { Settings, X, Key, Sparkles, Save, ToggleLeft, ToggleRight } from "lucide-react";

interface AISettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AISettings({ isOpen, onClose }: AISettingsProps) {
  const { aiConfig, setAIConfig } = useSchoolStore();
  const [localConfig, setLocalConfig] = useState(aiConfig);

  const handleSave = () => {
    setAIConfig(localConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">AI 设置</h3>
              <p className="text-sm text-slate-500">配置 DeepSeek API</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              使用 DeepSeek 大模型生成学校宣传文案
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Key className="w-4 h-4 text-amber-500" />
              DeepSeek API Key
            </label>
            <input
              type="password"
              value={localConfig.apiKey}
              onChange={(e) =>
                setLocalConfig({ ...localConfig, apiKey: e.target.value })
              }
              placeholder="sk-..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all font-mono text-sm"
            />
            <p className="text-xs text-slate-500 mt-2">
              获取地址：{" "}
              <a
                href="https://platform.deepseek.com/api_keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline"
              >
                https://platform.deepseek.com/api_keys
              </a>
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <p className="font-medium text-slate-900">使用模拟数据</p>
              <p className="text-sm text-slate-500">开启后无需 API Key</p>
            </div>
            <button
              onClick={() =>
                setLocalConfig({ ...localConfig, useMock: !localConfig.useMock })
              }
              className={`relative w-12 h-7 rounded-full transition-colors ${
                localConfig.useMock ? "bg-amber-500" : "bg-slate-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  localConfig.useMock ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {!localConfig.useMock && !localConfig.apiKey && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <Key className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">请输入 API Key，否则将使用模拟数据</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25"
          >
            <Save className="w-4 h-4" />
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
