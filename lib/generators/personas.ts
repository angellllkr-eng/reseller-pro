// lib/generators/personas.ts
export interface PersonaPage {
  slug: string;
  title: string;
  description: string;
  industry: string;
  useCase: string;
  content: string;
  keywords: string[];
}

export async function generatePersonaPage(industry: string, platform: string): Promise<PersonaPage> {
  return {
    slug: `${platform}-for-${industry.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${platform} for ${industry} | Industry-Specific Solutions`,
    description: `Discover how ${platform} solves unique challenges for ${industry} professionals.`,
    industry,
    useCase: `${platform} tailored for ${industry}`,
    content: `<h1>${platform} for ${industry}</h1>
      <p>Unique value proposition for ${industry}</p>
      <h2>Industry-Specific Features</h2>
      <ul>
        <li>Feature 1 for ${industry}</li>
        <li>Feature 2 for ${industry}</li>
        <li>Feature 3 for ${industry}</li>
      </ul>
      <h2>Success Stories</h2>
      <p>Case studies from ${industry} customers...</p>`,
    keywords: [`${platform} for ${industry}`, `${industry} solution`, `${industry} management`],
  };
}
