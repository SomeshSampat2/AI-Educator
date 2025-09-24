/**
 * Markdown formatting utility for AI Educator responses
 * Handles bold text, headings, lists, code blocks, inline code, and emojis
 */

export interface CodeBlock {
  language: string;
  code: string;
}

/**
 * Parse markdown content and convert to HTML/React-safe format
 */
export const parseMarkdown = (markdown: string): string => {
  if (!markdown) return '';

  let html = markdown;

  // Handle line breaks first (convert \n to <br>)
  html = html.replace(/\\n/g, '<br/>');

  // Handle code blocks (```language\ncode\n```)
  html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, language, code) => {
    const lang = language || 'text';
    const escapedCode = code.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="code-block" data-language="${lang}">${escapedCode}</div>`;
  });

  // Handle inline code (`code`)
  html = html.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');

  // Handle bold text (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Handle headings (#### Heading, ### Heading, ## Heading, # Heading)
  html = html.replace(/^#### (.*$)/gm, '<h1 class="markdown-heading h1">$1</h1>');
  html = html.replace(/^### (.*$)/gm, '<h2 class="markdown-heading h2">$1</h2>');
  html = html.replace(/^## (.*$)/gm, '<h3 class="markdown-heading h3">$1</h3>');
  html = html.replace(/^# (.*$)/gm, '<h4 class="markdown-heading h4">$1</h4>');

  // Handle unordered lists (* item or - item)
  // First, wrap list items in <li> tags
  html = html.replace(/^[\*\-]\s+(.*)$/gm, '<li>$1</li>');

  // Then wrap consecutive <li> tags in <ul>
  html = html.replace(/(<li>.*<\/li>\s*)+/g, '<ul class="markdown-list">$&</ul>');

  // Clean up extra <ul> tags that might have been created
  html = html.replace(/<\/ul>\s*<ul class="markdown-list">/g, '');

  return html;
};

/**
 * Extract code blocks from markdown content
 */
export const extractCodeBlocks = (markdown: string): CodeBlock[] => {
  const codeBlocks: CodeBlock[] = [];
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;

  let match;
  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    codeBlocks.push({
      language: match[1] || 'text',
      code: match[2].trim()
    });
  }

  return codeBlocks;
};

/**
 * Check if content contains code blocks
 */
export const hasCodeBlocks = (markdown: string): boolean => {
  return /```[\s\S]*?```/g.test(markdown);
};

/**
 * Clean markdown for plain text display (remove formatting)
 */
export const cleanMarkdown = (markdown: string): string => {
  if (!markdown) return '';

  let text = markdown;

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '[Code Block]');

  // Remove inline code markers
  text = text.replace(/`([^`\n]+)`/g, '$1');

  // Remove bold markers
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');

  // Remove heading markers
  text = text.replace(/^#{1,6}\s+(.*)$/gm, '$1');

  // Remove list markers
  text = text.replace(/^[\*\-]\s+/gm, '');

  // Convert line breaks
  text = text.replace(/\\n/g, '\n');

  return text.trim();
};
