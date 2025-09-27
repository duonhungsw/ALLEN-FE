import { Button } from "@/components/ui/button"
import { X, Volume2, BookmarkPlus, ThumbsUp, ThumbsDown } from "lucide-react"
import { VocabularyData } from "@/providers/auth/types/readingType"
import { useTranslations } from "next-intl"

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
  const tIndividualVocabularyPopup = useTranslations("Reading.individual.IndividualVocabularyPopup")
  if (!visible) return null
  return (
    <div
      className="fixed z-50 rounded-lg shadow-lg p-4 w-80"
      style={{
        left: position.x - 160,
        top: position.y - 10,
        transform: "translateY(-100%)",
        backgroundColor: '#1a2a2f',
        border: '1px solid #93D333'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4" style={{ color: '#93D333' }} />
          <span className="font-bold text-lg text-white">{word}</span>
          <span className="text-sm text-gray-400">{vocabularyData.pronunciation}</span>
          <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#2a3a3f', color: '#93D333' }}>
            {vocabularyData.type}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-700">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="font-medium text-white">{vocabularyData.vietnamese}</p>
        </div>

        <div className="p-3 rounded" style={{ backgroundColor: '#2a3a3f' }}>
          <p className="text-sm font-medium mb-1 text-gray-300">{tIndividualVocabularyPopup("structure")}</p>
          <p className="text-sm text-gray-200">{vocabularyData.meaning}</p>
        </div>

        <div className="p-3 rounded" style={{ backgroundColor: '#2a3a3f' }}>
          <p className="text-sm font-medium mb-1 text-gray-300">{tIndividualVocabularyPopup("example")}:</p>
          <p className="text-sm text-gray-200 italic">{vocabularyData.example}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#93D333' }}>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">
              <ThumbsUp className="h-4 w-4 mr-1" />
            </Button>
            <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">
              <ThumbsDown className="h-4 w-4 mr-1" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="text-white" style={{ backgroundColor: '#93D333' }}>
              <BookmarkPlus className="h-4 w-4 mr-1" />
              {tIndividualVocabularyPopup("save")}
            </Button>
            <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">
              {tIndividualVocabularyPopup("copy")}
            </Button>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 text-right mt-2">{tIndividualVocabularyPopup("explainedByAI")}</div>
    </div>
  )
}
