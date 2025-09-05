import React from "react"
import { Button } from "@/components/ui/button"
import { Exercise } from "@/providers/auth/types/readingType"

interface QuestionsPanelProps {
  exercise: Exercise
  answers: Record<string, string>
  setAnswers: (a: Record<string, string>) => void
  showExplanation: number | null
  setShowExplanation: (n: number | null) => void
  completeExercise: () => void
}

const QuestionsPanel: React.FC<QuestionsPanelProps> = ({
  exercise,
  answers,
  setAnswers,
  showExplanation,
  setShowExplanation,
  completeExercise,
}) => (
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
          {exercise.questions[0].options.map((question: string, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <select
                  className="border border-slate-300 rounded px-2 py-1 text-sm"
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
)

export default QuestionsPanel
