import { useEffect, useState } from "react";
import type {
  LinksFunction,
  V2_MetaFunction,
  LoaderArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";
import {
  isRouteErrorResponse,
  Links,
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

type Data = { user: User };

export default function App() {
  const data = useLoaderData() as unknown as Data;
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
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={data.user}
      />
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <div className="error-container">
          <h1>
            {error.status} {error.statusText}
          </h1>
        </div>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
