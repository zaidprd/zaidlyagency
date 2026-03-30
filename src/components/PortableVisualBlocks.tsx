/** @jsxImportSource react */
import { PortableText } from '@portabletext/react';
import { marked } from 'marked';
import { useState, useEffect } from 'react';

const renderer = new marked.Renderer();

// 1. LOGIKA HEADING ID (Biar Daftar Isi/TOC lo jalan)
renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
  const cleanText = text.replace(/<[^>]*>/g, '');
  const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  
  // Styling Heading yang muncul dari Markdown (Claude)
  const className = depth === 2 ? 'text-3xl font-oswald uppercase font-bold text-slate-900 mt-16 mb-6 border-l-4 border-[#7E67F8] pl-6' : 'text-xl font-bold mt-8 mb-4';
  
  return `<h${depth} id="${id}" class="${className}" style="scroll-margin-top: 120px;">${text}</h${depth}>`;
};

const components = {
  block: {
    // Menangani Heading resmi dari Sanity Studio (Dropdown H2/H3)
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
    // INI KUNCINYA: Menangani teks biasa yang isinya Markdown/Tabel dari Claude
    normal: ({ node, children }: any) => {
      const rawText = node.children?.map((c: any) => c.text).join('') || '';
      
      // Deteksi Markdown Luas (Tabel, Bold, List, Heading ##)
      const hasMarkdown = /\||#{2,6}\s|\*\*|^\s*[\*\+-]\s/m.test(rawText);
      
      if (hasMarkdown) {
        // Gunakan marked untuk merubah teks mentah Claude jadi HTML
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
    // Menangani Gambar biar ANTI-GEPENG (Standard Sanity)
   image: ({ value }: any) => {
      const id = value.asset?._ref;
      if (!id) return null;

      // 1. PASTIKAN PROJECT ID INI ADALAH PROJECT AGENCY LO
      // Cek di sanity.cli.ts lo, kalau ID-nya bukan 6ocswb4i, ganti ini!
      const projectId = "0ukg7bxy"; 
      const dataset = "production";

      // 2. LOGIKA PECAH ID (BIAR PASTI MUNCUL & GAK GEPENG)
      // ID Sanity formatnya: image-HASH-DIMENSION-EXT
      const parts = id.split('-');
      const ext = parts[parts.length - 1]; // dapet 'webp' atau 'jpg'
      const dimensions = parts[parts.length - 2]; // dapet '680x380'
      const hash = parts.slice(1, parts.length - 2).join('-'); // dapet hash-nya

      // URL CDN Sanity yang Valid
      const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dimensions}.${ext}`;

      return (
        <div className="my-12 flex flex-col items-center w-full">
          <img 
            src={imageUrl} 
            alt={value.alt || "Zaidly Agency Portfolio"} 
            className="rounded-2xl shadow-xl w-full h-auto object-cover border border-slate-100" 
            loading="lazy"
          />
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
      ` }} />
      <PortableText value={value} components={components} />
    </div>
  );
}