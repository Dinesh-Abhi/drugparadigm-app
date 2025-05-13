import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyIcon, CheckIcon } from 'lucide-react';

// Import languages we need
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';

// Register languages
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('yaml', yaml);


export const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 dark:bg-gray-900 text-gray-200">
        <span className="text-xs font-mono uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Copy code"
        >
          {copied ? <CheckIcon size={16} className="text-green-500" /> : <CopyIcon size={16} />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? nightOwl : oneLight}
        customStyle={{
          margin: 0,
          padding: '1rem',
          borderRadius: '0 0 0.5rem 0.5rem',
          fontSize: '0.9rem',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};