/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/asset-query-svc/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
  modularizeImports: {
    '@mui/icons-material/?(((\\w*)?/?)*)': {
    transform: '@mui/icons-material/{{ matches. [1] f}/{{member}}'
    },
  },
  output: "standalone",
  basePath: "/shuriken",
};

module.exports = nextConfig;