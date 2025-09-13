import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"

interface Reaction {
  type: string
  emoji: string
  count: number
}

interface ReactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topReactions: Reaction[]
}

export function ReactionModal({ open, onOpenChange, topReactions }: ReactionModalProps) {
  const tPostCard = useTranslations("PostCard")
  if (!open) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-0" style={{ backgroundColor: '#1a2a2f' }}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">{tPostCard("reactionModalTitle")}</h3>
          {topReactions.map((reaction) => (
            <div key={reaction.type} className="flex items-center justify-between p-2 rounded border" style={{ borderColor: '#93D333' }}>
              <div className="flex items-center space-x-2 text-gray-300">
                <span className="text-xl">{reaction.emoji}</span>
                <span className="capitalize">{reaction.type}</span>
              </div>
              <Badge className="border-[#93D333]" variant="outline">{reaction.count}</Badge>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
