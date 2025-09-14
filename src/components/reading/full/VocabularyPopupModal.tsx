import React from "react"
import { Button } from "@/components/ui/button"
import { X, Volume2, ThumbsUp, ThumbsDown, BookmarkPlus } from "lucide-react"

interface VocabularyPopupModalProps {
  vocabularyPopup: any
  getVocabularyData: (word: string) => any
  setVocabularyPopup: (cb: (prev: any) => any) => void
  handleVocabularyLike: (word: string, liked: boolean) => void
  handleVocabularyDislike: () => void
}

function VocabularyPopupModal({ 
  vocabularyPopup,
  getVocabularyData,
  setVocabularyPopup,
  handleVocabularyLike,
  handleVocabularyDislike,
}: VocabularyPopupModalProps) {
if (!vocabularyPopup.visible) return null
  return (
    <div
      className="fixed z-50 rounded-lg shadow-lg p-4 w-80"
      style={{
        left: vocabularyPopup.position.x - 160,
        top: vocabularyPopup.position.y - 10,
        transform: "translateY(-100%)",
        backgroundColor: '#1a2a2f',
        border: '1px solid #93D333'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4" style={{ color: '#93D333' }} />
          <span className="font-bold text-lg text-white">{vocabularyPopup.word}</span>
          <span className="text-sm text-gray-400">{getVocabularyData(vocabularyPopup.word).pronunciation}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setVocabularyPopup((prev: any) => ({ ...prev, visible: false }))}
          className="text-white hover:bg-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        <div>
          <p className="font-medium text-white">{getVocabularyData(vocabularyPopup.word).vietnamese}</p>
        </div>
        <div className="p-3 rounded" style={{ backgroundColor: '#2a3a3f' }}>
          <p className="text-sm font-medium mb-1 text-gray-300">Ví dụ:</p>
          <p className="text-sm text-gray-200 italic">{getVocabularyData(vocabularyPopup.word).example}</p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#93D333' }}>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={() => handleVocabularyLike(vocabularyPopup.word, true)} className="text-gray-300 border-gray-500 hover:bg-gray-700">
              <ThumbsUp className="h-4 w-4 mr-1" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleVocabularyDislike} className="text-gray-300 border-gray-500 hover:bg-gray-700">
              <ThumbsDown className="h-4 w-4 mr-1" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="text-white" style={{ backgroundColor: '#93D333' }}>
              <BookmarkPlus className="h-4 w-4 mr-1" />
              Lưu từ vựng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocabularyPopupModal
