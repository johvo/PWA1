# Hallo World Remix PWA

This project is a minimal Progressive Web App built with [Remix](https://remix.run). It displays the current date and time, updates live in the browser, and includes the essentials for installation as a PWA (manifest, SVG icons, and service worker).

## Getting started

```bash
npm install
npm run dev
```

The development server runs on <http://localhost:3000>. Visit the site in a modern browser to see the time update every second. Use the browser's "Install" or "Add to Home Screen" action to install the PWA.

To create a production build, run:

```bash
npm run build
```

Then serve it with:

```bash
npm run start
```

## Offline support

The service worker pre-caches the application shell so the UI remains available when the network is unavailable. Any additional requests are cached on demand for subsequent visits.
