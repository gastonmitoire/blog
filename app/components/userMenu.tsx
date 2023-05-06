import type { User } from "@prisma/client";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

import { Popover } from "./popover";

type Props = {
  user: User | null;
};

export function UserMenu(props: Props) {
  const { user } = props;

  console.log(user);

  if (!user) {
    return <div>No user found</div>;
  }

  const MenuButton = () => {
    return (
      <span className="flex items-center gap-3">
        <strong className="text-lg text-neutral-700 dark:text-neutral-300">
          {user.username}
        </strong>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-neutral-700 dark:text-neutral-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </span>
    );
  };

  return (
    <div>
      <Popover button={<MenuButton />}>
        <ul className="py-1.5 rounded-md">
          <li className="p-3 rounded-md hover:bg-neutral-300 hover:bg-opacity-30 dark:hover:bg-opacity-10 cursor-pointer">
            <a
              href={"/profile"}
              className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <span className="uppercase text-sm">Profile</span>
            </a>
          </li>
          <li className="rounded-md hover:bg-neutral-300 hover:bg-opacity-30 dark:hover:bg-opacity-10 cursor-pointer">
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="flex items-center w-full gap-3 p-3 text-neutral-700 uppercase dark:text-neutral-300 text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Logout
              </button>
            </Form>
          </li>
        </ul>
      </Popover>

      {/* ... render other user data ... */}
    </div>
  );
}
