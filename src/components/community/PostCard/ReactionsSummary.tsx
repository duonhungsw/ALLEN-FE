import { Button } from "@/components/ui/button"
import { useGetReactionByUser } from "@/hooks/community/useCommunity"

interface Reaction {
  type: string
  emoji: string
  count: number
}

interface ReactionsSummaryProps {
  topReactions: Reaction[]
  totalReactions: number
  onShowModal: () => void
}

export function ReactionsSummary({ topReactions, totalReactions, onShowModal }: ReactionsSummaryProps) {
  
  // const {data: yourReaction} = useGetReactionByUser(
  //   {
  //     postId: postId,
  //     userId: userId
  //   }
  // )

  if (topReactions.length === 0) return null
  return (
    <Button variant="ghost" size="sm" className="p-1 h-auto text-gray-300 hover:bg-white/10" onClick={onShowModal}>
      <div className="flex items-center space-x-1">
        {topReactions.map((reaction) => (
          <span key={reaction.type} className="text-lg">{reaction.emoji}</span>
        ))}
        <span className="text-sm text-gray-400 ml-1">{totalReactions}</span>
      </div>
    </Button>
  )
}
