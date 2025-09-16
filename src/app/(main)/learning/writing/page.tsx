"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, PenTool, FileText, Target } from "lucide-react"
import { useTranslations } from "next-intl"

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
  const tWritingPage = useTranslations("Writing.WritingPage")
  const [selectedTab, setSelectedTab] = useState("paragraph")
  const [selectedLevel, setSelectedLevel] = useState("beginner")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

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
        return tWritingPage("filters.completed")
      case "in-progress":
        return tWritingPage("filters.in-progress")
      case "available":
        return tWritingPage("filters.available")
      default:
        return tWritingPage("filters.available")
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
                {tWritingPage("header.back")}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">{tWritingPage("header.title")}</h1>
            <p className="text-gray-300">{tWritingPage("header.subtitle")}</p>
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
                  <p className="text-sm text-gray-300">{tWritingPage("stats.completed")}</p>
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
                  <p className="text-sm text-gray-300">{tWritingPage("stats.averageScore")}</p>
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
                  <p className="text-sm text-gray-300">{tWritingPage("stats.wordsWritten")}</p>
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
              {tWritingPage("tabs.paragraph")}
            </TabsTrigger>
            <TabsTrigger 
              value="sentence" 
              className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
            >
              {tWritingPage("tabs.sentence")}
            </TabsTrigger>
            <TabsTrigger 
              value="ielts" 
              className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
            >
              {tWritingPage("tabs.ielts")}
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card className="mt-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-white">{tWritingPage("filters.level")}</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all" className="text-white hover:bg-gray-600">{tWritingPage("filters.all")}</SelectItem>
                      <SelectItem value="beginner" className="text-white hover:bg-gray-600">{tWritingPage("filters.beginner")}</SelectItem>
                      <SelectItem value="intermediate" className="text-white hover:bg-gray-600">{tWritingPage("filters.intermediate")}</SelectItem>
                      <SelectItem value="advanced" className="text-white hover:bg-gray-600">{tWritingPage("filters.advanced")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-white">{tWritingPage("filters.category")}</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all" className="text-white hover:bg-gray-600">{tWritingPage("filters.all")}</SelectItem>
                      <SelectItem value="lifestyle" className="text-white hover:bg-gray-600">{tWritingPage("filters.lifestyle")}</SelectItem>
                      <SelectItem value="environment" className="text-white hover:bg-gray-600">{tWritingPage("filters.environment")}</SelectItem>
                      <SelectItem value="technology" className="text-white hover:bg-gray-600">{tWritingPage("filters.technology")}</SelectItem>
                      <SelectItem value="communication" className="text-white hover:bg-gray-600">{tWritingPage("filters.communication")}</SelectItem>
                      <SelectItem value="grammar" className="text-white hover:bg-gray-600">{tWritingPage("filters.grammar")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-white">{tWritingPage("filters.status")}</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all" className="text-white hover:bg-gray-600">{tWritingPage("filters.all")}</SelectItem>
                      <SelectItem value="available" className="text-white hover:bg-gray-600">{tWritingPage("filters.available")}</SelectItem>
                      <SelectItem value="completed" className="text-white hover:bg-gray-600">{tWritingPage("filters.completed")}</SelectItem>
                      <SelectItem value="in-progress" className="text-white hover:bg-gray-600">{tWritingPage("filters.in-progress")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IELTS specific filters */}
                {selectedTab === "ielts" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">{tWritingPage("filters.task")}</label>
                    <Select value={selectedTask} onValueChange={setSelectedTask}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all" className="text-white hover:bg-gray-600">{tWritingPage("filters.all")}</SelectItem>
                        <SelectItem value="task1" className="text-white hover:bg-gray-600">{tWritingPage("filters.task1")}</SelectItem>
                        <SelectItem value="task2" className="text-white hover:bg-gray-600">{tWritingPage("filters.task2")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Chart type filter for IELTS Task 1 */}
              {selectedTab === "ielts" && selectedTask === "task1" && (
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block text-white">{tWritingPage("filters.chartType")}</label>
                  <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                    <SelectTrigger className="w-full md:w-64 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all" className="text-white hover:bg-gray-600">{tWritingPage("filters.all")}</SelectItem>
                      <SelectItem value="line" className="text-white hover:bg-gray-600">{tWritingPage("filters.line")}</SelectItem>
                      <SelectItem value="bar" className="text-white hover:bg-gray-600">{tWritingPage("filters.bar")}</SelectItem>
                      <SelectItem value="pie" className="text-white hover:bg-gray-600">{tWritingPage("filters.pie")}</SelectItem>
                      <SelectItem value="mixed" className="text-white hover:bg-gray-600">{tWritingPage("filters.mixed")}</SelectItem>
                      <SelectItem value="table" className="text-white hover:bg-gray-600">{tWritingPage("filters.table")}</SelectItem>
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
                        {exercise.status === "completed" ? tWritingPage("buttons.redo") : tWritingPage("buttons.start")}
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
            <CardTitle className="text-white">{tWritingPage("tips.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["paragraph", "sentence", "ielts"].map((tab) => (
                <Card key={tab} className="border-0 shadow-none" style={{ backgroundColor: '#141F23' }}>
                  <CardHeader>
                    <CardTitle className="text-white">{tWritingPage(`tips.${tab}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {(tWritingPage.raw(`tips.paragraph.items`) as string[]).map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
