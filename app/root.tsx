import { useEffect, useState } from "react";
import type {
  LinksFunction,
  V2_MetaFunction,
  LoaderArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useLocation } from "react-router";
import {
  isRouteErrorResponse,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useRouteError,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";

import { User } from ".prisma/client";
import { getUser } from "./utils/session.server";
import stylesheet from "~/tailwind.css";
import { Document } from "~/components/document";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: V2_MetaFunction = () => {
  const description = "Learn Remix and laugh at the same time!";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Remix: So great, it's funny!" },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  return json({ user });
};

type AppProps = PropsWithChildren<{
  user: User | null;
}>;

export default function App() {
  const { pathname } = useLocation();
  const { user } = useLoaderData() as AppProps;
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", JSON.stringify(newValue));
  };

  useEffect(() => {
    const darkMode = JSON.parse(localStorage.getItem("darkMode") || "true");
    setDarkMode(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Document>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} />
      <main className="container mx-auto flex">
        {/* main content */}
        <div className="flex-1">
          <Outlet />
        </div>
        {/* sidebar */}
        {pathname !== "/login" ? <Sidebar /> : null}
      </main>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <div className="grid place-items-center h-screen">
          <span className="grid place-items-center">
            <h1 className="text-3xl font-bold uppercase text-red-700">
              {error.status} {error.statusText}
            </h1>
            <Link
              to="/"
              className="flex justify-center gap-3 text-neutral-700 dark:text-neutral-300"
            >
              Home
            </Link>
          </span>
        </div>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Uh-oh!">
      <div className="bg-red-500">
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
