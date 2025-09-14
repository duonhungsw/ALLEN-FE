import React from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle } from "lucide-react"

interface FloatingButtonsProps {
  setShowVocabularyList: (v: boolean) => void
  setShowAIChat: (v: boolean) => void
}

function FloatingButtons({ setShowVocabularyList, setShowAIChat}: FloatingButtonsProps) {
  return (
  <div className="fixed bottom-6 right-6 space-y-3">
    <Button
      className="w-14 h-14 rounded-full text-white shadow-lg"
      style={{ backgroundColor: '#93D333' }}
      onClick={() => setShowVocabularyList(true)}
    >
      <BookOpen className="h-6 w-6" />
    </Button>
    <Button
      className="w-14 h-14 rounded-full text-white shadow-lg"
      style={{ backgroundColor: '#93D333' }}
      onClick={() => setShowAIChat(true)}
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  </div>
)
}
export default FloatingButtons
