import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Privacy } from "@/types/emunType"
import { MoreHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"

interface PostHeaderProps {
  userName: string
  userAvatar: string
  createdAt: string
  // points: number | string
  privacy?: Privacy
  level: string
}

export function PostHeader({ userName, userAvatar, createdAt, privacy, level: userLevel }: PostHeaderProps) {
  const tPostCard = useTranslations("PostCard")
  const getLevelColor = (level: string) => {
    switch (level) {
      case "A1":
      case "A2":
        return "bg-green-500"
      case "B1":
      case "B2":
        return "bg-blue-500"
      case "C1":
      case "C2":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }
  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={userAvatar || "/placeholder.svg"} />
        <AvatarFallback>{userName[0] || "U"}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-white">{userName || "User"}</h3>
          <Badge className={getLevelColor(userLevel)}>{userLevel}</Badge>
          <Badge variant="outline" className="border-[#93D333] text-gray-300">
            {privacy || "privacy"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{createdAt}</span>
          <span>•</span>
          <span>
            {/* {points} */}
            {tPostCard("points")}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-gray-300 hover:bg-white/10 ml-auto">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}
