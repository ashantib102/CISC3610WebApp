"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";
import { registerSW } from "./pwa";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerSW();
  }, []);

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
