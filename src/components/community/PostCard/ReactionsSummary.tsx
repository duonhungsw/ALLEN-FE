import { Button } from "@/components/ui/button"
import { useGetReaction } from "@/hooks/community/useCommunity"
import { ReactionType } from "@/types/emunType"
import { dataReaction, Reaction, reactions, ReactionSummary } from "@/types/postType"
import { useCallback, useEffect } from "react"

interface ReactionsSummaryProps {
  objectId: string
  onShowModal: () => void
}

export function ReactionsSummary({ objectId, onShowModal }: ReactionsSummaryProps) {
  const {data: reactionList = [], mutate: getReaction } = useGetReaction()
  
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
      summary: allTypes || [],
      topReactions,
      data: reactionList || []
    }
  }, [reactionList])

  return (
    <Button variant="ghost" size="sm" className="p-1 h-auto text-gray-300 hover:bg-white/10" onClick={onShowModal}>
      <div className="flex items-center space-x-1">
        <span className="text-sm text-gray-400 ml-1">{calcReactions().data.length}</span>
        {calcReactions()?.topReactions?.length > 0 &&
          calcReactions().topReactions.map((reaction: Reaction) => (
            <span key={reaction.type} className="text-lg">{reaction.emoji}</span>
          ))
        }
      </div>
    </Button>
  )
}
