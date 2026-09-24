// lib/generators/comparisons.ts
export interface ComparisonPage {
  slug: string;
  title: string;
  description: string;
  competitor1: string;
  competitor2: string;
  content: string;
  keywords: string[];
}

export async function generateComparisonPage(
  platform: string,
  competitor1: string,
  competitor2: string
): Promise<ComparisonPage> {
  return {
    slug: `compare-${competitor1.toLowerCase()}-vs-${competitor2.toLowerCase()}`,
    title: `${competitor1} vs ${competitor2} | Detailed Comparison`,
    description: `Compare ${competitor1} and ${competitor2}. See which is better for your needs.`,
    competitor1,
    competitor2,
    content: `<h1>${competitor1} vs ${competitor2}</h1>
      <table>
        <tr><th>Feature</th><th>${competitor1}</th><th>${competitor2}</th></tr>
        <tr><td>Pricing</td><td>Compare...</td><td>Compare...</td></tr>
        <tr><td>Features</td><td>Compare...</td><td>Compare...</td></tr>
        <tr><td>Support</td><td>Compare...</td><td>Compare...</td></tr>
      </table>
      <h2>Why Choose ${platform}</h2>
      <p>Unique advantages...</p>`,
    keywords: [`${competitor1} vs ${competitor2}`, `${competitor1} alternative`, `better than ${competitor2}`],
  };
}
