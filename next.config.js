const path = require("node:path");

// GitHub Pages build: `STATIC_EXPORT=1 BASE_PATH=/repo next build` -> ./out
// (no rewrites/headers/route handlers; see .github/workflows/pages.yml).
const isStaticExport = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = isStaticExport
  ? {
      output: "export",
      trailingSlash: true,
      basePath: process.env.BASE_PATH || "",
      images: { unoptimized: true },
      turbopack: { root: path.resolve(__dirname) },
    }
  : {
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|png|jpg|jpeg|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
