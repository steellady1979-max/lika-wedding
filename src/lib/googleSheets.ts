export type RsvpSheetPayload = {
  type: "rsvp";
  responseId: string;
  fullName: string;
  attending: boolean;
  allergies: string;
};

export type WishSheetPayload = {
  type: "wish";
  responseId: string;
  fullName: string;
  message: string;
};

export type SheetPayload = RsvpSheetPayload | WishSheetPayload;

const WEB_APP_URL = import.meta.env["VITE_GOOGLE_SHEETS_WEB_APP_URL"]?.trim();
const OUTBOX_KEY = "wedding-google-sheets-outbox-v1";
const RETRY_DELAY_MS = 5_000;

let flushPromise: Promise<void> | null = null;
let retryTimer: number | null = null;

function getWebAppUrl(): string {
  if (!WEB_APP_URL) {
    throw new Error("VITE_GOOGLE_SHEETS_WEB_APP_URL is not configured");
  }

  if (
    !WEB_APP_URL.startsWith("https://script.google.com/macros/s/") ||
    !WEB_APP_URL.endsWith("/exec")
  ) {
    throw new Error(
      "VITE_GOOGLE_SHEETS_WEB_APP_URL must be a deployed Google Apps Script /exec URL",
    );
  }

  return WEB_APP_URL;
}

function readOutbox(): SheetPayload[] {
  try {
    const value = window.localStorage.getItem(OUTBOX_KEY);
    return value ? (JSON.parse(value) as SheetPayload[]) : [];
  } catch {
    return [];
  }
}

function writeOutbox(payloads: SheetPayload[]): boolean {
  try {
    window.localStorage.setItem(OUTBOX_KEY, JSON.stringify(payloads));
    return true;
  } catch {
    return false;
  }
}

async function postPayload(url: string, payload: SheetPayload): Promise<void> {
  const body = JSON.stringify({ ...payload, website: "" });

  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    keepalive: new Blob([body]).size <= 60_000,
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body,
  });
}

function scheduleRetry(url: string): void {
  if (retryTimer !== null) return;
  retryTimer = window.setTimeout(() => {
    retryTimer = null;
    void flushOutbox(url);
  }, RETRY_DELAY_MS);
}

function flushOutbox(url: string): Promise<void> {
  if (flushPromise) return flushPromise;

  flushPromise = (async () => {
    for (const payload of readOutbox()) {
      try {
        await postPayload(url, payload);
        writeOutbox(readOutbox().filter((item) => item.responseId !== payload.responseId));
      } catch (error) {
        console.error("Google Sheets delivery failed; retrying", error);
        scheduleRetry(url);
        break;
      }
    }
  })().finally(() => {
    flushPromise = null;
  });

  return flushPromise;
}

export function sendToGoogleSheets(payload: SheetPayload): Promise<void> {
  const url = getWebAppUrl();

  if (typeof window === "undefined") {
    return postPayload(url, payload);
  }

  const outbox = readOutbox();
  if (!outbox.some((item) => item.responseId === payload.responseId)) {
    if (!writeOutbox([...outbox, payload])) {
      void postPayload(url, payload);
      return Promise.resolve();
    }
  }

  void flushOutbox(url);
  return Promise.resolve();
}

if (typeof window !== "undefined" && WEB_APP_URL) {
  window.addEventListener("online", () => void flushOutbox(WEB_APP_URL));
  window.queueMicrotask(() => void flushOutbox(WEB_APP_URL));
}
