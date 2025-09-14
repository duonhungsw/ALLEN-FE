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

function AIChatModal({
  open,
  setShowAIChat,
  chatHistory,
  chatMessage,
  setChatMessage,
  handleChatSubmit,
}: AIChatModalProps) {
  return (
  <Dialog open={open} onOpenChange={setShowAIChat}>
    <DialogContent className="max-w-md max-h-[80vh] p-0" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <div className="text-white p-4 rounded-t-lg" style={{ backgroundColor: '#93D333' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2a3a3f' }}>🧠</div>
            <span className="font-semibold">Anh Giáo Đậu</span>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700"
              onClick={() => setShowAIChat(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-3 max-h-96 overflow-y-auto" style={{ backgroundColor: '#1a2a2f' }}>
        {chatHistory.length === 0 ? (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-left justify-start text-gray-300 border-gray-500 hover:bg-gray-700"
              onClick={() => setChatMessage("Hướng dẫn làm câu 4 😊")}
            >
              Hướng dẫn làm câu 4 😊
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-left justify-start text-gray-300 border-gray-500 hover:bg-gray-700"
              onClick={() => setChatMessage("Hướng dẫn làm câu 5 😊")}
            >
              Hướng dẫn làm câu 5 😊
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-left justify-start text-gray-300 border-gray-500 hover:bg-gray-700"
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
                  msg.role === "user" ? "text-white" : "text-gray-200"
                }`}
                style={{ backgroundColor: msg.role === "user" ? '#93D333' : '#2a3a3f' }}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t rounded-b-lg" style={{ backgroundColor: '#2a3a3f', borderColor: '#93D333' }}>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Bạn có thắc mắc gì về bài đọc không 🤔"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <Button size="sm" onClick={handleChatSubmit} className="text-white" style={{ backgroundColor: '#93D333' }}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
}
export default AIChatModal
