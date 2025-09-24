import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDeletePost } from "@/hooks/community/useCommunity"
import { Privacy } from "@/types/emunType"
import { MoreHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface PostHeaderProps {
  postId: string
  userName: string
  userAvatar: string
  createdAt: string
  // points: number | string
  privacy?: Privacy
  level: string
}

export function PostHeader({ postId, userName, userAvatar, createdAt, privacy, level: userLevel }: PostHeaderProps) {
  const tPostCard = useTranslations("PostCard")
  const [menuOpen, setMenuOpen] = useState(false)
  const { mutate: deletePost} = useDeletePost()

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
  const handleDelete = () => {
    deletePost(postId);
  }
  return (
    <div className="flex items-center space-x-3 relative">
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
      <Button variant="ghost" size="sm" className="text-gray-300 ml-auto" onClick={() => setMenuOpen((v) => !v)}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {menuOpen && (
        <div className="absolute right-0 top-8 z-50 w-40 rounded-md border border-white/10 bg-[#0f1619] shadow-lg">
          <button
            className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10"
            // onClick={handleUpdate}
          >
            Cập nhật bài viết
          </button>
          <button
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/10"
            onClick={handleDelete}
          >
            Xóa bài viết
          </button>
        </div>
      )}
    </div>
  )
}
