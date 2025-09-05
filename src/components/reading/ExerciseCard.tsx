"use client"

import Image from 'next/image'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { Exercise } from "@/providers/auth/types/readingType"

function getLevelColor(level?: string) {
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

interface ExerciseCardProps {
  exercise: Exercise;
  type: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, type }) => {
  return (
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
              <Badge className={getLevelColor(exercise.level)}>{exercise.level ?? "Unknown"}</Badge>
              <Badge variant="outline">{exercise.category}</Badge>
              {exercise.completed && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Hoàn thành
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mb-3">{exercise.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span>⏱️ {typeof exercise.duration === "number" ? `${exercise.duration} min` : exercise.duration}</span>
              <span>❓ {Array.isArray(exercise.questions) ? exercise.questions.length : exercise.questions} câu hỏi</span>
              {typeof exercise.score === "number" && <span className="text-blue-600 font-medium">📊 {exercise.score}%</span>}
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
}

export default ExerciseCard
