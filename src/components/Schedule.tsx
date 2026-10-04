import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { SparkleTitle } from "./SparkleTitle";
import { Church, MapPin, PenLine, UtensilsCrossed } from "lucide-react";

const ITEMS: { time: string; icon: typeof Church; title: string; map: string; image?: string; alt?: string }[] = [
  {
    time: "14:00",
    icon: Church,
    title: "ჯვრისწერა — საგარეჯო, ნინოწმინდის მონასტერი",
    map: "https://maps.app.goo.gl/nCEMkXJLqwfCZTPY7",
    image: "/images/church_monastery.jpg",
    alt: "ნინოწმინდის მონასტერი, აკვარელი",
  },
  {
    time: "16:30",
    icon: PenLine,
    title: "ხელისმოწერის ცერემონია — მანავი, გიუაანი მეღვინეობა",
    map: "https://maps.app.goo.gl/ncv15eDxJQcHkNZV8",
    image: "/images/ceremony.jpg",
    alt: "ხელისმოწერის ცერემონია, აკვარელი",
  },
  {
    time: "18:00",
    icon: UtensilsCrossed,
    title: "ვახშამი — მანავი, გიუაანი მეღვინეობა",
    map: "https://maps.app.goo.gl/ncv15eDxJQcHkNZV8",
    image: "/images/giuaani-table.jpg",
    alt: "ვახშამის მაგიდა გიუაანი მეღვინეობაში, აკვარელი",
  },
];


export function Schedule() {
  const listRef = useRef<HTMLOListElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const SEG = 1400;
  return (
    <section className="bg-backdrop px-0 pb-4 sm:px-6">
      <div className="mx-auto max-w-none sm:max-w-3xl">
        <Reveal>
          <div className="rounded-none border-x-0 border-t-0 border-b border-ink/10 bg-parchment/95 py-5 shadow-none sm:rounded-2xl sm:border sm:p-7 sm:shadow-soft">
            <div className="px-5 sm:px-0">
              <SparkleTitle className="font-geo text-lg tracking-[0.15em]">დღის განრიგი</SparkleTitle>
            </div>
            <ol ref={listRef} className="mt-6 grid gap-5">
              {ITEMS.map(({ time, icon: Icon, title, map, image, alt }, i) => (
                <li key={time} className="relative flex gap-4">
                  <div className="flex flex-col items-center pl-5 sm:pl-1">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-olive/20 bg-olive/10">
                      <Icon className="h-4 w-4 text-olive" strokeWidth={1.5} />
                    </span>
                    <span
                      className="mt-1 w-0 flex-1 origin-top border-l-2 border-dotted border-olive/40 motion-reduce:!scale-y-100"
                      style={{
                        transform: drawn ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform ${SEG}ms ease-in-out ${i * SEG}ms`,
                      }}
                    />
                    {i === ITEMS.length - 1 && (
                      <span className="mb-2 mt-1 flex flex-col items-center gap-1" aria-hidden="true" style={{ opacity: drawn ? 1 : 0, transition: `opacity 600ms ease ${ITEMS.length * SEG}ms` }}>
                        <span className="h-2.5 w-2.5 rotate-45 border border-olive/60 bg-olive/70" />
                        <span className="h-1 w-1 rounded-full bg-olive/40" />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pb-1 pr-5 sm:pr-0">
                    <p className="font-geo text-xs tracking-[0.25em] text-ink/55">{time}</p>
                    <p className="font-geo text-base text-ink">{title}</p>
                    <a
                      href={map}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 rounded-full border border-olive/25 px-4 py-1.5 font-geo text-xs tracking-[0.15em] text-olive transition hover:bg-olive hover:text-parchment"
                    >
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                      რუკაზე ნახვა
                    </a>
                    {image && (
                      <figure className="group relative mt-8 w-full max-w-[15rem] sm:max-w-[17rem]">
                        {/* Keystone ornament at the arch apex */}
                        <div className="pointer-events-none absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-olive/40 bg-parchment shadow-soft">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-olive" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                              <path d="M12 3c1.5 3 4.5 4.5 4.5 7.5a4.5 4.5 0 0 1-9 0C7.5 7.5 10.5 6 12 3Z" />
                              <path d="M12 21v-6M9 18c1-1 2-1.5 3-1.5s2 .5 3 1.5" />
                            </svg>
                          </span>
                        </div>
                        <div className="rounded-t-full rounded-b-2xl border border-olive/45 bg-gradient-to-b from-parchment to-olive/5 p-2 shadow-[0_14px_30px_-12px_color-mix(in_oklab,var(--olive)_45%,transparent)]">
                          <div className="rounded-t-full rounded-b-xl border border-dashed border-olive/30 p-1">
                            <div className="relative overflow-hidden rounded-t-full rounded-b-lg ring-1 ring-olive/25">
                              <img
                                src={image}
                                alt={alt}
                                loading="lazy"
                                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                              />
                              <div className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-lg shadow-[inset_0_0_24px_rgba(60,50,30,0.18)]" />
                            </div>
                          </div>
                        </div>
                        <div className="mx-auto mt-2 flex items-center justify-center gap-2 text-olive/60" aria-hidden="true">
                          <span className="h-px w-8 bg-olive/40" />
                          <span className="h-1.5 w-1.5 rotate-45 bg-olive/50" />
                          <span className="h-px w-8 bg-olive/40" />
                        </div>
                      </figure>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
