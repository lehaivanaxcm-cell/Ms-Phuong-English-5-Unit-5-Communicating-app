import React, { useState } from 'react';
import { X, Sparkles, Upload, Loader2, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { LessonModule } from '../types/lesson';
import { sampleLessonsList } from '../data/defaultLessons';

interface AiLessonGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: LessonModule) => void;
}

export const AiLessonGeneratorModal: React.FC<AiLessonGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
}) => {
  const [prompt, setPrompt] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      // Strip data:image/...;base64,
      const base64Data = result.split(',')[1];
      setImageBase64(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !imageBase64) {
      setErrorMessage('Vui lòng nhập tên bài học hoặc tải ảnh trang sách giáo khoa lên.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          imageBase64: imageBase64,
          imageMimeType: 'image/png',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Lỗi khi tạo bài học bằng AI.');
      }

      const generatedLesson: LessonModule = await response.json();
      onSelectLesson(generatedLesson);
      onClose();
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error);
      setErrorMessage(
        error.message ||
          'Không thể kết nối với dịch vụ AI. Con có thể chọn các bài học mẫu có sẵn bên dưới nhé!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-black font-heading">
                Tạo Bài Học Mới Bằng AI (SGK Tiếng Anh)
              </h3>
              <p className="text-xs text-emerald-100">
                Ms Phương English - Trường Tiểu học Tân Hưng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Preset Curriculum Quick-Pick */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Hoặc chọn nhanh bài mẫu SGK có sẵn:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sampleLessonsList.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectLesson(preset.data);
                    onClose();
                  }}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/60 text-left transition cursor-pointer flex items-start gap-2.5 group"
                >
                  <BookOpen className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-sm">
                      {preset.grade}
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                      {preset.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Tạo bài học mới từ SGK hoặc chủ đề mong muốn:
            </h4>

            {/* Prompt input */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Tên bài học hoặc nội dung hội thoại SGK:
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="Ví dụ: Unit 16: Where is the post office? - Đoạn hội thoại hỏi đường đến bưu điện và hiệu thuốc..."
                className="w-full p-3 rounded-2xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Optional image upload */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Ảnh chụp trang SGK (Tuỳ chọn):
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-xs font-bold transition cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Tải ảnh SGK lên</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <div className="flex items-center gap-2">
                    <img
                      src={imagePreview}
                      alt="SGK Preview"
                      className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                    />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setImageBase64(null);
                      }}
                      className="text-xs text-rose-500 font-bold hover:underline"
                    >
                      Xoá ảnh
                    </button>
                  </div>
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Generate Button */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Huỷ
              </button>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Cô Phương AI đang thiết kế bài học...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Tạo bài học ngay</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
