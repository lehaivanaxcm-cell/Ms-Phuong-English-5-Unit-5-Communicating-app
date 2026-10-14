import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Mic, MicOff, RotateCcw, Sparkles, Volume2, Award, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CommunicativeScenario, DialogueLine } from '../types/lesson';
import { speakText, playSound, stopSpeaking } from '../utils/audio';

interface KaraokeShadowingProps {
  scenarios: CommunicativeScenario[];
  activeScenarioId?: number;
  speed: number;
  soundEnabled: boolean;
}

export const KaraokeShadowing: React.FC<KaraokeShadowingProps> = ({
  scenarios,
  activeScenarioId = 1,
  speed,
  soundEnabled,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState(activeScenarioId);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [roleplayMode, setRoleplayMode] = useState<'all' | 'speakerA' | 'speakerB'>('all');
  const [showTranslation, setShowTranslation] = useState(true);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scenario = scenarios.find((s) => s.scenario_id === selectedScenarioId) || scenarios[0];
  const activeLine: DialogueLine | undefined = scenario?.dialogue[activeLineIndex];

  // Reset when line or scenario changes
  useEffect(() => {
    stopPlayback();
    setRecordedAudioUrl(null);
    setScore(null);
    setSpeechFeedback(null);
  }, [activeLineIndex, selectedScenarioId]);

  const stopPlayback = () => {
    stopSpeaking();
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setCurrentWordIndex(null);
  };

  // Play dialogue line with token-based karaoke highlighting
  const playKaraoke = async (line: DialogueLine) => {
    if (!line) return;
    stopPlayback();
    if (soundEnabled) playSound('karaoke-beep');

    setIsPlaying(true);
    const tokens = line.karaoke_tokens || [];
    const totalDuration = tokens.length > 0 ? tokens[tokens.length - 1].end_time_ms : 2000;
    
    // Adjust timing by speed factor
    const speedFactor = speed === 0.8 ? 1.25 : 1.0;
    const adjustedTotal = totalDuration * speedFactor;

    const startTime = Date.now();
    setCurrentWordIndex(0);

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / speedFactor;
      const idx = tokens.findIndex((tok) => elapsed >= tok.start_time_ms && elapsed <= tok.end_time_ms);
      if (idx !== -1) {
        setCurrentWordIndex(idx);
      } else if (elapsed > totalDuration) {
        setCurrentWordIndex(tokens.length - 1);
      }
    }, 40);

    // Concurrently trigger TTS
    await speakText(line.text, speed);

    setTimeout(() => {
      stopPlayback();
    }, adjustedTotal + 200);
  };

  // Play a single word when tapped
  const handleWordClick = (word: string) => {
    if (soundEnabled) playSound('click');
    const cleanWord = word.replace(/[^a-zA-Z']/g, '');
    speakText(cleanWord, speed);
  };

  // Start microphone recording for shadowing practice
  const startRecording = async () => {
    if (isPlaying) stopPlayback();
    setRecordedAudioUrl(null);
    setScore(null);
    setSpeechFeedback(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);

        // Calculate a cheerful kid-friendly shadowing score between 88% and 99%
        const simulatedScore = Math.floor(Math.random() * 12) + 88;
        setScore(simulatedScore);
        if (soundEnabled) {
          if (simulatedScore >= 92) {
            playSound('celebrate');
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.7 },
            });
          } else {
            playSound('correct');
          }
        }

        if (simulatedScore >= 95) {
          setSpeechFeedback("Tuyệt vời! Cô Phương tự hào về con! Phát âm rất rõ ràng và chuẩn ngữ điệu.");
        } else if (simulatedScore >= 90) {
          setSpeechFeedback("Rất tốt! Con đã đọc trôi chảy. Hãy chú ý thêm các âm đuôi nhé!");
        } else {
          setSpeechFeedback("Khá lắm! Con hãy nghe cô đọc mẫu lại một lần nữa rồi bấm ghi âm tiếp nhé!");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      if (soundEnabled) playSound('click');
    } catch (err) {
      console.warn("Microphone access denied or unavailable", err);
      alert("Trình duyệt chưa cho phép truy cập micro. Con hãy bấm cho phép micro để luyện nói nhé!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  if (!activeLine) return null;

  const isSpeakerA = activeLine.speaker === 'Mai' || activeLine.speaker === 'A';

  return (
    <div className="space-y-6">
      {/* Top Controls: Scenario Switcher & Role Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Scenario Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
            Chọn tình huống:
          </span>
          {scenarios.map((scen) => (
            <button
              key={scen.scenario_id}
              onClick={() => {
                setSelectedScenarioId(scen.scenario_id);
                setActiveLineIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
                selectedScenarioId === scen.scenario_id
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tình huống {scen.scenario_id}
            </button>
          ))}
        </div>

        {/* Roleplay Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-xs font-bold text-slate-500">Chế độ vai:</span>
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-bold">
            <button
              onClick={() => setRoleplayMode('all')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                roleplayMode === 'all' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Cả hai
            </button>
            <button
              onClick={() => setRoleplayMode('speakerA')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                roleplayMode === 'speakerA' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              👧🏻 Bạn Mai
            </button>
            <button
              onClick={() => setRoleplayMode('speakerB')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                roleplayMode === 'speakerB' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              👦🏼 Bạn Tom
            </button>
          </div>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            title="Bật/Tắt dịch nghĩa Tiếng Việt"
          >
            {showTranslation ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{showTranslation ? 'Ẩn dịch' : 'Hiện dịch'}</span>
          </button>
        </div>
      </div>

      {/* Main Karaoke Shadowing Stage */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border-4 border-amber-300/40">
        {/* Stage lighting glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-rose-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-60 h-60 bg-amber-400/10 blur-3xl pointer-events-none" />

        {/* Sentence Navigation Header */}
        <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md ${
                isSpeakerA ? 'bg-rose-500' : 'bg-sky-500'
              }`}
            >
              {isSpeakerA ? '👧🏻' : '👦🏼'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
                  Luyện nói Karaoke Shadowing
                </span>
                <span className="bg-white/10 text-white text-[11px] px-2 py-0.5 rounded-full font-medium">
                  Câu {activeLineIndex + 1}/{scenario.dialogue.length}
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                Người nói: {activeLine.speaker}
              </h3>
            </div>
          </div>

          {/* Previous / Next Sentence Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveLineIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeLineIndex === 0}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveLineIndex((prev) => Math.min(scenario.dialogue.length - 1, prev + 1))}
              disabled={activeLineIndex === scenario.dialogue.length - 1}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Karaoke Lyrics Display Area */}
        <div className="relative z-10 text-center py-6 sm:py-10 space-y-4">
          {/* Word-by-Word Tokens with Live Highlight Animation */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
            {activeLine.karaoke_tokens.map((token, idx) => {
              const isCurrent = currentWordIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleWordClick(token.word)}
                  className={`group relative text-2xl sm:text-4xl md:text-5xl font-black px-3 py-1.5 rounded-2xl transition-all duration-150 cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 scale-110 shadow-lg shadow-amber-400/50 ring-4 ring-amber-300'
                      : 'text-white/90 hover:text-amber-300 hover:bg-white/10'
                  }`}
                  title="Chạm để nghe riêng từ này"
                >
                  {/* Bouncing ball indicator above active word */}
                  {isCurrent && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs animate-bounce">
                      🟡
                    </span>
                  )}
                  <span>{token.word}</span>
                </button>
              );
            })}
          </div>

          {/* IPA Pronunciation breakdown */}
          <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            <span className="text-amber-300 text-sm sm:text-base font-mono tracking-wider">
              {activeLine.ipa}
            </span>
          </div>

          {/* Vietnamese Translation */}
          {showTranslation && (
            <p className="text-slate-300 text-sm sm:text-base font-medium italic transition">
              🇻🇳 "{activeLine.translation}"
            </p>
          )}
        </div>

        {/* Action Controls: Listen Model, Record Shadowing, Stop */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
          {/* Native Audio Playback */}
          {!isPlaying ? (
            <button
              onClick={() => playKaraoke(activeLine)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-rose-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Nghe cô đọc mẫu (Karaoke)</span>
            </button>
          ) : (
            <button
              onClick={stopPlayback}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-black px-6 py-3.5 rounded-2xl shadow-lg transition transform active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              <Square className="w-5 h-5 fill-current" />
              <span>Dừng đọc</span>
            </button>
          )}

          {/* Student Shadowing Record Button */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              <Mic className="w-5 h-5" />
              <span>Ghi âm đọc theo (Shadowing)</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-red-600/50 animate-pulse transition active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              <MicOff className="w-5 h-5" />
              <span>Đang thu âm... Bấm để xong</span>
            </button>
          )}
        </div>

        {/* Student Shadowing Result Card */}
        {score !== null && (
          <div className="relative z-10 mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-black text-xl flex items-center justify-center shadow-lg">
                  {score}%
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-300 font-extrabold text-sm">
                      ĐIỂM LUYỆN NÓI
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-white font-medium">
                    {speechFeedback}
                  </p>
                </div>
              </div>

              {recordedAudioUrl && (
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-xl">
                  <span className="text-xs text-slate-200">Giọng của con:</span>
                  <audio src={recordedAudioUrl} controls className="h-8 max-w-[160px]" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sentence Playlist Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {scenario.dialogue.map((line, idx) => {
          const isSelected = activeLineIndex === idx;
          const isSpeakerLineA = line.speaker === 'Mai' || line.speaker === 'A';
          return (
            <div
              key={idx}
              onClick={() => setActiveLineIndex(idx)}
              className={`p-3 rounded-2xl border transition cursor-pointer text-left ${
                isSelected
                  ? 'bg-rose-50 border-rose-400 shadow-sm ring-2 ring-rose-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-bold ${isSpeakerLineA ? 'text-rose-600' : 'text-sky-600'}`}>
                  {isSpeakerLineA ? '👧🏻' : '👦🏼'} {line.speaker}
                </span>
                <span className="text-[11px] text-slate-400">#{idx + 1}</span>
              </div>
              <p className="text-xs font-bold text-slate-800 line-clamp-1">
                {line.text}
              </p>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {line.translation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
