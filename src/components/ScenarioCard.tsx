import React, { useState } from 'react';
import { Volume2, Play, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { CommunicativeScenario } from '../types/lesson';
import { speakText, playSound } from '../utils/audio';

interface ScenarioCardProps {
  scenario: CommunicativeScenario;
  onGoToKaraoke: (scenarioId: number) => void;
  speed: number;
  soundEnabled: boolean;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onGoToKaraoke,
  speed,
  soundEnabled,
}) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlayLine = async (text: string, idx: number) => {
    if (soundEnabled) playSound('click');
    setPlayingIndex(idx);
    await speakText(text, speed);
    setPlayingIndex(null);
  };

  const handlePlayAll = async () => {
    if (soundEnabled) playSound('click');
    for (let i = 0; i < scenario.dialogue.length; i++) {
      setPlayingIndex(i);
      await speakText(scenario.dialogue[i].text, speed);
      await new Promise((r) => setTimeout(r, 400));
    }
    setPlayingIndex(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Scenario Header */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-white text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Tình huống #{scenario.scenario_id}
            </span>
            <span className="text-emerald-100 text-xs font-medium">
              Communicative Context
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black font-heading">
            {scenario.context_title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayAll}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer active:scale-95"
            title="Nghe toàn bộ đoạn hội thoại"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Nghe toàn cảnh</span>
          </button>
          <button
            onClick={() => onGoToKaraoke(scenario.scenario_id)}
            className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-md shadow-rose-600/30 cursor-pointer active:scale-95 animate-pulse"
          >
            <Sparkles className="w-4 h-4" />
            <span>Luyện Karaoke</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Situational Visual Illustration & AI Prompt */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-emerald-50 border border-slate-200 p-4 min-h-[220px] flex flex-col justify-between shadow-inner">
            {/* Textbook Artistic Scene Simulation */}
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/80 pb-2 mb-2">
              <span className="flex items-center gap-1 font-bold text-emerald-700">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Bối cảnh SGK Trực quan</span>
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                CLT Simulation
              </span>
            </div>

            {/* Stylized Visual Representation of Panel */}
            <div className="py-2 flex flex-col items-center justify-center text-center">
              {scenario.scenario_id === 1 ? (
                <div className="w-full bg-white rounded-xl p-3 border border-amber-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-center gap-4 text-3xl">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl">👧🏻</span>
                      <span className="text-[11px] font-bold text-rose-600">Bạn Mai</span>
                    </div>
                    <span className="text-slate-300 font-bold">👉</span>
                    <div className="p-2 border-2 border-dashed border-amber-400 rounded-lg bg-amber-50 flex flex-col items-center">
                      <span className="text-3xl">👨🏻‍⚕️</span>
                      <span className="text-[10px] font-extrabold text-amber-900">Bố (Doctor)</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl">👦🏼</span>
                      <span className="text-[11px] font-bold text-sky-600">Bạn Tom</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-medium italic">
                    "Mai chỉ vào bức ảnh bố trên tường phòng khách và kể cho Tom nghe."
                  </p>
                </div>
              ) : (
                <div className="w-full bg-white rounded-xl p-3 border border-sky-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-center gap-3 text-3xl">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl">👦🏼</span>
                      <span className="text-[11px] font-bold text-sky-600">Tom hỏi</span>
                    </div>
                    <span className="text-slate-400">💭</span>
                    <div className="p-2 bg-gradient-to-tr from-sky-100 to-indigo-100 border-2 border-sky-300 rounded-full flex flex-col items-center shadow-xs">
                      <span className="text-3xl">👩🏻‍⚕️🩺</span>
                      <span className="text-[10px] font-extrabold text-indigo-900">Future Doctor</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl">👧🏻</span>
                      <span className="text-[11px] font-bold text-rose-600">Mai ước mơ</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-medium italic">
                    "Mai mơ ước tương lai trở thành bác sĩ để chữa bệnh cho mọi người."
                  </p>
                </div>
              )}
            </div>

            {/* Context Narrative Description */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-slate-200/60 font-medium">
              💡 {scenario.context_description}
            </p>
          </div>

          {/* AI Image Generation Prompt Details (as specified in directives) */}
          <details className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 border border-slate-200 cursor-pointer group">
            <summary className="font-semibold text-slate-700 hover:text-emerald-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Prompt minh hoạ hình ảnh (AI Image Prompt)
              </span>
              <span className="text-[11px] text-slate-400 group-open:rotate-90 transition">▶</span>
            </summary>
            <p className="mt-2 text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 text-slate-600 select-all leading-normal">
              {scenario.image_prompt}
            </p>
          </details>
        </div>

        {/* Right: Interactive Dialogue Lines */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Đoạn hội thoại chuẩn (Communicative Dialogue)
            </h3>
            <span className="text-xs text-emerald-600 font-semibold">
              Chạm vào câu để nghe
            </span>
          </div>

          <div className="space-y-2.5">
            {scenario.dialogue.map((line, idx) => {
              const isSpeakerA = line.speaker === 'Mai' || line.speaker === 'A';
              const isPlaying = playingIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handlePlayLine(line.text, idx)}
                  className={`group relative p-3 rounded-2xl border transition cursor-pointer ${
                    isPlaying
                      ? 'bg-amber-100/80 border-amber-400 shadow-md scale-[1.01]'
                      : isSpeakerA
                      ? 'bg-rose-50/50 hover:bg-rose-50 border-rose-100 hover:border-rose-300'
                      : 'bg-sky-50/50 hover:bg-sky-50 border-sky-100 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Speaker Avatar Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 shadow-xs ${
                        isSpeakerA
                          ? 'bg-rose-500 text-white'
                          : 'bg-sky-500 text-white'
                      }`}
                    >
                      {isSpeakerA ? '👧🏻' : '👦🏼'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span
                          className={`text-xs font-extrabold ${
                            isSpeakerA ? 'text-rose-700' : 'text-sky-700'
                          }`}
                        >
                          {line.speaker}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-600">
                          {line.ipa}
                        </span>
                      </div>

                      {/* Main English sentence */}
                      <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition">
                        {line.text}
                      </p>

                      {/* Vietnamese translation */}
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {line.translation}
                      </p>
                    </div>

                    {/* Play Button */}
                    <button
                      className={`p-2 rounded-xl transition flex-shrink-0 cursor-pointer ${
                        isPlaying
                          ? 'bg-amber-500 text-white animate-bounce'
                          : 'bg-white text-slate-600 group-hover:bg-emerald-500 group-hover:text-white shadow-xs'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Teacher tip snippet */}
          <div className="mt-3 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0">💡</span>
            <div>
              <span className="font-extrabold text-amber-950">Lời khuyên của Cô Phương: </span>
              <span>{scenario.communication_expansion.ms_phuong_tip}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
