"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Languages, Send, RotateCcw } from "lucide-react"

export default function SentenceExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [translationMode, setTranslationMode] = useState("vi-en")
  const [userAnswer, setUserAnswer] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<{
    score: number;
    color: string;
    status: string;
    text: string;
  } | null>(null)
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false)

  const exercise = {
    id: resolvedParams.id,
    title: "Basic Greetings",
    description: "Câu chào cơ bản trong tiếng Anh",
    level: "beginner",
    difficulty: "Dễ",
    content: {
      "vi-en": {
        prompt: "Dịch câu sau sang tiếng Anh:",
        text: "Chào buổi sáng! Hôm nay bạn có khỏe không?",
      },
      "en-vi": {
        prompt: "Dịch câu sau sang tiếng Việt:",
        text: "Good morning! How are you doing today?",
      },
    },
  }

  const currentContent = exercise.content[translationMode as keyof typeof exercise.content]

  const generateFeedback = async () => {
    setIsGeneratingFeedback(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const score = Math.floor(Math.random() * 40) + 60

    let feedbackText = ""
    let color = ""
    let status = ""

    if (score >= 90) {
      color = "text-green-600"
      status = "Xuất sắc"
      feedbackText = "Câu dịch của bạn hoàn hảo! Ngữ pháp chính xác, từ vựng phù hợp và cách diễn đạt tự nhiên."
    } else if (score >= 60) {
      color = "text-yellow-600"
      status = "Cần cải thiện"
      feedbackText = "Câu dịch khá tốt nhưng có thể cải thiện thêm về ngữ pháp hoặc cách diễn đạt."
    } else {
      color = "text-red-600"
      status = "Cần cải thiện nhiều"
      feedbackText = "Câu dịch cần được sửa lại. Hãy chú ý đến ngữ pháp và từ vựng."
    }

    setFeedback({
      score,
      color,
      status,
      text: feedbackText,
    })

    setIsGeneratingFeedback(false)
  }

  const TypewriterText = ({ text, speed = 50 }: { text: string; speed?: number }) => {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, speed)

        return () => clearTimeout(timeout)
      }
    }, [currentIndex, text, speed])

    useEffect(() => {
      setDisplayText("")
      setCurrentIndex(0)
    }, [text])

    return <span>{displayText}</span>
  }

  const handleSubmit = () => {
    if (!userAnswer.trim()) return
    setIsSubmitted(true)
    generateFeedback()
  }

  const handleReset = () => {
    setUserAnswer("")
    setIsSubmitted(false)
    setFeedback(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "bg-green-500"
      case "Trung bình":
        return "bg-yellow-500"
      case "Khó":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/writing">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">{exercise.title}</h1>
            <p className="text-slate-600">{exercise.description}</p>
          </div>
          <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
        </div>

        {/* Translation Mode Selector */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Languages className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Chế độ dịch:</span>
              <Select value={translationMode} onValueChange={setTranslationMode}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi-en">Việt → Anh</SelectItem>
                  <SelectItem value="en-vi">Anh → Việt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{currentContent.prompt}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-800 text-lg font-medium">{currentContent.text}</p>
            </div>

            <Input
              placeholder="Nhập câu dịch của bạn..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={isSubmitted}
              className="text-lg"
            />

            <div className="flex space-x-3">
              {!isSubmitted ? (
                <Button onClick={handleSubmit} disabled={!userAnswer.trim()} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Nộp bài
                </Button>
              ) : (
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Làm lại
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Feedback */}
        {isSubmitted && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Phản hồi từ AI</span>
                {feedback && (
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-bold ${feedback.color}`}>{feedback.score}/100</span>
                    <Badge
                      className={
                        feedback.score >= 90 ? "bg-green-500" : feedback.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                      }
                    >
                      {feedback.status}
                    </Badge>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isGeneratingFeedback ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-slate-600">AI đang phân tích câu dịch của bạn...</span>
                </div>
              ) : feedback ? (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      feedback.score >= 90
                        ? "bg-green-50 border border-green-200"
                        : feedback.score >= 60
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p className="text-slate-800 leading-relaxed">
                      <TypewriterText text={feedback.text} speed={40} />
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Câu dịch tham khảo:</h4>
                    <p className="text-blue-700 text-lg">
                      {translationMode === "vi-en"
                        ? "Good morning! How are you doing today?"
                        : "Chào buổi sáng! Hôm nay bạn có khỏe không?"}
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
