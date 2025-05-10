"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Volume2, VolumeX } from "lucide-react"
import llmData from "@/data/llm-data.json"

type LLMModel = {
  id: string
  name: string
  creator: string
  releaseDate: string
  description: string
  keyFeatures: string[]
  useCases: string[]
  limitations: string[]
  image: string
  audio: string
}

export default function LearnPage() {
  const [activeModel, setActiveModel] = useState<LLMModel | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const models: LLMModel[] = llmData

  useEffect(() => {
    if (models.length > 0 && !activeModel) {
      setActiveModel(models[0])
    }
  }, [models, activeModel])

  // Function to draw fallback content when image loading fails
  const drawFallbackContent = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, model: LLMModel) => {
    // Clear canvas with appropriate background
    ctx.fillStyle = "#f8f9fa" // Light background for all models
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw model name
    ctx.fillStyle = "#333333" // Dark text for all models
    ctx.font = "bold 40px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(model.name, canvas.width / 2, canvas.height / 2 - 30)

    // Draw creator
    ctx.font = "24px Inter, sans-serif"
    ctx.fillText(`by ${model.creator}`, canvas.width / 2, canvas.height / 2 + 20)

    // Draw release date
    ctx.font = "18px Inter, sans-serif"
    ctx.fillText(`Released: ${model.releaseDate}`, canvas.width / 2, canvas.height / 2 + 60)

    // Add model name as overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60)
    ctx.fillStyle = "white"
    ctx.font = "bold 24px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(model.name, canvas.width / 2, canvas.height - 25)
  }

  useEffect(() => {
    if (activeModel && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Reset image error state when model changes
        setImageError(false)

        try {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Set initial background color - white for all models now
          ctx.fillStyle = "#ffffff" // White background for all models
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Determine which image to use
          let imagePath = ""
          switch (activeModel.id) {
            case "chatgpt":
              imagePath = "/chatgpt-logo.png"
              break
            case "claude":
              imagePath = "/claude-logo.webp"
              break
            case "gemini":
              imagePath = "/gemini-logo.webp"
              break
            case "v0":
              imagePath = "/v0-logo.svg"
              break
            case "copilot":
              imagePath = "/copilot-logo.jpeg"
              break
            case "deepseek":
              imagePath = "/deepseek-logo.webp"
              break
            case "cursor":
              imagePath = "/cursor-logo.png"
              break
            default:
              // If no specific logo, use fallback
              drawFallbackContent(ctx, canvas, activeModel)
              return
          }

          // Load and draw the model image
          const img = new Image()

          // Handle image loading errors
          img.onerror = () => {
            console.error(`Failed to load image: ${imagePath}`)
            setImageError(true)
            drawFallbackContent(ctx, canvas, activeModel)
          }

          // Handle successful image load
          img.onload = () => {
            // Calculate dimensions to maintain aspect ratio
            const aspectRatio = img.width / img.height
            let drawWidth = canvas.width * 0.7 // Use 70% of canvas width
            let drawHeight = drawWidth / aspectRatio

            if (drawHeight > canvas.height * 0.7) {
              drawHeight = canvas.height * 0.7
              drawWidth = drawHeight * aspectRatio
            }

            const x = (canvas.width - drawWidth) / 2
            const y = (canvas.height - drawHeight) / 2

            // Redraw background (white for all models)
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw the image
            ctx.drawImage(img, x, y, drawWidth, drawHeight)

            // Add model name as overlay
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
            ctx.fillRect(0, canvas.height - 60, canvas.width, 60)
            ctx.fillStyle = "white"
            ctx.font = "bold 24px Inter, sans-serif"
            ctx.textAlign = "center"
            ctx.fillText(activeModel.name, canvas.width / 2, canvas.height - 25)
          }

          // Set the image source last (this triggers loading)
          img.src = imagePath
        } catch (error) {
          console.error("Error rendering canvas:", error)
          setImageError(true)
          drawFallbackContent(ctx, canvas, activeModel)
        }
      }
    }
  }, [activeModel])

  const playAudio = () => {
    if (audioRef.current && activeModel) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Reset error state when attempting to play
        setAudioError(false)

        try {
          // Check if the audio file is the placeholder
          if (activeModel.audio === "/placeholder.mp3") {
            // Set error state since we know this file doesn't exist or is empty
            setAudioError(true)
            return
          }

          audioRef.current.src = activeModel.audio

          // Use a promise to handle play() since it returns a promise
          const playPromise = audioRef.current.play()

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true)
              })
              .catch((error) => {
                console.error("Audio playback failed:", error)
                setAudioError(true)
                setIsPlaying(false)
              })
          }
        } catch (error) {
          console.error("Error setting up audio:", error)
          setAudioError(true)
          setIsPlaying(false)
        }
      }
    }
  }

  useEffect(() => {
    // Reset audio when model changes
    setIsPlaying(false)
    setAudioError(false)

    if (audioRef.current) {
      audioRef.current.pause()
      // Don't set src if it's the placeholder to avoid unnecessary network requests
      if (activeModel?.audio && activeModel.audio !== "/placeholder.mp3") {
        try {
          audioRef.current.src = activeModel.audio
        } catch (error) {
          console.error("Error setting audio source:", error)
          setAudioError(true)
        }
      } else {
        // Clear the source if it's a placeholder
        audioRef.current.removeAttribute("src")
      }
    }
  }, [activeModel])

  if (!activeModel) return <div>Loading...</div>

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
                  onError={(e) => {
                    // Fallback for header logo
                    e.currentTarget.style.display = "none"
                  }}
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

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-black">Interactive LLM Learning</h1>
          <p className="text-gray-600">
            Explore different LLM models and learn about their capabilities and use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Model Selection</CardTitle>
                <CardDescription>Choose a model to learn about</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  {models.map((model) => (
                    <Button
                      key={model.id}
                      variant={activeModel?.id === model.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setActiveModel(model)}
                    >
                      {model.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{activeModel.name}</CardTitle>
                <CardDescription>
                  Created by: {activeModel.creator} | Released: {activeModel.releaseDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="w-full h-auto border rounded-lg bg-white"
                  ></canvas>
                  <audio
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => {
                      setAudioError(true)
                      setIsPlaying(false)
                    }}
                  />
                </div>

                <div className="flex justify-end mb-4">
                  {audioError ? (
                    <Button variant="outline" disabled className="text-gray-500">
                      <VolumeX className="mr-2 h-4 w-4" />
                      Audio Unavailable
                    </Button>
                  ) : (
                    <Button onClick={playAudio} variant="outline">
                      <Volume2 className="mr-2 h-4 w-4" />
                      {isPlaying ? "Pause Audio" : "Play Audio Description"}
                    </Button>
                  )}
                </div>

                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Key Features</TabsTrigger>
                    <TabsTrigger value="usecases">Use Cases</TabsTrigger>
                    <TabsTrigger value="limitations">Limitations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="p-4">
                    <p className="text-gray-700">{activeModel.description}</p>
                  </TabsContent>
                  <TabsContent value="features" className="p-4">
                    <ul className="list-disc pl-5 space-y-2">
                      {activeModel.keyFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-700">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="usecases" className="p-4">
                    <ul className="list-disc pl-5 space-y-2">
                      {activeModel.useCases.map((useCase, index) => (
                        <li key={index} className="text-gray-700">
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="limitations" className="p-4">
                    <ul className="list-disc pl-5 space-y-2">
                      {activeModel.limitations.map((limitation, index) => (
                        <li key={index} className="text-gray-700">
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    const currentIndex = models.findIndex((m) => m.id === activeModel.id)
                    const prevIndex = (currentIndex - 1 + models.length) % models.length
                    setActiveModel(models[prevIndex])
                  }}
                >
                  Previous Model
                </Button>
                <Button
                  onClick={() => {
                    const currentIndex = models.findIndex((m) => m.id === activeModel.id)
                    const nextIndex = (currentIndex + 1) % models.length
                    setActiveModel(models[nextIndex])
                  }}
                >
                  Next Model
                </Button>
              </CardFooter>
            </Card>
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
