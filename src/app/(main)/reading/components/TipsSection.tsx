import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Target } from "lucide-react"

export default function TipsSection() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Mẹo luyện đọc hiệu quả</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
              Bài đầy đủ
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Đọc lướt toàn bộ bài trước khi làm câu hỏi</li>
              <li>• Sử dụng chế độ highlight để đánh dấu thông tin quan trọng</li>
              <li>• Tra từ vựng khi cần thiết</li>
              <li>• Quản lý thời gian hiệu quả</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-green-500" />
              Bài lẻ
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Tập trung vào kỹ năng cụ thể</li>
              <li>• Đọc kỹ và hiểu sâu nội dung</li>
              <li>• Luyện tập thường xuyên</li>
              <li>• Xem giải thích chi tiết sau khi làm</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
