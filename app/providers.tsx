"use client";

import { ThemeProvider } from "@/components/theme-provider";
import PWAInit from "@/components/pwa-init";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
