// lib/generators/hub.ts
export interface HubPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  pages: Array<{ title: string; slug: string; description: string }>;
  content: string;
}

export async function generateHubPage(
  category: string,
  pages: Array<{ title: string; slug: string; description: string }>
): Promise<HubPage> {
  return {
    slug: category.toLowerCase().replace(/\s+/g, '-'),
    title: `${category} Hub`,
    description: `Explore all ${category} resources and guides.`,
    category,
    pages,
    content: `<h1>${category}</h1>
      <p>Complete guide to ${category}...</p>
      <div class="pages-grid">
        ${pages.map(p => `<div class="card">
          <h3><a href="/${p.slug}">${p.title}</a></h3>
          <p>${p.description}</p>
        </div>`).join('\n')}
      </div>`,
  };
}
