import { Button } from "@/components/ui/button"
import { MessageCircle, Share } from "lucide-react"
import { useTranslations } from "next-intl"
import { ReactionPicker } from "./Reaction"
import { Dispatch, useState, SetStateAction } from "react"
import { ApiPost } from "@/types/postType"

interface ActionButtonsProps {
  reactions: any
  setPost: Dispatch<SetStateAction<ApiPost>>
  userReaction: string | null
  setUserReaction: Dispatch<SetStateAction<string | null>>
  onReaction: (type: string) => void
  onShowComments: () => void
  onShare: () => void
}

export function ActionButtons({ setPost, userReaction, setUserReaction, onReaction, onShowComments, onShare }: ActionButtonsProps) {
  const tPostCard = useTranslations("PostCard")
  
  const handleReaction = (type: string) => {
    const wasReacted = userReaction === type
    const newReaction = wasReacted ? null : type

    setPost((prev) => ({
      ...prev,
      reactions: {
        ...prev.reactions,
        [type]: wasReacted
          ? prev.reactions[type as keyof typeof prev.reactions] - 1
          : prev.reactions[type as keyof typeof prev.reactions] + 1,
        ...(userReaction && userReaction !== type
          ? {
              [userReaction]: prev.reactions[userReaction as keyof typeof prev.reactions] - 1,
            }
          : {}),
      },
    }))

    setUserReaction(newReaction)
  }
  return (
    <div className="flex items-center justify-between pt-3">
      {/* <div className="flex items-center space-x-1">
        {reactions.map((reaction) => {
          const Icon = reaction.icon
          return (
            <Button
              key={reaction.type}
              variant="ghost"
              size="sm"
              onClick={() => onReaction(reaction.type)}
              className={`${userReaction === reaction.type ? reaction.color : "text-gray-300"} hover:bg-white/10`}
            >
              <Icon className="h-4 w-4 mr-1" />
              {tPostCard(`reactions.${reaction.type}`)}
            </Button>
          )
        })}
      </div> */}
      <ReactionPicker onReactionSelect={handleReaction} currentReaction={userReaction}/>
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
