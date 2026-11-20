import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proof | Open-Source ROS2 Safety Wrapper, Synobotix",
  description: "ros2_kinematic_guard: an open-source, benchmarked deterministic safety wrapper for AI-generated robot commands. Read the code before you hire us.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Proof | Synobotix",
    description: "An open-source, benchmarked deterministic safety wrapper for AI-generated robot commands.",
    url: "https://synobotix.com/portfolio",
    type: "website",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
