"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { CommentSection } from "./CommentSection"
import Image from "next/image"

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  image?: string
  createdAt: string
  likes: number
  comments: number
  isLiked: boolean
}

interface PostCardProps {
  post: Post
  // onLike: () => void
}

// export function PostCard({ post, onLike }: PostCardProps) {
export function PostCard({ post }: PostCardProps) {
  const router = useRouter()
  const [showComments, setShowComments] = useState(false)
  const [commentCount, setCommentCount] = useState(post.comments)

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  const handlePostClick = () => {
    router.push(`/post/${post.id}`)
  }

  const handleCommentAdded = () => {
    setCommentCount((prev) => prev + 1)
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center space-x-3" onClick={handlePostClick}>
            <Avatar>
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{post.author.name}</h3>
              <p className="text-gray-500 text-xs">
                @{post.author.username} • {timeAgo}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3" onClick={handlePostClick}>
          <p className="text-gray-900 leading-relaxed line-clamp-3">{post.content}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="px-4 pb-3" onClick={handlePostClick}>
            <Image
              src={post.image || "/placeholder.svg"}
              alt="Post content"
              className="w-full rounded-lg object-cover max-h-96"
            />
          </div>
        )}

        {/* Post Actions */}
        <div className="px-4 py-3 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  // onLike()
                }}
                className={`flex items-center space-x-2 hover:bg-red-50 ${post.isLiked ? "text-red-500" : "text-gray-500"}`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                <span className="text-sm">{post.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowComments(!showComments)
                }}
                className="flex items-center space-x-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{commentCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-500 hover:bg-green-50 hover:text-green-600"
              >
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && <CommentSection postId={post.id} onCommentAdded={handleCommentAdded} />}
      </CardContent>
    </Card>
  )
}
