"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BookOpen, Clock, Target, Search } from "lucide-react"
import Image from "next/image"

export default function ReadingPage() {
  const [selectedTab, setSelectedTab] = useState("full")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  //Data  aricles full
  const fullArticles = [
    {
      id: 1,
      title: "Twin Study: Two of a Kind",
      category: "Science",
      level: "Advanced",
      duration: "45 min",
      questions: 13,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-co0gVHIA3VSBeADn29dwPrLvY7Xz9M.png",
      description: "Nghiên cứu về cặp song sinh và di truyền học",
      completed: true,
      score: 85,
    },
    {
      id: 2,
      title: "A Brief Introduction to Pepper",
      category: "Science",
      level: "Intermediate",
      duration: "30 min",
      questions: 10,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j8vXiQfzWhLRMglg0wYcIk4UBDllyD.png",
      description: "Tìm hiểu về loại gia vị phổ biến",
      completed: false,
      score: null,
    },
    {
      id: 3,
      title: "Climate Change and Its Effects",
      category: "Environment",
      level: "Advanced",
      duration: "50 min",
      questions: 15,
      image: "/placeholder.svg?height=200&width=300&text=Climate",
      description: "Tác động của biến đổi khí hậu",
      completed: false,
      score: null,
    },
  ]
  //Data  aricles personality
  const individualPassages = [
    {
      id: 1,
      title: "The Benefits of Reading",
      category: "Education",
      level: "Intermediate",
      duration: "15 min",
      questions: 5,
      description: "Lợi ích của việc đọc sách",
      completed: true,
      score: 92,
    },
    {
      id: 2,
      title: "Modern Technology",
      category: "Technology",
      level: "Beginner",
      duration: "10 min",
      questions: 4,
      description: "Công nghệ hiện đại trong cuộc sống",
      completed: false,
      score: null,
    },
    {
      id: 3,
      title: "Healthy Lifestyle",
      category: "Health",
      level: "Intermediate",
      duration: "12 min",
      questions: 6,
      description: "Lối sống lành mạnh",
      completed: false,
      score: null,
    },
  ]

  const categories = ["all", "Science", "Environment", "Education", "Technology", "Health", "History"]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filterExercises = (exercises: any[]) => {
    return exercises.filter((exercise) => {
      const matchesSearch =
        searchTerm === "" ||
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory
      const matchesLevel = selectedLevel === "all" || exercise.level === selectedLevel

      return matchesSearch && matchesCategory && matchesLevel
    })
  }

  const renderExerciseCard = (exercise: any, type: string) => (
    <Card key={exercise.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {exercise.image && (
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={exercise.image || "/placeholder.svg"}
              alt={exercise.title}
              className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold">{exercise.title}</h3>
              <Badge className={getLevelColor(exercise.level)}>{exercise.level}</Badge>
              <Badge variant="outline">{exercise.category}</Badge>
              {exercise.completed && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Hoàn thành
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mb-3">{exercise.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span>⏱️ {exercise.duration}</span>
              <span>❓ {exercise.questions} câu hỏi</span>
              {exercise.score && <span className="text-blue-600 font-medium">📊 {exercise.score}%</span>}
            </div>
            <Link href={`/reading/${type}/${exercise.id}`}>
              <Button className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                {exercise.completed ? "Làm lại" : "Bắt đầu"}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Luyện Đọc</h1>
            <p className="text-gray-600">Nâng cao kỹ năng đọc hiểu tiếng Anh</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">18</p>
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
                  <p className="text-2xl font-bold">89%</p>
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
                  <p className="text-2xl font-bold">245</p>
                  <p className="text-sm text-gray-600">Phút luyện tập</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Tìm kiếm bài đọc..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Chọn chủ đề" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "Tất cả chủ đề" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Chọn cấp độ" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "Tất cả cấp độ" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reading Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="full">Bài đầy đủ</TabsTrigger>
            <TabsTrigger value="individual">Bài lẻ</TabsTrigger>
          </TabsList>

          <TabsContent value="full" className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Bài đọc đầy đủ</h2>
              <p className="text-gray-600">Các bài đọc IELTS hoàn chỉnh với nhiều dạng câu hỏi</p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filterExercises(fullArticles).map((exercise) => renderExerciseCard(exercise, "full"))}
            </div>
          </TabsContent>

          <TabsContent value="individual" className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Bài đọc lẻ</h2>
              <p className="text-gray-600">Các đoạn văn ngắn tập trung vào kỹ năng cụ thể</p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filterExercises(individualPassages).map((exercise) => renderExerciseCard(exercise, "individual"))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Tips */}
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
      </div>
    </div>
  )
}
