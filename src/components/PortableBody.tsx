/** @jsxImportSource react */
import { PortableText } from "@portabletext/react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PortableBody({ value }: { value: any }) {
  const components = {
    block: {
      // SUB JUDUL H2 DENGAN ID UNTUK TOC
      h2: ({ children }: any) => {
        const text = children[0]?.toString() || "";
        const slug = text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
        return (
          <h2 id={slug} className="text-3xl md:text-4xl font-bold font-oswald uppercase mt-20 mb-8 text-slate-900 leading-tight">
            {children}
          </h2>
        );
      },
      // SUB JUDUL H3
      h3: ({ children }: any) => (
        <h3 className="text-2xl md:text-3xl font-bold font-oswald uppercase mt-12 mb-6 text-slate-900 leading-tight">
          {children}
        </h3>
      ),
      // PARAGRAF & TABEL MARKDOWN
      normal: ({ children, value: node }: any) => {
        const text = node.children.map((c: any) => c.text).join('');
        if (text.includes('|')) {
          return (
            <div className="my-12 overflow-x-auto border border-slate-200 rounded-xl shadow-sm bg-white p-2">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  table: (props) => <table className="w-full border-collapse" {...props} />,
                  thead: (p) => <thead className="bg-[#1A1A1A] text-white uppercase text-[11px] tracking-widest" {...p} />,
                  th: (p) => <th className="p-4 text-left border border-slate-700" {...p} />,
                  td: (p) => <td className="p-4 border border-slate-100 text-sm text-slate-700 font-mulish" {...p} />,
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          );
        }
        return <p className="mb-8 leading-relaxed font-mulish text-lg text-slate-600">{children}</p>;
      },
      // KUTIPAN / BLOCKQUOTE
      blockquote: ({ children }: any) => (
        <blockquote className="relative my-12 p-10 bg-[#F7F7F7] border-l-4 border-[#7E67F8] italic text-xl text-slate-900 font-mulish">
          {children}
        </blockquote>
      ),
    },
    // LIST & POINT (BULLET/NUMBER)
    list: {
      bullet: ({ children }: any) => <ul className="ml-6 mb-10 space-y-4 list-disc text-slate-600">{children}</ul>,
      number: ({ children }: any) => <ol className="ml-6 mb-10 space-y-4 list-decimal text-slate-600">{children}</ol>,
    },
    listItem: ({ children }: any) => (
      <li className="leading-relaxed font-mulish text-lg pl-2">{children}</li>
    ),
  };

  return <PortableText value={value} components={components} />;
}