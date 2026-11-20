import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team | Synobotix: Senior Robotics Engineers",
  description:
    "A small agency of senior robotics engineers. No pyramid, no bench of juniors: engineers who have shipped physical systems, working directly with your team.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Team | Synobotix",
    description:
      "A small agency of senior robotics engineers. Engineers who have shipped physical systems, working directly with your team.",
    url: "https://synobotix.com/team",
    type: "website",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
