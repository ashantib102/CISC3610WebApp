import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return {
    name: "LLM Explorer",
    short_name: "LLM Explorer",
    description: "Learn about different LLM models interactively",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#4a73e8",
    theme_color: "#4a73e8",
    orientation: "portrait-primary",
    id: `${basePath}/`,
    scope: `${basePath}/`,
    categories: ["education", "productivity", "utilities"],
    icons: [
      {
        src: `${basePath}/llm-explorer-logo.jpeg`,
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
      {
        src: `${basePath}/icon-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icon-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
