import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '20mb' }));

  // Initialize Google Gen AI
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Endpoint: Generate new lesson module according to the exact JSON schema
  app.post('/api/generate-lesson', async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server. Please check the Secrets panel in AI Studio.',
        });
      }

      const { prompt, imageBase64, imageMimeType } = req.body;

      const systemPrompt = `You are an expert AI Instructional Designer and EdTech Application Developer. 
Your mission is to generate interactive, communicative home-practice modules tailored for primary school students in Vietnam.

- Brand / Teacher: Ms Phương English
- School: Tân Hưng Primary School (Trường Tiểu học Tân Hưng)
- Target Audience: Primary students practicing English at home after class.
- Pedagogical Focus: Communicative Language Teaching (CLT), Visual Situational Learning, Karaoke Shadowing, and Interactive Assessment.

Generate a complete, structured JSON response with 4 main modules:
1. BRANDED WELCOME & CONTEXTUAL SIMULATION (Tình huống ứng dụng & Hình ảnh)
2. KARAOKE SHADOWING MODULE (Luyện nói Karaoke with word-by-word timestamps in milliseconds)
3. EXPANDED COMMUNICATION (Mở rộng giao tiếp with tips from Ms Phương)
4. INTERACTIVE PRACTICE (Trắc nghiệm, Điền từ, Sắp xếp câu)

Respond ONLY with valid JSON strictly conforming to this schema:
{
  "brand_header": {
    "teacher": "Ms Phương English",
    "school": "Tân Hưng Primary School",
    "welcome_message": "string (Friendly greeting from Ms Phương to Tân Hưng students)"
  },
  "lesson_info": {
    "topic": "string",
    "target_structures": ["string"],
    "target_vocabulary": ["string"]
  },
  "communicative_scenarios": [
    {
      "scenario_id": 1,
      "context_title": "string",
      "context_description": "string (Tình huống giao tiếp thực tế)",
      "image_prompt": "string (Detailed prompt for visual illustration)",
      "dialogue": [
        {
          "speaker": "A / B",
          "text": "string",
          "ipa": "string",
          "translation": "string",
          "karaoke_tokens": [
            {"word": "string", "start_time_ms": 0, "end_time_ms": 500}
          ]
        }
      ],
      "communication_expansion": {
        "ms_phuong_tip": "string (Lời khuyên từ cô Phương)",
        "alternative_responses": ["string"]
      }
    }
  ],
  "practice_exercises": {
    "multiple_choice": [
      {
        "id": 1,
        "question": "string",
        "options": ["A", "B", "C", "D"],
        "correct_answer": "string",
        "explanation": "string"
      }
    ],
    "fill_in_blank": [
      {
        "id": 1,
        "sentence": "string with [blank]",
        "correct_answer": "string",
        "hint": "string"
      }
    ],
    "sentence_reorder": [
      {
        "id": 1,
        "scrambled_words": ["word1", "word2", "word3"],
        "correct_sentence": "string"
      }
    ]
  }
}`;

      const contents: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

      if (imageBase64) {
        contents.push({
          inlineData: {
            mimeType: imageMimeType || 'image/png',
            data: imageBase64,
          },
        });
      }

      contents.push({
        text: `${systemPrompt}\n\nUser textbook input or request: ${prompt || 'Generate a communicative English home practice module for Vietnamese primary school students based on the provided material.'}`,
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts: contents },
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      } catch (parseErr) {
        console.error('Failed to parse Gemini output as JSON:', text);
        return res.status(500).json({ error: 'Failed to generate valid JSON format from model.', raw: text });
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Error in /api/generate-lesson:', error);
      return res.status(500).json({ error: error.message || 'Server error occurred' });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ms Phương English App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
