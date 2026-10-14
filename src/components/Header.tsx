import React from 'react';
import { Sparkles, BookOpen, Mic, MessageSquare, Award, Code2, Volume2, VolumeX } from 'lucide-react';
import { BrandHeader } from '../types/lesson';

interface HeaderProps {
  brand: BrandHeader;
  activeTab: 'scenarios' | 'karaoke' | 'expansion' | 'practice' | 'json';
  setActiveTab: (tab: 'scenarios' | 'karaoke' | 'expansion' | 'practice' | 'json') => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  speed: number;
  setSpeed: (val: number) => void;
  onOpenAiGenerator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  brand,
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  speed,
  setSpeed,
  onOpenAiGenerator,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top School & Brand Bar */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full text-xs shadow-xs animate-pulse">
              🌟 TIỂU HỌC TÂN HƯNG
            </span>
            <span className="font-medium hidden sm:inline opacity-95">
              Hệ thống Luyện nói & Tương tác Tiếng Anh tại nhà
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAiGenerator}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer"
              title="Tạo bài học mới từ SGK bằng AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tạo bài mới (AI)</span>
            </button>
            <div className="flex items-center gap-1 bg-black/20 rounded-full px-2 py-0.5">
              <span className="text-[11px] opacity-80">Tốc độ:</span>
              <button
                onClick={() => setSpeed(speed === 0.8 ? 1.0 : 0.8)}
                className="text-[11px] font-bold text-amber-200 hover:text-white px-1"
                title="Thay đổi tốc độ phát âm"
              >
                {speed === 0.8 ? '🐢 0.8x (Dễ)' : '🐇 1.0x (Chuẩn)'}
              </button>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1 hover:bg-white/20 rounded-full transition cursor-pointer"
              title={soundEnabled ? 'Tắt hiệu ứng âm thanh' : 'Bật hiệu ứng âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-200" /> : <VolumeX className="w-4 h-4 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Logo & Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-md shadow-amber-200">
            <span className="text-2xl font-black">👩‍🏫</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 font-heading">
                {brand.teacher}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                Lớp 5 - SGK
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {brand.school}
            </p>
          </div>
        </div>

        {/* Tab Navigation for 4 Modules + JSON Schema */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeTab === 'scenarios'
                ? 'bg-amber-500 text-white shadow-sm shadow-amber-300'
                : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Tình huống</span>
          </button>

          <button
            onClick={() => setActiveTab('karaoke')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeTab === 'karaoke'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-300'
                : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span className="relative">
              2. Karaoke Shadowing
              <span className="absolute -top-1 -right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('expansion')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeTab === 'expansion'
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-300'
                : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>3. Mở rộng</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeTab === 'practice'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-300'
                : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>4. Luyện tập</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeTab === 'json'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Xem chuẩn JSON schema SGK"
          >
            <Code2 className="w-4 h-4" />
            <span>JSON SGK</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
