"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ThumbsUp, Laugh} from "lucide-react"
import { useTranslations } from "next-intl"
import { ApiPost } from "@/types/posType"
import { level } from "@/types/emunType"
import { useFetchComment, useFetchReplyComment } from "@/hooks/auth/useCommunity"
import { PostHeader } from "./PostCard/PostHeader"
import { PostImages } from "./PostCard/PostImages"
import { ReactionsSummary } from "./PostCard/ReactionsSummary"
import { ActionButtons } from "./PostCard/ActionButtons"
import { CommentsSection } from "./PostCard/CommentsSection"
import { ImageModal } from "./PostCard/ImageModal"
import { ReactionModal } from "./PostCard/ReactionModal"

interface PostCardProps {
  post: ApiPost
}

export function PostCard({ post: initialPost }: PostCardProps) {
  const [post, setPost] = useState({
    ...initialPost
  })
  const [newComment, setNewComment] = useState("")
  const [userReaction, setUserReaction] = useState<string | null>(null)
  const [showReactionModal, setShowReactionModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const tPostCard = useTranslations("PostCard")
  // const [comment, setComment] = useState<any[]>([])
  const { data: comments, mutate: fetchComment, isLoading, error } = useFetchComment();
  const { data: commentsReply, mutate: fetchCommentReply, isLoadingReply, errorReply } = useFetchReplyComment();
  const [openReplyId, setOpenReplyId] = useState<string>("");
  const [showComments, setShowComments] = useState<string>("")
  
  // Gọi API khi cần (ví dụ khi bấm nút hoặc khi mount)
  const handleFetchComment = () => {
    if (showComments === post.id) {
      setShowComments("");
    } else {
      fetchComment(post.id);
      setShowComments(post.id);
    }
  };

  const handleFetchReply = (commentId: string) => {
    if (openReplyId !== commentId) {
      fetchCommentReply(commentId);
      setOpenReplyId(commentId);
    }
  }

  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const reactions = [
    { type: "like", icon: ThumbsUp, color: "text-blue-600", emoji: "👍" },
    { type: "love", icon: Heart, color: "text-red-600", emoji: "❤️" },
    { type: "wow", icon: Laugh, color: "text-yellow-600", emoji: "😮" },
  ]

  const handleReaction = (type: string) => {
    const wasReacted = userReaction === type
    const newReaction = wasReacted ? null : type

    setUserReaction(newReaction)
  }

  // const handleComment = () => {
  //   if (!newComment.trim()) return

  //   const comment: Comment = {
  //     id: Date.now().toString(),
  //     author: { name: tPostCard("you"), avatar: "/placeholder.svg?height=32&width=32" },
  //     content: newComment,
  //     timestamp: tPostCard("justNow"),
  //     likes: 0,
  //     reactions: { like: 0, love: 0, wow: 0 },
  //   }

  //   setComments([...comments, comment])
  //   setPost((prev) => ({
  //     ...prev,
  //     // comments: (prev.comments ?? 0) + 1,
  //   }))
  //   setNewComment("")
  // }

  // const handleReply = (commentId: string) => {
  //   if (!replyContent.trim()) return

  //   const reply: Comment = {
  //     id: Date.now().toString(),
  //     author: { name: tPostCard("you"), avatar: "/placeholder.svg?height=32&width=32" },
  //     content: replyContent,
  //     timestamp: tPostCard("justNow"),
  //     likes: 0,
  //     reactions: { like: 0, love: 0, wow: 0 },
  //   }

    // setComments((prev) =>
    //   prev.map((comment) =>
    //     comment.id === commentId ? { ...comment, replies: [...(comment.replies || []), reply] } : comment,
    //   ),
    // )

  //   setReplyingTo(null)
  //   setReplyContent("")
  // }

  // const getLevelColor = (level: string) => {
  //   switch (level) {
  //     case "A1":
  //       return "bg-green-500"
  //     case "A2":
  //       return "bg-green-500"
  //     case "B1":
  //       return "bg-blue-500"
  //     case "B2":
  //       return "bg-blue-500"
  //     case "C1":
  //       return "bg-purple-500"
  //     case "C2":
  //       return "bg-purple-500"
  //     default:
  //       return "bg-gray-500"
  //   }
  // }

const getTopReactions = () => {
  const safeReactions = post.reactions || { like: 0, love: 0, wow: 0 }
  const reactionEntries = Object.entries(safeReactions)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return reactionEntries.map(([type, count]) => {
    const reaction = reactions.find((r) => r.type === type)
    return { type, count, emoji: reaction?.emoji || "👍" }
  })
}
  const totalReactions = Object.values(post.reactions || { like: 0, love: 0, wow: 0 }).reduce((sum, count) => sum + count, 0)


  return (
    <>
   
      <Card className="hover:shadow-md transition-shadow border-0" style={{ backgroundColor: '#1a2a2f' }}>
        <CardContent className="p-6">
          {/* Post Header */}
          <PostHeader
            userName={post.userName}
            userAvatar={post.userAvatar}
            createdAt={post.createdAt}
            // points={post.author?.points || 0}
            privacy={post.privacy}
            level={level.A1}
          />

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Post Images */}
          <PostImages medias={post.medias || []} onSelectImage={setSelectedImage} />

          {/* Reactions Summary */}
          <div className="flex items-center justify-between py-3 border-t border-b" style={{ borderColor: '#334048' }}>
            <div className="flex items-center space-x-2">
              <ReactionsSummary
                topReactions={getTopReactions()}
                totalReactions={totalReactions}
                onShowModal={() => setShowReactionModal(true)}
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{tPostCard("comments")}</span>
              <span>{tPostCard("shares")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons
            reactions={reactions}
            userReaction={userReaction}
            onReaction={handleReaction}
            onShowComments={handleFetchComment}
            onShare={() => {}}
          />

          {/* Comments Section */}
          <CommentsSection
            postId={post.id}             // truyền id của post
            comments={Array.isArray(comments) ? comments : comments?.data || []}
            commentsReply={Array.isArray(commentsReply) ? commentsReply : commentsReply?.data || []}
            isLoading={isLoading}
            error={error}
            isLoadingReply={isLoadingReply}
            errorReply={errorReply}
            showComments={showComments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleFetchReply={handleFetchReply}
            openReplyId={openReplyId}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
          />
        </CardContent>
      </Card>

      {/* Image Modal */}
      <ImageModal selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />

      {/* Reaction Modal */}
      <ReactionModal open={showReactionModal} onOpenChange={setShowReactionModal} topReactions={getTopReactions()} />
    </>
  )
}
