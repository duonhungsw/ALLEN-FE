import { Button } from "@/components/ui/button"
import { MessageCircle, Share } from "lucide-react"
import { useTranslations } from "next-intl"

interface ReactionBtn {
  type: string
  icon: any
  color: string
}

interface ActionButtonsProps {
  reactions: ReactionBtn[]
  userReaction: string | null
  onReaction: (type: string) => void
  onShowComments: () => void
  onShare: () => void
}

export function ActionButtons({ reactions, userReaction, onReaction, onShowComments, onShare }: ActionButtonsProps) {
  const tPostCard = useTranslations("PostCard")
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center space-x-1">
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
      </div>
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
