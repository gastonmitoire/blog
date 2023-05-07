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

export function Document({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="keywords" content="Remix,jokes" />
        <meta
          name="twitter:image"
          content="https://remix-jokes.lol/social.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@remix_run" />
        <meta name="twitter:site" content="@remix_run" />
        <meta name="twitter:title" content="Remix Jokes" />
        <Meta />
        {title ? <title>{title}</title> : null}
        <Links />
      </head>
      <body
        className="bg-neutral-100 dark:bg-neutral-900"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          background: `url('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.hdwallpaperspulse.com%2Fwp-content%2Fuploads%2F2017%2F12%2F23%2Fbeautiful-hd-widescreen-image.jpg&f=1&nofb=1&ipt=14f14486b2b0b252e46f27611f709f8016a9eb0ba7f651d550e77eb570b01e60&ipo=images')`,
        }}
      >
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
