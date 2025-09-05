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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Góp ý cải thiện</DialogTitle>
      </DialogHeader>
      {!feedbackSubmitted ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Hãy cho chúng tôi biết vấn đề với bản dịch này để cải thiện chất lượng:
          </p>
          <Textarea
            placeholder="Nhập góp ý của bạn..."
            value={dislikeFeedback}
            onChange={(e) => setDislikeFeedback(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDislikeModal(false)}>
              Hủy
            </Button>
            <Button onClick={submitDislikeFeedback}>Gửi góp ý</Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-green-600 text-4xl mb-4">✓</div>
          <p className="text-lg font-semibold">Cảm ơn đã góp ý!</p>
          <p className="text-sm text-gray-600">Chúng tôi sẽ cải thiện chất lượng dịch thuật.</p>
        </div>
      )}
    </DialogContent>
  </Dialog>
)

export default DislikeFeedbackModal
