# Resume Builder

A client-side resume builder supporting **Persian (RTL)**, **English**, and **German** — with 3 professional templates and PDF export.

**Live demo → [alirewa.github.io/resume-builder-Fa](https://alirewa.github.io/resume-builder-Fa/)**

---

## Features

- 3 templates (Classic / Modern / Creative) — full RTL & LTR support
- Resume language switcher: FA · EN · DE
- Custom accent color picker
- Dark mode
- Profile photo upload
- PDF download + browser print
- JSON import / export (save & restore your data)
- Mobile-responsive preview with smart scaling
- Auto-save via localStorage

## Stack

| | |
|---|---|
| Next.js 16 (App Router) | React 19 + TypeScript |
| Tailwind CSS v4 | Zustand v5 |
| html2canvas + jsPDF | Vazirmatn font |

## Run locally

```bash
git clone https://github.com/Alirewa/resume-builder-Fa.git
cd resume-builder-Fa
npm install
npm run dev          # → http://localhost:3000
```

## Deploy

The project is pre-configured for **GitHub Pages** via GitHub Actions.

Push to `master` → Actions builds `next export` → deploys to `gh-pages`.

To enable in your own fork:
1. Go to **Settings → Pages → Source** and choose **GitHub Actions**
2. Push any commit — the workflow runs automatically

## License

MIT — built with ❤️ by [@Alirewa](https://github.com/Alirewa)
