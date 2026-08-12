import { useState, useMemo } from "react";
import { MapPin, Clock, Info, Users, Calendar, Trophy } from "lucide-react";

// ---- DATA ----
// This is the only part that changes week to week.
// Edit the CLUBS or TOURNAMENTS array below, commit, and push. No in-app editing.
// session.type: "open_mat" (drop-in randori) or "class" (regular structured training)
const CITIES = ["San Antonio", "Austin", "Waco", "Houston", "Dallas"];

const CLUBS = [
  {
    id: "stj",
    city: "San Antonio",
    name: "South Texas Judo",
    coach: "Coach Jerry Koch",
    address: "2424 Freedom Dr, San Antonio, TX 78217",
    color: "#8A6D3A", // brown belt
    sessions: [
      { day: "Monday", start: "6:30 AM", end: "8:00 AM", type: "class", label: "Co-ed" },
      { day: "Monday", start: "6:00 PM", end: "7:30 PM", type: "class", label: "Ladies only" },
      { day: "Monday", start: "7:30 PM", end: "9:00 PM", type: "class", label: "Co-ed" },
      { day: "Wednesday", start: "6:30 AM", end: "8:00 AM", type: "class", label: "Co-ed" },
      { day: "Wednesday", start: "6:00 PM", end: "7:30 PM", type: "class", label: "Ladies only" },
      { day: "Wednesday", start: "7:30 PM", end: "9:00 PM", type: "class", label: "Co-ed" },
      { day: "Saturday", start: "10:00 AM", end: "12:00 PM", type: "open_mat", label: "Co-ed" },
    ],
    notes: "",
    verified: "Aug 2026",
  },
  {
    id: "semperfortis",
    city: "San Antonio",
    name: "Semper Fortis Jiu Jitsu",
    coach: "",
    address: "5723 N Foster Rd, Ste 112, San Antonio, TX 78244",
    color: "#3B5B7A", // blue belt
    sessions: [
      { day: "Monday", start: "8:00 PM", end: "9:15 PM", type: "class" },
      { day: "Wednesday", start: "7:00 PM", end: "8:00 PM", type: "class" },
      { day: "Saturday", start: "10:00 AM", end: "11:30 AM", type: "class" },
    ],
    notes: "No dedicated judo open mat found on their schedule — classes only.",
    verified: "Aug 2026",
  },
  {
    id: "rpbjj",
    city: "San Antonio",
    name: "RPBJJ",
    coach: "Nina Cutro-Kelly",
    address: "4523 N Loop 1604 W, Ste 103, San Antonio, TX 78249",
    color: "#6B7A3B", // green belt
    sessions: [
      { day: "Tuesday", start: "7:15 PM", end: "8:15 PM", type: "class" },
      { day: "Friday", start: "6:00 PM", end: "7:00 PM", type: "class" },
    ],
    notes: "No dedicated judo open mat found on their schedule — classes only.",
    verified: "Aug 2026",
  },
  // ---- Austin ----
  {
    id: "austin-judo-club",
    city: "Austin",
    name: "Austin Judo Club",
    coach: "Rick Cockerham & Henry Bruns",
    address: "2913 Northland Dr, Austin, TX 78757",
    color: "#8A6D3A",
    sessions: [
      { day: "Monday", start: "6:30 PM", end: "7:30 PM", type: "class", label: "Teaching" },
      { day: "Monday", start: "7:30 PM", end: "8:30 PM", type: "class", label: "Practice/Cardio" },
      { day: "Wednesday", start: "6:30 PM", end: "7:30 PM", type: "class", label: "Teaching" },
      { day: "Wednesday", start: "7:30 PM", end: "8:30 PM", type: "class", label: "Practice/Cardio" },
    ],
    notes: "Adults only, no children's classes.",
    verified: "Aug 2026",
  },
  {
    id: "kokoro-judo",
    city: "Austin",
    name: "Kokoro Judo",
    coach: "",
    address: "1100 W Cesar Chavez St, Austin, TX 78703",
    color: "#3B5B7A",
    sessions: [
      { day: "Monday", start: "7:00 PM", end: "9:00 PM", type: "class" },
      { day: "Wednesday", start: "7:00 PM", end: "9:00 PM", type: "class" },
      { day: "Saturday", start: "10:30 AM", end: "3:00 PM", type: "class" },
    ],
    notes: "",
    verified: "Aug 2026",
  },
  {
    id: "texas-judo-ut",
    city: "Austin",
    name: "Texas Judo (UT Austin)",
    coach: "",
    address: "RSC 1.138, 2001 San Jacinto Blvd, Austin, TX 78712",
    color: "#6B7A3B",
    sessions: [
      { day: "Monday", start: "6:00 PM", end: "8:00 PM", type: "class" },
      { day: "Wednesday", start: "6:00 PM", end: "8:00 PM", type: "class" },
      { day: "Friday", start: "6:00 PM", end: "8:00 PM", type: "class" },
      { day: "Sunday", start: "11:00 AM", end: "1:00 PM", type: "class" },
    ],
    notes: "Student-led UT recreational sports club, open to students and faculty of all skill levels.",
    verified: "Aug 2026",
  },
  // ---- Waco ----
  {
    id: "waco-judo",
    city: "Waco",
    name: "Waco Judo",
    coach: "",
    address: "135 N Hewitt Dr, Ste 112, Hewitt, TX 76643",
    color: "#8A6D3A",
    sessions: [
      { day: "Monday", start: "8:30 PM", end: "9:30 PM", type: "class", label: "Adult" },
      { day: "Wednesday", start: "8:30 PM", end: "9:30 PM", type: "class", label: "Adult" },
      { day: "Friday", start: "7:00 PM", end: "8:30 PM", type: "class", label: "No-Gi" },
      { day: "Saturday", start: "12:00 PM", end: "1:00 PM", type: "class", label: "Family, 7+" },
    ],
    notes: "The only dedicated judo club in the Waco area, per their own site. Kids-only classes (ages 7-12) excluded.",
    verified: "Aug 2026",
  },
  // ---- Houston ----
  {
    id: "westlake-judo",
    city: "Houston",
    name: "Westlake Judo",
    coach: "",
    address: "20527 FM-1093 E, Unit A-5, Richmond, TX 77407",
    color: "#8A6D3A",
    sessions: [
      { day: "Tuesday", start: "6:30 PM", end: "7:30 PM", type: "class", label: "Kids/Beginners" },
      { day: "Tuesday", start: "7:30 PM", end: "9:00 PM", type: "class", label: "Adult" },
      { day: "Thursday", start: "6:30 PM", end: "7:30 PM", type: "class", label: "Kids/Beginners" },
      { day: "Thursday", start: "7:30 PM", end: "9:00 PM", type: "class", label: "Adult" },
      { day: "Saturday", start: "10:00 AM", end: "11:00 AM", type: "class", label: "Kids/Beginners" },
      { day: "Saturday", start: "11:00 AM", end: "12:30 PM", type: "class", label: "Adult" },
    ],
    notes: "",
    verified: "Aug 2026",
  },
  {
    id: "kenshukai-judo",
    city: "Houston",
    name: "Kenshukai Judo Club",
    coach: "",
    address: "5701 Bingle Rd, Ste. B-101, Houston, TX 77092 (inside Aikibudokan)",
    color: "#3B5B7A",
    sessions: [
      { day: "Monday", start: "7:30 PM", end: "9:30 PM", type: "class" },
      { day: "Wednesday", start: "7:30 PM", end: "9:30 PM", type: "class" },
      { day: "Saturday", start: "12:30 PM", end: "3:00 PM", type: "class" },
    ],
    notes: "Contact an instructor before dropping by.",
    verified: "Aug 2026",
  },
  {
    id: "htx-judo",
    city: "Houston",
    name: "HTX Judo & Jiujitsu",
    coach: "",
    address: "Holy Covenant United Methodist Church, 22111 Morton Ranch Rd, Katy, TX 77449",
    color: "#6B7A3B",
    sessions: [
      { day: "Wednesday", start: "5:30 PM", end: "8:00 PM", type: "class" },
      { day: "Thursday", start: "5:30 PM", end: "8:00 PM", type: "class" },
      { day: "Friday", start: "5:30 PM", end: "8:00 PM", type: "class" },
    ],
    notes: "Nonprofit program; site specifically welcomes veterans.",
    verified: "Aug 2026",
  },
  {
    id: "revolution-dojo",
    city: "Houston",
    name: "Revolution Dojo",
    coach: "",
    address: "Katy, TX",
    color: "#7A3B5B",
    sessions: [
      { day: "Tuesday", start: "7:00 PM", end: "9:00 PM", type: "class", label: "Advanced" },
      { day: "Thursday", start: "7:00 PM", end: "9:00 PM", type: "class", label: "Advanced" },
      { day: "Thursday", start: "8:00 PM", end: "9:30 PM", type: "class", label: "Fundamentals" },
    ],
    notes: "A third judo session appeared in one schedule screenshot without a confirmed day — left out rather than guessed. Confirm full address and remaining session if needed.",
    verified: "Aug 2026",
  },
  // ---- Dallas ----
  {
    id: "eastside-dojo",
    city: "Dallas",
    name: "Eastside Dojo",
    coach: "",
    address: "2655 Premier Dr, Plano, TX 75075",
    color: "#8A6D3A",
    sessions: [
      { day: "Monday", start: "9:00 AM", end: "10:00 AM", type: "class", label: "Adult" },
      { day: "Monday", start: "12:00 PM", end: "1:00 PM", type: "class", label: "Adult" },
      { day: "Monday", start: "8:00 PM", end: "9:00 PM", type: "class", label: "Adult Fundamentals" },
      { day: "Tuesday", start: "9:00 AM", end: "10:00 AM", type: "class", label: "Adult" },
      { day: "Tuesday", start: "12:00 PM", end: "1:00 PM", type: "class", label: "Adult" },
      { day: "Tuesday", start: "7:30 PM", end: "9:00 PM", type: "class", label: "Adult Competition" },
      { day: "Wednesday", start: "9:00 AM", end: "10:00 AM", type: "class", label: "Adult" },
      { day: "Wednesday", start: "12:00 PM", end: "1:00 PM", type: "class", label: "Adult" },
      { day: "Wednesday", start: "8:00 PM", end: "9:00 PM", type: "class", label: "Adult Fundamentals" },
      { day: "Thursday", start: "9:00 AM", end: "10:00 AM", type: "class", label: "Adult" },
      { day: "Thursday", start: "12:00 PM", end: "1:00 PM", type: "class", label: "Adult" },
      { day: "Thursday", start: "7:30 PM", end: "9:00 PM", type: "class", label: "Adult Competition" },
      { day: "Saturday", start: "10:00 AM", end: "11:30 AM", type: "class", label: "Adult Competition" },
    ],
    notes: "Kids-only classes excluded (Pee-Wee, Kid's Judo, Tournament Practice/bantam). Friday and Sunday hours not visible in source screenshots.",
    verified: "Aug 2026",
  },
];

// Tournaments: generic aggregated list from USA Judo's tournament locator.
// No personal info (divisions, registration status, notes) — just what/when/where + source link.
// Individual event pages on USA Judo's site aren't directly linkable (JS-driven locator),
// so every entry points to the same locator page rather than a fake per-event URL.
const USAJUDO_LOCATOR = "https://usajudo.sport80.com/e_locator/tournaments/find";

const TOURNAMENTS = [
  {
    id: "vet-open-houston-2026",
    name: "Veterans Open Houston",
    date: "2026-08-29",
    location: "Baytown, TX",
    sourceUrl: USAJUDO_LOCATOR,
  },
  {
    id: "ohio-judo-champs-2026",
    name: "2026 Ohio Judo Championships",
    date: "2026-09-05",
    location: "Lebanon, OH",
    sourceUrl: USAJUDO_LOCATOR,
  },
  {
    id: "becerra-judo-champ-2026",
    name: "Becerra Judo Championship",
    date: "2026-09-12",
    location: "Plano, TX",
    sourceUrl: USAJUDO_LOCATOR,
  },
  {
    id: "suncoast-warriors-2026",
    name: "2026 Suncoast Warriors Judo Championships",
    date: "2026-09-25",
    endDate: "2026-09-26",
    location: "Ft. Pierce, FL",
    sourceUrl: USAJUDO_LOCATOR,
  },
  {
    id: "shogun-showdown-2026",
    name: "Shogun Showdown Championship",
    date: "2026-10-03",
    location: "Mesa, AZ",
    sourceUrl: USAJUDO_LOCATOR,
  },
  {
    id: "fight-for-cure-2026",
    name: "9th Annual Fight for the Cure Charity Judo Shiai",
    date: "2026-10-11",
    location: "Riverside, CA",
    sourceUrl: USAJUDO_LOCATOR,
  },
  {
    id: "denver-classic-2026",
    name: "2026 Denver Classic Judo Championship",
    date: "2026-11-07",
    location: "Denver, CO",
    sourceUrl: USAJUDO_LOCATOR,
  },
  {
    id: "dallas-open-2026",
    name: "60th Annual Dallas Open",
    date: "2026-11-21",
    location: "Irving, TX",
    sourceUrl: USAJUDO_LOCATOR,
  },
  {
    id: "pan-am-adaptive-2027",
    name: "3rd Annual Pan American Adaptive Judo Games",
    date: "2027-02-28",
    location: "Riverside, CA",
    sourceUrl: USAJUDO_LOCATOR,
  },
];

