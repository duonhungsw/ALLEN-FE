import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface DislikeFeedbackModalProps {
  open: boolean
  setShowDislikeModal: (v: boolean) => void
  feedbackSubmitted: boolean
  dislikeFeedback: string
  setDislikeFeedback: (v: string) => void
  submitDislikeFeedback: () => void
}

const DislikeFeedbackModal: React.FC<DislikeFeedbackModalProps> = ({
  open,
  setShowDislikeModal,
  feedbackSubmitted,
  dislikeFeedback,
  setDislikeFeedback,
  submitDislikeFeedback,
}) => (
  <Dialog open={open} onOpenChange={setShowDislikeModal}>
    <DialogContent style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <DialogHeader>
        <DialogTitle className="text-white">Góp ý cải thiện</DialogTitle>
      </DialogHeader>
      {!feedbackSubmitted ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-300">
            Hãy cho chúng tôi biết vấn đề với bản dịch này để cải thiện chất lượng:
          </p>
          <Textarea
            placeholder="Nhập góp ý của bạn..."
            value={dislikeFeedback}
            onChange={(e) => setDislikeFeedback(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDislikeModal(false)} className="text-gray-300 border-gray-500 hover:bg-gray-700">
              Hủy
            </Button>
            <Button onClick={submitDislikeFeedback} className="text-white" style={{ backgroundColor: '#93D333' }}>Gửi góp ý</Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4" style={{ color: '#93D333' }}>✓</div>
          <p className="text-lg font-semibold text-white">Cảm ơn đã góp ý!</p>
          <p className="text-sm text-gray-300">Chúng tôi sẽ cải thiện chất lượng dịch thuật.</p>
        </div>
      )}
    </DialogContent>
  </Dialog>
)

export default DislikeFeedbackModal
