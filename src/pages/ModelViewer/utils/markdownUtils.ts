export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extracts heading information from markdown content
 */
export const extractHeadings = (markdown: string): Heading[] => {
  // Match all headings in markdown format (# Heading, ## Heading, etc.)
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    
    // Generate ID from text (similar to what rehype-slug does)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ id, text, level });
  }
  
  return headings;
};

/**
 * Creates a table of contents tree structure from a flat list of headings
 */
export const createTocTree = (headings: Heading[]) => {
  const root: any = { items: [] };
  const stack: any[] = [root];
  let lastLevel = 0;

  headings.forEach((heading) => {
    const item = { ...heading, items: [] };
    
    if (heading.level > lastLevel) {
      // Going deeper in the hierarchy
      for (let i = 0; i < heading.level - lastLevel; i++) {
        if (stack[stack.length - 1].items.length === 0) {
          // If the last item in the stack has no children, add a placeholder
          stack[stack.length - 1].items.push({ id: '', text: '', level: lastLevel + 1, items: [] });
        }
        stack.push(stack[stack.length - 1].items[stack[stack.length - 1].items.length - 1]);
      }
    } else if (heading.level < lastLevel) {
      // Going back up in the hierarchy
      for (let i = 0; i < lastLevel - heading.level; i++) {
        stack.pop();
      }
    }
    
    stack[stack.length - 1].items.push(item);
    lastLevel = heading.level;
  });
  
  return root.items;
};