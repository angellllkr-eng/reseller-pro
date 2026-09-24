// lib/generators/integrations.ts
export interface IntegrationPage {
  slug: string;
  title: string;
  description: string;
  tool: string;
  setupSteps: string[];
  content: string;
  keywords: string[];
}

export async function generateIntegrationPage(
  platform: string,
  tool: string,
  setupSteps: string[]
): Promise<IntegrationPage> {
  return {
    slug: `integrations/${tool.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${tool} Integration with ${platform}`,
    description: `Connect ${tool} to ${platform}. Follow our step-by-step setup guide.`,
    tool,
    setupSteps,
    content: `<h1>${tool} Integration</h1>
      <h2>How to Connect ${tool}</h2>
      <ol>
        ${setupSteps.map((step, i) => `<li>${step}</li>`).join('\n')}
      </ol>
      <h2>Use Cases</h2>
      <p>Workflows enabled by ${tool} + ${platform}...</p>`,
    keywords: [`${tool} integration`, `connect ${tool}`, `${tool} ${platform}`],
  };
}
