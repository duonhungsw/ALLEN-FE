import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, Target } from "lucide-react"

interface StatsSectionProps {
  completedExercises: number
  averageAccuracy: number
  totalMinutes: number
}

export default function StatsSection({ 
  completedExercises, 
  averageAccuracy, 
  totalMinutes 
}: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold">{completedExercises}</p>
              <p className="text-sm text-gray-600">Bài đã hoàn thành</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold">{averageAccuracy}%</p>
              <p className="text-sm text-gray-600">Độ chính xác trung bình</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-2xl font-bold">{totalMinutes}</p>
              <p className="text-sm text-gray-600">Phút luyện tập</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
