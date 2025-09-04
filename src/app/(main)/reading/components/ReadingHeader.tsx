import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings, X } from "lucide-react"

interface ReadingHeaderProps {
  highlightMode: boolean
  setHighlightMode: (v: boolean) => void
  vocabularyMode: boolean
  setVocabularyMode: (v: boolean) => void
  timer: number
  formatTime: (seconds: number) => string
  setShowSettings: (v: boolean) => void
}

const ReadingHeader: React.FC<ReadingHeaderProps> = ({
  highlightMode,
  setHighlightMode,
  vocabularyMode,
  setVocabularyMode,
  timer,
  formatTime,
  setShowSettings,
}) => (
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
        <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
          <Settings className="h-4 w-4" />
          Cài đặt
        </Button>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowSettings(true)}>
          📤 Chia sẻ bài làm
        </Button>
      </div>
    </div>
  </div>
)

export default ReadingHeader
