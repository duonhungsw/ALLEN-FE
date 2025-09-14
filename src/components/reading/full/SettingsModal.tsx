import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Type, Settings } from "lucide-react"

interface SettingsModalProps {
  open: boolean
  setShowSettings: (v: boolean) => void
  eyeProtection: boolean
  setEyeProtection: (v: boolean) => void
  fontSize: string
  setFontSize: (v: string) => void
}

function SettingsModal({ 
  open,
  setShowSettings,
  eyeProtection,
  setEyeProtection,
  fontSize,
  setFontSize,
}: SettingsModalProps) {
return (
  <Dialog open={open} onOpenChange={setShowSettings}>
    <DialogContent className="max-w-sm" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <DialogHeader>
        <DialogTitle className="flex items-center text-white">
          <Settings className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
          Cài đặt
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4" style={{ color: '#93D333' }} />
            <span className="text-gray-200">Chế độ bảo vệ mắt</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEyeProtection(!eyeProtection)}
            className={eyeProtection ? "text-white" : "text-gray-300 border-gray-500 hover:bg-gray-700"}
            style={{ backgroundColor: eyeProtection ? '#93D333' : 'transparent' }}
          >
            {eyeProtection ? "ON" : "OFF"}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Type className="h-4 w-4" style={{ color: '#93D333' }} />
            <span className="text-gray-200">Kích cỡ chữ</span>
          </div>
          <div className="flex space-x-1">
            {["S", "M", "L"].map((size) => (
              <Button
                key={size}
                variant={fontSize === size ? "default" : "outline"}
                size="sm"
                className={`w-8 h-8 p-0 ${fontSize === size ? "text-white" : "text-gray-300 border-gray-500 hover:bg-gray-700"}`}
                style={{ backgroundColor: fontSize === size ? '#93D333' : 'transparent' }}
                onClick={() => setFontSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
}
export default SettingsModal
