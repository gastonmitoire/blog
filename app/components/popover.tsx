import React from "react";
import { useState } from "react";

interface PopoverProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

export function Popover({ button, children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        title="Abre menu de usuário"
        type="button"
        className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white border border-transparent rounded-md hover:shadow hover:inset-shadow dark:hover:shadow dark:hover:inset-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onMouseEnter={() => setIsOpen(true)}
      >
        {button}
      </button>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          onBlur={() => setIsOpen(false)}
          className="absolute right-0 w-56 origin-top-right bg-neutral-100 dark:bg-neutral-700 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {children}
        </div>
      )}
    </div>
  );
}
