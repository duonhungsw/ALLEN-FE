import React from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle } from "lucide-react"

interface FloatingButtonsProps {
  setShowVocabularyList: (v: boolean) => void
  setShowAIChat: (v: boolean) => void
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ setShowVocabularyList, setShowAIChat }) => (
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
)

export default FloatingButtons
