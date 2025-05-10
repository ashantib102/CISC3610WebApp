import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LLM Explorer",
    short_name: "LLM Explorer",
    description: "Learn about different LLM models interactively",
    start_url: "/",
    display: "standalone",
    background_color: "#4a73e8",
    theme_color: "#4a73e8",
    orientation: "portrait-primary",
    id: "/",
    scope: "/",
    categories: ["education", "productivity", "utilities"],
    icons: [
      {
        src: "/llm-explorer-logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any maskable",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
    screenshots: [
      {
        src: "/llm-explorer-home.png",
        sizes: "1280x720",
        type: "image/png",
        label: "LLM Explorer Home Screen",
      },
      {
        src: "/llm-explorer-details.png",
        sizes: "1280x720",
        type: "image/png",
        label: "LLM Explorer Model Details",
      },
    ],
  }
}
