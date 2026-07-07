import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { fileToBase64, validateImageFile, getFileSizeLabel } from "@/utils/imageUtils";

interface ImageUploadProps {
  label: string;
  description: string;
  value: string;
  onChange: (base64: string, fileName: string) => void;
  aspectRatio?: "square" | "horizontal" | "vertical";
}

export default function ImageUpload({
  label,
  description,
  value,
  onChange,
  aspectRatio = "square",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [error, setError] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      setError("");
      if (!validateImageFile(file)) {
        setError("请上传有效的图片文件 (JPG, PNG, GIF, WebP)");
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        onChange(base64, file.name);
        setFileName(file.name);
        setFileSize(file.size);
      } catch {
        setError("图片处理失败，请重试");
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    onChange("", "");
    setFileName("");
    setFileSize(0);
    setError("");
  }, [onChange]);

  const aspectClass = {
    square: "aspect-square",
    horizontal: "aspect-video",
    vertical: "aspect-[9/16]",
  }[aspectRatio];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <p className="text-xs text-slate-500">{description}</p>

      {value ? (
        <div
          className={`relative ${aspectClass} rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50 group`}
        >
          <img
            src={value}
            alt={label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="cursor-pointer px-4 py-2 bg-white text-slate-800 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
              更换图片
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInputChange}
              />
            </label>
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              移除
            </button>
          </div>
          {fileName && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-xs truncate">{fileName}</p>
              <p className="text-white/70 text-xs">
                {getFileSizeLabel(fileSize)}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`${aspectClass} border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragging
              ? "border-amber-500 bg-amber-50"
              : error
              ? "border-red-400 bg-red-50"
              : "border-slate-300 bg-slate-50 hover:border-amber-400 hover:bg-amber-50/50"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            id={`upload-${label}`}
          />
          <label
            htmlFor={`upload-${label}`}
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                isDragging
                  ? "bg-amber-500 text-white"
                  : error
                  ? "bg-red-100 text-red-500"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {error ? (
                <X className="w-6 h-6" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>
            <p className="text-sm font-medium text-slate-700 mb-1">
              {isDragging ? "松开以上传" : "点击或拖拽上传"}
            </p>
            <p className="text-xs text-slate-500">
              {error || "支持 JPG、PNG、GIF、WebP 格式"}
            </p>
          </label>
        </div>
      )}
    </div>
  );
}
