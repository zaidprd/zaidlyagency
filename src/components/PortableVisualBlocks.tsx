/** @jsxImportSource react */
import { PortableText } from '@portabletext/react';
import { marked } from 'marked';
import { useState, useEffect } from 'react';

const renderer = new marked.Renderer();

// 1. LOGIKA HEADING ID & LINK MARKDOWN/HTML
renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
  const cleanText = text.replace(/<[^>]*>/g, '');
  const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const className = depth === 2 ? 'text-3xl font-oswald uppercase font-bold text-slate-900 mt-16 mb-6 border-l-4 border-[#7E67F8] pl-6' : 'text-xl font-bold mt-8 mb-4';
  return `<h${depth} id="${id}" class="${className}" style="scroll-margin-top: 120px;">${text}</h${depth}>`;
};

// Agar link di dalam Markdown atau HTML mentah berwarna ungu
renderer.link = ({ href, title, text }: any) => {
  return `<a href="${href}" title="${title || ''}" target="_blank" rel="noopener noreferrer" class="zaidly-link">${text}</a>`;
};

const components = {
  // 2. LOGIKA LINK BAWAAN SANITY (Marks)
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} target={rel ? "_blank" : undefined} className="zaidly-link">
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children, value }: any) => {
      const text = value.children.map((c: any) => c.text).join('');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
      return <h2 id={id} className="text-3xl font-oswald uppercase font-bold text-slate-900 mt-16 mb-6 border-l-4 border-[#7E67F8] pl-6">{children}</h2>;
    },
    h3: ({ children, value }: any) => {
      const text = value.children.map((c: any) => c.text).join('');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
      return <h3 id={id} className="text-xl font-bold text-slate-900 mt-10 mb-4">{children}</h3>;
    },
    normal: ({ node, children }: any) => {
      const rawText = node.children?.map((c: any) => c.text).join('') || '';
      
      // Deteksi Markdown Luas + Link (MD & HTML)
      const hasMarkdown = /\||#{2,6}\s|\*\*|^\s*[\*\+-]\s|\[.*\]\(.*\)|<a\s+(?:[^>]*?\s+)?href=/m.test(rawText);
      const hasMarks = node.children?.some((c: any) => c.marks && c.marks.length > 0);

      if (hasMarkdown && !hasMarks) {
        const html = marked.parse(rawText, { renderer }) as string;
        return (
          <section 
            className="zaidly-markdown-gate prose-table:w-full prose-strong:text-[#7E67F8] prose-strong:font-bold" 
            dangerouslySetInnerHTML={{ __html: html }} 
          />
        );
      }
      return <p className="mb-6 leading-relaxed text-slate-700 font-medium">{children}</p>;
    },
  },
  types: {
    image: ({ value }: any) => {
      const id = value.asset?._ref;
      if (!id) return null;
      const projectId = "0ukg7bxy"; 
      const dataset = "production";
      const parts = id.split('-');
      const ext = parts[parts.length - 1];
      const dimensions = parts[parts.length - 2];
      const hash = parts.slice(1, parts.length - 2).join('-');
      const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dimensions}.${ext}`;

      return (
        <div className="my-12 flex flex-col items-center w-full">
          <img src={imageUrl} alt={value.alt || "Zaidly Agency Portfolio"} className="rounded-2xl shadow-xl w-full h-auto object-cover border border-slate-100" loading="lazy" />
          {value.alt && <p className="text-center text-sm text-slate-400 mt-4 italic font-mulish">{value.alt}</p>}
        </div>
      );
    },
  }
};

export default function PortableVisualBlocks({ value }: { value: any }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!value) return null;

  return (
    <div className={`portable-text-wrapper ${isClient ? 'is-hydrated' : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        .zaidly-markdown-gate { width: 100%; color: #334155; }
        .zaidly-markdown-gate table { width: 100%; border-collapse: collapse; margin: 2.5rem 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; display: block; overflow-x: auto; }
        .zaidly-markdown-gate th { background: #F8F9FA; padding: 16px; border: 1px solid #e2e8f0; text-align: left; font-size: 13px; text-transform: uppercase; color: #1e293b; }
        .zaidly-markdown-gate td { padding: 14px 16px; border: 1px solid #e2e8f0; font-size: 15px; color: #475569; }
        .zaidly-markdown-gate tr:nth-child(even) { background: #fcfcfc; }
        .zaidly-markdown-gate ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .zaidly-markdown-gate li { margin-bottom: 0.5rem; }
        .zaidly-markdown-gate strong { color: #1e293b; font-weight: 800; }
        
        /* FIX WARNA LINK: HTML, MD, & SANITY MARKS */
        .zaidly-link, .zaidly-markdown-gate a {
          color: #7E67F8 !important;
          font-weight: 700 !important;
          text-decoration: underline !important;
          transition: opacity 0.2s;
        }
        .zaidly-link:hover, .zaidly-markdown-gate a:hover {
          opacity: 0.7;
        }
      ` }} />
      <PortableText value={value} components={components} />
    </div>
  );
}
