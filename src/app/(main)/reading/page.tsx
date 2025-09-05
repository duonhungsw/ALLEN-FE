"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import ExerciseCard from "../../../components/reading/ExerciseCard"
import StatsSection from "../../../components/reading/StatsSection"
import FiltersSection from "../../../components/reading/FiltersSection"
import TipsSection from "../../../components/reading/TipsSection"
import { fullArticles, individualPassages, categories, levels } from "../../../shared/constants/reading/mockData"
import { filterExercises } from "../../../utils/filterUtils"

export default function ReadingPage() {
  const [selectedTab, setSelectedTab] = useState("full")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Calculate stats
  const completedExercises = [...fullArticles, ...individualPassages].filter(ex => ex.completed).length
  const averageAccuracy = 89 // This could be calculated from actual data
  const totalMinutes = 245 // This could be calculated from actual data

  // Filter exercises
  const filteredFullArticles = filterExercises(fullArticles, searchTerm, selectedCategory, selectedLevel)
  const filteredIndividualPassages = filterExercises(individualPassages, searchTerm, selectedCategory, selectedLevel)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
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
        <StatsSection 
          completedExercises={completedExercises}
          averageAccuracy={averageAccuracy}
          totalMinutes={totalMinutes}
        />
        <FiltersSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          categories={categories}
          levels={levels}
        />
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
              {filteredFullArticles.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} type="full" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="individual" className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Bài đọc lẻ</h2>
              <p className="text-gray-600">Các đoạn văn ngắn tập trung vào kỹ năng cụ thể</p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredIndividualPassages.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} type="individual" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <TipsSection />
      </div>
    </div>
  )
}
