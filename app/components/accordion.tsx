import { useState } from "react";

type AccordionProps = {
  defaultExpanded?: boolean;
  title: string;
  children: React.ReactNode;
};

export const Accordion = ({
  defaultExpanded = true,
  title,
  children,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="flex-0 flex flex-col bg-neutral-200 dark:bg-neutral-800 shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${
          isExpanded ? "rounded-t-md" : "rounded-md"
        } flex items-center justify-between w-full px-3 py-2 font-medium text-left text-neutral-700 bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75`}
      >
        <span>{title}</span>
        <svg
          className={`${
            isExpanded ? "transform rotate-180" : ""
          } w-5 h-5 transition-transform`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          />
        </svg>
      </button>
      <div
        className={`${
          isExpanded ? "block" : "hidden"
        } bg-neutral-200 dark:bg-neutral-800 rounded-b-md px-3`}
      >
        {children}
      </div>
    </div>
  );
};
