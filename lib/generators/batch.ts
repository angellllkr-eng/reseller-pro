// lib/generators/batch.ts
import { 
  generatePersonaPage, 
  generateComparisonPage, 
  generateIntegrationPage,
  generateGlossaryPage,
  generateHubPage
} from './index';
import { publishPageToCMS } from '@/lib/cms/contentful';

export interface GenerationConfig {
  playbook: 'personas' | 'comparisons' | 'integrations' | 'glossary' | 'hubs';
  data: Record<string, any>;
}

export async function generateAndPublishBatch(configs: GenerationConfig[]) {
  const results = { success: 0, failed: 0, errors: [] };

  for (const config of configs) {
    try {
      let page;
      
      switch (config.playbook) {
        case 'personas':
          page = await generatePersonaPage(config.data.industry, config.data.platform);
          break;
        case 'comparisons':
          page = await generateComparisonPage(config.data.platform, config.data.comp1, config.data.comp2);
          break;
        case 'integrations':
          page = await generateIntegrationPage(config.data.platform, config.data.tool, config.data.steps);
          break;
        case 'glossary':
          page = await generateGlossaryPage(config.data.term, config.data.definition, config.data.examples, config.data.related);
          break;
        case 'hubs':
          page = await generateHubPage(config.data.category, config.data.pages);
          break;
      }

      // Publish to CMS
      const published = await publishPageToCMS({
        ...page,
        playbook: config.playbook,
        metadata: config.data,
      });

      console.log(`✅ Published: ${published.fields.slug}`);
      results.success++;
    } catch (error) {
      results.failed++;
      results.errors.push({ config, error: (error as Error).message });
      console.error(`❌ Failed: ${config.data.slug}`, error);
    }
  }

  return results;
}
