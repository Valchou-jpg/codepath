import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ response: "L'IA n'est pas encore configurée. Ajoute ANTHROPIC_API_KEY dans les variables d'environnement Vercel." });
  }

  const { message, language, lessonTitle, lessonDescription } = await req.json();

  const client = new Anthropic({ apiKey });

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    system: `Tu es un assistant pédagogique sur CodePath, une plateforme d'apprentissage du code.
Contexte : langage ${language}, leçon "${lessonTitle}" — ${lessonDescription}.
Réponds en français, de façon concise (max 4 phrases). Si on te montre une erreur, explique ce qui ne va pas. N'écris pas la solution complète — aide l'utilisateur à la trouver lui-même.`,
    messages: [{ role: 'user', content: message }],
  });

  const text = msg.content[0].type === 'text' ? msg.content[0].text : '';
  return NextResponse.json({ response: text });
}
