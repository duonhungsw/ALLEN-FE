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

function VocabularyTranslationSection({ vocabularyWords }: VocabularyTranslationSectionProps) {
  if (vocabularyWords.length === 0) return null
  return (
    <Card className="mt-4" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 text-white">Từ vựng đã tra</h3>
        <div className="space-y-2">
          {vocabularyWords.slice(-3).map((word, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: '#2a3a3f' }}>
              <div>
                <span className="font-medium text-white">{word.word}</span>
                <span className="text-sm text-gray-400 ml-2">{word.pronunciation}</span>
              </div>
              <span className="text-sm text-gray-200">{word.meaning}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default VocabularyTranslationSection
