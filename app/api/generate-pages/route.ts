import { generateAndPublishBatch } from '@/lib/generators/batch';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { configs } = await req.json();
  const results = await generateAndPublishBatch(configs);
  return NextResponse.json(results);
}
