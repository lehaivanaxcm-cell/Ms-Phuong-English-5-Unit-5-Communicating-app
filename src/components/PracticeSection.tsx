import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PracticeExercises } from '../types/lesson';
import { playSound } from '../utils/audio';

interface PracticeSectionProps {
  practice: PracticeExercises;
  soundEnabled: boolean;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  practice,
  soundEnabled,
}) => {
  // Multiple Choice State: map of question id -> selected option
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  // Fill in the Blank State: map of question id -> student input
  const [fillInputs, setFillInputs] = useState<Record<number, string>>({});
  const [fillResults, setFillResults] = useState<Record<number, boolean | null>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  // Sentence Reorder State: map of question id -> current assembled words array
  const [reorderedWords, setReorderedWords] = useState<Record<number, string[]>>({});
  const [reorderResults, setReorderResults] = useState<Record<number, boolean | null>>({});

  // Multiple Choice Handler
  const handleSelectOption = (questionId: number, option: string, correctAnswer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));

    const isCorrect = option === correctAnswer;
    if (soundEnabled) {
      if (isCorrect) {
        playSound('correct');
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      } else {
        playSound('wrong');
      }
    }
  };

  // Fill in blank Handler
  const handleCheckFill = (questionId: number, correctAnswer: string) => {
    const val = (fillInputs[questionId] || '').trim().toLowerCase();
    const correctVal = correctAnswer.trim().toLowerCase();
    const isCorrect = val === correctVal;

    setFillResults((prev) => ({ ...prev, [questionId]: isCorrect }));
    if (soundEnabled) {
      if (isCorrect) {
        playSound('correct');
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
      } else {
        playSound('wrong');
      }
    }
  };

  // Sentence Reorder Handlers
  const handleAddWordToSentence = (questionId: number, word: string) => {
    if (soundEnabled) playSound('click');
    setReorderedWords((prev) => {
      const current = prev[questionId] || [];
      return { ...prev, [questionId]: [...current, word] };
    });
    // Reset checked status
    setReorderResults((prev) => ({ ...prev, [questionId]: null }));
  };

  const handleRemoveWordFromSentence = (questionId: number, indexToRemove: number) => {
    if (soundEnabled) playSound('click');
    setReorderedWords((prev) => {
      const current = prev[questionId] || [];
      const updated = current.filter((_, idx) => idx !== indexToRemove);
      return { ...prev, [questionId]: updated };
    });
    setReorderResults((prev) => ({ ...prev, [questionId]: null }));
  };

  const handleResetReorder = (questionId: number) => {
    if (soundEnabled) playSound('click');
    setReorderedWords((prev) => ({ ...prev, [questionId]: [] }));
    setReorderResults((prev) => ({ ...prev, [questionId]: null }));
  };

  const handleCheckReorder = (questionId: number, correctSentence: string) => {
    const assembled = (reorderedWords[questionId] || []).join(' ');
    // Normalize punctuation
    const cleanAssembled = assembled.replace(/\s+/g, ' ').trim().toLowerCase();
    const cleanCorrect = correctSentence.replace(/\s+/g, ' ').trim().toLowerCase();
    const isCorrect = cleanAssembled === cleanCorrect;

    setReorderResults((prev) => ({ ...prev, [questionId]: isCorrect }));
    if (soundEnabled) {
      if (isCorrect) {
        playSound('celebrate');
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      } else {
        playSound('wrong');
      }
    }
  };

  // Calculate student stars
  const mcCorrectCount = practice.multiple_choice.filter(
    (q) => selectedAnswers[q.id] === q.correct_answer
  ).length;
  const fillCorrectCount = Object.values(fillResults).filter((v) => v === true).length;
  const reorderCorrectCount = Object.values(reorderResults).filter((v) => v === true).length;
  const totalCompleted = mcCorrectCount + fillCorrectCount + reorderCorrectCount;
  const totalQuestions =
    practice.multiple_choice.length +
    practice.fill_in_blank.length +
    practice.sentence_reorder.length;

  return (
    <div className="space-y-8">
      {/* Progress & Star Scoreboard */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-400/40">
            ⭐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-300 font-extrabold text-xs uppercase tracking-wider">
                Bảng vàng thành tích Tân Hưng
              </span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading">
              Đã hoàn thành {totalCompleted} / {totalQuestions} câu hỏi
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              Luyện tập thường xuyên giúp con tự tin nói Tiếng Anh lưu loát!
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-56 bg-black/20 rounded-full p-1 border border-white/20">
          <div
            className="bg-gradient-to-r from-amber-300 to-yellow-400 h-3 rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${Math.round((totalCompleted / (totalQuestions || 1)) * 100)}%` }}
          />
        </div>
      </div>

      {/* Part 1: Multiple Choice (Trắc nghiệm) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-black flex items-center justify-center text-lg">
            1️⃣
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              PHẦN 1: TRẮC NGHIỆM CHỌN ĐÁP ÁN ĐÚNG (Multiple Choice)
            </h3>
            <p className="text-xs text-slate-500">
              Chọn đáp án chính xác nhất dựa trên nội dung bài học SGK
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {practice.multiple_choice.map((mc, idx) => {
            const userChoice = selectedAnswers[mc.id];
            const hasAnswered = !!userChoice;
            const isCorrect = userChoice === mc.correct_answer;

            return (
              <div
                key={mc.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {mc.question}
                  </p>
                </div>

                {/* 4 Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {mc.options.map((opt) => {
                    const isOptionSelected = userChoice === opt;
                    const isOptionCorrect = opt === mc.correct_answer;

                    let btnStyle = 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200';
                    if (hasAnswered) {
                      if (isOptionCorrect) {
                        btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-400 ring-2 ring-emerald-300 font-bold';
                      } else if (isOptionSelected && !isCorrect) {
                        btnStyle = 'bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-300';
                      } else {
                        btnStyle = 'bg-white text-slate-400 border-slate-100 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(mc.id, opt, mc.correct_answer)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition font-medium flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {hasAnswered && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                        {hasAnswered && isOptionSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback */}
                {showExplanation[mc.id] && (
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed border ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <span className="font-black">
                      {isCorrect ? '🎉 Rất tốt! ' : '💪 Thử lại nhé! '}
                    </span>
                    <span>{mc.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Fill-in-the-blank (Điền từ) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 font-black flex items-center justify-center text-lg">
            2️⃣
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              PHẦN 2: ĐIỀN TỪ VÀO CHỖ TRỐNG (Fill In The Blank)
            </h3>
            <p className="text-xs text-slate-500">
              Nhập từ Tiếng Anh còn thiếu vào ô trống và bấm Kiểm tra
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {practice.fill_in_blank.map((fib, idx) => {
            const result = fillResults[fib.id];
            const isCorrect = result === true;
            const hasChecked = result !== null && result !== undefined;

            return (
              <div
                key={fib.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-sky-400 text-sky-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">
                    {fib.sentence.replace('[blank]', '_______')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={fillInputs[fib.id] || ''}
                    onChange={(e) =>
                      setFillInputs((prev) => ({ ...prev, [fib.id]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheckFill(fib.id, fib.correct_answer);
                    }}
                    placeholder="Nhập từ..."
                    className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-400 w-44"
                  />
                  <button
                    onClick={() => handleCheckFill(fib.id, fib.correct_answer)}
                    className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-xs active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kiểm tra</span>
                  </button>

                  <button
                    onClick={() =>
                      setShowHints((prev) => ({ ...prev, [fib.id]: !prev[fib.id] }))
                    }
                    className="flex items-center gap-1 text-slate-500 hover:text-amber-600 px-2.5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Gợi ý</span>
                  </button>
                </div>

                {/* Hint banner */}
                {showHints[fib.id] && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                    💡 Gợi ý của Cô Phương: {fib.hint}
                  </div>
                )}

                {/* Validation feedback */}
                {hasChecked && (
                  <div
                    className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chính xác! Đáp án là "{fib.correct_answer}". Điểm 10 cho con! 🎉</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Chưa đúng rồi. Con hãy xem lại gợi ý hoặc thử lại nhé!</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 3: Sentence Reordering (Sắp xếp từ thành câu) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-black flex items-center justify-center text-lg">
            3️⃣
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              PHẦN 3: SẮP XẾP TỪ THÀNH CÂU HOÀN CHỈNH (Sentence Reordering)
            </h3>
            <p className="text-xs text-slate-500">
              Chạm vào từng từ để xếp thành câu đúng ngữ pháp, sau đó bấm Kiểm tra
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {practice.sentence_reorder.map((sr, idx) => {
            const assembled = reorderedWords[sr.id] || [];
            const result = reorderResults[sr.id];
            const isCorrect = result === true;
            const hasChecked = result !== null && result !== undefined;

            // Remaining available words to pick
            const availableWords = [...sr.scrambled_words];
            // Remove used instances
            assembled.forEach((w) => {
              const findIdx = availableWords.indexOf(w);
              if (findIdx !== -1) availableWords.splice(findIdx, 1);
            });

            return (
              <div
                key={sr.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-4"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-400 text-rose-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Ghép câu hoàn chỉnh:
                  </p>
                </div>

                {/* Assembled Sentence Drop Area */}
                <div className="min-h-[52px] p-3 rounded-2xl bg-white border-2 border-dashed border-slate-300 flex flex-wrap items-center gap-2">
                  {assembled.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      (Chạm các từ bên dưới để đưa vào đây...)
                    </span>
                  ) : (
                    assembled.map((word, wordIdx) => (
                      <button
                        key={wordIdx}
                        onClick={() => handleRemoveWordFromSentence(sr.id, wordIdx)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1 active:scale-95"
                        title="Chạm để bỏ từ này"
                      >
                        <span>{word}</span>
                        <span className="text-[10px] text-emerald-200">✕</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Available Scrambled Word Bank */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 mr-1">Kho từ:</span>
                  {availableWords.map((word, wordIdx) => (
                    <button
                      key={wordIdx}
                      onClick={() => handleAddWordToSentence(sr.id, word)}
                      className="bg-white hover:bg-amber-100 text-slate-800 hover:text-amber-900 border border-slate-300 hover:border-amber-400 font-bold text-xs sm:text-sm px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer active:scale-95"
                    >
                      {word}
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCheckReorder(sr.id, sr.correct_sentence)}
                    disabled={assembled.length === 0}
                    className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-xs active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kiểm tra câu</span>
                  </button>

                  <button
                    onClick={() => handleResetReorder(sr.id)}
                    className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại</span>
                  </button>
                </div>

                {/* Feedback */}
                {hasChecked && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    {isCorrect ? (
                      <div>
                        🎉 Tuyệt vời! Câu hoàn chỉnh chuẩn xác: "{sr.correct_sentence}"
                      </div>
                    ) : (
                      <div>
                        ❌ Chưa chính xác. Gợi ý: Hãy chú ý từ viết hoa đầu câu và dấu câu ở cuối nhé!
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Encouragement Footer Signed by Ms Phương */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white text-3xl flex items-center justify-center">
            👩‍🏫
          </div>
          <div>
            <h4 className="font-black text-base sm:text-lg">
              Lời nhắn nhủ từ Cô Phương
            </h4>
            <p className="text-xs sm:text-sm text-amber-50">
              "Mỗi ngày luyện tập một chút sẽ giúp các con làm chủ môn Tiếng Anh và tự tin bước ra thế giới!"
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="bg-white/20 text-xs font-bold px-3 py-1.5 rounded-full">
            Trường Tiểu học Tân Hưng
          </span>
        </div>
      </div>
    </div>
  );
};
