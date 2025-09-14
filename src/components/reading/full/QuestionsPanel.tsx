import React from "react"
import { Button } from "@/components/ui/button"
import { Exercise } from "@/providers/auth/types/readingType"
import { useTranslations } from "next-intl"

interface QuestionsPanelProps {
  exercise: Exercise
  answers: Record<string, string>
  setAnswers: (a: Record<string, string>) => void
  showExplanation: number | null
  setShowExplanation: (n: number | null) => void
  completeExercise: () => void
}

function QuestionsPanel({   exercise,
  answers,
  setAnswers,
  showExplanation,
  setShowExplanation,
  completeExercise, }: QuestionsPanelProps) {
  const tQuestions = useTranslations("reading.full.QuestionsPanel")
  return (
  <div className="w-96 p-6 overflow-y-auto" style={{ backgroundColor: '#1a2a2f', borderLeft: '1px solid #93D333' }}>
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-4">{tQuestions("title")}</h3>
        <p className="text-sm text-gray-300 mb-2">{tQuestions("desc1")}</p>
        <p className="text-sm text-gray-300 mb-2">{tQuestions("desc2")}</p>
        <p className="text-sm text-gray-300 mb-4">{tQuestions("desc3")}</p>
        <div className="space-y-4">
          {exercise.questions[0].options.map((question: string, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#93D333' }}>
                  {index + 1}
                </div>
                <select
                  className="border rounded px-2 py-1 text-sm bg-gray-700 border-gray-600 text-white"
                  value={answers[index + 1] || ""}
                  onChange={(e) => setAnswers({ ...answers, [index + 1]: e.target.value })}
                >
                  <option value="">---</option>
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={i} value={String.fromCharCode(65 + i)}>
                      {String.fromCharCode(65 + i)}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-200 flex-1">{question}</span>
              </div>
              <div className="ml-9">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs text-gray-300 border-gray-500 hover:bg-gray-700"
                  onClick={() => setShowExplanation(showExplanation === index + 1 ? null : index + 1)}
                >
                  📖 {tQuestions("explain")}
                </Button>
                {showExplanation === index + 1 && (
                  <div className="mt-2 p-3 rounded-lg border" style={{ backgroundColor: '#2a3a3f', borderColor: '#93D333' }}>
                    <p className="text-sm text-gray-200">{exercise.questions[0].explanations[index]}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-8 text-right">
      <Button className="text-white" style={{ backgroundColor: '#93D333' }} onClick={completeExercise}>
        {tQuestions("complete")}
      </Button>
    </div>
  </div>
)
}
export default QuestionsPanel
