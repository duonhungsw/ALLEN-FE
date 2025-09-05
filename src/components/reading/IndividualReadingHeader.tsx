import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Settings } from "lucide-react"

interface IndividualReadingHeaderProps {
  highlightMode: boolean
  setHighlightMode: (value: boolean) => void
  vocabularyMode: boolean
  setVocabularyMode: (value: boolean) => void
  timer: number
  formatTime: (seconds: number) => string
}

export default function IndividualReadingHeader({
  highlightMode,
  setHighlightMode,
  vocabularyMode,
  setVocabularyMode,
  timer,
  formatTime,
}: IndividualReadingHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/reading">
            <Button variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </Link>

          <div className="flex items-center space-x-2">
            <Button
              variant={highlightMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setHighlightMode(!highlightMode)
                if (vocabularyMode) setVocabularyMode(false)
              }}
              className="bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200"
            >
              🖍️ Chế độ Highlight
            </Button>

            <Button
              variant={vocabularyMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setVocabularyMode(!vocabularyMode)
                if (highlightMode) setHighlightMode(false)
              }}
              className="bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200"
            >
              📚 Chế độ tra từ vựng
            </Button>
          </div>

          <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
            Tra từ vựng ở tab này ban nhé! 🔥
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full font-mono">⏱️ {formatTime(timer)}</div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
            Cài đặt
          </Button>
        </div>
      </div>
    </div>
  )
}
