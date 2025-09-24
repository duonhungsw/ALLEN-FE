import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { Comment, dataReaction, reactions, ReactionSummary, User } from "@/types/postType"
import React, { useState, useCallback } from "react"
import { usePostComment, useFetchComment, useFetchReplyComment, useDeleteComment, useUpdateComment, usePostReaction, useGetReaction } from "@/hooks/community/useCommunity"
import { ReactionPicker } from "@/components/community/PostCard/Reaction"
import { ReactionType } from "@/types/emunType"
import CommentList from "./CommentList"

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
  // const { data: commentsReply, mutate: getCommentReply, isPending: isLoadingReply, error: errorReply } = useFetchReplyComment()
  const { mutate: updateComment} = useUpdateComment()
  const { mutate: deleteComment} = useDeleteComment()
  const { mutate: postReaction} = usePostReaction()
  const { data: dataReaction = [], mutate: getReaction } = useGetReaction()

  // const calcReactions = useCallback(() => {
  //   if (!dataReaction) return { summary: [], top3: [], data: [] }
  //   const summary: Record<string, ReactionSummary & { items: dataReaction[] }> = {}
  //   const order: string[] = []
  //   dataReaction.forEach((item: dataReaction) => {
  //     const type = item.reactionType as ReactionType
  //     const base = reactions.find(r => r.type === type)
  //     if (!base) return
  //     if (!summary[type]) {
  //       summary[type] = { ...base, count: 1, items: [item] }
  //       order.push(type)
  //     } else {
  //       summary[type].count += 1
  //       summary[type].items.push(item)
  //     }
  //   })
  //   const allTypes = order.map(type => summary[type])
  //   const topReactions = [...allTypes].sort((a, b) => b.count - a.count).slice(0, 3)
  //   return {
  //     summary: allTypes,
  //     topReactions,
  //     data: dataReaction || []
  //   }
  // }, [dataReaction])

  const handleReply = (content: string, parentId: string) => {
    if (!content.trim()) return;
    postComment({
      objectId: postId,
      userId: user.id,
      commentParentId: parentId !== postId ? parentId : undefined,
      content,
    }, {
      onSuccess: () => {
        getComment(postId);
        // Nếu là reply, có thể cần gọi getCommentReply nếu bạn muốn load lại replies riêng biệt
      }
    });
  };

  // Callback reaction
  const handleReaction = (type: string, commentId: string) => {
    postReaction({
      objectId: commentId,
      reactionType: type,
    }, {
      onSuccess: () => {
        // Optionally refresh reactions/comments
      }
    });
  };

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

  // const handleSubmitReply = (commentId: string) => {
  //   if (!replyContent.trim()) return
    
  //   postComment({
  //     objectId: postId,
  //     userId: user.id,
  //     commentParentId: commentId,
  //     content: replyContent
  //   }, {
  //     onSuccess: () => {
  //       setReplyContent("")
  //       setReplyingTo(null)
  //       // Refresh replies after posting
  //       getCommentReply(commentId)
  //     }
  //   })
  // }

  // const handleUpdateComment = (commentId: string) => {
  //   updateComment({
  //     commentId: commentId,
  //     data:{
  //       userId: user.id,
  //       content: updateContent
  //     }
  //   }, {
  //     onSuccess: () => {
  //       setUpdateContent("")
  //     }
  //   })
  // }

  // const handleDeleteComment = (commentId: string) => {
  //   deleteComment(commentId);
  // }

  // const handleReactionReply = (type: ReactionType | string, commentId: string) => {
  //   const normalized = (type || "Like") as ReactionType
  //   postReaction({
  //     objectId: commentId,
  //     reactionType: normalized
  //   }, {
  //     onSuccess: () => {
  //     }
  //   })
  // }
  // const handleFetchReply = (commentId: string) => {
  //   if (openReplyId !== commentId) {
  //     getCommentReply(commentId)
  //     setOpenReplyId(commentId)
  //   } else {
  //     setOpenReplyId(null)
  //   }
  // }

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
      
      {/* Comments List */}
      <CommentList
        comments={comments?.data || []}
        user={user}
        postId={postId}
        onReply={handleReply}
        onReaction={handleReaction}
      />
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

    </div>
  )
}