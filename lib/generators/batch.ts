import { generateAndPublishBatch } from './index';
import { publishPageToCMS } from '@/lib/cms/contentful';

export async function generateAndPublishBatch(configs: any[]) {
  const results = { success: 0, failed: 0 };
  
  for (const config of configs) {
    try {
      const published = await publishPageToCMS(config);
      results.success++;
    } catch (error) {
      results.failed++;
    }
  }
  
  return results;
}
