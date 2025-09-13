import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, X } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface ImageModalProps {
  selectedImage: string | null
  onClose: () => void
}

export function ImageModal({ selectedImage, onClose }: ImageModalProps) {
  const tPostCard = useTranslations("PostCard")
  if (!selectedImage) return null
  return (
    <Dialog open={!!selectedImage} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 border-0" style={{ backgroundColor: '#1a2a2f' }}>
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
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 max-h-60 overflow-y-auto">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Input placeholder={tPostCard("imageCommentPlaceholder")} className="flex-1 bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400" />
            <Button size="sm" className="text-white hover:opacity-90" style={{ backgroundColor: '#93D333' }}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
