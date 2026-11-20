import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_INGEST_HOST || "/ingest",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-01-30",
    capture_pageview: false,
    autocapture: true,
    capture_exceptions: true,
    session_recording: {},
    debug: process.env.NODE_ENV === "development",
  });
}
