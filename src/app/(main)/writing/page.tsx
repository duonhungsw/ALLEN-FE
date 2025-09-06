"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, PenTool, FileText, Target, BarChart3 } from "lucide-react"

interface BaseExercise {
  id: number
  title: string
  description: string
  level: string
  category: string
  status: string
  estimatedTime: string
  difficulty: string
}

interface IeltsExercise extends BaseExercise {
  chartType: string | null
}

export default function WritingPage() {
  const [selectedTab, setSelectedTab] = useState("paragraph")
  const [selectedLevel, setSelectedLevel] = useState("beginner")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // IELTS specific filters
  const [selectedTask, setSelectedTask] = useState("task1")
  const [selectedChartType, setSelectedChartType] = useState("all")

  const paragraphExercises: BaseExercise[] = [
    {
      id: 1,
      title: "My Daily Routine",
      description: "Viết về thói quen hàng ngày của bạn",
      level: "beginner",
      category: "lifestyle",
      status: "available",
      estimatedTime: "15 phút",
      difficulty: "Dễ",
    },
    {
      id: 2,
      title: "Environmental Protection",
      description: "Thảo luận về bảo vệ môi trường",
      level: "intermediate",
      category: "environment",
      status: "completed",
      estimatedTime: "20 phút",
      difficulty: "Trung bình",
    },
    {
      id: 3,
      title: "Technology Impact",
      description: "Tác động của công nghệ đến cuộc sống",
      level: "advanced",
      category: "technology",
      status: "available",
      estimatedTime: "25 phút",
      difficulty: "Khó",
    },
  ]

  const sentenceExercises: BaseExercise[] = [
    {
      id: 1,
      title: "Basic Greetings",
      description: "Câu chào cơ bản trong tiếng Anh",
      level: "beginner",
      category: "communication",
      status: "available",
      estimatedTime: "5 phút",
      difficulty: "Dễ",
    },
    {
      id: 2,
      title: "Complex Sentences",
      description: "Luyện tập câu phức trong tiếng Anh",
      level: "intermediate",
      category: "grammar",
      status: "available",
      estimatedTime: "10 phút",
      difficulty: "Trung bình",
    },
  ]

  const ieltsExercises: IeltsExercise[] = [
    {
      id: 1,
      title: "Line Chart Analysis",
      description: "Phân tích biểu đồ đường về dân số",
      level: "intermediate",
      category: "task1",
      chartType: "line",
      status: "available",
      estimatedTime: "20 phút",
      difficulty: "Trung bình",
    },
    {
      id: 2,
      title: "Bar Chart Comparison",
      description: "So sánh dữ liệu qua biểu đồ cột",
      level: "intermediate",
      category: "task1",
      chartType: "bar",
      status: "available",
      estimatedTime: "20 phút",
      difficulty: "Trung bình",
    },
    {
      id: 3,
      title: "Opinion Essay",
      description: "Viết bài luận bày tỏ quan điểm",
      level: "advanced",
      category: "task2",
      chartType: null,
      status: "available",
      estimatedTime: "40 phút",
      difficulty: "Khó",
    },
  ]

  const getExercises = (): (BaseExercise | IeltsExercise)[] => {
    let exercises: (BaseExercise | IeltsExercise)[] = []
    switch (selectedTab) {
      case "paragraph":
        exercises = paragraphExercises
        break
      case "sentence":
        exercises = sentenceExercises
        break
      case "ielts":
        exercises = ieltsExercises
        break
      default:
        exercises = paragraphExercises
    }

    return exercises.filter((exercise) => {
      const matchesLevel = selectedLevel === "all" || exercise.level === selectedLevel
      const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || exercise.status === selectedStatus
      const matchesTask = selectedTab !== "ielts" || selectedTask === "all" || exercise.category === selectedTask
      const matchesChartType =
        selectedTab !== "ielts" || selectedChartType === "all" || ('chartType' in exercise && exercise.chartType === selectedChartType)

      return matchesLevel && matchesCategory && matchesStatus && matchesTask && matchesChartType
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "bg-green-500"
      case "Trung bình":
        return "bg-yellow-500"
      case "Khó":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 border-green-600"
      case "in-progress":
        return "text-blue-600 border-blue-600"
      case "available":
        return "text-slate-600 border-slate-600"
      default:
        return "text-slate-600 border-slate-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "in-progress":
        return "Đang làm"
      case "available":
        return "Có thể làm"
      default:
        return "Có thể làm"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Luyện Viết</h1>
            <p className="text-slate-600">Cải thiện kỹ năng viết tiếng Anh với AI feedback</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <PenTool className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-slate-600">Bài đã hoàn thành</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">8.2</p>
                  <p className="text-sm text-slate-600">Điểm trung bình</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">1,250</p>
                  <p className="text-sm text-slate-600">Từ đã viết</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exercise Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paragraph">Đoạn văn</TabsTrigger>
            <TabsTrigger value="sentence">Câu</TabsTrigger>
            <TabsTrigger value="ielts">IELTS</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Trình độ</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Chủ đề</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="lifestyle">Lối sống</SelectItem>
                      <SelectItem value="environment">Môi trường</SelectItem>
                      <SelectItem value="technology">Công nghệ</SelectItem>
                      <SelectItem value="communication">Giao tiếp</SelectItem>
                      <SelectItem value="grammar">Ngữ pháp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Trạng thái</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="available">Có thể làm</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="in-progress">Đang làm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IELTS specific filters */}
                {selectedTab === "ielts" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Task</label>
                    <Select value={selectedTask} onValueChange={setSelectedTask}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="task1">Task 1</SelectItem>
                        <SelectItem value="task2">Task 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Chart type filter for IELTS Task 1 */}
              {selectedTab === "ielts" && selectedTask === "task1" && (
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Loại biểu đồ</label>
                  <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="mixed">Mixed Chart</SelectItem>
                      <SelectItem value="table">Table</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Exercise Content */}
          <TabsContent value={selectedTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getExercises().map((exercise) => (
                <Card key={exercise.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{exercise.title}</h3>
                          <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                          <Badge variant="outline" className={getStatusColor(exercise.status)}>
                            {getStatusText(exercise.status)}
                          </Badge>
                        </div>
                        <p className="text-slate-600 mb-3">{exercise.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>⏱️ {exercise.estimatedTime}</span>
                          {selectedTab === "ielts" && 'chartType' in exercise && exercise.chartType && <span>📊 {exercise.chartType}</span>}
                        </div>
                      </div>
                    </div>
                    <Link href={`/writing/${selectedTab}/${exercise.id}`}>
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        {exercise.status === "completed" ? "Làm lại" : "Bắt đầu"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Writing Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Mẹo viết hiệu quả</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Đoạn văn
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Bắt đầu với câu chủ đề rõ ràng</li>
                  <li>• Sử dụng từ nối để liên kết ý tưởng</li>
                  <li>• Kết thúc với câu tóm tắt</li>
                  <li>• Kiểm tra ngữ pháp và chính tả</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <PenTool className="h-5 w-5 mr-2 text-green-500" />
                  Câu
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Chú ý thì của động từ</li>
                  <li>• Sử dụng từ vựng phù hợp</li>
                  <li>• Cấu trúc câu đa dạng</li>
                  <li>• Tránh lặp từ không cần thiết</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                  IELTS
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Task 1: Mô tả chính xác dữ liệu</li>
                  <li>• Task 2: Lập luận logic và rõ ràng</li>
                  <li>• Quản lý thời gian hiệu quả</li>
                  <li>• Sử dụng từ vựng học thuật</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
