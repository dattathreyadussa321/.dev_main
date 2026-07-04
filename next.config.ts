import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  devIndicators: false,
  // Small runtime image for Docker deployments; also used by server.js for cPanel
  output: "standalone",
  // Mongoose and nodemailer are server-only packages with native Node.js deps; keep them external
  serverExternalPackages: ["mongoose", "nodemailer"],
  // Hide the framework fingerprint from response headers
  poweredByHeader: false,
  // Strip console.* in production builds, keep errors/warnings
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Tell browsers to use HTTPS-only for 1 year (production only; ignored over plain HTTP)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Prevent browsers from sniffing MIME type on responses
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
