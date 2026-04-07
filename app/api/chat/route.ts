import { NextResponse } from 'next/server';
import { getSupportSystemPrompt } from '@/lib/chat';

type OpenAIMessage = { role: 'user' | 'assistant' | 'system'; content: string };

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chat is not configured. Please use the contact form or request a quote.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { messages } = body as { messages?: OpenAIMessage[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array required' }, { status: 400 });
    }

    const systemPrompt = getSupportSystemPrompt();
    const openAIMessages: OpenAIMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: String(m.content ?? ''),
      })),
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        max_tokens: 512,
        temperature: 0.6,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('OpenAI API error:', res.status, err);
      return NextResponse.json(
        { error: 'Sorry, the assistant is temporarily unavailable. Please try the contact form.' },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string; role?: string } }>;
    };
    const content =
      data.choices?.[0]?.message?.content?.trim() ||
      'I couldn’t generate a response. Please try the contact form or request a quote.';

    return NextResponse.json({ message: content });
  } catch (e) {
    console.error('Chat API error:', e);
    return NextResponse.json(
      { error: 'Something went wrong. Please use the contact form or request a quote.' },
      { status: 500 }
    );
  }
}
