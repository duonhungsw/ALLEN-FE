"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Check, X, Mic, MicOff } from "lucide-react"

export default function PronunciationPage({ params }: { params: { id: string } }) {
    const [currentLesson, setCurrentLesson] = useState(0)
    const [userRecording, setUserRecording] = useState("")
    const [isPlaying, setIsPlaying] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [playCount, setPlayCount] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [results, setResults] = useState<Array<{ correct: boolean; userAnswer: string; correctAnswer: string }>>([])
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(true)


    const categoryData = {
        "1": {
            title: "Daily Conversation",
            description: "Hội thoại hàng ngày",
            lessons: [
                {
                    id: 1,
                    text: "Hello, how are you today?",
                    audio: "/audio/hello.mp3",
                    translation: "Xin chào, hôm nay bạn thế nào?",
                    difficulty: "Easy"
                },
                {
                    id: 2,
                    text: "Nice to meet you!",
                    audio: "/audio/nice.mp3",
                    translation: "Rất vui được gặp bạn!",
                    difficulty: "Easy"
                },
                {
                    id: 3,
                    text: "What's your name?",
                    audio: "/audio/name.mp3",
                    translation: "Tên bạn là gì?",
                    difficulty: "Easy"
                },
                {
                    id: 4,
                    text: "Where are you from?",
                    audio: "/audio/where.mp3",
                    translation: "Bạn đến từ đâu?",
                    difficulty: "Medium"
                },
                {
                    id: 5,
                    text: "How old are you?",
                    audio: "/audio/age.mp3",
                    translation: "Bạn bao nhiêu tuổi?",
                    difficulty: "Medium"
                }
            ]
        }
    }

    const currentCategory = categoryData[params?.id as keyof typeof categoryData]
    const currentLessonData = currentCategory?.lessons[currentLesson]

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isActive) {
            interval = setInterval(() => {
                setTimer((timer) => timer + 1)
            }, 1000)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timer])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const playAudio = () => {
        setIsPlaying(true)
        setPlayCount((prev) => prev + 1)

        setTimeout(() => {
            setIsPlaying(false)
        }, 2000)
    }

    const startRecording = () => {
        if (!isRecording) {
            setIsRecording(true)
            setUserRecording("")

            if ("webkitSpeechRecognition" in window) {
                const recognition = new (window as any).webkitSpeechRecognition()
                recognition.continuous = false
                recognition.interimResults = false
                recognition.lang = "en-US"

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript
                    setUserRecording(transcript)
                    setIsRecording(false)
                }

                recognition.onerror = () => {
                    setIsRecording(false)
                }

                recognition.start()
            }
        } else {
            setIsRecording(false)
        }
    }

    const checkPronunciation = () => {
        if (!userRecording.trim()) return

        const isCorrect = userRecording.toLowerCase().trim() === currentLessonData?.text.toLowerCase()

        const result = {
            correct: isCorrect,
            userAnswer: userRecording,
            correctAnswer: currentLessonData?.text || "",
        }

        setResults((prev) => [...prev, result])
        setShowResult(true)
    }

    const nextLesson = () => {
        if (currentLesson < (currentCategory?.lessons.length || 0) - 1) {
            setCurrentLesson((prev) => prev + 1)
            setUserRecording("")
            setShowResult(false)
            setPlayCount(0)
        } else {
            setIsActive(false)
        }
    }

    const resetLesson = () => {
        setUserRecording("")
        setShowResult(false)
        setPlayCount(0)
    }

    const progress = ((currentLesson + 1) / (currentCategory?.lessons.length || 1)) * 100

    if (results.length === (currentCategory?.lessons.length || 0)) {
        const correctCount = results.filter((r) => r.correct).length
        const accuracy = Math.round((correctCount / results.length) * 100)

        return (
            <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#141F23' }}>
                <Card className="w-full max-w-2xl border-0" style={{ backgroundColor: '#1a2a2f' }}>
                    <CardContent className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4" style={{ color: '#93D333' }}>Hoàn thành bài tập!</h2>
                            <div className="text-6xl mb-4">🎉</div>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold" style={{ color: '#93D333' }}>{correctCount}</div>
                                    <div className="text-sm text-gray-300">Câu đúng</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-400">{results.length - correctCount}</div>
                                    <div className="text-sm text-gray-300">Câu sai</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{accuracy}%</div>
                                    <div className="text-sm text-gray-300">Độ chính xác</div>
                                </div>
                            </div>
                            <div className="text-gray-300 mb-6">Thời gian: {formatTime(timer)}</div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h3 className="text-lg font-semibold text-white">Chi tiết kết quả:</h3>
                            {results.map((result, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border-l-4 ${result.correct ? "border-green-500" : "border-red-500"
                                        }`}
                                    style={{ backgroundColor: '#1a2a2f' }}
                                >
                                    <div className="flex items-center mb-2">
                                        {result.correct ? (
                                            <Check className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                                        ) : (
                                            <X className="h-5 w-5 text-red-400 mr-2" />
                                        )}
                                        <span className="font-semibold text-white">Bài {index + 1}</span>
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <div className="text-white">
                                            <strong>Đáp án đúng:</strong> {result.correctAnswer}
                                        </div>
                                        {!result.correct && (
                                            <div className="text-white">
                                                <strong>Câu trả lời của bạn:</strong> {result.userAnswer}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex space-x-4">
                            <Link href="/learning/speaking" className="flex-1">
                                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700 cursor-pointer">
                                    Quay lại danh sách
                                </Button>
                            </Link>
                            <Button className="flex-1 text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }} onClick={() => window.location.reload()}>
                                Làm lại
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
            <div className="px-6 py-4" style={{ backgroundColor: '#141F23' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/learning/speaking">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 cursor-pointer">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Quay lại
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-white">{currentCategory?.title}</h1>
                            <p className="text-sm text-gray-300">
                                Luyện phát âm - Bài {currentLesson + 1}/{currentCategory?.lessons.length}
                            </p>
                        </div>
                    </div>
                    <div className="text-lg font-mono text-white px-3 py-1 rounded" style={{ backgroundColor: '#93D333' }}>{formatTime(timer)}</div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white">Tiến độ</span>
                        <span className="text-sm text-gray-300">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#93D333' }}>
                                        <Volume2 className="h-16 w-16 text-white" />
                                    </div>

                                    <h3 className="text-lg font-semibold mb-4 text-white">Nghe và lặp lại</h3>

                                    <div className="flex justify-center space-x-4 mb-6">
                                        <Button onClick={playAudio} disabled={isPlaying} className="text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }}>
                                            {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                                            {isPlaying ? "Đang phát..." : "Phát âm thanh"}
                                        </Button>

                                        <Button variant="outline" onClick={resetLesson} className="border-gray-600 text-white hover:bg-gray-700 cursor-pointer">
                                            <RotateCcw className="h-5 w-5 mr-2" />
                                            Làm lại
                                        </Button>
                                    </div>

                                    <div className="text-sm text-gray-300">Đã nghe: {playCount} lần</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
                            <CardContent className="p-8">
                                <h3 className="text-lg font-semibold mb-4 text-white">Ghi âm phát âm của bạn</h3>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg border" style={{ backgroundColor: '#141F23', borderColor: '#93D333' }}>
                                        <p className="text-white text-sm mb-2">Câu cần phát âm:</p>
                                        <p className="text-gray-300 text-lg font-medium">{currentLessonData?.text}</p>
                                        <p className="text-gray-400 text-sm mt-2">{currentLessonData?.translation}</p>
                                    </div>

                                    <div className="text-center">
                                        <Button
                                            className={`w-24 h-24 rounded-full cursor-pointer ${isRecording ? "animate-pulse" : ""
                                                }`}
                                            style={{ backgroundColor: isRecording ? '#EF4444' : '#93D333' }}
                                            onClick={startRecording}
                                        >
                                            {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                                        </Button>
                                        <p className="text-gray-400 mt-2">
                                            {isRecording ? "Đang ghi âm..." : "Nhấn để ghi âm"}
                                        </p>
                                    </div>

                                    {userRecording && (
                                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#141F23' }}>
                                            <p className="text-white text-sm mb-2">Bạn đã nói:</p>
                                            <p className="text-gray-300">{userRecording}</p>
                                        </div>
                                    )}

                                    {!showResult ? (
                                        <Button
                                            onClick={checkPronunciation}
                                            disabled={!userRecording.trim()}
                                            className="w-full text-white border-0 hover:opacity-90 cursor-pointer"
                                            style={{ backgroundColor: '#93D333' }}
                                        >
                                            Kiểm tra phát âm
                                        </Button>
                                    ) : (
                                        <div className="space-y-4">
                                            <div
                                                className={`p-4 rounded-lg ${results[currentLesson]?.correct
                                                    ? "border border-green-500"
                                                    : "border border-red-500"
                                                    }`}
                                                style={{ backgroundColor: '#1a2a2f' }}
                                            >
                                                <div className="flex items-center mb-2">
                                                    {results[currentLesson]?.correct ? (
                                                        <Check className="h-5 w-5 text-green-400 mr-2" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-red-400 mr-2" />
                                                    )}
                                                    <span className="font-semibold text-white">
                                                        {results[currentLesson]?.correct ? "Phát âm tốt!" : "Cần cải thiện"}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="text-white">
                                                        <strong>Câu đúng:</strong> {currentLessonData?.text}
                                                    </div>
                                                    {!results[currentLesson]?.correct && (
                                                        <div className="text-white">
                                                            <strong>Bạn đã nói:</strong> {userRecording}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <Button onClick={nextLesson} className="w-full text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }}>
                                                {currentLesson < (currentCategory?.lessons.length || 0) - 1 ? "Bài tiếp theo" : "Hoàn thành"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Danh sách bài học</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {currentCategory?.lessons.map((_, index) => (
                                    <Button
                                        key={index}
                                        variant={index === currentLesson ? "default" : "outline"}
                                        size="sm"
                                        className={`${results[index]
                                            ? results[index].correct
                                                ? "text-white border-green-500"
                                                : "text-white border-red-500"
                                            : "text-white border-gray-600"
                                            }`}
                                        style={{
                                            backgroundColor: index === currentLesson ? '#93D333' :
                                                results[index] ? (results[index].correct ? '#1a2a2f' : '#1a2a2f') : '#1a2a2f'
                                        }}
                                        onClick={() => {
                                            if (index <= results.length) {
                                                setCurrentLesson(index)
                                                setUserRecording("")
                                                setShowResult(false)
                                                setPlayCount(0)
                                            }
                                        }}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
