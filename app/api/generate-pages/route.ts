// app/api/generate-pages/route.ts
import { generateAndPublishBatch } from '@/lib/generators/batch';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { configs } = await req.json();
    
    if (!configs || !Array.isArray(configs)) {
      return NextResponse.json({ error: 'Invalid config' }, { status: 400 });
    }

    const results = await generateAndPublishBatch(configs);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
