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

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  setShowSettings,
  eyeProtection,
  setEyeProtection,
  fontSize,
  setFontSize,
}) => (
  <Dialog open={open} onOpenChange={setShowSettings}>
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Cài đặt
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Chế độ bảo vệ mắt</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEyeProtection(!eyeProtection)}
            className={eyeProtection ? "bg-amber-100" : ""}
          >
            {eyeProtection ? "ON" : "OFF"}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Type className="h-4 w-4" />
            <span>Kích cỡ chữ</span>
          </div>
          <div className="flex space-x-1">
            {["S", "M", "L"].map((size) => (
              <Button
                key={size}
                variant={fontSize === size ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
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

export default SettingsModal
