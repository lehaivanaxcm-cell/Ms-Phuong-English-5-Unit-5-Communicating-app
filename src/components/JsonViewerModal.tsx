import React, { useState } from 'react';
import { Copy, Check, Download, Code2, CheckCircle2, FileJson, Sparkles } from 'lucide-react';
import { LessonModule } from '../types/lesson';

interface JsonViewerModalProps {
  lessonData: LessonModule;
  onOpenAiGenerator: () => void;
}

export const JsonViewerModal: React.FC<JsonViewerModalProps> = ({
  lessonData,
  onOpenAiGenerator,
}) => {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(lessonData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ms_phuong_english_${lessonData.lesson_info.topic.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Chuẩn Schema 100%
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Ms Phương English EdTech Spec
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-heading">
            Dữ Liệu JSON Chuẩn SGK Tiếng Anh Tiểu Học
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Toàn bộ cấu trúc bài học bao gồm 4 modules: Lời chào & Tình huống (Brand Welcome & Simulation), Luyện nói Karaoke có thời lượng token (Karaoke Shadowing), Mở rộng giao tiếp (Expansion), và Bài tập củng cố (Practice Exercises).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer shadow-md active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép!' : 'Sao chép JSON'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer border border-white/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Tải file .json</span>
          </button>

          <button
            onClick={onOpenAiGenerator}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-md active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tạo bài mới bằng AI</span>
          </button>
        </div>
      </div>

      {/* Code Editor Box */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Editor Bar */}
        <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <FileJson className="w-4 h-4 text-amber-400 ml-2" />
            <span className="text-slate-300 font-bold">ms_phuong_english_lesson.json</span>
          </div>

          <span className="text-[11px] bg-slate-800 px-2.5 py-0.5 rounded-md text-emerald-400">
            Valid JSON UTF-8
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-6 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto max-h-[600px] leading-relaxed selection:bg-emerald-900 selection:text-white">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
