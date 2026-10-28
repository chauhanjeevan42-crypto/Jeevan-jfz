import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// API: AI Fitness Assistant (Jeevan Fit Zone)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini AI Assistant is not configured on this server. Please set GEMINI_API_KEY.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the official JFZ AI Fitness & Sports Performance Assistant for "JFZ — Jeevan Fit Zone", founded by Jeevan Chauhan.
Tagline: "Train Smart. Move Strong. Live Fit."
Focus areas: Hybrid Athletic Training, Strength & Conditioning, Running & Endurance, Mobility & Recovery, and Martial Arts Academy (Pencak Silat and Judo).

Tone and style:
- Professional, encouraging, scientifically grounded, respectful, and athletic.
- Respond in the language preferred by the user (Hindi, English, or Hinglish based on their query or profile).
- When answering in Hindi, keep it natural and encouraging (e.g. "नमस्ते! JFZ में आपका स्वागत है...").
- Offer practical tips on warm-ups, proper technique, rest days, hydration, and safe progression.
- Strictly adhere to safety: Provide general fitness education, NEVER give medical diagnoses or prescribe treatment for acute injuries. Advise users experiencing sharp pain, dizziness, or chest tightness to stop training immediately and consult a physician.
- Highlight that online lessons are educational and martial arts practice requires supervised, safe environments with proper protective gear.
- Keep responses concise, clean, and formatted with bullet points or brief paragraphs.`;

    // Construct conversation history for Gemini
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const conversationContext = messages
      .slice(-6)
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const promptText = `User Profile Context: ${JSON.stringify(userProfile || {})}
Conversation Context:
${conversationContext}

Please respond to the latest query with helpful JFZ training and fitness guidance.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || 'Keep moving strong!' });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

// Applet health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`JFZ server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
