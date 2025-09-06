import React from 'react'

import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface QuestionTypeResult {
  type: string
  total: number
  correct: number
  incorrect: number
  skipped: number
}

interface ShowResultProps {
  setShowResults: (showResults: boolean) => void
  timeSpent?: number // in seconds
}

// Mock data for table
const mockQuestionResults: QuestionTypeResult[] = [
  {
    type: "True - False - Not Given",
    total: 6,
    correct: 0,
    incorrect: 0,
    skipped: 6,
  },
  {
    type: "Gap Filling",
    total: 7,
    correct: 0,
    incorrect: 1,
    skipped: 6,
  },
  {
    type: "Multiple Choice",
    total: 3,
    correct: 2,
    incorrect: 1,
    skipped: 0,
  },
  {
    type: "Matching",
    total: 4,
    correct: 1,
    incorrect: 2,
    skipped: 1,
  },
]

// Mock data for summary stats
const mockSummaryStats = {
  totalQuestions: 20,
  correctAnswers: 3,
  incorrectAnswers: 4,
  skippedAnswers: 13,
  score: 15, // percentage
}

const ShowResult = ({ setShowResults, timeSpent }: ShowResultProps) => {
  // Format time function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Use passed timeSpent or fallback to mock data
  const displayTime = timeSpent ? formatTime(timeSpent) : "00:07:18"
  return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#141F23' }}>
        <Card className="w-full max-w-2xl" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Or8uz3So1j0xcuWBWEF5F6o410GYY.png"
                  alt="Completion"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#93D333' }}>
                Hãi khó bạn nhỉ, bình tĩnh cùng luyện tập với YouPass nhé!
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 text-white">Kết quả làm bài</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#2a3a3f" strokeWidth="8" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#93D333"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(mockSummaryStats.correctAnswers / mockSummaryStats.totalQuestions) * 351.86} 351.86`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{mockSummaryStats.correctAnswers}/{mockSummaryStats.totalQuestions}</span>
                    <span className="text-sm text-gray-300">câu đúng</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-right">
                  <span className="text-sm text-gray-300">Thời gian làm bài</span>
                  <div className="text-2xl font-bold text-white">{displayTime}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#93D333' }}></div>
                      <span className="text-sm text-gray-300">Đúng</span>
                    </div>
                    <span className="font-bold text-white">{mockSummaryStats.correctAnswers} câu</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-300">Sai</span>
                    </div>
                    <span className="font-bold text-white">{mockSummaryStats.incorrectAnswers} câu</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-300">Bỏ qua</span>
                    </div>
                    <span className="font-bold text-white">{mockSummaryStats.skippedAnswers} câu</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#2a3a3f', border: '2px dashed #93D333' }}>
              <div className="flex items-center justify-between">
                <span className="text-gray-200">
                  Bạn có muốn để xuất bài tập này đến các bạn khác cùng level với bạn không?
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-gray-300 border-gray-500 hover:bg-gray-700">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Bảng dữ liệu chi tiết</h3>
              <div className="rounded-md border" style={{ borderColor: '#93D333' }}>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: '#2a3a3f' }}>
                      <TableHead className="text-left text-white">Loại câu hỏi</TableHead>
                      <TableHead className="text-center text-white">Số câu hỏi</TableHead>
                      <TableHead className="text-center text-white" style={{ backgroundColor: '#2a3a3f' }}>Đúng</TableHead>
                      <TableHead className="text-center text-white" style={{ backgroundColor: '#2a3a3f' }}>Sai</TableHead>
                      <TableHead className="text-center text-white" style={{ backgroundColor: '#2a3a3f' }}>Bỏ qua</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockQuestionResults.map((result, index) => (
                      <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#1a2a2f' : '#2a3a3f' }}>
                        <TableCell className="font-medium text-gray-200">{result.type}</TableCell>
                        <TableCell className="text-center text-gray-200">{result.total}</TableCell>
                        <TableCell className="text-center font-bold" style={{ color: '#93D333' }}>{result.correct}</TableCell>
                        <TableCell className="text-center text-red-400 font-bold">{result.incorrect}</TableCell>
                        <TableCell className="text-center text-gray-400 font-bold">{result.skipped}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1 text-white" style={{ backgroundColor: '#93D333' }}>Xem giải thích chi tiết</Button>
                <Button variant="outline" className="flex-1 w-full text-gray-300 border-gray-500 hover:bg-gray-700" onClick={() => setShowResults(false)}>
                  Quay lại danh sách
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

export default ShowResult
