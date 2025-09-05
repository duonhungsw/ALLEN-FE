import { Button } from "@/components/ui/button"
import { X, Volume2, BookmarkPlus, ThumbsUp, ThumbsDown } from "lucide-react"
import { VocabularyData } from "@/providers/auth/types/readingType"

interface IndividualVocabularyPopupProps {
  word: string
  position: { x: number; y: number }
  visible: boolean
  vocabularyData: VocabularyData
  onClose: () => void
}

export default function IndividualVocabularyPopup({
  word,
  position,
  visible,
  vocabularyData,
  onClose,
}: IndividualVocabularyPopupProps) {
  if (!visible) return null

  return (
    <div
      className="fixed z-50 bg-white border border-slate-300 rounded-lg shadow-lg p-4 w-80"
      style={{
        left: position.x - 160,
        top: position.y - 10,
        transform: "translateY(-100%)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-blue-600" />
          <span className="font-bold text-lg">{word}</span>
          <span className="text-sm text-slate-500">{vocabularyData.pronunciation}</span>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded">
            {vocabularyData.type}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="font-medium text-slate-900">{vocabularyData.vietnamese}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded">
          <p className="text-sm font-medium mb-1">Từ/Cấu trúc tiền quan:</p>
          <p className="text-sm text-slate-700">{vocabularyData.meaning}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded">
          <p className="text-sm font-medium mb-1">Ví dụ:</p>
          <p className="text-sm text-slate-700 italic">{vocabularyData.example}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <ThumbsUp className="h-4 w-4 mr-1" />
            </Button>
            <Button size="sm" variant="outline">
              <ThumbsDown className="h-4 w-4 mr-1" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <BookmarkPlus className="h-4 w-4 mr-1" />
              Lưu từ vựng
            </Button>
            <Button size="sm" variant="outline">
              📋 Sao chép
            </Button>
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-400 text-right mt-2">Explained by 🧠 AI</div>
    </div>
  )
}
