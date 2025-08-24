"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Reply, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface CommentSectionProps {
  postId: string
  onCommentAdded: () => void
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "c1",
    author: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      username: "alicej",
    },
    content: "Great post! Really inspiring to see your progress.",
    createdAt: "2024-01-15T09:15:00Z",
    likes: 3,
    isLiked: false,
  },
  {
    id: "c2",
    author: {
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      username: "bobsmith",
    },
    content: "Thanks for sharing this. I needed to hear this today!",
    createdAt: "2024-01-15T08:30:00Z",
    likes: 1,
    isLiked: true,
  },
]

export function CommentSection({ postId, onCommentAdded }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/posts/${postId}/comments`)
        // const data = await response.json()

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setComments(mockComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [postId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/posts/${postId}/comments`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content: newComment })
      // })

      // Simulate API call and add new comment
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newCommentObj: Comment = {
        id: `c${Date.now()}`,
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=32&width=32",
          username: "you",
        },
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      }

      setComments((prev) => [newCommentObj, ...prev])
      setNewComment("")
      onCommentAdded()
    } catch (error) {
      console.error("Error posting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeComment = async (commentId: string) => {
    try {
      // TODO: Call API to like/unlike comment
      // await fetch(`/api/comments/${commentId}/like`, { method: 'POST' })

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment,
        ),
      )
    } catch (error) {
      console.error("Error liking comment:", error)
    }
  }

  return (
    <div className="border-t bg-gray-50">
      {/* Comment Input */}
      <div className="p-4">
        <form onSubmit={handleSubmitComment}>
          <div className="flex space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[60px] resize-none text-sm"
              />
              <div className="flex justify-end mt-2">
                <Button type="submit" size="sm" disabled={!newComment.trim() || isSubmitting}>
                  {isSubmitting ? "Posting..." : "Comment"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="px-4 pb-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-300 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onLike={() => handleLikeComment(comment.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface CommentItemProps {
  comment: Comment
  onLike: () => void
}

function CommentItem({ comment, onLike }: CommentItemProps) {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })

  return (
    <div className="flex space-x-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-sm">{comment.author.name}</span>
            <span className="text-gray-500 text-xs">@{comment.author.username}</span>
            <span className="text-gray-500 text-xs">•</span>
            <span className="text-gray-500 text-xs">{timeAgo}</span>
          </div>
          <p className="text-sm text-gray-900">{comment.content}</p>
        </div>

        <div className="flex items-center space-x-4 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={`flex items-center space-x-1 text-xs h-6 px-2 ${
              comment.isLiked ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Heart className={`w-3 h-3 ${comment.isLiked ? "fill-current" : ""}`} />
            {comment.likes > 0 && <span>{comment.likes}</span>}
          </Button>

          <Button variant="ghost" size="sm" className="text-xs text-gray-500 h-6 px-2">
            <Reply className="w-3 h-3 mr-1" />
            Reply
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-500 h-6 px-1">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
