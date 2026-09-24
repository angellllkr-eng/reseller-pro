// lib/generators/index.ts
export * from './personas';
export * from './comparisons';
export * from './integrations';
export * from './glossary';
export * from './hub';

export interface GeneratorConfig {
  platform: string;
  industry?: string;
  competitors?: string[];
  integrations?: string[];
  glossaryTerms?: string[];
  hubs?: string[];
}

export async function generateAllPages(config: GeneratorConfig) {
  const pages = {
    personas: [],
    comparisons: [],
    integrations: [],
    glossary: [],
    hubs: [],
  };
  
  // Generate based on config
  // Implementation delegates to specific generators
  
  return pages;
}
