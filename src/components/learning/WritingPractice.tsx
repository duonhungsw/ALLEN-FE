"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWriting } from "@/hooks/learning/useWriting";
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, HelpCircle, Book, Coins, Star, Flame, Lightbulb } from "lucide-react"
import { WritingSubmitResponse } from "@/types/learning/writing";

interface WritingPracticeProps {
    learningUnitId: string;
}

export default function WritingPractice({ learningUnitId }: WritingPracticeProps) {
    // Lấy dữ liệu bài học
    const { data: writingData, isLoading, error, submitWriting } = useWriting(learningUnitId);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [userInput, setUserInput] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedback, setFeedback] = useState("")
    const [score, setScore] = useState<{ Point: number; IsCorrect: boolean } | null>(null)
    const [progress, setProgress] = useState(0)

    // Split Vietnamese content into sentences - only when data is available
    const vietnameseSentences = writingData?.contentVN ?
        writingData.contentVN.split(/[.!?]+/).filter((s: string) => s.trim()) : []
    const totalSentences = vietnameseSentences.length

    const currentSentence = vietnameseSentences[currentSentenceIndex]?.trim() || ""

    const handleSubmit = async () => {
        if (!userInput.trim() || isSubmitting || !writingData) return

        setIsSubmitting(true)
        setFeedback("")
        setScore(null)

        await submitWriting(
            {
                writingId: writingData.id,
                content: userInput.trim(),
                sentenceIndex: currentSentenceIndex,
                mode: 0, // Vietnamese to English
            },
            (feedback) => setFeedback(feedback),
            (score) => {
                setScore(score)
                // Auto next if correct
                if (score.IsCorrect && currentSentenceIndex < totalSentences - 1) {
                    setTimeout(() => {
                        handleNext()
                    }, 2000) // Wait 2 seconds before auto next
                }
            },
            () => setIsSubmitting(false),
            (error) => {
                setFeedback(error)
                setIsSubmitting(false)
            }
        )
    }

    const handleNext = () => {
        if (currentSentenceIndex < totalSentences - 1) {
            setCurrentSentenceIndex(currentSentenceIndex + 1)
            setUserInput("")
            setFeedback("")
            setScore(null)
            setProgress(((currentSentenceIndex + 1) / totalSentences) * 100)
        }
    }
    // ======================
    // Loading
    // ======================
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F3EA]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F3713B] mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải bài học...</p>
                </div>
            </div>
        );
    }

    // ======================
    // Error
    // ======================
    if (error || !writingData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F3EA]">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Có lỗi khi tải dữ liệu</p>
                    <Button
                        onClick={() => window.location.reload()}
                        style={{ backgroundColor: "#F3713B" }}
                        className="text-white"
                    >
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    function onQuit(event: React.MouseEvent<HTMLButtonElement>): void {
        throw new Error("Function not implemented.");
    }

    // ======================
    // Main content
    // ======================
    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Header */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-yellow-400">The Little Joy of a Child's Laugh</h1>
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-yellow-400" />
                            <span>0 credits</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>70 points</span>
                        </div>
                        <span className="text-blue-400">
                            Progress: {currentSentenceIndex}/{totalSentences} sentences
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <Progress value={progress} className="w-full h-2 bg-slate-700" />
            </div>

            <div className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Vietnamese Text Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800 rounded-lg p-6 h-96 overflow-y-auto">
                            <p className="text-lg leading-relaxed">
                                {vietnameseSentences.map((sentence: string, index: number) => (
                                    <span
                                        key={index}
                                        className={`${index === currentSentenceIndex
                                            ? "bg-orange-500 text-white px-2 py-1 rounded font-semibold"
                                            : index < currentSentenceIndex
                                                ? "text-green-500 font-medium"
                                                : "text-gray-400"
                                            }`}
                                    >
                                        {sentence.trim()}
                                        {index < vietnameseSentences.length - 1 ? ". " : "."}
                                    </span>
                                ))}
                            </p>
                        </div>

                        {/* Input Area */}
                        <div className="mt-4">
                            <Textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Enter your English translation here... (Only highlighted sentence)"
                                className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 min-h-32 resize-none"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-6">
                        {/* Dictionary & Accuracy */}
                        <div className="bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Book className="w-5 h-5" />
                                    <span>Dictionary</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-1">
                                        <span className="text-xs font-bold">✓</span>
                                    </div>
                                    <span className="text-xs">Accuracy</span>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="bg-slate-800 rounded-lg p-4">
                            <h3 className="font-semibold mb-3">Feedback</h3>
                            <p className="text-sm text-gray-300 mb-4">
                                Click <span className="text-yellow-400 font-semibold">Submit</span> to get feedback from AI. The system
                                will review your translation and point out its strengths and areas for improvement.
                            </p>

                            {isSubmitting && (
                                <div className="mt-6 p-3 rounded-md bg-yellow-50 text-yellow-800 text-sm inline-flex items-center gap-2">
                                    <span className="animate-pulse">●</span> Đang chấm điểm...
                                </div>
                            )}

                            {feedback && (
                                <div className="mt-6 p-4 bg-slate-700 rounded text-sm whitespace-pre-line text-white">
                                    {feedback}
                                </div>
                            )}

                            {score && (() => {
                                const accuracy = Math.round(score.Point || 0);
                                const isCorrect = score.IsCorrect ?? false;

                                return (
                                    <div className={`mt-6 p-4 rounded-lg border ${isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}>
                                        <h4 className={`font-bold mb-2 text-left ${isCorrect ? "text-green-900" : "text-red-900"}`}>Kết quả</h4>

                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className={`mb-2 text-sm ${isCorrect ? "text-green-800" : "text-red-800"}`}>Your translation:</div>
                                                <div className="text-sm bg-white p-2 rounded border">{userInput}</div>
                                            </div>
                                            <div className="shrink-0 text-center ml-4">
                                                <div className={`text-3xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>{accuracy}</div>
                                                <div className={`${isCorrect ? "text-green-700" : "text-red-700"} text-xs`}>điểm</div>
                                            </div>
                                        </div>

                                        {isCorrect && (
                                            <div className="mt-3 p-2 bg-green-100 rounded text-green-800 text-sm">
                                                ✅ Tuyệt vời! Tự động chuyển sang câu tiếp theo...
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Today's Achievements */}
                        <div className="bg-slate-800 rounded-lg p-4">
                            <h3 className="font-semibold mb-3">Today's Achievements</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                                        <Flame className="w-6 h-6" />
                                    </div>
                                    <div className="text-sm">0 Day Streak</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                                        <Lightbulb className="w-6 h-6" />
                                    </div>
                                    <div className="text-sm">Bright Mind</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-6">
                    <Button
                        variant="outline"
                        onClick={onQuit}
                        className="flex items-center gap-2 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Quit
                    </Button>

                    <Button
                        variant="outline"
                        className="flex items-center gap-2 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                    >
                        <HelpCircle className="w-4 h-4" />
                        Hint
                    </Button>

                    <div className="flex gap-3">
                        {score && !score.IsCorrect && (
                            <Button
                                onClick={handleNext}
                                disabled={currentSentenceIndex >= totalSentences - 1}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Skip to Next
                            </Button>
                        )}
                        <Button
                            onClick={handleSubmit}
                            disabled={!userInput.trim() || isSubmitting}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold flex items-center gap-2"
                        >
                            {isSubmitting ? "Đang chấm..." : `Submit ${currentSentenceIndex + 1}`}
                            <Coins className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
