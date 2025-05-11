import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, BookOpen } from "lucide-react";
import { getAssetPath } from "@/lib/assets";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center">
                <img
                  src={getAssetPath("/llm-explorer-logo.jpeg")}
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
              <Link href="/promo" className="text-white hover:text-blue-200">
                Download
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-700 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explore the World of LLMs
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the capabilities, use cases, and differences between
              today's leading Large Language Models in this interactive learning
              app.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/learn">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/promo">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-blue-700 w-full sm:w-auto"
                >
                  Download App <Download className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured LLM Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["ChatGPT", "Claude", "Gemini"].map((model) => (
                <div
                  key={model}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{model}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Learn about the capabilities, strengths, and use cases of{" "}
                      {model}.
                    </p>
                    <Link href={`/learn?model=${model.toLowerCase()}`}>
                      <Button variant="outline" className="w-full">
                        Explore {model} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Why Learn About LLMs?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
                <p className="text-gray-600">
                  Keep up with the rapidly evolving field of AI and language
                  models.
                </p>
              </div>
              <div className="p-6">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Make Informed Choices
                </h3>
                <p className="text-gray-600">
                  Understand which LLM is best suited for specific tasks and
                  applications.
                </p>
              </div>
              <div className="p-6">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Unlock Potential</h3>
                <p className="text-gray-600">
                  Discover new possibilities and applications for your work or
                  projects.
                </p>
              </div>
            </div>
          </div>
        </section>
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
