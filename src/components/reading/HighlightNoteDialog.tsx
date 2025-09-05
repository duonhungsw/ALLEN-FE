import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Highlight } from "@/providers/auth/types/readingType"

interface HighlightNoteDialogProps {
  open: boolean
  selectedHighlight: string | null
  highlights: Highlight[]
  highlightNote: string
  setHighlightNote: (v: string) => void
  setSelectedHighlight: (v: string | null) => void
  saveHighlightNote: () => void
}

const HighlightNoteDialog: React.FC<HighlightNoteDialogProps> = ({
  open,
  selectedHighlight,
  highlights,
  highlightNote,
  setHighlightNote,
  setSelectedHighlight,
  saveHighlightNote,
}) => (
  <Dialog open={open} onOpenChange={() => setSelectedHighlight(null)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Thêm ghi chú cho đoạn highlight</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="p-3 bg-yellow-100 rounded">
          <p className="text-sm">{`"${highlights.find((h) => h.id === selectedHighlight)?.text}"`}</p>
        </div>
        <Textarea
          placeholder="Nhập ghi chú của bạn..."
          value={highlightNote}
          onChange={(e) => setHighlightNote(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setSelectedHighlight(null)}>
            Hủy
          </Button>
          <Button onClick={saveHighlightNote}>Lưu ghi chú</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default HighlightNoteDialog
