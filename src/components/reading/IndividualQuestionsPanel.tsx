import { Button } from "@/components/ui/button"
import { Question } from "@/providers/auth/types/readingType"

interface IndividualQuestionsPanelProps {
  questions: Question[]
  answers: Record<string, string>
  handleAnswerChange: (questionId: string, value: string) => void
  onComplete?: () => void
}

export default function IndividualQuestionsPanel({
  questions,
  answers,
  handleAnswerChange,
  onComplete,
}: IndividualQuestionsPanelProps) {
  return (
    <div className="w-96 bg-white border-l border-slate-200 p-6 overflow-y-auto">
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Questions 1-{questions.length}</h3>

        {questions.map((question) => {
          const qid: string = String(question.id)
          return (
            <div key={question.id} className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  {question.id}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 mb-3">{question.question}</p>

                  {question.type === "multiple-choice" && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${qid}`}
                            value={option}
                            checked={answers[qid] === option}
                            onChange={(e) => handleAnswerChange(qid, e.target.value)}
                            className="text-blue-600"
                          />
                          <span className="text-sm text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${qid}`}
                            value={option}
                            checked={answers[qid] === option}
                            onChange={(e) => handleAnswerChange(qid, e.target.value)}
                            className="text-blue-600"
                          />
                          <span className="text-sm text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 text-right">
        <Button 
          className="bg-teal-600 hover:bg-teal-700"
          onClick={onComplete}
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  )
}
