// Configure for GitHub Pages deployment
const repo = "CISC3610WebApp";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
