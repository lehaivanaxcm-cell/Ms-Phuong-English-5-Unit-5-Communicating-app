import React from 'react';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';
import { speakText, playSound } from '../utils/audio';

interface TextbookComicStripProps {
  speed: number;
  soundEnabled: boolean;
  onGoToKaraoke: (scenarioId: number) => void;
}

export const TextbookComicStrip: React.FC<TextbookComicStripProps> = ({
  speed,
  soundEnabled,
  onGoToKaraoke,
}) => {
  const handleBubbleClick = (text: string) => {
    if (soundEnabled) playSound('click');
    speakText(text, speed);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            📖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-900 text-[11px] font-black px-2 py-0.5 rounded-md">
                SGK TIẾNG ANH 5
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Look, listen and repeat
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-800 font-heading">
              Trang Sách Giáo Khoa Tương Tác (Textbook Visual Panels)
            </h3>
          </div>
        </div>

        <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Chạm vào từng bóng thoại để nghe
        </span>
      </div>

      {/* Comic Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Panel (a) */}
        <div className="relative rounded-2xl bg-gradient-to-b from-amber-50/70 via-sky-50/40 to-emerald-50/50 p-4 border-2 border-amber-200 shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Panel tag */}
          <div className="flex items-center justify-between mb-3">
            <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
              a
            </span>
            <button
              onClick={() => onGoToKaraoke(1)}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Luyện nói câu này →
            </button>
          </div>

          {/* Dialogue Bubbles */}
          <div className="space-y-3 my-2">
            {/* Top bubble: Mai */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBubbleClick("That's my father.")}
                className="bg-white hover:bg-amber-100/80 text-slate-900 px-3.5 py-2 rounded-2xl border border-amber-300 shadow-xs font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95 text-left"
              >
                <span>"That's my father."</span>
                <Volume2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              </button>
              <span className="text-xs text-slate-400">👧🏻 Mai</span>
            </div>

            {/* Bubble 2: Tom */}
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-slate-400">Tom 👦🏼</span>
              <button
                onClick={() => handleBubbleClick("What's his job?")}
                className="bg-sky-50 hover:bg-sky-100 text-slate-900 px-3.5 py-2 rounded-2xl border border-sky-300 shadow-xs font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95 text-left"
              >
                <span>"What's his job?"</span>
                <Volume2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
              </button>
            </div>

            {/* Bubble 3: Mai */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBubbleClick("He's a doctor.")}
                className="bg-emerald-50 hover:bg-emerald-100 text-slate-900 px-3.5 py-2 rounded-2xl border border-emerald-300 shadow-xs font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95 text-left"
              >
                <span>"He's a doctor."</span>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </button>
              <span className="text-xs text-slate-400">👧🏻 Mai</span>
            </div>

            {/* Bubble 4: Tom */}
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-slate-400">Tom 👦🏼</span>
              <button
                onClick={() => handleBubbleClick("Cool!")}
                className="bg-amber-100 hover:bg-amber-200 text-amber-950 px-3.5 py-2 rounded-2xl border border-amber-400 shadow-xs font-black text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95 text-left"
              >
                <span>"Cool!"</span>
                <Volume2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>📍 Phòng khách nhà bạn Mai</span>
            <span className="text-emerald-700 font-bold">Mẫu: What's his job? - He's a doctor.</span>
          </div>
        </div>

        {/* Panel (b) */}
        <div className="relative rounded-2xl bg-gradient-to-b from-sky-50/70 via-indigo-50/40 to-pink-50/50 p-4 border-2 border-sky-200 shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Panel tag */}
          <div className="flex items-center justify-between mb-3">
            <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
              b
            </span>
            <button
              onClick={() => onGoToKaraoke(2)}
              className="text-[11px] font-bold text-sky-600 hover:text-sky-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Luyện nói câu này →
            </button>
          </div>

          {/* Dialogue Bubbles */}
          <div className="space-y-4 my-2">
            {/* Top bubble: Tom */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleBubbleClick("What would you like to be in the future?")
                }
                className="bg-white hover:bg-sky-100/80 text-slate-900 px-3.5 py-2.5 rounded-2xl border border-sky-300 shadow-xs font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95 text-left"
              >
                <span>"What would you like to be in the future?"</span>
                <Volume2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
              </button>
              <span className="text-xs text-slate-400">👦🏼 Tom</span>
            </div>

            {/* Dream Thought Cloud bubble: Mai as doctor */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold pr-2">
                <span>💭 Ước mơ của Mai: 👩🏻‍⚕️🩺 (Doctor)</span>
              </div>
              <button
                onClick={() =>
                  handleBubbleClick("I'd like to be a doctor, too.")
                }
                className="bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 text-slate-900 px-4 py-3 rounded-2xl border-2 border-rose-300 shadow-xs font-black text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95 text-left"
              >
                <span>"I'd like to be a doctor, too."</span>
                <Volume2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              </button>
              <span className="text-xs text-slate-400 pr-2">👧🏻 Mai</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>📍 Ghế sofa phòng khách</span>
            <span className="text-rose-700 font-bold">Mẫu: What would you like to be...?</span>
          </div>
        </div>
      </div>
    </div>
  );
};
