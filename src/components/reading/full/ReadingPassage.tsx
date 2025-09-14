import React, { RefObject } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Exercise } from "@/providers/auth/types/readingType"
import { useTranslations } from "next-intl"

interface ReadingPassageProps {
  exercise: Exercise
  vocabularyMode: boolean
  renderTextWithClickableWords: (text: string) => React.ReactNode
  getFontSizeClass: () => string
  textRef: RefObject<HTMLDivElement | null>
  handleTextSelection: () => void
}

function ReadingPassage({ 
  exercise,
  vocabularyMode,
  renderTextWithClickableWords,
  getFontSizeClass,
  textRef,
  handleTextSelection,
 }: ReadingPassageProps) {
  const tReadingPassage = useTranslations("Reading.full.ReadingPassage")
  return (
  <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
    <CardContent className="p-6">
      <div className="mb-4">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={exercise.image || "/placeholder.svg"}
          alt={exercise.title}
          className="w-48 h-32 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold text-white mb-2">{tReadingPassage("recentTest")} - {exercise.title}</h2>
      </div>
      <div
        ref={textRef}
        className={`prose max-w-none text-gray-200 leading-relaxed ${getFontSizeClass()}`}
        onMouseUp={handleTextSelection}
      >
        {exercise.passage.split("\n\n").map((paragraph: string, index: number) => (
          <p key={index} className="mb-4">
            <strong className="mr-2 text-white">{String.fromCharCode(65 + index)}.</strong>
            {vocabularyMode ? renderTextWithClickableWords(paragraph) : paragraph}
          </p>
        ))}
      </div>
    </CardContent>
  </Card>
)
}
export default ReadingPassage
