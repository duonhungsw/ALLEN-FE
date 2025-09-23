"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { reactions } from "@/types/postType"
import { ReactionType } from "@/types/emunType"
import { useGetReactionByUser } from "@/hooks/community/useCommunity"

interface ReactionPickerProps {
  onReactionSelect: (type: ReactionType, commentId?: string) => void
  postId: string
  userId: string
  className?: string
  onReactionUpdate?: () => void
}

export function ReactionPicker({ postId, userId, onReactionSelect, className, onReactionUpdate }: ReactionPickerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const {data: currentReactionData, mutate: getCurrentReaction} = useGetReactionByUser()

  useEffect(() => {
    if (currentReactionData?.reactionType) {
      setUserReaction(currentReactionData.reactionType);
    } else {
      setUserReaction(null);
    }
    if (onReactionUpdate) {
      onReactionUpdate();
    }
  }, [currentReactionData, onReactionUpdate]);

  useEffect(() => {
    if (postId && userId) {
      getCurrentReaction({ postId, userId })
    }
  }, [postId, userId, getCurrentReaction])
  
  // Debug log
  useEffect(() => {
    console.log('currentReactionData:', currentReactionData)
  }, [currentReactionData])

  const handleMouseEnter = () => {
    setIsVisible(true)
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    // Delay hiding to allow moving to picker
    setTimeout(() => {
      if (!isHovering) {
        setIsVisible(false)
      }
    }, 300)
  }

const handleReactionClick = (type: ReactionType) => {
  if (userReaction === type) {
    setUserReaction(null);
    onReactionSelect(type); // delete
  } else {
    setUserReaction(type);
    onReactionSelect(type); // create/update
  }
  setIsVisible(false);
  if (onReactionUpdate) {
    console.log('Gọi lại getReaction do user click reaction');
    onReactionUpdate();
  }
};

const currentReactionObj = reactions.find((r) => r.type === userReaction);
  return (
    <div className={cn("relative", className)}>
      {/* Main Like Button */}
      <Button
        variant="ghost"
        size="sm"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // onClick={() => onReactionSelect(currentReaction ? "" : "like")}
        className={cn(
          "transition-all duration-200",
          currentReactionObj ? currentReactionObj.color : "text-slate-500 hover:text-blue-600"
        )}>
          {currentReactionObj ? (
            <>
              <span className="text-lg mr-1">{currentReactionObj.emoji}</span>
              {currentReactionObj.label}
            </>
          ) : (
            <>
              <span className="text-lg mr-1">👍</span>
              Thích
            </>
          )}
        </Button>
      {/* Reaction Picker */}
      {isVisible && (
        <div
          className="absolute bottom-full left-0 mb-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 px-2 py-1 flex items-center space-x-1 z-50 animate-in slide-in-from-bottom-2 duration-200"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
        >
          {reactions.map((reaction) => (
            <Button
              key={reaction.type}
              variant="ghost"
              size="sm"
              className="h-12 w-12 p-0 hover:scale-125 transition-transform duration-200 rounded-full"
              onClick={() => handleReactionClick(reaction.type as ReactionType)}
            >
              <span className="text-2xl">{reaction.emoji}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
