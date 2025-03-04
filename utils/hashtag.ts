export function extractHashtags(text: string): string[] {
  const hashtagRegex = /#(\w+)/g;
  const matches = text.match(hashtagRegex);
  
  if (!matches) return [];
  
  // Remove the # symbol, trim whitespace, and return unique hashtags
  return [...new Set(matches.map(tag => tag.substring(1).trim()))];
}