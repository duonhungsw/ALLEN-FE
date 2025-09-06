"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Volume2, RotateCcw, CheckCircle, XCircle, Eye } from "lucide-react"

export default function VocabularyReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [reviewedWords, setReviewedWords] = useState<Record<number, "easy" | "good" | "hard" | null>>({})

  const wordsToReview = [
    {
      id: 1,
      word: "serendipity",
      meaning: "sự tình cờ may mắn",
      pronunciation: "/ˌserənˈdɪpɪti/",
      example: "Finding this job was pure serendipity.",
      difficulty: "hard",
      lastReview: "3 ngày trước",
      nextReview: "1 ngày",
    },
    {
      id: 2,
      word: "entrepreneur",
      meaning: "doanh nhân",
      pronunciation: "/ˌɑːntrəprəˈnɜːr/",
      example: "She became a successful entrepreneur at age 25.",
      difficulty: "medium",
      lastReview: "1 tuần trước",
      nextReview: "3 ngày",
    },
    {
      id: 3,
      word: "algorithm",
      meaning: "thuật toán",
      pronunciation: "/ˈælɡərɪðəm/",
      example: "The algorithm processes data efficiently.",
      difficulty: "hard",
      lastReview: "1 ngày trước",
      nextReview: "1 ngày",
    },
  ]

  const currentWord = wordsToReview[currentIndex]
  const progress = ((currentIndex + 1) / wordsToReview.length) * 100

  const handleReview = (difficulty: "easy" | "good" | "hard") => {
    setReviewedWords((prev) => ({ ...prev, [currentIndex]: difficulty }))

    if (currentIndex < wordsToReview.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
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

  const getNextInterval = (difficulty: "easy" | "good" | "hard") => {
    switch (difficulty) {
      case "easy":
        return "7 ngày"
      case "good":
        return "3 ngày"
      case "hard":
        return "1 ngày"
      default:
        return "1 ngày"
    }
  }

  if (currentIndex >= wordsToReview.length) {
    const reviewStats = Object.values(reviewedWords)
    const easyCount = reviewStats.filter((r) => r === "easy").length
    const goodCount = reviewStats.filter((r) => r === "good").length
    const hardCount = reviewStats.filter((r) => r === "hard").length

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
        <div className="container mx-auto px-6 py-8 max-w-2xl">
          <Card className="text-center" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
            <CardHeader>
              <CardTitle className="text-2xl text-white">🎉 Hoàn thành phiên ôn tập!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                  <div className="text-2xl font-bold text-white">{easyCount}</div>
                  <div className="text-sm text-gray-300">Dễ nhớ</div>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                  <div className="text-2xl font-bold text-white">{goodCount}</div>
                  <div className="text-sm text-gray-300">Khá tốt</div>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                  <div className="text-2xl font-bold text-white">{hardCount}</div>
                  <div className="text-sm text-gray-300">Cần ôn lại</div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/">
                  <Button className="w-full text-white" style={{ backgroundColor: '#93D333' }}>Về trang chủ</Button>
                </Link>
                <Link href="/vocabulary">
                  <Button variant="outline" className="w-full bg-transparent text-white border-gray-600 hover:bg-gray-700">
                    Quản lý từ vựng
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
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4 text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Ôn tập SRS</h1>
            <p className="text-gray-300">Hệ thống lặp lại ngắt quãng - SM2 Algorithm</p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Tiến độ ôn tập</span>
              <span className="text-sm text-gray-300">
                {currentIndex + 1}/{wordsToReview.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" style={{ backgroundColor: '#93D333' }} />
          </CardContent>
        </Card>

        {/* Flashcard */}
        <Card className="mb-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Word */}
              <div>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <h2 className="text-4xl font-bold text-white">{currentWord.word}</h2>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-gray-600">
                    <Volume2 className="h-5 w-5" style={{ color: '#93D333' }} />
                  </Button>
                  <Badge className={getDifficultyColor(currentWord.difficulty)}>{currentWord.difficulty}</Badge>
                </div>
                <p className="text-gray-300 text-lg">{currentWord.pronunciation}</p>
              </div>

              {/* Show/Hide Answer */}
              <div className="min-h-[200px] flex items-center justify-center">
                {!showAnswer ? (
                  <Button onClick={() => setShowAnswer(true)} className="text-white" size="lg" style={{ backgroundColor: '#93D333' }}>
                    <Eye className="h-5 w-5 mr-2" />
                    Hiện đáp án
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-6 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                      <h3 className="text-xl font-semibold text-white mb-2">{currentWord.meaning}</h3>
                      <p className="text-gray-300 italic">&ldquo;{currentWord.example}&rdquo;</p>
                    </div>

                    <div className="text-sm text-gray-400">Lần ôn trước: {currentWord.lastReview}</div>
                  </div>
                )}
              </div>

              {/* Review Buttons */}
              {showAnswer && (
                <div className="space-y-4">
                  <p className="text-gray-300">Bạn nhớ từ này như thế nào?</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => handleReview("hard")}
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-900 bg-transparent"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Khó nhớ
                      <div className="text-xs text-gray-400 mt-1">Ôn lại sau {getNextInterval("hard")}</div>
                    </Button>
                    <Button
                      onClick={() => handleReview("good")}
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-900 bg-transparent"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Khá tốt
                      <div className="text-xs text-gray-400 mt-1">Ôn lại sau {getNextInterval("good")}</div>
                    </Button>
                    <Button
                      onClick={() => handleReview("easy")}
                      variant="outline"
                      className="border-green-500 text-green-400 hover:bg-green-900 bg-transparent"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Dễ nhớ
                      <div className="text-xs text-gray-400 mt-1">Ôn lại sau {getNextInterval("easy")}</div>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* SRS Info */}
        <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardHeader>
            <CardTitle className="text-lg text-white">Thuật toán SRS (SM-2)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                <h4 className="font-semibold text-red-400">Khó nhớ</h4>
                <p className="text-red-300">Lặp lại sau 1 ngày</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                <h4 className="font-semibold text-blue-400">Khá tốt</h4>
                <p className="text-blue-300">Lặp lại sau 3 ngày</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                <h4 className="font-semibold text-green-400">Dễ nhớ</h4>
                <p className="text-green-300">Lặp lại sau 7 ngày</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
