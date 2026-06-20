import { PortableText } from '@portabletext/react';

const components = {
  block: {
    normal: ({ children }: any) => (
      <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.6rem' }}>
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '-0.03em',
        color: 'white',
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        lineHeight: 0.9,
        marginTop: '3.5rem',
        marginBottom: '1.25rem',
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{
        fontFamily: '"Poppins", sans-serif',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '-0.03em',
        color: 'white',
        fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
        lineHeight: 0.95,
        marginTop: '2.5rem',
        marginBottom: '1rem',
      }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{
        borderLeft: '3px solid #3245FF',
        paddingLeft: '1.5rem',
        marginLeft: 0,
        marginBottom: '1.6rem',
        color: 'rgba(255,255,255,0.5)',
        fontStyle: 'italic',
      }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }: any) => (
      <em style={{ color: 'rgba(255,255,255,0.65)' }}>{children}</em>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        style={{ color: '#3245FF', textDecoration: 'underline', textUnderlineOffset: '3px' }}
      >
        {children}
      </a>
    ),
    code: ({ children }: any) => (
      <code style={{
        background: 'rgba(50,69,255,0.12)',
        border: '1px solid rgba(50,69,255,0.22)',
        borderRadius: '6px',
        padding: '0.15em 0.4em',
        fontSize: '0.85em',
        color: '#BC52EE',
      }}>
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul style={{ color: 'rgba(255,255,255,0.68)', paddingLeft: '1.5rem', marginBottom: '1.6rem', lineHeight: 1.85 }}>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol style={{ color: 'rgba(255,255,255,0.68)', paddingLeft: '1.5rem', marginBottom: '1.6rem', lineHeight: 1.85 }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li style={{ marginBottom: '0.5rem' }}>{children}</li>
    ),
    number: ({ children }: any) => (
      <li style={{ marginBottom: '0.5rem' }}>{children}</li>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <figure style={{ margin: '2.5rem 0' }}>
          <img
            src={`https://cdn.sanity.io/images/0ukg7bxy/production/${value.asset._ref.replace('image-', '').replace(/-([a-z]+)$/, '.$1')}`}
            alt={value.alt || ''}
            style={{ width: '100%', height: 'auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}
          />
          {value.caption && (
            <figcaption style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableVisualBlocks({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
