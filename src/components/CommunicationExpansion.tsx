import React, { useState } from 'react';
import { Sparkles, MessageCircle, Volume2, Lightbulb, UserCheck, ArrowRight } from 'lucide-react';
import { CommunicativeScenario } from '../types/lesson';
import { speakText, playSound } from '../utils/audio';

interface CommunicationExpansionProps {
  scenarios: CommunicativeScenario[];
  speed: number;
  soundEnabled: boolean;
}

const CAREER_ROLEPLAYS = [
  {
    job: 'Doctor',
    article: 'a',
    emoji: '👨🏻‍⚕️',
    vn: 'Bác sĩ',
    reason: 'look after sick patients',
    reasonVn: 'chăm sóc bệnh nhân',
  },
  {
    job: 'Architect',
    article: 'an',
    emoji: '📐',
    vn: 'Kiến trúc sư',
    reason: 'design modern buildings and houses',
    reasonVn: 'thiết kế các toà nhà hiện đại',
  },
  {
    job: 'Pilot',
    article: 'a',
    emoji: '✈️',
    vn: 'Phi công',
    reason: 'fly planes and travel around the world',
    reasonVn: 'lái máy bay và đi vòng quanh thế giới',
  },
  {
    job: 'Teacher',
    article: 'a',
    emoji: '👩‍🏫',
    vn: 'Giáo viên',
    reason: 'teach English to young children',
    reasonVn: 'dạy Tiếng Anh cho các em nhỏ',
  },
  {
    job: 'Writer',
    article: 'a',
    emoji: '✍️',
    vn: 'Nhà văn',
    reason: 'write interesting stories for kids',
    reasonVn: 'viết những câu chuyện hay cho thiếu nhi',
  },
];

