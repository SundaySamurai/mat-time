# Mat Time

A no-account, no-sign-up schedule tracker for judo clubs and tournaments
across Texas (San Antonio, Austin, Waco, Houston, Dallas). Three tabs:
open mat drop-in hours, full weekly class schedules, and upcoming
tournaments.

Hours are manually verified against each club's own site/socials, not
scraped — see the "Checked" date on each card.

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- [lucide-react](https://lucide.dev/) for icons

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Updating schedule data

All club and tournament data lives in two arrays at the top of
`src/App.jsx`: `CLUBS` and `TOURNAMENTS`. There's no admin UI or backend
by design — to update the site:

1. Edit the relevant entry in `CLUBS` or `TOURNAMENTS`.
2. Commit and push.
3. If the repo is connected to Vercel/Netlify, it redeploys automatically
   on push to `main`.

## Known gaps

- **Revolution Dojo** (Houston): a third judo session was visible in a
  source screenshot without a confirmed day, so it was left out. Confirm
  before adding.
- **Eastside Dojo** (Dallas): Friday/Sunday hours weren't visible in the
  source schedule. Currently shows nothing for those days — not confirmed
  as "closed," just unconfirmed.
- **The Judokai** and **Becerra Judo** (both Dallas area): deliberately
  left out — conflicting or incomplete public schedule info. Needs a
  phone call to confirm before adding.
- No feedback/suggestion form is wired up yet.

## Maintenance

- Club schedules: checked quarterly
- Tournaments: checked quarterly
- 11 clubs across 5 Texas cities as of Aug 2026
