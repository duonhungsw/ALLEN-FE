"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Settings, CheckCircle, XCircle, RotateCcw } from "lucide-react"

export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<Record<number, { selected: string; correct: boolean }>>({})

  // Quiz settings
  const [wordCount, setWordCount] = useState("10")
  const [difficulty, setDifficulty] = useState("all")

  // Mock vocabulary data
  const allWords = [
    { word: "serendipity", meaning: "sự tình cờ may mắn", difficulty: "hard" },
    { word: "entrepreneur", meaning: "doanh nhân", difficulty: "medium" },
    { word: "algorithm", meaning: "thuật toán", difficulty: "hard" },
    { word: "cuisine", meaning: "ẩm thực", difficulty: "easy" },
    { word: "itinerary", meaning: "lịch trình du lịch", difficulty: "medium" },
    { word: "magnificent", meaning: "tráng lệ, hùng vĩ", difficulty: "medium" },
    { word: "perseverance", meaning: "sự kiên trì", difficulty: "hard" },
    { word: "delicious", meaning: "ngon", difficulty: "easy" },
    { word: "beautiful", meaning: "đẹp", difficulty: "easy" },
    { word: "complicated", meaning: "phức tạp", difficulty: "medium" },
  ]

  const [quizQuestions, setQuizQuestions] = useState<any[]>([])

  const generateQuestions = () => {
    let filteredWords = allWords
    if (difficulty !== "all") {
      filteredWords = allWords.filter((word) => word.difficulty === difficulty)
    }

    // Shuffle and take the specified number of words
    const shuffled = [...filteredWords].sort(() => Math.random() - 0.5)
    const selectedWords = shuffled.slice(0, Number.parseInt(wordCount))

    const questions = selectedWords.map((word) => {
      // Create wrong answers by mixing meanings from other words
      const wrongAnswers = allWords
        .filter((w) => w.word !== word.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.meaning)

      const allOptions = [word.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5)

      return {
        word: word.word,
        correctAnswer: word.meaning,
        options: allOptions,
        difficulty: word.difficulty,
      }
    })

    setQuizQuestions(questions)
  }

  const startQuiz = () => {
    generateQuestions()
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setAnswers({})
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const submitAnswer = () => {
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: { selected: selectedAnswer, correct: isCorrect },
    }))

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      // Quiz completed
      setQuizStarted(false)
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setAnswers({})
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

  // Quiz completed screen
  if (!quizStarted && Object.keys(answers).length > 0) {
    const accuracy = Math.round((score / quizQuestions.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6 py-8 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">🎉 Hoàn thành Quiz!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-blue-700">Đúng</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{quizQuestions.length - score}</div>
                  <div className="text-sm text-red-700">Sai</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                  <div className="text-sm text-green-700">Độ chính xác</div>
                </div>
              </div>

              {/* Review wrong answers */}
              {Object.entries(answers).some(([_, answer]) => !answer.correct) && (
                <div className="text-left">
                  <h3 className="font-semibold mb-3">Câu trả lời sai:</h3>
                  <div className="space-y-2">
                    {Object.entries(answers).map(([index, answer]) => {
                      if (answer.correct) return null
                      const question = quizQuestions[Number.parseInt(index)]
                      return (
                        <div key={index} className="bg-red-50 p-3 rounded-lg">
                          <p className="font-medium">{question.word}</p>
                          <p className="text-sm text-red-600">Bạn chọn: {answer.selected}</p>
                          <p className="text-sm text-green-600">Đáp án đúng: {question.correctAnswer}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button onClick={startQuiz} className="w-full bg-teal-600 hover:bg-teal-700">
                  Làm lại Quiz
                </Button>
                <Link href="/vocabulary">
                  <Button variant="outline" className="w-full bg-transparent">
                    Quản lý từ vựng
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full bg-transparent">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/vocabulary">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">Quiz nhanh</h1>
            <p className="text-slate-600">Kiểm tra từ vựng với câu hỏi trắc nghiệm</p>
          </div>
        </div>

        {!quizStarted ? (
          /* Quiz Settings */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-blue-600" />
                Cài đặt Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="word-count">Số lượng từ</Label>
                  <Select value={wordCount} onValueChange={setWordCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 từ</SelectItem>
                      <SelectItem value="10">10 từ</SelectItem>
                      <SelectItem value="15">15 từ</SelectItem>
                      <SelectItem value="20">20 từ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Mức độ</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="easy">Dễ</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="hard">Khó</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Thống kê từ vựng:</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {allWords.filter((w) => w.difficulty === "easy").length}
                    </div>
                    <div className="text-sm text-slate-600">Dễ</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-600">
                      {allWords.filter((w) => w.difficulty === "medium").length}
                    </div>
                    <div className="text-sm text-slate-600">Trung bình</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">
                      {allWords.filter((w) => w.difficulty === "hard").length}
                    </div>
                    <div className="text-sm text-slate-600">Khó</div>
                  </div>
                </div>
              </div>

              <Button onClick={startQuiz} className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
                Bắt đầu Quiz
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Quiz Questions */
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tiến độ</span>
                  <span className="text-sm text-slate-600">
                    {currentQuestion + 1}/{quizQuestions.length}
                  </span>
                </div>
                <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
              </CardContent>
            </Card>

            {/* Question */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Nghĩa của từ này là gì?</CardTitle>
                  <Badge className={getDifficultyColor(quizQuestions[currentQuestion]?.difficulty)}>
                    {quizQuestions[currentQuestion]?.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">{quizQuestions[currentQuestion]?.word}</h2>
                </div>

                <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} disabled={showResult}>
                  {quizQuestions[currentQuestion]?.options.map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className={`flex-1 p-3 rounded-lg border cursor-pointer transition-colors ${
                          showResult
                            ? option === quizQuestions[currentQuestion].correctAnswer
                              ? "bg-green-50 border-green-500 text-green-700"
                              : selectedAnswer === option && option !== quizQuestions[currentQuestion].correctAnswer
                                ? "bg-red-50 border-red-500 text-red-700"
                                : "bg-slate-50 border-slate-200"
                            : selectedAnswer === option
                              ? "bg-blue-50 border-blue-500"
                              : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {option}
                        {showResult && option === quizQuestions[currentQuestion].correctAnswer && (
                          <CheckCircle className="h-4 w-4 text-green-600 ml-2 inline" />
                        )}
                        {showResult &&
                          selectedAnswer === option &&
                          option !== quizQuestions[currentQuestion].correctAnswer && (
                            <XCircle className="h-4 w-4 text-red-600 ml-2 inline" />
                          )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {showResult && (
                  <div
                    className={`p-4 rounded-lg ${
                      selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                      ? "🎉 Chính xác! Tuyệt vời!"
                      : "❌ Chưa đúng. Đáp án đúng đã được đánh dấu bên trên."}
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetQuiz}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Làm lại
                  </Button>

                  {!showResult ? (
                    <Button onClick={submitAnswer} disabled={!selectedAnswer} className="bg-blue-600 hover:bg-blue-700">
                      Nộp đáp án
                    </Button>
                  ) : (
                    <Button onClick={nextQuestion} className="bg-teal-600 hover:bg-teal-700">
                      {currentQuestion < quizQuestions.length - 1 ? "Câu tiếp theo" : "Hoàn thành"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