export const CommunicationExpansion: React.FC<CommunicationExpansionProps> = ({
  scenarios,
  speed,
  soundEnabled,
}) => {
  const [selectedJob, setSelectedJob] = useState(CAREER_ROLEPLAYS[0]);

  const handlePronounce = (text: string) => {
    if (soundEnabled) playSound('click');
    speakText(text, speed);
  };

  return (
    <div className="space-y-6">
      {/* Teacher's Master Tips & Cultural Advice */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-500/20">
            💡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 text-[11px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                CLT Methodology
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Mở rộng giao tiếp thực tế
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
              Góc Lời Khuyên Của Cô Phương (Teacher's Real-World Tips)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scen) => (
            <div
              key={scen.scenario_id}
              className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 rounded-2xl p-5 border border-amber-200/60 shadow-xs space-y-3"
            >
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-xs font-black">
                  {scen.scenario_id}
                </span>
                <span>Lời khuyên cho tình huống {scen.scenario_id}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {scen.communication_expansion.ms_phuong_tip}
              </p>

              {/* Alternative phrases */}
              <div className="pt-2 border-t border-amber-200/50">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-2">
                  Cách diễn đạt tương đương (Alternative Responses):
                </span>
                <div className="space-y-1.5">
                  {scen.communication_expansion.alternative_responses.map((resp, idx) => (
                    <div
                      key={idx}
                      onClick={() => handlePronounce(resp.split(' - ')[0])}
                      className="group flex items-center justify-between gap-2 p-2 rounded-xl bg-white hover:bg-amber-100/70 border border-amber-200/40 text-xs text-slate-800 font-medium transition cursor-pointer"
                    >
                      <span>✨ {resp}</span>
                      <Volume2 className="w-3.5 h-3.5 text-amber-600 opacity-60 group-hover:opacity-100 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Career Roleplay Builder */}
      <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-sky-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Tương tác thực hành
              </span>
              <span className="text-xs text-sky-800 font-bold">
                Career Roleplay Studio
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-800 font-heading">
              Thực Hành Hỏi & Trả Lời Về Ước Mơ Của Riêng Con
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Chọn nghề nghiệp con yêu thích để ghép thành mẫu câu giao tiếp hoàn chỉnh:
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-sky-200 shadow-xs text-xs font-bold text-sky-800">
            <UserCheck className="w-4 h-4 text-sky-600" />
            <span>Nghề đang chọn: {selectedJob.emoji} {selectedJob.job}</span>
          </div>
        </div>

        {/* Job selector buttons */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {CAREER_ROLEPLAYS.map((job) => {
            const isSelected = selectedJob.job === job.job;
            return (
              <button
                key={job.job}
                onClick={() => {
                  setSelectedJob(job);
                  if (soundEnabled) playSound('click');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sky-400/30 scale-105'
                    : 'bg-white hover:bg-sky-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="text-lg">{job.emoji}</span>
                <span>{job.job}</span>
                <span className="text-[11px] opacity-75">({job.vn})</span>
              </button>
            );
          })}
        </div>

        {/* Live Conversation Cards with Audio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Exchange 1 */}
          <div className="bg-white rounded-2xl p-4 border border-sky-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-sky-700">
              <span>Hỏi đáp 1: Ước mơ nghề nghiệp</span>
              <button
                onClick={() =>
                  handlePronounce(
                    `What would you like to be in the future? I would like to be ${selectedJob.article} ${selectedJob.job}.`
                  )
                }
                className="flex items-center gap-1 text-sky-600 hover:text-sky-800 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe cả 2 câu</span>
              </button>
            </div>

            <div className="space-y-2">
              <div
                onClick={() => handlePronounce("What would you like to be in the future?")}
                className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100/80 border border-sky-100 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-600">👦🏼 Bạn hỏi:</span>
                  <Volume2 className="w-3 h-3 text-sky-500" />
                </div>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  "What would you like to be in the future?"
                </p>
                <p className="text-xs text-slate-500">Cậu muốn làm nghề gì trong tương lai?</p>
              </div>

              <div
                onClick={() =>
                  handlePronounce(
                    `I'd like to be ${selectedJob.article} ${selectedJob.job}.`
                  )
                }
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600">
                    👧🏻 Con trả lời ({selectedJob.emoji}):
                  </span>
                  <Volume2 className="w-3 h-3 text-emerald-500" />
                </div>
                <p className="text-sm font-extrabold text-emerald-950 mt-0.5">
                  "I'd like to be <span className="text-rose-600 underline">{selectedJob.article} {selectedJob.job}</span>."
                </p>
                <p className="text-xs text-slate-500">
                  Mình muốn trở thành một {selectedJob.vn.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>

          {/* Exchange 2 */}
          <div className="bg-white rounded-2xl p-4 border border-purple-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-purple-700">
              <span>Hỏi đáp 2: Lý do yêu thích</span>
              <button
                onClick={() =>
                  handlePronounce(
                    `Why would you like to be ${selectedJob.article} ${selectedJob.job}? Because I would like to ${selectedJob.reason}.`
                  )
                }
                className="flex items-center gap-1 text-purple-600 hover:text-purple-800 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe cả 2 câu</span>
              </button>
            </div>

            <div className="space-y-2">
              <div
                onClick={() =>
                  handlePronounce(
                    `Why would you like to be ${selectedJob.article} ${selectedJob.job}?`
                  )
                }
                className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100/80 border border-purple-100 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-600">👦🏼 Bạn hỏi:</span>
                  <Volume2 className="w-3 h-3 text-purple-500" />
                </div>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  "Why would you like to be {selectedJob.article} {selectedJob.job}?"
                </p>
                <p className="text-xs text-slate-500">Vì sao cậu lại muốn làm {selectedJob.vn.toLowerCase()}?</p>
              </div>

              <div
                onClick={() =>
                  handlePronounce(
                    `Because I'd like to ${selectedJob.reason}.`
                  )
                }
                className="p-2.5 rounded-xl bg-pink-50 hover:bg-pink-100/80 border border-pink-200 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-pink-600">
                    👧🏻 Con trả lời ({selectedJob.emoji}):
                  </span>
                  <Volume2 className="w-3 h-3 text-pink-500" />
                </div>
                <p className="text-sm font-extrabold text-pink-950 mt-0.5">
                  "Because I'd like to <span className="text-rose-600 underline">{selectedJob.reason}</span>."
                </p>
                <p className="text-xs text-slate-500">
                  Bởi vì mình muốn {selectedJob.reasonVn}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
