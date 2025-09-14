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

function ReadingHeader({ 
  highlightMode,
  setHighlightMode,
  vocabularyMode,
  setVocabularyMode,
  timer,
  formatTime,
  setShowSettings, 
}: ReadingHeaderProps) {
  return (
  <div className="px-6 py-4" style={{ backgroundColor: '#1a2a2f', borderBottom: '1px solid #93D333' }}>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/reading">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
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
            className={highlightMode ? "text-white" : "text-gray-300 border-gray-500 hover:bg-gray-700"}
            style={{ backgroundColor: highlightMode ? '#93D333' : 'transparent' }}
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
            className={vocabularyMode ? "text-white" : "text-gray-300 border-gray-500 hover:bg-gray-700"}
            style={{ backgroundColor: vocabularyMode ? '#93D333' : 'transparent' }}
          >
            📚 Chế độ tra từ vựng
          </Button>
        </div>
        <div className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: '#2a3a3f' }}>
          Tra từ vựng ở tab này ban nhé! 🔥
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-white px-3 py-1 rounded-full font-mono" style={{ backgroundColor: '#93D333' }}>⏱️ {formatTime(timer)}</div>
        <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)} className="text-white hover:bg-gray-700">
          <Settings className="h-4 w-4" />
          Cài đặt
        </Button>
        <Button className="text-white" style={{ backgroundColor: '#93D333' }} onClick={() => setShowSettings(true)}>
          📤 Chia sẻ bài làm
        </Button>
      </div>
    </div>
  </div>
)
}
export default ReadingHeader
