import { Button } from "@/components/ui/button"
import { MessageCircle, Share } from "lucide-react"
import { useTranslations } from "next-intl"
import { ReactionPicker } from "./Reaction"
import { Dispatch, SetStateAction } from "react"
import { ApiPost } from "@/types/postType"
import { useGetPostById, usePostReaction } from "@/hooks/community/useCommunity"
import { ReactionType } from "@/types/emunType"

interface ActionButtonsProps {
  postId: string
  setPost: Dispatch<SetStateAction<ApiPost>>
  userReaction: string | null
  setUserReaction: Dispatch<SetStateAction<string | null>>
  onReaction: (type: string) => void
  onShowComments: () => void
  onShare: () => void
}

export function ActionButtons({postId, setPost, userReaction, setUserReaction, onReaction, onShowComments, onShare}: ActionButtonsProps) {
  const tPostCard = useTranslations("PostCard")
  const {mutate: postReaction} = usePostReaction()
  const {mutate: getPostById} = useGetPostById()
  const handleReaction = (type: ReactionType | string) => {
    const normalized = (type || "Like") as ReactionType
    postReaction({
      objectId: postId,
      reactionType: normalized
    }, {
      onSuccess: () => {
        // getPostById(postId)
        setUserReaction(type)
      }
    })
  }
  return (
    <div className="flex items-center justify-between pt-3">
      <ReactionPicker 
      onReactionSelect={handleReaction} 
      currentReaction={userReaction}
      />
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onShowComments}
          className="text-gray-300 hover:bg-white/10"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          {tPostCard("actions.comment")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="text-gray-300 hover:bg-white/10"
        >
          <Share className="h-4 w-4 mr-1" />
          {tPostCard("actions.share")}
        </Button>
      </div>
    </div>
  )
}
