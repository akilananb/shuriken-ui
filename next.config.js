/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/shuriken/api/:path*",
      },
    ];
  },
  output: "standalone",
  basePath: "/shuriken",
};

module.exports = nextConfig;
