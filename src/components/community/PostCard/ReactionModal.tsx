import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"
import { useEffect, useState, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dataReaction, reactions, ReactionSummary } from "@/types/postType";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ReactionType } from "@/types/emunType";
import { useGetReaction } from "@/hooks/community/useCommunity";

interface ReactionModalProps {
  objectId: string
  open: boolean
  onOpenChange: () => void
}

export function ReactionModal({ objectId, open, onOpenChange }: ReactionModalProps) {
  const tPostCard = useTranslations("PostCard")
  const [showOpenReaction, setShowOpenReaction] = useState<string>("")
  const {data: reactionList = [], mutate: getReaction } = useGetReaction()
  const [data, setData] = useState<dataReaction[]>(reactionList || [])

  useEffect(() => {
    if (objectId) {
      getReaction(objectId)
    }
  }, [objectId, getReaction])
  
  const calcReactions = useCallback(() => {
    if (!reactionList) return { summary: [], top3: [] }
  
    const summary: Record<string, ReactionSummary & { items: dataReaction[] }> = {}
    const order: string[] = []
  
    reactionList.forEach((item: dataReaction) => {
      const type = item.reactionType as ReactionType
      const base = reactions.find(r => r.type === type)
      if (!base) return
  
      if (!summary[type]) {
        summary[type] = { ...base, count: 1, items: [item] }
        order.push(type) // lưu thứ tự xuất hiện đầu tiên
      } else {
        summary[type].count += 1
        summary[type].items.push(item)
      }
    })
  
    const allTypes = order.map(type => summary[type])
  
    const topReactions = [...allTypes]
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
  
    return {
      summary: allTypes,
      topReactions,
      data: reactionList
    }
  }, [reactionList])

  useEffect(() => {
    console.log(calcReactions().topReactions);
  }, [open])

  useEffect(() => {
    if (open) {
      setShowOpenReaction("All")
      setData(calcReactions().data || [])
    }
  }, [open, calcReactions])

  const handleOpen = (type: string, index: number) => {
    setShowOpenReaction(type)
    if (type === "All") {
      setData(calcReactions()?.data || [])
    } else {
      const items = calcReactions()?.summary?.[index]?.items || []
      setData(items)
    }
  }
  
  if (!open) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-0" style={{ backgroundColor: '#1a2a2f' }}>
        <DialogTitle asChild>
          <h3 className="text-lg font-semibold text-white">{tPostCard("reactionModalTitle")}</h3>
        </DialogTitle>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
          onClick={onOpenChange}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="space-y-4">
          <div className="flex gap-3">
            {calcReactions().summary.length !== 1 && (
              <span onClick={() => handleOpen("All", 0)} className={showOpenReaction === "All" ? "font-bold" : ""}>All</span>
            )}
            {calcReactions().summary.map((item: ReactionSummary & { items: dataReaction[] }, index: number) => (
              <span key={index} className={`text-lg mr-1 ${showOpenReaction === item.type ? "font-bold" : ""}`} onClick={() => handleOpen(item.type, index)}>{item.emoji}</span>
            ))}
          </div>
          {/* list reaction */}
          <div className="flex flex-col gap-3 mt-4">
            {data.length > 0 &&
              data.map((item: dataReaction) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-[#1a1a1a] transition"
                >
                  {/* Avatar + Emoji */}
                  <div className="relative w-10 h-10">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.userPicture} />
                      <AvatarFallback className="bg-[#93D333] text-black font-semibold">
                        {item.userName?.[0] || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-1 -right-1 text-lg">
                      {reactions.find((r) => r.type === item.reactionType)?.emoji ||
                        item.reactionType}
                    </span>
                  </div>

                  {/* User name */}
                  <h5 className="font-medium text-sm text-white truncate">
                    {item.userName}
                  </h5>
                </div>
              ))}

            {data.length === 0 && (
              <div className="text-gray-400 text-sm text-center py-2">
                Không có người dùng nào cho emoji này.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}