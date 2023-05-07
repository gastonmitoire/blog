import { Accordion } from "./accordion";

interface SidebarListProps {
  title: string;
  items: { [key: string]: any }[];
}

export const SidebarList: React.FC<SidebarListProps> = ({ title, items }) => {
  return (
    <Accordion title={title}>
      <div className="flex flex-col gap-2">
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-left text-neutral-700 bg-white dark:bg-neutral-900 dark:text-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75"
              >
                <span>{item.name}</span>
                {item.count && (
                  <span className="text-neutral-500">{item.count}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Accordion>
  );
};
