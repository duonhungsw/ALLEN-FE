"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Volume2, CheckCircle, XCircle, Eye } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [completedCards, setCompletedCards] = useState<Record<number, boolean>>({})
  const [selectedVoice, setSelectedVoice] = useState<"US" | "UK">("US")

  const flashcards = [
    {
      id: 1,
      word: "serendipity",
      meaning: "sự tình cờ may mắn",
      pronunciation: "/ˌserənˈdɪpɪti/",
      example: "Finding this job was pure serendipity.",
      difficulty: "hard",
    },
    {
      id: 2,
      word: "entrepreneur",
      meaning: "doanh nhân",
      pronunciation: "/ˌɑːntrəprəˈnɜːr/",
      example: "She became a successful entrepreneur at age 25.",
      difficulty: "medium",
    },
    {
      id: 3,
      word: "algorithm",
      meaning: "thuật toán",
      pronunciation: "/ˈælɡərɪðəm/",
      example: "The algorithm processes data efficiently.",
      difficulty: "hard",
    },
    {
      id: 4,
      word: "cuisine",
      meaning: "ẩm thực",
      pronunciation: "/kwɪˈziːn/",
      example: "Italian cuisine is famous worldwide.",
      difficulty: "easy",
    },
    {
      id: 5,
      word: "itinerary",
      meaning: "lịch trình du lịch",
      pronunciation: "/aɪˈtɪnəreri/",
      example: "We planned our itinerary for the Europe trip.",
      difficulty: "medium",
    },
  ]

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100

  // Text-to-Speech function
  const speakWord = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedVoice === "US" ? "en-US" : "en-GB"
      utterance.rate = 0.8

      // Try to find a voice that matches the selected accent
      const voices = speechSynthesis.getVoices()
      const preferredVoice = voices.find((voice) =>
        selectedVoice === "US" ? voice.lang.includes("en-US") : voice.lang.includes("en-GB"),
      )

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      speechSynthesis.speak(utterance)
    }
  }

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
    }
  }

  const markAsKnown = () => {
    setCompletedCards((prev) => ({ ...prev, [currentIndex]: true }))
    nextCard()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (currentIndex >= flashcards.length) {
    const knownCount = Object.values(completedCards).filter(Boolean).length
    const accuracy = Math.round((knownCount / flashcards.length) * 100)

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
        <div className="container mx-auto px-6 py-8 max-w-2xl">
          <Card className="text-center" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
            <CardHeader>
              <CardTitle className="text-2xl text-white">🎉 Hoàn thành Flashcards!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                  <div className="text-2xl font-bold text-white">{knownCount}</div>
                  <div className="text-sm text-gray-300">Đã biết</div>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                  <div className="text-2xl font-bold text-white">{accuracy}%</div>
                  <div className="text-sm text-gray-300">Độ chính xác</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={() => window.location.reload()} className="w-full text-white" style={{ backgroundColor: '#93D333' }}>
                  Luyện lại
                </Button>
                <Link href="/vocabulary">
                  <Button variant="outline" className="w-full bg-transparent text-white border-gray-600 hover:bg-gray-700">
                    Quản lý từ vựng
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full bg-transparent text-white border-gray-600 hover:bg-gray-700">
                    Về trang chủ
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/vocabulary">
            <Button variant="ghost" size="sm" className="mr-4 text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Flashcards</h1>
            <p className="text-gray-300">Luyện từ vựng với thẻ ghi nhớ</p>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-white">Giọng phát âm:</span>
              <Select value={selectedVoice} onValueChange={(value: "US" | "UK") => setSelectedVoice(value)}>
                <SelectTrigger className="w-24 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="US" className="text-white hover:bg-gray-600">🇺🇸 US</SelectItem>
                  <SelectItem value="UK" className="text-white hover:bg-gray-600">🇬🇧 UK</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Tiến độ</span>
              <span className="text-sm text-gray-300">
                {currentIndex + 1}/{flashcards.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" style={{ backgroundColor: '#93D333' }} />
          </CardContent>
        </Card>

        {/* Flashcard */}
        <Card className="mb-6 min-h-[400px]" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardContent className="p-8">
            <div className="text-center space-y-6 h-full flex flex-col justify-center">
              {/* Front Side - English Word */}
              {!showAnswer ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <h2 className="text-5xl font-bold text-white">{currentCard.word}</h2>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => speakWord(currentCard.word)}
                      className="hover:bg-gray-600 text-white border-gray-600"
                    >
                      <Volume2 className="h-6 w-6" style={{ color: '#93D333' }} />
                    </Button>
                  </div>
                  <Badge className={getDifficultyColor(currentCard.difficulty)}>
                    {currentCard.difficulty}
                  </Badge>
                  <p className="text-gray-300 text-xl">{currentCard.pronunciation}</p>
                  <Button onClick={() => setShowAnswer(true)} className="text-white" size="lg" style={{ backgroundColor: '#93D333' }}>
                    <Eye className="h-5 w-5 mr-2" />
                    Hiện nghĩa
                  </Button>
                </div>
              ) : (
                /* Back Side - Vietnamese Meaning */
                <div className="space-y-6">
                  <div className="p-6 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                    <h3 className="text-3xl font-bold text-white mb-4">{currentCard.meaning}</h3>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <p className="text-gray-300 text-lg">{currentCard.pronunciation}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => speakWord(currentCard.word)}
                        className="hover:bg-gray-600 text-white border-gray-600"
                      >
                        <Volume2 className="h-4 w-4" style={{ color: '#93D333' }} />
                      </Button>
                    </div>
                    <p className="text-gray-200 italic text-lg">&ldquo;{currentCard.example}&rdquo;</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-300">Bạn đã biết từ này chưa?</p>
                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={nextCard}
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-900 bg-transparent"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Chưa biết
                      </Button>
                      <Button onClick={markAsKnown} className="text-white" style={{ backgroundColor: '#93D333' }}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Đã biết
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={prevCard} disabled={currentIndex === 0} className="text-white border-gray-600 hover:bg-gray-700" style={{ backgroundColor: '#93D333' }}>
            Thẻ trước
          </Button>

          <div className="flex space-x-2">
            {flashcards.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? "bg-[#93D333]"
                    : completedCards[index]
                      ? "bg-green-500"
                      : index < currentIndex
                        ? "bg-gray-400"
                        : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button variant="outline" onClick={nextCard} disabled={currentIndex === flashcards.length - 1} className="text-white border-gray-600 hover:bg-gray-700" style={{ backgroundColor: '#93D333' }}>
            Thẻ sau
          </Button>
        </div>
      </div>
    </div>
  )
}
