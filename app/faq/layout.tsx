import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Synobotix Edge AI Engineering",
  description: "Honest answers about working with a single senior Edge AI engineer: pricing, availability, safety-critical timelines, and capacity limits.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Synobotix Edge AI Engineering",
    description: "Honest answers about working with a single senior Edge AI engineer.",
    url: "https://synobotix.com/faq",
    type: "website",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
