import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Synobotix",
  description: "Privacy policy for Synobotix contact forms, analytics, and website data handling.",
  alternates: {
    canonical: "/politique-confidentialite",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
