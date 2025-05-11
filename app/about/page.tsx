"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Laptop, Database } from "lucide-react";
import { isPWAInstalled } from "../pwa";

export default function AboutPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    setIsInstalled(isPWAInstalled());

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      });
    } else if (!isInstalled) {
      // Show instructions for manual installation
      alert(
        "To install the app:\n1. Open your browser's menu\n2. Look for 'Install App' or 'Add to Home Screen'\n3. Follow the prompts to install"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center">
                <img
                  src="/llm-explorer-logo.jpeg"
                  alt="LLM Explorer Logo"
                  className="h-12 w-auto mr-3"
                />
                <h1 className="text-2xl font-bold text-white">LLM Explorer</h1>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="text-white hover:text-blue-200">
                Home
              </Link>
              <Link href="/learn" className="text-white hover:text-blue-200">
                Learn
              </Link>
              <Link href="/about" className="text-white hover:text-blue-200">
                About
              </Link>
              <Link
                href="/promo"
                className="text-white hover:text-blue-200"
              >
                Download
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-black">
            About LLM Explorer
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              App Features
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="mb-4 text-black">
                LLM Explorer is a Progressive Web App (PWA) designed to educate
                users about various Large Language Models (LLMs) currently
                available in the market. Our app provides comprehensive
                information about popular LLMs such as ChatGPT, Gemini, Claude,
                v0, Cursor, and Copilot.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3 text-black">
                Key Features:
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-black">
                <li>
                  Interactive learning interface with Canvas visualizations
                </li>
                <li>Audio descriptions of each LLM model</li>
                <li>
                  Comprehensive information about features, use cases, and
                  limitations
                </li>
                <li>Responsive design that works on all devices</li>
                <li>Installable as a PWA for offline use</li>
                <li>Regular updates as new LLM models are released</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Documentation
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Laptop className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-medium text-black">
                    Installation Guide
                  </h3>
                </div>
                <p className="mb-4 text-black">
                  LLM Explorer can be installed on your device as a Progressive
                  Web App for easy access and offline use.
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-black">
                  <li>
                    Visit the LLM Explorer website at{" "}
                    <code className="text-black">llm-explorer.vercel.app</code>
                  </li>
                  <li>
                    Click the install button in your browser's address bar (or
                    menu)
                  </li>
                  <li>Follow the prompts to add the app to your home screen</li>
                  <li>
                    Once installed, you can use the app even without an internet
                    connection
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-medium text-black">
                    Data Modification
                  </h3>
                </div>
                <p className="mb-4 text-black">
                  LLM Explorer uses a JSON file to store information about each
                  LLM model. To add or modify data:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-black">
                  <li>
                    Locate the <code className="text-black">llm-data.json</code>{" "}
                    file in the <code className="text-black">data</code>{" "}
                    directory
                  </li>
                  <li>
                    Follow the existing JSON structure to add a new model or
                    update existing information
                  </li>
                  <li>
                    Ensure all required fields are included (id, name, creator,
                    etc.)
                  </li>
                  <li>
                    Add appropriate image and audio files to the public
                    directory
                  </li>
                  <li>
                    Update references in the JSON file to point to new assets
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Technical Information
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="mb-4 text-black">
                LLM Explorer is built with modern web technologies to provide a
                seamless experience across all devices:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-black">
                    Frontend Technologies:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-black">
                    <li>Next.js (React framework)</li>
                    <li>Tailwind CSS</li>
                    <li>HTML5 Canvas API</li>
                    <li>Web Audio API</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-black">
                    PWA Features:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-black">
                    <li>Service Worker for offline functionality</li>
                    <li>Web App Manifest for installation</li>
                    <li>Responsive design for all screen sizes</li>
                    <li>Local caching of assets and data</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/learn">Start Exploring LLMs</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2023 LLM Explorer. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="hover:text-blue-300">
                Home
              </Link>
              <Link href="/learn" className="hover:text-blue-300">
                Learn
              </Link>
              <Link href="/about" className="hover:text-blue-300">
                About
              </Link>
              <Link href="/promo" className="hover:text-blue-300">
                Download
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
