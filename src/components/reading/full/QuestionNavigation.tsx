import React from "react"
import { Button } from "@/components/ui/button"

interface QuestionNavigationProps {
  currentQuestion: number
  setCurrentQuestion: (q: number) => void
}

function QuestionNavigation({ currentQuestion, setCurrentQuestion }: QuestionNavigationProps) {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center space-x-2 p-2 rounded-lg" style={{ backgroundColor: '#2a3a3f', border: '2px solid #93D333' }}>
        {Array.from({ length: 13 }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentQuestion === i + 1 ? "default" : "outline"}
            size="sm"
            className={`w-8 h-8 p-0 ${currentQuestion === i + 1 ? "text-white" : "text-gray-300 border-gray-500 hover:bg-gray-700"}`}
            style={{ backgroundColor: currentQuestion === i + 1 ? '#93D333' : 'transparent' }}
            onClick={() => setCurrentQuestion(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default QuestionNavigation
