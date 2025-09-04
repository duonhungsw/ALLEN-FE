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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
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
              <h2 className="text-2xl font-bold text-purple-600 mb-2">
                Hãi khó bạn nhỉ, bình tĩnh cùng luyện tập với YouPass nhé!
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Kết quả làm bài</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#ef4444"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(mockSummaryStats.correctAnswers / mockSummaryStats.totalQuestions) * 351.86} 351.86`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{mockSummaryStats.correctAnswers}/{mockSummaryStats.totalQuestions}</span>
                    <span className="text-sm text-gray-600">câu đúng</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-right">
                  <span className="text-sm text-gray-600">Thời gian làm bài</span>
                  <div className="text-2xl font-bold">{displayTime}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Đúng</span>
                    </div>
                    <span className="font-bold">{mockSummaryStats.correctAnswers} câu</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm">Sai</span>
                    </div>
                    <span className="font-bold">{mockSummaryStats.incorrectAnswers} câu</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                      <span className="text-sm">Bỏ qua</span>
                    </div>
                    <span className="font-bold">{mockSummaryStats.skippedAnswers} câu</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-green-800">
                  Bạn có muốn để xuất bài tập này đến các bạn khác cùng level với bạn không?
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Bảng dữ liệu chi tiết</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Loại câu hỏi</TableHead>
                      <TableHead className="text-center">Số câu hỏi</TableHead>
                      <TableHead className="text-center bg-green-100">Đúng</TableHead>
                      <TableHead className="text-center bg-red-100">Sai</TableHead>
                      <TableHead className="text-center bg-gray-100">Bỏ qua</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockQuestionResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{result.type}</TableCell>
                        <TableCell className="text-center">{result.total}</TableCell>
                        <TableCell className="text-center text-green-600 font-bold">{result.correct}</TableCell>
                        <TableCell className="text-center text-red-600 font-bold">{result.incorrect}</TableCell>
                        <TableCell className="text-center text-gray-600 font-bold">{result.skipped}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Xem giải thích chi tiết</Button>
                <Button variant="outline" className="flex-1 w-full bg-transparent" onClick={() => setShowResults(false)}>
                  Quay lại danh sách
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

export default ShowResult
