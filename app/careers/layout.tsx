import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Synobotix: Senior Robotics Engineers",
  description:
    "Synobotix is a small agency of senior robotics engineers: no pyramid, no bench of juniors. We add two engineers a year. Apply with one problem you made hold on real hardware.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | Synobotix",
    description:
      "Close to the client, not a bench. Engineers work directly on client programs and leave the team able to retrain without us. Three open seats: senior engineers only.",
    url: "https://synobotix.com/careers",
    type: "website",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}