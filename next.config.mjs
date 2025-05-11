// Configure for GitHub Pages deployment
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const isDev = process.env.NODE_ENV === "development";

let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*\//, "");
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: isDev ? "" : assetPrefix,
  basePath: isDev ? "" : basePath,
  images: {
    unoptimized: true,
  },
  // Add trailing slashes to help with GitHub Pages routing
  trailingSlash: true,
  // Disable image optimization since we're using static export
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // Handle GitHub Pages environment
  env: {
    NEXT_PUBLIC_BASE_PATH: isDev ? "" : basePath,
  },
};

export default nextConfig;
