import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dataReaction, reactions } from "@/types/postType";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ReactionModalProps {
  open: boolean
  onOpenChange: () => void
  topReactions: any
}

export function ReactionModal({ open, onOpenChange, topReactions }: ReactionModalProps) {
  const tPostCard = useTranslations("PostCard")
  const [showOpenReaction, setShowOpenReaction] = useState<string>("")
  const [data, setData] = useState<dataReaction[]>(topReactions?.data || [])
  console.log(topReactions);

  useEffect(() => {
    if (open && topReactions) {
      setShowOpenReaction("All")
      setData(topReactions?.data || [])
    }
  }, [open, topReactions])

  const handleOpen = (type: string, index: number) => {
    setShowOpenReaction(type)
    if (type === "All") {
      // Gộp tất cả items của mọi summary
      setData(topReactions?.data || [])
    } else {
      const items = topReactions?.summary?.[index]?.items || []
      setData(items)
    }
  }
  // Use imported 'reactions' mapping from postType
  
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
            {topReactions.summary.length !== 1 && (
              <span onClick={() => handleOpen("All", 0)} className={showOpenReaction === "All" ? "font-bold" : ""}>All</span>
            )}
            {topReactions.summary.map((item: any, index: number) => (
              <span key={index} className={`text-lg mr-1 ${showOpenReaction === item.type ? "font-bold" : ""}`} onClick={() => handleOpen(item.type, index)}>{item.emoji}</span>
            ))}
          </div>
          {/* list reaction */}
          <div className="flex gap-2 flex-col mt-4">
            {data.length > 0 && data.map((item: dataReaction) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-[32px]">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={"/placeholder.svg"} />
                    <AvatarFallback className="bg-[#93D333] text-black font-semibold">
                      {item.userName?.[0] || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-[-8px] right-[-8px]">{reactions.find(r => r.type === item.reactionType)?.emoji || item.reactionType}</span>
                </div>
                <h5 className="font-semibold text-sm text-white truncate">{item.userName}</h5>
              </div>
            ))}
            {data.length === 0 && <div className="text-gray-400 text-sm">Không có người dùng nào cho emoji này.</div>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}