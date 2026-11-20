import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Synobotix Edge AI Field Notes",
  description: "Technical notes on Edge AI inference optimization, deterministic safety wrappers, ROS2 integration, and Hardware-in-the-Loop validation.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Synobotix Edge AI Field Notes",
    description: "Technical notes on Edge AI inference optimization, deterministic safety wrappers, and ROS2 integration.",
    url: "https://synobotix.com/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
