"use client"

import type React from "react"

import { useState, useRef, useEffect, use } from "react"
import { VocabularyPopup, Highlight, VocabularyWord, VocabularyData } from "@/providers/auth/types/readingType"
import ShowResult from "@/components/reading/ShowResult"
import QuestionNavigation from "@/components/reading/QuestionNavigation"
import ReadingHeader from "@/components/reading/ReadingHeader"
import ReadingPassage from "@/components/reading/ReadingPassage"
import VocabularyTranslationSection from "@/components/reading/VocabularyTranslationSection"
import QuestionsPanel from "@/components/reading/QuestionsPanel"
import FloatingButtons from "@/components/reading/FloatingButtons"
import VocabularyPopupModal from "@/components/reading/VocabularyPopupModal"
import HighlightNoteDialog from "@/components/reading/HighlightNoteDialog"
import VocabularyListModal from "@/components/reading/VocabularyListModal"
import AIChatModal from "@/components/reading/AIChatModal"
import SettingsModal from "@/components/reading/SettingsModal"
import DislikeFeedbackModal from "@/components/reading/DislikeFeedbackModal"
import { exercise } from "@/shared/constants/reading/mockData"

export default function FullReadingPage({ params }: { params: Promise<{ id: string }> }) {
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
  const [answers, setAnswers] = useState<Record<string, string>>({})
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
          type: vocabData.type,
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

  const getVocabularyData = (word: string): VocabularyData => {
    const vocabularyDB: Record<string, VocabularyData> = {
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
      <ShowResult setShowResults={setShowResults} timeSpent={timer}/>
    )
  }

  return (
    <div className={`min-h-screen ${eyeProtection ? "bg-amber-50" : "bg-slate-50"}`}>
      {/* Header */}
      <ReadingHeader
        highlightMode={highlightMode}
        setHighlightMode={setHighlightMode}
        vocabularyMode={vocabularyMode}
        setVocabularyMode={setVocabularyMode}
        timer={timer}
        formatTime={formatTime}
        setShowSettings={setShowSettings}
      />

      <div className="flex">
        {/* Reading Passage + Navigation */}
        <div className="flex-1 p-6">
          <ReadingPassage
            exercise={exercise}
            vocabularyMode={vocabularyMode}
            renderTextWithClickableWords={renderTextWithClickableWords}
            getFontSizeClass={getFontSizeClass}
            textRef={textRef}
            handleTextSelection={handleTextSelection}
          />
          {/* Navigation */}
          <QuestionNavigation currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
          {/* Vocabulary Translation Section */}
          <VocabularyTranslationSection vocabularyWords={vocabularyWords} />
        </div>

        {/* Questions Panel */}
        <QuestionsPanel
          exercise={exercise}
          answers={answers}
          setAnswers={setAnswers}
          showExplanation={showExplanation}
          setShowExplanation={setShowExplanation}
          completeExercise={completeExercise}
        />
      </div>

      {/* Fixed Floating Buttons */}
      <FloatingButtons setShowVocabularyList={setShowVocabularyList} setShowAIChat={setShowAIChat} />

      {/* Vocabulary Popup */}
      <VocabularyPopupModal
        vocabularyPopup={vocabularyPopup}
        getVocabularyData={getVocabularyData}
        setVocabularyPopup={setVocabularyPopup}
        handleVocabularyLike={handleVocabularyLike}
        handleVocabularyDislike={handleVocabularyDislike}
      />

      {/* Highlight Note Dialog */}
      <HighlightNoteDialog
        open={!!selectedHighlight}
        selectedHighlight={selectedHighlight}
        highlights={highlights}
        highlightNote={highlightNote}
        setHighlightNote={setHighlightNote}
        setSelectedHighlight={setSelectedHighlight}
        saveHighlightNote={saveHighlightNote}
      />

      {/* Vocabulary List Modal */}
      <VocabularyListModal open={showVocabularyList} setShowVocabularyList={setShowVocabularyList} />

      {/* AI Chat Modal */}
      <AIChatModal
        open={showAIChat}
        setShowAIChat={setShowAIChat}
        chatHistory={chatHistory}
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        handleChatSubmit={handleChatSubmit}
      />

      {/* Settings Modal */}
      <SettingsModal
        open={showSettings}
        setShowSettings={setShowSettings}
        eyeProtection={eyeProtection}
        setEyeProtection={setEyeProtection}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Dislike Feedback Modal */}
      <DislikeFeedbackModal
        open={showDislikeModal}
        setShowDislikeModal={setShowDislikeModal}
        feedbackSubmitted={feedbackSubmitted}
        dislikeFeedback={dislikeFeedback}
        setDislikeFeedback={setDislikeFeedback}
        submitDislikeFeedback={submitDislikeFeedback}
      />
    </div>
  )
}
