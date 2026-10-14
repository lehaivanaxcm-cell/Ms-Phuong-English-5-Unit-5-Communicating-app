import { LessonModule } from '../types/lesson';

export const primaryJobsLesson: LessonModule = {
  brand_header: {
    teacher: "Ms Phương English",
    school: "Tân Hưng Primary School (Trường Tiểu học Tân Hưng)",
    welcome_message: "Chào mừng các con học sinh thân yêu của Trường Tiểu học Tân Hưng! Hôm nay cô Phương sẽ cùng các con luyện tập bài học 'What would you like to be in the future?' (Nghề nghiệp tương lai). Hãy luyện nói thật to, rõ ràng và cùng đạt điểm 10 với cô nhé! 🌟"
  },
  lesson_info: {
    topic: "Unit 15: What would you like to be in the future? (Nghề nghiệp trong tương lai)",
    target_structures: [
      "What's his / her job? - He's / She's a [job].",
      "What would you like to be in the future? - I'd like to be a / an [job].",
      "Why would you like to be a [job]? - Because I'd like to [action]."
    ],
    target_vocabulary: [
      "doctor (bác sĩ)",
      "hospital (bệnh viện)",
      "look after patients (chăm sóc bệnh nhân)",
      "future (tương lai)",
      "job (nghề nghiệp)",
      "father (bố / ba)",
      "teacher (giáo viên)",
      "pilot (phi công)",
      "architect (kiến trúc sư)"
    ]
  },
  communicative_scenarios: [
    {
      scenario_id: 1,
      context_title: "Tình huống 1: Giới thiệu nghề nghiệp của người thân (At Mai's Living Room)",
      context_description: "Bạn Tom đến nhà bạn Mai chơi vào chiều thứ Bảy. Khi ngồi trên ghế sofa, Tom nhìn thấy bức ảnh gia đình trên tường. Mai mỉm cười chỉ tay vào bức ảnh và hào hứng giới thiệu về bố của mình.",
      image_prompt: "Warm and cheerful 2D children's textbook illustration: an Asian primary school girl with short dark hair in a pink polo shirt pointing proudly to a framed photo on the living room wall, talking to a curly-haired boy in a sky blue t-shirt sitting on a cozy green sofa, bright cozy room with family portraits, flat vector comic style for elementary English.",
      dialogue: [
        {
          speaker: "Mai",
          text: "That's my father.",
          ipa: "/ðæts maɪ ˈfɑː.ðər/",
          translation: "Đó là bố của mình.",
          karaoke_tokens: [
            { word: "That's", start_time_ms: 0, end_time_ms: 450 },
            { word: "my", start_time_ms: 450, end_time_ms: 750 },
            { word: "father.", start_time_ms: 750, end_time_ms: 1300 }
          ]
        },
        {
          speaker: "Tom",
          text: "What's his job?",
          ipa: "/wɒts hɪz dʒɒb/",
          translation: "Bác ấy làm nghề gì thế?",
          karaoke_tokens: [
            { word: "What's", start_time_ms: 0, end_time_ms: 400 },
            { word: "his", start_time_ms: 400, end_time_ms: 700 },
            { word: "job?", start_time_ms: 700, end_time_ms: 1200 }
          ]
        },
        {
          speaker: "Mai",
          text: "He's a doctor.",
          ipa: "/hiːz ə ˈdɒk.tər/",
          translation: "Bố mình là một bác sĩ.",
          karaoke_tokens: [
            { word: "He's", start_time_ms: 0, end_time_ms: 400 },
            { word: "a", start_time_ms: 400, end_time_ms: 600 },
            { word: "doctor.", start_time_ms: 600, end_time_ms: 1250 }
          ]
        },
        {
          speaker: "Tom",
          text: "Cool!",
          ipa: "/kuːl/",
          translation: "Tuyệt quá!",
          karaoke_tokens: [
            { word: "Cool!", start_time_ms: 0, end_time_ms: 800 }
          ]
        }
      ],
      communication_expansion: {
        ms_phuong_tip: "Lời khuyên từ cô Phương: Khi ai đó giới thiệu một nghề nghiệp đáng tự hào, con hãy dùng thán từ tự nhiên như 'Cool!', 'Awesome!' hoặc 'That's great!' để cuộc hội thoại thêm phần sinh động và ấm áp nhé!",
        alternative_responses: [
          "What does he do? - He works at a central children's hospital.",
          "That's wonderful! Being a doctor is so helpful to society.",
          "Does he like his job? - Yes, he loves helping sick people get better."
        ]
      }
    },
    {
      scenario_id: 2,
      context_title: "Tình huống 2: Chia sẻ ước mơ nghề nghiệp tương lai (Talking about Future Dreams)",
      context_description: "Sau khi biết bố Mai là bác sĩ, Tom tò mò hỏi về ước mơ sau này của Mai. Trong suy nghĩ của mình, Mai tưởng tượng hình ảnh khoác áo blouse trắng, đeo ống nghe và tự tin nói về ước mơ trở thành bác sĩ.",
      image_prompt: "Vibrant storybook illustration for children: a curly-haired red-headed boy in a blue shirt asking a question to an Asian schoolgirl on a sofa, with a dreamy cloud bubble showing her as a confident doctor in white medical coat with stethoscope and chart, warm friendly atmosphere, primary school learning style.",
      dialogue: [
        {
          speaker: "Tom",
          text: "What would you like to be in the future?",
          ipa: "/wɒt wʊd juː laɪk tuː biː ɪn ðə ˈfjuː.tʃər/",
          translation: "Cậu muốn làm nghề gì trong tương lai?",
          karaoke_tokens: [
            { word: "What", start_time_ms: 0, end_time_ms: 350 },
            { word: "would", start_time_ms: 350, end_time_ms: 650 },
            { word: "you", start_time_ms: 650, end_time_ms: 900 },
            { word: "like", start_time_ms: 900, end_time_ms: 1200 },
            { word: "to", start_time_ms: 1200, end_time_ms: 1400 },
            { word: "be", start_time_ms: 1400, end_time_ms: 1700 },
            { word: "in", start_time_ms: 1700, end_time_ms: 1900 },
            { word: "the", start_time_ms: 1900, end_time_ms: 2100 },
            { word: "future?", start_time_ms: 2100, end_time_ms: 2700 }
          ]
        },
        {
          speaker: "Mai",
          text: "I'd like to be a doctor, too.",
          ipa: "/aɪd laɪk tuː biː ə ˈdɒk.tər tuː/",
          translation: "Mình cũng muốn trở thành một bác sĩ.",
          karaoke_tokens: [
            { word: "I'd", start_time_ms: 0, end_time_ms: 350 },
            { word: "like", start_time_ms: 350, end_time_ms: 700 },
            { word: "to", start_time_ms: 700, end_time_ms: 900 },
            { word: "be", start_time_ms: 900, end_time_ms: 1200 },
            { word: "a", start_time_ms: 1200, end_time_ms: 1400 },
            { word: "doctor,", start_time_ms: 1400, end_time_ms: 1950 },
            { word: "too.", start_time_ms: 1950, end_time_ms: 2400 }
          ]
        },
        {
          speaker: "Tom",
          text: "Why would you like to be a doctor?",
          ipa: "/waɪ wʊd juː laɪk tuː biː ə ˈdɒk.tər/",
          translation: "Tại sao cậu lại thích làm bác sĩ?",
          karaoke_tokens: [
            { word: "Why", start_time_ms: 0, end_time_ms: 400 },
            { word: "would", start_time_ms: 400, end_time_ms: 700 },
            { word: "you", start_time_ms: 700, end_time_ms: 950 },
            { word: "like", start_time_ms: 950, end_time_ms: 1250 },
            { word: "to", start_time_ms: 1250, end_time_ms: 1450 },
            { word: "be", start_time_ms: 1450, end_time_ms: 1750 },
            { word: "a", start_time_ms: 1750, end_time_ms: 1950 },
            { word: "doctor?", start_time_ms: 1950, end_time_ms: 2550 }
          ]
        },
        {
          speaker: "Mai",
          text: "Because I'd like to look after patients.",
          ipa: "/bɪˈkɒz aɪd laɪk tuː lʊk ˈɑːf.tər ˈpeɪ.ʃənts/",
          translation: "Bởi vì mình muốn chăm sóc các bệnh nhân.",
          karaoke_tokens: [
            { word: "Because", start_time_ms: 0, end_time_ms: 500 },
            { word: "I'd", start_time_ms: 500, end_time_ms: 800 },
            { word: "like", start_time_ms: 800, end_time_ms: 1100 },
            { word: "to", start_time_ms: 1100, end_time_ms: 1300 },
            { word: "look", start_time_ms: 1300, end_time_ms: 1600 },
            { word: "after", start_time_ms: 1600, end_time_ms: 2000 },
            { word: "patients.", start_time_ms: 2000, end_time_ms: 2700 }
          ]
        }
      ],
      communication_expansion: {
        ms_phuong_tip: "Mẹo nhỏ của cô Phương: 'I'd like to be' viết tắt của 'I would like to be'. Đọc lướt nhẹ 'I'd' (/aɪd/) để câu nói tự nhiên như người bản xứ nhé! Nhớ lưu ý mạo từ 'a' đi với phụ âm (a doctor, a teacher) và 'an' đi với nguyên âm (an architect, an engineer).",
        alternative_responses: [
          "I'd like to be an architect because I want to design beautiful buildings.",
          "I'd like to be a pilot because I would love to fly planes across the world.",
          "I'd like to be a teacher because I want to teach English to young students."
        ]
      }
    }
  ],
  practice_exercises: {
    multiple_choice: [
      {
        id: 1,
        question: "What is Mai's father's job?",
        options: [
          "A. He is a teacher",
          "B. He is a doctor",
          "C. He is a pilot",
          "D. He is an architect"
        ],
        correct_answer: "B. He is a doctor",
        explanation: "Trong bài đối thoại ở tranh a, Mai nói rõ: 'That's my father. He's a doctor.' Cô Phương khen con đã lắng nghe rất kỹ! 🎉"
      },
      {
        id: 2,
        question: "Choose the correct question: '______ would you like to be in the future?'",
        options: [
          "A. Where",
          "B. When",
          "C. What",
          "D. How"
        ],
        correct_answer: "C. What",
        explanation: "Để hỏi về ước mơ nghề nghiệp trong tương lai, chúng ta dùng mẫu câu chuẩn SGK: 'What would you like to be in the future?' 🌟"
      },
      {
        id: 3,
        question: "Complete the sentence: 'Tony would like to be ______ architect.'",
        options: [
          "A. a",
          "B. an",
          "C. the",
          "D. two"
        ],
        correct_answer: "B. an",
        explanation: "Từ 'architect' bắt đầu bằng nguyên âm 'a', nên cô Phương nhắc con dùng mạo từ 'an architect' nhé! 👏"
      },
      {
        id: 4,
        question: "Why would Mai like to be a doctor?",
        options: [
          "A. Because she wants to fly airplanes",
          "B. Because she'd like to look after patients",
          "C. Because she wants to design schools",
          "D. Because she likes drawing pictures"
        ],
        correct_answer: "B. Because she'd like to look after patients",
        explanation: "Mai muốn làm bác sĩ vì: 'Because I'd like to look after patients' (chăm sóc bệnh nhân). Xuất sắc lắm con ơi! 💖"
      }
    ],
    fill_in_blank: [
      {
        id: 1,
        sentence: "What would you like to be in the [blank]?",
        correct_answer: "future",
        hint: "Từ có 6 chữ cái, mang nghĩa là 'tương lai' (f...e)"
      },
      {
        id: 2,
        sentence: "He is a [blank]. He works at a hospital.",
        correct_answer: "doctor",
        hint: "Nghề khám chữa bệnh và chăm sóc bệnh nhân (d...r)"
      },
      {
        id: 3,
        sentence: "I'd like to [blank] after patients.",
        correct_answer: "look",
        hint: "Cụm từ 'chăm sóc' là '[...] after'"
      },
      {
        id: 4,
        sentence: "She'd like to be a teacher because she wants to teach young [blank].",
        correct_answer: "children",
        hint: "Từ chỉ các 'em nhỏ / trẻ em' (c...n)"
      }
    ],
    sentence_reorder: [
      {
        id: 1,
        scrambled_words: ["would", "What", "like", "in", "to", "you", "the", "be", "future?"],
        correct_sentence: "What would you like to be in the future?"
      },
      {
        id: 2,
        scrambled_words: ["to", "I'd", "a", "too.", "be", "doctor,", "like"],
        correct_sentence: "I'd like to be a doctor, too."
      },
      {
        id: 3,
        scrambled_words: ["my", "father.", "doctor.", "a", "That's", "He's"],
        correct_sentence: "That's my father. He's a doctor."
      },
      {
        id: 4,
        scrambled_words: ["to", "Because", "like", "look", "I'd", "patients.", "after"],
        correct_sentence: "Because I'd like to look after patients."
      }
    ]
  }
};

