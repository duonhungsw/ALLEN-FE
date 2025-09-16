"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Reaction } from "@/types/postType"

const reactions: Reaction[] = [
  { type: "like", emoji: "👍", label: "Thích", color: "text-blue-600" },
  { type: "love", emoji: "❤️", label: "Yêu thích", color: "text-red-600" },
  { type: "haha", emoji: "😂", label: "Haha", color: "text-yellow-600" },
  { type: "wow", emoji: "😮", label: "Wow", color: "text-orange-600" },
  { type: "sad", emoji: "😢", label: "Buồn", color: "text-yellow-700" },
  { type: "angry", emoji: "😡", label: "Phẫn nộ", color: "text-red-700" },
]

interface ReactionPickerProps {
  onReactionSelect: (type: string) => void
  currentReaction?: string | null
  className?: string
}

export function ReactionPicker({ onReactionSelect, currentReaction, className }: ReactionPickerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

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

  const handleReactionClick = (type: string) => {
    onReactionSelect(type)
    setIsVisible(false)
  }

  const currentReactionData = reactions.find((r) => r.type === currentReaction)

  return (
    <div className={cn("relative", className)}>
      {/* Main Like Button */}
      <Button
        variant="ghost"
        size="sm"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onReactionSelect(currentReaction ? "" : "like")}
        className={cn(
          "transition-all duration-200",
          currentReaction ? currentReactionData?.color || "text-blue-600" : "text-slate-500 hover:text-blue-600",
        )}
      >
        {currentReaction ? (
          <>
            <span className="text-lg mr-1">{currentReactionData?.emoji}</span>
            {currentReactionData?.label}
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
              onClick={() => handleReactionClick(reaction.type)}
            >
              <span className="text-2xl">{reaction.emoji}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
