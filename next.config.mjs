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
    ],
  },

};

export default nextConfig;
