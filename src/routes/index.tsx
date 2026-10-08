import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SparkleTitle } from "@/components/SparkleTitle";
import { Typewriter } from "@/components/Typewriter";
import { Schedule } from "@/components/Schedule";
import { Guestbook } from "@/components/Guestbook";
import MusicPlayer from "@/components/MusicPlayer";
import { AddToCalendar } from "@/components/Extras";
import { sendToGoogleSheets } from "@/lib/googleSheets";

const panelImg = "/images/panel.jpg";
const bowImg = "/images/bow.png";
const archImg = "/images/arch.jpg";
const envelopeImg = "/images/envelope.png";
const WEDDING_DATE = new Date("2026-11-12T17:00:00+04:00");
const OG_IMAGE =
  "https://project--29d3676c-79dc-4353-9774-21b5d96eb7be.lovable.app/images/og-share.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "გეპატიჟებით ჩვენს ქორწილში — ლიკა & მიშა" },
      {
        name: "description",
        content: "ლიკა & მიშა · 12 ნოემბერი, 2026 · 17:00",
      },
      { property: "og:title", content: "გეპატიჟებით ჩვენს ქორწილში" },
      { property: "og:description", content: "ლიკა & მიშა · 12 ნოემბერი, 2026 · 17:00" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "გეპატიჟებით ჩვენს ქორწილში" },
      { name: "twitter:description", content: "ლიკა & მიშა · 12 ნოემბერი, 2026 · 17:00" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [open, setOpen] = useState(false);
  const startX = useRef<number | null>(null);
  const openCard = useCallback(() => setOpen(true), []);

  return (
    <main className="relative min-h-screen bg-backdrop">
      <h1 className="sr-only">ლიკა და მიშა — ქორწილის მოწვევა, 12 ნოემბერი, 2026 · 17:00</h1>

      <div
        className={`transition-all duration-[1600ms] ease-out ${
          open
            ? "opacity-100 blur-0"
            : "pointer-events-none h-screen overflow-hidden opacity-70 blur-[2px]"
        }`}
      >
        <Hero />
        <ChildhoodPhoto />
        <EnvelopeSection />
        <Schedule />
        <DressCode />
        <CoupleImage />
        <Rsvp />
        <Guestbook />
        <Footer />
      </div>

      {/* Doors */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-700 ${
          open ? "pointer-events-none opacity-0 delay-[1600ms]" : "cursor-pointer opacity-100"
        }`}
        role={open ? undefined : "button"}
        tabIndex={open ? -1 : 0}
        aria-label="მოწვევის გახსნა"
        onClick={openCard}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openCard();
        }}
        onTouchStart={(e) => (startX.current = e.touches[0]!.clientX)}
        onTouchMove={(e) => {
          if (startX.current !== null && Math.abs(e.touches[0]!.clientX - startX.current) > 40)
            openCard();
        }}
      >
        <Door side="left" open={open} />
        <Door side="right" open={open} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <img
            src={bowImg}
            alt="თეთრი შიფონის ბაფთა"
            width={1024}
            height={1536}
            className={`w-[68vw] max-w-[24rem] drop-shadow-[0_18px_28px_rgba(90,74,56,0.22)] transition-all duration-[1100ms] ease-out ${
              open ? "rotate-[3deg] scale-125 opacity-0 blur-[3px]" : "animate-bow-breathe"
            }`}
          />
        </div>
      </div>

      <MusicPlayer />
    </main>
  );
}

function Door({ side, open }: { side: "left" | "right"; open: boolean }) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute top-0 h-full w-1/2 overflow-hidden shadow-door transition-transform duration-[1900ms] ${
        isLeft ? "left-0" : "right-0"
      } ${open ? (isLeft ? "-translate-x-full" : "translate-x-full") : "translate-x-0"}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.65, 0, 0.2, 1)" }}
      aria-hidden="true"
    >
      <img
        src={panelImg}
        alt=""
        width={1024}
        height={1920}
        className={`absolute top-0 h-full w-[200%] max-w-none object-cover ${
          isLeft ? "left-0" : "right-0 -scale-x-100"
        }`}
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src={archImg}
        alt="აკვარელით დახატული თაღი ლაგო დი კომოს ხედით"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <SparkleTitle
          as="p"
          shimmer={false}
          className="font-geo text-[13vw] leading-[1.1] sm:text-6xl"
        >
          ლიკა
        </SparkleTitle>
        <p className="my-1 font-geo text-2xl text-ink/70">&amp;</p>
        <SparkleTitle
          as="p"
          shimmer={false}
          className="font-geo text-[13vw] leading-[1.1] sm:text-6xl"
        >
          მიშა
        </SparkleTitle>
        <div className="mt-8 rounded-full bg-parchment/70 px-6 py-3 backdrop-blur-[2px]">
          <p className="font-geo text-sm tracking-[0.3em] text-ink/85">12 ნოემბერი, 2026</p>
        </div>

        <Countdown />
      </div>
    </section>
  );
}

function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    setLeft(WEDDING_DATE.getTime() - Date.now());
    const id = window.setInterval(() => setLeft(WEDDING_DATE.getTime() - Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const s = Math.max(0, Math.floor((left ?? 0) / 1000));
  const parts = [
    { v: Math.floor(s / 86400), l: "დღე" },
    { v: Math.floor((s % 86400) / 3600), l: "საათი" },
    { v: Math.floor((s % 3600) / 60), l: "წუთი" },
    { v: s % 60, l: "წამი" },
  ];
  return (
    <div className="mt-8 flex gap-3 rounded-2xl bg-parchment/70 px-5 py-4 backdrop-blur-[2px]">
      {parts.map((p) => (
        <div key={p.l} className="w-14">
          <p className="font-geo text-2xl text-olive">{String(p.v).padStart(2, "0")}</p>
          <p className="font-geo text-[0.6rem] tracking-[0.2em] text-ink/60">{p.l}</p>
        </div>
      ))}
    </div>
  );
}

function EnvelopeSection() {
  const [opened, setOpened] = useState(false);
  return (
    <section className="flex flex-col items-center overflow-hidden bg-parchment px-6 pb-24 pt-24">
      <p className="mb-8 font-geo text-xs tracking-[0.35em] text-ink/55">
        {opened ? "ჩვენი სიტყვები" : "შეეხე კონვერტს"}
      </p>

      <div
        className={`w-full max-w-md transition-all duration-[1200ms] ease-out ${
          opened ? "pt-[26rem]" : "pt-0"
        }`}
        style={{ perspective: "1400px" }}
      >
        <button
          onClick={() => setOpened((o) => !o)}
          aria-label="კონვერტის გახსნა"
          className="relative block w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* back of envelope */}
          <img
            src={envelopeImg}
            alt="ვარდისფერი კონვერტი ოქროსფერი ბეჭდით"
            className="relative z-0 w-full drop-shadow-[0_20px_35px_rgba(90,74,56,0.25)]"
          />

          {/* letter */}
          <div
            className={`absolute inset-x-[7%] top-0 z-10 rounded-sm border border-ink/10 bg-[oklch(0.98_0.012_92)] px-6 py-8 text-center shadow-soft transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              opened ? "-translate-y-[92%] rotate-0 opacity-100 delay-500" : "translate-y-4 -rotate-2 opacity-0"
            }`}
          >
            {opened ? (
              <div className="font-geo text-[0.9rem] leading-[1.9] text-ink/85">
                <Typewriter
                  text="ძვირფასო სტუმრებო,"
                  speed={55}
                  startDelay={800}
                  className="font-geo text-[0.9rem] leading-[1.9] text-ink/85"
                />
                <Typewriter
                  text="გეპატიჟებით ჩვენი სიყვარულის დღესასწაულზე"
                  speed={32}
                  startDelay={1900}
                  className="mt-2 font-geo text-[0.9rem] leading-[1.9] text-ink/85"
                />
                <Typewriter
                  text="გვინდა, ჩვენი ცხოვრების ეს განსაკუთრებული დღე თქვენთან ერთად გავიზიაროთ და ერთად შევქმნათ მოგონებები, რომლებიც დიდხანს გაგვყვება 🤍"
                  speed={28}
                  startDelay={3400}
                  className="mt-2 font-geo text-[0.9rem] leading-[1.9] text-ink/85"
                />
                <Typewriter
                  text="სიყვარულით,"
                  speed={55}
                  startDelay={7600}
                  className="mt-4 font-geo text-[0.85rem] text-ink/70"
                />
                <Typewriter
                  text="ლიკა & მიშა"
                  speed={55}
                  startDelay={8400}
                  className="font-geo text-[0.95rem] text-olive"
                />
              </div>
            ) : (
              <p className="font-geo text-[0.9rem] leading-[1.95] text-ink/85 opacity-0">
                ძვირფასო სტუმრებო
              </p>
            )}
          </div>

          {/* front pocket */}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              backgroundImage: `url(${envelopeImg})`,
              backgroundSize: "100% 100%",
              clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 68%)",
            }}
            aria-hidden="true"
          />

          {/* flap */}
          <div
            className={`pointer-events-none absolute inset-0 origin-top transition-transform duration-[1300ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
              opened ? "z-0 [transform:rotateX(-165deg)]" : "z-30"
            }`}
            style={{ transformStyle: "preserve-3d" }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${envelopeImg})`,
                backgroundSize: "100% 100%",
                clipPath: "polygon(0 0, 100% 0, 50% 68%)",
                backfaceVisibility: "hidden",
              }}
            />
            <div
              className="absolute inset-0 bg-[oklch(0.93_0.022_10)]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 68%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </div>
        </button>
      </div>
    </section>
  );
}

