import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { Comment, User } from "@/types/postType"
import React, { useState } from "react"
import { usePostComment, useFetchComment, useFetchReplyComment, useDeleteComment, useUpdateComment, usePostReaction } from "@/hooks/community/useCommunity"
import { ReactionPicker } from "@/components/community/PostCard/Reaction"
import { ReactionType } from "@/types/emunType"

interface CommentsSectionProps {
  user: User
  postId: string
  showComments: string
}

export function CommentsSection({
  user,
  postId,
  showComments,
}: CommentsSectionProps) {
  const tPostCard = useTranslations("PostCard")
  const [newComment, setNewComment] = useState("")
  const [replyContent, setReplyContent] = useState("")
  const [updateContent, setUpdateContent] = useState("")
  const [openReplyId, setOpenReplyId] = useState<string | null>(null)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [userReactionReplies, setUserReactionReplies] = useState<Record<string, string | null>>({})
  
  // API hooks
  const { mutate: postComment, isPending: isSubmittingComment } = usePostComment()
  const { data: comments, mutate: getComment, isPending: isLoading, error } = useFetchComment()
  const { data: commentsReply, mutate: getCommentReply, isPending: isLoadingReply, error: errorReply } = useFetchReplyComment()
  const { mutate: updateComment} = useUpdateComment()
  const { mutate: deleteComment} = useDeleteComment()
  const { mutate: postReaction} = usePostReaction()

  // console.log(    showComments );
  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    
    postComment({
      objectId: postId,
      userId: user.id,
      content: newComment
    }, {
      onSuccess: () => {
        setNewComment("")
        // Refresh comments after posting
        getComment(postId)
      }
    })
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return
    
    postComment({
      objectId: postId,
      userId: user.id,
      commentParentId: commentId,
      content: replyContent
    }, {
      onSuccess: () => {
        setReplyContent("")
        setReplyingTo(null)
        // Refresh replies after posting
        getCommentReply(commentId)
      }
    })
  }

  const handleUpdateComment = (commentId: string) => {
    updateComment({
      commentId: commentId,
      data:{
        userId: user.id,
        content: updateContent
      }
    }, {
      onSuccess: () => {
        setUpdateContent("")
      }
    })
  }

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
  }

  const handleReactionReply = (type: ReactionType | string, commentId: string) => {
    // console.log("reaction:", type, "commentId:", commentId);
    // setUserReactionReply(type)
    // console.log( "setUserReactionReply(type)",userReactionReply);
    
  
    setUserReactionReplies(prev => ({
      ...prev,
      [commentId]: type
    }))
    // Gọi API nếu cần
    const normalized = (type || "Like") as ReactionType
    postReaction({
      objectId: commentId,
      reactionType: normalized
    }, {
      onSuccess: () => {
        // getReaction(postId)
        setUserReactionReplies(prev => ({
          ...prev,
          [commentId]: type
        }))
      }
    })
  }
  const handleFetchReply = (commentId: string) => {
    if (openReplyId !== commentId) {
      getCommentReply(commentId)
      setOpenReplyId(commentId)
    } else {
      setOpenReplyId(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      action()
    }
  }

  // Load comments when section is shown
  React.useEffect(() => {
    if (showComments === postId) {
      getComment(postId)
    }
  }, [showComments, postId, getComment])

  if (showComments !== postId) return null

  return (
    <div className="mt-4 pt-4 border-t" style={{ borderColor: '#334048' }}>
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="text-sm text-gray-400">Đang tải bình luận...</div>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm py-2">Lỗi: {error.message}</div>
      )}
      
      {/* Comment Input Section */}
      <div className="bg-[#0f1619] rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={user?.picture} />
            <AvatarFallback className="bg-[#93D333] text-black font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex space-x-2">
              <Input
                placeholder={tPostCard("commentPlaceholder") || "Viết bình luận..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleSubmitComment)}
                className="flex-1 bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#93D333] focus:border-transparent"
                maxLength={500}
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmittingComment}
                size="sm"
                className="bg-[#93D333] hover:bg-[#7bb32a] text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmittingComment ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            {newComment.length > 0 && (
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{newComment.length}/500 ký tự</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewComment("")}
                    className="h-6 px-2 text-xs text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm">Đang tải bình luận...</div>
          </div>
        ) : comments && comments.data && Array.isArray(comments.data) && comments.data.length > 0 ? (
          comments.data.map((comment: Comment) => (
            <div key={comment.id} className="group">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={comment.userAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#93D333] text-black font-semibold">
                    {comment.userName?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="bg-[#0f1619] rounded-lg p-3 group-hover:bg-[#1a2a2f] transition-colors duration-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-semibold text-sm text-white truncate">{comment.userName}</h5>
                      <span className="text-xs text-gray-400">•</span>
                      {/* <span className="text-xs text-gray-400">{comment.createdAt}</span> */}
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 ml-2">
                    {/* <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-xs text-gray-400 hover:text-[#93D333] hover:bg-white/5 transition-colors duration-200"
                    >
                      👍 {comment.totalReaction || 0}
                    </Button> */}
                    <ReactionPicker
                      onReactionSelect={(type) => handleReactionReply(type, comment.id)} 
                      currentReaction={userReactionReplies[comment.id] || null}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-gray-400 hover:text-[#93D333] hover:bg-white/5 transition-colors duration-200"
                      onClick={() => handleFetchReply(comment.id)}
                    >
                      💬 {comment.replyCount || 0}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      {replyingTo === comment.id ? 'Hủy' : 'Trả lời'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Replies Section */}
              {openReplyId === comment.id && (
                <div className="ml-11 mt-3">
                  {isLoadingReply && (
                    <div className="flex items-center justify-center py-4">
                      <div className="text-sm text-gray-400">Đang tải trả lời...</div>
                    </div>
                  )}
                  {errorReply && (
                    <div className="text-red-500 text-sm py-2">Lỗi: {errorReply.message}</div>
                  )}
                  {commentsReply && commentsReply.data  && Array.isArray(commentsReply.data) && commentsReply.data.length > 0 && (
                    <div className="space-y-3">
                      {commentsReply.data.map((reply: Comment) => (
              //  {commentsReply && commentsReply.data && Array.isArray(commentsReply.data) && commentsReply.data.length > 0 && (
              //    <div className="space-y-3">
              //      {commentsReply.data.map((reply: Comment) => (
                        <div key={reply.id} className="flex items-start space-x-3 group">
                          <Avatar className="h-6 w-6 flex-shrink-0">
                            <AvatarImage src={reply.userAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#93D333] text-black text-xs font-semibold">
                              {reply.userName?.[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="bg-[#0f1619] rounded-lg p-2 group-hover:bg-[#1a2a2f] transition-colors duration-200">
                              <div className="flex items-center space-x-2 mb-1">
                                <h5 className="font-semibold text-xs text-white truncate">{reply.userName}</h5>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-400">{reply.createdAt}</span>
                              </div>
                              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                                {reply.content}
                              </p>
                            </div>
                            <div className="flex items-center space-x-3 mt-1 ml-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2 text-xs text-gray-400 hover:text-[#93D333] hover:bg-white/5 transition-colors duration-200"
                              >
                                👍 {reply.totalReaction || 0}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {commentsReply && commentsReply.data && Array.isArray(commentsReply.data) && commentsReply.data.length === 0 && !isLoadingReply && (
                    <div className="text-sm text-gray-400 py-2">Chưa có trả lời nào.</div>
                  )}
                </div>
              )}

              {/* Reply Input */}
              {replyingTo === comment.id && (
                <div className="ml-11 mt-3">
                  <div className="bg-[#0f1619] rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-6 w-6 flex-shrink-0">
                        <AvatarImage src={user?.picture} />
                        <AvatarFallback className="bg-[#93D333] text-black text-xs font-semibold">
                          {user?.name?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex space-x-2">
                          <Input
                            placeholder={tPostCard("replyPlaceholder") || "Viết trả lời..."}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, () => handleSubmitReply(comment.id))}
                            className="flex-1 h-8 text-sm bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#93D333] focus:border-transparent"
                            maxLength={300}
                          />
                          <Button
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyContent.trim()}
                            size="sm"
                            className="bg-[#93D333] hover:bg-[#7bb32a] text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200" 
                            onClick={() => setReplyingTo(null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        {replyContent.length > 0 && (
                          <div className="flex justify-between items-center text-xs text-gray-400">
                            <span>{replyContent.length}/300 ký tự</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyContent("")}
                              className="h-5 px-2 text-xs text-gray-400 hover:text-white hover:bg-white/10"
                            >
                              Xóa
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm">Chưa có bình luận nào.</div>
          </div>
        )}
      </div>
    </div>
  )
}