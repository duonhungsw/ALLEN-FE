"use client"

import SpeakingPractice from "@/components/learning/SpeakingPractice"
import { useParams } from "next/navigation"

export default function SpeakingPracticePage() {
    const params = useParams()
    const learningUnitId = params.id as string
    return <SpeakingPractice learningUnitId={learningUnitId} />
}
