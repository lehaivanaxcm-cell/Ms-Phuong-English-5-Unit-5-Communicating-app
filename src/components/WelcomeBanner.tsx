import React from 'react';
import { Volume2, Sparkles, BookCheck, Bookmark } from 'lucide-react';
import { BrandHeader, LessonInfo } from '../types/lesson';
import { speakText, playSound } from '../utils/audio';

interface WelcomeBannerProps {
  brand: BrandHeader;
  lessonInfo: LessonInfo;
  speed: number;
  soundEnabled: boolean;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  brand,
  lessonInfo,
  speed,
  soundEnabled,
}) => {
  const handlePronounce = (text: string) => {
    if (soundEnabled) playSound('click');
    speakText(text, speed);
  };

  return (
    <div className="space-y-4">
      {/* Teacher Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-rose-500 to-pink-500 p-6 sm:p-8 text-white shadow-xl shadow-rose-200">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-300/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Animated Teacher Avatar */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white p-1.5 shadow-lg shadow-black/10 transform rotate-1 transition group-hover:rotate-0">
                <div className="w-full h-full rounded-2xl bg-amber-100 flex items-center justify-center text-4xl sm:text-5xl">
                  👩‍🏫
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Welcome Speech & School Pride */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                🏫 {brand.school}
              </span>
              <span className="bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-1 rounded-full">
                ⭐ {brand.teacher}
              </span>
            </div>

            <p className="text-base sm:text-lg font-semibold leading-relaxed text-amber-50 drop-shadow-xs">
              "{brand.welcome_message}"
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-100">
              <BookCheck className="w-4 h-4 text-amber-200" />
              <span>Chủ đề trọng tâm:</span>
              <span className="bg-white text-rose-700 font-extrabold px-3 py-0.5 rounded-lg shadow-xs">
                {lessonInfo.topic}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Structures & Vocabulary Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Target Structures */}
        <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              💬
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm font-heading">
                MẪU CÂU TRỌNG TÂM (Target Structures)
              </h3>
              <p className="text-xs text-slate-500">Bấm loa để nghe mẫu phát âm chuẩn</p>
            </div>
          </div>

          <div className="space-y-2">
            {lessonInfo.target_structures.map((struct, idx) => (
              <div
                key={idx}
                className="group flex items-start justify-between gap-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 hover:bg-amber-100/70 transition"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                    {struct}
                  </p>
                </div>
                <button
                  onClick={() => handlePronounce(struct.split(' - ')[0])}
                  className="p-1.5 rounded-lg bg-white text-amber-700 hover:text-amber-900 hover:bg-amber-200 transition shadow-xs flex-shrink-0 cursor-pointer"
                  title="Nghe phát âm mẫu"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Target Vocabulary */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              📚
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm font-heading">
                TỪ VỰNG THEN CHỐT (Target Vocabulary)
              </h3>
              <p className="text-xs text-slate-500">Chạm vào từ để nghe giọng đọc bản xứ</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {lessonInfo.target_vocabulary.map((vocab, idx) => {
              const engPart = vocab.split('(')[0].trim();
              return (
                <button
                  key={idx}
                  onClick={() => handlePronounce(engPart)}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-500 hover:text-white border border-sky-200 text-sky-800 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-95"
                >
                  <Bookmark className="w-3 h-3 text-sky-500 group-hover:text-white transition" />
                  <span>{vocab}</span>
                  <Volume2 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
