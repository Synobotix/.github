import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import GoogleAnalyticsWrapper from "@/app/components/GoogleAnalyticsWrapper";
import PostHogProvider from "@/app/components/PostHogProvider";
import { LanguageProvider } from "@/app/i18n/LanguageContext";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "Synobotix | Edge AI Engineering & Robotics Safety",
  description: "Synobotix is an Edge AI engineering team. We optimize VLA/LLM inference under 200ms on constrained hardware and build deterministic safety wrappers for physical robotics: direct access, senior engineers only.",
  keywords: "Edge AI engineering, ROS2 safety wrapper, VLA inference optimization, TensorRT quantization, deterministic safety wrapper, Hardware-in-the-Loop validation, Jetson Orin optimization, Milestone Sprint, Tactical Retainer",
  authors: [{ name: "Rémi Boivin" }],
  metadataBase: new URL("https://synobotix.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Synobotix | Edge AI Engineering & Robotics Safety",
    description: "Edge AI engineering team. Sub-200ms VLA/LLM inference optimization and deterministic safety wrappers for physical robotics: direct access, senior engineers only.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://synobotix.com/logo.svg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synobotix | Edge AI Engineering & Robotics Safety",
    description: "Edge AI engineering team: inference optimization and deterministic safety wrappers for physical robotics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="UyRpgGL4HfIjlHQQi57VGEizDmS2WPG9KdDVvWWDeOc" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18426708149"
          strategy="beforeInteractive"
        />
        <Script id="google-ads-tag" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18426708149');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://synobotix.com/#organization",
                  "name": "Synobotix",
                  "url": "https://synobotix.com",
                  "logo": "https://synobotix.com/logo.svg",
                  "sameAs": [
                    "https://www.linkedin.com/company/synobotix"
                  ],
                  "description": "Edge AI engineering team: embedded inference optimization and deterministic safety wrappers for physical robotics.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "FR"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://synobotix.com/#website",
                  "name": "Synobotix",
                  "url": "https://synobotix.com",
                  "publisher": {
                    "@id": "https://synobotix.com/#organization"
                  },
                  "inLanguage": "en"
                }
              ]
            })
          }}
        ></script>
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-600 selection:text-white">
        {gaMeasurementId ? <GoogleAnalyticsWrapper measurementId={gaMeasurementId} /> : null}
        <LanguageProvider>
          <PostHogProvider>
            <Navbar />
            {children}
          </PostHogProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
