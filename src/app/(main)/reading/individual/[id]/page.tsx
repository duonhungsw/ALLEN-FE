"use client"

import { useState, useRef, use } from "react"
import IndividualReadingHeader from "../../components/IndividualReadingHeader"
import IndividualReadingPassage from "../../components/IndividualReadingPassage"
import IndividualQuestionsPanel from "../../components/IndividualQuestionsPanel"
import IndividualVocabularyPopup from "../../components/IndividualVocabularyPopup"
import { useTimer } from "../../hooks/useTimer"
import { useVocabulary } from "../../hooks/useVocabulary"
import { useHighlight } from "../../hooks/useHighlight"
import { individualExercise } from "../../constants/individualMockData"

export default function IndividualReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const [highlightMode, setHighlightMode] = useState(true)
  const [vocabularyMode, setVocabularyMode] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const textRef = useRef<HTMLDivElement>(null)

  // Custom hooks
  const { timer, formatTime, stopTimer, getFinalTime } = useTimer()
  const { vocabularyPopup, getVocabularyData, closeVocabularyPopup, handleWordClick } = useVocabulary()
  const { handleTextSelection } = useHighlight()

  // Use mock data from constants
  const { id } = use(params)
  const exercise = { ...individualExercise, id }

  // Event handlers
  const handleTextSelectionWrapper = () => {
    handleTextSelection(highlightMode)
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const completeExercise = () => {
    stopTimer()
    // Here you can add logic to show results or navigate to results page
    console.log("Exercise completed in:", getFinalTime(), "seconds")
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <IndividualReadingHeader
        highlightMode={highlightMode}
        setHighlightMode={setHighlightMode}
        vocabularyMode={vocabularyMode}
        setVocabularyMode={setVocabularyMode}
        timer={timer}
        formatTime={formatTime}
      />

      <div className="flex">
        {/* Reading Passage */}
        <IndividualReadingPassage
          title={exercise.title}
          passage={exercise.passage}
          vocabularyMode={vocabularyMode}
          textRef={textRef}
          handleTextSelection={handleTextSelectionWrapper}
          renderTextWithClickableWords={renderTextWithClickableWords}
        />

        {/* Questions Panel */}
        <IndividualQuestionsPanel
          questions={exercise.questions}
          answers={answers}
          handleAnswerChange={handleAnswerChange}
          onComplete={completeExercise}
        />
      </div>

      {/* Vocabulary Popup */}
      <IndividualVocabularyPopup
        word={vocabularyPopup.word}
        position={vocabularyPopup.position}
        visible={vocabularyPopup.visible}
        vocabularyData={getVocabularyData(vocabularyPopup.word)}
        onClose={closeVocabularyPopup}
      />
    </div>
  )
}
