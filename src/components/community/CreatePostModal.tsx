"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ImageIcon, Users, Smile, MapPin, Gift, MoreHorizontal, Globe, Lock, UserCheck } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    level: string
    points: number
  }
  content: string
  images: string[]
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

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onPostCreated: (post: Post) => void
}

export function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const [content, setContent] = useState("")
  const [privacy, setPrivacy] = useState("public")
  const [category, setCategory] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const tCreatePost = useTranslations("CreatePost");


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setSelectedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePost = () => {
    if (!content.trim() && selectedImages.length === 0) return

    const newPost = {
      id: Date.now(),
      author: {
        name: "Minh Anh",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Intermediate",
        points: 1250,
      },
      content,
      images: selectedImages,
      timestamp: tCreatePost("justNow"),
      likes: 0,
      comments: 0,
      shares: 0,
      category: category || tCreatePost("category.sharing"),
      privacy,
      reactions: {
        like: 0,
        love: 0,
        wow: 0,
      },
    }

    onPostCreated(newPost)
    onClose()
    setContent("")
    setSelectedImages([])
    setCategory("")
  }

  const getPrivacyIcon = (privacyType: string) => {
    switch (privacyType) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "friends":
        return <UserCheck className="h-4 w-4" />
      case "private":
        return <Lock className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getPrivacyLabel = (privacyType: string) => {
    switch (privacyType) {
      case "public":
        return tCreatePost("privacy.public")
      case "friends":
        return tCreatePost("privacy.friends")
      case "private":
        return tCreatePost("privacy.private")
      default:
        return tCreatePost("privacy.public")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border-0" style={{ backgroundColor: '#1a2a2f' }}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">{tCreatePost("title")}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-300 hover:bg-white/10">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-white">Minh Anh</h4>
              <Select value={privacy} onValueChange={setPrivacy}>
                <SelectTrigger className="w-auto h-auto p-1 bg-[#1a2a2f] text-gray-300 border-[#93D333]">
                  <SelectValue>
                    <div className="flex items-center space-x-1">
                      {getPrivacyIcon(privacy)}
                      <span className="text-sm text-gray-300">{getPrivacyLabel(privacy)}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-[#1a2a2f] text-gray-300 border border-[#93D333]">
                  <SelectItem value="public">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>{tCreatePost("privacy.public")}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="friends">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4" />
                      <span>{tCreatePost("privacy.friends")}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>{tCreatePost("privacy.private")}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Selection */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-[#1a2a2f] text-gray-300 border-[#93D333]">
              <SelectValue placeholder={tCreatePost("category.placeholder")} />
            </SelectTrigger>
            <SelectContent className="bg-[#1a2a2f] text-gray-300 border border-[#93D333]">
              <SelectItem value="study">{tCreatePost("category.study")}</SelectItem>
              <SelectItem value="tips">{tCreatePost("category.tips")}</SelectItem>
              <SelectItem value="question">{tCreatePost("category.question")}</SelectItem>
              <SelectItem value="sharing">{tCreatePost("category.sharing")}</SelectItem>
              <SelectItem value="motivation">{tCreatePost("category.motivation")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Content */}
          <Textarea
            placeholder={tCreatePost("placeholder")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] border border-[#93D333] bg-[#1a2a2f] resize-none text-lg text-white placeholder:text-gray-400"
          />

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={image || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add to Post */}
          <div className="border rounded-lg p-3" style={{ borderColor: '#93D333' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">{tCreatePost("addToPost")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="image-upload">
                <Button variant="ghost" size="sm" className="text-green-400 hover:bg-white/10" asChild>
                  <div>
                    <ImageIcon className="h-5 w-5" />
                  </div>
                </Button>
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-white/10">
                <Users className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-yellow-400 hover:bg-white/10">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-400 hover:bg-white/10">
                <MapPin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-white/10">
                <Gift className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-white/10">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Post Button */}
          <Button
            onClick={handlePost}
            disabled={!content.trim() && selectedImages.length === 0}
            className="w-full text-white hover:opacity-90"
            style={{ backgroundColor: '#93D333' }}
          >
            {tCreatePost("postButton")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
