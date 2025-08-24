/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  transpilePackages: ["@finance-dashboard/ui"]
}

module.exports = nextConfig
