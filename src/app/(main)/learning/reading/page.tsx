"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import ExerciseCard from "@/components/reading/ExerciseCard"
import StatsSection from "@/components/reading/StatsSection"
import FiltersSection from "@/components/reading/FiltersSection"
import TipsSection from "@/components/reading/TipsSection"
import { fullArticles, individualPassages, categories, levels } from "@/shared/constants/reading/mockData"
import { filterExercises } from "@/utils/filterUtils"
import { useTranslations } from "next-intl"

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
  const tReading = useTranslations("Reading.Reading")
  return (
    <div className="min-h-screen " >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4 text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tReading("back")}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">{tReading("title")}</h1>
            <p className="text-gray-300">{tReading("subtitle")}</p>
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
          <TabsList className="grid w-full grid-cols-2 border-0" style={{ backgroundColor: '#1a2a2f' }}>
            <TabsTrigger 
              value="full" 
              className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
            >
              {tReading("tabs.full")}
            </TabsTrigger>
            <TabsTrigger 
              value="individual" 
              className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
            >
              {tReading("tabs.individual")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="full" className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-white">{tReading("full.title")}</h2>
              <p className="text-gray-300">{tReading("full.desc")}</p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredFullArticles.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} type="full" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="individual" className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-white">{tReading("individual.title")}</h2>
              <p className="text-gray-300">{tReading("individual.desc")}</p>
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
