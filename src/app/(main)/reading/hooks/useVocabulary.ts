import { useState } from "react"
import type React from "react"
import { VocabularyData } from "@/providers/auth/types/readingType"

export function useVocabulary() {
  const [vocabularyPopup, setVocabularyPopup] = useState({
    word: "",
    position: { x: 0, y: 0 },
    visible: false,
  })

  const getVocabularyData = (word: string): VocabularyData => {
    // Mock vocabulary data
    const vocabularyDB: Record<string, VocabularyData> = {
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

  const handleWordClick = (event: React.MouseEvent, word: string) => {
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

  return {
    vocabularyPopup,
    getVocabularyData,
    handleWordClick,
    closeVocabularyPopup,
  }
}
