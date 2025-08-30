"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp, Laugh, Send, X } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  replies?: Comment[]
  reactions: {
    like: number
    love: number
    wow: number
  }
}

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    level: string
    points: number
  }
  content: string
  images?: string[]
  timestamp: string
  likes: number
  comments: number
  shares: number
  category: string
  privacy: string
  reactions: {
    like: number
    love: number
    wow: number
  }
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post: initialPost }: PostCardProps) {
  const [post, setPost] = useState(initialPost)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [userReaction, setUserReaction] = useState<string | null>(null)
  const [showReactionModal, setShowReactionModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const tPostCard = useTranslations("PostCard")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: { name: "Thu Hà", avatar: "/placeholder.svg?height=32&width=32" },
      content: "Chúc mừng bạn! Mình cũng đang học khóa này, rất hữu ích 👏",
      timestamp: "1 giờ trước",
      likes: 3,
      reactions: { like: 2, love: 1, wow: 0 },
      replies: [
        {
          id: 11,
          author: { name: "Minh Anh", avatar: "/placeholder.svg?height=32&width=32" },
          content: "Cảm ơn bạn! Chúc bạn học tốt nhé 😊",
          timestamp: "30 phút trước",
          likes: 1,
          reactions: { like: 1, love: 0, wow: 0 },
        },
      ],
    },
  ])
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const reactions = [
    { type: "like", icon: ThumbsUp, color: "text-blue-600", emoji: "👍" },
    { type: "love", icon: Heart, color: "text-red-600", emoji: "❤️" },
    { type: "wow", icon: Laugh, color: "text-yellow-600", emoji: "😮" },
  ]

  const handleReaction = (type: string) => {
    const wasReacted = userReaction === type
    const newReaction = wasReacted ? null : type

    setPost((prev) => ({
      ...prev,
      reactions: {
        ...prev.reactions,
        [type]: wasReacted
          ? prev.reactions[type as keyof typeof prev.reactions] - 1
          : prev.reactions[type as keyof typeof prev.reactions] + 1,
        ...(userReaction && userReaction !== type
          ? {
              [userReaction]: prev.reactions[userReaction as keyof typeof prev.reactions] - 1,
            }
          : {}),
      },
    }))

    setUserReaction(newReaction)
  }

  const handleComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      author: { name: tPostCard("you"), avatar: "/placeholder.svg?height=32&width=32" },
      content: newComment,
      timestamp: tPostCard("justNow"),
      likes: 0,
      reactions: { like: 0, love: 0, wow: 0 },
    }

    setComments([...comments, comment])
    setPost((prev) => ({ ...prev, comments: prev.comments + 1 }))
    setNewComment("")
  }

  const handleReply = (commentId: number) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: Date.now(),
      author: { name: tPostCard("you"), avatar: "/placeholder.svg?height=32&width=32" },
      content: replyContent,
      timestamp: tPostCard("justNow"),
      likes: 0,
      reactions: { like: 0, love: 0, wow: 0 },
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...(comment.replies || []), reply] } : comment,
      ),
    )

    setReplyingTo(null)
    setReplyContent("")
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-blue-500"
      case "Advanced":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

const getTopReactions = () => {
  const reactionEntries = Object.entries(post.reactions)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return reactionEntries.map(([type, count]) => {
    const reaction = reactions.find((r) => r.type === type)
    return { type, count, emoji: reaction?.emoji || "👍" }
  })
}
  const totalReactions = Object.values(post.reactions).reduce((sum, count) => sum + count, 0)

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <Badge className={getLevelColor(post.author.level)}>{post.author.level}</Badge>
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <span>{post.timestamp}</span>
                  <span>•</span>
                  <span>{post.author.points} {tPostCard("points")}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Post Images */}
          {post.images && post.images.length > 0 && (
            <div className="mb-4">
              {post.images.length === 1 ? (
                <Image
                  src={post.images[0] || "/placeholder.svg"}
                  alt="Post image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full rounded-lg max-h-96 object-cover cursor-pointer"
                  onClick={() => setSelectedImage(post.images![0])}
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {post.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Post image ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-48 object-cover rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reactions Summary */}
          <div className="flex items-center justify-between py-3 border-t border-b border-slate-100">
            <div className="flex items-center space-x-2">
              {getTopReactions().length > 0 && (
                <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => setShowReactionModal(true)}>
                  <div className="flex items-center space-x-1">
                    {getTopReactions().map((reaction) => (
                      <span key={reaction.type} className="text-lg">
                        {reaction.emoji}
                      </span>
                    ))}
                    <span className="text-sm text-slate-600 ml-1">{totalReactions}</span>
                  </div>
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span>{post.comments} {tPostCard("comments")}</span>
              <span>{post.shares} {tPostCard("shares")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center space-x-1">
              {reactions.map((reaction) => {
                const Icon = reaction.icon
                return (
                  <Button
                    key={reaction.type}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReaction(reaction.type)}
                    className={`${userReaction === reaction.type ? reaction.color : "text-slate-500"} hover:bg-slate-100`}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {tPostCard(`reactions.${reaction.type}`)}
                  </Button>
                )
              })}
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="text-slate-500 hover:bg-slate-100"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {tPostCard("actions.comment")}
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:bg-slate-100">
                <Share className="h-4 w-4 mr-1" />
                {tPostCard("actions.share")}
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder={tPostCard("commentPlaceholder")}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && handleComment()}
                  />
                  <Button size="sm" onClick={handleComment} disabled={!newComment.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-slate-100 rounded-lg p-3">
                          <h5 className="font-semibold text-sm">{comment.author.name}</h5>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                          <span>{comment.timestamp}</span>
                          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                            {tPostCard("likeAction")} ({comment.likes})
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs"
                            onClick={() => setReplyingTo(comment.id)}
                          >
                            {tPostCard("replyAction")}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-11 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-slate-100 rounded-lg p-2">
                                <h5 className="font-semibold text-xs">{reply.author.name}</h5>
                                <p className="text-xs">{reply.content}</p>
                              </div>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                                <span>{reply.timestamp}</span>
                                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                                  {tPostCard("likeAction")} ({reply.likes})
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    {replyingTo === comment.id && (
                      <div className="ml-11 flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" />
                          <AvatarFallback>B</AvatarFallback>
                        </Avatar>
                        <Input
                          placeholder={tPostCard("replyPlaceholder")}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="flex-1 h-8 text-sm"
                          onKeyPress={(e) => e.key === "Enter" && handleReply(comment.id)}
                        />
                        <Button size="sm" onClick={() => handleReply(comment.id)} disabled={!replyContent.trim()}>
                          <Send className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <div className="relative">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Full size"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Image Comments */}
            <div className="p-4 max-h-60 overflow-y-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Input placeholder={tPostCard("imageCommentPlaceholder")} className="flex-1" />
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Reaction Modal */}
      {showReactionModal && (
        <Dialog open={showReactionModal} onOpenChange={setShowReactionModal}>
          <DialogContent className="max-w-md">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{tPostCard("reactionModalTitle")}</h3>
              {getTopReactions().map((reaction) => (
                <div key={reaction.type} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{reaction.emoji}</span>
                    <span className="capitalize">{reaction.type}</span>
                  </div>
                  <Badge>{reaction.count}</Badge>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
