"use client"

import WritingPractice from "@/components/learning/WritingPractice"
import { useParams } from "next/navigation"

export default function SpeakingPracticePage() {
  const params = useParams()
  const learningUnitId = params.id as string

  return <WritingPractice learningUnitId={learningUnitId} />
}
