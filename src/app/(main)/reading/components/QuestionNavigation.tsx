import React from "react"
import { Button } from "@/components/ui/button"

interface QuestionNavigationProps {
  currentQuestion: number
  setCurrentQuestion: (q: number) => void
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({ currentQuestion, setCurrentQuestion }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg border-2 border-green-300">
        {Array.from({ length: 13 }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentQuestion === i + 1 ? "default" : "outline"}
            size="sm"
            className={`w-8 h-8 p-0 ${currentQuestion === i + 1 ? "bg-red-500 hover:bg-red-600 text-white" : "hover:bg-green-200"}`}
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
