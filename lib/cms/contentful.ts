import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function publishPageToCMS(page: any) {
  const entry = await contentfulClient.entries.create({
    contentTypeId: 'programmaticPage',
    fields: {
      slug: { 'en-US': page.slug },
      title: { 'en-US': page.title },
      description: { 'en-US': page.description },
      content: { 'en-US': page.content },
      keywords: { 'en-US': page.keywords },
      playbook: { 'en-US': page.playbook },
    },
  });
  await contentfulClient.entries.publish(entry);
  return entry;
}
