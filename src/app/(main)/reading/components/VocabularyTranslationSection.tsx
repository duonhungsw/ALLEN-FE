import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface VocabularyWord {
  word: string
  pronunciation: string
  meaning: string
}

interface VocabularyTranslationSectionProps {
  vocabularyWords: VocabularyWord[]
}

const VocabularyTranslationSection: React.FC<VocabularyTranslationSectionProps> = ({ vocabularyWords }) => {
  if (vocabularyWords.length === 0) return null
  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">Từ vựng đã tra</h3>
        <div className="space-y-2">
          {vocabularyWords.slice(-3).map((word, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
              <div>
                <span className="font-medium">{word.word}</span>
                <span className="text-sm text-slate-600 ml-2">{word.pronunciation}</span>
              </div>
              <span className="text-sm">{word.meaning}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default VocabularyTranslationSection
