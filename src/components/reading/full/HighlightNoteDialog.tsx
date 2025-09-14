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

function HighlightNoteDialog({ open,
  selectedHighlight,
  highlights,
  highlightNote,
  setHighlightNote,
  setSelectedHighlight,
  saveHighlightNote,
 }: HighlightNoteDialogProps) {
  return (
  <Dialog open={open} onOpenChange={() => setSelectedHighlight(null)}>
    <DialogContent style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <DialogHeader>
        <DialogTitle className="text-white">Thêm ghi chú cho đoạn highlight</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="p-3 rounded" style={{ backgroundColor: '#2a3a3f' }}>
          <p className="text-sm text-gray-200">{`"${highlights.find((h) => h.id === selectedHighlight)?.text}"`}</p>
        </div>
        <Textarea
          placeholder="Nhập ghi chú của bạn..."
          value={highlightNote}
          onChange={(e) => setHighlightNote(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setSelectedHighlight(null)} className="text-gray-300 border-gray-500 hover:bg-gray-700">
            Hủy
          </Button>
          <Button onClick={saveHighlightNote} className="text-white" style={{ backgroundColor: '#93D333' }}>Lưu ghi chú</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
}
export default HighlightNoteDialog
