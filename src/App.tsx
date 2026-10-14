import React, { useState } from 'react';
import { primaryJobsLesson, sampleLessonsList } from './data/defaultLessons';
import { LessonModule } from './types/lesson';
import { Header } from './components/Header';
import { WelcomeBanner } from './components/WelcomeBanner';
import { ScenarioCard } from './components/ScenarioCard';
import { TextbookComicStrip } from './components/TextbookComicStrip';
import { KaraokeShadowing } from './components/KaraokeShadowing';
import { CommunicationExpansion } from './components/CommunicationExpansion';
import { PracticeSection } from './components/PracticeSection';
import { JsonViewerModal } from './components/JsonViewerModal';
import { AiLessonGeneratorModal } from './components/AiLessonGeneratorModal';
import { Sparkles, BookOpen, Mic, MessageSquare, Award, Code2 } from 'lucide-react';

export default function App() {
  const [currentLesson, setCurrentLesson] = useState<LessonModule>(primaryJobsLesson);
  const [activeTab, setActiveTab] = useState<'scenarios' | 'karaoke' | 'expansion' | 'practice' | 'json'>('scenarios');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speed, setSpeed] = useState(0.85); // 0.85x slow speed tailored for primary kids
  const [selectedScenarioIdForKaraoke, setSelectedScenarioIdForKaraoke] = useState(1);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleGoToKaraoke = (scenarioId: number) => {
    setSelectedScenarioIdForKaraoke(scenarioId);
    setActiveTab('karaoke');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Main Header */}
      <Header
        brand={currentLesson.brand_header}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        speed={speed}
        setSpeed={setSpeed}
        onOpenAiGenerator={() => setIsAiModalOpen(true)}
      />

      {/* Lesson Quick-Switch Banner */}
      <div className="bg-amber-50/70 border-b border-amber-200/60 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Bài học hiện tại:</span>
            </span>
            <span className="bg-white border border-amber-300 text-amber-950 font-extrabold px-2.5 py-0.5 rounded-lg shadow-2xs">
              {currentLesson.lesson_info.topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium hidden md:inline">Đổi bài học SGK:</span>
            {sampleLessonsList.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentLesson(item.data)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currentLesson.lesson_info.topic === item.data.lesson_info.topic
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100 border border-slate-200'
                }`}
              >
                {item.id === 'jobs-grade5' ? 'Tranh Lớp 5 (Jobs)' : 'Lớp 5 (Free time)'}
              </button>
            ))}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold px-2.5 py-1 rounded-lg shadow-xs hover:from-emerald-500 hover:to-teal-500 transition cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>+ Tạo từ SGK</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Module 1: Welcome & Contextual Simulation */}
        {activeTab === 'scenarios' && (
          <div className="space-y-8 animate-fade-in">
            {/* Teacher Greeting & Target Knowledge */}
            <WelcomeBanner
              brand={currentLesson.brand_header}
              lessonInfo={currentLesson.lesson_info}
              speed={speed}
              soundEnabled={soundEnabled}
            />

            {/* Interactive Comic Strip representation matching the user's uploaded textbook image */}
            <TextbookComicStrip
              speed={speed}
              soundEnabled={soundEnabled}
              onGoToKaraoke={handleGoToKaraoke}
            />

            {/* Contextual Situational Learning Cards */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
                    TÌNH HUỐNG GIAO TIẾP THỰC TẾ (Communicative Scenarios)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Ứng dụng cấu trúc SGK vào các cuộc trò chuyện hàng ngày của học sinh Tiểu học
                  </p>
                </div>
              </div>

              {currentLesson.communicative_scenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.scenario_id}
                  scenario={scenario}
                  onGoToKaraoke={handleGoToKaraoke}
                  speed={speed}
                  soundEnabled={soundEnabled}
                />
              ))}
            </div>
          </div>
        )}

        {/* Module 2: Karaoke Shadowing */}
        {activeTab === 'karaoke' && (
          <div className="animate-fade-in">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
                PHÒNG LUYỆN NÓI KARAOKE SHADOWING
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Luyện phát âm từng từ theo vạch sáng, nghe mẫu bản xứ và ghi âm giọng nói của con để nhận điểm 10!
              </p>
            </div>

            <KaraokeShadowing
              scenarios={currentLesson.communicative_scenarios}
              activeScenarioId={selectedScenarioIdForKaraoke}
              speed={speed}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        {/* Module 3: Expanded Communication */}
        {activeTab === 'expansion' && (
          <div className="animate-fade-in">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
                MỞ RỘNG GIAO TIẾP & BÍ QUYẾT TỪ CÔ PHƯƠNG
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Thực hành ứng biến tự nhiên với các nghề nghiệp khác nhau và bí kíp ngữ điệu chuẩn bản xứ.
              </p>
            </div>

            <CommunicationExpansion
              scenarios={currentLesson.communicative_scenarios}
              speed={speed}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        {/* Module 4: Interactive Practice */}
        {activeTab === 'practice' && (
          <div className="animate-fade-in">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
                BÀI TẬP CỦNG CỐ SAU BÀI ĐỌC & NÓI
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Làm bài trắc nghiệm, điền từ vào chỗ trống và sắp xếp câu để tích lũy ngôi sao khen thưởng từ Cô Phương!
              </p>
            </div>

            <PracticeSection
              practice={currentLesson.practice_exercises}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        {/* JSON Schema View */}
        {activeTab === 'json' && (
          <div className="animate-fade-in">
            <JsonViewerModal
              lessonData={currentLesson}
              onOpenAiGenerator={() => setIsAiModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* AI Lesson Generator Modal */}
      <AiLessonGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectLesson={(newLesson) => {
          setCurrentLesson(newLesson);
          setActiveTab('scenarios');
        }}
      />

      {/* Primary EdTech School Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-3 font-semibold text-slate-700">
          <span>👩‍🏫 Ms Phương English</span>
          <span>•</span>
          <span>🏫 Trường Tiểu học Tân Hưng</span>
          <span>•</span>
          <span>📖 SGK Tiếng Anh Tiểu học</span>
          <span>•</span>
          <span>🌟 Communicative Language Teaching (CLT)</span>
        </div>
        <p className="max-w-xl mx-auto text-slate-400">
          Chương trình học tập tương tác tại nhà dành cho học sinh Tiểu học Tân Hưng. Kết hợp công nghệ Karaoke Shadowing và luyện nói trực quan theo định hướng phát triển phẩm chất & năng lực người học.
        </p>
      </footer>
    </div>
  );
}
