import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, Target } from "lucide-react"
import { useTranslations } from "next-intl"

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
  const tStatsSection = useTranslations("Reading.StatsSection")
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
        <CardContent className="p-6">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 mr-3" style={{ color: '#93D333' }} />
            <div>
              <p className="text-2xl font-bold text-white">{completedExercises}</p>
              <p className="text-sm text-gray-300">{tStatsSection("completedExercises")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 mr-3" style={{ color: '#93D333' }} />
            <div>
              <p className="text-2xl font-bold text-white">{averageAccuracy}%</p>
              <p className="text-sm text-gray-300">{tStatsSection("averageAccuracy")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 mr-3" style={{ color: '#93D333' }} />
            <div>
              <p className="text-2xl font-bold text-white">{totalMinutes}</p>
              <p className="text-sm text-gray-300">{tStatsSection("totalMinutes")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
