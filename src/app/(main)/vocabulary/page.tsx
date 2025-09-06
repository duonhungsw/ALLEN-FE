"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Volume2, Edit, Trash2, RotateCcw, Zap, BookOpen } from "lucide-react"

export default function VocabularyPage() {
  const [selectedTopic, setSelectedTopic] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const topics = [
    { id: "all", name: "Tất cả", count: 156 },
    { id: "basic", name: "Từ vựng cơ bản", count: 45 },
    { id: "business", name: "Kinh doanh", count: 32 },
    { id: "travel", name: "Du lịch", count: 28 },
    { id: "food", name: "Đồ ăn", count: 25 },
    { id: "technology", name: "Công nghệ", count: 26 },
  ]

  const vocabularyList = [
    {
      id: 1,
      word: "serendipity",
      meaning: "sự tình cờ may mắn",
      pronunciation: "/ˌserənˈdɪpɪti/",
      example: "Finding this job was pure serendipity.",
      topic: "basic",
      difficulty: "hard",
      lastReviewed: "2 ngày trước",
      masteryLevel: 3,
    },
    {
      id: 2,
      word: "entrepreneur",
      meaning: "doanh nhân",
      pronunciation: "/ˌɑːntrəprəˈnɜːr/",
      example: "She became a successful entrepreneur at age 25.",
      topic: "business",
      difficulty: "medium",
      lastReviewed: "1 ngày trước",
      masteryLevel: 4,
    },
    {
      id: 3,
      word: "itinerary",
      meaning: "lịch trình du lịch",
      pronunciation: "/aɪˈtɪnəreri/",
      example: "We planned our itinerary for the Europe trip.",
      topic: "travel",
      difficulty: "medium",
      lastReviewed: "3 ngày trước",
      masteryLevel: 2,
    },
    {
      id: 4,
      word: "cuisine",
      meaning: "ẩm thực",
      pronunciation: "/kwɪˈziːn/",
      example: "Italian cuisine is famous worldwide.",
      topic: "food",
      difficulty: "easy",
      lastReviewed: "1 ngày trước",
      masteryLevel: 5,
    },
    {
      id: 5,
      word: "algorithm",
      meaning: "thuật toán",
      pronunciation: "/ˈælɡərɪðəm/",
      example: "The algorithm processes data efficiently.",
      topic: "technology",
      difficulty: "hard",
      lastReviewed: "4 ngày trước",
      masteryLevel: 1,
    },
  ]

  const getMasteryColor = (level: number) => {
    if (level >= 4) return "text-green-600"
    if (level >= 3) return "text-blue-600"
    if (level >= 2) return "text-yellow-600"
    return "text-red-600"
  }

  const getMasteryText = (level: number) => {
    if (level >= 4) return "Thành thạo"
    if (level >= 3) return "Khá tốt"
    if (level >= 2) return "Trung bình"
    return "Cần ôn"
  }

  const filteredVocabulary = vocabularyList.filter((word) => {
    const matchesTopic = selectedTopic === "all" || word.topic === selectedTopic
    const matchesSearch =
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTopic && matchesSearch
  })

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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Từ vựng của tôi</h1>
            <p className="text-gray-600">Quản lý và ôn tập từ vựng đã học</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm từ mới
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Tổng từ vựng</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-600">Đã thành thạo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <RotateCcw className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-gray-600">Cần ôn lại</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Plus className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Từ mới hôm nay</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Topics Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Chủ đề</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topics.map((topic) => (
                    <Button
                      key={topic.id}
                      variant={selectedTopic === topic.id ? "default" : "ghost"}
                      className="w-full justify-between"
                      onClick={() => setSelectedTopic(topic.id)}
                    >
                      <span>{topic.name}</span>
                      <Badge variant="secondary">{topic.count}</Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ôn tập nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/vocabulary/flashcards">
                  <Button variant="outline" className="w-full bg-transparent">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Flashcards
                  </Button>
                </Link>
                <Link href="/vocabulary/quiz">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Zap className="h-4 w-4 mr-2" />
                    Quiz nhanh
                  </Button>
                </Link>
                <Link href="/vocabulary/review">
                  <Button variant="outline" className="w-full bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Ôn tập có hệ thống
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Vocabulary List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Danh sách từ vựng</CardTitle>
                  <Input
                    placeholder="Tìm kiếm từ vựng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVocabulary.map((word) => (
                    <Card key={word.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold">{word.word}</h3>
                              <Button size="sm" variant="ghost" className="p-1">
                                <Volume2 className="h-4 w-4" />
                              </Button>
                              <Badge variant="outline" className={getMasteryColor(word.masteryLevel)}>
                                {getMasteryText(word.masteryLevel)}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-1">{word.pronunciation}</p>
                            <p className="text-gray-800 mb-2">
                              <strong>Nghĩa:</strong> {word.meaning}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                              <strong>Ví dụ:</strong> {word.example}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Ôn lại: {word.lastReviewed}</span>
                              <Badge variant="secondary" className="text-xs">
                                {topics.find((t) => t.id === word.topic)?.name}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
