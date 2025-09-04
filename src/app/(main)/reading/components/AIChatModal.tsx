import React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Maximize2, X, Send } from "lucide-react"

interface AIChatModalProps {
  open: boolean
  setShowAIChat: (v: boolean) => void
  chatHistory: Array<{ role: string; message: string }>
  chatMessage: string
  setChatMessage: (v: string) => void
  handleChatSubmit: () => void
}

const AIChatModal: React.FC<AIChatModalProps> = ({
  open,
  setShowAIChat,
  chatHistory,
  chatMessage,
  setChatMessage,
  handleChatSubmit,
}) => (
  <Dialog open={open} onOpenChange={setShowAIChat}>
    <DialogContent className="max-w-md max-h-[80vh] p-0">
      <div className="bg-green-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">🧠</div>
            <span className="font-semibold">Anh Giáo Đậu</span>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-green-700">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-green-700"
              onClick={() => setShowAIChat(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-3 max-h-96 overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-left justify-start bg-transparent"
              onClick={() => setChatMessage("Hướng dẫn làm câu 4 😊")}
            >
              Hướng dẫn làm câu 4 😊
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-left justify-start bg-transparent"
              onClick={() => setChatMessage("Hướng dẫn làm câu 5 😊")}
            >
              Hướng dẫn làm câu 5 😊
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-left justify-start bg-transparent"
              onClick={() => setChatMessage("Tóm tắt bài đọc hiện tại 🤔")}
            >
              Tóm tắt bài đọc hiện tại 🤔
            </Button>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t bg-gray-600 rounded-b-lg">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Bạn có thắc mắc gì về bài đọc không 🤔"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
            className="flex-1 bg-white"
          />
          <Button size="sm" onClick={handleChatSubmit}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default AIChatModal
