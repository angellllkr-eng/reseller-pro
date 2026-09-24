// lib/generators/glossary.ts
export interface GlossaryPage {
  slug: string;
  title: string;
  description: string;
  term: string;
  definition: string;
  examples: string[];
  relatedTerms: string[];
  content: string;
  keywords: string[];
}

export async function generateGlossaryPage(
  term: string,
  definition: string,
  examples: string[],
  relatedTerms: string[]
): Promise<GlossaryPage> {
  return {
    slug: `glossary/${term.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${term} Definition | Glossary`,
    description: `Learn what ${term} means. Full definition with examples.`,
    term,
    definition,
    examples,
    relatedTerms,
    content: `<h1>${term}</h1>
      <h2>Definition</h2>
      <p>${definition}</p>
      <h2>Examples</h2>
      <ul>
        ${examples.map(ex => `<li>${ex}</li>`).join('\n')}
      </ul>
      <h2>Related Terms</h2>
      <ul>
        ${relatedTerms.map(rt => `<li><a href="/glossary/${rt.toLowerCase()}">${rt}</a></li>`).join('\n')}
      </ul>`,
    keywords: [`${term} definition`, `what is ${term}`, `${term} meaning`],
  };
}