function Rsvp() {
  const [attending, setAttending] = useState<boolean | null>(null);
  return (
    <section className="bg-parchment px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <SparkleTitle className="font-geo text-2xl">დასტურის ფორმა</SparkleTitle>
        </Reveal>
        <div className="mt-2 flex justify-center">
          <Typewriter
            text="იქნებით ჩვენს განსაკუთრებულ დღეზე?"
            speed={45}
            className="font-geo text-sm text-ink/65"
          />
        </div>

        {attending !== null ? (
          <div className="relative mt-10">
            {attending && (
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-3 motion-reduce:hidden">
                {Array.from({ length: 14 }).map((_, k) => {
                  const a = (k / 14) * Math.PI * 2;
                  const d = 60 + (k % 3) * 22;
                  return (
                    <span
                      key={k}
                      className="sparkle-burst absolute text-[0.7rem]"
                      style={{
                        color: "oklch(0.74 0.12 82)",
                        ["--dx" as string]: `${Math.cos(a) * d}px`,
                        ["--dy" as string]: `${Math.sin(a) * d}px`,
                        animationDelay: `${(k % 4) * 60}ms`,
                      }}
                    >✦</span>
                  );
                })}
              </div>
            )}
            <p className="font-geo text-lg text-ink">
              {attending ? "გმადლობთ, გელოდებით სიყვარულით" : "მადლობა პასუხისთვის"}
            </p>
            {attending && <div className="animate-fade-in [animation-delay:600ms] [animation-fill-mode:both]"><div className="animate-soft-pulse"><AddToCalendar /></div></div>}
          </div>
        ) : (
          <RsvpForm onSent={(a) => setAttending(a)} />
        )}
      </div>
    </section>
  );
}

