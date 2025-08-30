"use client"

import type React from "react"

import { useState, useRef, useEffect, use } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  X,
  Settings,
  Volume2,
  BookmarkPlus,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  BookOpen,
  Send,
  Eye,
  Type,
  Maximize2,
} from "lucide-react"
import Image from "next/image"

interface VocabularyPopup {
  word: string
  position: { x: number; y: number }
  visible: boolean
}

interface Highlight {
  id: string
  text: string
  note?: string
}

interface VocabularyWord {
  word: string
  meaning: string
  pronunciation: string
  example: string
  saved: boolean
  liked: boolean
}

export default function FullReadingPage({ params }) {
  const { id } = use(params);
  const [highlightMode, setHighlightMode] = useState(true)
  const [vocabularyMode, setVocabularyMode] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [vocabularyPopup, setVocabularyPopup] = useState<VocabularyPopup>({
    word: "",
    position: { x: 0, y: 0 },
    visible: false,
  })
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [showVocabularyList, setShowVocabularyList] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showDislikeModal, setShowDislikeModal] = useState(false)
  const [showExplanation, setShowExplanation] = useState<number | null>(null)
  const [highlightNote, setHighlightNote] = useState("")
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null)
  const [eyeProtection, setEyeProtection] = useState(false)
  const [fontSize, setFontSize] = useState("M")
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; message: string }>>([])
  const [vocabularyWords, setVocabularyWords] = useState<VocabularyWord[]>([])
  const [dislikeFeedback, setDislikeFeedback] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  // Mock data
  const exercise = {
    id,
    title: "Twin Study: Two of a Kind",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-co0gVHIA3VSBeADn29dwPrLvY7Xz9M.png",
    passage: `A. The scientific study of twins goes back to the late 19th century, when Francis Galton, an early geneticist, realized that they came in two varieties: identical twins born from one egg and non-identical twins that had come from two. That insight turned out to be key, although it was not until 1924 that it was used to formulate what is known as the twin rule of pathology, and twin studies really got going.

B. The twin rule of pathology states that any heritable disease will be more concordant (that is, more likely to be jointly present or absent) in identical twins than in non-identical twins-and, in turn, will be more concordant in non-identical twins than in non-siblings. Early work, for example, showed that the statistical correlation of skin-mole counts between identical twins was 0.4, while non-identical twins had a correlation of only 0.2.

C. Twin research has shown that whether or not someone takes up smoking is determined mainly by environmental factors, but once he does so, how much he smokes is largely down to his genes. And while a person's religion is clearly a matter of upbringing, how religious he is seems to be at least partly genetic.`,
    questions: [
      {
        id: 1,
        type: "matching",
        question: "Which paragraph contains the following information?",
        options: [
          "Mentioned research conducted in Ohio",
          "Medical contribution to the researches for twins",
          "Research situation under life threatening conditions",
          "Data of similarities of identical twins",
          "Reasons that make one study unconvincing",
        ],
        correctAnswers: ["A", "B", "C", "B", "C"],
        explanations: [
          "Đoạn A đề cập đến nghiên cứu của Francis Galton về cặp song sinh, đây là nghiên cứu y khoa đầu tiên.",
          "Đoạn B nói về quy tắc bệnh lý học của cặp song sinh, đây là đóng góp y khoa quan trọng.",
          "Đoạn C thảo luận về các yếu tố môi trường ảnh hưởng đến hành vi, có thể bao gồm các tình huống đe dọa cuộc sống.",
          "Đoạn B cung cấp dữ liệu cụ thể về mối tương quan giữa các cặp song sinh giống hệt nhau (0.4 vs 0.2).",
          "Đoạn C đưa ra lý do tại sao một số nghiên cứu có thể không thuyết phục do yếu tố môi trường.",
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
      const highlightId = Date.now().toString()

      setHighlights((prev) => [...prev, { id: highlightId, text: selectedText }])
      setSelectedHighlight(highlightId)

      // Add highlight styling
      const range = selection.getRangeAt(0)
      const span = document.createElement("span")
      span.className = "bg-yellow-200 px-1 rounded cursor-pointer"
      span.setAttribute("data-highlight-id", highlightId)
      span.onclick = () => {
        setSelectedHighlight(highlightId)
        setHighlightNote(highlights.find((h) => h.id === highlightId)?.note || "")
      }
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

  const handleVocabularyLike = (word: string, liked: boolean) => {
    const vocabData = getVocabularyData(word)
    const existingWord = vocabularyWords.find((w) => w.word === word)

    if (existingWord) {
      setVocabularyWords((prev) => prev.map((w) => (w.word === word ? { ...w, liked } : w)))
    } else {
      setVocabularyWords((prev) => [
        ...prev,
        {
          word,
          meaning: vocabData.vietnamese,
          pronunciation: vocabData.pronunciation,
          example: vocabData.example,
          saved: false,
          liked,
        },
      ])
    }
  }

  const handleVocabularyDislike = () => {
    setShowDislikeModal(true)
    setVocabularyPopup((prev) => ({ ...prev, visible: false }))
  }

  const submitDislikeFeedback = () => {
    setFeedbackSubmitted(true)
    setTimeout(() => {
      setShowDislikeModal(false)
      setFeedbackSubmitted(false)
      setDislikeFeedback("")
    }, 2000)
  }

  const saveHighlightNote = () => {
    if (selectedHighlight) {
      setHighlights((prev) => prev.map((h) => (h.id === selectedHighlight ? { ...h, note: highlightNote } : h)))
      setSelectedHighlight(null)
      setHighlightNote("")
    }
  }

  const handleChatSubmit = () => {
    if (!chatMessage.trim()) return

    const newMessage = { role: "user", message: chatMessage }
    setChatHistory((prev) => [...prev, newMessage])

    // Simple AI response logic
    let aiResponse = ""
    if (
      chatMessage.toLowerCase().includes("thời tiết") ||
      chatMessage.toLowerCase().includes("weather") ||
      (!chatMessage.toLowerCase().includes("twin") &&
        !chatMessage.toLowerCase().includes("study") &&
        !chatMessage.toLowerCase().includes("bài"))
    ) {
      aiResponse = "Chỉ trả lời những câu hỏi liên quan đến bài làm"
    } else {
      aiResponse = "Tôi có thể giúp bạn hiểu về nghiên cứu cặp song sinh. Bạn có câu hỏi cụ thể nào về bài đọc không?"
    }

    setTimeout(() => {
      setChatHistory((prev) => [...prev, { role: "ai", message: aiResponse }])
    }, 1000)

    setChatMessage("")
  }

  const completeExercise = () => {
    setIsActive(false)
    setShowResults(true)
  }

  const getVocabularyData = (word: string) => {
    const vocabularyDB: Record<string, any> = {
      scientific: {
        pronunciation: "/ˌsaɪənˈtɪfɪk/",
        meaning: "thuộc về khoa học",
        type: "adjective",
        example: "Scientific research requires careful methodology.",
        vietnamese: "khoa học",
      },
      twins: {
        pronunciation: "/twɪnz/",
        meaning: "cặp song sinh",
        type: "noun",
        example: "The twins look exactly alike.",
        vietnamese: "song sinh",
      },
      identical: {
        pronunciation: "/aɪˈdentɪkəl/",
        meaning: "giống hệt nhau",
        type: "adjective",
        example: "The identical twins share the same DNA.",
        vietnamese: "giống hệt",
      },
      correlation: {
        pronunciation: "/ˌkɔːrəˈleɪʃən/",
        meaning: "mối tương quan",
        type: "noun",
        example: "There is a strong correlation between study time and grades.",
        vietnamese: "tương quan",
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

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "S":
        return "text-sm"
      case "M":
        return "text-base"
      case "L":
        return "text-lg"
      default:
        return "text-base"
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Or8uz3So1j0xcuWBWEF5F6o410GYY.png"
                  alt="Completion"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-purple-600 mb-2">
                Hãi khó bạn nhỉ, bình tĩnh cùng luyện tập với YouPass nhé!
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Kết quả làm bài</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#ef4444"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(1 / 13) * 351.86} 351.86`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">0/13</span>
                    <span className="text-sm text-gray-600">câu đúng</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-right">
                  <span className="text-sm text-gray-600">Thời gian làm bài</span>
                  <div className="text-2xl font-bold">00:07:18</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Đúng</span>
                    </div>
                    <span className="font-bold">0 câu</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm">Sai</span>
                    </div>
                    <span className="font-bold">1 câu</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                      <span className="text-sm">Bỏ qua</span>
                    </div>
                    <span className="font-bold">12 câu</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-green-800">
                  Bạn có muốn để xuất bài tập này đến các bạn khác cùng level với bạn không?
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Bảng dữ liệu chi tiết</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Loại câu hỏi</th>
                      <th className="text-center p-2">Số câu hỏi</th>
                      <th className="text-center p-2 bg-green-100">Đúng</th>
                      <th className="text-center p-2 bg-red-100">Sai</th>
                      <th className="text-center p-2 bg-gray-100">Bỏ qua</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">True - False - Not Given</td>
                      <td className="text-center p-2">6</td>
                      <td className="text-center p-2 text-green-600 font-bold">0</td>
                      <td className="text-center p-2 text-red-600 font-bold">0</td>
                      <td className="text-center p-2 text-gray-600 font-bold">6</td>
                    </tr>
                    <tr>
                      <td className="p-2">Gap Filling</td>
                      <td className="text-center p-2">7</td>
                      <td className="text-center p-2 text-green-600 font-bold">0</td>
                      <td className="text-center p-2 text-red-600 font-bold">1</td>
                      <td className="text-center p-2 text-gray-600 font-bold">6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Xem giải thích chi tiết</Button>
              <Link href="/reading" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Quay lại danh sách
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${eyeProtection ? "bg-amber-50" : "bg-slate-50"}`}>
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
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4" />
              Cài đặt
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowSettings(true)}>
              📤 Chia sẻ bài làm
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Reading Passage */}
        <div className="flex-1 p-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={exercise.image || "/placeholder.svg"}
                  alt={exercise.title}
                  className="w-48 h-32 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold text-slate-900 mb-2">[Recent Tests-Bộ VOL] - {exercise.title}</h2>
              </div>

              <div
                ref={textRef}
                className={`prose max-w-none text-slate-800 leading-relaxed ${getFontSizeClass()}`}
                onMouseUp={handleTextSelection}
              >
                {exercise.passage.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    <strong className="mr-2">{String.fromCharCode(65 + index)}.</strong>
                    {vocabularyMode ? renderTextWithClickableWords(paragraph) : paragraph}
                  </p>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg border-2 border-green-300">
                  {Array.from({ length: 13 }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentQuestion === i + 1 ? "default" : "outline"}
                      size="sm"
                      className={`w-8 h-8 p-0 ${
                        currentQuestion === i + 1 ? "bg-red-500 hover:bg-red-600 text-white" : "hover:bg-green-200"
                      }`}
                      onClick={() => setCurrentQuestion(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vocabulary Translation Section */}
          {vocabularyWords.length > 0 && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Từ vựng đã tra</h3>
                <div className="space-y-2">
                  {vocabularyWords.slice(-3).map((word, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <div>
                        <span className="font-medium">{word.word}</span>
                        <span className="text-sm text-slate-600 ml-2">{word.pronunciation}</span>
                      </div>
                      <span className="text-sm">{word.meaning}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Questions Panel */}
        <div className="w-96 bg-white border-l border-slate-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Questions 1-5</h3>
              <p className="text-sm text-slate-600 mb-2">The reading Passage has seven paragraphs A-K.</p>
              <p className="text-sm text-slate-600 mb-2">Which paragraph contains the following information?</p>
              <p className="text-sm text-slate-600 mb-4">
                Write the correct letter <strong>A-K</strong>, in boxes <strong>1-5</strong> on your answer sheet.
              </p>

              <div className="space-y-4">
                {exercise.questions[0].options.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <select
                        className="border border-slate-300 rounded px-2 py-1 text-sm"
                        value={answers[index + 1] || ""}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, [index + 1]: e.target.value }))}
                      >
                        <option value="">---</option>
                        {Array.from({ length: 11 }, (_, i) => (
                          <option key={i} value={String.fromCharCode(65 + i)}>
                            {String.fromCharCode(65 + i)}
                          </option>
                        ))}
                      </select>
                      <span className="text-sm text-slate-700 flex-1">{question}</span>
                    </div>
                    <div className="ml-9">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-gray-100 hover:bg-gray-200"
                        onClick={() => setShowExplanation(showExplanation === index + 1 ? null : index + 1)}
                      >
                        📖 Explain
                      </Button>
                      {showExplanation === index + 1 && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg border">
                          <p className="text-sm text-blue-800">{exercise.questions[0].explanations[index]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-right">
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={completeExercise}>
              Hoàn thành
            </Button>
          </div>
        </div>
      </div>

      {/* Fixed Floating Buttons */}
      <div className="fixed bottom-6 right-6 space-y-3">
        <Button
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          onClick={() => setShowVocabularyList(true)}
        >
          <BookOpen className="h-6 w-6" />
        </Button>
        <Button
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
          onClick={() => setShowAIChat(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
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
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVocabularyPopup((prev) => ({ ...prev, visible: false }))}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-900">{getVocabularyData(vocabularyPopup.word).vietnamese}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded">
              <p className="text-sm font-medium mb-1">Ví dụ:</p>
              <p className="text-sm text-slate-700 italic">{getVocabularyData(vocabularyPopup.word).example}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleVocabularyLike(vocabularyPopup.word, true)}>
                  <ThumbsUp className="h-4 w-4 mr-1" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleVocabularyDislike}>
                  <ThumbsDown className="h-4 w-4 mr-1" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <BookmarkPlus className="h-4 w-4 mr-1" />
                  Lưu từ vựng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Highlight Note Dialog */}
      {selectedHighlight && (
        <Dialog open={!!selectedHighlight} onOpenChange={() => setSelectedHighlight(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm ghi chú cho đoạn highlight</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-100 rounded">
                <p className="text-sm">"{highlights.find((h) => h.id === selectedHighlight)?.text}"</p>
              </div>
              <Textarea
                placeholder="Nhập ghi chú của bạn..."
                value={highlightNote}
                onChange={(e) => setHighlightNote(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedHighlight(null)}>
                  Hủy
                </Button>
                <Button onClick={saveHighlightNote}>Lưu ghi chú</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Vocabulary List Modal */}
      {showVocabularyList && (
        <Dialog open={showVocabularyList} onOpenChange={setShowVocabularyList}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <span className="mr-2">🔥</span>
                Yeah yeah yeah, vào đây để anh Đậu giúp bạn nào
                <Button variant="ghost" size="sm" className="ml-auto">
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Button size="sm" className="bg-green-100 text-green-700">
                  Lưu từ vựng vào
                </Button>
                <Button size="sm" variant="outline">
                  Work
                </Button>
                <Button size="sm" variant="outline">
                  Topic 2
                </Button>
                <Button size="sm" variant="outline">
                  Topic 3
                </Button>
                <Button size="sm" variant="outline">
                  Topic 4
                </Button>
                <Button size="sm" variant="outline">
                  Topic 5
                </Button>
                <Button size="sm" variant="outline">
                  Nhóm 6
                </Button>
                <Button size="sm" variant="outline">
                  Nhóm 9
                </Button>
                <Button size="sm" className="bg-orange-100 text-orange-700">
                  🎓 Anh Giáo Đậu
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">
                        <input type="checkbox" />
                      </th>
                      <th className="text-left p-2">Từ vựng</th>
                      <th className="text-left p-2">Nghĩa</th>
                      <th className="text-left p-2">IPA</th>
                      <th className="text-left p-2">Ví dụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">
                        <input type="checkbox" />
                      </td>
                      <td className="p-2 font-medium">pepper</td>
                      <td className="p-2">hạt tiêu</td>
                      <td className="p-2">/'pepər/</td>
                      <td className="p-2">I like to add black pepper to my pasta for extra flavor.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">
                        <input type="checkbox" />
                      </td>
                      <td className="p-2 font-medium">genus</td>
                      <td className="p-2">giống (trong phân loại sinh học)</td>
                      <td className="p-2">/'dʒi:nəs/</td>
                      <td className="p-2">The genus of the pepper plant is called Piper.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">
                        <input type="checkbox" />
                      </td>
                      <td className="p-2 font-medium">botanical</td>
                      <td className="p-2">thuộc về thực vật</td>
                      <td className="p-2">/bə'tænɪkəl/</td>
                      <td className="p-2">The botanical garden has a wide variety of plants.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* AI Chat Modal */}
      {showAIChat && (
        <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
          <DialogContent className="max-w-md max-h-[80vh] p-0">
            <div className="bg-green-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">🧠</div>
                  <span className="font-semibold">Anh Giáo Đậu</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-green-700">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-green-700"
                    onClick={() => setShowAIChat(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-3 max-h-96 overflow-y-auto">
              {chatHistory.length === 0 ? (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start bg-transparent"
                    onClick={() => setChatMessage("Hướng dẫn làm câu 4 😊")}
                  >
                    Hướng dẫn làm câu 4 😊
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start bg-transparent"
                    onClick={() => setChatMessage("Hướng dẫn làm câu 5 😊")}
                  >
                    Hướng dẫn làm câu 5 😊
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start bg-transparent"
                    onClick={() => setChatMessage("Tóm tắt bài đọc hiện tại 🤔")}
                  >
                    Tóm tắt bài đọc hiện tại 🤔
                  </Button>
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t bg-gray-600 rounded-b-lg">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Bạn có thắc mắc gì về bài đọc không 🤔"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                  className="flex-1 bg-white"
                />
                <Button size="sm" onClick={handleChatSubmit}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Cài đặt
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Chế độ bảo vệ mắt</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEyeProtection(!eyeProtection)}
                  className={eyeProtection ? "bg-amber-100" : ""}
                >
                  {eyeProtection ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4" />
                  <span>Kích cỡ chữ</span>
                </div>
                <div className="flex space-x-1">
                  {["S", "M", "L"].map((size) => (
                    <Button
                      key={size}
                      variant={fontSize === size ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setFontSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dislike Feedback Modal */}
      {showDislikeModal && (
        <Dialog open={showDislikeModal} onOpenChange={setShowDislikeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Góp ý cải thiện</DialogTitle>
            </DialogHeader>

            {!feedbackSubmitted ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Hãy cho chúng tôi biết vấn đề với bản dịch này để cải thiện chất lượng:
                </p>
                <Textarea
                  placeholder="Nhập góp ý của bạn..."
                  value={dislikeFeedback}
                  onChange={(e) => setDislikeFeedback(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowDislikeModal(false)}>
                    Hủy
                  </Button>
                  <Button onClick={submitDislikeFeedback}>Gửi góp ý</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-green-600 text-4xl mb-4">✓</div>
                <p className="text-lg font-semibold">Cảm ơn đã góp ý!</p>
                <p className="text-sm text-gray-600">Chúng tôi sẽ cải thiện chất lượng dịch thuật.</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
