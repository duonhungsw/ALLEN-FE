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

const VocabularyPopupModal: React.FC<VocabularyPopupModalProps> = ({
  vocabularyPopup,
  getVocabularyData,
  setVocabularyPopup,
  handleVocabularyLike,
  handleVocabularyDislike,
}) => {
  if (!vocabularyPopup.visible) return null
  return (
    <div
      className="fixed z-50 bg-white border border-slate-300 rounded-lg shadow-lg p-4 w-80"
      style={{
        left: vocabularyPopup.position.x - 160,
        top: vocabularyPopup.position.y - 10,
        transform: "translateY(-100%)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-blue-600" />
          <span className="font-bold text-lg">{vocabularyPopup.word}</span>
          <span className="text-sm text-slate-500">{getVocabularyData(vocabularyPopup.word).pronunciation}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setVocabularyPopup((prev: any) => ({ ...prev, visible: false }))}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        <div>
          <p className="font-medium text-slate-900">{getVocabularyData(vocabularyPopup.word).vietnamese}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded">
          <p className="text-sm font-medium mb-1">Ví dụ:</p>
          <p className="text-sm text-slate-700 italic">{getVocabularyData(vocabularyPopup.word).example}</p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={() => handleVocabularyLike(vocabularyPopup.word, true)}>
              <ThumbsUp className="h-4 w-4 mr-1" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleVocabularyDislike}>
              <ThumbsDown className="h-4 w-4 mr-1" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
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