const DAY_ORDER = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function timeToMinutes(t) {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let [, h, min, ap] = m;
  h = parseInt(h, 10);
  min = parseInt(min, 10);
  if (/pm/i.test(ap) && h !== 12) h += 12;
  if (/am/i.test(ap) && h === 12) h = 0;
  return h * 60 + min;
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function daysUntil(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso + "T00:00:00");
  return Math.round((target - today) / 86400000);
}

function allSessionsByType(clubs, type) {
  const out = [];
  clubs.forEach((club) => {
    club.sessions
      .filter((s) => s.type === type)
      .forEach((s) => out.push({ ...s, club }));
  });
  return out;
}

function ClubCard({ club }) {
  const openMatSessions = club.sessions.filter((s) => s.type === "open_mat");
  const hasSessions = openMatSessions.length > 0;

  return (
    <div className="rounded-none border-2 border-[#1B2A20] bg-[#F6F4EC] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl leading-tight text-[#1B2A20] tracking-tight">
            {club.name}
          </h3>
          {club.coach && (
            <p className="mt-0.5 text-sm text-[#5B6B5B] font-medium">{club.coach}</p>
          )}
        </div>
        {club.verified && (
          <span className="shrink-0 text-[10px] uppercase tracking-widest font-semibold text-[#5B6B5B] border border-[#5B6B5B]/40 px-2 py-1">
            Checked {club.verified}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 text-sm text-[#3D4A3D]">
        <MapPin size={16} className="mt-0.5 shrink-0" />
        <span>{club.address}</span>
      </div>

      <div className="mt-4 border-t border-[#1B2A20]/15 pt-4">
        {hasSessions ? (
          <ul className="space-y-2">
            {[...openMatSessions]
              .sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day))
              .map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-[#1B2A20] flex-wrap">
                  <Clock size={16} className="shrink-0" style={{ color: club.color }} />
                  <span className="font-semibold">{s.day}</span>
                  <span className="text-[#3D4A3D]">
                    {s.start} – {s.end}
                  </span>
                  {s.label && (
                    <span
                      className="text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 border"
                      style={{ borderColor: club.color, color: club.color }}
                    >
                      {s.label}
                    </span>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <div className="flex items-start gap-2 text-sm italic" style={{ color: club.color }}>
            <Info size={16} className="mt-0.5 shrink-0" />
            <span>No open mat hours logged yet.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function WeekAgenda({ clubs }) {
  const classSessions = allSessionsByType(clubs, "class");
  const hasAny = classSessions.length > 0;

  return (
    <div className="space-y-5">
      {!hasAny && (
        <div className="rounded-none border-2 border-[#1B2A20] bg-[#F6F4EC] p-6 flex items-start gap-2 text-sm italic text-[#8A6D3A]">
          <Info size={16} className="mt-0.5 shrink-0" />
          <span>
            No regular class times logged yet for this city.
          </span>
        </div>
      )}

      {DAY_ORDER.slice(1).concat(DAY_ORDER[0]).map((day) => {
        const daySessions = classSessions
          .filter((s) => s.day === day)
          .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

        if (daySessions.length === 0) return null;

        return (
          <div key={day}>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5B6B5B] mb-2">
              {day}
            </h4>
            <div className="space-y-2">
              {daySessions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-2 border-[#1B2A20] bg-[#F6F4EC] pl-3 pr-4 py-3"
                  style={{ borderLeftColor: s.club.color, borderLeftWidth: 6 }}
                >
                  <Clock size={16} className="shrink-0" style={{ color: s.club.color }} />
                  <div className="flex-1">
                    <div className="font-semibold text-[#1B2A20]">
                      {s.start} – {s.end}
                    </div>
                    <div className="text-sm text-[#5B6B5B]">{s.club.name}</div>
                  </div>
                  {s.label && (
                    <span
                      className="shrink-0 text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 border"
                      style={{ borderColor: s.club.color, color: s.club.color }}
                    >
                      {s.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TournamentCard({ t }) {
  const days = daysUntil(t.date);
  const dateLabel = t.endDate
    ? `${formatDate(t.date)} – ${formatDate(t.endDate)}`
    : formatDate(t.date);

  return (
    <div className="rounded-none border-2 border-[#1B2A20] bg-[#F6F4EC] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl sm:text-2xl leading-tight text-[#1B2A20] tracking-tight">
          {t.name}
        </h3>
        <span className="shrink-0 text-[10px] uppercase tracking-widest font-semibold text-[#8A6D3A] border border-[#8A6D3A]/40 px-2 py-1">
          {days <= 0 ? (days === 0 ? "Today" : "In progress") : days === 1 ? "Tomorrow" : `${days} days`}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm text-[#3D4A3D] font-semibold">
        <Trophy size={16} className="shrink-0 text-[#8A6D3A]" />
        {dateLabel}
      </div>

      <div className="mt-2 flex items-start gap-2 text-sm text-[#3D4A3D]">
        <MapPin size={16} className="mt-0.5 shrink-0" />
        <span>{t.location}</span>
      </div>
    </div>
  );
}

function TournamentsList() {
  const upcoming = TOURNAMENTS.filter((t) => daysUntil(t.endDate || t.date) >= 0);
  const sorted = [...upcoming].sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sorted.length === 0) {
    return (
      <div className="rounded-none border-2 border-[#1B2A20] bg-[#F6F4EC] p-6 flex items-start gap-2 text-sm italic text-[#8A6D3A]">
        <Info size={16} className="mt-0.5 shrink-0" />
        <span>No upcoming tournaments logged.</span>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {sorted.map((t) => (
          <TournamentCard key={t.id} t={t} />
        ))}
      </div>
      <p className="mt-5 text-xs text-[#5B6B5B]">
        Checked quarterly, not weekly like the club schedules. For
        registration, entry requirements, and full details, see the{" "}
        <a
          href={USAJUDO_LOCATOR}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 text-[#8A6D3A] font-semibold"
        >
          USA Judo tournament locator
        </a>
        .
      </p>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("San Antonio");
  const [tab, setTab] = useState("open_mat");

  const cityClubs = useMemo(() => CLUBS.filter((c) => c.city === city), [city]);

  return (
    <div className="min-h-screen bg-[#EFEDE2] text-[#1B2A20]">
      <div className="mx-auto max-w-md px-4 py-8 sm:max-w-xl">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A6D3A] font-semibold mb-1">
            Texas
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl leading-none tracking-tight">
            Mat Time
          </h1>
          <p className="mt-3 text-sm text-[#5B6B5B] max-w-sm">
            Manually verified, not scraped. No account, no sign-up.
          </p>
        </header>

        <div className="flex border-2 border-[#1B2A20] mb-5">
          <button
            onClick={() => setTab("open_mat")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
              tab === "open_mat"
                ? "bg-[#1B2A20] text-[#EFEDE2]"
                : "bg-transparent text-[#1B2A20]"
            }`}
          >
            <Users size={16} />
            Open Mat
          </button>
          <button
            onClick={() => setTab("schedule")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wide transition-colors border-l-2 border-[#1B2A20] ${
              tab === "schedule"
                ? "bg-[#1B2A20] text-[#EFEDE2]"
                : "bg-transparent text-[#1B2A20]"
            }`}
          >
            <Calendar size={16} />
            Class Schedule
          </button>
          <button
            onClick={() => setTab("tournaments")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wide transition-colors border-l-2 border-[#1B2A20] ${
              tab === "tournaments"
                ? "bg-[#1B2A20] text-[#EFEDE2]"
                : "bg-transparent text-[#1B2A20]"
            }`}
          >
            <Trophy size={16} />
            Tournaments
          </button>
        </div>

        {tab !== "tournaments" && (
          <div className="mb-6 -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-2 w-max">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`shrink-0 px-3 py-1.5 text-xs uppercase tracking-wide font-semibold border-2 border-[#1B2A20] transition-colors ${
                    city === c
                      ? "bg-[#1B2A20] text-[#EFEDE2]"
                      : "bg-transparent text-[#1B2A20]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "tournaments" ? (
          <TournamentsList />
        ) : cityClubs.length === 0 ? (
          <div className="rounded-none border-2 border-[#1B2A20] bg-[#F6F4EC] p-6 flex items-start gap-2 text-sm italic text-[#8A6D3A]">
            <Info size={16} className="mt-0.5 shrink-0" />
            <span>No clubs logged yet for {city}.</span>
          </div>
        ) : tab === "open_mat" ? (
          <div className="space-y-4">
            {cityClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <WeekAgenda clubs={cityClubs} />
        )}

        <footer className="mt-10 pt-6 border-t border-[#1B2A20]/15 text-xs text-[#5B6B5B] space-y-3">
          <p>
            Hours are manually verified, not scraped — schedules change
            without notice, always call ahead before driving out.
          </p>
        </footer>
      </div>
    </div>
  );
}
