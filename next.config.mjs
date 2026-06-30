/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  allowedDevOrigins: ["192.168.1.2"],
};

export default nextConfig;
