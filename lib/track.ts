import posthog from 'posthog-js';

type TrackEventPayload = {
  event: string;
  href?: string;
  source?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Empty on the Docker deploy (same origin); set to the live origin for GitHub Pages.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export function trackEvent(payload: TrackEventPayload) {
  if (typeof window === "undefined") {
    return;
  }

  posthog.capture(payload.event, {
    href: payload.href,
    source: payload.source,
  });

  if (window.gtag) {
    window.gtag("event", payload.event, {
      href: payload.href,
      source: payload.source,
    });
  }

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(`${API_BASE_URL}/api/track`, blob);
    return;
  }

  void fetch(`${API_BASE_URL}/api/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  });
}
