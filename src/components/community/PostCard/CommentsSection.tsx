import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { Comment } from "@/types/posType"
import React from "react"

interface CommentsSectionProps {
  postId: string
  comments: Comment[]
  commentsReply: Comment[]
  isLoading: boolean
  error: any
  isLoadingReply: boolean
  errorReply: any
  showComments: string
  newComment: string
  setNewComment: (v: string) => void
  handleFetchReply: (id: string) => void
  openReplyId: string | null
  replyingTo: string | null
  setReplyingTo: (id: string | null) => void
  replyContent: string
  setReplyContent: (v: string) => void
}

export function CommentsSection({
  postId,
  comments,
  commentsReply,
  isLoading,
  error,
  isLoadingReply,
  errorReply,
  showComments,
  newComment,
  setNewComment,
  handleFetchReply,
  openReplyId,
  replyingTo,
  setReplyingTo,
  replyContent,
  setReplyContent,
}: CommentsSectionProps) {
  const tPostCard = useTranslations("PostCard")

  console.log(comments);
  console.log(commentsReply);

  if (showComments !== postId) return null

  return (
    <div className="mt-4 pt-4 border-t" style={{ borderColor: '#334048' }}>
      {isLoading && <div>Đang tải bình luận...</div>}
      {error && <div className="text-red-500">Lỗi: {error.message}</div>}
      {comments && Array.isArray(comments) && comments.length === 0 && (
        <div>Chưa có bình luận nào.</div>
      )}
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
            className="flex-1 bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400"
          />
        </div>
      </div>
      <div className="space-y-4">
        {comments && Array.isArray(comments) && comments.length > 0 && comments.map((comment: Comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.userAvatar || "/placeholder.svg"} />
                <AvatarFallback>{comment.userName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="rounded-lg p-3" style={{ backgroundColor: '#0f1619' }}>
                  <h5 className="font-semibold text-sm text-white">{comment.userName}</h5>
                  <p className="text-sm text-gray-300">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                  <span>{comment.createdAt}</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:bg-white/10">
                    {tPostCard("likeAction")} ({comment.totalReaction})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-gray-300 hover:bg-white/10"
                    onClick={() => handleFetchReply(comment.id)}
                  >
                    {tPostCard("replyAction")} ({comment.replyCount})
                  </Button>
                </div>
              </div>
            </div>
            {/* Render reply chỉ khi openReplyId === comment.id */}
            {openReplyId === comment.id && (
              <div>
                {isLoadingReply && <div>Đang tải trả lời...</div>}
                {errorReply && <div className="text-red-500">Lỗi: {errorReply.message}</div>}
                {commentsReply && Array.isArray(commentsReply) && commentsReply.length > 0 && (
                  <div className="ml-11 space-y-2">
                    {commentsReply.map((reply: Comment) => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reply.userAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{reply.userName?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="rounded-lg p-2" style={{ backgroundColor: '#0f1619' }}>
                            <h5 className="font-semibold text-xs text-white">{reply.userName}</h5>
                            <p className="text-xs text-gray-300">{reply.content}</p>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                            <span>{reply.createdAt}</span>
                            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:bg-white/10">
                              {tPostCard("likeAction")} ({reply.totalReaction})
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
                  className="flex-1 h-8 text-sm bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400"
                />
                <Button size="sm" variant="ghost" className="text-gray-300 hover:bg-white/10" onClick={() => setReplyingTo(null)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
