"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
// import { Heart, ThumbsUp, Laugh, Smile, Frown, Angry } from "lucide-react"
import { useTranslations } from "next-intl"
import { ApiPost, ReactionSummary, reactions, User, dataReaction } from "@/types/postType"
import { level, ReactionType } from "@/types/emunType"
import { PostHeader } from "./PostCard/PostHeader"
import { PostImages } from "./PostCard/PostImages"
import { ReactionsSummary } from "./PostCard/ReactionsSummary"
import { ActionButtons } from "./PostCard/ActionButtons"
import { CommentsSection } from "./PostCard/CommentsSection"
import { ImageModal } from "./PostCard/ImageModal"
import { ReactionModal } from "./PostCard/ReactionModal"
import { useGetReaction } from "@/hooks/community/useCommunity"

interface PostCardProps {
  user: User
  post: ApiPost
}

export function PostCard({ post, user }: PostCardProps) {
  const [userReaction, setUserReaction] = useState<string | null>(null)
  const [showReactionModal, setShowReactionModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const tPostCard = useTranslations("PostCard")
  const [showComments, setShowComments] = useState<string>("")
  const { data: dataReaction = [], mutate: getReaction } = useGetReaction()

  useEffect(() => {
    if (post.id) {
      getReaction(post.id)
    }
    console.log("run");
    
  }, [post.id, getReaction])

  // Gọi API khi cần (ví dụ khi bấm nút hoặc khi mount)
  const handleFetchComment = () => {
    if (showComments === post.id) {
      setShowComments("");
    } else {
      setShowComments(post.id);
    }
  };

  const handleReaction = (type: string) => {
    const wasReacted = userReaction === type
    const newReaction = wasReacted ? null : type
    setUserReaction(newReaction)
  }

  const calcReactions = () => {
    if (!dataReaction) return { summary: [], top3: [] }
  
    const summary: Record<string, ReactionSummary & { items: dataReaction[] }> = {}
    const order: string[] = []
  
    dataReaction.forEach((item: dataReaction) => {
      const type = item.reactionType as ReactionType
      const base = reactions.find(r => r.type === type)
      if (!base) return
  
      if (!summary[type]) {
        summary[type] = { ...base, count: 1, items: [item] }
        order.push(type) // lưu thứ tự xuất hiện đầu tiên
      } else {
        summary[type].count += 1
        summary[type].items.push(item)
      }
    })
  
    const allTypes = order.map(type => summary[type])
  
    const topReactions = [...allTypes]
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
  
    return {
      summary: allTypes,
      topReactions,
      data: dataReaction
    }
  }

  return (
    <>
   
      <Card className="hover:shadow-md transition-shadow border-0" style={{ backgroundColor: '#1a2a2f' }}>
        <CardContent className="p-6">
          {/* Post Header */}
          <PostHeader
            postId={post.id}
            userName={post.userName}
            userAvatar={post.userAvatar}
            createdAt={post.createdAt}
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
                post={post}
                topReactions={calcReactions()}
                totalReactions={post.totalReaction ?? 0}
                onShowModal={() => setShowReactionModal(true)}
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{post.totalReaction} {tPostCard("comments")}</span>
              <span>{tPostCard("shares")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons
            post={post}
            userId={user.id}
            setUserReaction={setUserReaction}
            onReaction={handleReaction}
            onShowComments={handleFetchComment}
            getReaction={getReaction}
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
      <ReactionModal open={showReactionModal} onOpenChange={()=>setShowReactionModal(false)} topReactions={calcReactions()} />
    </>
  )
}
