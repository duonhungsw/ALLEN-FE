import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockVocabulary } from "../constants/mockData"

interface VocabularyListModalProps {
  open: boolean
  setShowVocabularyList: (v: boolean) => void
}

const VocabularyListModal: React.FC<VocabularyListModalProps> = ({ open, setShowVocabularyList }) => (
  <Dialog open={open} onOpenChange={setShowVocabularyList}>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <span className="mr-2">🔥</span>
          Yeah yeah yeah, vào đây để anh Đậu giúp bạn nào
          <Button variant="ghost" size="sm" className="ml-auto">
            <X className="h-4 w-4" />
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex space-x-2 mb-4">
          <Button size="sm" className="bg-green-100 text-green-700">
            Lưu từ vựng vào
          </Button>
          <Button size="sm" variant="outline">Work</Button>
          <Button size="sm" variant="outline">Topic 2</Button>
          <Button size="sm" variant="outline">Topic 3</Button>
          <Button size="sm" variant="outline">Topic 4</Button>
          <Button size="sm" variant="outline">Topic 5</Button>
          <Button size="sm" variant="outline">Nhóm 6</Button>
          <Button size="sm" variant="outline">Nhóm 9</Button>
          <Button size="sm" className="bg-orange-100 text-orange-700">🎓 Anh Giáo Đậu</Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input type="checkbox" />
                </TableHead>
                <TableHead>Từ vựng</TableHead>
                <TableHead>Nghĩa</TableHead>
                <TableHead>IPA</TableHead>
                <TableHead>Ví dụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVocabulary.map((vocab, idx) => (
                <TableRow key={idx}>
                  <TableCell className="w-10">
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell className="font-medium">{vocab.word}</TableCell>
                  <TableCell>{vocab.meaning}</TableCell>
                  <TableCell>{vocab.ipa}</TableCell>
                  <TableCell>{vocab.example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default VocabularyListModal
