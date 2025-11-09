import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { useEffect } from "react";

import globalStylesHref from "~/styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStylesHref },
  { rel: "manifest", href: "/manifest.webmanifest" },
  { rel: "icon", href: "/icons/icon-192.svg", type: "image/svg+xml" }
];

export const meta: MetaFunction = () => [{ title: "Hallo World Remix PWA" }];

export default function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) => console.error("Service worker registration failed", error));
    }
  }, []);

  return (
    <html lang="en" className="h-full bg-slate-950 text-slate-100">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <Meta />
        <Links />
      </head>
      <body className="h-full min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
