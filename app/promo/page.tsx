import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, CircleCheck, Smartphone, Laptop } from "lucide-react"

export default function PromoPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center">
                <img src="/llm-explorer-logo.jpeg" alt="LLM Explorer Logo" className="h-12 w-auto mr-3" />
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

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Download LLM Explorer</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get the LLM Explorer app on your device and start learning about large language models even when you're
              offline.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="mr-2 h-5 w-5" /> Install App
            </Button>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">App Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src="/llm-explorer-home.png"
                  alt="LLM Explorer Home Screen"
                  className="w-full h-auto rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-center">Home Screen</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src="/llm-explorer-mobile-app.png"
                  alt="LLM Explorer Learning Interface"
                  className="w-full h-auto rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-center">Learning Interface</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src="/llm-explorer-details.png"
                  alt="LLM Explorer Model Details"
                  className="w-full h-auto rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-center">Model Details</h3>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">Installation Instructions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Smartphone className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">Mobile Devices</h3>
                </div>
                <ol className="list-decimal pl-5 space-y-3">
                  <li className="text-gray-700">
                    <span className="font-medium">Visit the app:</span> Open your browser and go to
                    llm-explorer.vercel.app
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">On iOS (Safari):</span> Tap the Share button, then "Add to Home
                    Screen"
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">On Android (Chrome):</span> Tap the menu button, then "Add to Home
                    Screen"
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Name and install:</span> Confirm the name and tap "Add"
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Launch:</span> Open the app from your home screen like any other app
                  </li>
                </ol>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Laptop className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">Desktop Devices</h3>
                </div>
                <ol className="list-decimal pl-5 space-y-3">
                  <li className="text-gray-700">
                    <span className="font-medium">Visit the app:</span> Open your browser and go to
                    llm-explorer.vercel.app
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Chrome:</span> Click the install icon in the address bar
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Edge:</span> Click the install icon in the address bar
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Firefox:</span> Click the menu button, then "Install app"
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Launch:</span> Open the app from your desktop or start menu
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">Benefits of Installing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                  <CircleCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Offline Access</h3>
                <p className="text-gray-600">Use the app without an internet connection once installed</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                  <CircleCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Faster Loading</h3>
                <p className="text-gray-600">Enjoy quicker access with cached resources for better performance</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                  <CircleCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Native Experience</h3>
                <p className="text-gray-600">
                  Get a more app-like experience with full-screen mode and home screen icon
                </p>
              </div>
            </div>
          </section>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/learn">Try Before Installing</Link>
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
  )
}
