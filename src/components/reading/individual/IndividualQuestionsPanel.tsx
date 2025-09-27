import { Button } from "@/components/ui/button"
import { Question } from "@/providers/auth/types/readingType"
import { useTranslations } from "next-intl"

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
  const tIndividualQuestionsPanel = useTranslations("Reading.individual.IndividualQuestionsPanel")
  return (
    <div className="w-96 p-6 overflow-y-auto" style={{ backgroundColor: '#1a2a2f', borderLeft: '1px solid #93D333' }}>
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white">{tIndividualQuestionsPanel("questions.range")}-{questions.length}</h3>

        {questions.map((question) => {
          const qid: string = String(question.id)
          return (
            <div key={question.id} className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1" style={{ backgroundColor: '#93D333' }}>
                  {question.id}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-3">{question.question}</p>

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
                            className="text-[#93D333]"
                          />
                          <span className="text-sm text-gray-200">{option}</span>
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
                            className="text-[#93D333]"
                          />
                          <span className="text-sm text-gray-200">{option}</span>
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
          className="text-white"
          style={{ backgroundColor: '#93D333' }}
          onClick={onComplete}
        >
          {tIndividualQuestionsPanel("questions.complete")}
        </Button>
      </div>
    </div>
  )
}
