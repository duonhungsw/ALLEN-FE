"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Settings, Volume2, BookmarkPlus, ThumbsUp, ThumbsDown } from "lucide-react"

interface VocabularyPopup {
  word: string
  position: { x: number; y: number }
  visible: boolean
}

export default function IndividualReadingPage({ params }: { params: { id: string } }) {
  const [highlightMode, setHighlightMode] = useState(true)
  const [vocabularyMode, setVocabularyMode] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [highlights, setHighlights] = useState<string[]>([])
  const [vocabularyPopup, setVocabularyPopup] = useState<VocabularyPopup>({
    word: "",
    position: { x: 0, y: 0 },
    visible: false,
  })
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const textRef = useRef<HTMLDivElement>(null)

  // Mock data for individual passage
  const exercise = {
    id: params.id,
    title: "The Benefits of Reading",
    passage: `Reading is one of the most beneficial activities for the human mind. It not only provides entertainment and knowledge but also offers numerous cognitive benefits that can improve our daily lives.

First, reading enhances vocabulary and language skills. When we read regularly, we encounter new words and phrases in context, which helps us understand their meanings naturally. This exposure to diverse vocabulary strengthens our communication abilities and makes us more articulate speakers and writers.

Second, reading improves concentration and focus. In our digital age, where distractions are everywhere, reading requires sustained attention. This practice of focusing on a single task for extended periods helps train our minds to concentrate better in other areas of life.

Finally, reading reduces stress and promotes relaxation. Studies have shown that reading can lower heart rate and reduce muscle tension, making it an effective way to unwind after a busy day. The act of immersing ourselves in a good book provides an escape from daily worries and concerns.`,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "According to the passage, reading helps improve:",
        options: [
          "A) Only entertainment value",
          "B) Vocabulary and language skills",
          "C) Physical strength",
          "D) Mathematical abilities",
        ],
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "The passage suggests that reading can help with concentration because:",
        options: [
          "A) It requires sustained attention",
          "B) It is always entertaining",
          "C) It is easy to do",
          "D) It doesn't require thinking",
        ],
      },
      {
        id: 3,
        type: "true-false",
        question: "Reading can reduce stress according to the passage.",
        options: ["True", "False", "Not Given"],
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which of the following is NOT mentioned as a benefit of reading?",
        options: ["A) Improved vocabulary", "B) Better concentration", "C) Stress reduction", "D) Enhanced memory"],
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "The passage implies that in our digital age:",
        options: [
          "A) Reading is becoming obsolete",
          "B) Distractions are everywhere",
          "C) Books are no longer popular",
          "D) Technology replaces reading",
        ],
      },
    ],
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    } else if (!isActive && timer !== 0) {
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleTextSelection = () => {
    if (!highlightMode) return

    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim()
      setHighlights((prev) => [...prev, selectedText])

      // Add highlight styling
      const range = selection.getRangeAt(0)
      const span = document.createElement("span")
      span.className = "bg-yellow-200 px-1 rounded"
      span.appendChild(range.extractContents())
      range.insertNode(span)

      selection.removeAllRanges()
    }
  }

  const handleWordClick = (event: React.MouseEvent, word: string) => {
    if (!vocabularyMode) return

    event.preventDefault()
    const rect = (event.target as HTMLElement).getBoundingClientRect()

    setVocabularyPopup({
      word: word.toLowerCase().replace(/[.,!?;]/g, ""),
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      },
      visible: true,
    })
  }

  const closeVocabularyPopup = () => {
    setVocabularyPopup((prev) => ({ ...prev, visible: false }))
  }

  const getVocabularyData = (word: string) => {
    // Mock vocabulary data
    const vocabularyDB: Record<string, any> = {
      beneficial: {
        pronunciation: "/ˌbenɪˈfɪʃəl/",
        meaning: "có lợi, có ích",
        type: "adjective",
        example: "Exercise is beneficial for your health.",
        vietnamese: "có lợi ích",
      },
      cognitive: {
        pronunciation: "/ˈkɒɡnɪtɪv/",
        meaning: "thuộc về nhận thức",
        type: "adjective",
        example: "Reading improves cognitive abilities.",
        vietnamese: "nhận thức",
      },
      enhances: {
        pronunciation: "/ɪnˈhɑːnsɪz/",
        meaning: "nâng cao, cải thiện",
        type: "verb",
        example: "Music enhances the dining experience.",
        vietnamese: "nâng cao",
      },
      articulate: {
        pronunciation: "/ɑːˈtɪkjʊlət/",
        meaning: "diễn đạt rõ ràng",
        type: "adjective",
        example: "She is very articulate when speaking.",
        vietnamese: "diễn đạt rõ ràng",
      },
      sustained: {
        pronunciation: "/səˈsteɪnd/",
        meaning: "duy trì, kéo dài",
        type: "adjective",
        example: "The project requires sustained effort.",
        vietnamese: "duy trì",
      },
    }

    return (
      vocabularyDB[word] || {
        pronunciation: `/${word}/`,
        meaning: "Không tìm thấy nghĩa",
        type: "unknown",
        example: "No example available.",
        vietnamese: "Chưa có dữ liệu",
      }
    )
  }

  const renderTextWithClickableWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={vocabularyMode ? "cursor-pointer hover:bg-blue-100 px-1 rounded" : ""}
        onClick={(e) => handleWordClick(e, word)}
      >
        {word}{" "}
      </span>
    ))
  }

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/reading">
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </Link>

            <div className="flex items-center space-x-2">
              <Button
                variant={highlightMode ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setHighlightMode(!highlightMode)
                  if (vocabularyMode) setVocabularyMode(false)
                }}
                className="bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200"
              >
                🖍️ Chế độ Highlight
              </Button>

              <Button
                variant={vocabularyMode ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setVocabularyMode(!vocabularyMode)
                  if (highlightMode) setHighlightMode(false)
                }}
                className="bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200"
              >
                📚 Chế độ tra từ vựng
              </Button>
            </div>

            <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
              Tra từ vựng ở tab này ban nhé! 🔥
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full font-mono">⏱️ {formatTime(timer)}</div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
              Cài đặt
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Reading Passage */}
        <div className="flex-1 p-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{exercise.title}</h2>
              </div>

              <div
                ref={textRef}
                className="prose max-w-none text-slate-800 leading-relaxed"
                onMouseUp={handleTextSelection}
              >
                {exercise.passage.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {vocabularyMode ? renderTextWithClickableWords(paragraph) : paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions Panel */}
        <div className="w-96 bg-white border-l border-slate-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Questions 1-5</h3>

            {exercise.questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    {question.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 mb-3">{question.question}</p>

                    {question.type === "multiple-choice" && (
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-slate-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === "true-false" && (
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-slate-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <Button className="bg-teal-600 hover:bg-teal-700">Hoàn thành</Button>
          </div>
        </div>
      </div>

      {/* Vocabulary Popup */}
      {vocabularyPopup.visible && (
        <div
          className="fixed z-50 bg-white border border-slate-300 rounded-lg shadow-lg p-4 w-80"
          style={{
            left: vocabularyPopup.position.x - 160,
            top: vocabularyPopup.position.y - 10,
            transform: "translateY(-100%)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-blue-600" />
              <span className="font-bold text-lg">{vocabularyPopup.word}</span>
              <span className="text-sm text-slate-500">{getVocabularyData(vocabularyPopup.word).pronunciation}</span>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                {getVocabularyData(vocabularyPopup.word).type}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={closeVocabularyPopup}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-900">{getVocabularyData(vocabularyPopup.word).vietnamese}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded">
              <p className="text-sm font-medium mb-1">Từ/Cấu trúc tiền quan:</p>
              <p className="text-sm text-slate-700">{getVocabularyData(vocabularyPopup.word).meaning}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded">
              <p className="text-sm font-medium mb-1">Ví dụ:</p>
              <p className="text-sm text-slate-700 italic">{getVocabularyData(vocabularyPopup.word).example}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                </Button>
                <Button size="sm" variant="outline">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <BookmarkPlus className="h-4 w-4 mr-1" />
                  Lưu từ vựng
                </Button>
                <Button size="sm" variant="outline">
                  📋 Sao chép
                </Button>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-right mt-2">Explained by 🧠 AI</div>
        </div>
      )}
    </div>
  )
}
