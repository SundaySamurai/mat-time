# Mat Time

A no-account, no-sign-up schedule tracker for judo clubs and tournaments
across Texas (San Antonio, Austin, Waco, Houston, Dallas), New York City,
Glenville NY (Jason Morris Judo Center, upstate), and Central NJ (Warren,
Cranford — grouped together since they're about 10-12 miles apart). Three
tabs: open mat drop-in hours, full weekly class schedules, and upcoming
tournaments.

Hours are manually verified against each club's own site/socials, not
scraped — see the "Checked" date on each card. Each Class Schedule city
also opens with a compact club directory (address with a copy button,
phone, website) so you don't need the Open Mat tab just to get in touch
with a club.

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
- **Kokushi Budo Institute** (New York, NY): only Monday, Wednesday,
  Thursday, and Friday were visible in the source schedule. Tuesday,
  Saturday, and Sunday are unconfirmed, not "closed."
- **Colton Brown Training Center** (Central NJ / Warren): only
  Monday–Thursday and Saturday were visible in the source schedule.
  Friday and Sunday are unconfirmed, not "closed."
- **Cranford JKC-Yonezuka Dojo** (Central NJ / Cranford): no instructor
  names were listed in the source schedule, and the source only gives
  start times — all sessions are shown as 1-hour blocks, which may not
  match actual class length.
- **Oishi Judo** (New York, NY): adult class times are start-time only on
  their site (no end times), shown here as 1-hour blocks — actual
  duration not confirmed. Andrew Pernambuco and Jeff Summa alternate
  teaching Mon/Tue/Thu; which one teaches which day isn't specified.
- **Kano Martial Arts** (New York, NY): only pure "Judo"/"Judo Basics"
  sessions are included — their mixed "GI (Judo + BJJ)" classes were
  excluded by request. The source schedule screenshot was cut off at the
  bottom, so some evening sessions may be missing.
- **Jason Morris Judo Center** (Glenville, NY): no instructor names
  listed on their site.
- `club.phone` / `club.website` are only filled in for the clubs where a
  source screenshot happened to show one — most clubs don't have them yet.
- No feedback/suggestion form is wired up yet.

## Maintenance

- Club schedules: checked quarterly
- Tournaments: checked quarterly
- 16 clubs across Texas, New York, and New Jersey as of Aug 2026
