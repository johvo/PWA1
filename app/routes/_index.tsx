import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "Hallo World Remix PWA" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const now = new Date();
  const url = new URL(request.url);
  return json({
    initialTimestamp: now.toISOString(),
    origin: url.origin
  });
}

export default function Index() {
  const { initialTimestamp, origin } = useLoaderData<typeof loader>();
  const [currentTime, setCurrentTime] = useState(() => new Date(initialTimestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Hallo World</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">Remix Progressive Web App</h1>
      </div>
      <section className="rounded-3xl border border-slate-700 bg-slate-900/70 px-8 py-10 shadow-xl">
        <p className="text-lg text-slate-300">Today is</p>
        <p className="text-3xl font-bold text-white sm:text-4xl">{formattedDate}</p>
        <p className="mt-4 text-5xl font-mono tabular-nums text-sky-300 sm:text-6xl">
          {formattedTime}
        </p>
      </section>
      <p className="max-w-lg text-balance text-sm text-slate-400">
        Installed as a PWA, this offline-ready Remix app will continue to show the
        most recent time you visited even when connectivity drops. Add it to your
        home screen or desktop to keep the current date and time close at hand.
      </p>
      <p className="text-xs text-slate-500">
        Served from <span className="font-semibold text-slate-300">{origin}</span>
      </p>
    </main>
  );
}
