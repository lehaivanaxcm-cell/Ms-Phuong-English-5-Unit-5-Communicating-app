export interface KaraokeToken {
  word: string;
  start_time_ms: number;
  end_time_ms: number;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  ipa: string;
  translation: string;
  karaoke_tokens: KaraokeToken[];
}

export interface CommunicationExpansion {
  ms_phuong_tip: string;
  alternative_responses: string[];
}

export interface CommunicativeScenario {
  scenario_id: number;
  context_title: string;
  context_description: string;
  image_prompt: string;
  dialogue: DialogueLine[];
  communication_expansion: CommunicationExpansion;
}

export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface FillInBlankQuestion {
  id: number;
  sentence: string;
  correct_answer: string;
  hint: string;
}

export interface SentenceReorderQuestion {
  id: number;
  scrambled_words: string[];
  correct_sentence: string;
}

export interface PracticeExercises {
  multiple_choice: MultipleChoiceQuestion[];
  fill_in_blank: FillInBlankQuestion[];
  sentence_reorder: SentenceReorderQuestion[];
}

export interface BrandHeader {
  teacher: string;
  school: string;
  welcome_message: string;
}

export interface LessonInfo {
  topic: string;
  target_structures: string[];
  target_vocabulary: string[];
}

export interface LessonModule {
  brand_header: BrandHeader;
  lesson_info: LessonInfo;
  communicative_scenarios: CommunicativeScenario[];
  practice_exercises: PracticeExercises;
}
