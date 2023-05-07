import { Button } from "./button";

import { SidebarList } from "./sidebar_list";

export function Sidebar() {
  return (
    <aside className="flex-0 flex flex-col overflow-y-auto gap-3 h-[85vh] min-w-[30%] p-3 bg-neutral-200 bg-opacity-90 dark:bg-neutral-800 dark:bg-opacity-90">
      <Button
        title="Create new post"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 stroke-neutral-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        }
      >
        <span>New Post</span>
      </Button>
      <SidebarList
        title="Categories"
        items={[
          { name: "React", count: 3 },
          { name: "Next.js", count: 2 },
          { name: "Tailwind CSS", count: 1 },
        ]}
      />
      <SidebarList
        title="Tags"
        items={[
          { name: "React", count: 3 },
          { name: "Next.js", count: 2 },
          { name: "Tailwind CSS", count: 1 },
        ]}
      />
      <SidebarList
        title="Archives"
        items={[
          { name: "September 2021", count: 3 },
          { name: "August 2021", count: 2 },
          { name: "July 2021", count: 1 },
        ]}
      />
      <SidebarList
        title="Authors"
        items={[
          { name: "John Doe", count: 3 },
          { name: "Jane Doe", count: 2 },
          { name: "John Smith", count: 1 },
        ]}
      />
    </aside>
  );
}