const COUPLE_PHOTOS = [
  { src: "/images/moment-1.jpg", alt: "ლიკა და მიშა აივანზე" },
  { src: "/images/moment-2.jpg", alt: "ლიკა და მიშა ვარდებით" },
];

function ChildhoodPhoto() {
  return (
    <section className="bg-parchment px-8 pt-8 pb-4">
      <Reveal>
        <figure className="group relative mx-auto max-w-[19rem]">
          {/* washi tape */}
          <span
            aria-hidden="true"
            className="absolute -top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 rotate-[-4deg] rounded-[2px] bg-olive/25 shadow-sm backdrop-blur-[1px] [mask-image:linear-gradient(90deg,transparent_0,#000_6%,#000_94%,transparent_100%)]"
          />
          <div className="rotate-[-2deg] bg-[color-mix(in_oklab,var(--parchment)_88%,white)] p-3 pb-5 shadow-[0_18px_36px_-14px_color-mix(in_oklab,var(--olive)_55%,transparent)] ring-1 ring-olive/20 transition-transform duration-500 ease-out group-hover:rotate-0 group-active:rotate-0">
            <div className="relative overflow-hidden ring-1 ring-olive/25">
              <img
                src="/images/childhood-lm.jpg"
                alt="ლიკა და მიშა — ბავშვობის ფოტოები"
                className="aspect-[4/5] w-full object-cover object-center sepia-[.15] transition duration-700 group-hover:scale-[1.03] group-hover:sepia-0"
              />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(60,50,30,0.22)]" />
            </div>
            <figcaption className="mt-4 text-center">
              <p className="font-script text-2xl leading-tight text-olive">საიდან დაიწყო ყველაფერი...</p>
              <div className="mt-2 flex items-center justify-center gap-2" aria-hidden="true">
                <span className="h-px w-8 bg-olive/40" />
                <span className="h-1.5 w-1.5 rotate-45 bg-olive/60" />
                <span className="h-px w-8 bg-olive/40" />
              </div>
            </figcaption>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}

