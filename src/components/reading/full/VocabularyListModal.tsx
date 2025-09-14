import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockVocabulary } from "@/shared/constants/reading/mockData"
import { useTranslations } from "next-intl"

interface VocabularyListModalProps {
  open: boolean
  setShowVocabularyList: (v: boolean) => void
}

function VocabularyListModal({ open, setShowVocabularyList }: VocabularyListModalProps) {
  const tVocabularyListModal = useTranslations("Reading.full.VocabularyListModal")
  return (
  <Dialog open={open} onOpenChange={setShowVocabularyList}>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <DialogHeader>
        <DialogTitle className="flex items-center text-white">
          <span className="mr-2">🔥</span>
            {tVocabularyListModal("title")}
          <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-gray-700">
            <X className="h-4 w-4" />
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex space-x-2 mb-4">
          <Button size="sm" className="text-white" style={{ backgroundColor: '#93D333' }}>
            {tVocabularyListModal("saveVocabulary")}
          </Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">{tVocabularyListModal("topic")} 1</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">{tVocabularyListModal("topic")} 2</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">{tVocabularyListModal("topic")} 3</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">{tVocabularyListModal("topic")} 4</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">{tVocabularyListModal("topic")} 5</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">{tVocabularyListModal("topic")} 6</Button>
          <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">{tVocabularyListModal("topic")} 7</Button>
          <Button size="sm" className="text-white" style={{ backgroundColor: '#2a3a3f' }}>🎓 Anh Giáo Đậu</Button>
        </div>
        <div className="rounded-md border" style={{ borderColor: '#93D333' }}>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#2a3a3f' }}>
                <TableHead className="w-10 text-white">
                  <input type="checkbox" />
                </TableHead>
                <TableHead className="text-white">{tVocabularyListModal("table.word")}</TableHead>
                <TableHead className="text-white">{tVocabularyListModal("table.meaning")}</TableHead>
                <TableHead className="text-white">{tVocabularyListModal("table.ipa")}</TableHead>
                <TableHead className="text-white">{tVocabularyListModal("table.example")}</TableHead>
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
}
export default VocabularyListModal
