import { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";

const LEAF_COLORS = ["var(--olive)", "var(--wine)", "oklch(0.62 0.13 55)", "oklch(0.72 0.12 85)"];

export function AutumnLeaves() {
  const [leaves, setLeaves] = useState<
    { left: number; delay: number; dur: number; size: number; color: string }[]
  >([]);
  useEffect(() => {
    setLeaves(
      Array.from({ length: 12 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 14,
        dur: 14 + Math.random() * 10,
        size: 10 + Math.random() * 10,
        color: LEAF_COLORS[i % LEAF_COLORS.length]!,
      })),
    );
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {leaves.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-leaf-fall absolute top-0"
          style={{
            left: `${l.left}%`,
            width: l.size,
            height: l.size,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.dur}s`,
            opacity: 0,
          }}
        >
          <path
            d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12Zm0 4v16"
            fill={l.color}
            fillOpacity={0.55}
          />
        </svg>
      ))}
    </div>
  );
}

const TITLE = "ანეტა & გიორგი — ქორწილი";
const DETAILS = "ჯვრისწერა 14:00 — ნინოწმინდის მონასტერი; ხელისმოწერა 16:30 და ვახშამი 18:00 — გიუაანი მეღვინეობა";
const LOCATION = "ნინოწმინდის მონასტერი, საგარეჯო";
const START = "20261031T100000Z";
const END = "20261031T200000Z";

export function AddToCalendar() {
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    TITLE,
  )}&dates=${START}/${END}&details=${encodeURIComponent(DETAILS)}&location=${encodeURIComponent(LOCATION)}`;

  function downloadIcs() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//wedding//EN",
      "BEGIN:VEVENT",
      `UID:aneta-giorgi-20261031@wedding`,
      `DTSTAMP:${START}`,
      `DTSTART:${START}`,
      `DTEND:${END}`,
      `SUMMARY:${TITLE}`,
      `DESCRIPTION:${DETAILS}`,
      `LOCATION:${LOCATION}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "aneta-giorgi-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  const cls =
    "inline-flex items-center gap-2 rounded-full border border-olive/30 bg-parchment/80 px-4 py-2 font-geo text-xs tracking-[0.12em] text-olive backdrop-blur-[2px] transition hover:bg-olive hover:text-parchment";
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-2">
      <a href={google} target="_blank" rel="noreferrer" className={cls}>
        <CalendarPlus className="h-3.5 w-3.5" strokeWidth={1.5} />
        Google კალენდარი
      </a>
      <button type="button" onClick={downloadIcs} className={cls}>
        <CalendarPlus className="h-3.5 w-3.5" strokeWidth={1.5} />
        Apple / სხვა
      </button>
    </div>
  );
}
