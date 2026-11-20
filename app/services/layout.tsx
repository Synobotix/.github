import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Synobotix Edge AI Engineering",
  description: "Two ways to work with us: the Milestone Sprint and the Tactical Retainer. Edge AI inference optimization, deterministic safety wrappers, ROS2 bridges, and HIL validation. We start within 48 hours; safety-critical dates are committed only after the audit.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Pricing | Synobotix Edge AI Engineering",
    description: "Milestone Sprint and Tactical Retainer engagement models for Edge AI inference optimization and deterministic safety wrappers.",
    url: "https://synobotix.com/services",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
