import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownPageProps {
  content: string;
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: 1.7,
      color: '#333',
    }}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px', fontSize: '2rem' }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ color: '#34495e', marginTop: '30px', fontSize: '1.4rem' }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ color: '#4a5568', marginTop: '20px', fontSize: '1.1rem' }}>
              {children}
            </h3>
          ),
          blockquote: ({ children }) => (
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              padding: '15px',
              borderRadius: '5px',
              margin: '20px 0',
            }}>
              {children}
            </div>
          ),
          ul: ({ children }) => (
            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
              {children}
            </ul>
          ),
          em: ({ children }) => (
            <em style={{ color: '#7f8c8d' }}>{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPage;
