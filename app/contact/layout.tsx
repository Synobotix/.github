import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Synobotix Edge AI Engineering",
  description: "Talk directly to the engineer. Book a 30-minute technical diagnostic for your blocked Edge AI milestone or robotics safety project.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Synobotix",
    description: "Talk directly to the engineer. Book a 30-minute technical diagnostic.",
    url: "https://synobotix.com/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