export const sampleLessonsList: { id: string; title: string; grade: string; data: LessonModule }[] = [
  {
    id: "jobs-grade5",
    title: "Unit 15: What would you like to be in the future? (SGK Tranh)",
    grade: "Lớp 5 - SGK Tiếng Anh",
    data: primaryJobsLesson
  },
  {
    id: "free-time-grade5",
    title: "Unit 13: What do you do in your free time?",
    grade: "Lớp 5 - SGK Tiếng Anh",
    data: {
      brand_header: {
        teacher: "Ms Phương English",
        school: "Tân Hưng Primary School (Trường Tiểu học Tân Hưng)",
        welcome_message: "Chào các con học sinh Tân Hưng! Cùng cô Phương khám phá các hoạt động giải trí lành mạnh trong thời gian rảnh rỗi nhé! Let's practice together! 🚴‍♀️"
      },
      lesson_info: {
        topic: "Unit 13: What do you do in your free time? (Hoạt động thời gian rảnh)",
        target_structures: [
          "What do you do in your free time? - I [verb phrase].",
          "What does he / she do in his / her free time? - He / She [verbs-s/es]."
        ],
        target_vocabulary: [
          "surf the Internet (lướt mạng)",
          "ride a bike (đạp xe)",
          "read comic books (đọc truyện tranh)",
          "play sports (chơi thể thao)",
          "free time (thời gian rảnh)"
        ]
      },
      communicative_scenarios: [
        {
          scenario_id: 1,
          context_title: "Tình huống: Giờ ra chơi ở sân trường Tân Hưng (At School Yard)",
          context_description: "Trong giờ ra chơi mát mẻ tại sân trường Tiểu học Tân Hưng, Nam và Phong đang ngồi dưới tán cây phượng râm mát và trò chuyện về những việc mình thích làm khi ở nhà vào cuối tuần.",
          image_prompt: "Bright school playground under green shade trees with children playing in the background, two Vietnamese elementary students smiling and chatting happily on a school bench, modern cartoon textbook style.",
          dialogue: [
            {
              speaker: "Nam",
              text: "What do you do in your free time, Phong?",
              ipa: "/wɒt duː juː duː ɪn jɔːr friː taɪm, fɒŋ/",
              translation: "Cậu thường làm gì vào thời gian rảnh rỗi hả Phong?",
              karaoke_tokens: [
                { word: "What", start_time_ms: 0, end_time_ms: 350 },
                { word: "do", start_time_ms: 350, end_time_ms: 550 },
                { word: "you", start_time_ms: 550, end_time_ms: 750 },
                { word: "do", start_time_ms: 750, end_time_ms: 950 },
                { word: "in", start_time_ms: 950, end_time_ms: 1150 },
                { word: "your", start_time_ms: 1150, end_time_ms: 1400 },
                { word: "free", start_time_ms: 1400, end_time_ms: 1750 },
                { word: "time,", start_time_ms: 1750, end_time_ms: 2200 },
                { word: "Phong?", start_time_ms: 2200, end_time_ms: 2700 }
              ]
            },
            {
              speaker: "Phong",
              text: "I often ride my bike in the park.",
              ipa: "/aɪ ˈɒf.ən raɪd maɪ baɪk ɪn ðə pɑːk/",
              translation: "Mình thường hay đạp xe ở công viên.",
              karaoke_tokens: [
                { word: "I", start_time_ms: 0, end_time_ms: 300 },
                { word: "often", start_time_ms: 300, end_time_ms: 700 },
                { word: "ride", start_time_ms: 700, end_time_ms: 1100 },
                { word: "my", start_time_ms: 1100, end_time_ms: 1350 },
                { word: "bike", start_time_ms: 1350, end_time_ms: 1750 },
                { word: "in", start_time_ms: 1750, end_time_ms: 1950 },
                { word: "the", start_time_ms: 1950, end_time_ms: 2150 },
                { word: "park.", start_time_ms: 2150, end_time_ms: 2700 }
              ]
            }
          ],
          communication_expansion: {
            ms_phuong_tip: "Cô Phương nhắc: Chú ý phát âm âm đuôi /k/ của từ 'park' và 'bike'. Khi trả lời về sở thích, các con có thể thêm trạng từ chỉ tần suất như 'often', 'sometimes' hoặc 'usually' để câu nói phong phú hơn!",
            alternative_responses: [
              "I usually read funny comic books with my brother.",
              "I like drawing pictures and listening to music.",
              "I play badminton with my father every Sunday afternoon."
            ]
          }
        }
      ],
      practice_exercises: {
        multiple_choice: [
          {
            id: 1,
            question: "What does Phong often do in his free time?",
            options: [
              "A. He surfs the Internet",
              "B. He rides his bike in the park",
              "C. He cleans the house",
              "D. He plays computer games"
            ],
            correct_answer: "B. He rides his bike in the park",
            explanation: "Phong chia sẻ: 'I often ride my bike in the park.' Cô Phương khen con nhớ bài rất giỏi!"
          }
        ],
        fill_in_blank: [
          {
            id: 1,
            sentence: "What do you do in your [blank] time?",
            correct_answer: "free",
            hint: "Từ mang nghĩa rảnh rỗi (f...e)"
          }
        ],
        sentence_reorder: [
          {
            id: 1,
            scrambled_words: ["often", "I", "park.", "in", "bike", "my", "ride", "the"],
            correct_sentence: "I often ride my bike in the park."
          }
        ]
      }
    }
  }
];
