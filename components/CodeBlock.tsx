import React from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

/**
 * Simple syntax highlighter component for code blocks
 * Provides VSCode-like color coding for different programming languages
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, className = '' }) => {
  // Keywords for different languages
  const languageKeywords: Record<string, Set<string>> = {
    javascript: new Set([
      'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
      'class', 'extends', 'import', 'export', 'from', 'async', 'await', 'try',
      'catch', 'finally', 'throw', 'new', 'this', 'super', 'typeof', 'instanceof',
      'null', 'undefined', 'true', 'false', 'console', 'log', 'error', 'warn'
    ]),
    typescript: new Set([
      'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
      'class', 'extends', 'implements', 'interface', 'type', 'enum', 'import',
      'export', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw',
      'new', 'this', 'super', 'typeof', 'instanceof', 'null', 'undefined',
      'true', 'false', 'console', 'log', 'error', 'warn', 'string', 'number',
      'boolean', 'any', 'void', 'never', 'unknown', 'readonly', 'private',
      'public', 'protected', 'static', 'abstract'
    ]),
    python: new Set([
      'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'import', 'from',
      'return', 'try', 'except', 'finally', 'with', 'as', 'lambda', 'and',
      'or', 'not', 'in', 'is', 'None', 'True', 'False', 'print', 'len',
      'range', 'str', 'int', 'float', 'bool', 'list', 'dict', 'set', 'tuple'
    ]),
    java: new Set([
      'public', 'private', 'protected', 'static', 'final', 'class', 'interface',
      'extends', 'implements', 'import', 'package', 'return', 'if', 'else',
      'for', 'while', 'do', 'switch', 'case', 'default', 'try', 'catch',
      'finally', 'throw', 'throws', 'new', 'this', 'super', 'null', 'true',
      'false', 'void', 'int', 'long', 'double', 'float', 'boolean', 'char',
      'String', 'System', 'out', 'println'
    ]),
    css: new Set([
      'color', 'background', 'margin', 'padding', 'border', 'width', 'height',
      'display', 'position', 'flex', 'grid', 'font-size', 'font-family', 'text-align',
      'justify-content', 'align-items', 'float', 'clear', 'overflow', 'z-index'
    ]),
    html: new Set([
      'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img',
      'input', 'button', 'form', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li',
      'header', 'footer', 'nav', 'section', 'article', 'aside', 'main', 'body',
      'head', 'title', 'meta', 'link', 'script', 'style'
    ])
  };

  const keywords = languageKeywords[language] || languageKeywords.javascript;

  // Function to highlight code tokens
  const highlightCode = (code: string): React.ReactNode[] => {
    const lines = code.split('\n');
    const tokens: React.ReactNode[] = [];

    lines.forEach((line, lineIndex) => {
      // Split line into tokens (words, symbols, etc.)
      const lineTokens = line.split(/(\s+|[{}()[\];,.=<>!&|+-/*?:'"`])/);

      lineTokens.forEach((token, tokenIndex) => {
        if (!token) return;

        let className = 'code-token';
        let style: React.CSSProperties = {};

        // Keywords
        if (keywords.has(token)) {
          className += ' code-keyword';
          style.color = '#569CD6'; // Blue for keywords
        }
        // Strings
        else if (/^["'`].*["'`]$/.test(token)) {
          className += ' code-string';
          style.color = '#CE9178'; // Orange for strings
        }
        // Numbers
        else if (/^\d+(\.\d+)?$/.test(token)) {
          className += ' code-number';
          style.color = '#B5CEA8'; // Green for numbers
        }
        // Comments
        else if (token.startsWith('//') || token.startsWith('/*') || token.startsWith('#')) {
          className += ' code-comment';
          style.color = '#6A9955'; // Green for comments
        }
        // Functions/methods (words followed by parentheses)
        else if (lineTokens[tokenIndex + 1] === '(') {
          className += ' code-function';
          style.color = '#DCDCAA'; // Yellow for functions
        }
        // Operators and symbols
        else if (/^[{}()[\];,.=<>!&|+-/*?:]$/.test(token)) {
          className += ' code-operator';
          style.color = '#D4D4D4'; // Light gray for operators
        }
        // HTML tags
        else if (language === 'html' && /^<\/?[a-zA-Z][^>]*>?$/.test(token)) {
          className += ' code-tag';
          style.color = '#569CD6'; // Blue for HTML tags
        }
        // CSS properties
        else if (language === 'css' && /^[a-z-]+(?=\s*:)/.test(token)) {
          className += ' code-property';
          style.color = '#9CDCFE'; // Light blue for CSS properties
        }
        // Default text
        else {
          className += ' code-default';
          style.color = '#D4D4D4'; // Light gray for default text
        }

        tokens.push(
          <span key={`${lineIndex}-${tokenIndex}`} className={className} style={style}>
            {token}
          </span>
        );
      });

      // Add line break after each line (except last line)
      if (lineIndex < lines.length - 1) {
        tokens.push(<br key={`br-${lineIndex}`} />);
      }
    });

    return tokens;
  };

  return (
    <div className={`code-block-container ${className}`}>
      <div className="code-block-header">
        <span className="code-language">{language.toUpperCase()}</span>
        <div className="code-window-controls">
          <div className="control red"></div>
          <div className="control yellow"></div>
          <div className="control green"></div>
        </div>
      </div>
      <pre className="code-block-content">
        <code className={`language-${language}`}>
          {highlightCode(code)}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
