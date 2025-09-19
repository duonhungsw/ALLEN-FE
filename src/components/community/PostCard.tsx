"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
// import { Heart, ThumbsUp, Laugh, Smile, Frown, Angry } from "lucide-react"
import { useTranslations } from "next-intl"
import { ApiPost, reactions, User } from "@/types/postType"
import { level } from "@/types/emunType"
import { PostHeader } from "./PostCard/PostHeader"
import { PostImages } from "./PostCard/PostImages"
import { ReactionsSummary } from "./PostCard/ReactionsSummary"
import { ActionButtons } from "./PostCard/ActionButtons"
import { CommentsSection } from "./PostCard/CommentsSection"
import { ImageModal } from "./PostCard/ImageModal"
import { ReactionModal } from "./PostCard/ReactionModal"

interface PostCardProps {
  user: User
  post: ApiPost
}

export function PostCard({ post: initialPost,user }: PostCardProps) {
  const [post, setPost] = useState({
    ...initialPost
  })

  const [userReaction, setUserReaction] = useState<string | null>(null)
  const [showReactionModal, setShowReactionModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const tPostCard = useTranslations("PostCard")
  const [showComments, setShowComments] = useState<string>("")
  
  // Gọi API khi cần (ví dụ khi bấm nút hoặc khi mount)
  const handleFetchComment = () => {
    if (showComments === post.id) {
      setShowComments("");
    } else {
      setShowComments(post.id);
    }
  };

  // const reactions = [
  //   { type: "like", icon: ThumbsUp, color: "text-blue-600", emoji: "👍" },
  //   { type: "love", icon: Heart, color: "text-red-600", emoji: "❤️" },
  //   { type: "haha", icon: Smile, color: "text-yellow-500", emoji: "😂" },
  //   { type: "wow", icon: Laugh, color: "text-yellow-600", emoji: "😮" },
  //   { type: "sad", icon: Frown, color: "text-blue-500", emoji: "😢" },
  //   { type: "angry", icon: Angry, color: "text-red-500", emoji: "😠" },
  // ]

  const handleReaction = (type: string) => {
    const wasReacted = userReaction === type
    const newReaction = wasReacted ? null : type
    setUserReaction(newReaction)
  }

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
  const safeReactions = post.reactions || { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 }
  const reactionEntries = Object.entries(safeReactions)
    .filter(([, count]) => (count as number) > 0)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3)

  return reactionEntries.map(([type, count]) => {
    const reaction = reactions.find((r) => r.type === type)
    return { type, count: Number(count), emoji: reaction?.emoji || "👍" }
  })
}
  // const totalReactions = Object.values(post.reactions || { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 }).reduce((sum: number, count) => sum + (count as number), 0)


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
                postId={post.id}
                userId={user.id}
                topReactions={getTopReactions()}
                totalReactions={post.totalReaction ?? 0}
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
            postId={post.id}
            setPost={setPost}
            userReaction={userReaction}
            setUserReaction={setUserReaction}
            onReaction={handleReaction}
            onShowComments={handleFetchComment}
            onShare={() => {}}
          />

          {/* Comments Section */}
          <CommentsSection
            user={user}
            postId={post.id}
            showComments={showComments}
          />
        </CardContent>
      </Card>

      {/* Image Modal */}
      <ImageModal 
        selectedImage={selectedImage} 
        post={post}
        user={user}
        showComments={showComments}
        onClose={() => setSelectedImage(null)}
        userName={post.userName}
        userAvatar={post.userAvatar}
        postContent={post.content}
        createdAt={post.createdAt}
        onComment={(comment) => {
          // TODO: Implement comment on image
          console.log('Comment on image:', comment)
        }}
        onLike={() => {
          // TODO: Implement like image
          console.log('Like image')
        }}
        onShare={() => {
          // TODO: Implement share image
          console.log('Share image')
        }}
        onDownload={() => {
          // TODO: Implement download image
          console.log('Download image')
        }}
      />

      {/* Reaction Modal */}
      <ReactionModal open={showReactionModal} onOpenChange={setShowReactionModal} topReactions={getTopReactions()} />
    </>
  )
}
