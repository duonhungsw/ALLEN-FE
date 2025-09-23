import { Button } from "@/components/ui/button"
import { MessageCircle, Share } from "lucide-react"
import { useTranslations } from "next-intl"
import { ReactionPicker } from "./Reaction"
import { Dispatch, SetStateAction } from "react"
import { usePostReaction } from "@/hooks/community/useCommunity"
import { ReactionType } from "@/types/emunType"
import { UseMutateFunction } from "@tanstack/react-query"
import { ApiPost } from "@/types/postType"

interface ActionButtonsProps {
  post: ApiPost
  userId: string
  setUserReaction: Dispatch<SetStateAction<string | null>>
  onReaction: (type: string) => void
  onShowComments: () => void
  onShare: () => void
  getReaction: UseMutateFunction<string, Error, string, unknown>
}

export function ActionButtons({ post, userId, setUserReaction, onShowComments, onShare, getReaction}: ActionButtonsProps) {
  const tPostCard = useTranslations("PostCard")
  const {mutate: postReaction} = usePostReaction()
  
  const handleReaction = (type: ReactionType | string) => {
    const normalized = (type || "Like") as ReactionType
    postReaction({
      objectId: post.id,
      reactionType: normalized
    }, {
      onSuccess: () => {
        getReaction(post.id)
        setUserReaction(type)
      }
    })
  }
  return (
    <div className="flex items-center justify-between pt-3">
      <ReactionPicker 
        postId={post.id}
        userId={userId}
        onReactionSelect={handleReaction} 
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
