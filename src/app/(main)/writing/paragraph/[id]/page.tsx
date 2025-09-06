"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Languages, Send, RotateCcw } from "lucide-react"

export default function ParagraphExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [translationMode, setTranslationMode] = useState("vi-en") // vi-en or en-vi
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
    title: "My Daily Routine",
    description: "Viết về thói quen hàng ngày của bạn",
    level: "beginner",
    difficulty: "Dễ",
    content: {
      "vi-en": {
        prompt: "Hãy dịch đoạn văn sau sang tiếng Anh:",
        text: "Tôi thức dậy lúc 6 giờ sáng mỗi ngày. Sau khi đánh răng và rửa mặt, tôi tập thể dục trong 30 phút. Sau đó tôi ăn sáng và đi làm lúc 8 giờ.",
      },
      "en-vi": {
        prompt: "Hãy dịch đoạn văn sau sang tiếng Việt:",
        text: "I wake up at 6 AM every day. After brushing my teeth and washing my face, I exercise for 30 minutes. Then I have breakfast and go to work at 8 AM.",
      },
    },
  }

  const currentContent = exercise.content[translationMode as keyof typeof exercise.content]

  const generateFeedback = async () => {
    setIsGeneratingFeedback(true)

    // Simulate AI feedback generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock feedback based on score
    const score = Math.floor(Math.random() * 40) + 60 // Random score between 60-100

    let feedbackText = ""
    let color = ""
    let status = ""

    if (score >= 90) {
      color = "text-green-600"
      status = "Xuất sắc"
      feedbackText =
        "Bài dịch của bạn rất tốt! Ngữ pháp chính xác, từ vựng phù hợp và cấu trúc câu tự nhiên. Bạn đã nắm vững cách diễn đạt thói quen hàng ngày trong tiếng Anh. Tiếp tục duy trì phong độ này!"
    } else if (score >= 60) {
      color = "text-yellow-600"
      status = "Cần cải thiện"
      feedbackText =
        "Bài dịch của bạn ở mức khá tốt. Tuy nhiên, có một số lỗi nhỏ về ngữ pháp và cách dùng từ. Hãy chú ý đến thì của động từ và cách diễn đạt thời gian. Với một chút luyện tập thêm, bạn sẽ cải thiện đáng kể."
    } else {
      color = "text-red-600"
      status = "Cần cải thiện nhiều"
      feedbackText =
        "Bài dịch của bạn cần được cải thiện. Có khá nhiều lỗi về ngữ pháp, từ vựng và cấu trúc câu. Hãy ôn lại các thì cơ bản và cách diễn đạt thói quen. Đừng nản lòng, hãy tiếp tục luyện tập!"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{currentContent.prompt}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-800 leading-relaxed">{currentContent.text}</p>
              </div>
            </CardContent>
          </Card>

          {/* Translation Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bản dịch của bạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Nhập bản dịch của bạn..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isSubmitted}
                rows={6}
                className="resize-none"
              />

              <div className="flex space-x-3">
                {!isSubmitted ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
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
        </div>

        {/* AI Feedback */}
        {isSubmitted && (
          <Card className="mt-6">
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
                  <span className="text-slate-600">AI đang phân tích bài làm của bạn...</span>
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
                      <TypewriterText text={feedback.text} speed={30} />
                    </p>
                  </div>

                  {/* Sample correct translation */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Bản dịch tham khảo:</h4>
                    <p className="text-blue-700">
                      {translationMode === "vi-en"
                        ? "I wake up at 6 AM every day. After brushing my teeth and washing my face, I exercise for 30 minutes. Then I have breakfast and go to work at 8 AM."
                        : "Tôi thức dậy lúc 6 giờ sáng mỗi ngày. Sau khi đánh răng và rửa mặt, tôi tập thể dục trong 30 phút. Sau đó tôi ăn sáng và đi làm lúc 8 giờ."}
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Mẹo dịch hiệu quả</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Việt → Anh</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Chú ý thì của động từ</li>
                  <li>• Sử dụng giới từ chính xác</li>
                  <li>• Tránh dịch từng từ một</li>
                  <li>• Đảm bảo câu tự nhiên</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Anh → Việt</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Hiểu ý nghĩa tổng thể</li>
                  <li>• Dùng từ Việt phù hợp</li>
                  <li>• Giữ nguyên ý nghĩa gốc</li>
                  <li>• Câu Việt trôi chảy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
