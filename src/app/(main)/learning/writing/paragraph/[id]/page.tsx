"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Languages, Send, RotateCcw } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ParagraphExercisePage({ params }: { params: { id: string } }) {
  const resolvedParams = params
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
  const tParagraphExercise = useTranslations("Writing.ParagraphExercise")
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
      status = tParagraphExercise("feedback.status.excellent")
      feedbackText = tParagraphExercise("feedback.text.excellent")
    } else if (score >= 60) {
      color = "text-yellow-600"
      status = tParagraphExercise("feedback.status.good")
      feedbackText =tParagraphExercise("feedback.text.good")
    } else {
      color = "text-red-600"
      status = tParagraphExercise("feedback.status.bad")
      feedbackText =tParagraphExercise("feedback.text.bad")
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
    <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/learning/writing">
            <Button variant="ghost" size="sm" className="mr-4 text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tParagraphExercise("back")}
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{exercise.title}</h1>
            <p className="text-gray-300">{exercise.description}</p>
          </div>
          <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
        </div>

        {/* Translation Mode Selector */}
        <Card className="mb-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Languages className="h-5 w-5" style={{ color: '#93D333' }} />
              <span className="font-medium text-white">{tParagraphExercise("mode")}</span>
              <Select value={translationMode} onValueChange={setTranslationMode}>
                <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="vi-en" className="text-white hover:bg-gray-600">{tParagraphExercise("modeViEn")}</SelectItem>
                  <SelectItem value="en-vi" className="text-white hover:bg-gray-600">{tParagraphExercise("modeEnVi")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Text */}
          <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
            <CardHeader>
              <CardTitle className="text-lg text-white">{currentContent.prompt}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                <p className="text-gray-200 leading-relaxed">{currentContent.text}</p>
              </div>
            </CardContent>
          </Card>

          {/* Translation Input */}
          <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
            <CardHeader>
              <CardTitle className="text-lg text-white">{tParagraphExercise("yourAnswer")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={tParagraphExercise("placeholder")}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isSubmitted}
                rows={6}
                className="resize-none bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />

              <div className="flex space-x-3">
                {!isSubmitted ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className="text-white"
                    style={{ backgroundColor: '#93D333' }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {tParagraphExercise("submit")}
                  </Button>
                ) : (
                  <Button onClick={handleReset} variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {tParagraphExercise("reset")}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Feedback */}
        {isSubmitted && (
          <Card className="mt-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <span>{tParagraphExercise("feedback.title")}</span>
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
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2" style={{ borderColor: '#93D333' }}></div>
                  <span className="text-gray-300">{tParagraphExercise("feedback.loading")}</span>
                </div>
              ) : feedback ? (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      feedback.score >= 90
                        ? "bg-green-900 border border-green-500"
                        : feedback.score >= 60
                          ? "bg-yellow-900 border border-yellow-500"
                          : "bg-red-900 border border-red-500"
                    }`}
                  >
                    <p className="text-gray-200 leading-relaxed">
                      <TypewriterText text={feedback.text} speed={30} />
                    </p>
                  </div>

                  {/* Sample correct translation */}
                  <div className="p-4 rounded-lg border" style={{ backgroundColor: '#2a3a3f', borderColor: '#93D333' }}>
                    <h4 className="font-semibold text-white mb-2">{tParagraphExercise("sample")}</h4>
                    <p className="text-gray-300">
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
        <Card className="mt-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardHeader>
            <CardTitle className="text-white">{tParagraphExercise("tips.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 text-white">{tParagraphExercise("tips.viEn.title")}</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {tParagraphExercise.raw("tips.viEn.items").map((tip: string, i: number) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white">{tParagraphExercise("tips.enVi.title")}</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {tParagraphExercise.raw("tips.enVi.items").map((tip: string, i: number) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
