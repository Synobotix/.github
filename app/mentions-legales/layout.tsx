import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice | Synobotix",
  description: "Legal notice for Synobotix, UAS and robotics integration engineering firm.",
  alternates: {
    canonical: "/mentions-legales",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalNoticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
