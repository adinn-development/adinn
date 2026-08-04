# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server with Turbopack (http://localhost:3000)
npm run build    # production build
npm run start    # run the production build
npm run lint     # next lint
```

There is no test suite configured in this repo.

## Architecture

Next.js 16 App Router site (TypeScript, React 19, Tailwind CSS 4) for Adinn, an advertising/OOH media agency. Marketing site with no auth, no CMS, and no database access from application code — despite `mongodb`/`mongoose` being listed in `package.json`, nothing in the codebase currently uses them.

### Routing (`app/`)

Each route under `app/` is a thin page component that composes section components from `components/`:
- `app/page.tsx` — home
- `app/about-us`, `app/careers`, `app/contact`, `app/service` — static marketing pages
- `app/projects/page.tsx` — projects listing
- `app/projects/[id]/page.tsx` — project detail, resolved client-side via `useParams()` against the flattened `contents` array from `data/projects.ts` (not statically generated per-id)

`app/layout.tsx` is the root layout: loads local fonts (Plus Jakarta Sans, Instrument Serif) via `next/font/local`, and wires up third-party scripts directly (Google Analytics via `@next/third-parties`, GTM noscript iframe, Facebook Pixel, Microsoft Clarity) — all inlined here rather than abstracted, so check this file first when touching tracking/analytics.

### Components (`components/`)

Organized by page/section, not by atomic-design layers, e.g. `components/Home/*`, `components/AboutUs/*`, `components/Projects/*`, `components/service/*`, `components/careers/*`, `components/Contact/*`. `components/reusable-components/` holds cross-page pieces: `TopNav.tsx`, `Footer.tsx`, `Loading.tsx`, `VideoImage.tsx`, and `Icons/Icons.ts` (a large central barrel file re-exporting every static image/icon asset import used across the site — add new image assets here rather than importing them ad hoc).

Most interactive components are client components (`"use client"`) using local `useState`/`useEffect`; there is no global state management.

### Content data (`data/projects.ts`)

`contents` is the single source of truth for the Projects section: an array of categories (e.g. "Outdoor Media", "Roadshow"), each with an `images` array of project entries (`id`, `image`, `alt`, `name`, `overview` steps, `contents` stat blocks). Both `app/projects/page.tsx` and `app/projects/[id]/page.tsx` derive their data by mapping/flattening this array. When adding a project, add an entry here and its image import in `Icons/Icons.ts`.

### Forms and external submission

Forms (`components/Contact/Form.tsx`, `components/careers/adinncareerform.tsx`) do not use a backend API route in this repo — they `fetch()` directly to an external PHP backend at `adinndigital.com/api/...` (`index_adinnenquiry.php` for contact, `careers/index_adinncareers.php` for careers, the latter via `multipart/form-data` for resume upload). Both forms implement their own client-side math CAPTCHA and validation, and use `react-toastify` / a custom toast for feedback. Keep the `mailtype` field and payload shape in sync with the external endpoint's expectations when editing these forms.

### Styling

Tailwind CSS 4 (`tailwind.config.ts` scans `pages/`, `components/`, `app/`) with two custom font families mapped to CSS variables set in `layout.tsx` (`--font-jakarta`, `--font-instrument`). Colors are mostly hard-coded hex values inline in `className` (e.g. `#EC2B45`, `#CF1E00`) rather than theme tokens — match existing hex values when styling new UI rather than introducing new brand colors. A few components (`adinncareerform.tsx`) use `styled-jsx` (`<style jsx>`) blocks instead of Tailwind for larger custom sections.

### Assets

Static images/videos live in `assets/` (imported into components, organized by page: `assets/home`, `assets/projects/<category>`, `assets/about`, `assets/service`, etc.) and `public/` (referenced by absolute path, e.g. hero/background videos, logos, `sitemap.xml`). Prefer `assets/` + import via `Icons/Icons.ts` for anything used as a Next `<Image>` source; use `public/` only for assets referenced by raw URL or needed outside the bundler.
