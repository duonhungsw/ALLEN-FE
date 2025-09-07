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
    <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4 text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Luyện Viết</h1>
            <p className="text-gray-300">Cải thiện kỹ năng viết tiếng Anh với AI feedback</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }} className="border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#93D333' }}>
                  <PenTool className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">15</p>
                  <p className="text-sm text-gray-300">Bài đã hoàn thành</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }} className="border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#93D333' }}>
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">8.2</p>
                  <p className="text-sm text-gray-300">Điểm trung bình</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }} className="border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#93D333' }}>
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1,250</p>
                  <p className="text-sm text-gray-300">Từ đã viết</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exercise Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 border-0" style={{ backgroundColor: '#1a2a2f' }}>
            <TabsTrigger 
              value="paragraph" 
              className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
            >
              Đoạn văn
            </TabsTrigger>
            <TabsTrigger 
              value="sentence" 
              className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
            >
              Câu
            </TabsTrigger>
            <TabsTrigger 
              value="ielts" 
              className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
            >
              IELTS
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card className="mt-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-white">Trình độ</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all" className="text-white hover:bg-gray-600">Tất cả</SelectItem>
                      <SelectItem value="beginner" className="text-white hover:bg-gray-600">Beginner</SelectItem>
                      <SelectItem value="intermediate" className="text-white hover:bg-gray-600">Intermediate</SelectItem>
                      <SelectItem value="advanced" className="text-white hover:bg-gray-600">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-white">Chủ đề</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all" className="text-white hover:bg-gray-600">Tất cả</SelectItem>
                      <SelectItem value="lifestyle" className="text-white hover:bg-gray-600">Lối sống</SelectItem>
                      <SelectItem value="environment" className="text-white hover:bg-gray-600">Môi trường</SelectItem>
                      <SelectItem value="technology" className="text-white hover:bg-gray-600">Công nghệ</SelectItem>
                      <SelectItem value="communication" className="text-white hover:bg-gray-600">Giao tiếp</SelectItem>
                      <SelectItem value="grammar" className="text-white hover:bg-gray-600">Ngữ pháp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-white">Trạng thái</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all" className="text-white hover:bg-gray-600">Tất cả</SelectItem>
                      <SelectItem value="available" className="text-white hover:bg-gray-600">Có thể làm</SelectItem>
                      <SelectItem value="completed" className="text-white hover:bg-gray-600">Hoàn thành</SelectItem>
                      <SelectItem value="in-progress" className="text-white hover:bg-gray-600">Đang làm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IELTS specific filters */}
                {selectedTab === "ielts" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Task</label>
                    <Select value={selectedTask} onValueChange={setSelectedTask}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all" className="text-white hover:bg-gray-600">Tất cả</SelectItem>
                        <SelectItem value="task1" className="text-white hover:bg-gray-600">Task 1</SelectItem>
                        <SelectItem value="task2" className="text-white hover:bg-gray-600">Task 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Chart type filter for IELTS Task 1 */}
              {selectedTab === "ielts" && selectedTask === "task1" && (
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block text-white">Loại biểu đồ</label>
                  <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                    <SelectTrigger className="w-full md:w-64 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all" className="text-white hover:bg-gray-600">Tất cả</SelectItem>
                      <SelectItem value="line" className="text-white hover:bg-gray-600">Line Chart</SelectItem>
                      <SelectItem value="bar" className="text-white hover:bg-gray-600">Bar Chart</SelectItem>
                      <SelectItem value="pie" className="text-white hover:bg-gray-600">Pie Chart</SelectItem>
                      <SelectItem value="mixed" className="text-white hover:bg-gray-600">Mixed Chart</SelectItem>
                      <SelectItem value="table" className="text-white hover:bg-gray-600">Table</SelectItem>
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
                <Card key={exercise.id} className="hover:shadow-md transition-shadow" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{exercise.title}</h3>
                          <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                          <Badge variant="outline" className={getStatusColor(exercise.status)}>
                            {getStatusText(exercise.status)}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3">{exercise.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>⏱️ {exercise.estimatedTime}</span>
                          {selectedTab === "ielts" && 'chartType' in exercise && exercise.chartType && <span>📊 {exercise.chartType}</span>}
                        </div>
                      </div>
                    </div>
                    <Link href={`/learning/writing/${selectedTab}/${exercise.id}`}>
                      <Button className="w-full text-white" style={{ backgroundColor: '#93D333' }}>
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
        <Card className="mt-8" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
          <CardHeader>
            <CardTitle className="text-white">Mẹo viết hiệu quả</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center text-white">
                  <FileText className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                  Đoạn văn
                </h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Bắt đầu với câu chủ đề rõ ràng</li>
                  <li>• Sử dụng từ nối để liên kết ý tưởng</li>
                  <li>• Kết thúc với câu tóm tắt</li>
                  <li>• Kiểm tra ngữ pháp và chính tả</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center text-white">
                  <PenTool className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                  Câu
                </h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Chú ý thì của động từ</li>
                  <li>• Sử dụng từ vựng phù hợp</li>
                  <li>• Cấu trúc câu đa dạng</li>
                  <li>• Tránh lặp từ không cần thiết</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center text-white">
                  <BarChart3 className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                  IELTS
                </h4>
                <ul className="text-sm text-gray-300 space-y-2">
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
