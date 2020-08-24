import { Resolution } from '../lib/background';

export async function getBackground(
  { width, height }: Resolution,
  searchTerms?: string[]
): Promise<string> {
  const searchQuery = searchTerms ? '?' + searchTerms.join(',') : null;

  const result: Response = await fetch(
    `https://source.unsplash.com/${width}x${height}/${searchQuery}`,
    { method: 'HEAD' }
  );

  return result.url;
}
