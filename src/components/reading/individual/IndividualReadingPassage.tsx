import { Card, CardContent } from "@/components/ui/card"

interface IndividualReadingPassageProps {
  title: string
  passage: string
  vocabularyMode: boolean
  textRef: React.RefObject<HTMLDivElement | null>
  handleTextSelection: () => void
  renderTextWithClickableWords: (text: string) => React.ReactNode
}

export default function IndividualReadingPassage({
  title,
  passage,
  vocabularyMode,
  textRef,
  handleTextSelection,
  renderTextWithClickableWords,
}: IndividualReadingPassageProps) {
  return (
    <div className="flex-1 p-6">
      <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          </div>

          <div
            ref={textRef}
            className="prose max-w-none text-gray-200 leading-relaxed"
            onMouseUp={handleTextSelection}
          >
            {passage.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {vocabularyMode ? renderTextWithClickableWords(paragraph) : paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
