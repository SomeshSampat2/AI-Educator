import React from 'react';
import { parseMarkdown, extractCodeBlocks } from '../utils/markdownFormatter';
import CodeBlock from './CodeBlock';

interface FormattedContentProps {
  content: string;
  className?: string;
}

/**
 * Component for rendering formatted markdown content with syntax highlighting
 */
const FormattedContent: React.FC<FormattedContentProps> = ({ content, className = '' }) => {
  // Extract code blocks before parsing markdown
  const codeBlocks = extractCodeBlocks(content);

  // Parse markdown (code blocks will be replaced with placeholders)
  const parsedHtml = parseMarkdown(content);

  // Split HTML by code block placeholders and render with actual CodeBlock components
  const renderContent = () => {
    if (codeBlocks.length === 0) {
      // No code blocks, just render HTML
      return (
        <div
          className={`prose-content ${className}`}
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
      );
    }

    // Split content by code block placeholders and interleave with CodeBlock components
    const parts = parsedHtml.split(/(<div class="code-block"[^>]*>[\s\S]*?<\/div>)/g);

    return (
      <div className={`formatted-content ${className}`}>
        {parts.map((part, index) => {
          // Check if this part is a code block placeholder
          const codeBlockMatch = part.match(/<div class="code-block"[^>]*data-language="([^"]*)"[^>]*>([\s\S]*?)<\/div>/);

          if (codeBlockMatch) {
            const language = codeBlockMatch[1];
            const code = codeBlockMatch[2].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

            return (
              <CodeBlock
                key={`codeblock-${index}`}
                code={code}
                language={language}
                className="my-4"
              />
            );
          }

          // Regular HTML content
          if (part.trim()) {
            return (
              <div
                key={`content-${index}`}
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: part }}
              />
            );
          }

          return null;
        })}
      </div>
    );
  };

  return renderContent();
};

export default FormattedContent;
