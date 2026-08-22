# Resume Builder

A client-side resume builder supporting **Persian (RTL)**, **English**, and **German** — with 3 professional templates and PDF export. Nothing leaves your browser.

**Live demo → [alirewa.github.io/Resume-Builder](https://alirewa.github.io/Resume-Builder/)**

---

## Features

- **3 templates** — Classic (single column, ATS-friendly), Modern (two column), Creative (timeline)
- **Two independent languages** — write a German CV while using the app in Persian; the interface and the document each have their own language
- **Full RTL & LTR support**, including mirrored layouts and the Vazirmatn font
- **Custom accent colour** that themes both the resume *and* the app
- **Empty sections are omitted** from the finished resume, with a toggle to show them as reminders while editing
- **Dark mode**, applied before first paint — no flash
- **Profile photo** upload, downscaled automatically so it never overruns browser storage
- **PDF download** + browser print (print gives selectable, ATS-readable text)
- **JSON import / export**, validated on the way in so a bad file can never corrupt your resume
- **Reorder entries**, completeness meter, one-step undo for destructive actions
- **Auto-save** to localStorage, with schema migration for documents saved by older versions

## Stack

| | |
|---|---|
| Next.js 16 (App Router, static export) | React 19 + TypeScript |
| Tailwind CSS v4 | Zustand v5 (persisted) |
| Zod v4 (schema validation) | html2canvas-pro + jsPDF |

> `html2canvas-pro` replaces `html2canvas`, which cannot parse the modern
> `oklch()` colours Tailwind v4 emits and failed every export.

## Run locally

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

```bash
npm run build
```

```bash
npm run lint
```

## Project layout

```
app/           routes: home, builder, preview, showcase
components/
  builder/     the five form steps + shared step chrome
  templates/   the three resume designs + shared primitives
  ui/          buttons, fields, modal, popover, toasts, theme sync
lib/
  store.ts     zustand store, persistence and migration
  schema.ts    zod schema — validates imports and persisted data
  ui.ts        app-shell translations (FA / EN / DE)
  translations.ts  resume-document translations (FA / EN / DE)
  resume.ts    derived facts: section presence, completeness, filenames
```

## Deploy

The project is pre-configured for **GitHub Pages** via GitHub Actions.

Push to `master` → Actions builds the static export → deploys to Pages.

To enable in your own fork:

1. Go to **Settings → Pages → Source** and choose **GitHub Actions**
2. Push any commit — the workflow runs automatically

## License

MIT — built with ❤️ by [@Alirewa](https://github.com/Alirewa)
