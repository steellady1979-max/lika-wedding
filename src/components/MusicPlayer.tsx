import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_SRC = "/audio/vampire-weekend-step.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    const playOnFirstGesture = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("[data-music-control]")) {
        cleanup();
        return;
      }
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => undefined);
      cleanup();
    };

    const events: (keyof WindowEventMap)[] = ["pointerdown", "touchstart", "keydown"];
    const cleanup = () => {
      events.forEach((event) => window.removeEventListener(event, playOnFirstGesture));
    };
    events.forEach((event) =>
      window.addEventListener(event, playOnFirstGesture, { once: true, passive: true }),
    );

    return () => {
      cleanup();
      audio.pause();
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" loop aria-hidden="true" />

      <button
        type="button"
        data-music-control
        onClick={() => void toggle()}
        aria-label={playing ? "მუსიკის გამორთვა" : "მუსიკის ჩართვა"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-parchment shadow-soft transition hover:scale-105 sm:h-14 sm:w-14"
      >
        <span
          className={`absolute inset-0 rounded-full border border-parchment/20 ${playing ? "animate-vinyl" : ""}`}
          style={{
            background:
              "repeating-radial-gradient(circle, color-mix(in oklab, var(--ink) 92%, black) 0 2px, color-mix(in oklab, var(--ink) 75%, black) 2px 3px)",
          }}
        >
          <span className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive" />
          <span className="absolute left-[30%] top-[18%] h-1 w-3 rounded-full bg-parchment/25" />
        </span>
        <span className="relative">
          {playing ? (
            <Volume2 className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <VolumeX className="h-4 w-4" strokeWidth={1.75} />
          )}
        </span>
      </button>
    </>
  );
}
