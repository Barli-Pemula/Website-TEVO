/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nexus.ormawaeksekutifpku.com",
        port: "",
        pathname: "/uploads/media/**",
      },
      {
        protocol: "https",
        hostname: "nexus.ormawaeksekutifpku.com",
        port: "",
        pathname: "/api/media/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/nexus/:path*",
        destination:
          "https://nexus.ormawaeksekutifpku.com/api/:path*",
      },
    ];
  },

};

export default nextConfig;
