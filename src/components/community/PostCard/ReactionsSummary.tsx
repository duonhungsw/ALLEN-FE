import { Button } from "@/components/ui/button"
import { ApiPost } from "@/types/postType"



interface ReactionsSummaryProps {
  post: ApiPost
  topReactions: any
  totalReactions: number
  onShowModal: () => void
}

export function ReactionsSummary({ post, topReactions, totalReactions, onShowModal }: ReactionsSummaryProps) {
  
  return (
    <Button variant="ghost" size="sm" className="p-1 h-auto text-gray-300 hover:bg-white/10" onClick={onShowModal}>
      <div className="flex items-center space-x-1">
        <span className="text-sm text-gray-400 ml-1">{topReactions.data.length}</span>
        {topReactions?.topReactions?.length > 0 &&
          topReactions.topReactions.map((reaction) => (
            <span key={reaction.type} className="text-lg">{reaction.emoji}</span>
          ))
        }
      </div>
    </Button>
  )
}
