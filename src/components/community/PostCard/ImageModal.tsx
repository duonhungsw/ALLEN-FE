import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { X, Download, Share2, Heart, ZoomIn, ZoomOut, RotateCcw, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { CommentsSection } from "./CommentsSection"
import { ApiPost, User } from "@/types/postType"

interface ImageModalProps {
  selectedImage: string | null
  post: ApiPost,
  user: User,
  showComments: string
  onClose: () => void
  userName?: string
  userAvatar?: string
  postContent?: string
  createdAt?: string
  onComment?: (comment: string) => void
  onLike?: () => void
  onShare?: () => void
  onDownload?: () => void
}

export function ImageModal({ 
  selectedImage, 
  post,
  user,
  showComments,
  onClose, 
  userName = "User",
  userAvatar,
  postContent,
  createdAt,
  onComment,
  onLike,
  onShare,
  onDownload
}: ImageModalProps) {
  const tPostCard = useTranslations("PostCard")
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  if (!selectedImage) return null

  const handleComment = () => {
    if (comment.trim() && onComment) {
      onComment(comment)
      setComment("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleComment()
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (onLike) onLike()
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5))
  const handleRotate = () => setRotation(prev => (prev + 90) % 360)
  const handleReset = () => {
    setZoom(1)
    setRotation(0)
  }

  return (
    <Dialog open={!!selectedImage} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 border-0 overflow-hidden" style={{ backgroundColor: '#1a2a2f' }}>
        <DialogTitle className="sr-only">Xem ảnh - {userName}</DialogTitle>
        <div className="flex h-[95vh]">
          {/* Image Section */}
          <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
            <div 
              className="relative transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Full size image"
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: '90vh' }}
                priority
              />
            </div>
            
            {/* Image Controls */}
            <div className="absolute top-4 left-4 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={handleRotate}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Sidebar */}
          <div className="w-100 bg-[#0f1619] border-l border-[#334048] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-[#334048]">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#93D333] text-black font-semibold">
                    {userName?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{userName}</h3>
                  <p className="text-xs text-gray-400">{createdAt}</p>
                </div>
              </div>
              {postContent && (
                <p className="text-sm text-gray-300 leading-relaxed">{postContent}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-b border-[#334048]">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>Like</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-400 hover:text-[#93D333]"
                  onClick={onShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-400 hover:text-[#93D333]"
                  onClick={onDownload}
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="text-sm text-gray-400 py-8">
                  <CommentsSection
                    user={user}
                    postId={post.id}
                    showComments={post.id}
                  />
                </div>
              </div>
            </div>

            {/* Comment Input */}
            {/* <div className="p-4 border-t border-[#334048]">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Viết bình luận..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#93D333] focus:border-transparent"
                  maxLength={200}
                />
                <Button
                  onClick={handleComment}
                  disabled={!comment.trim()}
                  size="sm"
                  className="bg-[#93D333] hover:bg-[#7bb32a] text-black disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {comment.length > 0 && (
                <div className="mt-2 text-xs text-gray-400 text-right">
                  {comment.length}/200 ký tự
                </div>
              )}
            </div> */}
            
    
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