function CoupleImage() {
  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [par, setPar] = useState(0);
  const [tilt, setTilt] = useState<{ k: number; x: number; y: number } | null>(null);
  const secRef = useRef<HTMLElement>(null);
  const startX = useRef<number | null>(null);
  const n = COUPLE_PHOTOS.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = secRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        setPar(Math.max(-1, Math.min(1, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, go]);

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => (startX.current = e.touches[0]!.clientX),
    onTouchMove: (e: React.TouchEvent) => {
      if (startX.current !== null) setDrag(e.touches[0]!.clientX - startX.current);
    },
    onTouchEnd: () => {
      if (Math.abs(drag) > 50) go(drag < 0 ? 1 : -1);
      setDrag(0);
      startX.current = null;
    },
  };

  return (
    <section ref={secRef} className="bg-parchment px-4 pt-16 sm:px-6">
      <Reveal>
        <div className="mx-auto max-w-md text-center">
          <SparkleTitle className="font-geo text-2xl">ჩვენი მომენტები</SparkleTitle>
          <div className="relative mx-auto mt-10 h-[26rem] w-full max-w-[22rem]">
            {COUPLE_PHOTOS.map((p, k) => {
              const left = k === 0;
              const shift = (left ? -1 : 1) * par * 18;
              return (
                <button
                  key={p.src}
                  type="button"
                  aria-label={`${p.alt} — გადიდება`}
                  onClick={() => { setI(k); setLightbox(true); }}
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setTilt({ k, x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
                  }}
                  onPointerLeave={() => setTilt(null)}
                  className={`absolute w-[62%] overflow-hidden rounded-xl border-[6px] border-parchment bg-parchment shadow-soft transition-transform duration-300 ease-out ${
                    left ? "left-0 top-0 z-10" : "bottom-0 right-0 z-20"
                  }`}
                  style={{
                    transform: `translateY(${shift}px) rotate(${left ? -4 : 3}deg) perspective(800px) rotateY(${tilt?.k === k ? tilt.x * 10 : 0}deg) rotateX(${tilt?.k === k ? -tilt.y * 10 : 0}deg)`,
                  }}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" draggable={false} className="aspect-[4/5] w-full object-cover" />
                </button>
              );
            })}
          </div>
          <p className="mt-6 font-geo text-[0.65rem] tracking-[0.2em] text-ink/50">
            შეეხე ფოტოს გასადიდებლად
          </p>
        </div>
      </Reveal>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightbox(false)}
          {...swipe}
        >
          <img
            src={COUPLE_PHOTOS[i]!.src}
            alt={COUPLE_PHOTOS[i]!.alt}
            className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-soft"
            onClick={(e) => e.stopPropagation()}
          />
          <button aria-label="დახურვა" onClick={() => setLightbox(false)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-parchment/90 font-geo text-xl text-olive">×</button>
          <button aria-label="წინა" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-parchment/90 font-geo text-xl text-olive">‹</button>
          <button aria-label="შემდეგი" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-parchment/90 font-geo text-xl text-olive">›</button>
          <span className="absolute bottom-6 font-geo text-xs tracking-[0.2em] text-parchment/80">{i + 1} / {n}</span>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-parchment px-6 pb-28 pt-16 text-center">
      <div className="mx-auto flex max-w-xs items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-olive/35" />
        <span className="h-1.5 w-1.5 rotate-45 bg-olive/60" />
        <span className="h-px flex-1 bg-olive/35" />
      </div>
      <p className="mt-8 font-geo text-4xl text-olive">ლ &amp; მ</p>
      <p className="mt-5 font-geo text-sm tracking-[0.2em] text-ink/70">
        გელოდებით დიდი სიყვარულით
      </p>
    </footer>
  );
}


