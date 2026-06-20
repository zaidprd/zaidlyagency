import { marked, Renderer } from 'marked';
import { urlFor } from '../lib/sanity';

// Sama persis dengan getSlug di [...slug].astro agar id heading match dengan href TOC
const getSlug = (str: string) =>
  str.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// Custom renderer: heading dapat id attribute agar TOC anchor bisa scroll ke sana
const renderer = new Renderer();
renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
  // Strip HTML tags dari text sebelum jadikan slug (misal ada <strong> di heading)
  const plain = text.replace(/<[^>]+>/g, '');
  const id = getSlug(plain);
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};
marked.use({ renderer });

// Convert Portable Text blocks → markdown string
function blocksToMarkdown(blocks: any[]): string {
  return blocks.map((block) => {
    // Images stored as Portable Text asset blocks
    if (block._type === 'image' && block.asset) {
      const src = urlFor(block).width(900).url();
      const alt = block.alt || '';
      const caption = block.caption || '';
      return caption
        ? `![${alt}](${src})\n*${caption}*`
        : `![${alt}](${src})`;
    }

    if (block._type !== 'block') return '';

    // Extract text with marks (bold/italic/links)
    const text = (block.children || []).map((span: any) => {
      let t = span.text || '';
      if (!t) return '';
      const marks: string[] = span.marks || [];
      // Link mark
      const linkMark = marks.find((m: string) =>
        block.markDefs?.some((def: any) => def._key === m && def._type === 'link')
      );
      if (linkMark) {
        const def = block.markDefs.find((d: any) => d._key === linkMark);
        t = `[${t}](${def.href})`;
      }
      if (marks.includes('strong')) t = `**${t}**`;
      if (marks.includes('em')) t = `*${t}*`;
      if (marks.includes('code')) t = `\`${t}\``;
      return t;
    }).join('');

    // Apply block-level style
    switch (block.style) {
      case 'h1': return `# ${text}`;
      case 'h2': return `## ${text}`;
      case 'h3': return `### ${text}`;
      case 'h4': return `#### ${text}`;
      case 'blockquote': return `> ${text}`;
      default: return text; // normal paragraph (may already contain ## etc.)
    }
  }).filter(Boolean).join('\n\n');
}

export default function PortableVisualBlocks({ value }: { value: any }) {
  if (!value || !Array.isArray(value)) return null;

  const markdown = blocksToMarkdown(value);
  const html = marked.parse(markdown, { async: false, breaks: false }) as string;

  return (
    <div
      className="portable-md"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
