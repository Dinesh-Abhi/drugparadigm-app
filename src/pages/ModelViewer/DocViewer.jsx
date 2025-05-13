import React, { useMemo, useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Menu } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { TableOfContents } from './TableOfContents';
import { extractHeadings } from './utils/markdownUtils';

export const DocViewer = ({ markdown }) => {
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState(null);
  const [showTOC, setShowTOC] = useState(false);
  const tocRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setHeadings(extractHeadings(markdown));

    const handleResize = () => {
      // Close TOC on window resize for better UX
      setShowTOC(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [markdown]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  // Handle clicks outside to close the TOC popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showTOC && 
        tocRef.current && 
        !tocRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setShowTOC(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTOC]);

  const toggleTOC = () => {
    setShowTOC(!showTOC);
  };

  const components = useMemo(() => ({
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <CodeBlock
          language={match[1]}
          value={String(children).replace(/\n$/, '')}
          {...props}
        />
      ) : (
        <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-700 dark:text-gray-300" {...props}>
          {children}
        </code>
      );
    },
    img({ src, alt, ...props }) {
      return (
        <div className="my-6">
          <img
            src={src}
            alt={alt}
            className="rounded-lg max-w-full h-auto mx-auto shadow-md"
            {...props}
          />
          {alt && <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">{alt}</p>}
        </div>
      );
    },
    a({ href, children, ...props }) {
      return (
        <a
          href={href}
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    table({ children, ...props }) {
      return (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg" {...props}>
            {children}
          </table>
        </div>
      );
    },
    thead({ children, ...props }) {
      return (
        <thead className="bg-gray-100 dark:bg-gray-800" {...props}>
          {children}
        </thead>
      );
    },
    th({ children, ...props }) {
      return (
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider" {...props}>
          {children}
        </th>
      );
    },
    td({ children, ...props }) {
      return (
        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400" {...props}>
          {children}
        </td>
      );
    },
    tr({ children, ...props }) {
      return (
        <tr className="even:bg-gray-50 dark:even:bg-gray-800/50" {...props}>
          {children}
        </tr>
      );
    },
    blockquote({ children, ...props }) {
      return (
        <blockquote className="pl-4 border-l-4 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 my-4" {...props}>
          {children}
        </blockquote>
      );
    },
    h1({ children, ...props }) {
      return (
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-200 mt-10 mb-6" {...props}>
          {children}
        </h1>
      );
    },
    h2({ children, ...props }) {
      return (
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4" {...props}>
          {children}
        </h2>
      );
    },
    h3({ children, ...props }) {
      return (
        <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3" {...props}>
          {children}
        </h3>
      );
    },
    h4({ children, ...props }) {
      return (
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mt-5 mb-2" {...props}>
          {children}
        </h4>
      );
    },
    p({ children, ...props }) {
      return (
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4" {...props}>
          {children}
        </p>
      );
    },
    ul({ children, ...props }) {
      return (
        <ul className="list-disc pl-6 mb-4 text-xs text-gray-500 dark:text-gray-400" {...props}>
          {children}
        </ul>
      );
    },
    ol({ children, ...props }) {
      return (
        <ol className="list-decimal pl-6 mb-4 text-xs text-gray-500 dark:text-gray-400" {...props}>
          {children}
        </ol>
      );
    },
    li({ children, ...props }) {
      return (
        <li className="mb-1" {...props}>
          {children}
        </li>
      );
    },
  }), []);

  return (
    <div className="relative">
      {/* Article content */}
      <article className="max-w-3xl mx-auto prose prose-blue dark:prose-invert prose-headings:scroll-mt-20 px-4 py-6">
        {/* Hamburger menu button - positioned on the left side */}
        <div className="absolute left-0 top-4 z-10">
          <button 
            ref={buttonRef}
            onClick={toggleTOC}
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Table of Contents"
          >
            <Menu size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          {/* Table of Contents Tooltip/Popup */}
          {showTOC && (
            <div 
              ref={tocRef}
              className="absolute top-12 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50 max-h-[80vh] overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
              <div className="p-4">
                <TableOfContents headings={headings} activeHeading={activeHeading} />
              </div>
            </div>
          )}
        </div>
        
        {/* Main markdown content */}
        <div className="mt-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            components={components}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};