import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockVocabulary } from "../../shared/constants/reading/mockData"

interface VocabularyListModalProps {
  open: boolean
  setShowVocabularyList: (v: boolean) => void
}

const VocabularyListModal: React.FC<VocabularyListModalProps> = ({ open, setShowVocabularyList }) => (
  <Dialog open={open} onOpenChange={setShowVocabularyList}>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <DialogHeader>
        <DialogTitle className="flex items-center text-white">
          <span className="mr-2">🔥</span>
          Yeah yeah yeah, vào đây để anh Đậu giúp bạn nào
          <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-gray-700">
            <X className="h-4 w-4" />
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex space-x-2 mb-4">
          <Button size="sm" className="text-white" style={{ backgroundColor: '#93D333' }}>
            Lưu từ vựng vào
          </Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">Work</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">Topic 2</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">Topic 3</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">Topic 4</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">Topic 5</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">Nhóm 6</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">Nhóm 9</Button>
          <Button size="sm" className="text-white" style={{ backgroundColor: '#2a3a3f' }}>🎓 Anh Giáo Đậu</Button>
        </div>
        <div className="rounded-md border" style={{ borderColor: '#93D333' }}>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#2a3a3f' }}>
                <TableHead className="w-10 text-white">
                  <input type="checkbox" />
                </TableHead>
                <TableHead className="text-white">Từ vựng</TableHead>
                <TableHead className="text-white">Nghĩa</TableHead>
                <TableHead className="text-white">IPA</TableHead>
                <TableHead className="text-white">Ví dụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVocabulary.map((vocab, idx) => (
                <TableRow key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#1a2a2f' : '#2a3a3f' }}>
                  <TableCell className="w-10">
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell className="font-medium text-gray-200">{vocab.word}</TableCell>
                  <TableCell className="text-gray-200">{vocab.meaning}</TableCell>
                  <TableCell className="text-gray-200">{vocab.ipa}</TableCell>
                  <TableCell className="text-gray-200">{vocab.example}</TableCell>
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
