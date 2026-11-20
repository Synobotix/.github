import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Synobotix: Edge AI Engineering for Physical Robotics",
  description:
    "Synobotix is an Edge AI engineering team led by Rémi Boivin, based in Nice / Sophia Antipolis. Senior engineers only, direct access, from architecture to the deterministic safety layer.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Synobotix",
    description:
      "Synobotix is an Edge AI engineering team led by Rémi Boivin. Senior engineers only, direct access.",
    url: "https://synobotix.com/about",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
