import React from "react";
import { ChevronRight } from "lucide-react";

export const TableOfContents = ({ headings, activeHeading }) => {
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <nav className="py-2">
        <ul className="space-y-1">
          {headings.map((heading) => {
            // Calculate indentation based on heading level
            const indentClass =
              heading.level === 1
                ? ""
                : heading.level === 2
                ? "ml-2"
                : heading.level === 3
                ? "ml-4"
                : "ml-6";

            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`
                    flex items-center py-1.5 px-3 rounded-md transition-colors duration-200
                    ${
                      activeHeading === heading.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                    ${indentClass}
                    ${heading.level === 1 ? "text-sm font-medium" : "text-sm"}
                  `}
                >
                  {heading.level > 1 && (
                    <ChevronRight size={14} className="mr-1.5 flex-shrink-0" />
                  )}
                  <span className="hover:underline line-clamp-2">
                    {heading.text}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