function DressCode() {
  return (
    <section className="overflow-hidden bg-parchment px-6 py-20">
      <Reveal>
        <div className="mx-auto max-w-md text-center">
          <SparkleTitle className="font-geo text-2xl">დრესკოდი</SparkleTitle>

          <div className="relative mx-auto mt-10 w-full max-w-[18.5rem] sm:max-w-xs">
            <div
              aria-hidden
              className="absolute -inset-x-4 inset-y-2 rounded-[50%] blur-3xl"
              style={{ background: "color-mix(in oklab, var(--olive) 14%, transparent)" }}
            />
            <div className="animate-dance-sway relative origin-bottom">
              <img
                src="/images/dancers-v3.png"
                alt="მოცეკვავე სტუმრები სადღესასწაულო სამოსში"
                loading="lazy"
                className="animate-dance-bob mx-auto block w-full"
              />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-[17rem] animate-fade-in [animation-delay:300ms] [animation-fill-mode:both]">
            <p className="font-script text-2xl leading-tight text-olive">ფერების შეზღუდვა არ არის</p>
            <div className="my-3 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-px w-8 bg-olive/40" />
              <span className="h-1.5 w-1.5 rotate-45 bg-olive/60" />
              <span className="h-px w-8 bg-olive/40" />
            </div>
            <p className="font-geo text-[0.8rem] leading-[1.8] text-ink/70">
              ჩაიცვით ის, რაშიც თავს კომფორტულად და სადღესასწაულოდ იგრძნობთ
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function RsvpForm({ onSent }: { onSent: (attending: boolean) => void }) {
  const [name, setName] = useState("");
  const [attendanceChoice, setAttendanceChoice] = useState("yes");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const attending = attendanceChoice === "yes";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const fullName = name.trim();
    if (fullName.length < 2 || fullName.length > 120) {
      setError("გთხოვთ, მიუთითოთ სახელი და გვარი");
      return;
    }
    setBusy(true);
    setError(null);
    const responseId = crypto.randomUUID();
    let sheetError: unknown = null;
    try {
      await sendToGoogleSheets({
        type: "rsvp",
        responseId,
        fullName,
        attending,
        allergies: "",
      });
    } catch (error) {
      sheetError = error;
    }
    setBusy(false);
    if (sheetError) {
      console.error("RSVP submission error", sheetError);
      setError("ვერ გაიგზავნა, სცადეთ ხელახლა");
      return;
    }
    onSent(attending);
  }

  return (
    <form className="mt-8 grid gap-4 text-left" onSubmit={submit}>
      <div>
        <label htmlFor="name" className="font-geo text-xs tracking-[0.2em] text-ink/60">
          სახელი და გვარი
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/15 bg-parchment px-4 py-3 font-geo text-sm text-ink outline-none focus:border-olive"
        />
      </div>

      <div>
        <label htmlFor="attending" className="font-geo text-xs tracking-[0.2em] text-ink/60">
          დასწრება
        </label>
        <select
          id="attending"
          name="attending"
          value={attendanceChoice}
          onChange={(e) => setAttendanceChoice(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/15 bg-parchment px-4 py-3 font-geo text-sm text-ink outline-none focus:border-olive"
        >
          <option value="yes">დიახ, დავესწრები</option>
          <option value="no">სამწუხაროდ, ვერ შევძლებ</option>
        </select>
      </div>


      {error && <p className="font-geo text-xs text-olive">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="mt-2 rounded-full bg-olive px-8 py-3 font-geo text-sm tracking-[0.2em] text-parchment transition hover:opacity-90 disabled:opacity-60"
      >
        {busy ? "იგზავნება..." : "გაგზავნა"}
      </button>
    </form>
  );
}
